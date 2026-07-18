"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  return (
    <header className={styles.chip}>
      <Link href="/" className={styles.wordmark} aria-label="Fariq home">
        F
      </Link>
      <span className={styles.divider} aria-hidden="true" />
      <nav className={styles.links} aria-label="Primary">
        <Link href="/projects" className={styles.link}>
          projects
        </Link>
        <Link href="/blog" className={styles.link}>
          blog
        </Link>
      </nav>
      <span className={styles.divider} aria-hidden="true" />
      <ThemeToggle />
    </header>
  );
}
