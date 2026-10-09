import Link from "next/link";
import list from "../components/Listing.module.css";
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
    <main className={list.main}>
      <div className={`shell ${list.layout}`}>
        <header className={list.header}>
          <Link href="/" className={list.back}>
            <span aria-hidden="true">←</span> home
          </Link>
          <p className={list.kicker}>Notes from the workbench</p>
          <h1>Writing<span className={list.period}>.</span></h1>
          <p className={list.intro}>Notes on building, learning, and the questions that stay interesting.</p>
        </header>

        <div className={list.content}>
          <section className={list.list} aria-label="Blog posts">
            {posts.length === 0 && <p className={list.empty}>No posts yet.</p>}
            {posts.map((p, index) => (
              <a
                key={p.slug}
                href={`https://blog.fariqdoing.tech/posts/${p.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className={list.item}
              >
                <div className={list.itemTop}>
                  <span className={list.number}>{String((currentPage - 1) * PER_PAGE + index + 1).padStart(2, "0")}</span>
                  <span className={list.itemTitle}>{p.title}</span>
                  <span className={list.arrow} aria-hidden="true">↗</span>
                </div>
                {p.description && <p className={list.itemDesc}>{p.description}</p>}
                <div className={list.itemMeta}>
                  <span>{formatDate(p.date)}</span>
                  <span className={styles.category}>{p.category}</span>
                </div>
              </a>
            ))}
          </section>
          <Pagination basePath="/blog" currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
