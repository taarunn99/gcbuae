import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";

/**
 * The Journal masthead - the blog's front door while the first issue is
 * written (owner, 2026-08-18). noindex until real articles ship so a
 * thin page never enters the index (GOVERNANCE §7); flip robots when
 * the first piece is published.
 */
export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Field notes from the slab trade - specifications, installs and the science of stone, written from the Al Sajaa warehouse. First issue in progress.",
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: true },
};

const UPCOMING = [
  {
    title: "How to read a quartz spec sheet",
    standfirst:
      "Flexural strength, water absorption, NSF - what the numbers permit you to build.",
  },
  {
    title: "Book-matching marble: approving the lot",
    standfirst:
      "Why specifiers sign off slabs on the rack, and what to look for when you do.",
  },
  {
    title: "Terrazzo underfoot: the case for block-form",
    standfirst:
      "Class A1 fire ratings, exterior grades and the fluting nobody else stocks.",
  },
];

export default function BlogPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1 pt-40 pb-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-gcb text-muted">The Journal · Global Classic</p>
            <p className="label-gcb text-muted">First issue in progress</p>
          </div>
          <RuleIn className="mt-4 w-full" />
        </Reveal>

        <SplitHeading
          as="h1"
          className="font-display text-phi-4 mt-12 max-w-4xl tracking-tight text-balance"
        >
          Field notes from the slab trade.
        </SplitHeading>

        <Reveal>
          <p className="text-muted mt-8 max-w-xl leading-relaxed">
            Written from the warehouse, not the newsroom - specifications,
            installs and the science of stone. The first pieces are on the
            desk now.
          </p>
        </Reveal>

        <div className="divide-warm-black/15 border-warm-black/15 mt-16 divide-y border-y">
          {UPCOMING.map((piece, i) => (
            <Reveal key={piece.title} delay={i * 0.08}>
              <article className="grid gap-3 py-8 lg:grid-cols-[1.618fr_1fr] lg:items-baseline">
                <h2 className="font-display text-phi-2 tracking-tight">
                  {piece.title}
                </h2>
                <div>
                  <p className="text-muted leading-relaxed">
                    {piece.standfirst}
                  </p>
                  <p className="label-gcb text-bronze mt-3">In progress</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center gap-3">
          <GcbButton href="/contact" size="md" variant="porcelain">
            Ask us directly
          </GcbButton>
          <Link href="/about" className="u-line label-gcb text-foreground/80">
            Back to About →
          </Link>
        </Reveal>
      </Container>
    </main>
  );
}
