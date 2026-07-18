"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import styles from "./Reveal.module.css";

type RevealTag = "div" | "section" | "article";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealTag;
  children: ReactNode;
  delay?: string;
};

export default function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = "0ms",
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isArmed, setIsArmed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsArmed(true);

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const revealStyle = {
    ...style,
    "--reveal-delay": delay,
  } as CSSProperties;

  return (
    <Tag
      ref={(node) => {
        ref.current = node;
      }}
      className={`${styles.reveal} ${isArmed ? styles.armed : ""} ${isVisible ? styles.visible : ""} ${className ?? ""}`}
      style={revealStyle}
      {...props}
    >
      {children}
    </Tag>
  );
}
