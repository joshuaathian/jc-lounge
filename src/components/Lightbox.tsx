import { useCallback, useEffect, useRef } from "react";
import type { GalleryImage } from "@/data/gallery";

type Props = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
};

export default function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[index];

  const prev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate],
  );
  const next = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      // Keep Tab inside the dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
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
  }, [onClose, prev, next]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${image.caption} — image ${index + 1} of ${images.length}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-jc-ink/95 p-4 backdrop-blur-sm md:p-10"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lightbox-enter relative max-h-full w-full max-w-5xl">
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="max-h-[76dvh] w-full rounded-lg object-contain"
        />
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="font-accent text-xl italic text-jc-goldhi">{image.caption}</p>
          <p className="text-xs tracking-[0.2em] text-jc-copy">
            {index + 1} / {images.length}
          </p>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute -top-3 right-0 flex h-11 w-11 items-center justify-center rounded-md bg-jc-surface text-jc-ivory transition-colors hover:bg-jc-gold hover:text-jc-ink md:-right-3"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md bg-jc-surface/90 text-jc-ivory transition-colors hover:bg-jc-gold hover:text-jc-ink md:-left-14"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md bg-jc-surface/90 text-jc-ivory transition-colors hover:bg-jc-gold hover:text-jc-ink md:-right-14"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
