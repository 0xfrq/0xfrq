const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

async function main() {
  const { data, error } = await supabase
    .from('now_playing')
    .select('*')
    .order('played_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error(error)
    process.exit(1)
  }

  const song = data.song_name || 'Unknown Song'
  const artist = data.artist_name || 'Unknown Artist'

  const nowPlaying = `🎵 ${song} — ${artist}`

  const readme = fs.readFileSync('README.md', 'utf8')

  const updatedReadme = readme.replace(
    /<!-- NOW_PLAYING_START -->(.|\\n|\\r)*<!-- NOW_PLAYING_END -->/,
    `<!-- NOW_PLAYING_START -->
${nowPlaying}
<!-- NOW_PLAYING_END -->`
  )

  fs.writeFileSync('README.md', updatedReadme)

  console.log('README updated')
}

main()
