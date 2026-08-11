import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { FeatureStack } from "@/components/sections/products/feature-stack";
import { IndexRows } from "@/components/sections/products/index-rows";
import { IssueOpener } from "@/components/sections/products/issue-opener";
import { IssueStats } from "@/components/sections/products/issue-stats";
import { MaterialsTicker } from "@/components/sections/products/materials-ticker";
import { ProductsVideoHero } from "@/components/sections/products-video-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Quartz, naturally engineered marble, terrazzo, showers, taps, sanitaryware, shower trays, and marble care — supplied across the UAE.",
  // Without this, the root layout's canonical ("/") is inherited and this
  // page tells Google it is a copy of the homepage. GOVERNANCE §6.
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1 pb-32">
      {/* SEO heading for the video hero (the visible word lives in the mask) */}
      <h1 className="sr-only">
        Products — KalingaStone quartz, marble and terrazzo slabs, showers,
        taps, sanitaryware and surface care, supplied across the UAE.
      </h1>

      <ProductsVideoHero />

      {/* ---------- The Materials Issue ---------- */}
      <IssueOpener />

      <MaterialsTicker />

      {/* ---------- Three feature spreads (stacking cards) ---------- */}
      <section aria-label="Feature spreads" className="pt-16 lg:pt-24">
        <FeatureStack />
      </section>

      {/* ---------- The numbers ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">This issue, in numbers</p>
          <div className="mt-12">
            <IssueStats />
          </div>
        </Container>
      </section>

      {/* ---------- The Index ---------- */}
      <section className="py-24">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="font-display text-phi-3 tracking-tight">
                The index.
              </h2>
              <p className="label-gcb text-muted">Eight lines · tap any row</p>
            </div>
          </Reveal>

          <div className="mt-12">
            <IndexRows />
          </div>

          <Reveal className="mt-16">
            <p className="text-muted max-w-xl leading-relaxed">
              Detailed collections, finishes and technical sheets are being
              prepared for the remaining lines. For specifications or
              availability today,{" "}
              <Link href="/contact" className="u-line text-foreground">
                talk to us
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
