"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";

/**
 * The 25-property marble test table as five themed certificates -
 * horizontal snap scroll with drag/wheel/swipe. The classic table stays
 * below in <details>; both carry the same server-rendered data.
 */

type Cluster = {
  title: string;
  rows: [property: string, standard: string, result: string][];
};

const CLUSTERS: Cluster[] = [
  {
    title: "Density & water",
    rows: [
      ["Apparent density", "ASTM C 97", "2.40-2.55 kg/dm³"],
      ["Apparent density", "EN14617-1", "2.40-2.55 kg/dm³"],
      ["Water absorption", "ASTM C 97", "< 0.1%"],
      ["Water absorption", "EN14617-1", "< 0.1%"],
    ],
  },
  {
    title: "Strength & wear",
    rows: [
      ["Compressive strength", "ASTM C 170", "105-160 MPa"],
      ["Compressive strength", "EN14617-15", "110-150 MPa"],
      ["Flexural strength", "ASTM C 880", "20-40 MPa"],
      ["Flexural strength", "EN14617-2", "25-35 MPa"],
      ["Impact resistance", "EN14617-9", "1.5-3.5 J"],
      ["Surface hardness", "EN 101 (Mohs)", "4.0-5.0"],
      ["Abrasion resistance", "EN14617-4", "Groove 30-40 mm"],
      ["Abrasion resistance", "ASTM C 241", "Min 10"],
    ],
  },
  {
    title: "Heat, frost & fire",
    rows: [
      ["Fire classification", "EN 13501-1", "Wall B-S1-d0 · Floor B-fl-S1"],
      ["Surface burning", "ASTM E 84", "Class A"],
      ["Thermal shock", "EN14617-6", "No defects, 20 cycles"],
      ["Freeze-thaw", "EN14617-5", "No defect, 25 cycles"],
      ["Linear thermal expansion", "EN14617-11", "15-20 × 10⁻⁶ /°C"],
      ["Frost resistance", "DIN 52104", "Complies"],
    ],
  },
  {
    title: "Slip & chemical safety",
    rows: [
      ["Slip resistance", "EN 14231", "Wet > 3 · Dry > 35 SRV"],
      ["Slip resistance, Honed 400", "DIN 51130", "R9"],
      ["Friction coefficient", "ASTM C 1028", "Dry 0.8 · Wet 0.6"],
      ["Chemical resistance", "EN14617-10", "Class C1"],
      ["Radiation", "GB 6566-2010", "Complies"],
    ],
  },
  {
    title: "Stability & optics",
    rows: [
      ["Dimensional stability", "EN14617-12", "Class A"],
      ["Glossiness reflection", "-", "> 85%"],
    ],
  },
];

export function MarbleCertificates() {
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
      <div ref={emblaRef} className="overflow-hidden max-lg:[mask-image:linear-gradient(to_right,transparent,black_3%,black_94%,transparent)]">
        <div className="flex touch-pan-y gap-5">
          {CLUSTERS.map((c, index) => (
            <article
              key={c.title}
              className="border-ink/20 relative w-[85vw] shrink-0 rounded-xl border p-7 sm:w-[380px]"
            >
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
              <span
                aria-hidden
                className="border-bronze/50 text-bronze/60 absolute right-5 bottom-5 rotate-[-8deg] rounded-md border px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.2em] uppercase"
              >
                Tested
              </span>
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
