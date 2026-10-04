"use client";

import { useEffect } from "react";

/**
 * Section entrances, once per block.
 *
 * Blocks marked `data-reveal` fade and rise in. Blocks marked `data-stage` run
 * their own drawn sequence (see globals.css). Only blocks that are still below
 * the window when the page becomes interactive are hidden first, so nothing
 * already on screen flashes, and the page reads fine without JavaScript.
 */
export function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const attributeOf = (element: Element) =>
      element.hasAttribute("data-stage") ? "data-stage" : "data-reveal";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute(attributeOf(entry.target), "in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    const fold = window.innerHeight * 0.92;
    for (const element of document.querySelectorAll("[data-reveal], [data-stage]")) {
      if (element.getBoundingClientRect().top < fold) continue;
      element.setAttribute(attributeOf(element), "pending");
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
