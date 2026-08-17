"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { brands } from "@/config/kalingastone";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * The Brands - a character-select carousel (owner spec, 2026-08-17).
 * The section pins for 300vh of vertical scroll; the scroll is never
 * hijacked - normal wheel/touch scrolling simply drives the deck
 * horizontally, one brand card at a time, with a coverflow rotation as
 * cards enter and leave the centre. Pastel Green ground, logos floating
 * free with no card chrome, text minimal. Reduced motion: static row.
 *
 * Ledger rule respected: no overflow clipping on any ANCESTOR of the
 * sticky frame - the clip lives on the sticky element itself.
 */
export function BrandCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-brand-card]", track);
      const count = cards.length;

      const setPose = (progress: number) => {
        // progress 0..1 -> deck position 0..(count-1)
        const position = progress * (count - 1);
        for (let i = 0; i < count; i++) {
          const distance = i - position; // negative = left of centre
          const clamped = Math.max(-1, Math.min(1, distance));
          gsap.set(cards[i], {
            scale: 1 - 0.14 * Math.abs(clamped),
            rotateY: clamped * -16,
            autoAlpha: 1 - 0.55 * Math.abs(clamped),
            zIndex: 10 - Math.round(Math.abs(clamped) * 5),
          });
        }
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
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {brands.map((brand) => (
              <BrandCard key={brand.name} brand={brand} />
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
          <div className="container-gcb">
            <p className="label-gcb text-warm-black/60">By brand</p>
            <h2 className="font-display text-phi-3 text-warm-black mt-3 tracking-tight">
              Choose your brand.
            </h2>
          </div>
          <div
            ref={trackRef}
            className="mt-8 flex w-max items-stretch will-change-transform"
            style={{ perspective: "1200px" }}
          >
            {brands.map((brand) => (
              <div
                key={brand.name}
                data-brand-card
                className="flex w-screen shrink-0 items-center justify-center px-6 sm:px-16"
                style={{ transformStyle: "preserve-3d" }}
              >
                <BrandCard brand={brand} large />
              </div>
            ))}
          </div>
          <div className="container-gcb mt-8">
            <span className="label-gcb text-warm-black/50">Keep scrolling</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandCard({
  brand,
  large,
}: {
  brand: (typeof brands)[number];
  large?: boolean;
}) {
  return (
    <Link
      href={brand.href}
      className={cn(
        "group relative flex w-full flex-col items-center justify-center text-center",
        large ? "h-[62vh] max-w-4xl px-10 py-12" : "px-8 py-10",
      )}
    >
      <span
        className={cn(
          "relative block w-full",
          large ? "h-[36vh] max-h-96" : "h-24",
        )}
      >
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          fill
          sizes={large ? "60vw" : "30vw"}
          className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </span>
      <span className="label-gcb text-warm-black/60 mt-8 block">
        {brand.role}
      </span>
      <span className="text-warm-black mt-2 block text-sm">
        {brand.stat}
      </span>
      <span className="font-display text-warm-black mt-5 inline-flex items-center gap-2 text-lg">
        Explore {brand.name}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
          →
        </span>
      </span>
    </Link>
  );
}
