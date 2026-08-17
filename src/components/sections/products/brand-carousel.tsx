"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { GcbButton } from "@/components/ui/gcb-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { brands } from "@/config/kalingastone";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * The Brands - a character-select deck (owner spec, fifth pass,
 * 2026-08-17). Pinned 300vh; vertical scroll drives the deck horizontally
 * with a coverflow pose, and THE STAGE CHANGES COLOUR WITH THE BRAND
 * (owner-sanctioned departure from the five-colour palette, this section
 * only). The plain rotating circles are gone - each slide is now a brand
 * shelf: the logo left, then a filmstrip of small rounded tiles carrying
 * REAL catalogue imagery (swatches, fittings, care bottles) running
 * consecutively after the logo and bleeding past the viewport edge. The
 * strip parallax-drifts against the track so it visibly scrolls with the
 * deck. No cards, no numerals, no ghost type.
 *
 * Ledger rules honoured: no overflow clipping on any ANCESTOR of the
 * sticky frame (the clip lives on the sticky element itself); tile and
 * chip hairlines are FULL-ALPHA Onyx - partial-alpha Onyx reads as grey.
 */

/** Stage colour per brand - deepened so the stage reads saturated, not
 *  washy, while still contrasting each logo's own colour: warm sand under
 *  KalingaStone's deep red mark, cool stone grey under Jaquar's black
 *  wordmark, FILA's own yellow behind its block. Order matches `brands`. */
const STAGE_COLORS = ["#ECDABF", "#CDD5CF", "#FED400"];

type Tile = {
  src: string;
  /** What the tile shows - documentation only, tiles are decorative. */
  alt: string;
};

/** The shelf tiles - real swatches for KalingaStone, the GENERATED
 *  aesthetic scenes for Jaquar and FILA (owner 2026-08-17: white-ground
 *  product cutouts don't blend on the stage; swatches do, scenes do).
 *  Eight per brand, all full-bleed crops. Order matches `brands`. */
const BRAND_TILES: Tile[][] = [
  [
    { src: "/kalingastone/quartz/swatches/alluring.webp", alt: "Alluring quartz swatch" },
    { src: "/kalingastone/marble/swatches/emperador-scuro.webp", alt: "Emperador Scuro engineered marble swatch" },
    { src: "/kalingastone/terrazzo/swatches/exotic-green.webp", alt: "Exotic Green terrazzo swatch" },
    { src: "/kalingastone/quartz/swatches/nero-classic.webp", alt: "Nero Classic quartz swatch" },
    { src: "/kalingastone/marble/swatches/artic-white.webp", alt: "Artic White engineered marble swatch" },
    { src: "/kalingastone/quartz/swatches/pietra-grey.webp", alt: "Pietra Grey quartz swatch" },
    { src: "/kalingastone/terrazzo/swatches/jade.webp", alt: "Jade terrazzo swatch" },
    { src: "/kalingastone/quartz/swatches/crema-gold.webp", alt: "Crema Gold quartz swatch" },
  ],
  [
    { src: "/jaquar/scenes/faucets.webp", alt: "Chrome basin mixer running over marble" },
    { src: "/jaquar/scenes/bathtubs.webp", alt: "Freestanding bathtub against a green wall" },
    { src: "/jaquar/scenes/showers.webp", alt: "Rain shower scene" },
    { src: "/jaquar/scenes/sanitary-ware.webp", alt: "Sanitaryware scene" },
    { src: "/jaquar/scenes/wash-basins.webp", alt: "Wash basin scene" },
    { src: "/jaquar/scenes/wellness.webp", alt: "Wellness and spa scene" },
    { src: "/jaquar/scenes/shower-enclosures.webp", alt: "Shower enclosure scene" },
    { src: "/jaquar/scenes/whirlpools.webp", alt: "Whirlpool scene" },
  ],
  [
    { src: "/images/fila/brand/droplets-macro-stone-hero.webp", alt: "Sealed stone beading golden droplets" },
    { src: "/images/fila/heroes/protectors.webp", alt: "Water droplets on protected dark granite" },
    { src: "/images/fila/brand/leaf-droplets-macro.webp", alt: "Droplets on a green leaf macro" },
    { src: "/images/fila/heroes/finishing.webp", alt: "Waxed terracotta floor in warm light" },
    { src: "/images/fila/heroes/cleaners.webp", alt: "Foam arc across a porcelain floor" },
    { src: "/images/fila/brand/material-palette-tiles.webp", alt: "Palette of tile and stone samples" },
    { src: "/images/fila/heroes/hub-droplets.webp", alt: "Amber droplet on travertine" },
    { src: "/images/fila/brand/kitchen-marble-flatlay.webp", alt: "Kitchen flatlay on black marble" },
  ],
];

export function BrandCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const section = sectionRef.current;
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!section || !wrapper || !track) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-brand-card]", track);
      const strips = gsap.utils.toArray<HTMLElement>(
        "[data-brand-strip]",
        track,
      );
      const count = cards.length;

      const setPose = (progress: number) => {
        const position = progress * (count - 1);
        for (let i = 0; i < count; i++) {
          const clamped = Math.max(-1, Math.min(1, i - position));
          gsap.set(cards[i], {
            scale: 1 - 0.12 * Math.abs(clamped),
            rotateY: clamped * -14,
            autoAlpha: 1 - 0.6 * Math.abs(clamped),
            zIndex: 10 - Math.round(Math.abs(clamped) * 5),
          });
          // The shelf lags the track so the tiles visibly travel
          if (strips[i])
            gsap.set(strips[i], { x: clamped * -0.08 * window.innerWidth });
        }
        // Stage colour follows whichever logo holds the centre
        const lower = Math.max(0, Math.min(count - 1, Math.floor(position)));
        const upper = Math.min(count - 1, lower + 1);
        const blend = gsap.utils.interpolate(
          STAGE_COLORS[lower],
          STAGE_COLORS[upper],
          position - lower,
        );
        gsap.set(section, { backgroundColor: blend });
        if (railRef.current)
          gsap.set(railRef.current, { scaleX: Math.max(0.02, progress) });
      };
      setPose(0);

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => setPose(self.progress),
        },
      });
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  /* Reduced motion: three calm full-bleed strips, each on its own stage. */
  if (reduced) {
    return (
      <section aria-label="The brands">
        {brands.map((brand, i) => (
          <div
            key={brand.name}
            className="overflow-hidden py-20"
            style={{ backgroundColor: STAGE_COLORS[i] }}
          >
            <div className="container-gcb">
              {i === 0 && (
                <p className="label-gcb text-warm-black/60 mb-10">By brand</p>
              )}
              <BrandSlide brand={brand} tiles={BRAND_TILES[i]} />
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="The brands"
      style={{ backgroundColor: STAGE_COLORS[0] }}
    >
      <div ref={wrapperRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-gcb flex items-baseline justify-between">
            <div>
              <p className="label-gcb text-warm-black/60">By brand</p>
              <h2 className="font-display text-phi-3 text-warm-black mt-3 tracking-tight">
                Choose your brand.
              </h2>
            </div>
            <p className="label-gcb text-warm-black/50 hidden sm:block">
              Three names · one supplier
            </p>
          </div>

          <div
            ref={trackRef}
            className="flex w-max items-stretch will-change-transform"
            style={{ perspective: "1200px" }}
          >
            {brands.map((brand, i) => (
              <div
                key={brand.name}
                data-brand-card
                className="flex h-[64vh] w-screen shrink-0 items-center px-6 sm:px-16"
                style={{ transformStyle: "preserve-3d" }}
              >
                <BrandSlide brand={brand} tiles={BRAND_TILES[i]} />
              </div>
            ))}
          </div>

          {/* Progress rail + centred cue */}
          <div className="container-gcb">
            <div className="bg-warm-black/15 relative h-px w-full overflow-hidden">
              <div
                ref={railRef}
                className="bg-warm-black absolute inset-y-0 left-0 w-full origin-left"
                style={{ transform: "scaleX(0.02)" }}
              />
            </div>
            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="label-gcb text-warm-black/60">
                Keep scrolling
              </span>
              <svg
                aria-hidden
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-warm-black/60 animate-bounce"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One brand shelf: logo + facts + button on the left, then the tile
 * filmstrip running after the logo and bleeding past the right viewport
 * edge (negative margin cancels the slide padding). Tiles alternate a
 * small vertical offset so the shelf has rhythm, not a ruler line.
 */
function BrandSlide({
  brand,
  tiles,
}: {
  brand: (typeof brands)[number];
  tiles: Tile[];
}) {
  return (
    <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
      <div className="flex shrink-0 flex-col items-start gap-7">
        <Link
          href={brand.href}
          aria-label={`Explore ${brand.name}`}
          className="group relative block h-[12vh] max-h-32 w-full max-w-md lg:h-[16vh] lg:max-h-48 lg:w-[30rem] lg:max-w-none"
        >
          <Image
            src={brand.logo}
            alt={`${brand.name} logo`}
            fill
            sizes="(min-width: 1024px) 480px, 90vw"
            className="object-contain object-left drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.04]"
            loading="eager"
          />
        </Link>

        {/* Facts as chips - full-alpha Onyx hairlines, never grey */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip-gcb border-warm-black text-warm-black rounded-full border px-4 py-1.5 text-sm">
            {brand.role}
          </span>
          <span className="chip-gcb border-warm-black text-warm-black rounded-full border px-4 py-1.5 text-sm">
            {brand.stat}
          </span>
        </div>

        {/* The shiny magnetic button */}
        <GcbButton href={brand.href} size="md" variant="light">
          Explore {brand.name}
        </GcbButton>
      </div>

      {/* The filmstrip - real catalogue material, on to the viewport edge */}
      <div className="-mr-6 min-w-0 flex-1 sm:-mr-16" aria-hidden>
        <div
          data-brand-strip
          className="flex w-max items-center gap-3 will-change-transform md:gap-4"
        >
          {tiles.map((tile, i) => (
            <div
              key={tile.src}
              className={cn(
                "border-warm-black bg-ink relative size-14 shrink-0 overflow-hidden rounded-xl border shadow-sm md:size-20 xl:size-28",
                i % 2 ? "translate-y-2.5" : "-translate-y-2.5",
              )}
            >
              <Image
                src={tile.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
