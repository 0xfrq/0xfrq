"use client";

import { useTheme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle({
  style,
}: {
  style?: React.CSSProperties;
}) {
  const { theme, toggle } = useTheme();

  const label = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      style={style}
      onClick={toggle}
      aria-label={`Switch to ${label} mode`}
    >
      {label}
    </button>
  );
}
