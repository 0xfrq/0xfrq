import { Spectral } from "next/font/google";
import Link from "next/link";
import homeStyles from "../page.module.css";
import styles from "./page.module.css";
import repos from "@/data/pinned-repos.json";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

type Repo = {
  name: string;
  description: string | null;
  href: string;
  stars: number;
  forks: number;
  language: { name: string; color: string } | null;
  topics: string[];
};

export default function Projects() {
  const projects = repos as Repo[];

  return (
    <main
      className={`${spectral.className} ${homeStyles.main}`}
      style={{ fontWeight: 100 }}
    >
      <div className={homeStyles.card}>
        <nav style={{ marginBottom: "1rem" }}>
          <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            ← back
          </Link>
        </nav>

        <h2 style={{ marginBottom: "1.25rem", fontWeight: 600 }}>projects</h2>

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
              {p.description && <div className={styles.itemDesc}>{p.description}</div>}
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
                    <span className={styles.metaTag}>
                      ★ {p.stars}
                    </span>
                  )}
                  {p.forks > 0 && (
                    <span className={styles.metaTag}>
                      ⎇ {p.forks}
                    </span>
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
      </div>
    </main>
  );
}
