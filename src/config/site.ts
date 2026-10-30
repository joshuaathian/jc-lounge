/**
 * Site configuration — OWNER INPUTS NEEDED.
 *
 * Every `null` value below is a launch blocker: replace it with the
 * confirmed detail and the matching UI appears automatically.
 * See README.md → "Before launch".
 */
export const site = {
  name: "JC Lounge",
  wordmark: "JC Lounge",
  subtitle: "Sports Bar · Juba",
  tagline: "Where Champions Watch, Drink & Dine.",
  proofLine: "Live sport, good food, late nights.",
  locationLine: "Juba · South Sudan",

  contact: {
    // TODO(owner): exact street address / map pin
    address: null as string | null,
    mapUrl: null as string | null,
    // TODO(owner): telephone and WhatsApp in international format, e.g. "+211…"
    phone: null as string | null,
    whatsapp: null as string | null,
    // TODO(owner): public email
    email: null as string | null,
    // TODO(owner): confirmed opening hours, e.g. "Daily · 12:00 – 02:00"
    hours: null as string | null,
  },

  // TODO(owner): real social profile URLs. Empty = nothing renders (no dead links).
  socials: [] as { label: string; href: string }[],

  /** True while menu items/prices await owner confirmation. */
  menuPendingConfirmation: true,
  currencySymbol: "$", // TODO(owner): confirm currency (backup used "$")

  /** Sports categories shown at JC Lounge (confirmed list from brief). */
  sports: ["Football", "Basketball", "UFC", "Formula 1", "Rugby", "Cricket", "Boxing"],
} as const;
