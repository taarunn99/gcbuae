"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

/** A rule that draws itself in when scrolled into view (Onyx Green — contrast trial). */
export function RuleIn({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={cn("bg-warm-black block h-px origin-left", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
    />
  );
}
