import type { Transition, Variants } from "motion/react";

/**
 * Cubic beziers shared with the GSAP CustomEase definitions in `@/lib/gsap`,
 * so a Motion component and a GSAP timeline on the same screen feel identical.
 */
export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.76, 0, 0.24, 1],
  reveal: [0.25, 1, 0.5, 1],
} as const;

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  reveal: 1.6,
} as const;

export const transition = {
  base: { duration: DURATION.base, ease: EASE.out },
  slow: { duration: DURATION.slow, ease: EASE.out },
  spring: { type: "spring", stiffness: 180, damping: 24, mass: 1 },
} satisfies Record<string, Transition>;

/** Fade and rise. The default entrance for headings and cards. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
};

/** Wrap a group of `fadeUp` children to cascade their entrances. */
export const stagger = (
  staggerChildren = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Clip-path wipe for images and media panels. */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: DURATION.reveal, ease: EASE.reveal },
  },
};

/** Shared `whileInView` config so scroll entrances trigger at one consistent point. */
export const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.25 },
} as const;
