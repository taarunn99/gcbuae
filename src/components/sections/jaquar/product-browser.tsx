"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { JaquarProduct } from "@/config/jaquar-products";
import { cn } from "@/lib/utils";

/**
 * THE PRODUCT BROWSER - the human-readable answer to the SKU wall
 * (owner ruling 2026-08-14). Every catalogued product renders as a card:
 * its actual photograph, the parsed product type in display type,
 * attribute chips (flow, size, trap, seat...), and the SKU as small
 * metadata. Filter chips narrow by product group; ALL cards are
 * server-rendered into the DOM (crawlable) - filtering only toggles
 * CSS hidden, per the house explorer pattern.
 */

const GROUP_LABELS: Record<string, string> = {
  mixers: "Mixers",
  taps: "Taps & valves",
  thermostatic: "Thermostatic",
  sensor: "Sensor",
  pressmatic: "Pressmatic",
  "bath-fillers": "Bath fillers",
  spouts: "Spouts",
  "in-wall-parts": "In-wall parts",
  parts: "Wastes & parts",
  accessories: "Accessories",
  "table-top": "Table top",
  "counter-top": "Counter top",
  "under-counter": "Under counter",
  "wall-hung-basins": "Wall hung",
  pedestals: "Pedestals",
  "semi-recessed-corner": "Semi recessed & corner",
  "washroom-equipment": "Washroom equipment",
  "wall-hung-wcs": "Wall hung WCs",
  "floor-mounted-wcs": "Floor mounted WCs",
  "smart-wcs": "Smart & sensor WCs",
  bidets: "Bidets",
  urinals: "Urinals",
  accessible: "Accessible",
  "wc-parts": "Seats & fittings",
  "overhead-showers": "Overhead",
  "hand-showers": "Hand showers",
  "body-showers": "Body showers",
  "shower-panels": "Panels",
  "shower-fittings": "Arms, rails & pipes",
  whirlpools: "Whirlpools",
  "freestanding-bathtubs": "Freestanding tubs",
  "built-in-bathtubs": "Built-in tubs",
  "bathtub-accessories": "Tub hardware",
  spas: "Spas",
  saunas: "Saunas",
  "steam-solutions": "Steam",
  "water-heaters": "Water heaters",
  "i-flush": "i-Flush",
  "flush-valves": "Flush valves",
  cisterns: "Cisterns",
  "flush-plates": "Flush plates",
};

const groupLabel = (slug: string) =>
  GROUP_LABELS[slug] ??
  slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

export function ProductBrowser({
  products,
  collectionName,
}: {
  products: JaquarProduct[];
  collectionName: string;
}) {
  const groups = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) counts.set(p.group, (counts.get(p.group) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [products]);

  const [active, setActive] = useState<string | null>(null);

  return (
    <div>
      {/* Filter chips - only when the range spans more than one group */}
      {groups.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive(null)}
            className={cn(
              "chip-gcb rounded-full border px-4 py-2 text-sm",
              active === null
                ? "bg-warm-black text-ink border-transparent"
                : "border-border/60",
            )}
          >
            All
            <span className="ml-2 text-xs opacity-60">{products.length}</span>
          </button>
          {groups.map(([group, count]) => (
            <button
              key={group}
              type="button"
              onClick={() => setActive(group === active ? null : group)}
              className={cn(
                "chip-gcb rounded-full border px-4 py-2 text-sm",
                active === group
                  ? "bg-warm-black text-ink border-transparent"
                  : "border-border/60",
              )}
            >
              {groupLabel(group)}
              <span className="ml-2 text-xs opacity-60">{count}</span>
            </button>
          ))}
        </div>
      )}

      <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const displayTitle =
            product.title ||
            `${collectionName} ${groupLabel(product.group).toLowerCase()}`;
          return (
            <li
              key={product.sku || product.name}
              className={cn(active && product.group !== active && "hidden")}
            >
              <figure className="group flex h-full flex-col">
                {product.image ? (
                  <span className="border-border/40 relative block aspect-[4/5] overflow-hidden rounded-lg border bg-[#F7F8F5]">
                    <Image
                      src={`/jaquar/products/${product.image}.webp`}
                      alt={`${displayTitle} - ${product.sku}${product.finish ? ` - ${product.finish}` : ""}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </span>
                ) : (
                  <span className="border-border/40 bg-surface/40 flex aspect-[4/5] items-center justify-center rounded-lg border">
                    <span className="label-gcb text-muted px-4 text-center">
                      Listed in catalogue - photo on request
                    </span>
                  </span>
                )}
                <figcaption className="mt-3 flex flex-1 flex-col">
                  <span
                    className="font-display block text-base leading-snug"
                    title={product.name}
                  >
                    {displayTitle}
                  </span>
                  {product.attrs.length > 0 && (
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {product.attrs.slice(0, 3).map((attr) => (
                        <span
                          key={attr}
                          className="border-border/40 text-muted rounded-full border px-2 py-0.5 text-[0.65rem] leading-tight"
                        >
                          {attr}
                        </span>
                      ))}
                    </span>
                  )}
                  <span className="text-muted mt-auto block pt-2 font-mono text-[0.65rem]">
                    {product.sku}
                    {product.finish && ` · ${product.finish}`}
                    {product.page > 0 && ` · p${product.page}`}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
