import { useState } from "react";
import { galleryImages } from "@/data/gallery";
import { useReveal } from "@/hooks/useReveal";
import Lightbox from "@/components/Lightbox";

export default function Gallery() {
  const ref = useReveal<HTMLElement>();
  const [openAt, setOpenAt] = useState<number | null>(null);

  return (
    <section id="gallery" ref={ref} className="bg-jc-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p data-animate style={{ "--stagger": 0 } as React.CSSProperties} className="eyebrow">
              Gallery
            </p>
            <h2
              data-animate
              style={{ "--stagger": 1 } as React.CSSProperties}
              className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-[0.02em] text-jc-ivory md:text-5xl"
            >
              Nights at the Lounge.
            </h2>
          </div>
          <p
            data-animate
            style={{ "--stagger": 2 } as React.CSSProperties}
            className="max-w-sm text-[15px] leading-relaxed text-jc-copy"
          >
            Screens up, glasses raised, coals glowing — a few frames from a
            JC evening.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              data-animate
              style={{ "--stagger": Math.min(i + 1, 6) } as React.CSSProperties}
              onClick={() => setOpenAt(i)}
              aria-label={`Open photo: ${img.caption}`}
              className={`gallery-item group relative overflow-hidden rounded-lg text-left ${
                img.anchor ? "col-span-2 row-span-2" : ""
              } ${img.wide ? "col-span-2 md:col-span-4" : ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading={i > 1 ? "lazy" : undefined}
                decoding="async"
                width={1400}
                height={933}
                className={`w-full object-cover ${
                  img.anchor
                    ? "aspect-[3/2] md:h-full"
                    : img.wide
                      ? "aspect-[3/2] md:aspect-[21/7]"
                      : "aspect-[3/2]"
                }`}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-jc-ink/85 to-transparent px-4 pb-3 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              >
                <span className="font-accent text-lg italic text-jc-goldhi">{img.caption}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {openAt !== null && (
        <Lightbox
          images={galleryImages}
          index={openAt}
          onClose={() => setOpenAt(null)}
          onNavigate={setOpenAt}
        />
      )}
    </section>
  );
}
