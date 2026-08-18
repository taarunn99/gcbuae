"use client";

import Image from "next/image";
import { useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FAQ_ITEMS } from "@/config/home-faq";
import { cn } from "@/lib/utils";

/**
 * Home FAQ - between the global map and the contact form. Second pass
 * (owner corrections, 2026-08-18): circle markers instead of plus signs
 * (the Lapiz gesture in Onyx), stronger question contrast, the phi
 * modular scale with the heading two steps above the body (phi squared,
 * 2.618x), the glass image running SEAMLESS to the viewport edge - no
 * box, no border - and the answer organized as a display lead plus
 * short points on a true frosted-glass band, not a smoke gradient.
 *
 * SSR honesty: every answer is in the DOM in both layouts; the FAQPage
 * JSON-LD is built from the same config array.
 */

export function HomeFaq() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section
      aria-label="Frequently asked questions"
      className="bg-background relative"
    >
      <div className="lg:grid lg:grid-cols-2">
        {/* Left: heading + question list, gutters of its own */}
        <div className="px-6 py-20 sm:px-10 lg:py-28 lg:pl-20 lg:pr-16 xl:pl-28">
          <p className="label-gcb text-warm-black/60">FAQs</p>
          <h2 className="font-display text-phi-3 text-warm-black mt-3 tracking-tight">
            Quick answers.
          </h2>

          {/* Desktop question list */}
          <ul className="divide-warm-black/15 mt-10 hidden divide-y lg:block">
            {FAQ_ITEMS.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    aria-controls={`faq-panel-${i}`}
                    className="group flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "border-warm-black size-2.5 shrink-0 rounded-full border transition-colors duration-300",
                        isActive ? "bg-warm-black" : "bg-transparent group-hover:bg-warm-black/30",
                      )}
                    />
                    <span
                      className={cn(
                        "font-display text-xl transition-colors duration-300",
                        isActive ? "text-warm-black" : "text-warm-black/75 group-hover:text-warm-black",
                      )}
                    >
                      {item.q}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile: accordion with the same circle markers */}
          <div className="divide-warm-black/15 border-warm-black/15 mt-8 divide-y border-y lg:hidden">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = i === active;
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setActive(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 py-5 text-left"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "border-warm-black size-2.5 shrink-0 rounded-full border transition-colors duration-300",
                          isOpen ? "bg-warm-black" : "bg-transparent",
                        )}
                      />
                      <span
                        className={cn(
                          "font-display text-lg transition-colors duration-300",
                          isOpen ? "text-warm-black" : "text-warm-black/75",
                        )}
                      >
                        {item.q}
                      </span>
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
                      <p className="font-display text-warm-black text-lg leading-snug">
                        {item.lead}
                      </p>
                      <ul className="mt-3 space-y-2 pb-6">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="text-warm-black/75 flex gap-3 leading-relaxed"
                          >
                            <span
                              aria-hidden
                              className="bg-warm-black mt-2.5 size-1 shrink-0 rounded-full"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: the glass image, seamless to the viewport edges */}
        <div className="relative hidden lg:block">
          <Image
            src="/home/faq-glass.webp"
            alt="Condensation on pale glass in front of a sage stone interior"
            fill
            sizes="50vw"
            quality={90}
            className="object-cover"
            loading="lazy"
          />
          {/* The frosted-glass band the answer sits on - uniform heavy
              blur with a crisp top edge, not a smoke gradient */}
          <div className="border-t-warm-black/20 absolute inset-x-0 bottom-0 border-t bg-white/35 backdrop-blur-2xl">
            <div className="grid p-10 xl:p-14 [&>*]:col-start-1 [&>*]:row-start-1">
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={item.q}
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-label={item.q}
                  className={cn(
                    !reduced && "transition-opacity duration-500",
                    i === active
                      ? "opacity-100"
                      : "pointer-events-none opacity-0",
                  )}
                >
                  <p className="label-gcb text-warm-black/70">{item.q}</p>
                  {/* phi squared: lead at 2.618x the point size */}
                  <p className="font-display text-phi-2 text-warm-black mt-4 leading-tight text-balance">
                    {item.lead}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="text-phi-0 text-warm-black flex gap-3"
                      >
                        <span
                          aria-hidden
                          className="bg-warm-black mt-2.5 size-1.5 shrink-0 rounded-full"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
