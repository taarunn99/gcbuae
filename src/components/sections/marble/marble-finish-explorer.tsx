"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * The five marble finishes as a macro viewer. Graffiato and Silken are
 * unique to the marble range — the catalogue's own note.
 */

const FINISHES = [
  {
    slug: "honed",
    name: "Honed",
    body: "Flat matte, non-reflective — R9 slip-rated, the reference finish for floors.",
  },
  {
    slug: "graffiato",
    name: "Graffiato",
    body: "Finely scored linear texture — marble-only, the range's quiet answer to fluting.",
  },
  {
    slug: "leather",
    name: "Leather",
    body: "Smooth low-sheen tactile surface — warmth under the hand.",
  },
  {
    slug: "distress",
    name: "Distress",
    body: "Softly worn matte with visible grain — marble that has already lived a little.",
  },
  {
    slug: "silken",
    name: "Silken",
    body: "A fine soft-sheen surface, marble-only — silk in stone.",
  },
];

export function MarbleFinishExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
      <div>
        <div role="tablist" aria-label="Marble surface finishes">
          {FINISHES.map((f, i) => (
            <button
              key={f.slug}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "border-ink/15 group block w-full border-b py-4 text-left transition-colors",
                i === active ? "border-bronze" : "hover:border-ink/40",
              )}
            >
              <span className="flex items-baseline justify-between gap-4">
                <span
                  className={cn(
                    "font-display text-2xl transition-colors duration-300",
                    i === active ? "text-ink" : "text-ink/50",
                  )}
                >
                  {f.name}
                </span>
                <span className="text-ink/40 font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <span
                className={cn(
                  "text-ink/60 mt-1.5 block text-sm leading-relaxed transition-opacity duration-300",
                  i === active ? "opacity-100" : "opacity-0 sm:opacity-40",
                )}
              >
                {f.body}
              </span>
            </button>
          ))}
        </div>
        <p className="text-ink/50 mt-5 text-sm">
          Polished is standard — above 85% gloss; Honed 400 carries the R9 slip
          rating (DIN 51130).
        </p>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        {FINISHES.map((f, i) => (
          <Image
            key={f.slug}
            src={`/kalingastone/marble/finishes/${f.slug}.webp`}
            alt={`KalingaStone marble ${f.name} finish — macro surface texture`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn(
              "object-cover transition-opacity duration-700",
              i === active ? "opacity-100" : "opacity-0",
            )}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
    </div>
  );
}
