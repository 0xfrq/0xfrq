import Link from "next/link";
import list from "../components/Listing.module.css";
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
    <main className={list.main}>
      <div className={`shell ${list.layout}`}>
        <header className={list.header}>
          <Link href="/" className={list.back}>
            <span aria-hidden="true">←</span> home
          </Link>
          <p className={list.kicker}>Selected work</p>
          <h1>Projects<span className={list.period}>.</span></h1>
          <p className={list.intro}>A selection of things I&apos;ve built, broken, and learned from.</p>
        </header>

        <div className={list.content}>
          <section className={list.list} aria-label="Projects">
            {projects.length === 0 && <p className={list.empty}>No pinned repositories yet.</p>}
            {projects.map((p, index) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={list.item}
              >
                <div className={list.itemTop}>
                  <span className={list.number}>{String((currentPage - 1) * PER_PAGE + index + 1).padStart(2, "0")}</span>
                  <span className={list.itemTitle}>{p.name}</span>
                  <span className={list.arrow} aria-hidden="true">↗</span>
                </div>
                {p.description && <p className={list.itemDesc}>{p.description}</p>}
                <div className={list.itemMeta}>
                  {p.language && (
                    <span className={styles.lang}>
                      <span className={styles.langDot} style={{ backgroundColor: p.language.color }} aria-hidden="true" />
                      {p.language.name}
                    </span>
                  )}
                  {p.stars > 0 && <span>★ {p.stars}</span>}
                  {p.lastCommit && <span className={styles.commit}>{timeAgo(p.lastCommit)}</span>}
                </div>
              </a>
            ))}
          </section>
          <Pagination basePath="/projects" currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
