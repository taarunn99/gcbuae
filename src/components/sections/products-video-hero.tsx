"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Products hero in the castedluxe register, scroll-driven: the slab film
 * loops seamlessly full-bleed beneath an Onyx layer with the headline
 * word and a rectangle window knocked out. Scrolling grows the
 * rectangle window until the stone swallows the frame — then, over the
 * full-bleed film, the three ranges introduce themselves in sequence
 * (Quartz 69 · Marble 35 · Terrazzo 24, each a tappable chapter) before
 * the signature closes the overture and the page releases into the
 * lines. Reduced motion gets the still composition with no pin.
 */
export function ProductsVideoHero() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<SVGRectElement>(null);
  const windowRef = useRef<SVGRectElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Phase 1 (0–0.4): the rectangle window grows until the stone
      // swallows the frame — the type never moves (tweening its clamp()
      // font-size was the original bug: GSAP can't parse clamp).
      tl.to(
        windowRef.current,
        {
          attr: { x: "0%", y: "0%", width: "100%", height: "100%", rx: 0 },
          ease: "power2.inOut",
          duration: 0.4,
        },
        0,
      )
        .to(chromeRef.current, { opacity: 0, ease: "none", duration: 0.2 }, 0)
        .to(
          overlayRef.current,
          { attr: { "fill-opacity": 0 }, ease: "none", duration: 0.1 },
          0.32,
        );

      // Phase 2 (0.42–1): the ranges introduce themselves over the film,
      // then the signature closes the overture.
      const chapters = gsap.utils.toArray<HTMLElement>("[data-chapter]");
      const slot = 0.58 / (chapters.length + 0.6);
      chapters.forEach((chapter, i) => {
        const at = 0.42 + i * slot;
        tl.fromTo(
          chapter,
          { autoAlpha: 0, yPercent: 12 },
          { autoAlpha: 1, yPercent: 0, ease: "none", duration: slot * 0.35 },
          at,
        );
        // every chapter but the closing signature hands over to the next
        if (i < chapters.length - 1) {
          tl.to(
            chapter,
            { autoAlpha: 0, yPercent: -12, ease: "none", duration: slot * 0.3 },
            at + slot * 0.7,
          );
        }
      });
    },
    { scope: wrapRef, dependencies: [reduced] },
  );

  return (
    <div ref={wrapRef} className={cn(!reduced && "h-[380vh]")}>
      <section
        className={cn(
          "bg-warm-black relative h-[92svh] min-h-[560px] overflow-hidden",
          !reduced && "sticky top-0 h-svh",
        )}
      >
        {/* The film — crossfaded seamless loop */}
        {reduced ? (
          <Image
            src="/products/hero/slab-procession-poster.webp"
            alt=""
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/products/hero/slab-procession.mp4"
            poster="/products/hero/slab-procession-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
        )}

        {/* Onyx layer with the type + window knocked out */}
        <svg
          className="absolute inset-0 h-full w-full"
          aria-hidden
          preserveAspectRatio="none"
        >
          <defs>
            <mask id="products-hero-mask">
              <rect width="100%" height="100%" fill="#fff" />
              {/* The headline word — stone flows through the letters */}
              <text
                x="50%"
                y="34%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000"
                className="font-display"
                style={{
                  fontSize: "clamp(4.5rem, 16vw, 15rem)",
                  letterSpacing: "0.02em",
                }}
              >
                Products
              </text>
              {/* The window — scroll grows THIS until it fills the frame */}
              <rect
                ref={windowRef}
                x="8%"
                y="52%"
                width="84%"
                height="34%"
                rx="14"
                fill="#000"
              />
            </mask>
          </defs>
          <rect
            ref={overlayRef}
            width="100%"
            height="100%"
            fill="#0C1510"
            fillOpacity="0.96"
            mask="url(#products-hero-mask)"
          />
        </svg>

        {/* The chapter overture — plays over the full-bleed film */}
        <div ref={chaptersRef} aria-hidden={false}>
          {[
            {
              href: "/kalingastone/quartz",
              kicker: "KalingaStone",
              title: "Quartz",
              sub: "69 shades · the worktop material",
            },
            {
              href: "/kalingastone/marble",
              kicker: "KalingaStone",
              title: "Marble",
              sub: "35 shades · repolishable, > 85% gloss",
            },
            {
              href: "/kalingastone/terrazzo",
              kicker: "KalingaStone",
              title: "Terrazzo",
              sub: "24 shades · Class A1 fire, exterior-ready",
            },
          ].map((c) => (
            <Link
              key={c.title}
              href={c.href}
              data-chapter
              className="group invisible absolute inset-0 z-10 flex flex-col items-center justify-center text-center opacity-0"
            >
              {/* soft scrim keeps the type legible over moving stone */}
              <span
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,21,16,0.55),transparent_65%)]"
              />
              <span className="label-gcb text-bronze relative">{c.kicker}</span>
              <span className="font-display text-ink relative mt-3 text-6xl sm:text-8xl">
                {c.title}
              </span>
              <span className="text-ink/80 relative mt-4 text-sm sm:text-base">
                {c.sub}
              </span>
              <span className="chip-gcb border-ink/40 text-ink relative mt-7 rounded-full border px-5 py-2.5 text-sm">
                Enter the range →
              </span>
            </Link>
          ))}
          {/* The closing signature — stays until release */}
          <div
            data-chapter
            className="pointer-events-none invisible absolute inset-0 z-10 flex flex-col items-center justify-center text-center opacity-0"
          >
            <span
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,21,16,0.5),transparent_65%)]"
            />
            <p className="font-display text-ink relative text-3xl italic sm:text-5xl">
              &ldquo;Every slab, a signature.&rdquo;
            </p>
            <p className="label-gcb text-ink/70 relative mt-5">
              Global Classic · Sharjah, UAE
            </p>
          </div>
        </div>

        {/* Kicker + signature */}
        <div ref={chromeRef}>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-32 sm:pt-36">
            <p className="label-gcb text-ink/70 text-center">
              Global Classic · Product lines
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 pb-8">
            <p className="font-display text-ink/90 text-center text-xl italic sm:text-2xl">
              &ldquo;Every slab, a signature.&rdquo;
            </p>
            <p aria-hidden className="text-ink/50 mt-3 text-center text-xs">
              Scroll to unveil ↓
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
