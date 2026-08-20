"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * The /jaquar hero film - an 8 s slow push on shower water threads
 * against Onyx Green, generated for this page (see
 * docs/jaquar-image-provenance.md). Viewport-gated play/pause via
 * IntersectionObserver (the film-loop pattern - no scroll scrubbing,
 * no second rAF loop), muted loop, poster first for LCP. Reduced
 * motion ships the still.
 */
export function JaquarHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div className="border-warm-black relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
      {reduced ? (
        <Image
          src="/jaquar/hero/jaquar-hero-poster.webp"
          alt="Fine threads of water falling from a Jaquar rain shower against a deep onyx green wall"
          fill
          quality={90}
          sizes="100vw"
          className="object-cover"
          preload
        />
      ) : (
        <>
          {/* Poster as a real layer - iOS paints <video poster>
              unreliably (WebKit audit, 2026-08-20). */}
          <Image
            src="/jaquar/hero/jaquar-hero-poster.webp"
            alt=""
            fill
            quality={90}
            sizes="100vw"
            className="object-cover"
            preload
            aria-hidden
          />
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/jaquar/hero/jaquar-hero.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Slow motion film of water threads falling from a Jaquar rain shower"
          />
        </>
      )}
    </div>
  );
}
