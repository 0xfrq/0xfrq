"use client";

import { useRef, useCallback } from "react";
import { useTheme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle({ style }: { style?: React.CSSProperties }) {
  const { theme, toggle } = useTheme();
  const rafRef = useRef<number | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const label = theme === "dark" ? "light" : "dark";

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = btnRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const maxSlide = 8;
      el.style.transform = `translate(${dx * maxSlide}px, ${dy * maxSlide}px)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)";
  }, []);

  return (
    <button
      ref={btnRef}
      className={styles.toggle}
      style={style}
      onClick={toggle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Toggle dark/light mode"
    >
      {label}
    </button>
  );
}
