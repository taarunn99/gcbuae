"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// GSAP touches `document` when plugins register, so registration is guarded to
// the browser. Every animated component must import gsap from this module
// rather than from "gsap" directly, or its plugins will be unregistered.
//
// GOVERNANCE §4 (route-JS budget): only plugins actually in use are imported.
// Add Flip/Observer/DrawSVG back here the day a component needs them - never
// speculatively.
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollToPlugin,
    SplitText,
    CustomEase,
  );

  CustomEase.create("gcb-out", "0.16, 1, 0.3, 1");
  CustomEase.create("gcb-in-out", "0.76, 0, 0.24, 1");
  CustomEase.create("gcb-reveal", "0.25, 1, 0.5, 1");

  gsap.defaults({ ease: "gcb-out", duration: 1 });

  // GLOBAL: iOS URL-bar collapse fires a resize that would otherwise force a
  // full ScrollTrigger refresh mid-scroll - and the page's dvh/svh sections
  // (hero, film) sit above the PINNED product wheel, so that refresh moved
  // the pin bounds under the visitor's finger (wheel glitch, 2026-08-21).
  // Safe globally: the only other pin-adjacent trigger (footer reveal) is
  // desktop-only. Positions may drift by the bar delta until the next real
  // refresh (rotation, route change, footer's 600ms refresh) - accepted.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Named easings shared by GSAP timelines. Mirrors `EASE` in `@/lib/motion`. */
export const ease = {
  out: "gcb-out",
  inOut: "gcb-in-out",
  reveal: "gcb-reveal",
} as const;

/** Duration scale in seconds, so timings stay consistent across sections. */
export const duration = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  reveal: 1.6,
} as const;

export { CustomEase, gsap, ScrollToPlugin, ScrollTrigger, SplitText, useGSAP };
