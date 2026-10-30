import { useMemo, useState } from "react";
import { site } from "@/config/site";
import { useReveal } from "@/hooks/useReveal";
import { trpc } from "@/providers/trpc";

type FormState = {
  name: string;
  phone: string;
  date: string;
  time: string;
  partySize: string;
  notes: string;
  consent: boolean;
};

const initial: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "",
  partySize: "2",
  notes: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[+0-9][0-9\s()-]{6,24}$/.test(f.phone.trim()))
    e.phone = "Enter a valid phone or WhatsApp number.";
  if (!f.date) e.date = "Choose a date.";
  else {
    const today = new Date();
    const t = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    if (f.date < t) e.date = "Choose a date in the future.";
  }
  if (!f.time) e.time = "Choose a time.";
  const size = Number(f.partySize);
  if (!Number.isInteger(size) || size < 1 || size > 40) e.partySize = "1 to 40 guests.";
  if (!f.consent) e.consent = "Please allow us to contact you about this request.";
  return e;
}

const inputCls =
  "w-full rounded-md border border-white/10 bg-jc-ink/60 px-4 py-3 text-[15px] text-jc-ivory placeholder:text-jc-copy/60 transition-colors hover:border-white/20 focus:border-jc-gold focus:outline-none";

function Field({
  label,
  error,
  children,
  htmlFor,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-jc-ivory/80"
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Reserve() {
  const ref = useReveal<HTMLElement>();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const create = trpc.reservation.create.useMutation({
    onSuccess: () => setDone(true),
  });

  const todayStr = useMemo(() => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (create.isPending) return;
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    create.mutate({
      name: form.name.trim(),
      phone: form.phone.trim(),
      date: form.date,
      time: form.time,
      partySize: Number(form.partySize),
      notes: form.notes.trim() || undefined,
      consent: form.consent,
    });
  };

  const reset = () => {
    setForm(initial);
    setErrors({});
    setDone(false);
    create.reset();
  };

  return (
    <section id="reserve" ref={ref} className="bg-jc-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[2fr_3fr] lg:px-10">
        {/* Contact column */}
        <div>
          <p data-animate style={{ "--stagger": 0 } as React.CSSProperties} className="eyebrow">
            Reserve
          </p>
          <h2
            data-animate
            style={{ "--stagger": 1 } as React.CSSProperties}
            className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-[0.02em] text-jc-ivory md:text-5xl"
          >
            Make it a match night.
          </h2>
          <p
            data-animate
            style={{ "--stagger": 2 } as React.CSSProperties}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-jc-copy"
          >
            Send a request and our team will call or message you to confirm —
            your table is held only once we do.
          </p>

          <dl
            data-animate
            style={{ "--stagger": 3 } as React.CSSProperties}
            className="mt-10 space-y-6 text-[15px]"
          >
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-jc-gold">Where</dt>
              <dd className="mt-1.5 text-jc-ivory/85">
                {site.contact.address ?? "Juba, South Sudan — exact address to be confirmed"}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-jc-gold">Call / WhatsApp</dt>
              <dd className="mt-1.5 text-jc-ivory/85">
                {site.contact.phone ? (
                  <a href={`tel:${site.contact.phone}`} className="link-underline">
                    {site.contact.phone}
                  </a>
                ) : (
                  "Number to be confirmed"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-jc-gold">Hours</dt>
              <dd className="mt-1.5 text-jc-ivory/85">{site.contact.hours ?? "Hours to be confirmed"}</dd>
            </div>
          </dl>
        </div>

        {/* Form column */}
        <div data-animate style={{ "--stagger": 2 } as React.CSSProperties}>
          {done ? (
            <div className="flex h-full flex-col items-start justify-center rounded-lg border border-jc-gold/30 bg-jc-surface px-8 py-14">
              <p className="font-accent text-3xl italic text-jc-goldhi">Request received.</p>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-jc-copy">
                Thank you, {form.name.split(" ")[0]}. We&apos;ve logged your
                request for {form.partySize}{" "}
                {Number(form.partySize) === 1 ? "guest" : "guests"} on {form.date} at{" "}
                {form.time}. Our team will contact you to confirm — the table
                is not held until we do.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-8 rounded-md border border-jc-gold/60 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-jc-goldhi transition-colors hover:bg-jc-gold/10"
              >
                Make another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="rounded-lg border border-white/8 bg-jc-surface p-7 md:p-9">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" htmlFor="rsv-name" error={errors.name}>
                  <input
                    id="rsv-name"
                    type="text"
                    autoComplete="name"
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field label="Phone / WhatsApp" htmlFor="rsv-phone" error={errors.phone}>
                  <input
                    id="rsv-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+211 …"
                    className={inputCls}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={!!errors.phone}
                  />
                </Field>
                <Field label="Date" htmlFor="rsv-date" error={errors.date}>
                  <input
                    id="rsv-date"
                    type="date"
                    min={todayStr}
                    className={`${inputCls} [color-scheme:dark]`}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                    aria-invalid={!!errors.date}
                  />
                </Field>
                <Field label="Time" htmlFor="rsv-time" error={errors.time}>
                  <input
                    id="rsv-time"
                    type="time"
                    className={`${inputCls} [color-scheme:dark]`}
                    value={form.time}
                    onChange={(e) => set("time", e.target.value)}
                    aria-invalid={!!errors.time}
                  />
                </Field>
                <Field label="Party size" htmlFor="rsv-size" error={errors.partySize}>
                  <input
                    id="rsv-size"
                    type="number"
                    min={1}
                    max={40}
                    className={inputCls}
                    value={form.partySize}
                    onChange={(e) => set("partySize", e.target.value)}
                    aria-invalid={!!errors.partySize}
                  />
                </Field>
                <Field label="Occasion / notes (optional)" htmlFor="rsv-notes">
                  <input
                    id="rsv-notes"
                    type="text"
                    placeholder="Birthday, big match, near a screen…"
                    className={inputCls}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </Field>
              </div>

              <div className="mt-7">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-jc-copy">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-white/20 bg-jc-ink transition-colors checked:border-jc-gold checked:bg-jc-gold focus-visible:outline-2 focus-visible:outline-jc-goldhi"
                    aria-invalid={!!errors.consent}
                  />
                  JC Lounge may contact me by phone or WhatsApp about this reservation request.
                </label>
                {errors.consent && (
                  <p role="alert" className="mt-1.5 text-sm text-red-300">
                    {errors.consent}
                  </p>
                )}
              </div>

              {create.isError && (
                <p role="alert" className="mt-5 rounded-md border border-red-400/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                  {create.error.message.includes("Too many")
                    ? "Too many requests — please try again in a few minutes."
                    : "Something went wrong sending your request. Please try again."}
                </p>
              )}

              <button
                type="submit"
                disabled={create.isPending}
                className="mt-8 w-full rounded-md bg-jc-gold px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-jc-ink transition-colors hover:bg-jc-goldhi active:bg-jc-golddeep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {create.isPending ? "Sending…" : "Request a Table"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
