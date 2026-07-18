import type { CSSProperties } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Pagination from "../components/Pagination";

type Post = {
  title: string;
  slug: string;
  category: string;
  date: string;
  tags: string[];
  description: string;
};

const PER_PAGE = 10;

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://blog.fariqdoing.tech/api/posts/", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const allPosts = await getPosts();
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params?.page) || 1);
  const totalPages = Math.ceil(allPosts.length / PER_PAGE);
  const posts = allPosts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <main className={styles.main}>
      <div className={styles.document}>
        <section className={styles.header}>
          <Link href="/" className={styles.back}>
            <span aria-hidden="true">←</span> home
          </Link>
          <p className={styles.kicker}>Notes from the workbench</p>
          <h1>Writing<span className={styles.period}>.</span></h1>
          <p className={styles.intro}>Notes on building, learning, and the questions that stay interesting.</p>
        </section>

        <section className={styles.list} aria-label="Blog posts">
          {posts.length === 0 && <p className={styles.empty}>No posts yet.</p>}
          {posts.map((p, index) => (
            <a
              key={p.slug}
              href={`https://blog.fariqdoing.tech/posts/${p.slug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
              style={{ "--item-index": index } as CSSProperties}
            >
              <div className={styles.itemTop}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.itemTitle}>{p.title}</span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </div>
              {p.description && <p className={styles.itemDesc}>{p.description}</p>}
              <div className={styles.itemMeta}>
                <span>{formatDate(p.date)}</span>
                <span className={styles.category}>{p.category}</span>
              </div>
            </a>
          ))}
        </section>
        <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
