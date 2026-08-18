"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * The masthead family figure rides DOWN the page as you scroll (owner
 * spec, 2026-08-18): it starts at the top of its column and travels
 * with the reader until the ticker's "Seven Emirates · One Family"
 * line. Transform-only (Motion scroll-linked translateY); reduced
 * motion renders it still.
 */
export function FamilyParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 240]);

  if (reduced) return <div>{children}</div>;

  return (
    <div ref={ref}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
