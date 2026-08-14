import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Flame, Layers, ShieldCheck, Utensils } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Certificates } from "@/components/sections/quartz/certificates";
import { EdgeProfiles } from "@/components/sections/quartz/edge-profiles";
import { FaqAccordion } from "@/components/sections/quartz/faq-accordion";
import { FinishExplorer } from "@/components/sections/quartz/finish-explorer";
import { LifestyleCarousel } from "@/components/sections/quartz/lifestyle-carousel";
import { MicrobanTimeline } from "@/components/sections/quartz/microban-timeline";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { QuartzShadeCompare } from "@/components/sections/quartz/shade-compare";
import { SeriesLadder } from "@/components/sections/quartz/series-ladder";
import { SlabScale } from "@/components/sections/quartz/slab-scale";
import { SpectrumStrip } from "@/components/sections/quartz/spectrum-strip";
import { TestBench } from "@/components/sections/quartz/test-bench";
import { SplitHeading } from "@/components/motion/split-heading";
import { QuartzShadeExplorer } from "@/components/sections/quartz-shade-explorer";
import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import heroImage from "@/assets/kalingastone-quartz-hero.webp";
import {
  quartzFamilies,
  quartzShades,
  shadesOfFamily,
} from "@/config/kalingastone-quartz";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "KalingaStone Quartz Slabs UAE - 69 Shades",
  description:
    "The complete KalingaStone engineered quartz range in the UAE: 69 shades across 7 series, NSF food-safe, Microban® options, slabs up to 3300×2000 mm. Stocked and supplied by Global Classic, Sharjah.",
  alternates: { canonical: "/kalingastone/quartz" },
};

/* ---------- data derived once at build ---------- */

const pillars = [
  {
    title: "Food safe",
    body: "Certified by NSF International as a safe and secure surface for food preparation.",
    icon: Utensils,
  },
  {
    title: "Stain & scratch resistant",
    body: "Non-porous with water absorption under 0.05% - lower than natural granite - so stains never take hold.",
    icon: ShieldCheck,
  },
  {
    title: "Impervious to heat",
    body: "Resistant to heat and cold alike - engineered for the working kitchen, not just the showroom.",
    icon: Flame,
  },
  {
    title: "Homogeneous",
    body: "Benchmark consistency in shade, thickness and texture, slab after slab, batch after batch.",
    icon: Layers,
  },
];

const applications = [
  "Flooring",
  "Wall cladding",
  "Kitchen countertops",
  "Vanity counters",
  "Window sills",
  "Bathroom floors & walls",
  "Lift lobby cladding",
  "Furniture counters",
  "Door jambs",
  "Staircases",
];

const microbanBenefits = [
  "Reduces up to 99.99% of bacterial growth",
  "Cleaner for longer, active 24/7",
  "Minimises cross-contamination risk",
  "Reduces stains and odours",
  "Built in at manufacture - never washes off",
  "Unaffected by cleaning agents",
];

const fullSpecs: [string, string, string][] = [
  ["Apparent density", "ASTM C 97 / EN14617-1", "> 2.1 kg/dm³"],
  ["Water absorption", "ASTM C 97 / EN14617-1", "< 0.05%"],
  ["Modulus of rupture", "ASTM C 99", "55-65 MPa (dry/wet)"],
  ["Dimensional stability", "EN14617-12", "Class A"],
  ["Flexural strength", "ASTM C 880 / EN14617-2", "40-60 / 50-60 MPa"],
  ["Impact resistance", "EN14617-9", "5-14.5 J"],
  ["Compressive strength", "ASTM C 170 / EN14617-15", "150-250 / 170-240 MPa"],
  ["Frost resistance", "DIN 52104", "Complies"],
  ["Surface hardness", "EN 101 (Mohs)", "6.0-7.0"],
  ["Abrasion resistance", "ASTM C 241", "Min 25.0"],
  ["Stain resistance", "ANSI Z 124.6", "Pass"],
  ["Resistance to acids", "ASTM C 650", "Not affected"],
  ["Chemical resistance", "EN14617-10", "Class C4"],
  ["Boiling water / high temp", "NEMA LD3-3.5 / 3.6", "Pass, no effect"],
  ["Fire classification*", "EN 13501-1", "Wall B-s1-d0 · Floor B-fl-S1"],
  ["Slip resistance", "EN 14231", "Wet 13-21 · Dry 43-53 SRV"],
  ["Slip resistance, honed", "DIN 51130", "R9"],
  ["Thermal shock", "EN14617-6", "No defects after 20 cycles"],
  ["Freeze-thaw", "ASTM C 1026 / EN14617-5", "No damage, 20-25 cycles"],
  ["Glossiness reflection", "-", "55-70%"],
  ["Thermal conductivity", "EN 12664", "0.435-0.485 W/(m·K)"],
  ["Friction coefficient", "ASTM C 1028", "Dry 0.8 · Wet 0.6"],
];

const faqs = [
  {
    q: "What is KalingaStone Quartz?",
    a: "KalingaStone Quartz is an engineered quartz surface manufactured by Classic Marble Company on a fully automated line with a capacity of 80,000 m² per month. It combines natural quartz with resins into non-porous 20 mm slabs across 69 shades, distributed in the UAE by Global Classic Building Material LLC from Sharjah.",
  },
  {
    q: "Is KalingaStone Quartz food safe?",
    a: "Yes. KalingaStone Quartz is certified by NSF International as a safe surface for food contact. Its water absorption is below 0.05% - lower than natural granite - so bacteria, oils and pigments cannot penetrate the surface, and everyday cleaning keeps it hygienic.",
  },
  {
    q: "What slab sizes does KalingaStone Quartz come in?",
    a: "Three formats, all 20 mm thick: 3150 × 1450 mm (55 shades), 3250 × 1650 mm (13 shades), and the superjumbo 3300 × 2000 mm, currently catalogued in Carrara Marmi. The superjumbo format allows large kitchen islands and cladding panels with minimal joints.",
  },
  {
    q: "What is Microban® protection?",
    a: "Microban is an antibacterial technology integrated into eight KalingaStone Quartz shades at the manufacturing stage. It reduces up to 99.99% of bacterial growth on the surface, works around the clock for the product's lifetime, and cannot wash off or wear away. (Not available for products sold in the USA.)",
  },
  {
    q: "Can quartz slabs be used outdoors or in wet areas?",
    a: "KalingaStone Quartz passes frost, freeze-thaw and boiling-water tests, carries an R9 honed slip rating, and resists acids and household chemicals. It is specified for bathrooms, wet-area cladding and commercial floors; for exterior use, confirm the application with our technical team first.",
  },
  {
    q: "How much do quartz slabs cost in the UAE?",
    a: "Quartz slab pricing in the UAE depends on three things: the design tier (KalingaStone's Series 1 essentials are the most economical, Series 7 premium veined designs the highest), the slab format, and order volume. Global Classic supplies wholesale from Sharjah stock, so trade and project pricing is quoted per enquiry - usually within one working day.",
  },
  {
    q: "How does KalingaStone compare with Caesarstone or Silestone?",
    a: "All three are engineered quartz surfaces built on the same principle: crushed quartz bound in resin, non-porous and harder-wearing than natural stone. KalingaStone, made by Classic Marble Company, differentiates on range economics - 69 shades tiered across seven series so a project can mix premium veined islands with essential-tier utility surfaces, plus Microban® antibacterial options on eight shades and a 3300 × 2000 mm superjumbo format.",
  },
  {
    q: "Do you deliver quartz slabs to Dubai and Abu Dhabi?",
    a: "Yes - delivery is across the whole of the UAE. Slabs are held in stock at Global Classic's Sharjah warehouse in Al Sajaa and delivered to every emirate, from Dubai and Abu Dhabi to the Northern Emirates. Supply is wholesale, to contractors, developers, fabricators and decor companies, with availability confirmed against live stock.",
  },
];

/* ---------- JSON-LD ---------- */

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "KalingaStone", href: "/kalingastone" },
  { label: "Quartz", href: "/kalingastone/quartz" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd(crumbs),
    {
      "@type": "ItemList",
      name: "KalingaStone Quartz shades",
      numberOfItems: quartzShades.length,
      itemListElement: quartzShades.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `KalingaStone Quartz ${s.name}`,
        url: `${siteConfig.url}/kalingastone/quartz/${s.slug}`,
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

const galleryPicks = [
  "calacatta-lazza",
  "new-bianco-alaska",
  "pietra-grey",
  "crema-verona",
  "nero-diamante",
  "bianco-neve",
  "calacatta-imperial",
  "wizzard",
  "tundra",
  "classic-pearl",
];

export default function KalingaStoneQuartzPage() {
  const galleryShades = galleryPicks
    .map((slug) => quartzShades.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s) && s!.hasLifestyle);

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

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_minmax(0,320px)] lg:items-end">
            <div>
              <SplitHeading
                as="h1"
                className="font-display max-w-4xl text-4xl leading-tight tracking-tight text-balance sm:text-6xl"
              >
                KalingaStone Quartz slabs, stocked in the UAE.
              </SplitHeading>

              {/* Answer-first paragraph for search and AI overviews */}
              <Reveal className="mt-8 max-w-2xl">
                <p className="text-lg leading-relaxed">
                  KalingaStone Quartz is an engineered quartz surface made by
                  Classic Marble Company and distributed across the Emirates by
                  Global Classic. The range spans <strong>69 shades</strong> in
                  seven series - from uniform particulate essentials to
                  Calacatta veined statements - in 20 mm slabs up to the
                  superjumbo <strong>3300 × 2000 mm</strong>, NSF-certified food
                  safe, with Microban® antibacterial options.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="hidden lg:block">
              <figure className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src="/kalingastone/quartz/decor/vase-olive.webp"
                  alt="Sage-green ceramic vase with an olive branch standing on a white KalingaStone quartz plinth"
                  fill
                  quality={90}
                  sizes="320px"
                  className="object-cover"
                  preload
                />
              </figure>
            </Reveal>
          </div>

          {/* Stat strip */}
          <Reveal delay={0.15}>
            <dl className="border-border/40 mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border sm:grid-cols-4">
              {[
                ["150+", "designs & shades across the brand"],
                ["66", "export countries worldwide"],
                ["80,000 m²", "monthly production capacity"],
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

      {/* ---------- Hero image ---------- */}
      <section aria-label="KalingaStone quartz slab warehouse" className="pb-4">
        <div className="relative overflow-hidden">
          <Image
            src={heroImage}
            alt="Veined KalingaStone engineered quartz slabs standing upright on steel A-frame racks in a UAE stone warehouse"
            sizes="100vw"
            quality={90}
            className="h-auto w-full"
            placeholder="blur"
            preload
          />
        </div>
      </section>

      {/* ---------- Four pillars ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">Why specifiers choose it</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Beauty with a certificate behind it.
          </h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <Reveal key={p.title}>
                <p.icon
                  size={32}
                  strokeWidth={1.3}
                  className="text-ink"
                  aria-hidden
                />
                <h3 className="font-display mt-5 text-xl">{p.title}</h3>
                <p className="text-ink/70 mt-2 leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="label-gcb text-bronze mt-16">
            Versatility of application
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-5">
            {applications.map((a, i) => (
              <li key={a} className="border-ink/15 border-t pt-3">
                <span className="text-bronze font-mono text-[0.6rem] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink/85 mt-1 block text-sm leading-snug">
                  {a}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- The range, analysed ---------- */}
      <section className="py-24">
        <Container>
          <p className="label-gcb text-muted">The range, analysed</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Sixty-nine shades, seven series, three formats.
          </h2>
          <RuleIn className="mt-8 w-full max-w-3xl" />

          <div className="mt-14 space-y-20">
            <div>
              <h3 className="font-display text-2xl">Shades per series</h3>
              <p className="text-muted mt-3 max-w-xl text-sm">
                Series is the design tier - 7 carries the premium veined
                Calacattas, 1 the essential particulates. The stones themselves
                do the counting.
              </p>
              <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:items-center">
                <SeriesLadder />
                <figure className="relative hidden aspect-[3/4] overflow-hidden rounded-xl lg:block">
                  <Image
                    src="/kalingastone/quartz/decor/sample-stack.webp"
                    alt="Stack of white and grey KalingaStone quartz sample tiles tied with sage-green linen"
                    fill
                    quality={90}
                    sizes="300px"
                    className="object-cover"
                    loading="lazy"
                  />
                </figure>
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl">The colour spectrum</h3>
              <div className="mt-6">
                <SpectrumStrip />
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl">Slab formats, to scale</h3>
              <div className="mt-8">
                <SlabScale />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Colour families ---------- */}
      <section className="border-border/30 border-t py-24">
        <Container>
          <p className="label-gcb text-muted">By colour</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Five colour ranges, each with its own page.
          </h2>
          <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {quartzFamilies.map((f) => {
              const members = shadesOfFamily(f.id);
              const cover = members.find((m) => m.hasLifestyle) ?? members[0];
              return (
                <li key={f.slug}>
                  <Link
                    href={`/kalingastone/quartz/colours/${f.slug}`}
                    className="group block"
                  >
                    <span className="border-warm-black relative block aspect-[4/5] overflow-hidden rounded-lg border">
                      <Image
                        src={`/kalingastone/quartz/swatches/${cover.slug}.webp`}
                        alt={`${f.label} - KalingaStone quartz colour range`}
                        fill
                        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </span>
                    <span className="font-display group-hover:text-bronze mt-3 block text-lg leading-tight transition-colors">
                      {f.label}
                    </span>
                    <span className="text-muted mt-0.5 block text-xs">
                      {members.length} shades →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ---------- Shade explorer ---------- */}
      <section id="shades" className="border-border/30 border-t py-24">
        <Container>
          <p className="label-gcb text-muted">The collection</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Every shade in the catalogue.
          </h2>
          <p className="text-muted mt-4 max-w-2xl leading-relaxed">
            The complete printed range - nothing added, nothing renamed. Filter
            by colour family, series tier, or Microban® protection.
          </p>
          <div className="mt-12">
            <QuartzShadeExplorer />
          </div>
        </Container>
      </section>

      {/* ---------- Side by side - quartz's signature element ---------- */}
      <section className="border-border/30 border-t py-24">
        <Container>
          <p className="label-gcb text-muted">Side by side</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Shortlist like a specifier - compare any two shades.
          </h2>
          <p className="text-muted mt-4 max-w-2xl leading-relaxed">
            Pick a shade for each side and drag the divider across one slab.
          </p>
          <div className="mt-10">
            <QuartzShadeCompare />
          </div>
        </Container>
      </section>

      {/* ---------- Lifestyle gallery ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">In place</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            The same stone, living different lives.
          </h2>
        </Container>
        <div className="mt-12">
          <LifestyleCarousel shades={galleryShades} />
        </div>
      </section>

      {/* ---------- Microban ---------- */}
      <section className="py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="label-gcb text-muted">Microban® antibacterial</p>
              <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                Up to{" "}
                <span className="text-foreground font-semibold">99.99%</span>{" "}
                less bacterial growth. For life.
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed">
                Eight shades carry Microban® protection, integrated during
                manufacture - a first for quartz in India. Bacteria on a kitchen
                counter can double every twenty minutes; on a Microban-protected
                surface, growth is disrupted around the clock, for the lifetime
                of the slab.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {microbanBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <svg
                      aria-hidden
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-verde mt-0.5 shrink-0"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted mt-8 text-xs">
                Microban® technology is not available for products sold in the
                United States of America.
              </p>
              <figure className="relative mt-10 aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/kalingastone/quartz/microban-field.webp"
                  alt="Artistic macro of a quartz slab edge repelling glowing microbes - the Microban protective layer visualised"
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </figure>
            </div>

            <div>
              <figure className="relative mb-10 aspect-[3/2] overflow-hidden rounded-xl">
                <Image
                  src="/kalingastone/quartz/microban-clean.webp"
                  alt="Wiping a white KalingaStone quartz island clean with a linen cloth - Microban protection works between cleans"
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </figure>
              <h3 className="label-gcb text-muted">How it works</h3>
              <div className="mt-6">
                <MicrobanTimeline />
              </div>
              <h3 className="label-gcb text-muted mt-8">
                The eight protected shades
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {quartzShades
                  .filter((s) => s.microban)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/kalingastone/quartz/${s.slug}`}
                        className="chip-gcb border-border/50 rounded-full border px-3.5 py-1.5 text-sm"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Technical specifications ----------
          NO overflow-hidden here: it silently disables position:sticky in
          every descendant, which kills the pinned test bench. The grain
          pseudo-element is inset:0 so nothing leaks without it. */}
      <section className="bg-warm-black text-ink grain-gcb relative py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">Tested, not promised</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Technical specifications.
          </h2>

          <div className="mt-14">
            <TestBench />
          </div>

          <div className="mt-24">
            <h3 className="label-gcb text-bronze">
              The full record - 22 properties, five certificates
            </h3>
            <div className="mt-8">
              <Certificates />
            </div>
          </div>

          <details className="border-ink/15 group mt-8 rounded-xl border">
            <summary className="label-gcb flex cursor-pointer items-center justify-between px-6 py-4">
              View as a single table
              <span
                aria-hidden
                className="transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="overflow-x-auto px-6 pb-6">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="label-gcb text-ink/50 text-left">
                    <th className="py-2 pr-4 font-medium">Property</th>
                    <th className="py-2 pr-4 font-medium">Standard</th>
                    <th className="py-2 font-medium">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-ink/10 divide-y">
                  {fullSpecs.map(([p, std, r]) => (
                    <tr key={p + std}>
                      <td className="py-2.5 pr-4">{p}</td>
                      <td className="text-ink/60 py-2.5 pr-4">{std}</td>
                      <td className="py-2.5">{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-ink/50 mt-4 text-xs">
                * Values marked with an asterisk are printed ambiguously in the
                source catalogue and shown in standard notation; confirm against
                the manufacturer&rsquo;s datasheet for contractual
                specification. Slab sizes: 315 × 145, 325 × 165 and 330 × 200
                cm, all 20 mm.
              </p>
            </div>
          </details>

          {/* Finishes - macro photography */}
          <div className="mt-24">
            <h3 className="label-gcb text-bronze">Four finishes, up close</h3>
            <div className="mt-8">
              <FinishExplorer />
            </div>
          </div>

          {/* Edge profiles - drawn cross-sections */}
          <div className="mt-24">
            <h3 className="label-gcb text-bronze">Twenty-one edge profiles</h3>
            <p className="text-ink/60 mt-3 max-w-xl text-sm leading-relaxed">
              The slab edge, seen end-on - every profile the line can cut, from
              a straight ease to a cove dupont.
            </p>
            <div className="mt-8">
              <EdgeProfiles />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Provenance / sustainability / references ---------- */}
      <section className="py-24">
        <Container>
          <figure className="relative mb-14 aspect-[21/9] overflow-hidden rounded-xl">
            <Image
              src="/kalingastone/quartz/decor/production-line.webp"
              alt="A white KalingaStone quartz slab moving through the automated production line, sage-green machinery either side"
              fill
              quality={90}
              sizes="(min-width: 1536px) 1400px, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </figure>
          <div className="grid gap-14 lg:grid-cols-3">
            <div>
              <p className="label-gcb text-muted">Manufacture</p>
              <h3 className="font-display mt-3 text-2xl">
                A fully automated line.
              </h3>
              <p className="text-muted mt-3 leading-relaxed">
                From raw-material feed to finished-slab stacking, KalingaStone
                Quartz is produced untouched by hand at 80,000 m² per month -
                the consistency behind the homogeneity promise. ISO 9001, ISO
                14001 and BS OHSAS 45001 certified.
              </p>
            </div>
            <div>
              <p className="label-gcb text-muted">Sustainability</p>
              <h3 className="font-display mt-3 text-2xl">
                More than 90% recycled.
              </h3>
              <p className="text-muted mt-3 leading-relaxed">
                The Go Green programme runs on recycled raw material and
                continuous water re-use across processes - engineered stone with
                a lighter footprint than quarrying it.
              </p>
            </div>
            <div>
              <p className="label-gcb text-muted">In the region</p>
              <h3 className="font-display mt-3 text-2xl">
                Proven in the Gulf.
              </h3>
              <p className="text-muted mt-3 leading-relaxed">
                KalingaStone surfaces stand in Dubai&rsquo;s Burj Khalifa
                International and Il Villaggio, Doha&rsquo;s Pullman twin
                towers, and hotels from Bahrain to Kuwait - among references
                across 66 countries.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Quartz vs the alternatives ---------- */}
      <section className="border-border/30 border-t py-24">
        <Container>
          <p className="label-gcb text-muted">Choosing a surface</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            How does quartz compare with granite, marble and porcelain?
          </h2>
          {/* Answer-first, 40-80 words, per GOVERNANCE §7 */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            Engineered quartz is non-porous, never needs sealing, and holds a
            consistent shade from slab to slab - the three things natural stone
            cannot promise. Granite must be re-sealed periodically, marble
            etches under acids, and porcelain, while durable, is a thin-bodied
            product rather than a 20 mm solid surface that can be profiled,
            edge-detailed and repaired.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="label-gcb text-muted text-left">
                  <th className="py-3 pr-4 font-medium">Property</th>
                  <th className="py-3 pr-4 font-medium">Quartz</th>
                  <th className="py-3 pr-4 font-medium">Granite</th>
                  <th className="py-3 pr-4 font-medium">Marble</th>
                  <th className="py-3 font-medium">Porcelain</th>
                </tr>
              </thead>
              <tbody className="divide-border/30 divide-y">
                {[
                  [
                    "Porosity & sealing",
                    "Non-porous - never sealed",
                    "Porous - periodic sealing",
                    "Porous - regular sealing",
                    "Non-porous",
                  ],
                  [
                    "Stain resistance",
                    "Immune to household stains",
                    "Good when sealed",
                    "Etches under acids",
                    "Very good",
                  ],
                  [
                    "Shade consistency",
                    "Homogeneous, slab after slab",
                    "Every block differs",
                    "Every block differs",
                    "Printed - repeats visibly",
                  ],
                  [
                    "Thickness & repair",
                    "20 mm solid, profilable, repairable",
                    "20-30 mm solid",
                    "20-30 mm solid",
                    "6-12 mm thin body",
                  ],
                  [
                    "Food safety",
                    "NSF certified",
                    "Depends on sealant",
                    "Depends on sealant",
                    "Safe",
                  ],
                ].map(([prop, ...cells]) => (
                  <tr key={prop}>
                    <td className="text-muted py-3 pr-4">{prop}</td>
                    {/* Keyed by column - cell text repeats across columns
                        ("Every block differs" ×2), so it can't be the key. */}
                    {cells.map((c, i) => (
                      <td
                        key={i}
                        className={
                          i === 0
                            ? "text-foreground py-3 pr-4"
                            : "text-muted py-3 pr-4"
                        }
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted mt-6 max-w-2xl text-sm leading-relaxed">
            Needs the A1 fire class or an exterior facade instead? See the{" "}
            <Link
              href="/kalingastone/terrazzo"
              className="u-line text-foreground"
            >
              KalingaStone Terrazzo range
            </Link>{" "}
            - or browse{" "}
            <Link href="/products" className="u-line text-foreground">
              all product lines
            </Link>
            . For the care system behind every slab we supply -{" "}
            <Link href="/fila/mp90-eco-xtreme" className="u-line text-foreground">
              FILA MP90 ECO XTREME
            </Link>{" "}
            protection,{" "}
            <Link href="/fila/marble-refresh" className="u-line text-foreground">
              MARBLE REFRESH
            </Link>{" "}
            daily care and{" "}
            <Link href="/fila/pw10" className="u-line text-foreground">
              PW10
            </Link>{" "}
            pre-laying treatment - see the FILA hub.
          </p>
        </Container>
      </section>

      {/* ---------- Supply across the Emirates ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">Wholesale supply</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Stocked in Sharjah. Delivered to every Emirate.
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <p className="text-ink/80 max-w-2xl text-lg leading-relaxed">
              Global Classic is the KalingaStone quartz slab supplier holding
              stock in Sharjah - at the Al Sajaa warehouse - with delivery
              across the whole of the UAE: Dubai, Abu Dhabi, Sharjah, Ajman, Umm
              Al Quwain, Ras Al Khaimah and Fujairah. Supply is wholesale:
              contractors, developers, fabricators and decor companies buy slabs
              by the project, with availability confirmed against live stock and
              volume pricing quoted usually within one working day.
            </p>
            <ul className="space-y-3">
              {[
                "Ex-stock slabs - no import lead time on stocked shades",
                "Volume and project pricing for trade buyers",
                "Samples for specification and client approval",
                "Delivery coordinated to site or fabrication workshop",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="bg-bronze mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  />
                  <span className="text-ink/80 leading-relaxed">{point}</span>
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
          <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
            KalingaStone Quartz, in plain terms.
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,300px)] lg:items-start">
            <div className="max-w-3xl">
              <FaqAccordion items={faqs} />
            </div>
            <figure className="relative hidden aspect-[3/4] overflow-hidden rounded-xl lg:sticky lg:top-32 lg:block">
              <Image
                src="/kalingastone/quartz/decor/architects-desk.webp"
                alt="White veined quartz sample beside a sage-green notebook on an architect's desk"
                fill
                quality={90}
                sizes="300px"
                className="object-cover"
                loading="lazy"
              />
            </figure>
          </div>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-20">
        <Container className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl leading-tight">
              Specifying quartz for a project?
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
