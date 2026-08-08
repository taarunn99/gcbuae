"use client";

import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The four-stage Microban story as a scroll-driven timeline: a Pine
 * Green line fills the track as you scroll, each numbered dot lights up
 * as the line reaches it, and each step reveals in turn. All text is
 * server-rendered; reduced motion gets the finished state.
 */

const STEPS: [title: string, body: string][] = [
  [
    "Technology integration",
    "The antibacterial agent is built into the slab during manufacture.",
  ],
  ["Surface contamination", "Bacteria land on the counter in daily use."],
  [
    "Technology at work",
    "The integrated agent disrupts bacterial growth continuously.",
  ],
  [
    "A cleaner surface",
    "The surface stays cleaner between cleans — for the product's lifetime.",
  ],
];

export function MicrobanTimeline() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        // Finished state, no motion.
        gsap.set("[data-tl-progress]", { scaleY: 1 });
        for (const li of gsap.utils.toArray<HTMLElement>("[data-tl-step]")) {
          li.classList.add("tl-on");
        }
        return;
      }
      gsap.to("[data-tl-progress]", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 72%",
          end: "bottom 55%",
          scrub: true,
        },
      });
      for (const li of gsap.utils.toArray<HTMLElement>("[data-tl-step]")) {
        ScrollTriggerToggle(li);
        gsap.from(li, {
          y: 22,
          opacity: 0,
          duration: 0.9,
          scrollTrigger: { trigger: li, start: "top 82%", once: true },
        });
      }
      function ScrollTriggerToggle(li: HTMLElement) {
        gsap.timeline({
          scrollTrigger: {
            trigger: li,
            start: "top 65%",
            toggleClass: { targets: li, className: "tl-on" },
          },
        });
      }
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <div ref={scope}>
      <ol className="relative">
        {/* Track + scroll-filled progress line, aligned to dot centres */}
        <span
          aria-hidden
          className="bg-border/40 absolute top-2 bottom-6 left-4 w-px"
        />
        <span
          data-tl-progress
          aria-hidden
          className="bg-verde absolute top-2 bottom-6 left-4 w-px origin-top scale-y-0"
        />
        {STEPS.map(([title, body], i) => (
          <li
            key={title}
            data-tl-step
            className="relative pb-9 pl-14 last:pb-0"
          >
            <span
              aria-hidden
              className="tl-dot border-border/60 bg-background text-muted font-display absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full border text-sm"
            >
              {i + 1}
            </span>
            <h4 className="font-display text-lg">{title}</h4>
            <p className="text-muted mt-1 text-sm leading-relaxed">{body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
