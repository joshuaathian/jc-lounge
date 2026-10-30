import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import BrandLogo from "@/components/BrandLogo";

const links = [
  { label: "Experience", href: "#experience" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes; simple focus containment while open.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const focusables = drawer?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-white/5 bg-jc-ink/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-[72px] lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="JC Lounge — back to top">
          <BrandLogo className="h-11 w-11 drop-shadow-[0_0_10px_rgba(232,201,106,0.2)]" />
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-semibold tracking-[0.14em] text-jc-ivory">
              {site.wordmark}
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.28em] text-jc-copy">
              {site.subtitle}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-[13px] font-medium uppercase tracking-[0.18em] text-jc-ivory/80 transition-colors hover:text-jc-ivory"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reserve"
            className="rounded-md bg-jc-gold px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-jc-ink transition-colors hover:bg-jc-goldhi active:bg-jc-golddeep"
          >
            Reserve a Table
          </a>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-jc-ivory transition-colors hover:bg-white/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={drawerRef}
          className="border-t border-white/5 bg-jc-ink/95 backdrop-blur-md md:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col px-6 py-6">
            {[...links, { label: "Reserve", href: "#reserve" }].map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-4 font-display text-lg tracking-[0.08em] text-jc-ivory transition-colors last:border-0 hover:text-jc-goldhi"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
