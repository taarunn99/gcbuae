"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { quartzShades } from "@/config/kalingastone-quartz";
import { cn } from "@/lib/utils";

/**
 * The 69-shade explorer. Every card is server-rendered into the HTML (the
 * filters only hide, never mount), so the complete range is visible to
 * crawlers — GOVERNANCE's view-source test. Filtering is by series tier,
 * colour family, and the Microban / NEW flags.
 */

const FAMILIES = [
  { id: "all", label: "All shades" },
  { id: "white", label: "Whites" },
  { id: "veined", label: "Marble-look veined" },
  { id: "beige", label: "Cream & beige" },
  { id: "grey", label: "Greys" },
  { id: "dark", label: "Dark & black" },
] as const;

const SERIES = ["all", "7", "6", "5", "4", "3", "2", "1 A", "1"] as const;

export function QuartzShadeExplorer() {
  const [family, setFamily] = useState<string>("all");
  const [series, setSeries] = useState<string>("all");
  const [microbanOnly, setMicrobanOnly] = useState(false);

  const visible = useMemo(
    () =>
      new Set(
        quartzShades
          .filter(
            (s) =>
              (family === "all" || s.family === family) &&
              (series === "all" || s.series === series) &&
              (!microbanOnly || s.microban),
          )
          .map((s) => s.slug),
      ),
    [family, series, microbanOnly],
  );

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {FAMILIES.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFamily(f.id)}
            aria-pressed={family === f.id}
            className={cn(
              "label-gcb rounded-full border px-4 py-2.5 transition-colors",
              family === f.id
                ? "bg-foreground text-background border-transparent"
                : "border-border/50 text-foreground hover:border-border",
            )}
          >
            {f.label}
          </button>
        ))}
        <span
          aria-hidden
          className="bg-border/50 mx-2 hidden h-6 w-px sm:block"
        />
        <label className="label-gcb text-foreground flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={microbanOnly}
            onChange={(e) => setMicrobanOnly(e.target.checked)}
            className="accent-accent h-4 w-4"
          />
          Microban® only
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="label-gcb text-muted mr-1">Series</span>
        {SERIES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSeries(s)}
            aria-pressed={series === s}
            className={cn(
              "font-display min-w-10 rounded-full border px-3 py-1.5 text-sm transition-colors",
              series === s
                ? "bg-foreground text-background border-transparent"
                : "border-border/50 text-foreground hover:border-border",
            )}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
        <span className="text-muted ml-auto text-sm" aria-live="polite">
          {visible.size} of {quartzShades.length}
        </span>
      </div>

      {/* Grid — all 69 in the DOM, filters only hide */}
      <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {quartzShades.map((shade) => (
          <li
            key={shade.slug}
            id={`shade-${shade.slug}`}
            className={cn(!visible.has(shade.slug) && "hidden")}
          >
            {/* Every card links to the shade's own indexed page — 69
                crawlable in-content links from the pillar (GOVERNANCE §8). */}
            <Link
              href={`/kalingastone/quartz/${shade.slug}`}
              className="group block"
            >
              <span className="border-border/30 relative block aspect-[4/3] overflow-hidden rounded-lg border">
                <Image
                  src={`/kalingastone/quartz/swatches/${shade.slug}.webp`}
                  alt={`KalingaStone Quartz ${shade.name} — Series ${shade.series} engineered quartz slab, ${shade.size} mm`}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {shade.microban && (
                  <span className="label-gcb bg-warm-black/80 text-ink absolute top-2 left-2 rounded-full px-2.5 py-1 text-[0.55rem]">
                    Microban®
                  </span>
                )}
              </span>
              <span className="mt-3 block">
                <span className="font-display text-foreground group-hover:text-verde block text-lg leading-tight transition-colors">
                  {shade.name}
                </span>
                <span className="text-muted mt-0.5 block text-xs">
                  Series {shade.series} · {shade.size} mm
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
