"use client";

import Image from "next/image";
import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The single marble format at true scale - 304 × 125 cm faced with
 * Bianco Thassos, the brilliant white at the top of the range - measured
 * out beside a 1.70 m figure. One size for the whole range is the
 * catalogue's fact; no thickness is printed, so none is shown.
 */
export function MarbleSlabScale() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-measure]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
      });
      gsap.from("[data-slab]", {
        yPercent: 6,
        opacity: 0,
        duration: 1.2,
        scrollTrigger: { trigger: scope.current, start: "top 80%", once: true },
      });
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <div ref={scope}>
      <div className="flex items-end gap-[5%]">
        <figure className="relative" style={{ flexGrow: 304, flexBasis: 0 }}>
          <div
            data-slab
            className="border-warm-black relative overflow-hidden rounded-sm border shadow-sm"
            style={{ aspectRatio: "304 / 125" }}
          >
            <Image
              src="/kalingastone/marble/swatches/bianco-thassos.webp"
              alt="304 × 125 cm KalingaStone marble slab format, faced in Bianco Thassos"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <span
            data-measure
            aria-hidden
            className="border-warm-black mt-3 block border-t"
          />
          <figcaption className="mt-2">
            <span className="font-display text-foreground block text-lg">
              304 × 125 cm - one format, every shade
            </span>
            <span className="text-muted block text-sm">
              Faced here in Bianco Thassos, Series-5B
            </span>
          </figcaption>
        </figure>

        {/* 1.70 m figure at the same cm scale as the 125 cm slab height */}
        <svg
          viewBox="0 0 40 170"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/70 w-auto shrink-0"
          style={{ height: "calc((170 / 125) * 14vw)", maxHeight: 220 }}
          aria-hidden
        >
          <circle cx="20" cy="14" r="9" />
          <path d="M20 23v62M20 45l-14 22M20 45l14 22M20 85l-11 68M20 85l11 68" />
        </svg>
        <span aria-hidden className="w-[8%] shrink-0" />
      </div>

      <p className="text-muted mt-8 max-w-xl text-sm leading-relaxed">
        Drawn to scale - a single 3.04 m slab runs the length of a vanity or
        lift-lobby wall panel, and the engineered block keeps shade, thickness
        and texture consistent slab after slab.
      </p>
    </div>
  );
}
