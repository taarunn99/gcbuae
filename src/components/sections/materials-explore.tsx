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
 * one opens into a tall lifestyle panel featuring the same shade. Hover
 * expands on fine pointers and leaving the row collapses everything back
 * to the three balls (owner correction, 2026-08-17); on touch the first
 * tap expands and the panel itself navigates.
 *
 * Performance contract (rebuilt 2026-08-17 after the first grid-column
 * morph janked): every panel is a FIXED-size layer that never resizes.
 * The morph is transform (translateX on calc values that need no JS
 * measurement) + an animated clip-path circle that grows from the ball
 * into the full panel + opacity crossfades. No layout property ever
 * animates, which also puts the section back inside GOVERNANCE §3.
 * Reduced motion swaps instantly.
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

/* Fail LOUDLY on slug drift between the two config arrays - a silent
 * miss here once rendered six src="" images (console storm, 2026-08-18). */
const items = kalingaStoneMaterials.map((material) => {
  const showcase = homeMaterialsShowcase.find((s) => s.slug === material.slug);
  if (!showcase) {
    throw new Error(
      `materials-explore: no homeMaterialsShowcase entry for "${material.slug}"`,
    );
  }
  return { ...material, ...showcase };
});

/** Ball diameter, gap and row height in px - shared by the position math. */
const BALL = 208;
const GAP = 24;
const RADIUS = BALL / 2;
const ROW = 544; // = h-[34rem]

/**
 * translateX for item i when item a is active (null = resting state, all
 * three balls centred in the row). Every wrapper is the same fixed width
 * (container minus two ball slots), so percentages in translateX resolve
 * against that width and the whole layout needs no ResizeObserver:
 * collapsed items centre their ball on the slot, the active item sits
 * flush at its slot start.
 */
function wrapperX(a: number | null, i: number): string {
  if (a === null || i === a) return `${i * (BALL + GAP)}px`;
  if (a > i) return `calc(${i * (BALL + GAP) + RADIUS}px - 50%)`;
  return `calc(50% + ${(i - 1) * (BALL + GAP) + GAP + RADIUS}px)`;
}

const EASE_CSS = "cubic-bezier(0.76, 0, 0.24, 1)";

export function MaterialsExplore() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  const fade = cn(
    "transition-opacity duration-[400ms]",
    reduced && "transition-none",
  );

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
          <p className="label-gcb text-warm-black/65 hidden sm:block">
            Three surfaces · one supplier
          </p>
        </div>
        <p className="text-warm-black/70 mt-5 max-w-2xl leading-relaxed">
          Quartz, marble and terrazzo, cut from the same engineered-stone
          programme - every shade stocked as full slabs and delivered across
          the whole of the UAE.
        </p>

        {/* Desktop: fixed-size layers, transform + clip-path + opacity only.
            Leaving the row (or tabbing out of it) rests everything back to
            the three balls. */}
        <div
          className="relative mt-14 hidden h-[34rem] lg:block"
          onPointerLeave={fine ? () => setActive(null) : undefined}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setActive(null);
            }
          }}
        >
          {items.map((item, i) => {
            const expanded = i === active;
            return (
              <Link
                key={item.slug}
                href={item.href}
                aria-label={`${item.label} - explore the KalingaStone range`}
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
                className={cn(
                  "pointer-events-none absolute top-0 left-0 block",
                  expanded ? "z-10" : "z-0",
                )}
                style={{
                  width: `calc(100% - ${2 * (BALL + GAP)}px)`,
                  height: `${ROW}px`,
                  transform: `translateX(${wrapperX(active, i)})`,
                  transition: reduced
                    ? "none"
                    : `transform 600ms ${EASE_CSS}`,
                  willChange: "transform",
                }}
              >
                {/* The clipped frame - the ONLY hit area (clip-path clips
                    pointer events too, so overlapping wrappers never steal
                    each other's hovers or clicks). */}
                <span
                  className="pointer-events-auto absolute inset-0 block overflow-hidden rounded-3xl"
                  style={{
                    clipPath: expanded
                      ? "circle(105% at 50% 50%)"
                      : `circle(${RADIUS}px at 50% 50%)`,
                    transition: reduced
                      ? "none"
                      : `clip-path 600ms ${EASE_CSS}`,
                    willChange: "clip-path",
                  }}
                >
                <span className="bg-surface absolute inset-0 block" aria-hidden />
                <Image
                  src={item.scene}
                  alt={item.sceneAlt}
                  fill
                  sizes="(min-width: 90rem) 976px, (min-width: 1024px) calc(100vw - 464px), 100vw"
                  quality={90}
                  className={cn(
                    "object-cover",
                    fade,
                    expanded ? "opacity-100" : "opacity-0",
                  )}
                  loading="lazy"
                />
                {/* The ball - a generated 4K macro of the shade, rendered AT
                    ball size so it is sharp at retina */}
                <span
                  className={cn(
                    "absolute top-1/2 left-1/2 block size-52 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full",
                    fade,
                    expanded ? "opacity-0" : "opacity-100",
                  )}
                >
                  <Image
                    src={item.ball}
                    alt={`${item.shadeLabel} ${item.label.toLowerCase()} macro`}
                    fill
                    sizes="13rem"
                    quality={90}
                    className="object-cover"
                    loading="lazy"
                  />
                </span>

                {/* Ball hairline - full-alpha Onyx, fades out on expand */}
                <span
                  aria-hidden
                  className={cn(
                    "border-warm-black absolute top-1/2 left-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full border",
                    fade,
                    expanded ? "opacity-0" : "opacity-100",
                  )}
                />
                {/* Panel hairline - fades in on expand */}
                <span
                  aria-hidden
                  className={cn(
                    "border-warm-black absolute inset-0 rounded-3xl border",
                    fade,
                    expanded ? "opacity-100" : "opacity-0",
                  )}
                />

                {/* Scrim + panel copy - only readable in the expanded state */}
                <span
                  aria-hidden={!expanded}
                  className={cn(
                    "from-warm-black/70 absolute inset-0 flex flex-col justify-end bg-gradient-to-t via-transparent to-transparent p-8",
                    fade,
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

                {/* Ball caption - outside the clipped frame so it stays
                    visible under the circle; fades on expand */}
                <span
                  className={cn(
                    "label-gcb text-warm-black pointer-events-auto absolute left-1/2 -translate-x-1/2 whitespace-nowrap",
                    fade,
                    expanded ? "opacity-0" : "opacity-100",
                  )}
                  style={{ top: `calc(50% + ${RADIUS + 24}px)` }}
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
              aria-label={`${item.label} - explore the KalingaStone range`}
              className="border-warm-black relative block aspect-[4/5] overflow-hidden rounded-3xl border"
            >
              <Image
                src={item.scene}
                alt={item.sceneAlt}
                fill
                sizes="100vw"
                quality={90}
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
                  src={item.ball}
                  alt={`${item.shadeLabel} ${item.label.toLowerCase()} macro`}
                  fill
                  sizes="4rem"
                  quality={90}
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
