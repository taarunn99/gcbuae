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
 * The Brands - a character-select deck (owner spec, 2026-08-17, third
 * pass). Pinned 300vh; normal vertical scroll drives the deck
 * horizontally with a coverflow pose. No cards, no numerals: each brand
 * is its logo floating over a giant outlined ghost name, backed by a
 * slow-turning dashed disk (the "horizontal disk" of the spec), with
 * chip facts and the house shiny magnetic button. A Pine progress rail
 * tracks the deck; the scroll cue stays centred in the frame. Pastel
 * Green ground, Onyx type. Reduced motion ships a static row.
 *
 * Ledger rule: no overflow clipping on any ANCESTOR of the sticky
 * frame - the clip lives on the sticky element itself.
 */
export function BrandCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-brand-card]", track);
      const ghosts = gsap.utils.toArray<HTMLElement>("[data-brand-ghost]", track);
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
          // Ghost name drifts against the deck for parallax depth
          if (ghosts[i]) gsap.set(ghosts[i], { xPercent: clamped * 18 });
        }
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
    { scope: wrapperRef, dependencies: [reduced] },
  );

  /* Reduced motion: a calm static row, same content. */
  if (reduced) {
    return (
      <section className="bg-bronze py-24">
        <div className="container-gcb">
          <p className="label-gcb text-warm-black/60">By brand</p>
          <div className="mt-10 grid gap-16 sm:grid-cols-3">
            {brands.map((brand) => (
              <BrandSlide key={brand.name} brand={brand} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="The brands" className="bg-bronze">
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
                className="bg-verde absolute inset-y-0 left-0 w-full origin-left"
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
      {/* Giant outlined ghost name, drifting behind the logo */}
      <span
        aria-hidden
        data-brand-ghost
        className={cn(
          "font-display text-warm-black/60 pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[72%] tracking-tight whitespace-nowrap uppercase select-none",
          "[-webkit-text-stroke:1.5px_rgb(12_21_16_/_0.22)] text-transparent",
          large ? "text-[13vw]" : "text-6xl",
        )}
      >
        {brand.name}
      </span>

      {/* The slow-turning disk behind the logo */}
      {large && (
        <span
          aria-hidden
          className="border-verde/40 pointer-events-none absolute top-1/2 left-1/2 h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed motion-safe:animate-[spin_45s_linear_infinite]"
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
