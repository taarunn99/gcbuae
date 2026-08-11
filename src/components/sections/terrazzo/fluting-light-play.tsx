"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * THE TERRAZZO HUB'S SIGNATURE ELEMENT - fluting exists to play with
 * light, so here the light is yours to move: drag the slider and a
 * raking highlight sweeps across the fluted panel, shadows swinging the
 * opposite way. Pure CSS gradients driven by one input.
 */
export function FlutingLightPlay({ src, alt }: { src: string; alt: string }) {
  const [pos, setPos] = useState(35);

  return (
    <div>
      <div className="border-warm-black relative aspect-[21/9] overflow-hidden rounded-xl border">
        <Image
          src={src}
          alt={alt}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        {/* Sweeping highlight follows the slider */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background: `linear-gradient(100deg, transparent ${Math.max(0, pos - 28)}%, rgba(247,248,245,0.95) ${pos}%, transparent ${Math.min(100, pos + 28)}%)`,
          }}
        />
        {/* Opposing shadow keeps the relief believable */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background: `linear-gradient(100deg, rgba(12,21,16,0.35) ${Math.max(0, pos - 55)}%, transparent ${pos}%, rgba(12,21,16,0.35) ${Math.min(100, pos + 55)}%)`,
          }}
        />
      </div>

      <label className="mt-5 flex items-center gap-4">
        <span className="label-gcb text-muted shrink-0">
          Drag the light across the flutes
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="accent-accent w-full"
          aria-label="Light angle across the fluted panel"
        />
      </label>
    </div>
  );
}
