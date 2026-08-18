"use client";

import { useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { BlogFaqItem } from "@/content/blog/types";
import { cn } from "@/lib/utils";

/**
 * Post FAQ accordion - the home-faq circle-marker pattern reused at
 * article scale. Answers stay in the DOM (grid-rows collapse) so the
 * FAQPage JSON-LD and view-source test always agree with the page.
 */
export function BlogFaq({ items }: { items: BlogFaqItem[] }) {
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion();

  return (
    <div className="divide-warm-black/15 border-warm-black/15 divide-y border-y">
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span
                  aria-hidden
                  className={cn(
                    "border-warm-black size-3.5 shrink-0 rounded-full border transition-colors duration-300",
                    isOpen ? "bg-warm-black" : "bg-transparent",
                  )}
                />
                <span
                  className={cn(
                    "font-display text-lg transition-colors duration-300",
                    isOpen ? "text-warm-black" : "text-warm-black/70",
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
                <p className="text-warm-black/75 pb-6 pl-8 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
