"use client";

import Image from "next/image";
import { useId, useState } from "react";

/**
 * Keyboard-accessible before/after reveal for the catalogue scene crops
 * that contain treatment pairs. A range input drives the clip - arrow
 * keys work natively; the printed Italian PRIMA/DOPO in some artwork is
 * overlaid with English ink pills per catalogue flag 8.
 */
export function BeforeAfter({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [position, setPosition] = useState(50);
  const id = useId();

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#0B0B0C]/10">
      <div className="relative aspect-[16/9]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" loading="lazy" />
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={src} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover brightness-[0.55] saturate-50" loading="lazy" />
          <span className="fila-display absolute top-3 left-3 rounded-full bg-[#0B0B0C] px-3 py-1 text-xs text-white">
            Before
          </span>
        </div>
        <span className="fila-display absolute top-3 right-3 rounded-full bg-[#0B0B0C] px-3 py-1 text-xs text-white">
          After
        </span>
        <div
          aria-hidden
          className="absolute inset-y-0 w-[3px] bg-[#FED400]"
          style={{ left: `${position}%` }}
        />
      </div>
      <label htmlFor={id} className="sr-only">
        Reveal the before and after comparison
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
