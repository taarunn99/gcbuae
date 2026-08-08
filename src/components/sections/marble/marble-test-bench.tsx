"use client";

import NumberFlow, { type Format } from "@number-flow/react";
import { useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Marble's four headline tests as the pinned scroll sequence. Gloss
 * leads — > 85% is the highest of the three KalingaStone ranges and the
 * catalogue's strongest number. Honest framing throughout: marble is
 * the most refined surface of the three, not the toughest.
 */

type Test = {
  id: string;
  value: number | null;
  format?: Format;
  prefix?: string;
  suffix?: string;
  grade?: string;
  label: string;
  standard: string;
  body: string;
  diagram: React.ReactNode;
};

const TESTS: Test[] = [
  {
    id: "gloss",
    value: 85,
    prefix: "> ",
    suffix: "%",
    label: "Glossiness reflection",
    standard: "Reflectance",
    body: "Above 85% — the highest polish of KalingaStone's three ranges (terrazzo exceeds 75%, quartz reaches 55–70%). SIMEC polishing lines with 36 heads produce it; the repolishable surface means it can be brought back, in situ, for the life of the floor.",
    diagram: (
      <>
        <path pathLength={1} d="M8 46h48" />
        <path pathLength={1} d="M18 14l14 32M46 14 32 46" />
        <path pathLength={1} d="M18 14h28" />
      </>
    ),
  },
  {
    id: "water",
    value: 0.1,
    format: { minimumFractionDigits: 1 },
    prefix: "< ",
    suffix: "%",
    label: "Water absorption",
    standard: "ASTM C 97 / EN14617-1",
    body: "Lower absorption than natural granite — the catalogue's own claim — which is what makes the surface immune to everyday stains and suited to vanities and bathrooms.",
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
    id: "strength",
    value: 150,
    prefix: "110–",
    suffix: " MPa",
    label: "Compressive strength",
    standard: "EN14617-15",
    body: "110–150 MPa under compression — floors, staircases and lift lobbies carry their loads. Honest caveat: quartz remains the harder surface (Mohs 6–7 against marble's 4–5); marble answers with gloss and restorability.",
    diagram: (
      <>
        <path pathLength={1} d="M12 40h40v10H12Z" />
        <path pathLength={1} d="M22 12v18M22 30l-4-5M22 30l4-5" />
        <path pathLength={1} d="M42 12v18M42 30l-4-5M42 30l4-5" />
      </>
    ),
  },
  {
    id: "burning",
    value: null,
    grade: "A",
    prefix: "Class ",
    label: "Surface burning",
    standard: "ASTM E 84",
    body: "Class A surface-burning behaviour to the American standard; the European EN 13501-1 classification is B for walls and floors. Where a project mandates the top EN non-combustible class, specify the terrazzo range — it holds A1.",
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

export function MarbleTestBench() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
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

          <div
            className={cn(
              "space-y-6",
              !reduced && "lg:relative lg:h-[360px] lg:space-y-0",
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
