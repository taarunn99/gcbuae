import { MaterialsTicker } from "@/components/sections/products/materials-ticker";
import { Container } from "@/components/ui/container";

/**
 * The Journal - the blog's advance notice on /about (owner spec,
 * 2026-08-18: noticeable, magazine-voiced, and NO dead link until the
 * blog ships). Onyx stage, the outlined-type ticker running the
 * masthead, phi copy underneath.
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
        <div className="mt-8 [&_section]:border-ink/25 [&_.text-outline-gcb]:[-webkit-text-stroke-color:var(--ink)]">
          <MaterialsTicker
            items={["The Journal", "Field Notes", "Specifications", "Installs", "The Science of Stone"]}
          />
        </div>
        <Container>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <p className="text-ink/70 max-w-xl text-phi-1 font-display leading-snug">
              Field notes from the slab trade - written from the warehouse,
              not the newsroom.
            </p>
            <span className="border-ink/40 text-ink/70 label-gcb inline-flex items-center rounded-full border px-5 py-2.5">
              First issue in progress
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
}
