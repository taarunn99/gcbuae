"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

import { filmShots } from "@/config/film";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Pinned, scroll-driven film sequence — one continuous experience, not four
 * videos on a page. The wrapper pins for 400vh; each shot owns one 100%-scroll
 * segment: curtain reveal (scrubbed), video plays once (never scrubbed, never
 * reversed), then the material overlay rises and holds.
 *
 * Progressive enhancement: the server renders four static stacked sections
 * with posters and visible overlays — that is the no-JS page, and stays the
 * layout under prefers-reduced-motion. With JS and motion allowed, `enhanced`
 * flips the layers to an absolutely-stacked pinned deck and GSAP takes over.
 * Overlay hidden-states are set by the timeline's fromTo (immediateRender),
 * never by CSS, so nothing is invisible without JS.
 */
const emptySubscribe = () => () => {};

export function FilmSequence() {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // false during SSR/hydration, true after — the server markup stays the
  // static no-JS fallback until the client takes over.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const playedRef = useRef<boolean[]>(filmShots.map(() => false));

  const enhanced = mounted && !prefersReducedMotion;

  useGSAP(
    () => {
      if (!enhanced || !root.current) return;

      const layers = gsap.utils.toArray<HTMLElement>(
        ".film-layer",
        root.current,
      );
      const videos = gsap.utils.toArray<HTMLVideoElement>(
        "video",
        root.current,
      );

      const playShot = (index: number) => {
        if (playedRef.current[index]) return;
        playedRef.current[index] = true;
        // Play once, forward only. On rejection (iOS low-power) the poster
        // stays and the overlay still animates.
        videos[index]?.play().catch(() => {});
        // Pull the next shot's full file down once this one is rolling.
        const next = videos[index + 1];
        if (next && next.preload !== "auto") {
          next.preload = "auto";
          next.load();
        }
      };

      // Initial states must be set explicitly: a fromTo positioned later in a
      // timeline does not render its from-state until the playhead arrives,
      // which would leave every layer stacked at yPercent 0 — shot 4 covering
      // the deck and no curtain travel at all.
      layers.slice(1).forEach((layer) => gsap.set(layer, { yPercent: 100 }));
      layers.forEach((layer) => {
        gsap.set(layer.querySelector(".film-eyebrow"), { autoAlpha: 0, y: 14 });
        gsap.set(layer.querySelector(".film-word"), {
          yPercent: 115,
          letterSpacing: "0.08em",
        });
        gsap.set(layer.querySelector(".film-quote"), { autoAlpha: 0, y: 18 });
      });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          // A little catch-up glide so curtains travel rather than track the
          // wheel 1:1 — still fully reversible.
          scrub: 0.7,
          onToggle: (self) => {
            document.documentElement.toggleAttribute(
              "data-film-pinned",
              self.isActive,
            );
            if (self.isActive) playShot(0);
          },
          onUpdate: (self) => {
            // A shot plays once its curtain is half-open (≈50% visible).
            for (let i = 1; i < filmShots.length; i++) {
              if (self.progress >= (i + 0.075) / filmShots.length) playShot(i);
            }
          },
        },
      });

      filmShots.forEach((_, i) => {
        const layer = layers[i];
        const eyebrow = layer.querySelector(".film-eyebrow");
        const word = layer.querySelector(".film-word");
        const quote = layer.querySelector(".film-quote");

        // Segment i spans timeline time [i, i+1].
        // 0–15%: curtain — next layer slides up over the held frame beneath.
        if (i > 0) {
          master.fromTo(
            layer,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.15, ease: "none" },
            i,
          );
        }

        // 40–70%: overlay in. Nested in the scrubbed master so scrolling back
        // reverses it cleanly. The word rises out of a mask while its
        // letter-spacing tightens.
        master.fromTo(
          eyebrow,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.12, ease: "power1.out" },
          i + 0.4,
        );
        master.fromTo(
          word,
          { yPercent: 115, letterSpacing: "0.08em" },
          {
            yPercent: 0,
            letterSpacing: "0.015em",
            duration: 0.22,
            ease: "power2.out",
          },
          i + 0.42,
        );
        master.fromTo(
          quote,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.15, ease: "power1.out" },
          i + 0.52,
        );
        // 70–100%: hold — breathing room before the next curtain.
      });

      // Pad the timeline out to exactly 4 segments so the last hold exists.
      master.set(root.current, {}, filmShots.length);
    },
    { scope: root, dependencies: [enhanced] },
  );

  // Clear the header-hide attribute if the component unmounts mid-pin.
  useEffect(
    () => () => document.documentElement.removeAttribute("data-film-pinned"),
    [],
  );

  return (
    <section aria-label="Materials film" ref={root} className="bg-warm-black">
      <div className={cn(enhanced && "relative h-svh overflow-hidden")}>
        {filmShots.map((shot, i) => (
          <div
            key={shot.id}
            className={cn(
              "film-layer bg-warm-black",
              enhanced ? "absolute inset-0" : "relative h-svh",
            )}
            style={enhanced ? { zIndex: i + 1 } : undefined}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover object-center"
              muted
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              poster={shot.poster}
            >
              <source src={shot.webm} type="video/webm" />
              <source src={shot.mp4} type="video/mp4" />
            </video>

            {/* Guarantees overlay contrast on bright end-frames. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/55 to-transparent"
            />

            <div
              className={cn(
                "absolute inset-x-0 bottom-[9svh] px-6 sm:px-12 lg:px-[6vw]",
                shot.align === "right" ? "lg:text-right" : "text-left",
              )}
            >
              <p className="film-eyebrow label-gcb text-bronze">
                {shot.eyebrow}
              </p>
              <div className="overflow-hidden">
                <h2 className="film-word font-film text-ink text-[clamp(3.5rem,13vw,11rem)] leading-[1.02] font-medium tracking-[0.015em]">
                  {shot.word}
                </h2>
              </div>
              <p
                className={cn(
                  "film-quote font-display text-ink/90 mt-4 max-w-[40ch] text-xl italic sm:text-2xl",
                  shot.align === "right" && "lg:ml-auto",
                )}
              >
                {shot.quote}
              </p>
            </div>

            {i === 0 && (
              <div className="text-ink/70 absolute inset-x-0 bottom-5 hidden flex-col items-center gap-2 sm:flex">
                <span className="label-gcb">Scroll</span>
                <span aria-hidden className="bg-ink/50 block h-8 w-px" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
