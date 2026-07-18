import type { CSSProperties } from "react";
import Link from "next/link";
import Bio from "./components/Bio";
import Bookshelf from "./components/Bookshelf";
import ContributionGraph from "./components/ContributionGraph";
import Reveal from "./components/Reveal";
import styles from "./page.module.css";

const focusAreas = [
  "Systems programming",
  "AI & machine learning",
  "Developer tooling",
  "Backend development",
  "Embedded systems",
  "Technical writing",
];

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.document}>
        <section className={styles.hero} id="about">
          <h1 className={styles.headline}>
            Building systems with <span className={styles.serifWord}>curiosity</span>
            <span className={styles.period}>.</span>
          </h1>
          <Bio />
          <div className={styles.heroLinks}>
            <Link href="/projects" className={styles.textLink}>
              See the work <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/blog" className={styles.textLink}>
              Writing <span aria-hidden="true">↗</span>
            </Link>
            <a
              href="https://www.linkedin.com/in/muhammad-fariq-faqih-04219b195/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.textLink}
            >
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <Reveal as="section" className={`${styles.section} ${styles.graphSection}`} delay="90ms">
          <ContributionGraph />
        </Reveal>

        <Reveal as="section" className={styles.section} aria-labelledby="focus-title" delay="120ms">
          <div className={styles.sectionHeading}>
            <h2 id="focus-title">Current focus</h2>
            <span className={styles.sectionRule} aria-hidden="true" />
          </div>
          <div className={styles.indexList}>
            {focusAreas.map((area, index) => (
              <div className={styles.indexRow} key={area} style={{ "--row-index": index } as CSSProperties}>
                <span className={styles.indexNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.indexName}>{area}</span>
                <span className={styles.indexArrow} aria-hidden="true">↗</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className={`${styles.section} ${styles.compactSection}`} aria-labelledby="note-title" delay="140ms">
          <div className={styles.sectionHeading}>
            <h2 id="note-title">A small note</h2>
            <span className={styles.sectionRule} aria-hidden="true" />
          </div>
          <div className={styles.noteGrid}>
            <div className={styles.noteIcon} aria-hidden="true">
              <svg viewBox="0 0 64 64" role="img">
                <path d="M18 10h21l7 7v37H18z" />
                <path d="M39 10v8h7" />
                <path d="M25 28h14" />
                <path d="M25 36h14" />
                <path d="M25 44h9" />
              </svg>
            </div>
            <p className={styles.noteCopy}>
              I like understanding things by making them from scratch — especially
              the parts that are usually hidden. When I am not at a terminal, I am
              probably reading, taking things apart, or following a new question.
            </p>
          </div>
        </Reveal>

        <Reveal as="section" className={styles.section} delay="160ms">
          <Bookshelf />
        </Reveal>
      </div>
    </main>
  );
}
