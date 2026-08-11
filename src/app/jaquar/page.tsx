import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import heroImage from "@/assets/jaquar-hero.webp";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SkuDecoder } from "@/components/sections/jaquar/sku-decoder";
import { FaqAccordion } from "@/components/sections/quartz/faq-accordion";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import { jaquarCategories } from "@/config/jaquar";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: "Jaquar Dealer UAE - Bathroom Fittings | Global Classic" },
  description:
    "Authorized Jaquar dealer in the UAE - faucets, sanitaryware, showers, shower enclosures and whirlpools from Sharjah stock. 10-year warranty, trade pricing in AED, delivery to every emirate.",
  alternates: { canonical: "/jaquar" },
};

const faqs = [
  {
    q: "Is Global Classic an authorized Jaquar dealer in the UAE?",
    a: "Yes - Global Classic Building Material LLC supplies Jaquar bathroom fittings as an authorized dealer, wholesale from Sharjah, with delivery across the whole of the UAE. Jaquar's own guidance is to purchase from authorized dealers only.",
  },
  {
    q: "What does Jaquar make?",
    a: "Complete bathroom solutions from the group founded in 1960: faucets (125,000 taps a day), sanitaryware (4.8 million pieces a year), showers, shower enclosures, whirlpools and more - across three tiers: Artize (luxury), Jaquar (premium) and Essco (value).",
  },
  {
    q: "Is the Jaquar warranty honoured in the UAE?",
    a: "Yes. Faucets and sanitaryware carry a 10-year warranty, showers up to 10 years and enclosure hardware 5 years, serviced through Jaquar's UAE network (toll-free 800-527827) with Global Classic handling supply paperwork.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Jaquar",
          item: `${siteConfig.url}/jaquar`,
        },
      ],
    },
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
          <nav aria-label="Breadcrumb" className="label-gcb text-muted">
            <Link href="/" className="u-line">
              Home
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span className="text-foreground">Jaquar</span>
          </nav>

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
              in the UAE - faucets, sanitaryware, showers, shower enclosures and
              whirlpools from the group that delivers{" "}
              <strong>3.6 million bathrooms a year</strong>. Wholesale supply
              from Sharjah, AED trade pricing on request, delivery to every
              emirate, and Jaquar&apos;s <strong>10-year warranty</strong>{" "}
              behind the premium ranges.
            </p>
          </Reveal>

          {/* Stat strip */}
          <Reveal delay={0.15}>
            <dl className="border-border/40 mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border sm:grid-cols-4">
              {[
                ["1960", "founded - six decades of bathware"],
                ["55+", "countries with Jaquar presence"],
                ["125,000", "taps produced every day"],
                ["10 yr", "warranty on faucets & sanitaryware"],
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

      {/* ---------- Hero image ---------- */}
      <section aria-label="Jaquar bathroom" className="pb-4">
        <div className="relative overflow-hidden">
          <Image
            src={heroImage}
            alt="Luxury UAE bathroom with freestanding bathtub, chrome floor-standing faucet and a deep green accent wall"
            sizes="100vw"
            quality={90}
            className="h-auto w-full"
            placeholder="blur"
            preload
          />
        </div>
      </section>

      {/* ---------- The five categories ---------- */}
      <section className="py-24">
        <Container>
          <p className="label-gcb text-muted">The range</p>
          <h2 className="font-display text-phi-3 mt-4 max-w-2xl tracking-tight text-balance">
            Five categories, one warranty card.
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
                Faucets and sanitaryware carry a 10-year warranty; showers up to
                10 years; enclosure hardware and rollers 5 years - backed by
                Jaquar&apos;s UAE service line (toll-free 800-527827) and
                cartridges tested for half a million cycles. Buy through an
                authorized dealer and the paperwork simply works.
              </p>
              <ul className="mt-10 flex flex-wrap gap-3">
                {[
                  "10 yr faucets & sanitaryware",
                  "Up to 10 yr showers",
                  "5 yr enclosure hardware",
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
