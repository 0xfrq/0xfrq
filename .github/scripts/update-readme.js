const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')
const ws = require('ws')
const https = require('https')

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
    console.error('iTunes error:', e.message)
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

  const coverUrl = await getAlbumCover(song, artist)
  const coverImg = coverUrl
    ? `<img src="${coverUrl}" width="130" height="130" style="border-radius:10px" align="center" />`
    : `<img src="https://via.placeholder.com/130x130?text=♪" width="130" height="130" style="border-radius:10px" align="center" />`

const ihsgStr = ihsgPrice ? ihsgPrice.toLocaleString('id-ID') : 'N/A'
const usdIdrStr = usdIdr ? `Rp ${Math.round(usdIdr).toLocaleString('id-ID')}` : 'N/A'

const updatedAt = new Date().toLocaleString('id-ID', {
  timeZone: 'Asia/Jakarta',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
}) + ' WIB'

const nowPlayingBlock = `<!-- NOW_PLAYING_START -->
<table>
  <tr>
    <td width="150" valign="middle">
      ${coverImg}
      <br clear="left"/>
    </td>
    <td valign="middle" width="260">
      <sup>NOW PLAYING</sup><br/>
      <strong>${song}</strong><br/>
      ${artist}
    </td>
    <td align="right" valign="middle">
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
  console.log(`README updated: ${song} — ${artist} | Cover: ${coverUrl ? 'yes' : 'no'} | IHSG: ${ihsgPrice} | USD/IDR: ${usdIdr}`)
}

main()
