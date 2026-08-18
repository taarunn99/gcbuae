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

function Track({ hidden, items }: { hidden?: boolean; items: string[] }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-baseline">
      {items.map((item) => (
        <span key={item} className="flex items-baseline">
          <span className="font-display text-phi-3 text-outline-gcb mx-6 whitespace-nowrap uppercase">
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

export function MaterialsTicker({ items = ITEMS }: { items?: string[] }) {
  return (
    <section
      aria-label="Product lines ticker"
      className="border-warm-black overflow-hidden border-y py-8"
    >
      <div className="marquee-gcb flex w-max">
        <Track items={items} />
        <Track items={items} hidden />
      </div>
    </section>
  );
}
