import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1 pt-40 pb-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-gcb text-muted">About · Global Classic</p>
            <p className="label-gcb text-muted">Est. 2024 - Sharjah, UAE</p>
          </div>
          <RuleIn className="mt-4 w-full" />
        </Reveal>

        <SplitHeading
          as="h1"
          className="font-display text-phi-4 mt-12 max-w-4xl tracking-tight text-balance"
        >
          Classic is not an era. It is a standard we supply to.
        </SplitHeading>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.618fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="dropcap text-phi-1 max-w-2xl leading-relaxed font-light">
                {siteConfig.description}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-muted mt-10 max-w-xl leading-relaxed">
                Global Classic Building Material LLC is a sister company of the
                Lapiz Group of Companies, holding stock at the Al Sajaa
                warehouse in Sharjah and supplying wholesale across the whole of
                the UAE - contractors, developers, fabricators and decor
                companies. Three partners define the shelf: KalingaStone
                engineered stone by Classic Marble Company, Jaquar bathware, and
                FILA surface care.
              </p>
            </Reveal>

            <Reveal
              delay={0.2}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <GcbButton href="/contact" size="md">
                Talk to us
              </GcbButton>
              <Link
                href="/products"
                className="u-line label-gcb text-foreground/80"
              >
                The Materials Issue →
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <dl className="border-warm-black divide-warm-black/20 divide-y border-t">
              {[
                [
                  "Stock",
                  "Al Sajaa, Sharjah - ex-stock slabs, UAE-wide delivery",
                ],
                [
                  "Stone",
                  "KalingaStone quartz · marble · terrazzo - 128 shades",
                ],
                ["Water", "Jaquar showers, taps, sanitaryware, trays"],
                ["Care", "FILA sealers & cleaners, matched to every stone"],
                ["Group", "Sister company of the Lapiz Group of Companies"],
              ].map(([term, detail]) => (
                <div key={term} className="py-4">
                  <dt className="label-gcb text-bronze">{term}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed">{detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </main>
  );
}
