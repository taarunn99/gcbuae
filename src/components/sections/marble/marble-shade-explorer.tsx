"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  marbleFamilies,
  marbleShades,
  shadesOfMarbleFamily,
} from "@/config/kalingastone-marble";
import { cn } from "@/lib/utils";

/**
 * The 35-shade marble catalogue, grouped under sticky colour-family
 * headers with jump chips and per-family expanders. Every card is
 * server-rendered and stays in the DOM when collapsed or filtered;
 * every card links to its shade page. The Microban filter reads
 * "option" — on marble it is an available treatment, never an
 * intrinsic attribute.
 */

const COLLAPSED_COUNT = 8;

function ShadeCard({
  shade,
  hidden,
}: {
  shade: (typeof marbleShades)[number];
  hidden: boolean;
}) {
  return (
    <li className={cn(hidden && "hidden")} id={`shade-${shade.slug}`}>
      <Link href={`/kalingastone/marble/${shade.slug}`} className="group block">
        <span className="border-warm-black relative block aspect-[5/2] overflow-hidden rounded-lg border">
          <Image
            src={`/kalingastone/marble/swatches/${shade.slug}.webp`}
            alt={`KalingaStone Marble ${shade.name} — Series-${shade.series} engineered marble slab, 304 × 125 cm`}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {shade.microbanOption && (
            <span className="label-gcb bg-warm-black/80 text-ink absolute top-2 left-2 rounded-full px-2.5 py-1 text-[0.55rem]">
              Microban® option
            </span>
          )}
        </span>
        <span className="mt-2.5 block">
          <span className="font-display text-foreground group-hover:text-bronze block leading-tight transition-colors">
            {shade.name}
          </span>
          <span className="text-muted mt-0.5 block text-[0.7rem]">
            Series-{shade.series} · 304 × 125 cm
          </span>
        </span>
      </Link>
    </li>
  );
}

export function MarbleShadeExplorer() {
  const [microbanOnly, setMicrobanOnly] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div>
      {/* Jump chips + Microban-option filter */}
      <div className="flex flex-wrap items-center gap-2">
        {marbleFamilies.map((f) => {
          const cover = shadesOfMarbleFamily(f.id)[0];
          return (
            <a
              key={f.id}
              href={`#family-${f.id}`}
              className="chip-gcb border-border/50 flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm"
            >
              <span className="border-border/30 relative size-4 overflow-hidden rounded-full border">
                <Image
                  src={`/kalingastone/marble/swatches/${cover.slug}.webp`}
                  alt=""
                  fill
                  sizes="16px"
                  className="object-cover"
                />
              </span>
              {f.label}
              <span className="text-muted text-xs">
                {shadesOfMarbleFamily(f.id).length}
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
          Microban® option only
        </label>
      </div>

      {/* Family groups */}
      <div className="mt-6 space-y-14">
        {marbleFamilies.map((f) => {
          const all = shadesOfMarbleFamily(f.id);
          const members = all.filter((s) => !microbanOnly || s.microbanOption);
          const isExpanded = Boolean(expanded[f.id]) || microbanOnly;
          const overflow = all.length - COLLAPSED_COUNT;
          if (microbanOnly && members.length === 0) return null;

          return (
            <section key={f.id} id={`family-${f.id}`} className="scroll-mt-28">
              <div className="bg-background/95 border-warm-black sticky top-20 z-10 flex items-baseline justify-between gap-4 border-b py-3 backdrop-blur-sm">
                <h3 className="font-display text-xl sm:text-2xl">
                  {f.label}
                  <span className="text-muted ml-3 text-sm font-normal">
                    {members.length} shade{members.length === 1 ? "" : "s"}
                  </span>
                </h3>
                <Link
                  href={`/kalingastone/marble/colours/${f.slug}`}
                  className="text-muted hover:text-foreground flex shrink-0 items-center gap-1 text-sm transition-colors"
                >
                  Range page
                  <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
                </Link>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                {all.map((shade, i) => (
                  <ShadeCard
                    key={shade.slug}
                    shade={shade}
                    hidden={
                      (microbanOnly && !shade.microbanOption) ||
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
                  className="chip-gcb border-border/50 mt-7 flex w-full items-center justify-center gap-2 rounded-full border py-3 text-sm"
                >
                  Show all {all.length} {f.label.toLowerCase()} shades
                  <ChevronDown size={15} strokeWidth={1.5} aria-hidden />
                </button>
              )}
            </section>
          );
        })}
      </div>

      {/* The catalogue's own colour disclaimer, mirrored */}
      <p className="text-muted mt-10 text-xs leading-relaxed">
        Representation of colours may vary from the actual product — please view
        the actual slab prior to selection.
      </p>
    </div>
  );
}
