"use client";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Page-wide motion for the FILA hub: yellow underline bars draw on
 * enter, hero parallax at 0.85 speed, masonry cards stagger in, yellow
 * blocks clip-wipe. Declarative via data attributes so server pages
 * stay server pages:
 *   data-fila-bar      - scaleX 0 -> 1 on enter
 *   data-fila-parallax - background image drifts slower than scroll
 *   data-fila-card     - fade/rise stagger within the nearest section
 *   data-fila-wipe     - clip-path wipe reveal
 * Respects prefers-reduced-motion (bars ship visible via CSS).
 */
export function FilaMotion() {
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      for (const bar of gsap.utils.toArray<HTMLElement>("[data-fila-bar]")) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: bar, start: "top 88%" },
          },
        );
      }

      for (const hero of gsap.utils.toArray<HTMLElement>(
        "[data-fila-parallax]",
      )) {
        gsap.to(hero, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: hero.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: 0.85,
          },
        });
      }

      for (const wipe of gsap.utils.toArray<HTMLElement>("[data-fila-wipe]")) {
        gsap.fromTo(
          wipe,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.8,
            ease: "power3.inOut",
            scrollTrigger: { trigger: wipe, start: "top 85%" },
          },
        );
      }

      const groups = new Map<Element, HTMLElement[]>();
      for (const card of gsap.utils.toArray<HTMLElement>("[data-fila-card]")) {
        const section = card.closest("section") ?? document.body;
        const list = groups.get(section) ?? [];
        list.push(card);
        groups.set(section, list);
      }
      for (const [, cards] of groups) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: { trigger: cards[0], start: "top 90%" },
          },
        );
      }
    },
    { dependencies: [reduced] },
  );

  return null;
}
