"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

// Maps a vertical mouse wheel onto the horizontal shelf, but hands the wheel
// back to the page once the shelf reaches either end.
export default function ShelfScroller({ children, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0 && event.deltaY < 0;
      const atEnd = el.scrollLeft >= max - 1 && event.deltaY > 0;
      if (max <= 0 || atStart || atEnd) return;
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
