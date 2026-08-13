import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Gem, Layers, RefreshCcw, Sparkles } from "lucide-react";

import heroImage from "@/assets/kalingastone-marble-hero.webp";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { MarbleCertificates } from "@/components/sections/marble/marble-certificates";
import { MarbleFinishExplorer } from "@/components/sections/marble/marble-finish-explorer";
import { MarbleLadder } from "@/components/sections/marble/marble-ladder";
import { MarbleLoupe } from "@/components/sections/marble/marble-loupe";
import { MarbleShadeExplorer } from "@/components/sections/marble/marble-shade-explorer";
import { MarbleSlabScale } from "@/components/sections/marble/marble-slab-scale";
import { MarbleTestBench } from "@/components/sections/marble/marble-test-bench";
import { FaqAccordion } from "@/components/sections/quartz/faq-accordion";
import { MicrobanTimeline } from "@/components/sections/quartz/microban-timeline";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { TerrazzoLifestyleCarousel } from "@/components/sections/terrazzo/terrazzo-lifestyle-carousel";
import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  marbleFamilies,
  marbleShadeBySlug,
  marbleShades,
  shadesOfMarbleFamily,
} from "@/config/kalingastone-marble";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: "KalingaStone Marble Slabs UAE - 35 Shades" },
  description:
    "The complete KalingaStone engineered marble range in the UAE: 35 shades across 5 series, 304 × 125 cm slabs, > 85% gloss, repolishable surfaces. Stocked and supplied by Global Classic, Sharjah.",
  alternates: { canonical: "/kalingastone/marble" },
};

/* ---------- data derived once at build ---------- */

const properties = [
  {
    title: "Homogeneous",
    body: "Benchmark consistency in shade, thickness and texture - the engineered block guarantees what quarries cannot.",
    icon: Layers,
  },
  {
    title: "Resistant to stain",
    body: "Non-porous, with lower absorption than natural granite - immune to everyday stains.",
    icon: Sparkles,
  },
  {
    title: "Repolishable",
    body: "The surface revives its original elegance in situ - high-traffic floors are restored, not replaced.",
    icon: RefreshCcw,
  },
  {
    title: "Above 85% gloss",
    body: "The highest polish of KalingaStone's three ranges, off SIMEC lines with 36 polishing heads.",
    icon: Gem,
  },
];

const applications = [
  "Flooring",
  "Wall cladding",
  "Vanity counters",
  "Bathroom floors & walls",
  "Window sills",
  "Lift lobby cladding",
  "Furniture counters",
  "Wardrobe partitions & shelves",
  "Door jambs",
  "Staircases",
];

const microbanBenefits = [
  "Reduces up to 99.99% of bacterial growth",
  "Cleaner for longer, active 24/7",
  "Minimises cross-contamination risk",
  "Reduces stains and odours",
  "Enhances durability",
  "Unaffected by cleaning agents",
];

const faqs = [
  {
    q: "What is KalingaStone Marble?",
    a: "KalingaStone Marble is an engineered marble made by Classic Marble Company at its 200,000 m² Silvassa plant - a range of 35 shades across five series in 304 × 125 cm slabs, polished past 85% gloss on SIMEC (Italy) lines. It is distributed in the UAE by Global Classic Building Material LLC from Sharjah. It is the engineered line - CMC produces natural marble separately at the same plant.",
  },
  {
    q: "Is engineered marble the same as natural marble?",
    a: "No. Engineered marble is made in block form from marble aggregate and resin, which is why every KalingaStone slab is consistent in shade, thickness and texture, non-porous with absorption under 0.1%, and repolishable. Natural marble varies block to block and needs sealing. CMC manufactures both - this range is the engineered one.",
  },
  {
    q: "What does repolishable mean?",
    a: "The surface can be mechanically repolished in situ, restoring its original gloss instead of replacing the floor - a genuine lifecycle advantage for hotel lobbies, lift lobbies and high-traffic commercial floors, and unique to the marble range among KalingaStone's three materials.",
  },
  {
    q: "What size do marble slabs come in?",
    a: "One format for the entire range: 304 × 125 cm. A single slab runs the full length of a vanity, staircase or lift-lobby panel without pattern breaks.",
  },
  {
    q: "Is KalingaStone Marble food-safe certified?",
    a: "The marble catalogue does not carry the NSF food-contact certification - that belongs to the KalingaStone Quartz range, which is the material Global Classic recommends for kitchen worktops. Marble's territory is floors, walls, vanities and stairs, where its gloss and repolishability lead.",
  },
  {
    q: "Can I get Microban® on marble?",
    a: "Eight shades - Cristallo, Raffaele, Bianco Venus, Minta Flurry, Ottoman Beige, Althea, Dantea and Amelia - are offered with the option of Microban® antibacterial protection, reducing up to 99.99% of bacterial growth. The same shades are also available without it. (Microban is not available for products sold in the USA.)",
  },
  {
    q: "Do you deliver marble across the UAE?",
    a: "Yes - delivery is across the whole of the UAE. Slabs are held at Global Classic's Sharjah warehouse in Al Sajaa and delivered to every emirate, from Dubai and Abu Dhabi to the Northern Emirates. Supply is wholesale, to contractors, developers, fabricators and decor companies, with availability confirmed against live stock.",
  },
];

/* ---------- JSON-LD ---------- */

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "KalingaStone", href: "/kalingastone" },
  { label: "Marble", href: "/kalingastone/marble" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd(crumbs),
    {
      "@type": "ItemList",
      name: "KalingaStone Marble shades",
      numberOfItems: marbleShades.length,
      itemListElement: marbleShades.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `KalingaStone Marble ${s.name}`,
        url: `${siteConfig.url}/kalingastone/marble/${s.slug}`,
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
  "candy-white",
  "cristallo",
  "raffaele",
  "tiberio",
  "gardenia",
  "fresh-concrete",
  "camelia",
  "amelia",
];

export default function KalingaStoneMarblePage() {
  const carouselItems = galleryPicks.map((slug) => {
    const s = marbleShadeBySlug.get(slug)!;
    return {
      src: `/kalingastone/marble/lifestyle/${s.lifestyle}.webp`,
      alt: `KalingaStone Marble ${s.name} installed in an interior`,
      caption: `${s.name} · Series-${s.series}`,
      href: `/kalingastone/marble/${s.slug}`,
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
                KalingaStone Marble slabs, stocked in the UAE.
              </SplitHeading>

              {/* Answer-first paragraph for search and AI overviews */}
              <Reveal className="mt-8 max-w-2xl">
                <p className="text-lg leading-relaxed">
                  KalingaStone Marble is an engineered marble made by Classic
                  Marble Company and distributed across the Emirates by Global
                  Classic. The range spans <strong>35 shades</strong> in five
                  series - Candy White to Bianco Thassos - in a single{" "}
                  <strong>304 × 125 cm</strong> slab, polished past 85% gloss
                  and repolishable in situ for the life of the floor.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="hidden lg:block">
              <figure className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src="/kalingastone/marble/decor/polish-still.webp"
                  alt="Polisher's buffing pad mirrored in a glossy white KalingaStone marble slab beside a sage dish of polishing powder"
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
                ["35", "shades across five series"],
                [">85%", "gloss - highest of the three ranges"],
                ["304 × 125 cm", "one slab format, every shade"],
                ["Repolishable", "restored in situ, not replaced"],
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
      <section aria-label="KalingaStone marble slab gallery" className="pb-4">
        <div className="relative overflow-hidden">
          <Image
            src={heroImage}
            alt="White and cream veined KalingaStone engineered marble slabs fanned on display racks in a bright gallery"
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
            The language of opulence, engineered.
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
        </Container>
      </section>

      {/* ---------- The loupe - marble's signature element ---------- */}
      <section className="py-24">
        <Container>
          <p className="label-gcb text-muted">Under the loupe</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Marble is bought at arm&rsquo;s length - and chosen up close.
          </h2>
          <p className="text-muted mt-4 max-w-2xl leading-relaxed">
            Move across the slab and read the vein the way a specifier would at
            the warehouse rack.
          </p>
          <div className="mt-10">
            <MarbleLoupe
              src="/kalingastone/marble/vein-panel.webp"
              alt="Polished white engineered marble slab with flowing grey and taupe veining"
            />
          </div>
        </Container>
      </section>

      {/* ---------- The range, analysed ---------- */}
      <section className="border-border/30 border-t py-24">
        <Container>
          <p className="label-gcb text-muted">The range, analysed</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Thirty-five shades, five series, one slab.
          </h2>
          <RuleIn className="mt-8 w-full max-w-3xl" />

          <div className="mt-14 space-y-20">
            <div>
              <h3 className="font-display text-2xl">Shades per series</h3>
              <p className="text-muted mt-3 max-w-xl text-sm">
                Ascending tiers, Series-1 to Series-5 - with Series-5 split into
                5A and 5B, one pinnacle shade each. The stones themselves do the
                counting.
              </p>
              <div className="mt-8">
                <MarbleLadder />
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl">The slab, to scale</h3>
              <div className="mt-8">
                <MarbleSlabScale />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Colour ranges ---------- */}
      <section className="border-border/30 border-t py-24">
        <Container>
          <p className="label-gcb text-muted">By colour</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Four colour ranges, each with its own page.
          </h2>
          <p className="text-muted mt-4 max-w-2xl text-sm leading-relaxed">
            A light, warm range by design - there is no black marble in the
            collection; for dark statements, see the quartz and terrazzo ranges.
          </p>
          <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {marbleFamilies.map((f) => {
              const members = shadesOfMarbleFamily(f.id);
              const cover = members[0];
              return (
                <Link
                  key={f.slug}
                  href={`/kalingastone/marble/colours/${f.slug}`}
                  className="group block"
                >
                  <span className="border-warm-black relative block aspect-[4/3] overflow-hidden rounded-lg border">
                    <Image
                      src={`/kalingastone/marble/swatches/${cover.slug}.webp`}
                      alt={`${f.label} - KalingaStone marble colour range`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
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
            by colour, filterable by the Microban® option.
          </p>
          <div className="mt-12">
            <MarbleShadeExplorer />
          </div>
        </Container>
      </section>

      {/* ---------- Lifestyle gallery ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">In place</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            The same marble, living different lives.
          </h2>
        </Container>
        <div className="mt-12">
          <TerrazzoLifestyleCarousel
            items={carouselItems}
            cardClass="w-[64vw] sm:w-[320px]"
            aspectClass="aspect-[3/4]"
          />
        </div>
      </section>

      {/* ---------- Repolishable ---------- */}
      <section className="py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <p className="label-gcb text-muted">The lifecycle advantage</p>
              <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                The floor that starts over.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed">
                Every polished floor dulls under traffic. Natural stone gets
                replaced; KalingaStone Marble gets repolished - the surface is
                mechanically restored in situ to its original gloss, again and
                again, for the life of the building. For hotel lobbies, malls
                and lift lobbies, that is the difference between a maintenance
                night and a refurbishment contract.
              </p>
              <ol className="mt-8 grid max-w-xl grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
                {[
                  "Polished",
                  "Worn by traffic",
                  "Repolished in situ",
                  "Revived",
                ].map((step, i) => (
                  <li key={step} className="border-warm-black border-t pt-3">
                    <span className="text-bronze font-mono text-[0.6rem] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground mt-1 block text-sm leading-snug">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="relative aspect-[3/4] max-w-sm justify-self-center overflow-hidden rounded-xl lg:justify-self-end">
              <Image
                src="/kalingastone/marble/decor/polish-still.webp"
                alt="Buffing pad mirrored in high-gloss white KalingaStone marble"
                fill
                quality={90}
                sizes="(min-width: 1024px) 380px, 80vw"
                className="object-cover"
                loading="lazy"
              />
            </figure>
          </div>
        </Container>
      </section>

      {/* ---------- Microban (option) ---------- */}
      <section className="border-border/30 border-t py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="label-gcb text-muted">Microban® antibacterial</p>
              <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                Up to{" "}
                <span className="text-foreground font-semibold">99.99%</span>{" "}
                less bacterial growth - as an option.
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed">
                Eight marble shades are offered with Microban® protection - a
                first for marble in India - and, uniquely in the KalingaStone
                catalogue, every one of them is also available without it.
                Specify the treatment where hygiene leads (clinics, vanities,
                washrooms) and the plain slab where it doesn&rsquo;t.
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
                The eight option shades
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {marbleShades
                  .filter((s) => s.microbanOption)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/kalingastone/marble/${s.slug}`}
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
            <MarbleTestBench />
          </div>

          <div className="mt-24">
            <h3 className="label-gcb text-bronze">
              The full record - 25 properties, five certificates
            </h3>
            <div className="mt-8">
              <MarbleCertificates />
            </div>
          </div>

          {/* Finishes - macro photography */}
          <div className="mt-24">
            <h3 className="label-gcb text-bronze">Five finishes, up close</h3>
            <p className="text-ink/60 mt-3 max-w-xl text-sm leading-relaxed">
              Graffiato and Silken are marble-only - no other KalingaStone range
              cuts them.
            </p>
            <div className="mt-8">
              <MarbleFinishExplorer />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- The three materials ---------- */}
      <section className="py-24">
        <Container>
          <p className="label-gcb text-muted">Choosing a surface</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Marble, quartz or terrazzo - an honest reading.
          </h2>
          {/* Answer-first, per the catalogue's own comparison */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            Marble sits between the other two on nearly every strength metric -
            and above both on refinement. Its wins are the highest gloss of the
            three ranges, the repolishable surface, and a warm palette that
            photographs as luxury. Quartz keeps hardness, stain and food-safe
            duty; terrazzo keeps the A1 fire class and exteriors.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="label-gcb text-muted text-left">
                  <th className="py-3 pr-4 font-medium">Property</th>
                  <th className="py-3 pr-4 font-medium">Marble</th>
                  <th className="py-3 pr-4 font-medium">Terrazzo</th>
                  <th className="py-3 font-medium">Quartz</th>
                </tr>
              </thead>
              <tbody className="divide-border/30 divide-y">
                {[
                  ["Polished gloss", "> 85%", "> 75%", "55-70%"],
                  ["Repolishable", "Yes - in situ", "Not stated", "Not stated"],
                  ["Surface hardness (Mohs)", "4.0-5.0", "3.0-4.0", "6.0-7.0"],
                  ["Water absorption", "< 0.1%", "< 0.2%", "< 0.05%"],
                  [
                    "Fire classification (EN)",
                    "Class B",
                    "Class A1",
                    "Class B",
                  ],
                  ["Food-safe certification", "-", "NSF mark", "NSF certified"],
                  ["Shades", "35", "24", "69"],
                ].map(([prop, a, b, c]) => (
                  <tr key={prop}>
                    <td className="text-muted py-3 pr-4">{prop}</td>
                    <td className="text-foreground py-3 pr-4">{a}</td>
                    <td className="text-muted py-3 pr-4">{b}</td>
                    <td className="text-muted py-3">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted mt-6 max-w-2xl text-sm leading-relaxed">
            Compare the ranges in full:{" "}
            <Link
              href="/kalingastone/quartz"
              className="u-line text-foreground"
            >
              KalingaStone Quartz
            </Link>{" "}
            ·{" "}
            <Link
              href="/kalingastone/terrazzo"
              className="u-line text-foreground"
            >
              KalingaStone Terrazzo
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
              Global Classic is the KalingaStone marble supplier holding stock
              in Sharjah - at the Al Sajaa warehouse - with delivery across the
              whole of the UAE: Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain,
              Ras Al Khaimah and Fujairah. Supply is wholesale: contractors,
              developers, fabricators and decor companies buy by the project,
              with availability confirmed against live stock.
            </p>
            <ul className="space-y-3">
              {[
                "Ex-stock slabs - no import lead time on stocked shades",
                "One 304 × 125 cm format across all 35 shades",
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
            KalingaStone Marble, in plain terms.
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
              Specifying marble for a project?
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
