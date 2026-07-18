"use client";

import { useEffect, useState } from "react";
import styles from "./IntroAnimation.module.css";

export default function IntroAnimation() {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.intro = "running";
    const timer = window.setTimeout(() => {
      setIsDone(true);
      delete document.documentElement.dataset.intro;
    }, 1450);

    return () => {
      window.clearTimeout(timer);
      delete document.documentElement.dataset.intro;
    };
  }, []);

  if (isDone) return null;

  return (
    <div className={styles.intro} aria-hidden="true">
      <div className={styles.mark}>F</div>
      <div className={styles.rule} />
      <div className={styles.scan} />
    </div>
  );
}
