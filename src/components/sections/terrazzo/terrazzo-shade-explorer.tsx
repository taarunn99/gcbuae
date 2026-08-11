"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  shadesOfTerrazzoCollection,
  terrazzoCollections,
  terrazzoShades,
} from "@/config/kalingastone-terrazzo";
import { cn } from "@/lib/utils";

/**
 * The 24-shade terrazzo catalogue, grouped under sticky collection
 * headers with jump chips and per-collection expanders. Every card is
 * server-rendered and stays in the DOM when collapsed or filtered
 * (view-source test); every card links to its shade page. Card frames
 * follow the wide 765×358 catalogue swatch (aspect 2:1).
 */

const COLLAPSED_COUNT = 8;

function ShadeCard({
  shade,
  hidden,
}: {
  shade: (typeof terrazzoShades)[number];
  hidden: boolean;
}) {
  return (
    <li className={cn(hidden && "hidden")} id={`shade-${shade.slug}`}>
      <Link
        href={`/kalingastone/terrazzo/${shade.slug}`}
        className="group block"
      >
        <span className="border-warm-black relative block aspect-[2/1] overflow-hidden rounded-lg border">
          <Image
            src={`/kalingastone/terrazzo/swatches/${shade.slug}.webp`}
            alt={`KalingaStone Terrazzo ${shade.name} - Series ${shade.series} terrazzo slab, 304 × 125 cm`}
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
        <span className="mt-2.5 block">
          <span className="font-display text-foreground group-hover:text-bronze block leading-tight transition-colors">
            {shade.name}
          </span>
          <span className="text-muted mt-0.5 block text-[0.7rem]">
            Series {shade.series} · 304 × 125 cm
          </span>
        </span>
      </Link>
    </li>
  );
}

export function TerrazzoShadeExplorer() {
  const [microbanOnly, setMicrobanOnly] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div>
      {/* Jump chips + Microban filter */}
      <div className="flex flex-wrap items-center gap-2">
        {terrazzoCollections.map((c) => {
          const cover = shadesOfTerrazzoCollection(c.series)[0];
          return (
            <a
              key={c.slug}
              href={`#collection-${c.slug}`}
              className="chip-gcb border-border/50 flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm"
            >
              <span className="border-border/30 relative size-4 overflow-hidden rounded-full border">
                <Image
                  src={`/kalingastone/terrazzo/swatches/${cover.slug}.webp`}
                  alt=""
                  fill
                  sizes="16px"
                  className="object-cover"
                />
              </span>
              {c.label}
              <span className="text-muted text-xs">
                {shadesOfTerrazzoCollection(c.series).length}
              </span>
            </a>
          );
        })}
        <label className="label-gcb text-foreground ml-auto flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={microbanOnly}
            onChange={(e) => setMicrobanOnly(e.target.checked)}
            className="accent-accent h-4 w-4"
          />
          Microban® only
        </label>
      </div>

      {/* Collection groups */}
      <div className="mt-6 space-y-14">
        {terrazzoCollections.map((c) => {
          const all = shadesOfTerrazzoCollection(c.series);
          const members = all.filter((s) => !microbanOnly || s.microban);
          const isExpanded = Boolean(expanded[c.slug]) || microbanOnly;
          const overflow = all.length - COLLAPSED_COUNT;
          if (microbanOnly && members.length === 0) return null;

          return (
            <section
              key={c.slug}
              id={`collection-${c.slug}`}
              className="scroll-mt-28"
            >
              <div className="bg-background/95 border-warm-black sticky top-20 z-10 flex items-baseline justify-between gap-4 border-b py-3 backdrop-blur-sm">
                <h3 className="font-display text-xl sm:text-2xl">
                  {c.label}
                  <span className="text-muted ml-3 text-sm font-normal">
                    Series {c.series} · {members.length} shade
                    {members.length === 1 ? "" : "s"}
                  </span>
                </h3>
                <Link
                  href={`/kalingastone/terrazzo/collections/${c.slug}`}
                  className="text-muted hover:text-foreground flex shrink-0 items-center gap-1 text-sm transition-colors"
                >
                  Collection page
                  <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
                </Link>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                {all.map((shade, i) => (
                  <ShadeCard
                    key={shade.slug}
                    shade={shade}
                    hidden={
                      (microbanOnly && !shade.microban) ||
                      (!isExpanded && i >= COLLAPSED_COUNT)
                    }
                  />
                ))}
              </ul>

              {!isExpanded && overflow > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [c.slug]: true }))
                  }
                  className="chip-gcb border-border/50 mt-7 flex w-full items-center justify-center gap-2 rounded-full border py-3 text-sm"
                >
                  Show all {all.length} {c.label} shades
                  <ChevronDown size={15} strokeWidth={1.5} aria-hidden />
                </button>
              )}
            </section>
          );
        })}
      </div>

      {/* The catalogue's own colour disclaimer, mirrored as instructed */}
      <p className="text-muted mt-10 text-xs leading-relaxed">
        Printed and on-screen representation of colours may vary from the actual
        product - please view the actual slab prior to selection.
      </p>
    </div>
  );
}
