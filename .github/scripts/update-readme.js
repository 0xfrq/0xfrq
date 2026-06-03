const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')
const ws = require('ws')
const https = require('https')
const { execSync } = require('child_process')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  { realtime: { transport: ws } }
)

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch (e) { reject(e) }
      })
    }).on('error', reject)
  })
}

async function getAlbumCover(song, artist) {
  try {
    const query = encodeURIComponent(`${song} ${artist}`)
    const data = await fetchJson(
      `https://itunes.apple.com/search?term=${query}&media=music&limit=1&entity=song`
    )
    const result = data?.results?.[0]
    if (!result) return null
    return result.artworkUrl100.replace('100x100bb', '600x600bb')
  } catch (e) {
    console.error('iTunes cover error:', e.message)
    return null
  }
}

async function getMarketData() {
  try {
    const [ihsgData, usdIdrData] = await Promise.all([
      fetchJson('https://query1.finance.yahoo.com/v8/finance/chart/%5EJKSE?interval=1d&range=1d'),
      fetchJson('https://query1.finance.yahoo.com/v8/finance/chart/USDIDR%3DX?interval=1d&range=1d')
    ])
    const ihsgPrice = ihsgData?.chart?.result?.[0]?.meta?.regularMarketPrice
    const usdIdr = usdIdrData?.chart?.result?.[0]?.meta?.regularMarketPrice
    return { ihsgPrice, usdIdr }
  } catch (e) {
    console.error('Market data error:', e)
    return { ihsgPrice: null, usdIdr: null }
  }
}

async function getCanvasGif(song, artist) {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    console.warn("Spotify credentials not set. Skipping canvas.");
    return null;
  }
  try {
    const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });
    
    if (!tokenRes.ok) return null;
    const { access_token } = await tokenRes.json();
    
    const query = encodeURIComponent(`track:${song} artist:${artist}`);
    const searchRes = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
      headers: { 'Authorization': `Bearer ${access_token}` }
    });
    const searchData = await searchRes.json();
    const trackId = searchData?.tracks?.items?.[0]?.id;
    
    if (!trackId) return null;
    
    const canvasRes = await fetch(`https://spo-canvas-nine.vercel.app/api/canvas?trackId=${trackId}`);
    const canvasData = await canvasRes.json();
    const mp4Url = canvasData?.canvasesList?.[0]?.canvasUrl;
    
    if (!mp4Url) return null;
    
    console.log('Downloading canvas MP4...');
    execSync(`curl -sL "${mp4Url}" -o canvas.mp4`);
    console.log('Converting to GIF with ffmpeg...');
    execSync('ffmpeg -y -i canvas.mp4 -vf "fps=15,scale=150:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 canvas.gif');
    
    return `canvas.gif?v=${Date.now()}`;
  } catch (e) {
    console.error("Canvas error:", e.message);
    return null;
  }
}

async function main() {
  const [{ data, error }, { ihsgPrice, usdIdr }] = await Promise.all([
    supabase
      .from('now_playing')
      .select('*')
      .order('played_at', { ascending: false })
      .limit(1)
      .single(),
    getMarketData()
  ])

  if (error) {
    console.error(error)
    process.exit(1)
  }

  const song = data.song_name || 'Unknown Song'
  const artist = data.artist_name || 'Unknown Artist'

  const [coverUrl, canvasUrl] = await Promise.all([
    getAlbumCover(song, artist),
    getCanvasGif(song, artist)
  ])

  const coverImg = coverUrl
    ? `<img src="${coverUrl}" width="130" height="130" style="border-radius:10px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);" align="center" />`
    : `<img src="https://via.placeholder.com/130x130?text=♪" width="130" height="130" style="border-radius:10px" align="center" />`

  const canvasHtml = canvasUrl 
    ? `<td width="120" valign="middle" align="center">
         <img src="${canvasUrl}" width="100" style="border-radius:10px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);" alt="Canvas" />
       </td>`
    : ''

  const ihsgStr  = ihsgPrice ? ihsgPrice.toLocaleString('id-ID') : 'N/A'
  const usdIdrStr = usdIdr   ? `Rp ${Math.round(usdIdr).toLocaleString('id-ID')}` : 'N/A'
  const updatedAt = new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }) + ' WIB'

  const nowPlayingBlock = `<!-- NOW_PLAYING_START -->
<table>
  <tr>
    <td width="150" valign="middle" align="center">
      ${coverImg}
    </td>
    ${canvasHtml}
    <td valign="middle" width="250">
      <sup>NOW PLAYING</sup><br/>
      <strong>${song}</strong><br/>
      ${artist}
    </td>
    <td align="right" valign="middle" width="180">
      <sup>MARKET</sup><br/>
      IHSG &nbsp;&nbsp;<strong>${ihsgStr}</strong><br/>
      USD/IDR &nbsp;<strong>${usdIdrStr}</strong><br/>
      <sub>updated ${updatedAt}</sub>
    </td>
  </tr>
</table>
<!-- NOW_PLAYING_END -->`

  const readme = fs.readFileSync('README.md', 'utf8')
  const updatedReadme = readme.replace(
    /<!-- NOW_PLAYING_START -->[\s\S]*?<!-- NOW_PLAYING_END -->/,
    nowPlayingBlock
  )
  fs.writeFileSync('README.md', updatedReadme)

  console.log(
    `README updated: ${song} — ${artist} | Cover: ${coverUrl ? 'yes' : 'no'} | Canvas: ${canvasUrl ? 'yes' : 'no'} | IHSG: ${ihsgPrice} | USD/IDR: ${usdIdr}`
  )
}

main()
