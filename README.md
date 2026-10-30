# JC Lounge — Sports Bar · Juba

A mobile-first, single-page marketing and reservation site for JC Lounge, a sports bar in Juba, South Sudan. Rebuilt from scratch (the supplied backup HTML was not deployable: truncated mid-menu, no working JavaScript, invalid CSS characters).

## Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS. Fonts: Cinzel (display), Barlow (UI/body), Cormorant Garamond italic (accents) via Google Fonts.
- **Backend**: Hono + tRPC. Reservations are validated (Zod), rate-limited per IP (5 per 10 min), and stored in MySQL via Drizzle ORM (`reservations` table, status defaults to `pending` — a table is only confirmed by staff follow-up, never by the website).
- **Content**: menu, gallery, and business details live in structured data, not markup:
  - `src/config/site.ts` — contact, hours, socials, currency, feature flags
  - `src/data/menu.ts` — food / spirits / wine items and prices
  - `src/data/gallery.ts` — gallery images, captions, alt text

## Run

```bash
npm install
npm run db:push   # sync schema (first run / schema changes)
npm run dev       # http://localhost:3000
npm run build && npm start   # production
```

## Design

Charcoal `#090909` / raised `#171411` / ivory `#FAF7F2` / muted `#9C9386` / golds `#C9A84C` · `#E8C96A` · `#A07830`. Letter-by-letter hero reveal, staggered scroll entrances, subtle hero parallax, editorial menu list with dotted leaders, accessible tabs and lightbox (keyboard + Escape), focus-trapped mobile drawer, `prefers-reduced-motion` support throughout.

## Before launch — owner inputs still needed

All of these are deliberately marked as placeholders in code/config rather than invented:

1. **Photography** — every image in `public/images/` is AI-generated placeholder photography for layout development. Replace with real, licensed photos of the venue, food, drinks, and events (keep one strong wide hero shot), and update alt text in `src/data/gallery.ts`.
2. **Logo** — the "JC" monogram is a temporary text mark. Supply the official logo or approve this one.
3. **Contact details** — `src/config/site.ts` → `contact`: exact address/map pin, telephone, WhatsApp number, email, opening hours. All currently render "to be confirmed".
4. **Social links** — `site.socials` is an empty array; nothing renders until real URLs are added (no dead `#` links).
5. **Menu & prices** — `src/data/menu.ts` was recovered from the old site's backup. Prices are placeholders; spellings were corrected where the source had obvious errors (`Cheddermelt` → Cheddar Melt, `Chivase` → Chivas Regal, `Olmega/Rposado` → Olmeca Reposado, `Bombay Saphire` → Bombay Sapphire, `Absolute` → Absolut) — verify against the physical menu. **Wine & Bubbles is incomplete**: the source backup ends mid-category. Confirm currency (currently `$`).
6. **Cocktail list** — the Cocktails tab shows an explicit "coming soon" state until the real list is supplied (`cocktailsComingSoon` in `src/data/menu.ts`).
7. **Screen count / live schedule** — no number of screens is claimed anywhere until confirmed. A "What's showing" module can be added once a schedule process exists.
8. **Happy hour offer** — the panel intentionally omits days/times/offer until confirmed.
9. **Reservation workflow** — requests are stored with status `pending`. Staff need a way to view them (admin screen or DB access) and a confirmation procedure; a WhatsApp fallback CTA can be enabled once the number is configured.
10. **Reviews** — omitted entirely until real, attributable reviews are approved.
11. **Legal & ops** — Privacy Policy / Terms links, domain, analytics preference, and consent wording.
