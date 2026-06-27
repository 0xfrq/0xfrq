import { Spectral } from "next/font/google";
import Link from "next/link";
import homeStyles from "../page.module.css";
import styles from "./page.module.css";
import Pagination from "../components/Pagination";
import ThemeToggle from "../components/ThemeToggle";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const PER_PAGE = 10;

type Post = {
  title: string;
  slug: string;
  category: string;
  date: string;
  tags: string[];
  description: string;
};

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://blog.fariqdoing.tech/api/posts/", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Failed to fetch blog posts:", e);
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
  const posts = allPosts.slice(
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

          <h2 style={{ fontWeight: 600, margin: 0 }}>blog</h2>

          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <ThemeToggle style={{ position: "static" }} />
          </div>
        </div>

        <div className={styles.list}>
          {posts.length === 0 && (
            <div style={{ color: "var(--text-muted)", textAlign: "center", fontSize: "0.9rem" }}>
              no posts yet.
            </div>
          )}

          {posts.map((p) => (
            <a
              key={p.slug}
              href={`https://blog.fariqdoing.tech/posts/${p.slug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
            >
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{p.title}</span>
                <span className={styles.itemDate}>{formatDate(p.date)}</span>
              </div>

              {p.description && (
                <div className={styles.itemExcerpt}>{p.description}</div>
              )}

              <div className={styles.itemFooter}>
                <span className={styles.categoryTag}>{p.category}</span>
                {p.tags.length > 0 && (
                  <div className={styles.tagList}>
                    {p.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
