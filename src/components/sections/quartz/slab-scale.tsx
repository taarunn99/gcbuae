"use client";

import Image from "next/image";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { useRef } from "react";

/**
 * The three slab formats drawn to true relative scale, faced with real
 * shade textures, measured out like an architect's drawing. A 1.70 m
 * figure stands beside the superjumbo so the size registers as a story,
 * not a number. Widths/heights derive from the same mm scale, so the
 * proportions are exact.
 */

const FORMATS = [
  {
    w: 3150,
    h: 1450,
    label: "3150 × 1450 mm",
    note: "55 shades",
    texture: "bianco-classic",
  },
  {
    w: 3250,
    h: 1650,
    label: "3250 × 1650 mm",
    note: "13 shades",
    texture: "calacatta-lazza",
  },
  {
    w: 3300,
    h: 2000,
    label: "3300 × 2000 mm",
    note: "Superjumbo — Carrara Marmi",
    texture: "carrara-marmi",
  },
] as const;

/** Standing figure, 1.70 m tall at slab scale. */
function Figure({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 170"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="20" cy="14" r="9" />
      <path d="M20 23v62M20 45l-14 22M20 45l14 22M20 85l-11 68M20 85l11 68" />
    </svg>
  );
}

export function SlabScale() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const measures = gsap.utils.toArray<HTMLElement>("[data-measure]");
      gsap.from(measures, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        stagger: 0.15,
        scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
      });
      gsap.from("[data-measure-v]", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.1,
        delay: 0.3,
        scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
      });
      gsap.from("[data-slab]", {
        yPercent: 6,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        scrollTrigger: { trigger: scope.current, start: "top 80%", once: true },
      });
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <div ref={scope} className="overflow-x-auto pb-2">
      <div className="min-w-[720px]">
        <div className="flex items-end gap-[3%]">
          {FORMATS.map((f, i) => (
            <figure
              key={f.label}
              className="relative"
              style={{ flexGrow: f.w, flexBasis: 0 }}
            >
              <div
                data-slab
                className="border-border/40 relative overflow-hidden rounded-sm border shadow-sm"
                style={{ aspectRatio: `${f.w} / ${f.h}` }}
              >
                <Image
                  src={`/kalingastone/quartz/swatches/${f.texture}.webp`}
                  alt={`${f.label} KalingaStone quartz slab format, faced in ${f.note.includes("Carrara") ? "Carrara Marmi" : "the range"}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 240px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Superjumbo extras: height measure + the 1.70 m figure */}
              {i === 2 && (
                <>
                  <span
                    data-measure-v
                    aria-hidden
                    className="border-verde absolute top-0 -right-4 bottom-0 border-r"
                  />
                  <span
                    aria-hidden
                    className="label-gcb text-verde absolute top-1/2 -right-5 -translate-y-1/2 rotate-90 text-[0.6rem] whitespace-nowrap"
                  >
                    2000 mm
                  </span>
                  <Figure className="text-foreground/70 absolute -right-[15%] bottom-0 h-[85%] w-auto" />
                </>
              )}

              {/* Dimension line */}
              <span
                data-measure
                aria-hidden
                className="border-verde mt-3 block border-t"
              />
              <figcaption className="mt-2">
                <span className="font-display text-foreground block text-lg">
                  {f.label}
                </span>
                <span className="text-muted block text-sm">
                  {f.note} · 20 mm thick
                </span>
              </figcaption>
            </figure>
          ))}
          {/* Breathing room for the figure overhanging the last slab */}
          <span aria-hidden className="w-[4%] shrink-0" />
        </div>

        <p className="text-muted mt-8 max-w-xl text-sm leading-relaxed">
          Drawn to scale — the 3300 × 2000 mm superjumbo stands a head taller
          than the people specifying it, and covers a full kitchen island or a
          double-height lift-lobby panel with a single joint-free slab.
        </p>
      </div>
    </div>
  );
}
