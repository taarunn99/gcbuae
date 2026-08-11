"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { quartzShades } from "@/config/kalingastone-quartz";

/**
 * THE QUARTZ HUB'S SIGNATURE ELEMENT - compare any two of the 69 shades
 * on one slab: pick a shade per side, drag the Pastel Green divider.
 * The shortlist conversation every specifier has, as an instrument.
 */
export function QuartzShadeCompare() {
  const [left, setLeft] = useState("calacatta-lazza");
  const [right, setRight] = useState("wizzard");
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(
      Math.min(92, Math.max(8, ((clientX - rect.left) / rect.width) * 100)),
    );
  };

  const pickers = (
    value: string,
    onChange: (v: string) => void,
    label: string,
  ) => (
    <label className="flex min-w-0 items-center gap-2">
      <span className="label-gcb text-muted shrink-0">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="chip-gcb border-border/50 text-foreground min-w-0 rounded-full border bg-transparent px-3.5 py-2 text-sm"
      >
        {quartzShades.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.name} - S{s.series}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {pickers(left, setLeft, "Left")}
        {pickers(right, setRight, "Right")}
      </div>

      <div
        ref={frameRef}
        className="border-warm-black relative mt-6 aspect-[2/1] touch-pan-y overflow-hidden rounded-xl border select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) moveTo(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerLeave={() => {
          dragging.current = false;
        }}
      >
        {/* Right shade fills the frame */}
        <Image
          src={`/kalingastone/quartz/swatches/${right}.webp`}
          alt={`KalingaStone Quartz ${quartzShades.find((s) => s.slug === right)?.name ?? right} swatch`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        {/* Left shade clipped at the divider */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={`/kalingastone/quartz/swatches/${left}.webp`}
            alt={`KalingaStone Quartz ${quartzShades.find((s) => s.slug === left)?.name ?? left} swatch`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Divider */}
        <div
          aria-hidden
          className="absolute inset-y-0 z-10"
          style={{ left: `${pos}%` }}
        >
          <span className="bg-bronze absolute inset-y-0 -left-px block w-0.5" />
          <span className="border-bronze bg-warm-black text-ink absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-xs font-medium shadow-lg">
            ⇔
          </span>
        </div>
      </div>

      {/* Range input keeps it keyboard- and screen-reader-operable */}
      <label className="mt-4 block">
        <span className="sr-only">Comparison divider position</span>
        <input
          type="range"
          min={8}
          max={92}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="accent-accent w-full"
        />
      </label>
    </div>
  );
}
