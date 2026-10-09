import Link from "next/link";
import Bio from "./components/Bio";
import Bookshelf from "./components/Bookshelf";
import ContributionGraph from "./components/ContributionGraph";
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
    <main>
      <section className={`shell ${styles.hero}`} id="about">
        <h1 className={styles.headline}>
          Building systems with <span className={styles.accentWord}>curiosity</span>
          <span className={styles.period}>.</span>
        </h1>
        <div className={styles.heroBody}>
          <Bio />
          <div className={styles.heroLinks}>
            <Link href="/projects" className={styles.heroLink}>
              See the work <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/blog" className={styles.heroLink}>
              Writing <span aria-hidden="true">↗</span>
            </Link>
            <a
              href="https://www.linkedin.com/in/muhammad-fariq-faqih-04219b195/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroLink}
            >
              Get in touch <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className={`shell ${styles.graph}`}>
        <ContributionGraph />
      </section>

      <section className="shell" aria-labelledby="focus-title">
        <div className="split">
          <div className="split__head">
            <h2 id="focus-title">Current focus</h2>
          </div>
          <ol className={`split__body ${styles.focusList}`}>
            {focusAreas.map((area, index) => (
              <li className={styles.focusRow} key={area}>
                <span className={styles.focusNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.focusName}>{area}</span>
                <span className={styles.focusArrow} aria-hidden="true">↗</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell" aria-labelledby="note-title">
        <div className="split">
          <div className="split__head">
            <h2 id="note-title">A small note</h2>
          </div>
          <div className={`split__body ${styles.note}`}>
            <svg className={styles.noteIcon} viewBox="0 0 64 64" aria-hidden="true">
              <path d="M18 10h21l7 7v37H18z" />
              <path d="M39 10v8h7" />
              <path d="M25 28h14" />
              <path d="M25 36h14" />
              <path d="M25 44h9" />
            </svg>
            <p className={styles.noteCopy}>
              I like understanding things by making them from scratch — especially
              the parts that are usually hidden. When I am not at a terminal, I am
              probably reading, taking things apart, or following a new question.
            </p>
          </div>
        </div>
      </section>

      <Bookshelf />
    </main>
  );
}
