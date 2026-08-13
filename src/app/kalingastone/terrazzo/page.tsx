import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Flame, Layers, ShieldCheck, Sparkles } from "lucide-react";

import heroImage from "@/assets/kalingastone-terrazzo-hero.webp";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { FaqAccordion } from "@/components/sections/quartz/faq-accordion";
import { MicrobanTimeline } from "@/components/sections/quartz/microban-timeline";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { CollectionLadder } from "@/components/sections/terrazzo/collection-ladder";
import { TerrazzoCertificates } from "@/components/sections/terrazzo/terrazzo-certificates";
import { TerrazzoFinishExplorer } from "@/components/sections/terrazzo/terrazzo-finish-explorer";
import { TerrazzoLifestyleCarousel } from "@/components/sections/terrazzo/terrazzo-lifestyle-carousel";
import { TerrazzoShadeExplorer } from "@/components/sections/terrazzo/terrazzo-shade-explorer";
import { TerrazzoSlabScale } from "@/components/sections/terrazzo/terrazzo-slab-scale";
import { TerrazzoTestBench } from "@/components/sections/terrazzo/terrazzo-test-bench";
import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  terrazzoCollections,
  terrazzoShadeBySlug,
  terrazzoShades,
} from "@/config/kalingastone-terrazzo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: "KalingaStone Terrazzo Slabs UAE - 24 Shades" },
  description:
    "The complete KalingaStone terrazzo range in the UAE: 24 shades across 5 collections, 304 × 125 cm slabs, A1 fire class, exterior-ready, fluting programme. Stocked and supplied by Global Classic, Sharjah.",
  alternates: { canonical: "/kalingastone/terrazzo" },
};

/* ---------- data derived once at build ---------- */

const properties = [
  {
    title: "Hygienic surface",
    body: "A dense, block-form surface that cleans easily - with Microban® antibacterial protection on four shades.",
    icon: Sparkles,
  },
  {
    title: "High strength",
    body: "95-110 MPa compressive strength - around three times structural concrete - for floors, treads and cladding.",
    icon: ShieldCheck,
  },
  {
    title: "Scratch resistant",
    body: "A marble-aggregate surface made for working floors and walls, in five finishes from Honed to River Wash.",
    icon: Layers,
  },
  {
    title: "Fire resistant",
    body: "Class A1 to EN 13501-1 for wall cladding and flooring - the top non-combustible classification.",
    icon: Flame,
  },
];

const applications = [
  "Flooring",
  "Wall cladding",
  "Bathroom floors & walls",
  "Lift lobby cladding",
  "Wardrobe partitions & shelves",
];

const microbanBenefits = [
  "Reduces up to 99.99% of bacterial growth",
  "Cleaner for longer, active 24/7",
  "Minimises cross-contamination risk",
  "Reduces stains and odours",
  "Enhances durability",
  "Unaffected by cleaning agents",
];

const fullSpecs: [string, string, string][] = [
  ["Apparent density", "EN14617-1", "2.40-2.6 kg/dm³"],
  ["Water absorption", "EN14617-1", "< 0.2%"],
  ["Flexural strength", "EN14617-2", "10-18 MPa"],
  ["Dimensional stability", "EN14617-12", "Class A"],
  ["Impact resistance", "EN14617-9", "1.5-3.0 J"],
  ["Compressive strength", "EN14617-15", "95-110 MPa"],
  ["Abrasion resistance", "EN14617-4", "Groove length 30-40 mm"],
  ["Frost resistance", "DIN 52104", "Complies"],
  ["Surface hardness", "EN 101 (Mohs)", "3.0-4.0"],
  ["Chemical resistance", "EN14617-10", "Class C1"],
  ["Linear thermal expansion", "EN14617-11", "10-15 × 10⁻⁶ /°C"],
  ["Fire classification", "EN 13501-1", "Wall A1-S1-d0 · Floor A1-fl-S1"],
  ["Slip resistance", "EN 14231", "Wet > 3 · Dry > 35 SRV"],
  ["Radiation", "GB 6566-2010", "Complies"],
  ["Thermal shock", "EN14617-6", "No defects after 20 cycles"],
  ["Freeze-thaw", "EN14617-5", "No defect after 25 cycles"],
  ["Glossiness reflection", "-", "> 75%"],
  ["Slip resistance, Honed 400", "DIN 51130", "R9"],
  ["Friction coefficient", "ASTM C 1028", "Dry 0.8 · Wet 0.6"],
];

const faqs = [
  {
    q: "What is KalingaStone Terrazzo?",
    a: "KalingaStone Terrazzo is an engineered terrazzo made in block form by Classic Marble Company - marble chips composed into 304 × 125 cm slabs across 24 shades and five collections (Roma, Cafe, Palladiana, Venetian and Elite). It is distributed in the UAE by Global Classic Building Material LLC from Sharjah, as tiles, full slabs or cut-to-size.",
  },
  {
    q: "Can terrazzo be used outdoors in the UAE?",
    a: "Yes. The manufacturer positions its structured finishes as ideal for exterior cladding and outdoor use, water absorption is below 0.2%, and the range passes frost and 25-cycle freeze-thaw testing. Combined with the A1 fire classification, that makes terrazzo the range Global Classic recommends for facades and outdoor surfaces.",
  },
  {
    q: "What fire rating does KalingaStone Terrazzo carry?",
    a: "Class A1 to EN 13501-1 - A1-S1-d0 for wall cladding and A1-fl-S1 for flooring and stairs. A1 is the top non-combustible classification, frequently mandated in UAE commercial fit-out, lift lobbies and cladding - and a class above engineered quartz, which rates B.",
  },
  {
    q: "What size do terrazzo slabs come in?",
    a: "One format for the entire range: 304 × 125 cm. Every shade is available as tiles, full slabs, or CTS (cut-to-size), so vanities, treads and cladding panels are cut from the same slab without pattern breaks.",
  },
  {
    q: "What is fluting on terrazzo?",
    a: "Fluting is KalingaStone's signature terrazzo treatment: shallow grooves machined across the surface that create a rhythmic play of light. The catalogue shows nine fluted samples on bases including Ceppo, Forum, Imperiale, Docks Grey and Exotic Green - see the fluting page for the full gallery.",
  },
  {
    q: "How does terrazzo compare with quartz?",
    a: "They win different jobs. Quartz is harder (Mohs 6-7 vs 3-4), more stain-proof and NSF food-safe - the worktop material. Terrazzo answers with the A1 fire class (quartz is B), higher gloss (>75%), exterior suitability and its mosaic aesthetic - the floor, wall and facade material. Global Classic stocks both, so specification is a conversation, not a compromise.",
  },
  {
    q: "Do you deliver terrazzo across the UAE?",
    a: "Yes - delivery is across the whole of the UAE. Slabs are held at Global Classic's Sharjah warehouse in Al Sajaa and delivered to every emirate, from Dubai and Abu Dhabi to the Northern Emirates. Supply is wholesale, to contractors, developers, fabricators and decor companies, with availability confirmed against live stock.",
  },
];

/* ---------- JSON-LD ---------- */

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "KalingaStone", href: "/kalingastone" },
  { label: "Terrazzo", href: "/kalingastone/terrazzo" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd(crumbs),
    {
      "@type": "ItemList",
      name: "KalingaStone Terrazzo shades",
      numberOfItems: terrazzoShades.length,
      itemListElement: terrazzoShades.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `KalingaStone Terrazzo ${s.name}`,
        url: `${siteConfig.url}/kalingastone/terrazzo/${s.slug}`,
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

const galleryItems = [
  { lifestyle: "roma-cafe-lifestyle-1", shade: "colosseo" },
  { lifestyle: "roma-cafe-lifestyle-2", shade: "forum" },
  { lifestyle: "roma-cafe-lifestyle-3", shade: "imperiale" },
  { lifestyle: "roma-cafe-lifestyle-4", shade: "elba" },
  { lifestyle: "palladiana-venetian-lifestyle-1", shade: "docks-grey" },
  { lifestyle: "palladiana-venetian-lifestyle-2", shade: "amara-light" },
  { lifestyle: "palladiana-venetian-lifestyle-3", shade: "hudson-sky" },
  { lifestyle: "elite-lifestyle-1", shade: "elio" },
  { lifestyle: "elite-lifestyle-2", shade: "exotic-green" },
  { lifestyle: "elite-lifestyle-5", shade: "new-white-dove" },
];

export default function KalingaStoneTerrazzoPage() {
  const carouselItems = galleryItems.map(({ lifestyle, shade }) => {
    const s = terrazzoShadeBySlug.get(shade)!;
    return {
      src: `/kalingastone/terrazzo/lifestyle/${lifestyle}.webp`,
      alt: `KalingaStone Terrazzo ${s.name} installed in an interior`,
      caption: `${s.name} · Series ${s.series}`,
      href: `/kalingastone/terrazzo/${s.slug}`,
    };
  });

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
                KalingaStone Terrazzo slabs, stocked in the UAE.
              </SplitHeading>

              {/* Answer-first paragraph for search and AI overviews */}
              <Reveal className="mt-8 max-w-2xl">
                <p className="text-lg leading-relaxed">
                  KalingaStone Terrazzo is an engineered terrazzo made in block
                  form by Classic Marble Company and distributed across the
                  Emirates by Global Classic. The range spans{" "}
                  <strong>24 shades</strong> in five collections - Roma, Cafe,
                  Palladiana, Venetian and Elite - in a single{" "}
                  <strong>304 × 125 cm</strong> slab, with an A1 fire
                  classification, exterior-ready finishes and a signature
                  fluting programme.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="hidden lg:block">
              <figure className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src="/kalingastone/terrazzo/decor/chips-bowl.webp"
                  alt="Sage-green ceramic bowl of loose terrazzo marble chips on a white KalingaStone terrazzo slab"
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
                ["24", "shades across five collections"],
                ["Class A1", "fire rating - wall & floor"],
                ["304 × 125 cm", "one slab format, every shade"],
                [">75%", "gloss on polished slabs"],
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
      <section
        aria-label="KalingaStone terrazzo slab warehouse"
        className="pb-4"
      >
        <div className="relative overflow-hidden">
          <Image
            src={heroImage}
            alt="Colourful KalingaStone terrazzo slabs standing upright on steel A-frame racks in a UAE stone warehouse"
            sizes="100vw"
            quality={90}
            className="h-auto w-full"
            placeholder="blur"
            preload
          />
        </div>
      </section>

      {/* ---------- Four properties ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">Why specifiers choose it</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Colour your world - with a fire certificate.
          </h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {properties.map((p) => (
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
          <p className="text-ink/50 mt-8 max-w-2xl text-sm leading-relaxed">
            The manufacturer&rsquo;s own definition goes further: block-form
            terrazzo suits bathrooms, counter tops and vanity tops, and its
            structured finish is ideal for exterior cladding and outdoors.
          </p>
        </Container>
      </section>

      {/* ---------- The range, analysed ---------- */}
      <section className="py-24">
        <Container>
          <p className="label-gcb text-muted">The range, analysed</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Twenty-four shades, five collections, one slab.
          </h2>
          <RuleIn className="mt-8 w-full max-w-3xl" />

          <div className="mt-14 space-y-20">
            <div>
              <h3 className="font-display text-2xl">Shades per series</h3>
              <p className="text-muted mt-3 max-w-xl text-sm">
                Series is the commercial tier; the collection names are the
                design languages. The stones themselves do the counting.
              </p>
              <div className="mt-8">
                <CollectionLadder />
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl">The slab, to scale</h3>
              <div className="mt-8">
                <TerrazzoSlabScale />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Collections ---------- */}
      <section className="border-border/30 border-t py-24">
        <Container>
          <p className="label-gcb text-muted">By collection</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Five design languages, three pages.
          </h2>
          <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-3">
            {terrazzoCollections.map((c) => {
              const members = terrazzoShades.filter(
                (s) => s.series === c.series,
              );
              const cover = members[0];
              return (
                <Link
                  key={c.slug}
                  href={`/kalingastone/terrazzo/collections/${c.slug}`}
                  className="group block"
                >
                  <span className="border-warm-black relative block aspect-[3/2] overflow-hidden rounded-lg border">
                    <Image
                      src={`/kalingastone/terrazzo/swatches/${cover.slug}.webp`}
                      alt={`${c.label} - KalingaStone terrazzo collection`}
                      fill
                      sizes="(min-width: 640px) 30vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </span>
                  <span className="font-display group-hover:text-bronze mt-3 block text-xl leading-tight transition-colors">
                    {c.label}
                  </span>
                  <span className="text-muted mt-0.5 block text-sm">
                    Series {c.series} · {members.length} shades →
                  </span>
                </Link>
              );
            })}
          </div>
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
            The complete printed range - nothing added, nothing renamed. Grouped
            by collection, filterable by Microban® protection.
          </p>
          <div className="mt-12">
            <TerrazzoShadeExplorer />
          </div>
        </Container>
      </section>

      {/* ---------- Lifestyle gallery ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">In place</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            The same terrazzo, living different lives.
          </h2>
        </Container>
        <div className="mt-12">
          <TerrazzoLifestyleCarousel items={carouselItems} />
        </div>
      </section>

      {/* ---------- Fluting ---------- */}
      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="label-gcb text-muted">The signature</p>
              <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                Fluting - grooves that play with light.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed">
                Shallow machined grooves run across the terrazzo surface,
                turning every wall into a rhythm of light and shadow. Fluting is
                unique to the terrazzo range - nine catalogued samples on bases
                from Ceppo to Exotic Green.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <GcbButton href="/kalingastone/terrazzo/fluting" size="md">
                  Explore the fluting gallery
                </GcbButton>
              </div>
            </div>
            <Link
              href="/kalingastone/terrazzo/fluting"
              className="group relative block aspect-[21/10] overflow-hidden rounded-xl"
            >
              <Image
                src="/kalingastone/terrazzo/fluting-feature.webp"
                alt="Fluted KalingaStone terrazzo wall panel with raking light across the grooves"
                fill
                quality={90}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- Microban ---------- */}
      <section className="border-border/30 border-t py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="label-gcb text-muted">Microban® antibacterial</p>
              <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                Up to{" "}
                <span className="text-foreground font-semibold">99.99%</span>{" "}
                less bacterial growth.
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed">
                Four terrazzo shades carry Microban® protection - a first for
                terrazzo in India. Bacteria on a counter can double every twenty
                minutes; on a Microban-protected surface, growth is disrupted
                around the clock.
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
              <h3 className="label-gcb text-muted mt-10">
                The four protected shades
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {terrazzoShades
                  .filter((s) => s.microban)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/kalingastone/terrazzo/${s.slug}`}
                        className="chip-gcb border-border/50 rounded-full border px-3.5 py-1.5 text-sm"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
              </ul>
              <p className="text-muted mt-8 text-xs">
                Microban® technology is not available for products sold in the
                United States of America.
              </p>
            </div>

            <div>
              <figure className="relative mb-10 aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/kalingastone/quartz/microban-field.webp"
                  alt="Artistic macro of a stone slab edge repelling glowing microbes - the Microban protective layer visualised"
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
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Technical specifications ----------
          NO overflow-hidden here: it disables position:sticky for the
          pinned test bench (grain is inset:0, nothing leaks). */}
      <section className="bg-warm-black text-ink grain-gcb relative py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">Tested, not promised</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Technical specifications.
          </h2>

          <div className="mt-14">
            <TerrazzoTestBench />
          </div>

          <div className="mt-24">
            <h3 className="label-gcb text-bronze">
              The full record - 19 properties, five certificates
            </h3>
            <div className="mt-8">
              <TerrazzoCertificates />
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
                Slab size 304 × 125 cm; products available as tiles, slabs and
                cut-to-size. Values as printed in the manufacturer&rsquo;s
                technical table.
              </p>
            </div>
          </details>

          {/* Finishes - macro photography */}
          <div className="mt-24">
            <h3 className="label-gcb text-bronze">Five finishes, up close</h3>
            <div className="mt-8">
              <TerrazzoFinishExplorer />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Terrazzo vs Quartz ---------- */}
      <section className="py-24">
        <Container>
          <p className="label-gcb text-muted">Choosing a surface</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Terrazzo or quartz - which does your project need?
          </h2>
          {/* Answer-first, honest per the catalogue's own comparison */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            They win different jobs. Quartz is harder, more stain-resistant and
            NSF food-safe - the worktop material. Terrazzo answers with the A1
            fire classification quartz cannot reach, a higher polished gloss,
            exterior suitability, and the mosaic aesthetic - the floor, wall and
            facade material. Global Classic stocks both ranges in Sharjah.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="label-gcb text-muted text-left">
                  <th className="py-3 pr-4 font-medium">Property</th>
                  <th className="py-3 pr-4 font-medium">Terrazzo</th>
                  <th className="py-3 font-medium">Quartz</th>
                </tr>
              </thead>
              <tbody className="divide-border/30 divide-y">
                {[
                  [
                    "Fire classification",
                    "Class A1 - non-combustible",
                    "Class B",
                  ],
                  [
                    "Exterior cladding",
                    "Stated by the manufacturer",
                    "Confirm per application",
                  ],
                  ["Polished gloss", "> 75%", "55-70%"],
                  ["Surface hardness (Mohs)", "3.0-4.0", "6.0-7.0"],
                  ["Water absorption", "< 0.2%", "< 0.05%"],
                  ["Food-safe certification", "-", "NSF certified"],
                  ["Slab format", "304 × 125 cm", "Up to 330 × 200 cm"],
                ].map(([prop, a, b]) => (
                  <tr key={prop}>
                    <td className="text-muted py-3 pr-4">{prop}</td>
                    <td className="text-foreground py-3 pr-4">{a}</td>
                    <td className="text-muted py-3">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted mt-6 max-w-2xl text-sm leading-relaxed">
            Specifying worktops or food-contact surfaces? See the{" "}
            <Link
              href="/kalingastone/quartz"
              className="u-line text-foreground"
            >
              KalingaStone Quartz range
            </Link>{" "}
            - or the repolishable, high-gloss{" "}
            <Link
              href="/kalingastone/marble"
              className="u-line text-foreground"
            >
              KalingaStone Marble range
            </Link>
            .
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
              Global Classic is the KalingaStone terrazzo supplier holding stock
              in Sharjah - at the Al Sajaa warehouse - with delivery across the
              whole of the UAE: Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain,
              Ras Al Khaimah and Fujairah. Supply is wholesale: contractors,
              developers, fabricators and decor companies buy by the project, as
              tiles, slabs or cut-to-size, with availability confirmed against
              live stock.
            </p>
            <ul className="space-y-3">
              {[
                "Ex-stock slabs - no import lead time on stocked shades",
                "Tiles, full slabs or CTS from the same 304 × 125 cm format",
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
            KalingaStone Terrazzo, in plain terms.
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,300px)] lg:items-start">
            <div className="max-w-3xl">
              <FaqAccordion items={faqs} />
            </div>
            <figure className="relative hidden aspect-[3/4] overflow-hidden rounded-xl lg:sticky lg:top-32 lg:block">
              <Image
                src="/kalingastone/quartz/decor/architects-desk.webp"
                alt="Stone sample beside a sage-green notebook on an architect's desk"
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
              Specifying terrazzo for a project?
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
