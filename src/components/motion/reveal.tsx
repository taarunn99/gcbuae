"use client";

import { motion } from "motion/react";

import { fadeUp, inView, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds before the entrance starts. */
  delay?: number;
};

/** Fades and rises a block the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={{ delay }}
      {...inView}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  gap?: number;
};

/**
 * Cascades the entrance of direct `RevealItem` children. Children must be
 * `RevealItem` (or any motion element using the `fadeUp` variants) — a plain
 * element will render immediately and break the cascade.
 */
export function RevealGroup({
  children,
  className,
  gap = 0.08,
}: RevealGroupProps) {
  return (
    <motion.div className={className} variants={stagger(gap)} {...inView}>
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={cn(className)} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
