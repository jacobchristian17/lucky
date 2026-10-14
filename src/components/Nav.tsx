"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "reflections", label: "Reflections" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ shortName }: { shortName: string }) {
  const [active, setActive] = useState("top");
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Highlight whichever section is crossing the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const l of links) {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Slide the highlight pill under the active link (and keep it aligned on resize).
  useEffect(() => {
    function place() {
      const link = navRef.current?.querySelector<HTMLElement>(`a[href="#${active}"]`);
      const pill = indicatorRef.current;
      if (!link || !pill) return;
      pill.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop}px)`;
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.height = `${link.offsetHeight}px`;
      pill.style.opacity = "1";
    }
    place();
    document.fonts?.ready.then(place); // link widths change once the web fonts load
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#top" className="brand">
          <Image src="/profile.jpg" width={36} height={36} alt="" className="brand-photo" priority />
          {shortName}
        </a>
        <nav aria-label="Main" ref={navRef}>
          <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "active" : undefined}
              aria-current={active === l.id ? "location" : undefined}
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
