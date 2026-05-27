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

async function getMarketData() {
  try {
    const [ihsgData, usdIdrData] = await Promise.all([
      fetchJson('https://query1.finance.yahoo.com/v8/finance/chart/%5EJKSE?interval=1d&range=1d'),
      fetchJson('https://query1.finance.yahoo.com/v8/finance/chart/USDIDR%3DX?interval=1d&range=1d')
    ])

    const ihsgPrice = ihsgData?.chart?.result?.[0]?.meta?.regularMarketPrice
    const usdIdr = usdIdrData?.chart?.result?.[0]?.meta?.regularMarketPrice

    const ihsg = ihsgPrice ? `📈 IHSG: ${ihsgPrice.toLocaleString('id-ID')}` : '📈 IHSG: N/A'
    const forex = usdIdr ? `💵 1 USD = Rp ${Math.round(usdIdr).toLocaleString('id-ID')}` : '💵 1 USD = N/A'

    return `${ihsg} · ${forex}`
  } catch (e) {
    console.error('Market data error:', e)
    return '📈 IHSG: N/A · 💵 1 USD = N/A'
  }
}

async function main() {
  const [{ data, error }, marketLine] = await Promise.all([
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
  const nowPlaying = `${song} — ${artist}`

  const readme = fs.readFileSync('README.md', 'utf8')
  const updatedReadme = readme.replace(
    /<!-- NOW_PLAYING_START -->[\s\S]*?<!-- NOW_PLAYING_END -->/,
    `<!-- NOW_PLAYING_START -->
${nowPlaying}
${marketLine}
<!-- NOW_PLAYING_END -->`
  )

  fs.writeFileSync('README.md', updatedReadme)
  console.log('README updated')
}

main()
