"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetism + cursor-tracking shine for every `[data-shine]` element inside
 * a container — ONE window listener and ONE rAF loop per group, no WebGL.
 * The shine itself is pure CSS (`[data-shine]::after` in globals.css) driven
 * by the --sx/--sy/--so custom properties set here; a :hover fallback keeps
 * a centred glow even if JS never runs. Pointer-fine only; inert under
 * prefers-reduced-motion.
 */
export function useMagneticShineGroup<T extends HTMLElement>(
  strength = 0.3,
  range = 60,
) {
  const groupRef = useRef<T>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(
      group.querySelectorAll<HTMLElement>("[data-shine]"),
    );
    if (items.length === 0) return;

    const state = items.map(() => ({
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      glow: 0,
      ang: 140,
      tang: 140,
    }));
    let raf = 0;
    let running = false;

    const tick = () => {
      let alive = false;
      items.forEach((el, i) => {
        const s = state[i];
        s.x += (s.tx - s.x) * 0.18;
        s.y += (s.ty - s.y) * 0.18;
        // Shortest-path angle chase so the rim light swings, never snaps.
        const diff = ((s.tang - s.ang + 540) % 360) - 180;
        s.ang += diff * 0.18;
        if (
          Math.abs(s.tx - s.x) > 0.05 ||
          Math.abs(s.ty - s.y) > 0.05 ||
          Math.abs(diff) > 0.5 ||
          s.tx !== 0 ||
          s.ty !== 0
        ) {
          alive = true;
          el.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`;
        } else {
          el.style.transform = "";
        }
        el.style.setProperty("--so", s.glow.toFixed(3));
        el.style.setProperty("--ang", `${s.ang.toFixed(1)}deg`);
      });
      if (alive) raf = requestAnimationFrame(tick);
      else running = false;
    };

    const onMove = (event: PointerEvent) => {
      items.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const distance = Math.hypot(dx, dy);
        const reach = Math.max(rect.width, rect.height) / 2 + range;
        const s = state[i];
        if (distance < reach) {
          const pull = 1 - distance / reach;
          s.tx = dx * strength * pull;
          s.ty = dy * strength * pull;
          s.glow = pull;
          // CSS conic angle: 0deg is 12 o'clock, clockwise.
          s.tang = (Math.atan2(dx, -dy) * 180) / Math.PI;
        } else {
          s.tx = 0;
          s.ty = 0;
          s.glow = 0;
        }
      });
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      items.forEach((el) => {
        el.style.transform = "";
      });
    };
  }, [strength, range]);

  return groupRef;
}
