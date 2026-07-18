"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");

    if (!finePointer.matches) return;

    const move = () => {
      position.current.x += (target.current.x - position.current.x) * 0.55;
      position.current.y += (target.current.y - position.current.y) * 0.55;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
      }

      raf.current = window.requestAnimationFrame(move);
    };

    const onPointerMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      if (!isVisible) setIsVisible(true);
      if (!raf.current) raf.current = window.requestAnimationFrame(move);
    };

    const onPointerOver = (event: PointerEvent) => {
      const targetElement = event.target;
      if (!(targetElement instanceof Element)) return;
      setIsActive(Boolean(targetElement.closest("a, button, [role='button'], input, textarea, select")));
    };

    const onPointerLeave = () => setIsVisible(false);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      if (raf.current) {
        window.cancelAnimationFrame(raf.current);
        raf.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={`${styles.cursor} ${isVisible ? styles.visible : ""} ${isActive ? styles.active : ""}`}
      aria-hidden="true"
    />
  );
}
