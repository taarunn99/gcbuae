"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

import type { QuartzShade } from "@/config/kalingastone-quartz";

/**
 * Lifestyle gallery as a proper carousel (Embla): draggable, snap-per-card,
 * arrow controls, and a thin accent progress line instead of the browser
 * scrollbar. Cards link to their shade pages. All slides are in the DOM
 * server-side — Embla only adds transforms.
 */
export function LifestyleCarousel({ shades }: { shades: QuartzShade[] }) {
  const [emblaRef, embla] = useEmblaCarousel(
    { align: "start", skipSnaps: false },
    [WheelGesturesPlugin()],
  );
  const snapshot = useSyncExternalStore(
    useCallback(
      (onChange: () => void) => {
        if (!embla) return () => {};
        embla.on("select", onChange).on("reInit", onChange);
        return () => {
          embla.off("select", onChange).off("reInit", onChange);
        };
      },
      [embla],
    ),
    () =>
      embla
        ? `${embla.canScrollPrev()}|${embla.canScrollNext()}`
        : "false|true",
    () => "false|true",
  );
  const [canPrev, canNext] = snapshot.split("|").map((v) => v === "true") as [
    boolean,
    boolean,
  ];
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!embla) return;
    // Style-only mutation — no React state involved.
    const onScroll = () => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.max(
          0.06,
          embla.scrollProgress(),
        )})`;
      }
    };
    embla.on("scroll", onScroll);
    onScroll();
    return () => {
      embla.off("scroll", onScroll);
    };
  }, [embla]);

  return (
    <div>
      <div ref={emblaRef} className="overflow-hidden px-6 lg:px-[6vw]">
        <div className="flex touch-pan-y gap-6">
          {shades.map((s) => (
            <Link
              key={s.slug}
              href={`/kalingastone/quartz/${s.slug}`}
              className="group w-[78vw] shrink-0 sm:w-[440px]"
            >
              <span className="relative block aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={`/kalingastone/quartz/lifestyle/${s.slug}.webp`}
                  alt={`KalingaStone Quartz ${s.name} installed in an interior`}
                  fill
                  sizes="(min-width: 640px) 440px, 78vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="label-gcb text-ink absolute bottom-4 left-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  View shade →
                </span>
              </span>
              <span className="label-gcb text-ink/70 mt-3 block">
                {s.name} · Series {s.series}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-6 px-6 lg:px-[6vw]">
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => embla?.scrollPrev()}
            disabled={!canPrev}
            className="border-ink/25 text-ink hover:border-ink flex size-11 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => embla?.scrollNext()}
            disabled={!canNext}
            className="border-ink/25 text-ink hover:border-ink flex size-11 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
        <span className="bg-ink/15 relative block h-px flex-1 overflow-hidden rounded-full">
          <span
            ref={progressRef}
            className="bg-bronze absolute inset-0 origin-left"
            style={{ transform: "scaleX(0.06)" }}
          />
        </span>
      </div>
    </div>
  );
}
