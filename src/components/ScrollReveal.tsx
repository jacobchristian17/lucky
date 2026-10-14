"use client";

import { useEffect } from "react";

// Marks [data-reveal] elements with data-revealed while they're in view (styles in globals.css).
// When an element leaves, it's reset with data-from="below" or "above", so it animates in again
// from the direction you scroll back from.
// Render this at the END of the page: its effect must run only after the page content has
// hydrated, or the attributes it adds cause a hydration mismatch.
export default function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => (el.dataset.revealed = ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.intersectionRatio >= 0.15) {
            el.dataset.revealed = "";
          } else if (!entry.isIntersecting) {
            delete el.dataset.revealed;
            el.dataset.from = entry.boundingClientRect.top < 0 ? "above" : "below";
          }
        }
      },
      { threshold: [0, 0.15], rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
