import { Spectral } from "next/font/google";
import Link from "next/link";
import homeStyles from "../page.module.css";
import styles from "./page.module.css";
import repos from "@/data/pinned-repos.json";
import Pagination from "../components/Pagination";
import ThemeToggle from "../components/ThemeToggle";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const PER_PAGE = 10;

type Repo = {
  name: string;
  description: string | null;
  href: string;
  stars: number;
  forks: number;
  language: { name: string; color: string } | null;
  topics: string[];
  lastCommit?: string | null;
};

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default async function Projects({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const allProjects = repos as Repo[];
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params?.page) || 1);
  const totalPages = Math.ceil(allProjects.length / PER_PAGE);
  const projects = allProjects.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  return (
    <main
      className={`${spectral.className} ${homeStyles.main}`}
      style={{ fontWeight: 100 }}
    >
      <div className={homeStyles.card}>
<div style={{ display: "flex", alignItems: "center", marginBottom: "1.25rem", width: "100%" }}>
  <div style={{ flex: 1 }}>
    <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
      ← back
    </Link>
  </div>

  <h2 style={{ fontWeight: 600, margin: 0 }}>projects</h2>

  <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
    <ThemeToggle style={{ position: "static" }} />
  </div>
</div>

        <div className={styles.list}>
          {projects.length === 0 && (
            <div style={{ color: "var(--text-muted)", textAlign: "center", fontSize: "0.9rem" }}>
              no pinned repositories yet.
            </div>
          )}

          {projects.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
            >
              <div className={styles.itemTitle}>{p.name}</div>
              {p.description && (
                <div className={styles.itemDesc}>{p.description}</div>
              )}
              {p.lastCommit && (
                <div className={styles.itemCommit}>last commit: {timeAgo(p.lastCommit)}</div>
              )}
              {(p.language || p.stars > 0 || p.forks > 0 || p.topics.length > 0) && (
                <div className={styles.itemMeta}>
                  {p.language && (
                    <span className={styles.metaTag}>
                      <span
                        className={styles.langDot}
                        style={{ backgroundColor: p.language.color }}
                      />
                      {p.language.name}
                    </span>
                  )}
                  {p.stars > 0 && (
                    <span className={styles.metaTag}>★ {p.stars}</span>
                  )}
                  {p.forks > 0 && (
                    <span className={styles.metaTag}>⎇ {p.forks}</span>
                  )}
                  {p.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className={styles.topicTag}>
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>

        <Pagination basePath="/projects" currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}