"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Drives Lenis from the GSAP ticker instead of its own rAF loop, so smooth
 * scrolling and every ScrollTrigger run on a single frame. Two loops would
 * leave pinned sections a frame behind the content.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    // GSAP ticker time is in seconds; Lenis expects milliseconds.
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    const lenis = lenisRef.current?.lenis;

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
