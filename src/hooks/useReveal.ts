import { useEffect, useRef } from "react";

/**
 * Reveal-once-on-scroll: observes every [data-animate] descendant of the
 * returned ref (or the element itself) and adds `.in` the first time it
 * enters the viewport. Content is never permanently hidden: if the
 * observer never fires (old browser, JS off), CSS keeps elements at their
 * natural state only when .in is present — so we also add .in immediately
 * for users who prefer reduced motion.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets: HTMLElement[] = [];
    if (root.hasAttribute("data-animate")) targets.push(root);
    root.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => targets.push(el));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return ref;
}
