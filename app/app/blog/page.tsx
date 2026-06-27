import { Spectral } from "next/font/google";
import Link from "next/link";
import homeStyles from "../page.module.css";
import styles from "./page.module.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const posts = [
  {
    title: "Building an OS from Scratch: Part 1 — The Bootloader",
    date: "2025-12-01",
    excerpt: "Setting up a minimal x86_64 bootloader using NASM and QEMU, walking through real mode, protected mode, and long mode transitions.",
    href: "https://github.com/0xfrq",
  },
  {
    title: "Understanding the Go Scheduler: A Deep Dive",
    date: "2025-10-15",
    excerpt: "An exploration of Go's M:N scheduling model — GOMAXPROCS, work stealing, and how goroutines map to OS threads.",
    href: "https://github.com/0xfrq",
  },
  {
    title: "Why I Write CLI Tools in Rust",
    date: "2025-08-20",
    excerpt: "Comparing ergonomics and performance across Python, Go, and Rust for command-line tooling.",
    href: "https://github.com/0xfrq",
  },
  {
    title: "Automating My Development Environment with Nix",
    date: "2025-06-10",
    excerpt: "Reproducible dev shells, declarative package management, and how Nix changed my workflow.",
    href: "https://github.com/0xfrq",
  },
];

export default function Blog() {
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

        <h2 style={{ marginBottom: "1.25rem", fontWeight: 600 }}>blog</h2>

        <div className={styles.list}>
          {posts.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
            >
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{p.title}</span>
                <span className={styles.itemDate}>{p.date}</span>
              </div>
              <div className={styles.itemExcerpt}>{p.excerpt}</div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
