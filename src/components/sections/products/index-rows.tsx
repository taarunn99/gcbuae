import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { pad } from "@/lib/utils";

/**
 * The Index - the ten lines as a magazine table of contents. Every row
 * stays one whole crawlable <Link> with the Onyx hover sweep, and each
 * line's photograph sits as a SMALL STATIC tile beside the blurb - the
 * owner removed the cursor-trailing floating preview (2026-08-21): it
 * read as glitchy, and the static tiles echo the brand-shelf swatches.
 * No JS left, so this renders as a server component.
 */

const HUBS: Record<string, string> = {
  quartz: "/kalingastone/quartz",
  "naturally-engineered-marble": "/kalingastone/marble",
  terrazzo: "/kalingastone/terrazzo",
  faucets: "/jaquar/faucets",
  "wash-basins": "/jaquar/wash-basins",
  "water-closets": "/jaquar/water-closets",
  "showers-enclosures": "/jaquar/showers",
  wellness: "/jaquar/wellness",
  "water-heaters": "/jaquar/water-heaters",
  "sealers-cleaners": "/fila",
};

const PREVIEWS: Record<string, string> = {
  quartz: "/products/white-quartz-island-morning-espresso-uae-v2.webp",
  "naturally-engineered-marble":
    "/products/white-engineered-marble-floor-gallery-hall-uae-v2.webp",
  terrazzo: "/products/white-terrazzo-flooring-green-chips-daybed-dubai.webp",
  faucets: "/products/brushed-steel-tap-white-marble-basin-uae-v2.webp",
  "wash-basins": "/products/white-twin-basins-limestone-vanity-spa-uae-v2.webp",
  "water-closets": "/jaquar/categories/water-closets.webp",
  "showers-enclosures":
    "/products/jaquar-rain-shower-white-stone-wet-room-uae-v2.webp",
  wellness: "/products/white-freestanding-bathtub-marble-terrazzo-suite-uae.webp",
  "water-heaters": "/products/jaquar-water-heater-showroom-uae.webp",
  "sealers-cleaners":
    "/products/fila-mp90-sealer-white-marble-workshop-uae-v2.webp",
};

export function IndexRows() {
  return (
    <div className="divide-warm-black/20 border-warm-black divide-y border-y">
      {siteConfig.products.map((product, index) => {
        const href = HUBS[product.slug] ?? "/contact";
        return (
          <Link
            key={product.slug}
            href={href}
            id={product.slug}
            className="group relative block scroll-mt-28 overflow-hidden"
          >
            <span
              aria-hidden
              className="bg-warm-black absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
            />
            <span className="relative grid gap-4 px-4 py-10 sm:grid-cols-[6rem_1.618fr_1fr_auto] sm:items-baseline sm:px-6">
              <span
                aria-hidden
                className="font-display text-bronze group-hover:text-ink text-phi-2 leading-none transition-colors duration-500"
              >
                {pad(index + 1)}
              </span>
              <h3 className="font-display text-foreground group-hover:text-ink text-phi-2 leading-tight transition-colors duration-500">
                {product.label}
              </h3>
              <span className="text-foreground/80 group-hover:text-ink/80 block text-sm leading-relaxed transition-colors duration-500">
                {product.blurb}{" "}
                <span className="u-line whitespace-nowrap">
                  {HUBS[product.slug] ? "Enter the range →" : "Talk to us →"}
                </span>
              </span>
              {/* The line's photograph as a quiet swatch-style tile beside
                  the blurb - static, like the brand shelf. `relative` keeps
                  it above the hover sweep. */}
              <span className="border-warm-black/25 relative hidden h-20 w-28 shrink-0 self-center overflow-hidden rounded-xl border sm:block">
                <Image
                  src={PREVIEWS[product.slug]}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                  loading="lazy"
                />
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
