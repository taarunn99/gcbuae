import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import marbleHero from "@/assets/kalingastone-marble-hero.webp";
import quartzHero from "@/assets/kalingastone-quartz-hero.webp";
import terrazzoHero from "@/assets/kalingastone-terrazzo-hero.webp";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { AuthorizedDistributor } from "@/components/sections/products/authorized-distributor";
import { FaqAccordion } from "@/components/sections/quartz/faq-accordion";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  kalingaStoneMaterials,
  kalingaStoneShadeTotal,
} from "@/config/kalingastone";
import { siteConfig } from "@/config/site";

/**
 * The KalingaStone brand hub - the page behind the "KalingaStone" crumb on
 * every stone page, and the Brands entry point next to the product-line
 * index. Owns the brand query family ("kalingastone UAE", "kalingastone
 * dealer") the way /jaquar owns its brand. Every fact here is already
 * published on the pillar pages.
 */

export const metadata: Metadata = {
  title: {
    absolute: "KalingaStone UAE - Authorized Reseller | Global Classic",
  },
  description:
    "KalingaStone engineered quartz, marble and terrazzo in the UAE - 128 shades by Classic Marble Company, stocked in Sharjah by Global Classic, an authorized reseller for the Northern Emirates. Trade pricing, delivery to every emirate.",
  alternates: { canonical: "/kalingastone" },
};

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "KalingaStone", href: "/kalingastone" },
];

const heroBySlug = {
  quartz: quartzHero,
  marble: marbleHero,
  terrazzo: terrazzoHero,
} as const;

const faqs = [
  {
    q: "Who makes KalingaStone?",
    a: "KalingaStone is the engineered stone brand of Classic Marble Company (CMC), produced at its 200,000 m² plant in Silvassa, India, on fully automated lines with SIMEC (Italy) polishing. The brand spans engineered quartz, engineered marble and terrazzo, exported to 66 countries.",
  },
  {
    q: "Is Global Classic an authorized KalingaStone reseller?",
    a: "Yes - in writing. Global Classic Building Material Trading LLC is certified by Grani Marmo Classic LLC as an authorized reseller of KalingaStone products for the Northern Emirates, UAE. The letter is published on this site and travels with our quotations.",
  },
  {
    q: "What materials does KalingaStone make?",
    a: "Three engineered ranges: Quartz (69 shades across seven series, NSF food safe, Microban® options), Marble (35 shades across five series in 304 × 125 cm slabs) and Terrazzo (24 shades across five collections, Class A1 fire rated, exterior grade, with fluted panels).",
  },
  {
    q: "Which KalingaStone material should I specify?",
    a: "Quartz for kitchens, counters and food-contact surfaces - non-porous and NSF certified. Marble for lobbies, walls and bookmatched statements at engineered consistency. Terrazzo where the A1 fire class, exterior use or the aggregate look is the requirement. Each range has its own page with the full catalogue.",
  },
  {
    q: "Do you deliver KalingaStone slabs across the UAE?",
    a: "Yes. Slabs are held in stock at Global Classic's Al Sajaa warehouse in Sharjah and delivered to every emirate - Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah. Supply is wholesale, with AED volume pricing quoted usually within one working day.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd(crumbs),
    {
      "@type": "Brand",
      name: "KalingaStone",
      url: `${siteConfig.url}/kalingastone`,
      sameAs: ["https://www.kalingastone.com"],
    },
    {
      "@type": "ItemList",
      name: "KalingaStone materials supplied by Global Classic",
      numberOfItems: kalingaStoneMaterials.length,
      itemListElement: kalingaStoneMaterials.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `KalingaStone ${m.label}`,
        url: `${siteConfig.url}${m.href}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function KalingaStonePage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ---------- Masthead ---------- */}
      <section className="pt-40 pb-20">
        <Container>
          <Breadcrumb items={crumbs} />

          <SplitHeading
            as="h1"
            className="font-display text-phi-4 mt-8 max-w-4xl tracking-tight text-balance"
          >
            KalingaStone, stocked in the UAE.
          </SplitHeading>

          {/* Answer-first paragraph for search and AI overviews */}
          <Reveal className="mt-8 max-w-2xl">
            <p className="text-lg leading-relaxed">
              KalingaStone is the engineered stone brand of Classic Marble
              Company - quartz, marble and terrazzo produced at a 200,000 m²
              plant in Silvassa and exported to 66 countries. Global Classic is
              an <strong>authorized reseller for the Northern Emirates</strong>,
              holding slabs in Sharjah stock across{" "}
              <strong>{kalingaStoneShadeTotal} shades</strong>, with wholesale
              AED pricing and delivery to every emirate.
            </p>
          </Reveal>

          {/* Stat strip */}
          <Reveal delay={0.15}>
            <dl className="border-border/40 mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border sm:grid-cols-4">
              {[
                [String(kalingaStoneShadeTotal), "shades stocked across three materials"],
                ["200,000 m²", "Classic Marble Company plant, Silvassa"],
                ["66", "export countries worldwide"],
                [">90%", "recycled material content"],
              ].map(([value, label]) => (
                <div key={label} className="bg-surface/40 px-6 py-6">
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="font-display text-foreground block text-3xl sm:text-4xl">
                      {value}
                    </span>
                    <span className="text-muted mt-1 block text-sm">
                      {label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* ---------- The three materials ---------- */}
      <section className="border-border/30 border-t py-24">
        <Container>
          <p className="label-gcb text-muted">One brand, three materials</p>
          <h2 className="font-display text-phi-3 mt-4 max-w-2xl tracking-tight text-balance">
            Quartz, marble, terrazzo - each with its own catalogue.
          </h2>
          <RuleIn className="mt-8 w-full max-w-3xl" />

          <div className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {kalingaStoneMaterials.map((material, index) => (
              <Reveal key={material.slug} delay={index * 0.05}>
                <Link href={material.href} className="group block">
                  <span className="border-warm-black relative block aspect-[4/3] overflow-hidden rounded-xl border">
                    <Image
                      src={heroBySlug[material.slug]}
                      alt={`KalingaStone ${material.label.toLowerCase()} slabs in the Global Classic warehouse`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </span>
                  <span className="mt-4 flex items-baseline justify-between gap-3">
                    <span className="font-display group-hover:text-bronze text-phi-2 leading-tight transition-colors">
                      {material.label}
                    </span>
                    <span className="text-muted shrink-0 text-sm">
                      {material.shadeCount} shades →
                    </span>
                  </span>
                  <span className="text-muted mt-1.5 block text-sm leading-relaxed">
                    {material.blurb}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <p className="text-muted mt-10 text-sm">
            Also from the terrazzo line:{" "}
            <Link
              href="/kalingastone/terrazzo/fluting"
              className="u-line text-foreground"
            >
              fluted terrazzo panels
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* ---------- The manufacture ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">Behind the brand</p>
          <h2 className="font-display text-phi-3 mt-4 max-w-2xl tracking-tight text-balance">
            One plant. Three materials. No hands.
          </h2>
          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            <div className="border-ink/15 border-t pt-5">
              <h3 className="font-display text-xl">Automated lines</h3>
              <p className="text-ink/70 mt-3 leading-relaxed">
                From raw-material feed to finished-slab stacking, production
                runs untouched by hand - 80,000 m² of quartz a month, marble
                polished past 85% gloss on SIMEC (Italy) lines. ISO 9001, ISO
                14001 and BS OHSAS 45001 certified.
              </p>
            </div>
            <div className="border-ink/15 border-t pt-5">
              <h3 className="font-display text-xl">Go Green</h3>
              <p className="text-ink/70 mt-3 leading-relaxed">
                More than 90% recycled raw material and continuous water re-use
                across processes - engineered stone with a lighter footprint
                than quarrying it.
              </p>
            </div>
            <div className="border-ink/15 border-t pt-5">
              <h3 className="font-display text-xl">Proven in the Gulf</h3>
              <p className="text-ink/70 mt-3 leading-relaxed">
                KalingaStone surfaces stand in Dubai&rsquo;s Burj Khalifa
                International and Il Villaggio, Doha&rsquo;s Pullman twin
                towers, and hotels from Bahrain to Kuwait - among references
                across 66 countries.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Supply across the Emirates ---------- */}
      <section className="bg-verde text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-travertine">Wholesale supply</p>
          <h2 className="font-display text-phi-3 mt-4 max-w-2xl tracking-tight text-balance">
            One reseller. Every emirate.
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.618fr_1fr]">
            <p className="text-ink/85 max-w-2xl text-lg leading-relaxed">
              Global Classic supplies KalingaStone wholesale from the Al Sajaa
              warehouse in Sharjah, with delivery across the whole of the UAE:
              Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah
              and Fujairah. Contractors, developers, fabricators and decor
              companies buy slabs by the project, with availability confirmed
              against live stock.
            </p>
            <ul className="space-y-3">
              {[
                "Ex-stock slabs - no import lead time on stocked shades",
                "AED trade and project pricing on request",
                "Samples for specification and client approval",
                "Mon-Sat - 8:00-18:00",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="bg-bronze mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  />
                  <span className="text-ink/85 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ---------- The authorization letter ---------- */}
      <AuthorizedDistributor />

      {/* ---------- FAQ ---------- */}
      <section className="py-24">
        <Container>
          <p className="label-gcb text-muted">Questions, answered</p>
          <h2 className="font-display text-phi-3 mt-4 tracking-tight">
            KalingaStone in the UAE, in plain terms.
          </h2>
          <div className="mt-12 max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-20">
        <Container className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl leading-tight">
              Specifying KalingaStone for a project?
            </h2>
            <p className="text-ink/70 mt-2 max-w-md">
              Slab availability, samples and volume pricing from Sharjah stock -
              usually within one working day.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <GcbButton href="/contact" size="md" variant="dark">
              Request availability
            </GcbButton>
            <Link href="/products" className="u-line label-gcb text-ink/80">
              All product lines
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
