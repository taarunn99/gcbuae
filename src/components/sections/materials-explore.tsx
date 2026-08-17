"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  homeMaterialsShowcase,
  kalingaStoneMaterials,
} from "@/config/kalingastone";
import { cn } from "@/lib/utils";

/**
 * Explore the materials - the home page's closing section (owner spec,
 * 2026-08-17, after KalingaStone's own explore carousel, Elixir excluded).
 * Three balls of real material - Quartz, Marble, Terrazzo - and the active
 * one morphs into a tall lifestyle panel featuring the same shade. Hover
 * expands on fine pointers; on touch the first tap expands and the panel
 * itself navigates. One item is always expanded so the row is never flat.
 *
 * Owner-approved GOVERNANCE §3 exception (2026-08-17): the morph
 * transitions grid columns and the frame's max-width/height - a contained
 * layout animation. The section row height is fixed, so nothing outside
 * it ever shifts. Reduced motion swaps instantly.
 *
 * Footer rule: the footer is fixed BEHIND the page - this section must
 * stay opaque, full-width and in normal flow (no sticky, no pinning).
 */

const FINE_POINTER = "(pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const media = window.matchMedia(FINE_POINTER);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
}

const items = kalingaStoneMaterials.map((material) => ({
  ...material,
  ...homeMaterialsShowcase.find((s) => s.slug === material.slug)!,
}));

/** The morph timing - numerically DURATION.fast / EASE.inOut from @/lib/motion. */
const MORPH = "duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]";

export function MaterialsExplore() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  return (
    <section
      aria-label="Explore the materials"
      className="bg-background relative py-24 lg:py-32"
    >
      <div className="container-gcb">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="label-gcb text-warm-black/60">KalingaStone</p>
            <h2 className="font-display text-warm-black mt-3 text-3xl tracking-tight sm:text-5xl">
              Explore the materials.
            </h2>
          </div>
          <p className="label-gcb text-warm-black/50 hidden sm:block">
            Three surfaces · one supplier
          </p>
        </div>
        <p className="text-warm-black/70 mt-5 max-w-2xl leading-relaxed">
          Quartz, marble and terrazzo, cut from the same engineered-stone
          programme - every shade stocked as full slabs and delivered across
          the whole of the UAE.
        </p>

        {/* Desktop: the morphing row. Fixed height so the page never shifts. */}
        <div
          className="mt-14 hidden h-[36rem] grid-cols-1 items-center justify-items-center gap-6 lg:grid"
          style={{
            gridTemplateColumns: items
              .map((_, i) => (i === active ? "2.8fr" : "1fr"))
              .join(" "),
            transitionProperty: reduced ? "none" : "grid-template-columns",
            transitionDuration: "400ms",
            transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        >
          {items.map((item, i) => {
            const expanded = i === active;
            return (
              <Link
                key={item.slug}
                href={item.href}
                aria-label={`Explore KalingaStone ${item.label.toLowerCase()}`}
                data-active={expanded}
                onPointerEnter={fine ? () => setActive(i) : undefined}
                onFocus={() => setActive(i)}
                onClick={
                  !fine && !expanded
                    ? (event) => {
                        event.preventDefault();
                        setActive(i);
                      }
                    : undefined
                }
                className="group flex h-full w-full flex-col items-center justify-center gap-5"
              >
                <span
                  className={cn(
                    "border-warm-black relative block w-full overflow-hidden border",
                    !reduced &&
                      `transition-[max-width,height,border-radius] ${MORPH}`,
                    expanded
                      ? "h-[33rem] max-w-[52rem] rounded-3xl"
                      : "h-52 max-w-52 rounded-full",
                  )}
                >
                  <Image
                    src={item.swatch}
                    alt={`${item.shadeLabel} ${item.label.toLowerCase()} swatch`}
                    fill
                    sizes="(min-width: 1024px) 13rem, 50vw"
                    className={cn(
                      "object-cover",
                      !reduced && `transition-opacity ${MORPH}`,
                      expanded ? "opacity-0" : "opacity-100",
                    )}
                    loading="lazy"
                  />
                  <Image
                    src={item.scene}
                    alt={item.sceneAlt}
                    fill
                    sizes="(min-width: 1024px) 52rem, 100vw"
                    className={cn(
                      "object-cover",
                      !reduced && `transition-opacity ${MORPH}`,
                      expanded ? "opacity-100" : "opacity-0",
                    )}
                    loading="lazy"
                  />
                  {/* Scrim + panel copy - only readable in the expanded state */}
                  <span
                    aria-hidden={!expanded}
                    className={cn(
                      "from-warm-black/70 absolute inset-0 flex flex-col justify-end bg-gradient-to-t via-transparent to-transparent p-8",
                      !reduced && `transition-opacity ${MORPH}`,
                      expanded ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <span className="font-display text-ink block text-4xl tracking-tight">
                      {item.label}
                    </span>
                    <span className="text-ink/80 mt-2 block text-sm">
                      {item.shadeLabel} · {item.shadeCount} shades
                    </span>
                    <span className="chip-gcb border-ink/60 text-ink mt-5 inline-flex w-fit items-center rounded-full border px-4 py-1.5 text-sm">
                      Explore {item.label.toLowerCase()}
                    </span>
                  </span>
                </span>
                {/* Ball caption - keeps its space when hidden so nothing shifts */}
                <span
                  className={cn(
                    "label-gcb text-warm-black",
                    !reduced && `transition-opacity ${MORPH}`,
                    expanded ? "opacity-0" : "opacity-100",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile: three calm cards, no state, no morph. */}
        <div className="mt-12 space-y-6 lg:hidden">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              aria-label={`Explore KalingaStone ${item.label.toLowerCase()}`}
              className="border-warm-black relative block aspect-[4/5] overflow-hidden rounded-3xl border"
            >
              <Image
                src={item.scene}
                alt={item.sceneAlt}
                fill
                sizes="100vw"
                className="object-cover"
                loading="lazy"
              />
              <span className="from-warm-black/70 absolute inset-0 flex flex-col justify-end bg-gradient-to-t via-transparent to-transparent p-6">
                <span className="font-display text-ink block text-3xl tracking-tight">
                  {item.label}
                </span>
                <span className="text-ink/80 mt-1 block text-sm">
                  {item.shadeLabel} · {item.shadeCount} shades
                </span>
                <span className="chip-gcb border-ink/60 text-ink mt-4 inline-flex w-fit items-center rounded-full border px-4 py-1.5 text-sm">
                  Explore {item.label.toLowerCase()}
                </span>
              </span>
              <span className="border-ink absolute top-4 right-4 block size-16 overflow-hidden rounded-full border">
                <Image
                  src={item.swatch}
                  alt={`${item.shadeLabel} ${item.label.toLowerCase()} swatch`}
                  fill
                  sizes="4rem"
                  className="object-cover"
                  loading="lazy"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
