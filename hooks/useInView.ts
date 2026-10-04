"use client";

import { useEffect, useState, type RefObject } from "react";

/** True while the element is on screen. Used to start and pause timed motion. */
export function useInView(ref: RefObject<Element | null>, threshold = 0.3): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}
