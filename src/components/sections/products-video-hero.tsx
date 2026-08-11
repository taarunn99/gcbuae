"use client";

import Image from "next/image";
import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Products hero in the castedluxe register, scroll-driven: the slab film
 * loops seamlessly full-bleed beneath an Onyx layer with the headline
 * word and a rectangle window knocked out. Scrolling zooms INTO the
 * type — the letters grow until the stone swallows the frame, the layer
 * dissolves, and the page releases into the product lines. Reduced
 * motion gets the still composition with no pin.
 */
export function ProductsVideoHero() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const overlayRef = useRef<SVGRectElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;
      const text = textRef.current;
      if (!text) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // The word grows around its anchor until the knockout swallows the
      // viewport, drifting to the vertical centre on the way.
      tl.to(
        text,
        {
          fontSize: () => `${window.innerWidth * 2.4}px`,
          attr: { y: "50%" },
          ease: "power2.in",
        },
        0,
      )
        // Kicker + signature bow out early
        .to(chromeRef.current, { opacity: 0, ease: "none", duration: 0.25 }, 0)
        // Guarantee the full reveal at the end, whatever the viewport
        .to(
          overlayRef.current,
          { attr: { "fill-opacity": 0 }, ease: "none", duration: 0.2 },
          0.8,
        );
    },
    { scope: wrapRef, dependencies: [reduced] },
  );

  return (
    <div ref={wrapRef} className={cn(!reduced && "h-[260vh]")}>
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
                ref={textRef}
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
              <rect
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
