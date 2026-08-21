"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { pad } from "@/lib/utils";

/**
 * The Index - the ten lines as a magazine table of contents. Every
 * row stays one whole crawlable <Link>, with the Onyx hover sweep - and
 * a floating photograph of the line trails the cursor across the list
 * (soft-lerped, desktop pointer only, pointer-events none, reduced
 * motion off). Images are the existing wheel renders - zero new bytes.
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
    "/products/jaquar-rain-shower-white-stone-wet-room-uae.webp",
  wellness: "/products/white-freestanding-bathtub-marble-terrazzo-suite-uae.webp",
  "water-heaters": "/jaquar/categories/water-heaters.webp",
  "sealers-cleaners":
    "/products/fila-mp90-sealer-white-marble-workshop-uae.webp",
};

export function IndexRows() {
  const scope = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const preview = previewRef.current;
      const list = scope.current;
      if (!preview || !list) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3" });

      const onMove = (e: PointerEvent) => {
        const rect = list.getBoundingClientRect();
        xTo(e.clientX - rect.left + 28);
        yTo(e.clientY - rect.top - 90);
      };
      const onEnter = () => gsap.to(preview, { autoAlpha: 1, duration: 0.3 });
      const onLeave = () => gsap.to(preview, { autoAlpha: 0, duration: 0.3 });

      const rows = list.querySelectorAll<HTMLElement>("[data-index-row]");
      const setImage = (slug: string) => {
        for (const img of preview.querySelectorAll<HTMLElement>(
          "[data-preview-img]",
        )) {
          img.style.opacity = img.dataset.previewImg === slug ? "1" : "0";
        }
      };
      const rowHandlers: [(e: Event) => void, HTMLElement][] = [];
      for (const row of rows) {
        const handler = () => setImage(row.dataset.indexRow ?? "");
        row.addEventListener("pointerenter", handler);
        rowHandlers.push([handler, row]);
      }

      list.addEventListener("pointermove", onMove);
      list.addEventListener("pointerenter", onEnter);
      list.addEventListener("pointerleave", onLeave);
      return () => {
        list.removeEventListener("pointermove", onMove);
        list.removeEventListener("pointerenter", onEnter);
        list.removeEventListener("pointerleave", onLeave);
        for (const [handler, row] of rowHandlers) {
          row.removeEventListener("pointerenter", handler);
        }
      };
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <div ref={scope} className="relative">
      <div className="divide-warm-black/20 border-warm-black divide-y border-y">
        {siteConfig.products.map((product, index) => {
          const href = HUBS[product.slug] ?? "/contact";
          return (
            <Link
              key={product.slug}
              href={href}
              id={product.slug}
              data-index-row={product.slug}
              className="group relative block scroll-mt-28 overflow-hidden"
            >
              <span
                aria-hidden
                className="bg-warm-black absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
              />
              <span className="relative grid gap-4 px-4 py-10 sm:grid-cols-[6rem_1.618fr_1fr] sm:items-baseline sm:px-6">
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
              </span>
            </Link>
          );
        })}
      </div>

      {/* The floating preview - trails the cursor across the index */}
      <div
        ref={previewRef}
        aria-hidden
        className="border-warm-black pointer-events-none invisible absolute top-0 left-0 z-20 hidden h-45 w-60 overflow-hidden rounded-lg border opacity-0 shadow-2xl lg:block"
      >
        {siteConfig.products.map((product) => (
          <Image
            key={product.slug}
            data-preview-img={product.slug}
            src={PREVIEWS[product.slug]}
            alt=""
            fill
            sizes="240px"
            className="object-cover opacity-0 transition-opacity duration-200"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
