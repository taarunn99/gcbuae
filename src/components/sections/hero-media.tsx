"use client";

import Image from "next/image";
import { useRef } from "react";

import hero from "@/assets/hero.webp";
import heroCopy from "@/config/hero-copy.json";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ease, gsap, useGSAP } from "@/lib/gsap";

/**
 * The hero photograph, its scrim, and the two transforms applied to it.
 *
 * The intro settle and the scroll parallax live on separate wrapper elements
 * because both drive `scale` — sharing one element would let the scrubbed
 * ScrollTrigger overwrite the intro tween mid-flight.
 */
export function HeroMedia() {
  const root = useRef<HTMLDivElement>(null);
  const parallax = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      // Transform only — never fade the LCP element in. An opacity tween
      // delays the largest contentful paint by its full duration; a transform
      // costs nothing because the pixels are already painted.
      gsap.fromTo(
        intro.current,
        { scale: 1.06 },
        { scale: 1, duration: 2, ease: ease.reveal },
      );

      gsap.to(parallax.current, {
        yPercent: 12,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [prefersReducedMotion] },
  );

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden">
      <div ref={parallax} className="absolute inset-0 will-change-transform">
        <div ref={intro} className="absolute inset-0 will-change-transform">
          <Image
            src={hero}
            alt={heroCopy.imageAlt}
            fill
            // Required with `fill`, or Next emits a 1x/2x srcset instead of a
            // width-based one and ships a needlessly large file to phones.
            sizes="100vw"
            quality={90}
            placeholder="blur"
            // Replaces `priority`, deprecated in Next 16.
            preload
            className="object-cover [object-position:43.5%_50%]"
          />
        </div>
      </div>
      <div
        aria-hidden
        className="hero-scrim pointer-events-none absolute inset-0"
      />
    </div>
  );
}
