// Fetches a user's GitHub contribution calendar from the GraphQL API
// and writes it to app/data/github-contributions.json for the Next.js site.
// Use --dummy to regenerate the committed local fallback without a token.

const fs = require("fs");
const path = require("path");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.PERSONAL_GH_TOKEN;
const USERNAME = process.env.GH_USERNAME || "0xfrq";
const OUTPUT_PATH = path.join(
  __dirname,
  "..",
  "..",
  "app",
  "data",
  "github-contributions.json",
);

const query = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

function normalizeLevel(count, max) {
  if (!count) return 0;
  if (!max) return 0;
  return Math.max(1, Math.min(4, Math.ceil((count / max) * 4)));
}

function writeCalendar(calendar) {
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(calendar, null, 2) + "\n");
  console.log(`Wrote ${calendar.weeks.length} contribution weeks to ${OUTPUT_PATH}`);
}

function buildDummyCalendar() {
  const weeks = [];
  const start = new Date("2025-07-20T00:00:00.000Z");

  for (let week = 0; week < 53; week += 1) {
    const days = [];
    for (let day = 0; day < 7; day += 1) {
      const index = week * 7 + day;
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + index);

      const wave = (Math.sin(index / 8) + 1) * 2;
      const burst = week % 9 === 0 && day > 1 && day < 6 ? 5 : 0;
      const quiet = day === 0 || (week + day) % 11 === 0 ? -3 : 0;
      const count = Math.max(0, Math.round(wave + burst + quiet));

      days.push({
        date: date.toISOString().slice(0, 10),
        count,
        level: normalizeLevel(count, 9),
      });
    }
    weeks.push({ days });
  }

  return {
    source: "dummy",
    username: USERNAME,
    generatedAt: "2026-07-19T00:00:00.000Z",
    totalContributions: weeks.flatMap((week) => week.days).reduce((sum, day) => sum + day.count, 0),
    weeks,
  };
}

async function fetchCalendar() {
  if (!GITHUB_TOKEN) {
    console.error("No GITHUB_TOKEN or PERSONAL_GH_TOKEN found in environment.");
    process.exit(1);
  }

  const to = new Date();
  const from = new Date(to);
  from.setUTCFullYear(to.getUTCFullYear() - 1);

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "fetch-github-contributions/1.0",
    },
    body: JSON.stringify({
      query,
      variables: {
        username: USERNAME,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
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

  const contributionCalendar = body?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!contributionCalendar) {
    console.error(`No contribution calendar returned for user ${USERNAME}.`);
    process.exit(1);
  }

  const allCounts = contributionCalendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => day.contributionCount || 0),
  );
  const maxCount = Math.max(1, ...allCounts);

  return {
    source: "github",
    username: USERNAME,
    generatedAt: new Date().toISOString(),
    totalContributions: contributionCalendar.totalContributions || 0,
    weeks: contributionCalendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount || 0,
        level: normalizeLevel(day.contributionCount || 0, maxCount),
      })),
    })),
  };
}

async function main() {
  if (process.argv.includes("--dummy")) {
    writeCalendar(buildDummyCalendar());
    return;
  }

  writeCalendar(await fetchCalendar());
}

main();
