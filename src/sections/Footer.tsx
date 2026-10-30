import { site } from "@/config/site";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-jc-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[2fr_1fr_1fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo className="h-12 w-12" />
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-semibold tracking-[0.14em] text-jc-ivory">
                {site.wordmark}
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.28em] text-jc-copy">
                {site.subtitle}
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-jc-copy">
            {site.tagline} {site.proofLine}
          </p>
          {site.socials.length > 0 && (
            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-md bg-jc-surface text-[12px] font-semibold tracking-wide text-jc-ivory/80 transition-colors hover:bg-jc-gold hover:text-jc-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-jc-gold">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { label: "Experience", href: "#experience" },
              { label: "Menu", href: "#menu" },
              { label: "About", href: "#about" },
              { label: "Gallery", href: "#gallery" },
              { label: "Reserve a Table", href: "#reserve" },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-underline text-jc-ivory/75 transition-colors hover:text-jc-ivory">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-jc-gold">Visit</h3>
          <ul className="mt-5 space-y-3 text-sm text-jc-ivory/75">
            <li>{site.contact.address ?? "Juba, South Sudan"}</li>
            <li>{site.contact.hours ?? "Hours to be confirmed"}</li>
            <li>{site.contact.phone ?? "Phone to be confirmed"}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs tracking-wide text-jc-copy/70 lg:px-10">
          <p>© {year} {site.name}, Juba. All rights reserved.</p>
          {/* TODO(owner): add Privacy Policy and Terms links once drafted */}
        </div>
      </div>
    </footer>
  );
}
