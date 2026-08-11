"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * THE MARBLE HUB'S SIGNATURE ELEMENT - the specifier's loupe. Move the
 * pointer (or drag a finger) across the vein panel and a circular loupe
 * magnifies the stone beneath it, ringed in Pastel Green. Marble is
 * bought by reading its veining up close; this is that gesture, on the
 * page. Pure CSS background math - no extra requests, no canvas.
 */
export function MarbleLoupe({
  src,
  alt,
  zoom = 2.2,
}: {
  src: string;
  alt: string;
  zoom?: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const loupeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const move = (clientX: number, clientY: number) => {
    const frame = frameRef.current;
    const loupe = loupeRef.current;
    if (!frame || !loupe) return;
    const rect = frame.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
    loupe.style.left = `${x}px`;
    loupe.style.top = `${y}px`;
    loupe.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
    loupe.style.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
  };

  return (
    <div
      ref={frameRef}
      className="group relative aspect-[2/1] cursor-none touch-pan-y overflow-hidden rounded-xl sm:aspect-[21/9]"
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onPointerMove={(e) => move(e.clientX, e.clientY)}
    >
      {/* The slab - plain img via CSS background keeps the loupe math exact */}
      <div
        aria-label={alt}
        role="img"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
      />

      {/* The loupe */}
      <div
        ref={loupeRef}
        aria-hidden
        className={cn(
          "border-bronze pointer-events-none absolute z-10 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-xl transition-opacity duration-300 sm:size-44",
          active ? "opacity-100" : "opacity-0",
        )}
        style={{
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
        }}
      />

      <span className="label-gcb text-ink pointer-events-none absolute bottom-4 left-5 rounded-full bg-black/35 px-3.5 py-1.5 backdrop-blur-sm">
        Move to inspect the vein
      </span>
    </div>
  );
}
