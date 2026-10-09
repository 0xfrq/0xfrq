import type { CSSProperties } from "react";
import Link from "next/link";
import { shelfBooks, bookHeight } from "../lib/books";
import styles from "./Bookshelf.module.css";

export default function Bookshelf() {
  return (
    <section className="shell" aria-labelledby="bookshelf-title">
      <div className="split">
        <div className="split__head">
          <h2 id="bookshelf-title">Bookshelf</h2>
        </div>
        <div className="split__body">
          <div className={styles.shelf}>
            {shelfBooks.map((book) => (
              <Link
                key={book.title}
                href="/bookshelf"
                className={styles.book}
                style={
                  {
                    "--spine-bg": book.bg,
                    "--spine-ink": book.color,
                    "--spine-h": `${Math.round(bookHeight(book) * 0.42)}px`,
                    "--spine-w": `${Math.round(30 + book.pages * 0.032)}px`,
                  } as CSSProperties
                }
                title={`${book.title} — ${book.author}`}
              >
                <span className={styles.title}>{book.title}</span>
                <span className={styles.author}>{book.author}</span>
              </Link>
            ))}
          </div>
          <Link href="/bookshelf" className={styles.more}>
            More books{" "}
            <span className={styles.moreArrow} aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
