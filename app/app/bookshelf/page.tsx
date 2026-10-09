import type { CSSProperties } from "react";
import Link from "next/link";
import ShelfScroller from "../components/ShelfScroller";
import { allBooks, bookHeight, bookWidth } from "../lib/books";
import styles from "./page.module.css";

// Same seeded shuffle as before, computed once at build time instead of in the browser.
const shuffled = (() => {
  const arr = [...allBooks];
  let seed = 42;
  const next = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
})();

export default function BookshelfPage() {
  return (
    <main className={styles.main}>
      <div className={`shell ${styles.header}`}>
        <Link href="/" className={styles.back}>
          <span aria-hidden="true">←</span> Back
        </Link>
        <h1 id="bookshelf-heading">
          On my <span className={styles.accentWord}>Bookshelf</span>
          <span className={styles.period}>.</span>
        </h1>
        <p className={styles.subtitle}>
          This is a personal collection of books I have read — and some I am still reading.
        </p>
      </div>

      <div className={styles.shelfWall}>
        <ShelfScroller className={styles.shelf} tabIndex={0} aria-labelledby="bookshelf-heading">
          {shuffled.map((book) => (
            <div
              key={book.title}
              className={styles.book}
              style={
                {
                  "--spine-bg": book.bg,
                  "--spine-ink": book.color,
                  "--spine-w": `${Math.round(10 + bookWidth(book) * 0.9)}px`,
                  "--spine-h": `${Math.round(bookHeight(book) * 0.8)}px`,
                } as CSSProperties
              }
              title={`${book.title} — ${book.author} (${book.pages}pp, ${book.format})`}
            >
              <span className={styles.bookTitle}>{book.title}</span>
              <span className={styles.bookAuthor}>{book.author}</span>
            </div>
          ))}
        </ShelfScroller>
      </div>

      {/* Mobile stacked list */}
      <div className={`shell ${styles.mobileStack}`}>
        {shuffled.map((book) => (
          <div
            key={book.title}
            className={styles.mobileBook}
            style={
              {
                "--spine-bg": book.bg,
                "--spine-ink": book.color,
                "--spine-h": `${Math.round(bookHeight(book) * 0.12)}px`,
              } as CSSProperties
            }
            title={`${book.title} — ${book.author}`}
          >
            <span className={styles.mobileTitle}>{book.title}</span>
            <span className={styles.mobileAuthor}>{book.author}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
