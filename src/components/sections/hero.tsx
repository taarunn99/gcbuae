import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { GcbButton } from "@/components/ui/gcb-button";
import heroCopy from "@/config/hero-copy.json";

import { HeroMedia } from "./hero-media";

/**
 * The quote sits over the fluted wall, the one region of the photograph flat
 * and dark enough to carry type. The wall is bounded by the marble corner at
 * x 21.9% and the shower's glass frame at x 65%, so its true centre is 43.5%.
 *
 * The anchor is nudged right of that to 46.5%: centring on the wall alone
 * reads as off-centre against the browser frame, since the wall itself sits
 * left of the middle. 46.5% splits the difference and still leaves clearance
 * before the glass frame. Dead centre (50%) would crowd it.
 *
 * On phones `object-position: 43.5%` crops to x 30.6-56.4%, which sits inside
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
        <div className="px-gutter mx-auto w-full max-w-[37rem] text-center lg:mx-0 lg:ml-[46.5%] lg:-translate-x-1/2">
          <SplitHeading instant
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

          <Reveal instant delay={0.75} className="mt-8">
            <p className="text-ink/80 mx-auto max-w-md text-base leading-relaxed text-balance">
              {heroCopy.subline}
            </p>
          </Reveal>

          <Reveal instant delay={0.9} className="mt-10">
            <GcbButton href={heroCopy.cta.href} size="md" variant="dark">
              {heroCopy.cta.label}&ensp;&rarr;
            </GcbButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
