import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { GroupDeck } from "@/components/sections/about/group-deck";
import { JournalTeaser } from "@/components/sections/about/journal-teaser";
import { IssueStats } from "@/components/sections/products/issue-stats";
import { MaterialsTicker } from "@/components/sections/products/materials-ticker";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us - Lapiz Group, Sharjah",
  description:
    "A 2024 Sharjah company in the Lapiz Group - KalingaStone slabs, Jaquar and FILA stocked at Al Sajaa for project buyers and BOQ supply across the UAE.",
  alternates: { canonical: "/about" },
};

/** AboutPage schema naming the company and its group (GOVERNANCE §6). */
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Global Classic Building Materials",
  url: `${siteConfig.url}/about`,
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.legalName,
    foundingDate: "2024",
    parentOrganization: { "@type": "Organization", name: "Lapiz Group of Companies" },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
  },
};

const ABOUT_STATS = [
  { value: 2024, label: "the year the shelf opened in Sharjah" },
  { value: 3, label: "brand partners: KalingaStone, Jaquar, FILA" },
  { value: 128, label: "stone shades held as full slabs" },
  { value: 7, label: "emirates served from one warehouse" },
];

export default function AboutPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1 pt-40 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Masthead - the issue-opener language with the family figure */}
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-gcb text-muted">About · Global Classic</p>
            <p className="label-gcb text-muted">Est. 2024 - Sharjah, UAE</p>
          </div>
          <RuleIn className="mt-4 w-full" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.618fr_1fr] lg:gap-16">
          <div>
            <SplitHeading
              as="h1"
              className="font-display text-phi-4 max-w-4xl tracking-tight text-balance"
            >
              Classic is not an era. It is a standard we supply to.
            </SplitHeading>

            <Reveal className="mt-14">
              <p className="dropcap text-phi-1 max-w-2xl leading-relaxed font-light">
                {siteConfig.description}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-muted mt-10 max-w-xl leading-relaxed">
                Global Classic Building Materials LLC is a sister company of
                the Lapiz Group of Companies, holding stock at the Al Sajaa
                warehouse in Sharjah and supplying wholesale across the whole
                of the UAE - contractors, developers, fabricators and interior
                design companies. Three partners define the shelf: KalingaStone
                engineered stone by Classic Marble Company, Jaquar bathware,
                and FILA surface care.
              </p>
            </Reveal>

            <Reveal
              delay={0.2}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <GcbButton href="/contact" size="md" variant="porcelain">
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

          {/* Starts at the top, right after the rule line; sticky rides
              down with the scroll and is BOUNDED by this column - it can
              never run into the ticker below. */}
          <div className="relative">
            <figure className="relative lg:sticky lg:top-28">
              <div className="border-warm-black relative aspect-[3/4] overflow-hidden border">
                <Image
                  src="/home/about-family.webp"
                  alt="Two generations resting their hands on a veined marble slab edge"
                  fill
                  sizes="(min-width: 1024px) 30rem, 100vw"
                  quality={90}
                  className="object-cover"
                  preload
                  fetchPriority="high"
                />
              </div>
              <figcaption className="label-gcb text-muted absolute top-24 -right-6 origin-top-left rotate-90 whitespace-nowrap">
                A family trade, cut in stone
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>

      {/* Running head */}
      <div className="mt-24">
        <MaterialsTicker
          items={["Est. 2024", "Al Sajaa", "Three Brands", "Seven Emirates", "One Family"]}
        />
      </div>

      {/* The story spread + numbers */}
      <Container>
        <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.618fr] lg:gap-16">
          <Reveal>
            <figure className="relative">
              <div className="border-warm-black relative aspect-[3/4] overflow-hidden border">
                <Image
                  src="/home/about-racks.webp"
                  alt="Quartz and marble slabs standing on A-frame racks in morning light"
                  fill
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  quality={90}
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="label-gcb text-muted mt-3">
                The Al Sajaa racks - every shade held as full slabs
              </figcaption>
            </figure>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="font-display text-phi-3 max-w-xl tracking-tight text-balance">
                New name. Old discipline.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-phi-1 mt-8 max-w-2xl leading-relaxed font-light">
                We opened in 2024 inside a family that has traded construction
                materials across the Emirates for years. No legacy photographs
                yet - just full racks, written authorizations and a habit of
                answering BOQs within a working day.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-muted mt-6 max-w-xl leading-relaxed">
                The model is deliberately narrow: hold the slabs, know the
                shades, price the volume, deliver to any emirate. Application
                belongs to our sister company 60 Newton and the brands&apos;
                authorized applicators, so the material and the workmanship
                both stay warrantable.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="bg-warm-black mt-12 rounded-3xl p-8 sm:p-10">
              <IssueStats stats={ABOUT_STATS} />
            </Reveal>
          </div>
        </div>
      </Container>

      {/* The Journal - the blog's advance notice */}
      <div className="mt-24">
        <JournalTeaser />
      </div>

      {/* The Lapiz Group fan deck */}
      <Container>
        <div className="mt-24">
          <div className="text-center">
            <p className="label-gcb text-muted">The group</p>
            <h2 className="font-display text-phi-3 mt-3 tracking-tight">
              One family, five companies.
            </h2>
          </div>
          <div className="mt-12">
            <GroupDeck />
          </div>
          <p className="text-muted mx-auto mt-14 max-w-xl text-center leading-relaxed">
            Global Classic is the stone shelf of the Lapiz Group - chemicals,
            coatings, materials and application under one family, each with
            its own trade counter.
          </p>
        </div>
      </Container>
    </main>
  );
}
