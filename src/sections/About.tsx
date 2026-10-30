import { useReveal } from "@/hooks/useReveal";

export default function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="bg-jc-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[2fr_3fr] lg:px-10">
        <figure
          data-animate
          style={{ "--stagger": 0 } as React.CSSProperties}
          className="hairline-frame overflow-hidden rounded-lg"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/about.webp`}
            alt="A bartender pouring a drink behind the dark wooden bar at JC Lounge"
            className="aspect-[2/3] w-full object-cover"
            loading="lazy"
            decoding="async"
            width={1024}
            height={1536}
          />
        </figure>

        <div>
          <p data-animate style={{ "--stagger": 1 } as React.CSSProperties} className="eyebrow">
            The Lounge
          </p>
          <h2
            data-animate
            style={{ "--stagger": 2 } as React.CSSProperties}
            className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-[0.02em] text-jc-ivory md:text-5xl"
          >
            Juba&apos;s night, poured well.
          </h2>
          <div
            data-animate
            style={{ "--stagger": 3 } as React.CSSProperties}
            className="mt-6 max-w-xl space-y-5 text-[15px] leading-relaxed text-jc-copy"
          >
            <p>
              JC Lounge is a sports bar built for the nights that matter — the
              derby, the title fight, the last-over finish. Low light, warm
              brass, and screens you can actually see from your table.
            </p>
            <p>
              The kitchen cooks late and the bar pours honest measures. Bring
              your crew, take a big table, and let the match run.
            </p>
          </div>

          <ul
            data-animate
            style={{ "--stagger": 4 } as React.CSSProperties}
            className="mt-10 grid max-w-lg grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2"
          >
            {["Live match viewing", "Group tables", "Kitchen open late", "Full bar & cocktails"].map(
              (f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-jc-ivory/85">
                  <span aria-hidden="true" className="h-px w-6 bg-jc-gold" />
                  {f}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
