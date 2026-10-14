"use client";

import { useEffect } from "react";

// A small signal ring expands from wherever you click (styles in globals.css).
export default function ClickPulse() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onPointerDown(e: PointerEvent) {
      if (e.button !== 0) return;
      const ring = document.createElement("span");
      ring.className = "click-pulse";
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      document.body.appendChild(ring);
      ring.addEventListener("animationend", () => ring.remove(), { once: true });
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return null;
}
