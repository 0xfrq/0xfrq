import type { CSSProperties } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import repos from "@/data/pinned-repos.json";
import Pagination from "../components/Pagination";

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

const PER_PAGE = 10;

function timeAgo(dateStr: string): string {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days <= 0) return "today";
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
  const projects = allProjects.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <main className={styles.main}>
      <div className={styles.document}>
        <section className={styles.header}>
          <Link href="/" className={styles.back}>
            <span aria-hidden="true">←</span> home
          </Link>
          <p className={styles.kicker}>Selected work</p>
          <h1>Projects<span className={styles.period}>.</span></h1>
          <p className={styles.intro}>A selection of things I&apos;ve built, broken, and learned from.</p>
        </section>

        <section className={styles.list} aria-label="Projects">
          {projects.length === 0 && <p className={styles.empty}>No pinned repositories yet.</p>}
          {projects.map((p, index) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
              style={{ "--item-index": index } as CSSProperties}
            >
              <div className={styles.itemTop}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.itemTitle}>{p.name}</span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </div>
              {p.description && <p className={styles.itemDesc}>{p.description}</p>}
              <div className={styles.itemMeta}>
                {p.language && <span>{p.language.name}</span>}
                {p.stars > 0 && <span>★ {p.stars}</span>}
                {p.lastCommit && <span className={styles.commit}>{timeAgo(p.lastCommit)}</span>}
              </div>
            </a>
          ))}
        </section>
        <Pagination basePath="/projects" currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
