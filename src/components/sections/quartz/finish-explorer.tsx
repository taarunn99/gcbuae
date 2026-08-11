"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * The four surface finishes as a macro-photography viewer: tab a finish,
 * the texture crossfades. All four images and descriptions are in the
 * DOM server-side; the tabs only toggle opacity.
 */

const FINISHES = [
  {
    slug: "distress",
    name: "Distress",
    body: "Softly worn, matte-textured - the surface of a stone that has already lived a little.",
  },
  {
    slug: "leather",
    name: "Leather",
    body: "Tactile and lightly pebbled, low-sheen - reads as warmth under the hand.",
  },
  {
    slug: "honed",
    name: "Honed",
    body: "Flat matte, non-reflective, R9 slip-rated - the specifier's choice for floors.",
  },
  {
    slug: "nalico",
    name: "Nalico",
    body: "Deep-textured and heavily grained - the most dramatic relief in the range.",
  },
];

export function FinishExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
      <div>
        <div role="tablist" aria-label="Surface finishes">
          {FINISHES.map((f, i) => (
            <button
              key={f.slug}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "border-ink/15 group block w-full border-b py-5 text-left transition-colors",
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
          Polished is standard; these four finishes are produced on request.
        </p>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        {FINISHES.map((f, i) => (
          <Image
            key={f.slug}
            src={`/kalingastone/quartz/finishes/${f.slug}.webp`}
            alt={`KalingaStone quartz ${f.name} finish - macro surface texture`}
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
