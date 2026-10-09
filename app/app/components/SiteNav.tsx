"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import styles from "./SiteNav.module.css";

const links = [
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className={styles.bar}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" className={styles.wordmark} aria-label="Fariq home">
          F
        </Link>
        <div className={styles.end}>
          <nav className={styles.links} aria-label="Primary">
            {links.map(({ href, label }) => {
              const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={styles.link}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <span className={styles.divider} aria-hidden="true" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
