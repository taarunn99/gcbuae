"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * WorldMap - the dotted global-presence map (adapted 2026-08-17 from an
 * owner-supplied reference component). House adaptations: the dotted
 * base is NOT computed in the browser - dotted-map is a dev dependency
 * that scripts/build-world-map.mjs runs once, emitting a static WebP
 * (the raw SVG is ~590KB; the raster is 123KB and cacheable) plus
 * grid-snapped marker coordinates, so this island ships only the
 * overlay. framer-motion becomes motion/react, next-themes is dropped
 * (single light theme), and every colour is a palette token: Pine dot
 * grid on Porcelain, Pastel Green markers, Onyx for the hub and plant,
 * Pine arcs. Reduced motion renders the arcs as static strokes and
 * skips the pulses.
 */

export type WorldMapMarker = {
  label: string;
  x: number;
  y: number;
  role?: "hub" | "plant";
};

export type WorldMapArc = {
  from: WorldMapMarker;
  to: WorldMapMarker;
};

interface WorldMapProps {
  markers: WorldMapMarker[];
  arcs?: WorldMapArc[];
  viewBox: { width: number; height: number };
  className?: string;
}

function arcPath(from: WorldMapMarker, to: WorldMapMarker): string {
  const midX = (from.x + to.x) / 2;
  const midY = Math.max(3, Math.min(from.y, to.y) - 13);
  return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
}

export function WorldMap({ markers, arcs = [], viewBox, className }: WorldMapProps) {
  const [hovered, setHovered] = useState<WorldMapMarker | null>(null);
  const reduced = useReducedMotion();

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: `${viewBox.width} / ${viewBox.height}` }}
    >
      <Image
        src="/home/world-map.webp"
        alt="Dotted world map of KalingaStone project locations"
        fill
        sizes="(min-width: 90rem) 1344px, 100vw"
        className="pointer-events-none object-cover select-none"
        loading="lazy"
      />

      <svg
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        className="absolute inset-0 h-full w-full select-none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Supply arcs - Pine, drawn on loop; static strokes when reduced */}
        {arcs.map((arc, i) =>
          reduced ? (
            <path
              key={`arc-${i}`}
              d={arcPath(arc.from, arc.to)}
              fill="none"
              stroke="var(--verde)"
              strokeWidth="0.3"
              strokeOpacity="0.45"
            />
          ) : (
            <motion.path
              key={`arc-${i}`}
              d={arcPath(arc.from, arc.to)}
              fill="none"
              stroke="var(--verde)"
              strokeWidth="0.3"
              strokeOpacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 0, 1, 1, 0] }}
              transition={{
                duration: 12,
                times: [0, i * 0.06, i * 0.06 + 0.25, 0.85, 1],
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          ),
        )}

        {/* Markers - Pastel Green dots; Onyx for the hub and the plant */}
        {markers.map((marker) => {
          const anchor = marker.role ? "var(--warm-black)" : "var(--bronze)";
          const r = marker.role ? 1.1 : 0.75;
          return (
            <g key={marker.label}>
              {marker.role && !reduced && (
                <circle cx={marker.x} cy={marker.y} r={r} fill={anchor} opacity="0.5">
                  <animate attributeName="r" from={r} to={r * 4} dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={marker.x}
                cy={marker.y}
                r={r}
                fill={anchor}
                className="transition-transform duration-200 [transform-box:fill-box] [transform-origin:center]"
                style={{
                  transform: hovered?.label === marker.label ? "scale(1.5)" : undefined,
                }}
              />
              {/* generous invisible hit area for hover/tap */}
              <circle
                cx={marker.x}
                cy={marker.y}
                r={2.2}
                fill="transparent"
                className="cursor-pointer"
                onPointerEnter={() => setHovered(marker)}
                onPointerLeave={() => setHovered(null)}
                onClick={() => setHovered(marker)}
              />
            </g>
          );
        })}
      </svg>

      {/* Hover label - HTML so the type never scales with the SVG */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            key={hovered.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="border-warm-black bg-background text-warm-black pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap shadow-sm"
            style={{
              left: `${(hovered.x / viewBox.width) * 100}%`,
              top: `${(hovered.y / viewBox.height) * 100 - 2.5}%`,
            }}
          >
            {hovered.label}
            {hovered.role === "hub" && " · our stock"}
            {hovered.role === "plant" && " · the plant"}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
