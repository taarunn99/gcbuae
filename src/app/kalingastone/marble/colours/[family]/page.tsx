import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  marbleFamilies,
  marbleFamilyBySlug,
  shadesOfMarbleFamily,
} from "@/config/kalingastone-marble";
import { siteConfig } from "@/config/site";
import { seoDescription } from "@/lib/seo";

/**
 * Marble colour-category pages. Each owns one query per GOVERNANCE §1
 * and links pillar ⇄ category ⇄ shade both ways.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return marbleFamilies.map((f) => ({ family: f.slug }));
}

type Props = { params: Promise<{ family: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { family: slug } = await params;
  const family = marbleFamilyBySlug.get(slug);
  if (!family) return {};
  const count = shadesOfMarbleFamily(family.id).length;
  return {
    title: {
      absolute: `${family.label} Slabs UAE - ${count} KalingaStone Shades`,
    },
    description: seoDescription(
      `${count} ${family.label.toLowerCase()} shades from the KalingaStone engineered marble collection - 304 x 125 cm slabs, repolishable.`,
      "Stocked in Sharjah, supplied UAE-wide with specs per shade.",
      "AED trade pricing.",
    ),
    alternates: { canonical: `/kalingastone/marble/colours/${family.slug}` },
  };
}

export default async function MarbleFamilyPage({ params }: Props) {
  const { family: slug } = await params;
  const family = marbleFamilyBySlug.get(slug);
  if (!family) notFound();

  const shades = shadesOfMarbleFamily(family.id);
  const siblings = marbleFamilies.filter((f) => f.slug !== family.slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "KalingaStone", href: "/kalingastone" },
    { label: "Marble", href: "/kalingastone/marble" },
    { label: family.label, href: `/kalingastone/marble/colours/${family.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      {
        "@type": "CollectionPage",
        name: `KalingaStone ${family.label} - UAE`,
        url: `${siteConfig.url}/kalingastone/marble/colours/${family.slug}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: shades.length,
          itemListElement: shades.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `KalingaStone Marble ${s.name}`,
            url: `${siteConfig.url}/kalingastone/marble/${s.slug}`,
          })),
        },
      },
    ],
  };

  return (
    <main className="theme-forest bg-background text-foreground flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="pt-40 pb-20">
        <Container>
          <Breadcrumb items={crumbs} />

          <h1 className="font-display mt-8 max-w-3xl text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
            {family.label.toLowerCase().includes("marble")
              ? `${family.label} slabs in the UAE.`
              : `${family.label} marble slabs in the UAE.`}
          </h1>

          {/* Answer-first paragraph */}
          <p className="mt-8 max-w-2xl text-lg leading-relaxed">
            {family.intro}
          </p>

          <p className="text-muted mt-6 text-sm">
            {shades.length} shades in this range ·{" "}
            <Link href="/kalingastone/marble" className="u-line">
              all 35 KalingaStone Marble shades
            </Link>
          </p>
        </Container>
      </section>

      <section className="border-border/30 border-t py-20">
        <Container>
          <ul className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {shades.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/kalingastone/marble/${s.slug}`}
                  className="group block"
                >
                  <span className="border-warm-black relative block aspect-[5/2] overflow-hidden rounded-lg border">
                    <Image
                      src={`/kalingastone/marble/swatches/${s.slug}.webp`}
                      alt={`KalingaStone Marble ${s.name} - Series-${s.series} ${family.label.toLowerCase()} slab`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {s.microbanOption && (
                      <span className="label-gcb bg-warm-black/80 text-ink absolute top-2 left-2 rounded-full px-2.5 py-1 text-[0.55rem]">
                        Microban® option
                      </span>
                    )}
                  </span>
                  <span className="font-display group-hover:text-bronze mt-3 block text-lg leading-tight transition-colors">
                    {s.name}
                  </span>
                  <span className="text-muted mt-0.5 block text-xs">
                    Series-{s.series} · 304 × 125 cm
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Sibling categories */}
      <section className="border-border/30 border-t py-16">
        <Container>
          <p className="label-gcb text-muted">Other colour ranges</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {siblings.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/kalingastone/marble/colours/${f.slug}`}
                  className="chip-gcb border-border/50 rounded-full border px-5 py-2.5 text-sm"
                >
                  {f.label}
                  <span className="text-muted ml-2">
                    {shadesOfMarbleFamily(f.id).length}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-20">
        <Container className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl leading-tight">
              Specifying {family.label.toLowerCase()}?
            </h2>
            <p className="text-ink/70 mt-2 max-w-md">
              Slab availability, samples and volume pricing from Sharjah stock -
              usually within one working day.
            </p>
          </div>
          <GcbButton href="/contact" size="md" variant="dark">
            Request availability
          </GcbButton>
        </Container>
      </section>
    </main>
  );
}
