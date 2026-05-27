export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/now-playing.yml/dispatches`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ref: 'main' })
    }
  )

  if (response.ok || response.status === 204) {
    return res.status(200).json({ success: true })
  }

  const error = await response.text()
  return res.status(500).json({ error })
}
