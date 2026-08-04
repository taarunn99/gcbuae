"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { filmChapters, filmLoop } from "@/config/film";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * The ambient film — one continuous stitched loop, playing on repeat like a
 * window into the life the materials build. Nothing is pinned and nothing is
 * driven by scroll: the film keeps its own time, the material words turn with
 * its chapters, and the visitor scrolls past whenever they choose. Because it
 * loops, it is never mistaken for a stuck page.
 *
 * The video only plays while on screen (IntersectionObserver) to save
 * battery; under prefers-reduced-motion it stays a still poster with the
 * first chapter's overlay.
 */
export function FilmLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [chapterIndex, setChapterIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || prefersReducedMotion) return;

    const onTimeUpdate = () => {
      const t = video.currentTime;
      const index = filmChapters.findIndex((c) => t >= c.from && t < c.to);
      if (index !== -1) {
        setChapterIndex((current) => (current === index ? current : index));
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay refused (e.g. iOS low-power): the poster and the
            // first chapter's overlay stand on their own.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(section);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      observer.disconnect();
      video.pause();
    };
  }, [prefersReducedMotion]);

  const chapter = filmChapters[chapterIndex];

  return (
    <section
      ref={sectionRef}
      aria-label="Materials film"
      className="bg-warm-black relative h-svh overflow-hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: `${(chapter.focusX ?? 0.5) * 100}% 50%`,
          // Anchor changes land mid-dissolve, so the reframe plays as a slow
          // camera pan rather than a cut. Only visible where the viewport
          // actually crops (phones); desktop shows the full frame width.
          transition: "object-position 1.1s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        muted
        playsInline
        loop
        preload="metadata"
        poster={filmLoop.poster}
      >
        {!prefersReducedMotion && (
          <>
            <source src={filmLoop.webm} type="video/webm" />
            <source src={filmLoop.mp4} type="video/mp4" />
          </>
        )}
      </video>

      {/* Guarantees overlay contrast on bright frames. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/55 to-transparent"
      />

      <div
        className={cn(
          "absolute inset-x-0 bottom-[12svh] px-6 sm:px-12 lg:px-[6vw]",
          chapter.align === "right" ? "lg:text-right" : "text-left",
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-gcb text-bronze">{chapter.eyebrow}</p>
            <h2 className="font-film text-ink text-[clamp(3.5rem,12vw,10rem)] leading-[1.02] font-medium tracking-[0.015em]">
              {chapter.word}
            </h2>
            <p
              className={cn(
                "font-display text-ink/90 mt-3 max-w-[40ch] text-xl italic sm:text-2xl",
                chapter.align === "right" && "lg:ml-auto",
              )}
            >
              {chapter.quote}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Chapter marks — a quiet sign the film is alive and has structure. */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3">
        {filmChapters.map((c, i) => (
          <span
            key={c.id}
            aria-hidden
            className={cn(
              "h-px w-10 transition-colors duration-500",
              i === chapterIndex ? "bg-ink/90" : "bg-ink/25",
            )}
          />
        ))}
      </div>
    </section>
  );
}
