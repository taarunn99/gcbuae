"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Ambient portrait clip (the four 9:16 Higgsfield films, 2026-08-18).
 * Perf contract: preload="none" + a webp poster means a page costs one
 * small image until the clip actually scrolls into view; playback
 * starts/stops on an IntersectionObserver so nothing decodes offscreen.
 * Reduced motion gets the poster only. Decorative - no controls, muted,
 * looped, aria-hidden with the poster alt carried by the figure around it.
 */
export function AmbientClip({
  name,
  className = "",
}: {
  /** Basename in /public/clips: marble-vein, quartz-kitchen, terrazzo-light, brass-water */
  name: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "120px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      poster={`/clips/${name}-poster.webp`}
      preload="none"
      muted
      loop
      playsInline
      disablePictureInPicture
      aria-hidden
    >
      {!reducedMotion && <source src={`/clips/${name}.mp4`} type="video/mp4" />}
    </video>
  );
}
