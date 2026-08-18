import Link from "next/link";

import { MaterialsTicker } from "@/components/sections/products/materials-ticker";
import { Container } from "@/components/ui/container";

/**
 * The Journal - the blog's advance notice on /about (owner spec,
 * 2026-08-18: noticeable, magazine-voiced, linking to the /blog
 * masthead page). Onyx stage, the outlined-type ticker in Marble White
 * stroke, phi copy underneath.
 */
export function JournalTeaser() {
  return (
    <section
      aria-label="The Journal - coming soon"
      className="bg-warm-black grain-gcb relative overflow-hidden py-20 lg:py-24"
    >
      <div className="relative z-10">
        <Container>
          <p className="label-gcb text-ink/60">Next from Global Classic</p>
        </Container>
        <div className="mt-8">
          <MaterialsTicker
            dark
            items={["The Journal", "Field Notes", "Specifications", "Installs", "The Science of Stone"]}
          />
        </div>
        <Container>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <p className="text-ink/70 max-w-xl text-phi-1 font-display leading-snug">
              Field notes from the slab trade - written from the warehouse,
              not the newsroom.
            </p>
            <div className="flex flex-col items-start gap-3">
              <Link
                href="/blog"
                className="chip-gcb border-ink text-ink inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium"
              >
                Read the Journal →
              </Link>
              <span className="label-gcb text-ink/50">
                First issue in progress
              </span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
