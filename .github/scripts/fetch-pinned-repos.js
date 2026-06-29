// Fetches pinned repositories from the GitHub GraphQL API
// and writes them to app/data/pinned-repos.json for the Next.js site.

const fs = require("fs");
const path = require("path");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.PERSONAL_GH_TOKEN;
const USERNAME = process.env.GH_USERNAME || "0xfrq";
const OUTPUT_PATH = path.join(__dirname, "..", "..", "app", "data", "pinned-repos.json");

const query = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 5) {
              nodes {
                topic {
                  name
                }
              }
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  committedDate
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function main() {
  if (!GITHUB_TOKEN) {
    console.error("No GITHUB_TOKEN or PERSONAL_GH_TOKEN found in environment.");
    process.exit(1);
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "fetch-pinned-repos/1.0",
    },
    body: JSON.stringify({ query, variables: { username: USERNAME } }),
  });

  if (!res.ok) {
    console.error(`GitHub API responded with ${res.status}: ${await res.text()}`);
    process.exit(1);
  }

  const body = await res.json();

  if (body.errors) {
    console.error("GraphQL errors:", JSON.stringify(body.errors, null, 2));
    process.exit(1);
  }

  const repos = (body?.data?.user?.pinnedItems?.nodes || []).map((repo) => ({
    name: repo.name,
    description: repo.description,
    href: repo.url,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    language: repo.primaryLanguage
      ? { name: repo.primaryLanguage.name, color: repo.primaryLanguage.color }
      : null,
    topics: repo.repositoryTopics?.nodes?.map((t) => t.topic.name) || [],
    lastCommit: repo.defaultBranchRef?.target?.committedDate || null,
  }));

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(repos, null, 2) + "\n");

  console.log(`Wrote ${repos.length} pinned repos to ${OUTPUT_PATH}`);
  console.log(repos.map((r) => `  - ${r.name}`).join("\n"));
}

main();
