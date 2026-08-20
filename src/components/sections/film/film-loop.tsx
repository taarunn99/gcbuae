"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { filmChapters, filmLoop } from "@/config/film";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * The ambient film - one continuous stitched loop, playing on repeat like a
 * window into the life the materials build. Nothing is pinned and nothing is
 * driven by scroll: the film keeps its own time, the material words turn with
 * its chapters, and the visitor scrolls past whenever they choose. Because it
 * loops, it is never mistaken for a stuck page.
 *
 * The video only plays while on screen (IntersectionObserver) to save
 * battery; under prefers-reduced-motion it stays a still poster with the
 * first chapter's overlay.
 */
type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

/**
 * GOVERNANCE §5 (poor-network first): visitors on Save-Data or 2G-class
 * connections get the poster, not a multi-megabyte film.
 */
function getConnection(): NetworkInformation | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
}

function subscribeToConnection(callback: () => void) {
  const connection = getConnection();
  connection?.addEventListener?.("change", callback);
  return () => connection?.removeEventListener?.("change", callback);
}

function connectionWantsStills() {
  const connection = getConnection();
  if (!connection) return false;
  return (
    connection.saveData === true ||
    connection.effectiveType === "2g" ||
    connection.effectiveType === "slow-2g"
  );
}

export function FilmLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [chapterIndex, setChapterIndex] = useState(0);
  // The film only starts downloading when its section is within ~half a
  // viewport: autoPlay defeats preload="metadata", so mounting the
  // <source> elements at load pulled the full ~3.7MB during first paint
  // and held the loading spinner for seconds (perf audit, 2026-08-19).
  const [nearView, setNearView] = useState(false);

  // Tracks the Network Information API; false during SSR so the sources are
  // in the HTML and only dropped once a constrained connection is confirmed.
  const stillsOnly = useSyncExternalStore(
    subscribeToConnection,
    connectionWantsStills,
    () => false,
  );

  // Once stills mode is decided, abort any in-flight media fetch: with the
  // <source> elements gone, load() resets the element to poster-only.
  useEffect(() => {
    if (stillsOnly) videoRef.current?.load();
  }, [stillsOnly]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Tracks whether the section is currently on screen, so a play can be
  // retried the moment the (late-mounted) source becomes ready - the
  // observer alone only fires on crossings, and load() aborts any play
  // that raced it, which froze the film (WebKit audit, 2026-08-20).
  const inViewRef = useRef(false);

  // Sources mount after the near-view flip; load() makes the element
  // pick them up, then play resumes as soon as data is ready.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !nearView || stillsOnly || prefersReducedMotion) return;
    const onReady = () => {
      if (inViewRef.current) void video.play().catch(() => {});
    };
    video.addEventListener("loadeddata", onReady);
    video.load();
    return () => video.removeEventListener("loadeddata", onReady);
  }, [nearView, stillsOnly, prefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || prefersReducedMotion || stillsOnly) return;

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
        inViewRef.current = entry.isIntersecting;
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
  }, [prefersReducedMotion, stillsOnly]);

  const chapter = filmChapters[chapterIndex];

  return (
    <section
      ref={sectionRef}
      aria-label="Materials film"
      className="bg-warm-black grain-gcb relative h-svh overflow-hidden"
    >
      {/* Poster as a real layer: iOS Safari paints <video poster> unreliably
          (black-frame report, 2026-08-20). The video covers it once playing. */}
      <Image
        src={filmLoop.poster}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        loading="lazy"
        aria-hidden
      />
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          nearView && !stillsOnly && !prefersReducedMotion
            ? "opacity-100"
            : "opacity-0",
        )}
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
      >
        {/* One universal H.264 file (1.7MB, re-encoded 2026-08-20):
            Safari-class engines stalled on the VP9 WebM while claiming
            support, freezing the film on its poster. */}
        {nearView && !prefersReducedMotion && !stillsOnly && (
          <source src={filmLoop.mp4} type="video/mp4" />
        )}
      </video>

      {/* Guarantees overlay contrast on bright frames. */}
      <div
        aria-hidden
        className="from-warm-black/55 pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t to-transparent"
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

      {/* Chapter marks - a quiet sign the film is alive and has structure. */}
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
