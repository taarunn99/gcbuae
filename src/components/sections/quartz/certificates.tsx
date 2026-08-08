"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";

/**
 * The 22-property test table regrouped into five themed "certificates" —
 * stamped-card styling, horizontal snap scroll. The classic single table
 * remains available below (inside <details>) for spec-hunters; both carry
 * the same server-rendered data.
 */

type Cluster = {
  title: string;
  rows: [property: string, standard: string, result: string][];
};

const CLUSTERS: Cluster[] = [
  {
    title: "Density & water",
    rows: [
      ["Apparent density", "ASTM C 97 / EN14617-1", "> 2.1 kg/dm³"],
      ["Water absorption", "ASTM C 97 / EN14617-1", "< 0.05%"],
      ["Boiling water / high temp", "NEMA LD3-3.5 / 3.6", "Pass, no effect"],
    ],
  },
  {
    title: "Strength & wear",
    rows: [
      ["Compressive strength", "ASTM C 170 / EN14617-15", "150–250 MPa"],
      ["Flexural strength", "ASTM C 880 / EN14617-2", "40–60 MPa"],
      ["Modulus of rupture", "ASTM C 99", "55–65 MPa"],
      ["Impact resistance", "EN14617-9", "5–14.5 J"],
      ["Surface hardness", "EN 101 (Mohs)", "6.0–7.0"],
      ["Abrasion resistance", "ASTM C 241", "Min 25.0"],
    ],
  },
  {
    title: "Heat, frost & fire",
    rows: [
      ["Fire classification*", "EN 13501-1", "Wall B-s1-d0 · Floor B-fl-S1"],
      ["Thermal shock", "EN14617-6", "No defects, 20 cycles"],
      ["Frost resistance", "DIN 52104", "Complies"],
      ["Freeze–thaw", "ASTM C 1026 / EN14617-5", "No damage, 20–25 cycles"],
      ["Thermal conductivity", "EN 12664", "0.435–0.485 W/(m·K)"],
    ],
  },
  {
    title: "Slip & chemical safety",
    rows: [
      ["Slip resistance", "EN 14231", "Wet 13–21 · Dry 43–53 SRV"],
      ["Slip resistance, honed", "DIN 51130", "R9"],
      ["Friction coefficient", "ASTM C 1028", "Dry 0.8 · Wet 0.6"],
      ["Stain resistance", "ANSI Z 124.6", "Pass"],
      ["Resistance to acids", "ASTM C 650", "Not affected"],
      ["Chemical resistance", "EN14617-10", "Class C4"],
    ],
  },
  {
    title: "Stability & optics",
    rows: [
      ["Dimensional stability", "EN14617-12", "Class A"],
      ["Glossiness reflection", "—", "55–70%"],
    ],
  },
];

export function Certificates() {
  const [emblaRef, embla] = useEmblaCarousel(
    { align: "start", containScroll: "trimSnaps" },
    [WheelGesturesPlugin()],
  );
  const snapshot = useSyncExternalStore(
    useCallback(
      (onChange: () => void) => {
        if (!embla) return () => {};
        embla.on("select", onChange).on("reInit", onChange);
        return () => {
          embla.off("select", onChange).off("reInit", onChange);
        };
      },
      [embla],
    ),
    () =>
      embla
        ? `${embla.canScrollPrev()}|${embla.canScrollNext()}`
        : "false|true",
    () => "false|true",
  );
  const [canPrev, canNext] = snapshot.split("|").map((v) => v === "true") as [
    boolean,
    boolean,
  ];

  return (
    <div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y gap-5">
          {CLUSTERS.map((c, index) => (
            <article
              key={c.title}
              className="border-ink/20 relative w-[85vw] shrink-0 rounded-xl border p-7 sm:w-[380px]"
            >
              {/* certificate rule + index */}
              <div className="border-ink/15 flex items-baseline justify-between border-b pb-4">
                <h3 className="font-display text-xl">{c.title}</h3>
                <span className="text-ink/40 font-mono text-xs">
                  {String(index + 1).padStart(2, "0")} / 05
                </span>
              </div>
              <dl className="mt-5 space-y-4">
                {c.rows.map(([property, standard, result]) => (
                  <div key={property + standard}>
                    <dt className="flex items-baseline justify-between gap-3">
                      <span className="text-ink/85 text-sm">{property}</span>
                      <span className="text-ink/40 shrink-0 text-[0.65rem] tracking-wide">
                        {standard}
                      </span>
                    </dt>
                    <dd className="font-display text-bronze mt-0.5 text-lg leading-tight">
                      {result}
                    </dd>
                  </div>
                ))}
              </dl>
              {/* stamp */}
              <span
                aria-hidden
                className="border-bronze/50 text-bronze/60 absolute right-5 bottom-5 rotate-[-8deg] rounded-md border px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.2em] uppercase"
              >
                Tested
              </span>
              {/* space so the stamp never overlaps the last row */}
              <div className="h-8" />
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          aria-label="Previous certificates"
          onClick={() => embla?.scrollPrev()}
          disabled={!canPrev}
          className="border-ink/25 text-ink hover:border-ink flex size-11 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Next certificates"
          onClick={() => embla?.scrollNext()}
          disabled={!canNext}
          className="border-ink/25 text-ink hover:border-ink flex size-11 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
