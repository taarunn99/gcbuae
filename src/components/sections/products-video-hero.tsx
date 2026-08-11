"use client";

import Image from "next/image";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Products hero in the castedluxe.com register: one continuous AI film
 * of the slab procession plays full-bleed, and an Onyx Green layer sits
 * over it with two knockouts — the giant headline word and a wide
 * rectangle window — so the stone flows through the type. The signature
 * line sits beneath the window. Reduced-motion (and data-saver browsers
 * that ignore autoplay) get the poster frame — same composition, still.
 */
export function ProductsVideoHero() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-warm-black relative h-[92svh] min-h-[560px] overflow-hidden">
      {/* The film */}
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
            {/* The window */}
            <rect x="8%" y="52%" width="84%" height="34%" rx="14" fill="#000" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="#0C1510"
          fillOpacity="0.96"
          mask="url(#products-hero-mask)"
        />
      </svg>

      {/* Kicker + signature */}
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
    </section>
  );
}
