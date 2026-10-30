import { useCallback, useEffect, useRef, useState } from "react";
import {
  cocktailsComingSoon,
  foodMenu,
  menuTabs,
  spiritsMenu,
  type FoodItem,
  type MenuGroup,
  type MenuTabId,
  type SpiritItem,
} from "@/data/menu";
import { site } from "@/config/site";
import { useReveal } from "@/hooks/useReveal";

const fmt = (n: number) =>
  `${site.currencySymbol}${Number.isInteger(n) ? n : n.toFixed(2)}`;

function FoodRow({ item }: { item: FoodItem }) {
  return (
    <li>
      <div className="flex items-baseline">
        <h4 className="text-[15px] font-semibold tracking-wide text-jc-ivory">{item.name}</h4>
        <span className="menu-leader" aria-hidden="true" />
        <span className="text-[15px] font-semibold text-jc-goldhi">{fmt(item.price)}</span>
      </div>
      {item.description && (
        <p className="mt-1 max-w-[42ch] text-sm leading-relaxed text-jc-copy">{item.description}</p>
      )}
    </li>
  );
}

function SpiritRow({ item }: { item: SpiritItem }) {
  return (
    <li>
      <div className="flex items-baseline">
        <h4 className="text-[15px] font-semibold tracking-wide text-jc-ivory">{item.name}</h4>
        <span className="menu-leader" aria-hidden="true" />
        <span className="whitespace-nowrap text-[15px] font-semibold text-jc-goldhi">
          {item.shot != null && <span>{fmt(item.shot)} <span className="text-[11px] font-medium uppercase tracking-wider text-jc-copy">shot</span></span>}
          {item.shot != null && item.bottle != null && <span className="mx-2 text-jc-copy/60">/</span>}
          {item.bottle != null && <span>{fmt(item.bottle)} <span className="text-[11px] font-medium uppercase tracking-wider text-jc-copy">bottle</span></span>}
        </span>
      </div>
    </li>
  );
}

function Group<T extends FoodItem | SpiritItem>({
  group,
  kind,
}: {
  group: MenuGroup<T>;
  kind: "food" | "spirits";
}) {
  return (
    <section aria-label={group.label}>
      <h3 className="font-accent text-[22px] italic tracking-wide text-jc-gold">{group.label}</h3>
      <ul className="mt-5 space-y-5">
        {group.items.map((item) =>
          kind === "food" ? (
            <FoodRow key={item.name} item={item as FoodItem} />
          ) : (
            <SpiritRow key={item.name} item={item as SpiritItem} />
          ),
        )}
      </ul>
    </section>
  );
}

function readHash(): MenuTabId {
  const h = window.location.hash.replace("#menu-", "");
  return (["food", "spirits", "cocktails"] as MenuTabId[]).includes(h as MenuTabId)
    ? (h as MenuTabId)
    : "food";
}

export default function MenuSection() {
  const ref = useReveal<HTMLElement>();
  const [tab, setTab] = useState<MenuTabId>(() =>
    typeof window === "undefined" ? "food" : readHash(),
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onHash = () => setTab(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const select = useCallback((id: MenuTabId) => {
    setTab(id);
    history.replaceState(null, "", `#menu-${id}`);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = menuTabs.findIndex((t) => t.id === tab);
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % menuTabs.length;
    if (e.key === "ArrowLeft") next = (idx - 1 + menuTabs.length) % menuTabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = menuTabs.length - 1;
    if (next >= 0) {
      e.preventDefault();
      select(menuTabs[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section id="menu" ref={ref} className="bg-jc-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p data-animate style={{ "--stagger": 0 } as React.CSSProperties} className="eyebrow">
            Eat &amp; Drink
          </p>
          <h2
            data-animate
            style={{ "--stagger": 1 } as React.CSSProperties}
            className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-[0.02em] text-jc-ivory md:text-5xl"
          >
            The JC Lounge Menu
          </h2>
          <p
            data-animate
            style={{ "--stagger": 2 } as React.CSSProperties}
            className="mt-4 text-[15px] leading-relaxed text-jc-copy"
          >
            Good food and drinks for every match night.
          </p>
        </div>

        <div
          data-animate
          style={{ "--stagger": 2 } as React.CSSProperties}
          role="tablist"
          aria-label="Menu categories"
          className="mt-12 flex gap-2 border-b border-white/10"
          onKeyDown={onKeyDown}
        >
          {menuTabs.map((t, i) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active}
                aria-controls={`panel-${t.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => select(t.id)}
                className={`relative -mb-px px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-jc-goldhi" : "text-jc-copy hover:text-jc-ivory"
                }`}
              >
                {t.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 bottom-0 h-[2px] origin-left bg-jc-gold transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div
          data-animate
          style={{ "--stagger": 3 } as React.CSSProperties}
          className="mt-12"
        >
          {tab === "food" && (
            <div
              key="food"
              role="tabpanel"
              id="panel-food"
              aria-labelledby="tab-food"
              className="menu-panel grid gap-x-16 gap-y-14 md:grid-cols-2"
            >
              {foodMenu.map((g) => (
                <Group key={g.label} group={g} kind="food" />
              ))}
            </div>
          )}

          {tab === "spirits" && (
            <div
              key="spirits"
              role="tabpanel"
              id="panel-spirits"
              aria-labelledby="tab-spirits"
              className="menu-panel grid gap-x-16 gap-y-14 md:grid-cols-2"
            >
              {spiritsMenu.map((g) => (
                <Group key={g.label} group={g} kind="spirits" />
              ))}
            </div>
          )}

          {tab === "cocktails" && cocktailsComingSoon && (
            <div
              key="cocktails"
              role="tabpanel"
              id="panel-cocktails"
              aria-labelledby="tab-cocktails"
              className="menu-panel flex flex-col items-start gap-4 rounded-lg border border-dashed border-jc-gold/30 bg-jc-ink/40 px-8 py-14"
            >
              <p className="font-accent text-2xl italic text-jc-goldhi">Shaken, soon.</p>
              <p className="max-w-md text-[15px] leading-relaxed text-jc-copy">
                Our cocktail list is being finalized with the bar team. Ask your
                server what&apos;s stirring tonight.
              </p>
            </div>
          )}
        </div>

        {site.menuPendingConfirmation && (
          <p className="mt-14 text-xs leading-relaxed tracking-wide text-jc-copy/80">
            Menu recovered from our previous list — items and prices are being
            confirmed and may change. Wine &amp; Bubbles is a partial list.
          </p>
        )}
      </div>
    </section>
  );
}
