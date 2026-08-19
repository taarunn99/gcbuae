"use client";

import NumberFlow from "@number-flow/react";
import Image from "next/image";
import { useInView } from "motion/react";
import { useRef } from "react";

import { quartzShades } from "@/config/kalingastone-quartz";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * "Shades per series" as product, not as a bar chart: each series row fans
 * out its actual swatches, and the count ticks up (NumberFlow) when the
 * row enters the viewport. The real count is server-rendered in a
 * visually-hidden span so crawlers never depend on the animation.
 */

const TIERS: { series: string; note: string }[] = [
  { series: "7", note: "premium veined" },
  { series: "6", note: "" },
  { series: "5", note: "" },
  { series: "4", note: "" },
  { series: "3", note: "the workhorse tier" },
  { series: "2", note: "" },
  { series: "1 A", note: "" },
  { series: "1", note: "essentials" },
];

const MAX_THUMBS = 9;

function Row({
  series,
  note,
  started,
}: {
  series: string;
  note: string;
  started: boolean;
}) {
  const members = quartzShades.filter((s) => s.series === series);
  const shown = members.slice(0, MAX_THUMBS);
  const overflow = members.length - shown.length;

  return (
    <li className="flex items-center gap-4 sm:gap-6">
      <span className="font-display text-foreground w-10 shrink-0 text-center text-xl leading-none sm:w-14 sm:text-2xl">
        {series}
      </span>

      {/* flex-wrap keeps shrink-0 thumbs from overflowing the page on
          mobile; desktop fits one line (mobile audit, 2026-08-19). */}
      <span className="flex min-w-0 flex-1 flex-wrap items-center gap-y-1">
        {shown.map((s, i) => (
          <span
            key={s.slug}
            data-thumb
            className="border-background relative -ml-2.5 block size-10 shrink-0 overflow-hidden rounded-md border-2 shadow-sm first:ml-0 sm:size-12"
            style={{ zIndex: shown.length - i }}
          >
            <Image
              src={`/kalingastone/quartz/swatches/${s.slug}.webp`}
              alt={`${s.name} - Series ${series}`}
              fill
              sizes="48px"
              className="object-cover"
              loading="lazy"
            />
          </span>
        ))}
        {overflow > 0 && (
          <span className="border-border/50 text-muted -ml-2.5 flex size-10 shrink-0 items-center justify-center rounded-md border border-dashed text-xs sm:size-12">
            +{overflow}
          </span>
        )}
      </span>

      {note && (
        <span className="label-gcb text-bronze mr-1 hidden shrink-0 md:block">
          {note}
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
}

export function SeriesLadder() {
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
        stagger: 0.015,
        scrollTrigger: { trigger: scope.current, start: "top 80%", once: true },
      });
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <ul ref={scope} className="max-w-3xl space-y-4">
      {TIERS.map((t) => (
        <Row key={t.series} {...t} started={started} />
      ))}
    </ul>
  );
}
