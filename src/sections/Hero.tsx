import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import BrandLogo from "@/components/BrandLogo";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  // Subtle parallax on the hero image only (text never moves).
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = imgWrapRef.current;
        if (!el) return;
        const y = Math.min(window.scrollY * 0.18, 140);
        el.style.transform = `translateY(${y}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden" aria-label="Welcome">
      <div ref={imgWrapRef} className="absolute inset-0 -bottom-40" aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}images/hero.webp`}
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      {/* Gradient mask: transparent upper half into near-black base */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,9,0.55) 0%, rgba(9,9,9,0.15) 38%, rgba(9,9,9,0.72) 68%, #090909 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-24 text-center md:py-28 lg:px-10">
        <p
          data-animate
          style={{ "--stagger": 0 } as React.CSSProperties}
          className={`eyebrow ${loaded ? "in" : ""}`}
        >
          {site.locationLine}
        </p>

        <h1
          data-animate
          style={{ "--stagger": 1 } as React.CSSProperties}
          className={`mt-5 ${loaded ? "in" : ""}`}
        >
          <BrandLogo
            priority
            className="h-auto max-h-[35dvh] w-auto max-w-[80vw] drop-shadow-[0_10px_28px_rgba(0,0,0,0.7)] sm:max-h-[39dvh] md:max-h-[42dvh]"
          />
        </h1>

        <p
          data-animate
          style={{ "--stagger": 3 } as React.CSSProperties}
          className={`mt-5 max-w-xl font-accent text-2xl italic leading-snug text-jc-ivory/90 md:text-[1.7rem] ${loaded ? "in" : ""}`}
        >
          {site.tagline}
        </p>

        <p
          data-animate
          style={{ "--stagger": 4 } as React.CSSProperties}
          className={`mt-3 text-[15px] font-medium tracking-wide text-jc-copy ${loaded ? "in" : ""}`}
        >
          {site.proofLine}
        </p>

        <div
          data-animate
          style={{ "--stagger": 5 } as React.CSSProperties}
          className={`mt-9 flex flex-wrap items-center justify-center gap-4 ${loaded ? "in" : ""}`}
        >
          <a
            href="#menu"
            className="rounded-md border border-jc-gold/60 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-jc-goldhi transition-colors hover:border-jc-goldhi hover:bg-jc-gold/10 active:bg-jc-gold/20"
          >
            View Menu
          </a>
          <a
            href="#reserve"
            className="rounded-md bg-jc-gold px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-jc-ink transition-colors hover:bg-jc-goldhi active:bg-jc-golddeep"
          >
            Reserve a Table
          </a>
        </div>
      </div>
    </section>
  );
}
