"use client";

import { useRef } from "react";

import heroCopy from "@/config/hero-copy.json";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";

export function HeroScrollCue() {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.to(".gcb-cue-line", {
        scaleY: 0.25,
        transformOrigin: "top center",
        duration: 1.6,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: root, dependencies: [prefersReducedMotion] },
  );

  return (
    <div
      ref={root}
      className="text-ink/70 absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-3"
    >
      <span className="label-gcb">{heroCopy.scrollCue}</span>
      <span
        aria-hidden
        className="gcb-cue-line bg-ink/50 block h-10 w-px origin-top"
      />
    </div>
  );
}
