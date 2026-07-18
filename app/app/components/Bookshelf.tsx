"use client";

import Link from "next/link";
import { shelfBooks, bookHeight } from "../lib/books";
import styles from "./Bookshelf.module.css";

export default function Bookshelf() {
  return (
    <section className={styles.section} aria-labelledby="bookshelf-title">
      <h2 id="bookshelf-title" className={styles.heading}>
        Bookshelf
      </h2>
      <div className={styles.stack}>
        {shelfBooks.map((book) => {
          const h = bookHeight(book);
          return (
            <Link
              key={book.title}
              href="/bookshelf"
              className={styles.book}
              style={{
                backgroundColor: book.bg,
                color: book.color,
                height: `${Math.round(h * 0.14)}px`,
              }}
              title={`${book.title} — ${book.author}`}
            >
              <span className={styles.title}>{book.title}</span>
              <span className={styles.author}>{book.author}</span>
            </Link>
          );
        })}
      </div>
      <Link href="/bookshelf" className={styles.more}>
        More books{" "}
        <span className={styles.moreArrow} aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
