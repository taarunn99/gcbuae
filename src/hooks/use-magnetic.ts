"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic pull: the element leans toward the cursor inside a proximity
 * field and springs back on leave. Pointer-fine only (no effect on touch),
 * and inert under prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.3, range = 90) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let running = false;

    const tick = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      el.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05 ||
        targetX !== 0 ||
        targetY !== 0
      ) {
        raf = requestAnimationFrame(tick);
      } else {
        el.style.transform = "";
        running = false;
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);
      const reach = Math.max(rect.width, rect.height) / 2 + range;

      if (distance < reach) {
        const pull = 1 - distance / reach;
        targetX = dx * strength * pull;
        targetY = dy * strength * pull;
      } else {
        targetX = 0;
        targetY = 0;
      }
      start();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength, range]);

  return ref;
}
