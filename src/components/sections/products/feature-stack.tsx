"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The issue's three feature spreads as STACKING CARDS: each spread is
 * sticky at the same offset, so the next slides over the last while the
 * outgoing card recedes (scale + dim, GSAP scrub). Golden-section grid
 * inside every card, phi-scale display type, pull quotes, folio marks.
 * All copy server-rendered; reduced motion renders a flat stack.
 * NOTE: no overflow-hidden anywhere above the sticky cards.
 */

type Feature = {
  folio: string;
  title: string;
  quote: string;
  body: string;
  image: string;
  alt: string;
  links: { label: string; href: string }[];
};

const FEATURES: Feature[] = [
  {
    folio: "Feature 01 · Stone",
    title: "The stone standard",
    quote: "Three catalogues, one warehouse - 128 shades deep.",
    body: "KalingaStone quartz for the working kitchen, marble for the gloss that can be brought back, terrazzo for the floors and facades that must not burn. Every shade has its own indexed page, its true slab size, and a Sharjah stock position behind it.",
    image: "/products/editorial/stone-feature.webp",
    alt: "White-gloved hands holding a veined marble sample against the light",
    links: [
      { label: "Quartz · 69 shades", href: "/kalingastone/quartz" },
      { label: "Marble · 35 shades", href: "/kalingastone/marble" },
      { label: "Terrazzo · 24 shades", href: "/kalingastone/terrazzo" },
    ],
  },
  {
    folio: "Feature 02 · Water",
    title: "Where water works",
    quote: "The wet rooms earn their keep - or they leak it.",
    body: "Jaquar showers, taps, sanitaryware and shower trays - the moving parts of a bathroom, specified with the same wholesale discipline as the stone they sit on. Every category now has its own page - collections, finishes and the specs, with AED trade pricing a message away.",
    image: "/products/editorial/water-feature.webp",
    alt: "Sculptural chrome rain shower with falling water against dark green tiles",
    links: [
      { label: "Showers", href: "/jaquar/showers" },
      { label: "Taps & faucets", href: "/jaquar/faucets" },
      { label: "Wash basins", href: "/jaquar/wash-basins" },
      { label: "Water closets", href: "/jaquar/water-closets" },
      { label: "Wellness", href: "/jaquar/wellness" },
    ],
  },
  {
    folio: "Feature 03 · Care",
    title: "Kept like new",
    quote: "A surface is a promise - care is how it's kept.",
    body: "FILA sealers and cleaners, matched to every stone we sell. The right chemistry at handover and a maintenance regime after it are the difference between a floor that ages and a floor that merely gets old.",
    image: "/products/editorial/care-feature-fila.webp",
    alt: "A sage-gloved hand polishing a glossy dark stone slab beside the FILA MP90 ECO XTREME sealer jug",
    links: [{ label: "Sealers & cleaners", href: "/contact" }],
  },
];

export function FeatureStack() {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-feature-card]");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        // The outgoing card recedes as the next one rides over it.
        gsap.to(card, {
          scale: 0.94,
          autoAlpha: 0.55,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top+=96",
            scrub: true,
          },
        });
      });
    },
    { scope, dependencies: [reduced] },
  );

  return (
    <div ref={scope} className="space-y-8 lg:space-y-0">
      {FEATURES.map((f, i) => (
        <article
          key={f.folio}
          data-feature-card
          className="bg-background lg:sticky lg:top-24"
        >
          <div className="border-warm-black container-gcb border-t pt-8 pb-16 lg:pb-24">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="label-gcb text-bronze">{f.folio}</p>
              <p aria-hidden className="font-display text-muted text-phi-1">
                {String(i + 1).padStart(2, "0")} / 03
              </p>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.618fr_1fr] lg:gap-16">
              <div>
                <h3 className="font-display text-phi-3 tracking-tight text-balance">
                  {f.title}
                </h3>
                <p className="font-display text-phi-2 text-muted mt-8 max-w-xl leading-tight italic">
                  &ldquo;{f.quote}&rdquo;
                </p>
                <p className="mt-8 max-w-xl leading-relaxed">{f.body}</p>
                <ul className="mt-10 flex flex-wrap gap-2.5">
                  {f.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="chip-gcb border-border/50 rounded-full border px-4 py-2 text-sm"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <figure className="border-warm-black relative aspect-[3/4] self-start overflow-hidden rounded-xl border lg:mt-[6%]">
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
