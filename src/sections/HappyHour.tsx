import { useReveal } from "@/hooks/useReveal";

export default function HappyHour() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} aria-label="Offers" className="relative overflow-hidden">
      <img
        src={`${import.meta.env.BASE_URL}images/happyhour.webp`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(9,9,9,0.92) 0%, rgba(9,9,9,0.72) 45%, rgba(9,9,9,0.35) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-24 lg:px-10">
        <div className="max-w-lg">
          <p data-animate style={{ "--stagger": 0 } as React.CSSProperties} className="eyebrow">
            Happy Hour
          </p>
          <h2
            data-animate
            style={{ "--stagger": 1 } as React.CSSProperties}
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[0.02em] text-jc-ivory md:text-4xl"
          >
            Golden hour, the JC way.
          </h2>
          <p
            data-animate
            style={{ "--stagger": 2 } as React.CSSProperties}
            className="mt-4 text-[15px] leading-relaxed text-jc-ivory/75"
          >
            Days, times, and the offer itself are being confirmed with the team
            — ask your server what&apos;s on tonight.
          </p>
          <a
            data-animate
            style={{ "--stagger": 3 } as React.CSSProperties}
            href="#reserve"
            className="mt-8 inline-block rounded-md border border-jc-gold/60 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-jc-goldhi transition-colors hover:border-jc-goldhi hover:bg-jc-gold/10"
          >
            Book for this week
          </a>
        </div>
      </div>
    </section>
  );
}
