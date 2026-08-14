import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  filaBrand,
  filaCategories,
  filaProjects,
  filaStats,
  filaSystem,
} from "@/config/fila";
import { filaProducts } from "@/config/fila-products";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: "FILA Surface Care UAE - Official Distribution | Global Classic" },
  description:
    "FILA surface care in the UAE: 34 professional cleaners, protectors, finishes and ready-to-use products from the Italian maker founded 1943 - official distribution by Lapiz Blue, supplied wholesale by Global Classic. Coverage tables, systems and project references.",
  alternates: { canonical: "/fila" },
};

const crumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "FILA", href: "/fila" },
];

const checkerboard = [
  { label: "Cleaners", href: "/fila/cleaners" },
  { label: "Protectors", href: "/fila/protectors" },
  { label: "Finishing", href: "/fila/finishing" },
  { label: "Ready to Use", href: "/fila/ready-to-use" },
  { label: "Solutions", href: "/fila/solutions" },
  { label: "Projects", href: "/fila/projects" },
  { label: "About FILA", href: "/fila/about" },
  { label: "Contact", href: "/contact" },
];

const faqs = [
  { q: "Who distributes FILA products in the UAE?", a: "FILA has run its Middle East branch from Dubai JLT since 2012; official UAE distribution is by Lapiz Blue, with Global Classic supplying the trade wholesale from Sharjah. We supply bulk and project quantities to contractors, fit-out companies, facilities teams and resellers - not single retail bottles." },
  { q: "Which FILA product seals a marble worktop?", a: "MP90 ECO XTREME is the printed answer for polished marble, granite and porcelain - water- and oil-repellent, Indoor Air Comfort Gold certified, walk-on in 2 hours. Daily care then runs on MARBLE REFRESH, the pH-neutral spray that reinforces the protection." },
  { q: "What removes grout haze after tiling?", a: "DETERDEK PRO - the end-of-work buffered-acid detergent that removes post-installation deposits and limescale without attacking the material, phosphate-free, biodegradable up to 98%." },
  { q: "Are FILA products certified?", a: "FILA holds UNI EN ISO 9001 and 14001 (TUV Rheinland); in September 2022 it was the first in its sector in Italy to earn Indoor Air Comfort Gold by Eurofins, and it is a Climate Pledge signatory targeting net zero carbon by 2040. More than 83% of products are water-based." },
  { q: "Where are the technical data sheets?", a: "Per the instruction printed on every catalogue page: read the product label and the technical data sheet at filasolutions.com before full application. We link the TDS from every product page and quote coverage exactly as printed." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd(crumbs),
    {
      "@type": "Brand",
      name: "FILA",
      url: `${siteConfig.url}/fila`,
      sameAs: ["https://www.filasolutions.com"],
    },
    {
      "@type": "Organization",
      name: "FILA INDUSTRIA CHIMICA SPA",
      foundingDate: "1943",
      url: "https://www.filasolutions.com",
      brand: { "@type": "Brand", name: "FILA" },
    },
    {
      "@type": "ItemList",
      name: "FILA products supplied in the UAE",
      numberOfItems: filaProducts.length,
      itemListElement: filaProducts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `FILA ${p.name}`,
        url: `${siteConfig.url}/fila/${p.slug}`,
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

/** Masonry deck: packshots + verbatim quote cards + scene cards, mixed. */
function masonryDeck() {
  const deck: React.ReactNode[] = [];
  filaProducts.forEach((p, i) => {
    const chip = filaCategories.find((c) => c.slug === p.category)!.chip;
    deck.push(
      <Link
        key={p.slug}
        href={`/fila/${p.slug}`}
        data-fila-card
        className="fila-card block rounded-xl bg-[#E9E7E0] p-5"
      >
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[220px]">
          <Image
            src={`/images/fila/products/${p.slug}.webp`}
            alt={`${p.name} ${p.title.toLowerCase()} for ${p.surfaces[0].toLowerCase()}, FILA UAE`}
            fill
            sizes="220px"
            className="object-contain"
            loading="lazy"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <span className="fila-display block text-lg">{p.name}</span>
            <span className="mt-1 block text-sm text-[#0B0B0C]/70">
              {p.title}
            </span>
          </div>
          <span
            aria-hidden
            className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: chip }}
          />
        </div>
      </Link>,
    );
    if (p.quote) {
      deck.push(
        <div
          key={`${p.slug}-quote`}
          data-fila-card
          className="fila-card rounded-xl bg-[#0B0B0C] p-7 text-white"
        >
          <span className="fila-bar mb-5" data-fila-bar />
          <p className="fila-display text-2xl leading-tight">
            {"“"}{p.quote}{"”"}
          </p>
          <p className="mt-4 text-xs text-white/60">
            FILA Easy Guide, p{p.page}
          </p>
        </div>,
      );
    }
    if (i === 10 || i === 24) {
      const scene = i === 10 ? "mp90-eco-xtreme-scene" : "w68-scene";
      deck.push(
        <div
          key={`scene-${i}`}
          data-fila-card
          className="fila-card overflow-hidden rounded-xl"
        >
          <Image
            src={`/images/fila/scenes/${scene}.webp`}
            alt="FILA treatment in application - protected stone surface"
            width={640}
            height={420}
            className="h-auto w-full"
            loading="lazy"
          />
        </div>,
      );
    }
  });
  return deck;
}

export default function FilaHubPage() {
  return (
    <main className="flex-1 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ---------- 1. HERO - full bleed droplet macro ---------- */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden">
        <div data-fila-parallax className="absolute inset-0 -top-[12%] h-[124%]">
          <Image
            src="/images/fila/heroes/hub-droplets.webp"
            alt="Water beads and one amber oil bead standing on sealed honed travertine"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            preload
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/85 via-[#0B0B0C]/25 to-transparent"
        />
        <Container className="relative z-10 pt-44 pb-16 text-white">
          <Breadcrumb items={crumbs} />
          <h1 className="fila-display mt-10 max-w-5xl text-[clamp(2.9rem,7.6vw,7.6rem)]">
            We take care
            <br />
            of surfaces.
          </h1>
          <span className="fila-bar mt-6" data-fila-bar />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            FILA surface care, official UAE distribution by Lapiz Blue -
            supplied wholesale to the trade by Global Classic. 34 catalogued
            products, Italian since {filaBrand.founded}.
          </p>
        </Container>
      </section>

      {/* ---------- 2. YELLOW CHECKERBOARD ---------- */}
      <section aria-label="Browse FILA" className="border-y border-[#0B0B0C]/10">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {checkerboard.map((cell, i) => {
            const yellow = (i + Math.floor(i / 4)) % 2 === 0;
            return (
              <Link
                key={cell.label}
                href={cell.href}
                className={`fila-display group flex aspect-[2/1] items-center justify-center border-[#0B0B0C]/10 text-center text-xl transition-colors sm:aspect-[2.2/1] sm:text-2xl ${
                  yellow
                    ? "bg-[#FED400] text-[#0B0B0C] hover:bg-[#0B0B0C] hover:text-[#FED400]"
                    : "bg-[#FAFAF6] text-[#0B0B0C] hover:bg-[#0B0B0C] hover:text-white"
                } ${i % 4 !== 3 ? "sm:border-r" : ""} ${i % 2 === 0 ? "border-r sm:border-r" : ""} ${i < 4 ? "border-b" : ""}`}
              >
                {cell.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------- CLEAN / PROTECT / FINISH stack ---------- */}
      <section className="relative py-24">
        <span aria-hidden className="fila-ghost top-4 right-4">01</span>
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.618fr] lg:items-end">
            <h2 className="fila-display text-[clamp(3rem,8vw,6.5rem)]">
              Clean
              <br />
              Protect
              <br />
              Finish
            </h2>
            <div>
              <span className="fila-bar" data-fila-bar />
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#0B0B0C]/80">
                {filaBrand.mission} Every product below is transcribed from the
                FILA Easy Guide Middle East edition - surfaces, advantages,
                packaging and printed coverage per litre - and supplied in the
                UAE in wholesale and project quantities only.
              </p>
              <p className="mt-4 text-sm text-[#0B0B0C]/60">
                {filaBrand.recommended}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- 3. PINTEREST MASONRY - all 34 ---------- */}
      <section className="pb-24">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="fila-display text-4xl sm:text-5xl">
                The range. All 34.
              </h2>
              <span className="fila-bar mt-4" data-fila-bar />
            </div>
            <div className="flex flex-wrap gap-2">
              {filaCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/fila/${c.slug}`}
                  className="rounded-full border border-[#0B0B0C]/20 px-4 py-2 text-sm transition-colors hover:bg-[#0B0B0C] hover:text-white"
                >
                  <span
                    aria-hidden
                    className="mr-2 inline-block h-2 w-2 rounded-full"
                    style={{ background: c.chip }}
                  />
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="fila-masonry">{masonryDeck()}</div>
        </Container>
      </section>

      {/* ---------- 4. EDITORIAL BAND - stats ---------- */}
      <section className="bg-[#0B0B0C] py-20 text-white">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {filaStats.map(([value, label]) => (
              <div key={label}>
                <p className="fila-display text-6xl text-[#FED400]">{value}</p>
                <p className="mt-3 max-w-[26ch] text-sm text-white/70">{label}</p>
              </div>
            ))}
          </div>
          {/* Partner marquee */}
          <div className="mt-16 overflow-hidden border-t border-white/10 pt-8" aria-label="FILA manufacturer partners">
            <div className="fila-marquee flex w-max gap-10">
              {[...filaBrand.partnerNames, ...filaBrand.partnerNames].map(
                (name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="fila-display text-2xl whitespace-nowrap text-transparent"
                    style={{ WebkitTextStroke: "1px rgb(255 255 255 / 0.35)" }}
                  >
                    {name}
                  </span>
                ),
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- 6. SYSTEM STRIP ---------- */}
      <section className="relative py-24">
        <span aria-hidden className="fila-ghost top-4 left-4">02</span>
        <Container className="relative z-10">
          <h2 className="fila-display text-4xl sm:text-5xl">The FILA system.</h2>
          <span className="fila-bar mt-4" data-fila-bar />
          <p className="mt-4 max-w-2xl text-[#0B0B0C]/70">
            Five stages, printed in the catalogue itself - from the back of the
            slab to the daily wipe. Specify the whole sequence on one BOQ.
          </p>
        </Container>
        <div className="fila-strip mt-10 flex snap-x gap-5 overflow-x-auto px-6 pb-4 lg:px-[max(1.5rem,calc((100vw-80rem)/2))]">
          {filaSystem.map((stage, i) => (
            <div
              key={stage.stage}
              className="w-[78vw] shrink-0 rounded-xl border border-[#0B0B0C]/10 bg-white p-7 sm:w-[360px]"
            >
              <p className="fila-display text-5xl text-[#0B0B0C]/15">
                0{i + 1}
              </p>
              <p className="fila-display mt-2 text-3xl">{stage.stage}</p>
              <span className="fila-bar mt-3" data-fila-bar />
              <p className="mt-4 text-sm leading-relaxed text-[#0B0B0C]/70">
                {stage.body}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {stage.slugs.map((slug) => {
                  const product = filaProducts.find((p) => p.slug === slug)!;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/fila/${slug}`}
                        className="inline-block rounded-full border border-[#0B0B0C]/20 px-3 py-1 text-xs transition-colors hover:bg-[#FED400]"
                      >
                        {product.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Projects teaser ---------- */}
      <section className="relative border-t border-[#0B0B0C]/10 py-24">
        <span aria-hidden className="fila-ghost top-4 right-4">03</span>
        <Container className="relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="fila-display text-4xl sm:text-5xl">
                Proven on the world&apos;s floors.
              </h2>
              <span className="fila-bar mt-4" data-fila-bar />
            </div>
            <Link href="/fila/projects" className="fila-display text-sm underline decoration-[#FED400] decoration-4 underline-offset-8">
              All reference projects
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {filaProjects.slice(0, 3).map((project) => (
              <Link key={project.name} href="/fila/projects" data-fila-card className="fila-card group overflow-hidden rounded-xl bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={`/images/fila/brand/${project.image}.webp`}
                    alt={`${project.name}, ${project.place} - maintained with FILA products`}
                    fill
                    sizes="(min-width: 640px) 30vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <p className="fila-display text-lg">{project.name}</p>
                  <p className="mt-1 text-sm text-[#0B0B0C]/60">{project.place}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="border-t border-[#0B0B0C]/10 py-24">
        <Container>
          <h2 className="fila-display text-4xl sm:text-5xl">Asked before every order.</h2>
          <span className="fila-bar mt-4" data-fila-bar />
          <div className="mt-10 max-w-3xl">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-[#0B0B0C]/10 py-5">
                <summary className="fila-display flex cursor-pointer items-center justify-between text-lg">
                  {f.q}
                  <span aria-hidden className="text-[#FED400] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-[#0B0B0C]/75">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Distributor CTA ---------- */}
      <section className="bg-[#0B0B0C] py-20 text-white">
        <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="fila-display text-3xl leading-tight">
              Specifying FILA for a project?
            </p>
            <span className="fila-bar mt-4" data-fila-bar />
            <p className="mt-4 max-w-md text-white/70">
              {filaBrand.middleEast}. Wholesale and project quantities from
              Sharjah - send the surface list and the BOQ, AED pricing comes
              back usually within one working day.
            </p>
          </div>
          <GcbButton href="/contact" size="md" variant="dark">
            Send the BOQ
          </GcbButton>
        </Container>
      </section>
    </main>
  );
}
