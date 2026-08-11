"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * THE JAQUAR HUB'S SIGNATURE ELEMENT - the SKU decoder. Every Jaquar
 * code carries its own spec sheet (KUP-CHR-35119PM = Kubix Prime,
 * Chrome, model). Pick a sample code, tap each segment, and it explains
 * itself - the tool a buyer actually needs when reading a Jaquar BOQ or
 * price list. Pure state, all text server-rendered.
 */

type Sample = {
  label: string;
  segments: { code: string; name: string; meaning: string }[];
};

const SAMPLES: Sample[] = [
  {
    label: "Faucet",
    segments: [
      {
        code: "KUP",
        name: "Range",
        meaning:
          "Kubix Prime - the collection the piece belongs to (ARI = Aria, FUS = Fusion...)",
      },
      {
        code: "CHR",
        name: "Finish",
        meaning:
          "Chrome. Other codes: BGP Gold Bright PVD, BLM Black Matt, GRF Graphite...",
      },
      {
        code: "35119PM",
        name: "Model",
        meaning:
          "The piece itself - here a Single Lever Bath & Shower Mixer, Prime series",
      },
    ],
  },
  {
    label: "Sanitaryware",
    segments: [
      {
        code: "KUS",
        name: "Range",
        meaning: "Kubix Prime sanitaryware (ITS = Bidspa electronic WC range)",
      },
      {
        code: "WHT",
        name: "Ceramic",
        meaning: "White. Others: BLM Black Matt, GRM Grey Matt, BEM Beige Matt",
      },
      {
        code: "35953BIUFSMPM",
        name: "Model",
        meaning:
          "Rimless Blind Installation Wall Hung WC with UF soft-close seat",
      },
    ],
  },
  {
    label: "Whirlpool",
    segments: [
      { code: "JWP", name: "Line", meaning: "Jaquar Whirlpool" },
      { code: "WHT", name: "Shell", meaning: "White PMMA acrylic" },
      {
        code: "ARC190CX",
        name: "Model",
        meaning:
          "Arc range, 190 cm, Combi system (CX = water + air, WX = water only)",
      },
    ],
  },
];

export function SkuDecoder() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [segmentIndex, setSegmentIndex] = useState(0);
  const sample = SAMPLES[sampleIndex];
  const segment = sample.segments[segmentIndex];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {SAMPLES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => {
              setSampleIndex(i);
              setSegmentIndex(0);
            }}
            className={cn(
              "chip-gcb rounded-full border px-4 py-2 text-sm",
              i === sampleIndex
                ? "bg-warm-black text-ink border-transparent"
                : "border-ink/40",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* The code, segment by segment */}
      <p className="font-display mt-8 flex flex-wrap items-baseline gap-2 text-3xl tracking-wide sm:text-5xl">
        {sample.segments.map((seg, i) => (
          <button
            key={seg.code}
            type="button"
            onClick={() => setSegmentIndex(i)}
            className={cn(
              "rounded-lg px-2 py-1 transition-colors duration-300",
              i === segmentIndex
                ? "bg-bronze text-warm-black"
                : "text-ink/60 hover:text-ink",
            )}
          >
            {seg.code}
            {i < sample.segments.length - 1 && (
              <span aria-hidden className="text-ink/30 ml-2 select-none">
                -
              </span>
            )}
          </button>
        ))}
      </p>

      <div className="border-ink/20 mt-6 max-w-xl border-t pt-5">
        <p className="label-gcb text-bronze">{segment.name}</p>
        <p className="text-ink/85 mt-2 leading-relaxed">{segment.meaning}</p>
      </div>
      <p className="text-ink/50 mt-6 text-sm">
        Tap each part of the code. Send us any Jaquar SKU on WhatsApp and we
        quote it against Sharjah stock.
      </p>
    </div>
  );
}
