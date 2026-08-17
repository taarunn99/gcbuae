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
 * The Brands - a character-select deck (owner spec, fourth pass,
 * 2026-08-17). Pinned 300vh; normal vertical scroll drives the deck
 * horizontally with a coverflow pose. THE STAGE CHANGES COLOUR WITH THE
 * BRAND: as each logo reaches centre, the whole section crossfades to a
 * background chosen to contrast that specific logo (owner-sanctioned
 * departure from the five-colour palette for this section only). No
 * cards, no numerals, no ghost type - the logo, two slow disks, chip
 * facts, the shiny button, a progress rail and a centred scroll cue.
 *
 * Ledger rule: no overflow clipping on any ANCESTOR of the sticky
 * frame - the clip lives on the sticky element itself.
 */

/** Stage colour per brand - picked to contrast each logo's own colour:
 *  warm alabaster under KalingaStone's deep red mark, cool porcelain
 *  grey under Jaquar's black wordmark, FILA's own yellow behind its
 *  black-and-yellow block. Order must match `brands`. */
const STAGE_COLORS = ["#F2E9DD", "#DCE1DE", "#FED400"];

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
            className="py-20"
            style={{ backgroundColor: STAGE_COLORS[i] }}
          >
            <div className="container-gcb">
              {i === 0 && (
                <p className="label-gcb text-warm-black/60 mb-10">By brand</p>
              )}
              <BrandSlide brand={brand} />
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
            {brands.map((brand) => (
              <div
                key={brand.name}
                data-brand-card
                className="flex h-[64vh] w-screen shrink-0 items-center justify-center px-6 sm:px-16"
                style={{ transformStyle: "preserve-3d" }}
              >
                <BrandSlide brand={brand} large />
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

function BrandSlide({
  brand,
  large,
}: {
  brand: (typeof brands)[number];
  large?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center text-center",
        large && "max-w-5xl",
      )}
    >
      {/* The slow-turning disks behind the logo */}
      {large && (
        <span
          aria-hidden
          className="border-warm-black/25 pointer-events-none absolute top-1/2 left-1/2 h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed motion-safe:animate-[spin_45s_linear_infinite]"
        />
      )}
      {large && (
        <span
          aria-hidden
          className="border-warm-black/10 pointer-events-none absolute top-1/2 left-1/2 h-[34vh] w-[34vh] -translate-x-1/2 -translate-y-1/2 rounded-full border motion-safe:animate-[spin_70s_linear_infinite_reverse]"
        />
      )}

      <Link
        href={brand.href}
        aria-label={`Explore ${brand.name}`}
        className={cn(
          "group relative block w-full",
          large ? "h-[28vh] max-h-72" : "h-24",
        )}
      >
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          fill
          sizes={large ? "50vw" : "30vw"}
          className="object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.05]"
          loading="lazy"
        />
      </Link>

      {/* Facts as chips */}
      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-2">
        <span className="chip-gcb border-warm-black/30 text-warm-black rounded-full border px-4 py-1.5 text-sm">
          {brand.role}
        </span>
        <span className="chip-gcb border-warm-black/30 text-warm-black rounded-full border px-4 py-1.5 text-sm">
          {brand.stat}
        </span>
      </div>

      {/* The shiny magnetic button */}
      <div className="relative mt-7">
        <GcbButton href={brand.href} size="md" variant="light">
          Explore {brand.name}
        </GcbButton>
      </div>
    </div>
  );
}
