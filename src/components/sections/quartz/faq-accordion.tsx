"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * FAQ as an accordion — one answer open at a time (the first by default)
 * so the section reads as a conversation, not a wall of text. Answers are
 * always in the DOM (CSS grid-rows collapse, never unmounted): the
 * FAQPage JSON-LD and the view-source test stay honest.
 */
export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-border/30 border-border/30 divide-y border-y">
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    "font-display text-xl transition-colors duration-300 sm:text-2xl",
                    isOpen ? "text-foreground" : "text-foreground/70",
                  )}
                >
                  {item.q}
                </span>
                <Plus
                  size={20}
                  strokeWidth={1.5}
                  className={cn(
                    "text-muted shrink-0 transition-transform duration-300",
                    isOpen && "text-foreground rotate-45",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-muted max-w-2xl pb-7 leading-relaxed">
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
