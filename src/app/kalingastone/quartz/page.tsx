import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { QuartzShadeExplorer } from "@/components/sections/quartz-shade-explorer";
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
  title: "KalingaStone Quartz Slabs UAE — 69 Shades",
  description:
    "The complete KalingaStone engineered quartz range in the UAE: 69 shades across 7 series, NSF food-safe, Microban® options, slabs up to 3300×2000 mm. Stocked and supplied by Global Classic, Sharjah.",
  alternates: { canonical: "/kalingastone/quartz" },
};

/* ---------- data derived once at build ---------- */

const seriesCounts = [
  { series: "7", label: "Series 7 — premium veined", count: 7 },
  { series: "6", label: "Series 6", count: 7 },
  { series: "5", label: "Series 5", count: 8 },
  { series: "4", label: "Series 4", count: 9 },
  { series: "3", label: "Series 3", count: 21 },
  { series: "2", label: "Series 2", count: 11 },
  { series: "1 A", label: "Series 1 A", count: 1 },
  { series: "1", label: "Series 1 — essentials", count: 5 },
];
const maxSeries = Math.max(...seriesCounts.map((s) => s.count));

const familyCounts = [
  { label: "Whites", count: 16, color: "#f7f8f5" },
  { label: "Marble-look veined", count: 11, color: "#d2d4c8" },
  { label: "Cream & beige", count: 16, color: "#6f8f78" },
  { label: "Greys", count: 18, color: "#355e4d" },
  { label: "Dark & black", count: 8, color: "#0c1510" },
];
const familyTotal = familyCounts.reduce((a, f) => a + f.count, 0);
let acc = 0;
const donutStops = familyCounts
  .map((f) => {
    const from = (acc / familyTotal) * 360;
    acc += f.count;
    const to = (acc / familyTotal) * 360;
    return `${f.color} ${from.toFixed(1)}deg ${to.toFixed(1)}deg`;
  })
  .join(", ");

const slabFormats = [
  { w: 3150, h: 1450, label: "3150 × 1450 mm", note: "55 shades" },
  { w: 3250, h: 1650, label: "3250 × 1650 mm", note: "13 shades" },
  {
    w: 3300,
    h: 2000,
    label: "3300 × 2000 mm",
    note: "Superjumbo — Carrara Marmi",
  },
];

const pillars = [
  {
    title: "Food safe",
    body: "Certified by NSF International as a safe and secure surface for food preparation.",
    icon: (
      <>
        <path d="M12 3v18M5 8c0 4 3 7 7 7s7-3 7-7" />
        <path d="M7 3v5M17 3v5" />
      </>
    ),
  },
  {
    title: "Stain & scratch resistant",
    body: "Non-porous with water absorption under 0.05% — lower than natural granite — so stains never take hold.",
    icon: (
      <>
        <path d="M12 3 4 7v6c0 5 3.5 7.5 8 8 4.5-.5 8-3 8-8V7l-8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Impervious to heat",
    body: "Resistant to heat and cold alike — engineered for the working kitchen, not just the showroom.",
    icon: (
      <>
        <path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-4 3-6 5-9Z" />
        <path d="M12 21v-4" />
      </>
    ),
  },
  {
    title: "Homogeneous",
    body: "Benchmark consistency in shade, thickness and texture, slab after slab, batch after batch.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 10h16M4 15h16" />
      </>
    ),
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
  "Built in at manufacture — never washes off",
  "Unaffected by cleaning agents",
];

const keySpecs = [
  { value: "< 0.05%", label: "Water absorption", standard: "ASTM C 97" },
  { value: "6.0–7.0", label: "Mohs surface hardness", standard: "EN 101" },
  {
    value: "150–250 MPa",
    label: "Compressive strength",
    standard: "ASTM C 170",
  },
  { value: "Class A", label: "Surface burning", standard: "ASTM E 84" },
];

const fullSpecs: [string, string, string][] = [
  ["Apparent density", "ASTM C 97 / EN14617-1", "> 2.1 kg/dm³"],
  ["Water absorption", "ASTM C 97 / EN14617-1", "< 0.05%"],
  ["Modulus of rupture", "ASTM C 99", "55–65 MPa (dry/wet)"],
  ["Dimensional stability", "EN14617-12", "Class A"],
  ["Flexural strength", "ASTM C 880 / EN14617-2", "40–60 / 50–60 MPa"],
  ["Impact resistance", "EN14617-9", "5–14.5 J"],
  ["Compressive strength", "ASTM C 170 / EN14617-15", "150–250 / 170–240 MPa"],
  ["Frost resistance", "DIN 52104", "Complies"],
  ["Surface hardness", "EN 101 (Mohs)", "6.0–7.0"],
  ["Abrasion resistance", "ASTM C 241", "Min 25.0"],
  ["Stain resistance", "ANSI Z 124.6", "Pass"],
  ["Resistance to acids", "ASTM C 650", "Not affected"],
  ["Chemical resistance", "EN14617-10", "Class C4"],
  ["Boiling water / high temp", "NEMA LD3-3.5 / 3.6", "Pass, no effect"],
  ["Fire classification*", "EN 13501-1", "Wall B-s1-d0 · Floor B-fl-S1"],
  ["Slip resistance", "EN 14231", "Wet 13–21 · Dry 43–53 SRV"],
  ["Slip resistance, honed", "DIN 51130", "R9"],
  ["Thermal shock", "EN14617-6", "No defects after 20 cycles"],
  ["Freeze–thaw", "ASTM C 1026 / EN14617-5", "No damage, 20–25 cycles"],
  ["Glossiness reflection", "—", "55–70%"],
  ["Thermal conductivity", "EN 12664", "0.435–0.485 W/(m·K)"],
  ["Friction coefficient", "ASTM C 1028", "Dry 0.8 · Wet 0.6"],
];

const finishes = [
  { name: "Distress", body: "Softly worn, matte-textured surface." },
  { name: "Leather", body: "Tactile, lightly pebbled low-sheen surface." },
  { name: "Honed", body: "Flat matte, non-reflective — R9 slip-rated." },
  { name: "Nalico", body: "Deep-textured, heavily grained finish." },
];

const faqs = [
  {
    q: "What is KalingaStone Quartz?",
    a: "KalingaStone Quartz is an engineered quartz surface manufactured by Classic Marble Company on a fully automated line with a capacity of 80,000 m² per month. It combines natural quartz with resins into non-porous 20 mm slabs across 69 shades, distributed in the UAE by Global Classic Building Material LLC from Sharjah.",
  },
  {
    q: "Is KalingaStone Quartz food safe?",
    a: "Yes. KalingaStone Quartz is certified by NSF International as a safe surface for food contact. Its water absorption is below 0.05% — lower than natural granite — so bacteria, oils and pigments cannot penetrate the surface, and everyday cleaning keeps it hygienic.",
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
    a: "KalingaStone Quartz passes frost, freeze–thaw and boiling-water tests, carries an R9 honed slip rating, and resists acids and household chemicals. It is specified for bathrooms, wet-area cladding and commercial floors; for exterior use, confirm the application with our technical team first.",
  },
  {
    q: "How much do quartz slabs cost in the UAE?",
    a: "Quartz slab pricing in the UAE depends on three things: the design tier (KalingaStone's Series 1 essentials are the most economical, Series 7 premium veined designs the highest), the slab format, and order volume. Global Classic supplies wholesale from Sharjah stock, so trade and project pricing is quoted per enquiry — usually within one working day.",
  },
  {
    q: "How does KalingaStone compare with Caesarstone or Silestone?",
    a: "All three are engineered quartz surfaces built on the same principle: crushed quartz bound in resin, non-porous and harder-wearing than natural stone. KalingaStone, made by Classic Marble Company, differentiates on range economics — 69 shades tiered across seven series so a project can mix premium veined islands with essential-tier utility surfaces, plus Microban® antibacterial options on eight shades and a 3300 × 2000 mm superjumbo format.",
  },
  {
    q: "Do you deliver quartz slabs to Dubai and Abu Dhabi?",
    a: "Yes — delivery is across the whole of the UAE. Slabs are held in stock at Global Classic's Sharjah warehouse in Al Sajaa and delivered to every emirate, from Dubai and Abu Dhabi to the Northern Emirates. Supply is wholesale, to contractors, developers, fabricators and decor companies, with availability confirmed against live stock.",
  },
];

/* ---------- JSON-LD ---------- */

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
          name: "KalingaStone",
          item: `${siteConfig.url}/kalingastone/quartz`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Quartz",
          item: `${siteConfig.url}/kalingastone/quartz`,
        },
      ],
    },
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
          <nav aria-label="Breadcrumb" className="label-gcb text-muted">
            <Link href="/" className="u-line">
              Home
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span>KalingaStone</span>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span className="text-foreground">Quartz</span>
          </nav>

          <SplitHeading
            as="h1"
            className="font-display mt-8 max-w-4xl text-4xl leading-tight tracking-tight text-balance sm:text-6xl"
          >
            KalingaStone Quartz slabs, stocked in the UAE.
          </SplitHeading>

          {/* Answer-first paragraph for search and AI overviews */}
          <Reveal className="mt-8 max-w-2xl">
            <p className="text-lg leading-relaxed">
              KalingaStone Quartz is an engineered quartz surface made by
              Classic Marble Company and distributed across the Emirates by
              Global Classic. The range spans <strong>69 shades</strong> in
              seven series — from uniform particulate essentials to Calacatta
              veined statements — in 20 mm slabs up to the superjumbo{" "}
              <strong>3300 × 2000 mm</strong>, NSF-certified food safe, with
              Microban® antibacterial options.
            </p>
          </Reveal>

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
                    <span className="font-display text-verde block text-3xl sm:text-4xl">
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
                <svg
                  aria-hidden
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-bronze"
                >
                  {p.icon}
                </svg>
                <h3 className="font-display mt-5 text-xl">{p.title}</h3>
                <p className="text-ink/70 mt-2 leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="label-gcb text-bronze mt-16">
            Versatility of application
          </p>
          <ul className="mt-4 flex max-w-3xl flex-wrap gap-y-2">
            {applications.map((a, i) => (
              <li key={a} className="text-ink/80 flex items-baseline text-sm">
                {i > 0 && (
                  <span aria-hidden className="text-ink/30 mx-2">
                    ·
                  </span>
                )}
                {a}
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

          <div className="mt-14 grid gap-14 lg:grid-cols-2">
            {/* Series bar chart */}
            <div>
              <h3 className="label-gcb text-muted">Shades per series</h3>
              <p className="text-muted mt-2 text-sm">
                Series is the design tier — 7 carries the premium veined
                Calacattas, 1 the essential particulates.
              </p>
              <ul className="mt-6 space-y-3">
                {seriesCounts.map((s) => (
                  <li key={s.series} className="flex items-center gap-4">
                    <span className="font-display text-verde w-10 shrink-0 text-right">
                      {s.series}
                    </span>
                    <span className="bg-surface relative block h-7 flex-1 overflow-hidden rounded-full">
                      <span
                        className="bg-verde absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${(s.count / maxSeries) * 100}%` }}
                      />
                    </span>
                    <span className="text-muted w-8 shrink-0 text-sm tabular-nums">
                      {s.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colour-family donut */}
            <div>
              <h3 className="label-gcb text-muted">Colour families</h3>
              <p className="text-muted mt-2 text-sm">
                An editorial reading of the range for specification shortlists.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-10">
                <div
                  aria-hidden
                  className="border-border/30 h-44 w-44 shrink-0 rounded-full border"
                  style={{
                    background: `conic-gradient(${donutStops})`,
                    mask: "radial-gradient(farthest-side, transparent 55%, #000 56%)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent 55%, #000 56%)",
                  }}
                />
                <ul className="space-y-2.5">
                  {familyCounts.map((f) => (
                    <li key={f.label} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="border-border/40 h-3.5 w-3.5 rounded-full border"
                        style={{ backgroundColor: f.color }}
                      />
                      <span className="text-sm">
                        {f.label}
                        <span className="text-muted"> — {f.count}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Slab formats, drawn to scale */}
          <div className="mt-16">
            <h3 className="label-gcb text-muted">Slab formats, to scale</h3>
            <div className="mt-6 grid gap-8 sm:grid-cols-3">
              {slabFormats.map((f, i) => (
                <div key={f.label}>
                  <div
                    className={`border-verde/50 bg-surface/40 rounded-md border ${
                      i === 2 ? "border-verde border-2" : ""
                    }`}
                    style={{
                      width: `${(f.w / 3300) * 100}%`,
                      aspectRatio: `${f.w} / ${f.h}`,
                    }}
                  />
                  <p className="font-display mt-3">{f.label}</p>
                  <p className="text-muted text-sm">{f.note} · 20 mm thick</p>
                </div>
              ))}
            </div>
            <p className="text-muted mt-6 max-w-2xl text-sm">
              The 3300 × 2000 mm superjumbo — a direct product of the fully
              automated line — covers a full kitchen island or a double-height
              lift-lobby panel with a single joint-free slab.
            </p>
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
                    <span className="border-border/30 relative block aspect-[4/5] overflow-hidden rounded-lg border">
                      <Image
                        src={`/kalingastone/quartz/swatches/${cover.slug}.webp`}
                        alt={`${f.label} — KalingaStone quartz colour range`}
                        fill
                        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </span>
                    <span className="font-display group-hover:text-verde mt-3 block text-lg leading-tight transition-colors">
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
            The complete printed range — nothing added, nothing renamed. Filter
            by colour family, series tier, or Microban® protection.
          </p>
          <div className="mt-12">
            <QuartzShadeExplorer />
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
        <div className="mt-12 flex gap-6 overflow-x-auto px-6 pb-4 lg:px-[6vw]">
          {galleryShades.map((s) => (
            <figure key={s.slug} className="w-[78vw] shrink-0 sm:w-[420px]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={`/kalingastone/quartz/lifestyle/${s.slug}.webp`}
                  alt={`KalingaStone Quartz ${s.name} installed in an interior`}
                  fill
                  sizes="(min-width: 640px) 420px, 78vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="label-gcb text-ink/70 mt-3">
                {s.name} · Series {s.series}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- Microban ---------- */}
      <section className="py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="label-gcb text-muted">Microban® antibacterial</p>
              <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                Up to <span className="text-verde font-medium">99.99%</span>{" "}
                less bacterial growth. For life.
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed">
                Eight shades carry Microban® protection, integrated during
                manufacture — a first for quartz in India. Bacteria on a kitchen
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
            </div>

            <div>
              <h3 className="label-gcb text-muted">How it works</h3>
              <ol className="border-border/40 mt-6 space-y-0 border-l">
                {[
                  [
                    "Technology integration",
                    "The antibacterial agent is built into the slab during manufacture.",
                  ],
                  [
                    "Surface contamination",
                    "Bacteria land on the counter in daily use.",
                  ],
                  [
                    "Technology at work",
                    "The integrated agent disrupts bacterial growth continuously.",
                  ],
                  [
                    "A cleaner surface",
                    "The surface stays cleaner between cleans — for the product's lifetime.",
                  ],
                ].map(([t, b], i) => (
                  <li key={t} className="relative pb-8 pl-8">
                    <span
                      aria-hidden
                      className="bg-verde text-background font-display absolute top-0 -left-4 flex h-8 w-8 items-center justify-center rounded-full text-sm"
                    >
                      {i + 1}
                    </span>
                    <h4 className="font-display text-lg">{t}</h4>
                    <p className="text-muted mt-1 text-sm leading-relaxed">
                      {b}
                    </p>
                  </li>
                ))}
              </ol>
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
                        className="border-border/50 hover:border-border rounded-full border px-3.5 py-1.5 text-sm transition-colors"
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

      {/* ---------- Technical specifications ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">Tested, not promised</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Technical specifications.
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl lg:grid-cols-4">
            {keySpecs.map((s) => (
              <div key={s.label} className="bg-ink/5 px-6 py-6">
                <p className="font-display text-bronze text-2xl sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm">{s.label}</p>
                <p className="text-ink/50 mt-0.5 text-xs">{s.standard}</p>
              </div>
            ))}
          </div>

          <details className="border-ink/15 group mt-8 rounded-xl border">
            <summary className="label-gcb flex cursor-pointer items-center justify-between px-6 py-4">
              Full test table — 22 properties
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

          {/* Finishes + edges */}
          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="label-gcb text-bronze">Four finishes</h3>
              <ul className="mt-5 space-y-4">
                {finishes.map((f) => (
                  <li key={f.name} className="flex items-baseline gap-4">
                    <span className="font-display w-24 shrink-0 text-lg">
                      {f.name}
                    </span>
                    <span className="text-ink/70 text-sm">{f.body}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="label-gcb text-bronze">
                Twenty-one edge profiles
              </h3>
              <p className="text-ink/70 mt-5 text-sm leading-relaxed">
                Straight eased · Chamfer eased · Pencil round · Double pencil
                round · Radius · Double radius · Chamfer · Double chamfer ·
                Stair tread · Waterfall · Platner · Laminated · Full bullnose ·
                Half bullnose · Demi bullnose · Ogee · Ogee roundover · Dupont ·
                Cove · Cove ogee · Cove dupont
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Provenance / sustainability / references ---------- */}
      <section className="py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-3">
            <div>
              <p className="label-gcb text-muted">Manufacture</p>
              <h3 className="font-display mt-3 text-2xl">
                A fully automated line.
              </h3>
              <p className="text-muted mt-3 leading-relaxed">
                From raw-material feed to finished-slab stacking, KalingaStone
                Quartz is produced untouched by hand at 80,000 m² per month —
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
                continuous water re-use across processes — engineered stone with
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
                towers, and hotels from Bahrain to Kuwait — among references
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
          {/* Answer-first, 40–80 words, per GOVERNANCE §7 */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            Engineered quartz is non-porous, never needs sealing, and holds a
            consistent shade from slab to slab — the three things natural stone
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
                    "Non-porous — never sealed",
                    "Porous — periodic sealing",
                    "Porous — regular sealing",
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
                    "Printed — repeats visibly",
                  ],
                  [
                    "Thickness & repair",
                    "20 mm solid, profilable, repairable",
                    "20–30 mm solid",
                    "20–30 mm solid",
                    "6–12 mm thin body",
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
                    {cells.map((c, i) => (
                      <td
                        key={c}
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
            Where natural stone is the right answer, we supply that too — see{" "}
            <Link href="/products" className="u-line text-foreground">
              all product lines
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
              Global Classic is the KalingaStone quartz slab supplier holding
              stock in Sharjah — at the Al Sajaa warehouse — with delivery
              across the whole of the UAE: Dubai, Abu Dhabi, Sharjah, Ajman, Umm
              Al Quwain, Ras Al Khaimah and Fujairah. Supply is wholesale:
              contractors, developers, fabricators and decor companies buy slabs
              by the project, with availability confirmed against live stock and
              volume pricing quoted usually within one working day.
            </p>
            <ul className="space-y-3">
              {[
                "Ex-stock slabs — no import lead time on stocked shades",
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
          <div className="mt-12 max-w-3xl space-y-10">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-display text-xl">{f.q}</h3>
                <p className="text-muted mt-3 leading-relaxed">{f.a}</p>
              </div>
            ))}
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
              Slab availability, samples and volume pricing from Sharjah stock —
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
