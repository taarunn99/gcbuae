import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { BrandCarousel } from "@/components/sections/products/brand-carousel";
import { FeatureStack } from "@/components/sections/products/feature-stack";
import { IndexRows } from "@/components/sections/products/index-rows";
import { IssueOpener } from "@/components/sections/products/issue-opener";
import { IssueStats } from "@/components/sections/products/issue-stats";
import { MaterialsTicker } from "@/components/sections/products/materials-ticker";
import { ProductsVideoHero } from "@/components/sections/products-video-hero";
import { AuthorizedDistributor } from "@/components/sections/products/authorized-distributor";
import { ProfileBook } from "@/components/sections/products/profile-book";
import { ReachUs } from "@/components/sections/products/reach-us";
import { WhatsAppPlugin } from "@/components/sections/products/whatsapp-plugin";
import { ContactForm } from "@/app/contact/contact-form";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Quartz, naturally engineered marble, terrazzo, faucets and taps, wash basins, water closets, showers and enclosures, wellness, water heaters and marble care - supplied wholesale across the UAE.",
  // Without this, the root layout's canonical ("/") is inherited and this
  // page tells Google it is a copy of the homepage. GOVERNANCE §6.
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1 pb-0">
      {/* SEO heading for the video hero (the visible word lives in the mask) */}
      <h1 className="sr-only">
        Products - KalingaStone quartz, marble and terrazzo slabs, Jaquar
        faucets and taps, wash basins, water closets, showers and enclosures,
        wellness and water heaters, and FILA surface care, supplied wholesale
        across the UAE.
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
              <div>
                <p className="label-gcb text-muted">By product line</p>
                <h2 className="font-display text-phi-3 mt-4 tracking-tight">
                  The index.
                </h2>
              </div>
              <p className="label-gcb text-muted">Ten lines · tap any row</p>
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

      {/* ---------- The Brands - character-select deck ---------- */}
      <BrandCarousel />

      {/* ---------- Certified reseller ---------- */}
      <AuthorizedDistributor />

      {/* ---------- WhatsApp - the lead line ---------- */}
      <WhatsAppPlugin />

      {/* ---------- Reach us ---------- */}
      <ReachUs />

      {/* ---------- Prefer it in writing ---------- */}
      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.618fr] lg:gap-10">
            {/* The desk - a dark card carrying the promise */}
            <div className="bg-warm-black text-ink grain-gcb relative overflow-hidden rounded-2xl p-8 sm:p-10">
              <div className="relative z-10">
                <p className="label-gcb text-bronze">Prefer it in writing?</p>
                <h2 className="font-display text-phi-3 mt-5 max-w-md tracking-tight text-balance">
                  Send the enquiry - it lands on the desk.
                </h2>
                <p className="text-ink/70 mt-6 max-w-md leading-relaxed">
                  Specifications, BOQs, availability checks - answered usually
                  within one working day.
                </p>
                <ul className="mt-10 space-y-3">
                  <li>
                    <a
                      href="mailto:info@gcbuae.com"
                      className="chip-gcb border-ink/40 inline-block rounded-full border px-5 py-2.5 text-sm"
                    >
                      info@gcbuae.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+97165312015"
                      className="chip-gcb border-ink/40 inline-block rounded-full border px-5 py-2.5 text-sm"
                    >
                      +971 6 531 2015
                    </a>
                  </li>
                </ul>
                <p
                  aria-hidden
                  className="font-display text-ink/10 pointer-events-none absolute -right-2 -bottom-8 text-[9rem] leading-none italic select-none"
                >
                  &amp;
                </p>
              </div>
            </div>

            {/* The form - on a Dust Grey sheet */}
            <div className="bg-surface/60 border-warm-black rounded-2xl border p-8 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- The company profile, as a book ---------- */}
      <ProfileBook />
    </main>
  );
}
