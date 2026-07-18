"use client";

import { useEffect } from "react";

const EASE = 0.12;
const WHEEL_MULTIPLIER = 0.92;
const STOP_THRESHOLD = 0.5;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function SmoothScroll() {
  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (coarsePointer.matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const tick = () => {
      current = window.scrollY;
      const distance = target - current;

      if (Math.abs(distance) < STOP_THRESHOLD) {
        window.scrollTo(0, target);
        raf = 0;
        return;
      }

      window.scrollTo(0, current + distance * EASE);
      raf = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.defaultPrevented) return;

      event.preventDefault();
      target = clamp(target + event.deltaY * WHEEL_MULTIPLIER, 0, maxScroll());
      start();
    };

    const syncTarget = () => {
      target = window.scrollY;
      current = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", syncTarget, { passive: true });
    window.addEventListener("resize", syncTarget, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", syncTarget);
      window.removeEventListener("resize", syncTarget);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
