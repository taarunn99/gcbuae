"use client";

import type React from "react";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE, DURATION } from "@/lib/motion";

/**
 * LocationMap - the expanding map card (adapted 2026-08-17 from an
 * owner-supplied reference component). Collapsed it is a small card with
 * the location name; a click springs it open into a stylised street map
 * with a pin. Cursor tilt on fine pointers.
 *
 * House adaptations: imports from "motion/react" (the repo's Motion, NOT
 * framer-motion - same API, no new runtime); every colour maps onto the
 * five-token palette (the reference's emerald accent becomes Pastel
 * Green, its muted greys become Dust Grey/Onyx alphas); keyboard
 * operable (button semantics, Enter/Space); reduced motion drops the
 * tilt and the springs. The parent must reserve the EXPANDED footprint
 * (360x280) so the spring never shifts surrounding layout.
 */

interface LocationMapProps {
  location?: string;
  coordinates?: string;
  className?: string;
}

/** Pastel Green (the --bronze token) at the alphas the reference used for
 *  emerald. The rgba pairs are the same palette colour with alpha - CSS
 *  filters cannot compose a var() into rgba(). */
const ACCENT = "var(--bronze)";
const ACCENT_GLOW_SOFT = "drop-shadow(0 0 4px rgba(111, 143, 120, 0.35))";
const ACCENT_GLOW = "drop-shadow(0 0 8px rgba(111, 143, 120, 0.6))";

export function LocationMap({
  location = "Dubai, United Arab Emirates",
  coordinates = "25.2048° N, 55.2708° E",
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-50, 50], [8, -8]);
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8]);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || reduced) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const expandTransition = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 400, damping: 35 };

  return (
    <motion.div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`Map card for ${location} - activate to ${isExpanded ? "collapse" : "expand"}`}
      className={`relative cursor-pointer select-none ${className ?? ""}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsExpanded((v) => !v);
        }
      }}
    >
      <motion.div
        className="border-warm-black bg-background relative overflow-hidden rounded-2xl border"
        style={
          reduced
            ? undefined
            : {
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
              }
        }
        animate={{
          width: isExpanded ? 360 : 240,
          height: isExpanded ? 280 : 140,
        }}
        transition={expandTransition}
      >
        {/* Subtle gradient overlay */}
        <div className="from-surface/20 to-surface/40 absolute inset-0 bg-gradient-to-br via-transparent" />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast, delay: 0.1 }}
            >
              <div className="bg-surface absolute inset-0" />

              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                {/* Main roads */}
                {[35, 65].map((y, i) => (
                  <motion.line
                    key={`main-h-${y}`}
                    x1="0%"
                    y1={`${y}%`}
                    x2="100%"
                    y2={`${y}%`}
                    className="stroke-foreground/25"
                    strokeWidth="4"
                    pathLength={1}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  />
                ))}
                {[30, 70].map((x, i) => (
                  <motion.line
                    key={`main-v-${x}`}
                    x1={`${x}%`}
                    y1="0%"
                    x2={`${x}%`}
                    y2="100%"
                    className="stroke-foreground/20"
                    strokeWidth="3"
                    pathLength={1}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  />
                ))}
                {/* Secondary streets */}
                {[20, 50, 80].map((y, i) => (
                  <motion.line
                    key={`h-${y}`}
                    x1="0%"
                    y1={`${y}%`}
                    x2="100%"
                    y2={`${y}%`}
                    className="stroke-foreground/10"
                    strokeWidth="1.5"
                    pathLength={1}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  />
                ))}
                {[15, 45, 55, 85].map((x, i) => (
                  <motion.line
                    key={`v-${x}`}
                    x1={`${x}%`}
                    y1="0%"
                    x2={`${x}%`}
                    y2="100%"
                    className="stroke-foreground/10"
                    strokeWidth="1.5"
                    pathLength={1}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  />
                ))}
              </svg>

              {/* Blocks */}
              {[
                "top-[40%] left-[10%] w-[15%] h-[20%]",
                "top-[15%] left-[35%] w-[12%] h-[15%]",
                "top-[70%] left-[75%] w-[18%] h-[18%]",
                "top-[20%] right-[10%] w-[10%] h-[25%]",
                "top-[55%] left-[5%] w-[8%] h-[12%]",
                "top-[8%] left-[75%] w-[14%] h-[10%]",
              ].map((pos, i) => (
                <motion.div
                  key={pos}
                  className={`absolute ${pos} bg-foreground/20 border-foreground/10 rounded-sm border`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                />
              ))}

              {/* The pin - Pastel Green, the house accent */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                        delay: 0.3,
                      }
                }
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ filter: ACCENT_GLOW }}
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    fill={ACCENT}
                  />
                  <circle cx="12" cy="9" r="2.5" className="fill-background" />
                </svg>
              </motion.div>

              <div className="from-background absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid pattern - only show when collapsed */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          animate={{ opacity: isExpanded ? 0 : 0.03 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern
                id="gcb-map-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  className="stroke-foreground"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gcb-map-grid)" />
          </svg>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <motion.div
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={ACCENT}
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  filter: isHovered ? ACCENT_GLOW : ACCENT_GLOW_SOFT,
                }}
                transition={{ duration: 0.3 }}
              >
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" x2="9" y1="3" y2="18" />
                <line x1="15" x2="15" y1="6" y2="21" />
              </motion.svg>
            </motion.div>

            {/* Status chip */}
            <motion.div
              className="bg-foreground/5 flex items-center gap-1.5 rounded-full px-2 py-1 backdrop-blur-sm"
              animate={{
                scale: isHovered && !reduced ? 1.05 : 1,
                backgroundColor: isHovered
                  ? "rgba(12, 21, 16, 0.08)"
                  : "rgba(12, 21, 16, 0.05)",
              }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span className="text-warm-black/60 text-[10px] font-medium tracking-wide uppercase">
                Showroom
              </span>
            </motion.div>
          </div>

          <div className="space-y-1">
            <motion.h3
              className="text-foreground text-sm font-medium tracking-tight"
              animate={{ x: isHovered && !reduced ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  className="text-warm-black/60 font-mono text-xs"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Animated underline - Pastel Green fade */}
            <motion.div
              className="from-bronze via-bronze/40 h-px bg-gradient-to-r to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }}
              transition={{ duration: DURATION.fast, ease: EASE.out }}
            />
          </div>
        </div>
      </motion.div>

      {/* Click hint */}
      <motion.p
        className="text-warm-black/60 absolute -bottom-6 left-1/2 text-[10px] whitespace-nowrap"
        style={{ x: "-50%" }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered && !isExpanded ? 1 : 0,
          y: isHovered ? 0 : 4,
        }}
        transition={{ duration: 0.2 }}
      >
        Click to expand
      </motion.p>
    </motion.div>
  );
}
