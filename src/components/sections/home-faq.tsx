"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FAQ_ITEMS } from "@/config/home-faq";
import { cn } from "@/lib/utils";

/**
 * Home FAQ - between the global map and the contact form (owner spec,
 * 2026-08-18, after the Lapiz Blue split FAQ but magazine-refined):
 * questions on the left as a quiet list, and the active answer set on
 * the golden-ratio type scale over a three-layer glass panel on the
 * right - generated palette image, a steam-on-glass blur layer, then
 * the text. Copy speaks to interior design companies, contractors and
 * BOQ-scale buyers - the site's lead target - never to end users.
 *
 * SSR honesty: every answer is in the DOM in both layouts (stacked
 * with opacity on desktop, grid-rows collapse on mobile), so the
 * FAQPage JSON-LD built from this same array always matches.
 */


export function HomeFaq() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Frequently asked questions"
      className="bg-background relative py-24 lg:py-32"
    >
      <div className="container-gcb">
        <p className="label-gcb text-warm-black/60">FAQs</p>
        <h2 className="font-display text-warm-black mt-3 text-3xl tracking-tight sm:text-5xl">
          Quick answers.
        </h2>

        {/* Desktop: question list + the glass panel */}
        <div className="mt-12 hidden gap-14 lg:grid lg:grid-cols-[1fr_0.618fr]">
          <ul className="divide-warm-black/15 divide-y">
            {FAQ_ITEMS.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    aria-controls={`faq-panel-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-xl transition-colors duration-300",
                        isActive ? "text-warm-black" : "text-warm-black/55 group-hover:text-warm-black/80",
                      )}
                    >
                      {item.q}
                    </span>
                    <Plus
                      size={18}
                      strokeWidth={1.3}
                      aria-hidden
                      className={cn(
                        "text-warm-black/50 shrink-0 transition-transform duration-300",
                        isActive && "text-warm-black rotate-45",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* The glass panel - image, steam, text */}
          <div className="border-warm-black relative aspect-[4/5] self-start overflow-hidden rounded-3xl border">
            <Image
              src="/home/faq-glass.webp"
              alt="Condensation on pale glass in front of a sage stone interior"
              fill
              sizes="(min-width: 1024px) 34rem, 100vw"
              quality={90}
              className="object-cover"
              loading="lazy"
            />
            {/* The steam layer - frosts whatever sits behind the words */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/15 to-transparent backdrop-blur-[2px]"
            />
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={item.q}
                id={`faq-panel-${i}`}
                role="region"
                aria-label={item.q}
                className={cn(
                  "absolute inset-0 flex flex-col justify-end p-9",
                  !reduced && "transition-opacity duration-500",
                  i === active ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <p className="label-gcb text-warm-black/70">{item.q}</p>
                <p className="font-display text-phi-1 text-warm-black mt-4 leading-snug text-balance">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: classic accordion, answers stay in the DOM */}
        <div className="divide-warm-black/15 border-warm-black/15 mt-10 divide-y border-y lg:hidden">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = i === active;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setActive(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-lg transition-colors duration-300",
                        isOpen ? "text-warm-black" : "text-warm-black/60",
                      )}
                    >
                      {item.q}
                    </span>
                    <Plus
                      size={18}
                      strokeWidth={1.3}
                      aria-hidden
                      className={cn(
                        "text-warm-black/50 shrink-0 transition-transform duration-300",
                        isOpen && "text-warm-black rotate-45",
                      )}
                    />
                  </button>
                </h3>
                <div
                  className={cn(
                    "grid",
                    !reduced &&
                      "transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-warm-black/70 pb-6 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
