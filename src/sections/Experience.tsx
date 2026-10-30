import { site } from "@/config/site";
import { useReveal } from "@/hooks/useReveal";

export default function Experience() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="experience" ref={ref} className="relative bg-jc-ink py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid items-end gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p data-animate style={{ "--stagger": 0 } as React.CSSProperties} className="eyebrow">
              Live Sport
            </p>
            <h2
              data-animate
              style={{ "--stagger": 1 } as React.CSSProperties}
              className="mt-4 max-w-md font-display text-4xl font-semibold leading-[1.08] tracking-[0.02em] text-jc-ivory md:text-5xl"
            >
              Match night lives here.
            </h2>
          </div>
          <p
            data-animate
            style={{ "--stagger": 2 } as React.CSSProperties}
            className="max-w-md text-[15px] leading-relaxed text-jc-copy md:justify-self-end"
          >
            Big screens, cold drinks, and a room that rises with every goal.
            Come early, stay late — the best seat in Juba is the one with your
            name on it.
          </p>
        </div>

        <figure
          data-animate
          style={{ "--stagger": 2 } as React.CSSProperties}
          className="hairline-frame mt-14 overflow-hidden rounded-lg"
        >
          <img
            src="/images/interior.webp"
            alt="A wall of glowing screens above the backlit bar at a sports lounge"
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
            decoding="async"
            width={1920}
            height={1080}
          />
        </figure>

        <ul
          data-animate
          style={{ "--stagger": 3 } as React.CSSProperties}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
          aria-label="Sports shown at JC Lounge"
        >
          {site.sports.map((s) => (
            <li
              key={s}
              className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-jc-ivory/75"
            >
              <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-jc-gold" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
