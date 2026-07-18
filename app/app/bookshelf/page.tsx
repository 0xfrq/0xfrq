"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { allBooks, bookHeight, bookWidth } from "../lib/books";
import styles from "./page.module.css";

export default function BookshelfPage() {
  const shelfRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const rafRef = useRef(0);
  const tiltRef = useRef(0);
  const parallaxRef = useRef(0);
  const [tilt, setTilt] = useState(0);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    const el = shelfRef.current;
    if (!el) return;

    const FRICTION = 0.92;
    const WHEEL_FORCE = 1.8;
    const TILT_SCALE = 0.28;
    const TILT_DECAY = 0.88;
    const PARALLAX_SPEED = 0.5;
    const LERP = 0.1;

    function clamp(v: number, min: number, max: number) {
      return Math.max(min, Math.min(max, v));
    }

    const tick = () => {
      // Parallax: track page scroll, move header slower
      const sy = window.scrollY;
      parallaxRef.current += (sy * PARALLAX_SPEED - parallaxRef.current) * LERP;

      // Shelf momentum
      velocityRef.current *= FRICTION;
      tiltRef.current *= TILT_DECAY;

      const sd = Math.round(velocityRef.current * 10) / 10;
      if (Math.abs(sd) >= 0.5) {
        el.scrollBy({ left: sd, behavior: "instant" });
        const newTilt = Math.round(clamp(-sd * TILT_SCALE, -18, 18) * 10) / 10;
        tiltRef.current = newTilt;
        setTilt(newTilt);
      } else {
        velocityRef.current = 0;
        tiltRef.current *= 0.85;
        if (Math.abs(tiltRef.current) < 0.1) {
          tiltRef.current = 0;
          if (tilt !== 0) setTilt(0);
        } else {
          setTilt(tiltRef.current);
        }
      }

      const py = Math.round(parallaxRef.current);
      if (Math.abs(py - parallax) > 0.5) setParallax(py);

      rafRef.current = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      velocityRef.current += e.deltaY * WHEEL_FORCE * 0.016;
      velocityRef.current = clamp(velocityRef.current, -60, 60);
    };

    rafRef.current = requestAnimationFrame(tick);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("wheel", onWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [shuffled] = useState(() => {
    const arr = [...allBooks];
    let seed = 42;
    const next = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  return (
    <main className={styles.main}>
      <div className={styles.parallaxWrap} style={{ transform: `translateY(${parallax}px)` }}>
        <div className={styles.document}>
          <Link href="/" className={styles.back}>
            <span aria-hidden="true">←</span> Back
          </Link>

          <div className={styles.header}>
            <h1>
              On my <span className="serif">Bookshelf</span>
              <span className={styles.period}>.</span>
            </h1>
            <p className={styles.subtitle}>
              This is a personal collection of books I have read — and some I am still reading.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.shelfWall}>
        <div className={styles.shelf} ref={shelfRef}>
          {shuffled.map((book) => {
            const w = bookWidth(book);
            const h = bookHeight(book);
            return (
              <div
                key={book.title}
                className={styles.book}
                style={{
                  backgroundColor: book.bg,
                  color: book.color,
                  width: `${w}px`,
                  height: `${h}px`,
                  transform: `skewY(${tilt}deg)`,
                }}
                title={`${book.title} — ${book.author} (${book.pages}pp, ${book.format})`}
              >
                <span className={styles.bookTitle}>{book.title}</span>
                <span className={styles.bookAuthor}>{book.author}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.shelfPlank} aria-hidden="true" />
      </div>

      {/* Mobile stacked list */}
      <div className={styles.mobileStack}>
        {shuffled.map((book) => {
          const h = bookHeight(book);
          return (
            <div
              key={book.title}
              className={styles.mobileBook}
              style={{
                backgroundColor: book.bg,
                color: book.color,
                height: `${Math.round(h * 0.14)}px`,
              }}
              title={`${book.title} — ${book.author}`}
            >
              <span className={styles.mobileTitle}>{book.title}</span>
              <span className={styles.mobileAuthor}>{book.author}</span>
            </div>
          );
        })}
      </div>

    </main>
  );
}
