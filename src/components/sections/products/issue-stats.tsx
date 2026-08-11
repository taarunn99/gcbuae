"use client";

import NumberFlow from "@number-flow/react";
import { useInView } from "motion/react";
import { useRef } from "react";

/**
 * The issue's numbers, ticking up on entry — phi-cubed numerals on the
 * dark stage. Real values live in sr-only spans so crawlers never
 * depend on the animation.
 */

const STATS: { value: number; suffix?: string; label: string }[] = [
  { value: 128, label: "shades across three stone catalogues" },
  { value: 3, label: "KalingaStone materials, each with its own hub" },
  { value: 66, label: "export countries behind the brand" },
  { value: 1, label: "Sharjah warehouse serving every emirate" },
];

export function IssueStats() {
  const ref = useRef<HTMLDListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <dl ref={ref} className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="border-ink/15 border-t pt-5">
          <dd className="font-display text-ink text-phi-3">
            <span className="sr-only">
              {s.value}
              {s.suffix ?? ""}
            </span>
            <NumberFlow
              aria-hidden
              value={inView ? s.value : 0}
              transformTiming={{ duration: 1100, easing: "ease-out" }}
            />
            {s.suffix}
          </dd>
          <dt className="text-ink/70 mt-3 text-sm leading-relaxed">
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
