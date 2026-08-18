/**
 * Full-bleed outlined-type ticker - the issue's running head. Pure CSS
 * (the site's existing marquee keyframes); hollow Onyx-stroke display
 * caps with solid separators. Server component, aria-hidden duplicate
 * track for the seamless loop.
 */

const ITEMS = [
  "Quartz",
  "Marble",
  "Terrazzo",
  "Showers",
  "Taps",
  "Wash Basins",
  "Water Closets",
  "Care",
];

function Track({ hidden, items, dark }: { hidden?: boolean; items: string[]; dark?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-baseline">
      {items.map((item) => (
        <span key={item} className="flex items-baseline">
          <span
            className={
              "font-display text-phi-3 text-outline-gcb mx-6 whitespace-nowrap uppercase" +
              (dark ? " [-webkit-text-stroke-color:var(--ink)]" : "")
            }
          >
            {item}
          </span>
          <span aria-hidden className="text-bronze font-display text-phi-2">
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export function MaterialsTicker({
  items = ITEMS,
  dark = false,
}: {
  items?: string[];
  /** Onyx stages: Marble White stroke and hairlines. */
  dark?: boolean;
}) {
  return (
    <section
      aria-label="Product lines ticker"
      className={
        (dark ? "border-ink/25" : "border-warm-black") +
        " overflow-hidden border-y py-8"
      }
    >
      <div className="marquee-gcb flex w-max">
        <Track items={items} dark={dark} />
        <Track items={items} dark={dark} hidden />
      </div>
    </section>
  );
}
