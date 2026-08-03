import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import heroCopy from "@/config/hero-copy.json";

import { HeroMedia } from "./hero-media";
import { HeroScrollCue } from "./hero-scroll-cue";

/**
 * The quote is positioned over the one region of the photograph flat enough to
 * carry type — the fluted wall, measured at x 25–62%, y 11–67% of the source.
 * Hence the 43.5% horizontal anchor on large screens rather than dead centre,
 * and the bottom padding that lifts the block above the optical middle.
 *
 * On phones `object-position: 43.5%` crops to x 30.6–56.4%, which sits inside
 * the same safe zone, so a single landscape asset covers every breakpoint.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden pb-[12vh]">
      <HeroMedia />

      <div className="relative z-10 w-full">
        {/* 37rem is the widest the block can be before the longest line
            outgrows the flat wall behind it and starts crossing the shower
            frame. The type ceiling is set from the same constraint. */}
        <div className="px-gutter mx-auto w-full max-w-[37rem] text-center lg:mx-0 lg:ml-[43.5%] lg:-translate-x-1/2">
          <SplitHeading
            as="h1"
            className="font-display text-ink text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.12] tracking-[-0.01em]"
          >
            {/* Rendered as blocks so the line break matches the baked share
                image, while still wrapping freely on narrow screens. */}
            {heroCopy.quote.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </SplitHeading>

          <Reveal delay={0.75} className="mt-8">
            <p className="text-ink/80 mx-auto max-w-md text-base leading-relaxed text-balance">
              {heroCopy.subline}
            </p>
          </Reveal>

          <Reveal delay={0.9} className="mt-10">
            <Link
              href={heroCopy.cta.href}
              className="label-gcb text-ink border-ink/30 hover:border-ink/70 inline-flex items-center gap-3 border-b pb-2 transition-colors"
            >
              {heroCopy.cta.label}
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </div>

      <HeroScrollCue />
    </section>
  );
}
