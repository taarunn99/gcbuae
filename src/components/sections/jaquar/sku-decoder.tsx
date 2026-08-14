"use client";

import { useState } from "react";

import { FINISH_CODE_NAMES, FINISH_DISCLAIMER } from "@/config/jaquar-catalogue";
import { cn } from "@/lib/utils";

/**
 * THE JAQUAR HUB'S SIGNATURE ELEMENT - the SKU decoder, now running on
 * the catalogue's own finish-code mechanism (pp40-104): the middle code
 * of every faucet SKU is the finish, so LAG-91011B ordered in Chrome
 * becomes LAG-CHR-91011B. Part one decodes sample codes segment by
 * segment; part two builds an orderable code live from a base SKU and
 * the finish card. Pure state, all text server-renderable.
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
          "Kubix Prime - the collection the piece belongs to (LAG = Laguna, FLR = Florentine, OPP = Opal Prime...)",
      },
      {
        code: "CHR",
        name: "Finish",
        meaning:
          "Chrome. The catalogue's rule: replace this middle code to reorder the same piece in another finish - BLM Black Matt, GBP Gold Bright PVD, ABR Antique Bronze...",
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
        meaning: "Kubix Prime sanitaryware (ARS = Aria, LAS = Laguna, FNS = Fonte)",
      },
      {
        code: "WHT",
        name: "Ceramic",
        meaning:
          "White - printed inline on ceramic SKUs. Others: WHM White Matt, BLM Black Matt, GRM Grey Matt",
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
    label: "Flush valve",
    segments: [
      { code: "FLV", name: "Line", meaning: "Flush Valve - the exposed and concealed flushing range" },
      {
        code: "1075N",
        name: "Model",
        meaning:
          "The valve itself - 32 mm class valves in the i-Flush family work from just 0.8 bar",
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

/** The finish card for the live builder - Laguna's card incl. dual-tones. */
const BUILDER_FINISHES = [
  "CHR",
  "BLM",
  "BCH",
  "GBP",
  "GMP",
  "BGP",
  "ABR",
  "ACR",
  "GRF",
  "SSF",
  "BBC",
  "BGM",
  "GMG",
] as const;

export function SkuDecoder() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [finish, setFinish] = useState<(typeof BUILDER_FINISHES)[number]>("CHR");
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

      {/* Part two - build an orderable code from the finish card */}
      <div className="border-ink/20 mt-10 border-t pt-8">
        <p className="label-gcb text-bronze">Build the orderable code</p>
        <p className="text-ink/70 mt-2 max-w-xl text-sm leading-relaxed">
          Catalogue rule: tables print the base SKU - insert the finish code
          in the middle to order. Base code{" "}
          <span className="text-ink font-mono">LAG-91011B</span> (Laguna
          single lever basin mixer):
        </p>
        <p className="font-display mt-5 text-2xl tracking-wide sm:text-4xl">
          LAG-<span className="bg-bronze text-warm-black rounded-md px-1.5 py-0.5">{finish}</span>-91011B
        </p>
        <p className="text-ink/85 mt-3 text-sm">
          {FINISH_CODE_NAMES[finish]}
          {["BBC", "BGM", "GMG"].includes(finish) && " - dual-tone, Laguna only"}
        </p>
        <ul className="mt-5 flex max-w-2xl flex-wrap gap-2">
          {BUILDER_FINISHES.map((code) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => setFinish(code)}
                className={cn(
                  "chip-gcb rounded-full border px-3.5 py-1.5 font-mono text-xs",
                  code === finish
                    ? "bg-warm-black text-ink border-transparent"
                    : "border-ink/40",
                )}
              >
                {code}
              </button>
            </li>
          ))}
        </ul>
        <p className="text-ink/50 mt-5 max-w-xl text-xs leading-relaxed">
          {FINISH_DISCLAIMER}
        </p>
      </div>

      <p className="text-ink/50 mt-8 text-sm">
        Tap each part of the code. Send us any Jaquar SKU on WhatsApp and we
        quote it against Sharjah stock.
      </p>
    </div>
  );
}
