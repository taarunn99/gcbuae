"use client";

import NumberFlow from "@number-flow/react";
import Image from "next/image";
import { useInView } from "motion/react";
import { useRef } from "react";

import { marbleSeries, marbleShades } from "@/config/kalingastone-marble";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Six series tiers (5A and 5B kept distinct, as the catalogue insists)
 * as fanned real swatches with counts that tick up in view. Counts are
 * server-rendered in sr-only spans.
 */

const MAX_THUMBS = 9;

export function MarbleLadder() {
  const scope = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(scope, { once: true, margin: "-15% 0px" });
  const started = reduced || inView;

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-thumb]", {
        x: -14,
        opacity: 0,
        duration: 0.7,
        stagger: 0.02,
        scrollTrigger: { trigger: scope.current, start: "top 80%", once: true },
      });
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <ul ref={scope} className="max-w-3xl space-y-5">
      {marbleSeries.map((t) => {
        const members = marbleShades.filter((s) => s.series === t.series);
        const shown = members.slice(0, MAX_THUMBS);
        const overflow = members.length - shown.length;
        return (
          <li key={t.series} className="flex items-center gap-4 sm:gap-6">
            <span className="font-display text-foreground w-10 shrink-0 text-center text-xl leading-none sm:w-14 sm:text-2xl">
              {t.series}
            </span>

            <span className="flex min-w-0 flex-1 items-center">
              {shown.map((s, i) => (
                <span
                  key={s.slug}
                  data-thumb
                  className="border-background relative -ml-2.5 block h-9 w-14 shrink-0 overflow-hidden rounded-md border-2 shadow-sm first:ml-0 sm:h-11 sm:w-16"
                  style={{ zIndex: shown.length - i }}
                >
                  <Image
                    src={`/kalingastone/marble/swatches/${s.slug}.webp`}
                    alt={`${s.name} - Series-${s.series}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                    loading="lazy"
                  />
                </span>
              ))}
              {overflow > 0 && (
                <span className="border-border/50 text-muted -ml-2.5 flex h-9 w-14 shrink-0 items-center justify-center rounded-md border border-dashed text-xs sm:h-11 sm:w-16">
                  +{overflow}
                </span>
              )}
            </span>

            {t.note && (
              <span className="label-gcb text-bronze mr-1 hidden shrink-0 md:block">
                {t.note}
              </span>
            )}
            <span className="font-display text-foreground w-10 shrink-0 text-right text-2xl sm:text-3xl">
              <span className="sr-only">{members.length} shades</span>
              <NumberFlow
                aria-hidden
                value={started ? members.length : 0}
                transformTiming={{ duration: 900, easing: "ease-out" }}
              />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
