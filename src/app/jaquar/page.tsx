import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { JaquarHero } from "@/components/sections/jaquar/jaquar-hero";
import { SkuDecoder } from "@/components/sections/jaquar/sku-decoder";
import { SpecTable } from "@/components/sections/jaquar/spec-table";
import { FaqAccordion } from "@/components/sections/quartz/faq-accordion";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import { jaquarCategories } from "@/config/jaquar";
import {
  WARRANTY_FOOTNOTE,
  careRules,
  catalogueSections,
  hotWaterWarranty,
  jaquarEntity,
  warrantyMatrix,
} from "@/config/jaquar-catalogue";
import { catalogueTotal } from "@/config/jaquar-products";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    // Kerakoll lesson: authority claim + category enumeration in the title.
    absolute: "Jaquar Authorized Dealer UAE - Faucets, Basins, Showers",
  },
  description:
    "Authorized Jaquar dealer in the UAE - faucets, basins, WCs, showers, wellness and water heaters from Sharjah stock. 1,480 products with SKUs, AED trade pricing.",
  alternates: { canonical: "/jaquar" },
};

const faqs = [
  {
    q: "Is Global Classic an authorized Jaquar dealer in the UAE?",
    a: "Yes - Global Classic Building Material LLC supplies Jaquar bathroom fittings as an authorized dealer, wholesale from Sharjah, with delivery across the whole of the UAE. Jaquar's own guidance is to purchase from authorized dealers only.",
  },
  {
    q: "What does Jaquar make?",
    a: "Complete bathroom solutions from the group founded in 1960: faucets (125,000 taps a day), sanitaryware, showers, shower enclosures, whirlpools, bathtubs, flushing systems, spas, saunas, steam solutions, accessories and water heaters - across three tiers: Artize (luxury), Jaquar (premium) and Essco (value).",
  },
  {
    q: "Is the Jaquar warranty honoured in the UAE?",
    a: "Yes, on the printed per-part terms: 10 years on faucet metal parts, braided hoses, flush valves and ceramic bodies; 5 years on colour finishes, sensor faucets, UF seats and wellness bodies; tiered terms on water heaters. Serviced through Jaquar's UAE network (toll-free 800-527827) with Global Classic handling supply paperwork - the full table is published on this page.",
  },
  {
    q: "Do you give trade pricing on Jaquar products?",
    a: "Yes - wholesale is the core of what we do. Send a BOQ or a list of Jaquar SKUs (WhatsApp works) and AED volume pricing comes back usually within one working day, quoted against live Sharjah stock.",
  },
  {
    q: "Which Jaquar finishes can you supply?",
    a: "The full premium finish card: Chrome, Gold Bright PVD, Gold Matt PVD, Blush Gold Bright PVD, Antique Bronze, Antique Copper, Black Chrome, Black Matt, Graphite and Stainless Steel on faucets and showers, plus five ceramic finishes on sanitaryware.",
  },
  {
    q: "Can you supply full projects - hotels, towers, villas?",
    a: "That is the shape of most of our Jaquar orders: project quantities across faucets, sanitaryware, showers and enclosures, coordinated to site or fabrication workshop anywhere in the UAE.",
  },
  {
    q: "Where can I see Jaquar products in person?",
    a: "Visit our Sharjah warehouse (Al Sajaa) for stocked lines, or Jaquar World Dubai on Sheikh Zayed Road, Al Quoz 3 - and send us the SKUs you shortlist for AED trade pricing.",
  },
];

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Jaquar", href: "/jaquar" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd(crumbs),
    {
      "@type": "Brand",
      name: "Jaquar",
      url: `${siteConfig.url}/jaquar`,
      sameAs: ["https://uae.jaquar.com", "https://www.jaquar.com"],
    },
    {
      "@type": "ItemList",
      name: "Jaquar categories supplied by Global Classic",
      numberOfItems: jaquarCategories.length,
      itemListElement: jaquarCategories.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `Jaquar ${c.label}`,
        url: `${siteConfig.url}/jaquar/${c.slug}`,
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

export default function JaquarPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ---------- Hero ---------- */}
      <section className="pt-40 pb-20">
        <Container>
          <Breadcrumb items={crumbs} />

          <SplitHeading
            as="h1"
            className="font-display text-phi-4 mt-8 max-w-4xl tracking-tight text-balance"
          >
            Jaquar bathroom fittings, stocked in the UAE.
          </SplitHeading>

          {/* Answer-first + entity disambiguation: bathrooms, not cars */}
          <Reveal className="mt-8 max-w-2xl">
            <p className="text-lg leading-relaxed">
              Global Classic is an authorized dealer of Jaquar bathroom fittings
              in the UAE - faucets and taps, wash basins, water closets,
              showers and enclosures, wellness and water heaters from the group
              that delivers <strong>3.6 million bathrooms a year</strong>.{" "}
              <strong>{catalogueTotal.toLocaleString()} catalogued products</strong>{" "}
              with SKUs on this site, supplied wholesale from Sharjah in bulk
              and project quantities only - AED trade pricing against the BOQ,
              with Jaquar&apos;s printed warranty terms behind every range.
            </p>
          </Reveal>

          {/* Stat strip */}
          <Reveal delay={0.15}>
            <dl className="border-border/40 mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border sm:grid-cols-4">
              {[
                ["65+", "years of manufacturing prowess"],
                ["55+", "countries with Jaquar presence"],
                ["125,000", "taps produced every day"],
                ["8", "plants over 330,000 m2"],
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

      {/* ---------- Hero film ---------- */}
      <section aria-label="Jaquar rain shower film" className="pb-4">
        <JaquarHero />
      </section>

      {/* ---------- The ten categories ---------- */}
      <section className="py-24">
        <Container>
          <p className="label-gcb text-muted">The range</p>
          <h2 className="font-display text-phi-3 mt-4 max-w-2xl tracking-tight text-balance">
            Six categories, one printed warranty card.
          </h2>
          <RuleIn className="mt-8 w-full max-w-3xl" />

          <div className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {jaquarCategories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 0.05}>
                <Link href={`/jaquar/${category.slug}`} className="group block">
                  <span className="border-warm-black bg-ink relative block aspect-[4/3] overflow-hidden rounded-xl border">
                    <Image
                      src={`/jaquar/categories/${category.slug}.webp`}
                      alt={`Jaquar ${category.label} - official product photograph`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </span>
                  <span className="mt-4 flex items-baseline justify-between gap-3">
                    <span className="font-display group-hover:text-bronze text-phi-2 leading-tight transition-colors">
                      {category.label}
                    </span>
                    <span className="text-muted shrink-0 text-sm">
                      {category.collections.length} collections →
                    </span>
                  </span>
                  <span className="text-muted mt-1.5 block text-sm leading-relaxed">
                    {category.intro.split(" - ")[0]}.
                  </span>
                </Link>
              </Reveal>
            ))}

            {/* Showroom card completes the grid */}
            <Reveal delay={0.25}>
              <div className="border-warm-black bg-warm-black text-ink grain-gcb relative flex aspect-auto h-full flex-col justify-between overflow-hidden rounded-xl border p-7">
                <div className="relative z-10">
                  <p className="label-gcb text-bronze">See it in person</p>
                  <p className="font-display mt-3 text-2xl leading-tight">
                    Sharjah stock, Dubai showroom.
                  </p>
                  <p className="text-ink/70 mt-4 text-sm leading-relaxed">
                    Stocked lines at our Al Sajaa warehouse; the full brand
                    experience at Jaquar World Dubai, Sheikh Zayed Road, Al Quoz
                    3.
                  </p>
                </div>
                <div className="relative z-10 mt-6">
                  <GcbButton href="/contact" size="sm" variant="dark">
                    Plan a visit
                  </GcbButton>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- The SKU decoder - Jaquar's signature element ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">Read the code</p>
          <h2 className="font-display text-phi-3 mt-4 max-w-2xl tracking-tight text-balance">
            Every Jaquar SKU is a spec sheet. Decode it.
          </h2>
          <div className="mt-12">
            <SkuDecoder />
          </div>
        </Container>
      </section>

      {/* ---------- Warranty / Jaquar Care ---------- */}
      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.618fr_1fr] lg:items-center">
            <div>
              <p className="label-gcb text-muted">Jaquar Care</p>
              <h2 className="font-display text-phi-3 mt-4 max-w-xl tracking-tight text-balance">
                Ten years on paper, serviced in the UAE.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed">
                Ten years on faucet metal parts, braided hoses, flush valves
                and ceramic bodies; five on colour finishes, sensor
                electronics, UF seats and wellness bodies - the full per-part
                table from Jaquar&apos;s printed warranty card is published
                below, backed by the UAE service line (toll-free 800-527827)
                and cartridges tested for half a million cycles. Buy through an
                authorized dealer and the paperwork simply works.
              </p>
              <ul className="mt-10 flex flex-wrap gap-3">
                {[
                  "10 yr faucet metal parts & ceramic bodies",
                  "10 yr flush valves",
                  "5 yr colour finishes & sensor",
                  "UAE service: 800-527827",
                ].map((chip) => (
                  <li
                    key={chip}
                    className="border-border/50 rounded-full border px-4 py-2 text-sm"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="border-warm-black relative aspect-[3/4] overflow-hidden rounded-xl border">
              <Image
                src="/jaquar/scenes/faucets.webp"
                alt="Chrome Jaquar-style basin mixer with arcing water against a dark green wall"
                fill
                quality={90}
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </figure>
          </div>
        </Container>
      </section>

      {/* ---------- The catalogue, by section ---------- */}
      <section className="border-border/30 border-t py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.618fr] lg:items-start">
            <div>
              <p className="label-gcb text-muted">The source, downloadable</p>
              <h2 className="font-display text-phi-3 mt-4 tracking-tight text-balance">
                The 2025-2026 catalogue, split by section.
              </h2>
              <p className="text-muted mt-6 max-w-md leading-relaxed">
                Every product table on this site cites its printed catalogue
                page. Download the section you are specifying from - the
                official Jaquar Global Bath Catalogue, 364 pages, split so the
                BOQ annex stays light.
              </p>
            </div>
            <ul className="divide-border/30 border-border/30 divide-y border-y">
              {catalogueSections.map((section) => (
                <li key={section.file}>
                  <a
                    href={`/jaquar/catalogue/${section.file}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-6 py-3.5"
                  >
                    <span className="font-display group-hover:text-bronze text-lg leading-tight transition-colors">
                      {section.label}
                    </span>
                    <span className="text-muted shrink-0 text-xs">
                      {section.pages} · PDF {section.size}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ---------- The warranty, in print ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">Honest, per part</p>
          <h2 className="font-display text-phi-3 mt-4 max-w-2xl tracking-tight text-balance">
            The warranty table, exactly as Jaquar prints it.
          </h2>
          <p className="text-ink/70 mt-6 max-w-2xl leading-relaxed">
            No UAE reseller publishes this. Transcribed from the printed
            warranty card (catalogue p360) - so a BOQ is specified on the real
            terms, not a blanket claim.
          </p>
          <div className="mt-12 grid gap-14 lg:grid-cols-[1.618fr_1fr]">
            <SpecTable
              caption="Jaquar warranty matrix"
              head={["Category", "Product or part", "Years"]}
              rows={warrantyMatrix.map((r) => [r.category, r.part, r.years])}
              footnote={WARRANTY_FOOTNOTE}
              minWidth={560}
            />
            <div>
              <h3 className="label-gcb text-bronze">Hot water solutions</h3>
              <div className="mt-5">
                <SpecTable
                  caption="Jaquar hot water warranty matrix"
                  head={["Line", "Tank", "Element", "Spares"]}
                  rows={hotWaterWarranty.map((r) => [
                    r.line,
                    r.tank,
                    r.element,
                    r.spares,
                  ])}
                  minWidth={380}
                />
              </div>
              <h3 className="label-gcb text-bronze mt-10">
                Care, per the printed guidelines
              </h3>
              <ul className="mt-5 space-y-2.5">
                {careRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="bg-bronze mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    <span className="text-ink/80 text-sm leading-relaxed">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- The maker ---------- */}
      <section className="py-24">
        <Container>
          <p className="label-gcb text-muted">Behind the brand</p>
          <h2 className="font-display text-phi-3 mt-4 max-w-2xl tracking-tight text-balance">
            The first Indian company to win a Red Dot.
          </h2>
          <figure className="border-warm-black relative mt-12 aspect-[21/9] overflow-hidden rounded-xl border">
            <Image
              src="/jaquar/hub/banner.webp"
              alt="Editorial banner - chrome basin mixer on a long marble vanity against a deep onyx green wall"
              fill
              quality={90}
              sizes="(min-width: 1536px) 1400px, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </figure>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.618fr] lg:items-start">
            <figure className="border-warm-black relative hidden aspect-[3/4] overflow-hidden rounded-xl border lg:block">
              <Image
                src="/jaquar/hub/editorial-wc.webp"
                alt="Wall-hung white ceramic WC in a marble bathroom with an onyx green niche"
                fill
                quality={90}
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </figure>
            <dl className="divide-border/30 border-border/30 divide-y border-y">
              {[
                ["Manufacturing", jaquarEntity.plants],
                ["Output", jaquarEntity.fittingsPerYear],
                ["Headquarters", jaquarEntity.hq],
                ["Design", jaquarEntity.redDot],
                ["Designers", jaquarEntity.designers],
                ["Group brands", jaquarEntity.groupBrands],
                ["In Dubai", jaquarEntity.dubai],
                ["Certification", jaquarEntity.esma],
                ["Sustainability", jaquarEntity.sustainability],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className="grid gap-2 py-4 sm:grid-cols-[1fr_1.618fr] sm:gap-6"
                >
                  <dt className="label-gcb text-muted">{term}</dt>
                  <dd className="text-sm leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* ---------- Supply across the Emirates ---------- */}
      <section className="bg-verde text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-travertine">Wholesale supply</p>
          <h2 className="font-display text-phi-3 mt-4 max-w-2xl tracking-tight text-balance">
            One dealer. Every emirate.
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.618fr_1fr]">
            <p className="text-ink/85 max-w-2xl text-lg leading-relaxed">
              Global Classic supplies Jaquar bathroom fittings wholesale from
              the Al Sajaa warehouse in Sharjah, with delivery across the whole
              of the UAE: Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras
              Al Khaimah and Fujairah. Contractors, developers and fit-out
              companies send the BOQ; AED pricing comes back usually within one
              working day.
            </p>
            <ul className="space-y-3">
              {[
                "AED trade and project pricing on request",
                "Full finish card incl. PVD golds on order",
                "Warranty paperwork handled with supply",
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

      {/* ---------- FAQ ---------- */}
      <section className="border-border/30 border-t py-24">
        <Container>
          <p className="label-gcb text-muted">Questions, answered</p>
          <h2 className="font-display text-phi-3 mt-4 tracking-tight">
            Jaquar in the UAE, in plain terms.
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
              Specifying Jaquar for a project?
            </h2>
            <p className="text-ink/70 mt-2 max-w-md">
              SKU-level AED pricing from Sharjah stock - usually within one
              working day.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <GcbButton href="/contact" size="md" variant="dark">
              Request pricing
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
