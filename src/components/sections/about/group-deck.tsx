"use client";

import { useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The Lapiz Group fan deck (owner spec, 2026-08-18, after the deck on
 * lapizblue.com/about): five playing-cards stacked in a pile that fan
 * out on hover - tap toggles on touch. Cards with live sites are real
 * links (Lapiz Blue, Sixty Newton); Global Classic is the you-are-here
 * card; the rest are marked in the making. Transform-only CSS
 * transitions; reduced motion renders the fan open and still. Only
 * Lapiz Blue has a logo file - it renders via the footer's mask-tint
 * technique; every other card is typographic: a display monogram over
 * the company name.
 */

const CARDS = siteConfig.group;

function monogram(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export function GroupDeck() {
  const [fanned, setFanned] = useState(false);
  const reduced = useReducedMotion();
  const open = fanned || reduced;
  const mid = (CARDS.length - 1) / 2;

  return (
    <div
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setFanned(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setFanned(false);
      }}
    >
      <p className="label-gcb text-warm-black/60 text-center" aria-hidden>
        {open ? "Tap a card" : "Hover to explore"}
      </p>

      <div
        className="relative mx-auto mt-10 h-[21rem] max-w-5xl sm:h-[23rem]"
        onClick={() => setFanned((v) => !v)}
      >
        {CARDS.map((card, i) => {
          const offset = i - mid;
          const style = open
            ? {
                transform: `translateX(calc(-50% + ${offset} * min(19vw, 13.5rem))) rotate(${offset * 4}deg) translateY(${Math.abs(offset) * 10}px)`,
                zIndex: 10 + i,
              }
            : {
                transform: `translateX(-50%) rotate(${offset * 2}deg) translateY(${i * 2}px)`,
                zIndex: 10 + i,
              };
          const inner = (
            <>
              {card.logo ? (
                <span
                  role="img"
                  aria-label={card.name}
                  className="bg-warm-black h-8 w-32"
                  style={{
                    maskImage: `url(${card.logo})`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskImage: `url(${card.logo})`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                  }}
                />
              ) : (
                <span
                  aria-hidden
                  className="font-display text-warm-black text-5xl tracking-tight"
                >
                  {monogram(card.name)}
                </span>
              )}
              <span className="mt-auto">
                <span className="font-display text-warm-black block text-lg leading-snug text-balance">
                  {card.name}
                </span>
                <span className="text-warm-black/60 mt-1 block text-sm">
                  {card.role}
                </span>
                <span className="label-gcb text-warm-black/50 mt-4 block">
                  {card.here
                    ? "You are here"
                    : card.href
                      ? "Visit site"
                      : "Site in the making"}
                </span>
              </span>
            </>
          );
          const cardClass = cn(
            "border-warm-black bg-background absolute top-0 left-1/2 flex h-full w-52 flex-col items-start rounded-2xl border p-6 text-left shadow-[0_18px_50px_rgba(12,21,16,0.18)] sm:w-60",
            !reduced && "transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
            card.href && "hover:-translate-y-2",
          );
          return card.href ? (
            <a
              key={card.name}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
              style={style}
              onClick={(e) => {
                if (!open) {
                  e.preventDefault();
                  setFanned(true);
                }
                e.stopPropagation();
              }}
            >
              {inner}
            </a>
          ) : (
            <div key={card.name} className={cardClass} style={style}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
