"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  quartzFamilies,
  quartzShades,
  shadesOfFamily,
} from "@/config/kalingastone-quartz";
import { cn } from "@/lib/utils";

/**
 * The 69-shade catalogue, organised instead of dumped: grouped under
 * sticky colour-family headers with jump chips, each family collapsed to
 * its first rows with a "show all" expander. Every card is server-
 * rendered and stays in the DOM when collapsed or filtered (CSS hide
 * only) — GOVERNANCE's view-source test — and every card links to the
 * shade's own indexed page.
 */

const COLLAPSED_COUNT = 10;

function ShadeCard({
  shade,
  hidden,
}: {
  shade: (typeof quartzShades)[number];
  hidden: boolean;
}) {
  return (
    <li className={cn(hidden && "hidden")} id={`shade-${shade.slug}`}>
      <Link href={`/kalingastone/quartz/${shade.slug}`} className="group block">
        <span className="border-border/30 relative block aspect-[4/3] overflow-hidden rounded-lg border">
          <Image
            src={`/kalingastone/quartz/swatches/${shade.slug}.webp`}
            alt={`KalingaStone Quartz ${shade.name} — Series ${shade.series} engineered quartz slab, ${shade.size} mm`}
            fill
            sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {shade.microban && (
            <span className="label-gcb bg-warm-black/80 text-ink absolute top-2 left-2 rounded-full px-2.5 py-1 text-[0.55rem]">
              Microban®
            </span>
          )}
          {shade.isNew && (
            <span className="label-gcb bg-verde/90 text-ink absolute top-2 right-2 rounded-full px-2.5 py-1 text-[0.55rem]">
              New
            </span>
          )}
        </span>
        <span className="mt-2.5 block">
          <span className="font-display text-foreground group-hover:text-bronze block leading-tight transition-colors">
            {shade.name}
          </span>
          <span className="text-muted mt-0.5 block text-[0.7rem]">
            Series {shade.series} · {shade.size} mm
          </span>
        </span>
      </Link>
    </li>
  );
}

export function QuartzShadeExplorer() {
  const [microbanOnly, setMicrobanOnly] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div>
      {/* Jump chips + Microban filter */}
      <div className="flex flex-wrap items-center gap-2">
        {quartzFamilies.map((f) => (
          <a
            key={f.id}
            href={`#family-${f.id}`}
            className="border-border/50 hover:border-border rounded-full border px-4 py-2 text-sm transition-colors"
          >
            {f.label}
            <span className="text-muted ml-2 text-xs">
              {shadesOfFamily(f.id).length}
            </span>
          </a>
        ))}
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

      {/* Family groups */}
      <div className="mt-6 space-y-14">
        {quartzFamilies.map((f) => {
          const all = shadesOfFamily(f.id);
          const members = all.filter((s) => !microbanOnly || s.microban);
          const isExpanded = Boolean(expanded[f.id]) || microbanOnly;
          const overflow = all.length - COLLAPSED_COUNT;
          if (microbanOnly && members.length === 0) return null;

          return (
            <section key={f.id} id={`family-${f.id}`} className="scroll-mt-28">
              {/* Sticky group header */}
              <div className="bg-background/95 border-border/30 sticky top-20 z-10 flex items-baseline justify-between gap-4 border-b py-3 backdrop-blur-sm">
                <h3 className="font-display text-xl sm:text-2xl">
                  {f.label}
                  <span className="text-muted ml-3 text-sm font-normal">
                    {members.length} shade{members.length === 1 ? "" : "s"}
                  </span>
                </h3>
                <Link
                  href={`/kalingastone/quartz/colours/${f.slug}`}
                  className="text-muted hover:text-foreground flex shrink-0 items-center gap-1 text-sm transition-colors"
                >
                  Range page
                  <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
                </Link>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
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
                    setExpanded((prev) => ({ ...prev, [f.id]: true }))
                  }
                  className="border-border/50 hover:border-border mt-7 flex w-full items-center justify-center gap-2 rounded-full border py-3 text-sm transition-colors"
                >
                  Show all {all.length} {f.label.toLowerCase()} shades
                  <ChevronDown size={15} strokeWidth={1.5} aria-hidden />
                </button>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
