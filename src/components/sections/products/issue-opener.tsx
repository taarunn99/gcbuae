import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { Container } from "@/components/ui/container";

/**
 * The magazine masthead spread - golden-section grid (1.618fr / 1fr),
 * phi-scale display type in a staggered break, drop-cap standfirst,
 * the issue-cover photograph with a rotated folio caption. Server
 * component; every word in the HTML.
 */
export function IssueOpener() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-gcb text-muted">
              GCB · The Materials Issue - Vol. 01
            </p>
            <p className="label-gcb text-muted">Sharjah, UAE</p>
          </div>
          <RuleIn className="mt-4 w-full" />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.618fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              {/* Staggered magazine break: the second line indents by 1/phi */}
              <h2 className="font-display text-phi-4 tracking-tight text-balance">
                <span className="block">Eight ways a room</span>
                <span className="block">
                  becomes <em className="italic">permanent.</em>
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="dropcap text-phi-1 mt-12 max-w-2xl leading-relaxed font-light">
                Materials are the only part of a building the owner touches
                every day. This issue is the whole Global Classic range read
                cover to cover - three KalingaStone catalogues of stone, the
                water lines that serve them, and the care that keeps every
                surface at opening-day gloss.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-muted mt-10 max-w-xl leading-relaxed">
                128 shades of engineered stone across quartz, marble and
                terrazzo · Jaquar showers, taps and sanitaryware · FILA sealers
                and cleaners - stocked in Sharjah, delivered across the whole of
                the UAE, wholesale.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative">
            <figure className="border-warm-black relative aspect-[3/4] overflow-hidden rounded-xl border">
              <Image
                src="/products/editorial/issue-cover.webp"
                alt="A stack of stone sample slabs - marble, quartz and terrazzo - with a sage linen bookmark, styled like a stack of magazines"
                fill
                quality={90}
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </figure>
            {/* Rotated folio caption, magazine-style */}
            <span
              aria-hidden
              className="label-gcb text-muted absolute top-1/2 -right-6 hidden origin-center -translate-y-1/2 rotate-90 whitespace-nowrap lg:block"
            >
              The collection, in print - Vol. 01
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
