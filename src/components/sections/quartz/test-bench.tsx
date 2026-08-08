"use client";

import NumberFlow, { type Format } from "@number-flow/react";
import { useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * The four headline tests as a PINNED scroll sequence (desktop): the
 * section holds in the viewport while scroll drives the cards up/down on
 * the right — the left instrument stays put, its value rolling and its
 * line-drawn diagram redrawing at every switch. On mobile (and under
 * reduced motion) the cards simply stack. Every value and sentence is
 * server-rendered text in the DOM regardless of state.
 */

type Test = {
  id: string;
  /** Big animated number; null = letter grade rendered statically. */
  value: number | null;
  format?: Format;
  prefix?: string;
  suffix?: string;
  /** Static display when value is null. */
  grade?: string;
  label: string;
  standard: string;
  body: string;
  diagram: React.ReactNode;
};

const TESTS: Test[] = [
  {
    id: "water",
    value: 0.05,
    format: { minimumFractionDigits: 2 },
    prefix: "< ",
    suffix: "%",
    label: "Water absorption",
    standard: "ASTM C 97",
    body: "Lower than natural granite. Water, oil, coffee and pigment sit on the surface instead of soaking in — which is why a KalingaStone slab is never sealed, not once, not annually.",
    diagram: (
      <>
        <path
          pathLength={1}
          d="M32 10c7 9 12 15 12 22a12 12 0 1 1-24 0c0-7 5-13 12-22Z"
        />
        <path pathLength={1} d="M6 52h52" />
        <path pathLength={1} d="M20 46c2-2 5-2 7 0M37 46c2-2 5-2 7 0" />
      </>
    ),
  },
  {
    id: "hardness",
    value: 7,
    format: { minimumFractionDigits: 1 },
    prefix: "6.0–",
    label: "Mohs hardness",
    standard: "EN 101",
    body: "A steel knife blade sits near 5.5 on the Mohs scale — the slab is harder than what the kitchen throws at it. Scratches stay on the tools, not the counter.",
    diagram: (
      <>
        <path pathLength={1} d="M10 44h44" />
        <path pathLength={1} d="M40 12 22 40" />
        <path pathLength={1} d="M22 40l-3 6 6-3Z" />
        <path pathLength={1} d="M14 52c3-3 8-3 11 0M33 52c3-3 8-3 11 0" />
      </>
    ),
  },
  {
    id: "strength",
    value: 250,
    prefix: "150–",
    suffix: " MPa",
    label: "Compressive strength",
    standard: "ASTM C 170",
    body: "Structural concrete works at roughly 30–40 MPa. The slab bears several times that before distress — worktops, floors and treads carry loads without complaint.",
    diagram: (
      <>
        <path pathLength={1} d="M12 40h40v10H12Z" />
        <path pathLength={1} d="M22 12v18M22 30l-4-5M22 30l4-5" />
        <path pathLength={1} d="M42 12v18M42 30l-4-5M42 30l4-5" />
      </>
    ),
  },
  {
    id: "fire",
    value: null,
    grade: "A",
    prefix: "Class ",
    label: "Surface burning",
    standard: "ASTM E 84",
    body: "The best classification the test issues. Specify it behind hobs, in lift lobbies and along escape-route cladding without a materials argument.",
    diagram: (
      <>
        <path pathLength={1} d="M12 50h40" />
        <path
          pathLength={1}
          d="M32 14c4 5 8 9 8 14a8 8 0 1 1-16 0c0-5 4-9 8-14Z"
        />
        <path pathLength={1} d="M24 42h16" />
      </>
    ),
  },
];

export function TestBench() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        // Scroll progress through the tall wrapper selects the card; the
        // inner block is CSS-sticky, so the instrument holds in place
        // while the cards exchange.
        gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              const idx = Math.min(
                TESTS.length - 1,
                Math.floor(self.progress * TESTS.length),
              );
              if (activeRef.current !== idx) {
                activeRef.current = idx;
                setActive(idx);
              }
            },
          },
        });
      });
    },
    { scope: wrapRef, dependencies: [reduced] },
  );

  const current = TESTS[active];

  return (
    <div ref={wrapRef} className={cn(!reduced && "lg:h-[300vh]")}>
      <div
        className={cn(
          !reduced && "lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center",
        )}
      >
        <div className="grid w-full gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* The instrument — stays put while the cards exchange */}
          <div className="hidden lg:block">
            <svg
              key={current.id}
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-bronze quartz-diagram h-24 w-24"
              aria-hidden
            >
              {current.diagram}
            </svg>
            <p
              aria-hidden
              className="font-display text-ink mt-8 text-6xl xl:text-7xl"
            >
              {current.prefix}
              {current.value !== null ? (
                <NumberFlow
                  value={current.value}
                  format={current.format}
                  transformTiming={{ duration: 700, easing: "ease-out" }}
                />
              ) : (
                current.grade
              )}
              {current.suffix}
            </p>
            <p className="label-gcb text-bronze mt-4">{current.label}</p>
            <p className="text-ink/50 mt-1 text-sm">{current.standard}</p>

            <div className="mt-10 flex gap-2">
              {TESTS.map((t, i) => (
                <span
                  key={t.id}
                  className={cn(
                    "h-px w-10 transition-colors duration-500",
                    i === active ? "bg-bronze" : "bg-ink/20",
                  )}
                />
              ))}
            </div>
          </div>

          {/* The cards — scroll slides them through the frame on desktop,
              plain stack on mobile. All four stay in the DOM. */}
          <div
            className={cn(
              "space-y-6",
              !reduced && "lg:relative lg:h-[340px] lg:space-y-0",
            )}
          >
            {TESTS.map((t, i) => (
              <div
                key={t.id}
                className={cn(
                  "border-ink/15 rounded-xl border p-7 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] sm:p-9",
                  !reduced && [
                    "lg:absolute lg:inset-x-0 lg:top-1/2",
                    i === active &&
                      "lg:border-ink/30 lg:bg-ink/5 lg:-translate-y-1/2 lg:opacity-100",
                    i < active &&
                      "lg:pointer-events-none lg:-translate-y-[80%] lg:opacity-0",
                    i > active &&
                      "lg:pointer-events-none lg:-translate-y-[20%] lg:opacity-0",
                  ],
                )}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{t.label}</h3>
                  <span className="text-ink/50 shrink-0 text-xs">
                    {t.standard}
                  </span>
                </div>
                <p
                  className={cn(
                    "font-display text-bronze mt-3 text-3xl",
                    !reduced && "lg:hidden",
                  )}
                >
                  {t.prefix}
                  {t.value !== null
                    ? t.format?.minimumFractionDigits
                      ? t.value.toFixed(t.format.minimumFractionDigits)
                      : t.value
                    : t.grade}
                  {t.suffix}
                </p>
                <p className="text-ink/70 mt-4 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
