import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  shadesOfTerrazzoCollection,
  terrazzoCollectionBySlug,
  terrazzoCollections,
} from "@/config/kalingastone-terrazzo";
import { siteConfig } from "@/config/site";

/**
 * Collection-pair pages - the catalogue's own grouping (it never splits
 * a pair per shade, so neither do we). Each page owns one query per
 * GOVERNANCE §1 and links pillar ⇄ collection ⇄ shade both ways.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return terrazzoCollections.map((c) => ({ collection: c.slug }));
}

type Props = { params: Promise<{ collection: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = terrazzoCollectionBySlug.get(slug);
  if (!collection) return {};
  const count = shadesOfTerrazzoCollection(collection.series).length;
  return {
    title: {
      absolute: `${collection.label} Terrazzo UAE - ${count} KalingaStone Shades`,
    },
    description: `${collection.label} - Series ${collection.series} of the KalingaStone terrazzo range: ${count} shades in 304 × 125 cm slabs, A1 fire class, stocked in Sharjah and supplied across the UAE as tiles, slabs or cut-to-size.`,
    alternates: {
      canonical: `/kalingastone/terrazzo/collections/${collection.slug}`,
    },
  };
}

export default async function TerrazzoCollectionPage({ params }: Props) {
  const { collection: slug } = await params;
  const collection = terrazzoCollectionBySlug.get(slug);
  if (!collection) notFound();

  const shades = shadesOfTerrazzoCollection(collection.series);
  const siblings = terrazzoCollections.filter((c) => c.slug !== slug);

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
            name: "KalingaStone Terrazzo",
            item: `${siteConfig.url}/kalingastone/terrazzo`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: collection.label,
            item: `${siteConfig.url}/kalingastone/terrazzo/collections/${collection.slug}`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `KalingaStone Terrazzo ${collection.label} - UAE`,
        url: `${siteConfig.url}/kalingastone/terrazzo/collections/${collection.slug}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: shades.length,
          itemListElement: shades.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `KalingaStone Terrazzo ${s.name}`,
            url: `${siteConfig.url}/kalingastone/terrazzo/${s.slug}`,
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
          <nav aria-label="Breadcrumb" className="label-gcb text-muted">
            <Link href="/" className="u-line">
              Home
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <Link href="/kalingastone/terrazzo" className="u-line">
              KalingaStone Terrazzo
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span className="text-foreground">{collection.label}</span>
          </nav>

          <h1 className="font-display mt-8 max-w-3xl text-4xl leading-tight tracking-tight text-balance sm:text-6xl">
            {collection.label} terrazzo, in the UAE.
          </h1>

          {/* Answer-first paragraph */}
          <p className="mt-8 max-w-2xl text-lg leading-relaxed">
            {collection.intro}
          </p>

          {/* The design languages, from the catalogue's own copy */}
          <div className="mt-10 grid max-w-3xl gap-8 sm:grid-cols-2">
            {collection.languages.map((l) => (
              <div key={l.name} className="border-warm-black border-t pt-4">
                <h2 className="font-display text-xl">{l.name}</h2>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                  {l.body}
                </p>
              </div>
            ))}
          </div>

          <p className="text-muted mt-8 text-sm">
            {shades.length} shades in this tier ·{" "}
            <Link href="/kalingastone/terrazzo" className="u-line">
              all 24 KalingaStone Terrazzo shades
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
                  href={`/kalingastone/terrazzo/${s.slug}`}
                  className="group block"
                >
                  <span className="border-warm-black relative block aspect-[2/1] overflow-hidden rounded-lg border">
                    <Image
                      src={`/kalingastone/terrazzo/swatches/${s.slug}.webp`}
                      alt={`KalingaStone Terrazzo ${s.name} - Series ${s.series} ${collection.label} terrazzo slab`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {s.microban && (
                      <span className="label-gcb bg-warm-black/80 text-ink absolute top-2 left-2 rounded-full px-2.5 py-1 text-[0.55rem]">
                        Microban®
                      </span>
                    )}
                  </span>
                  <span className="font-display group-hover:text-bronze mt-3 block text-lg leading-tight transition-colors">
                    {s.name}
                  </span>
                  <span className="text-muted mt-0.5 block text-xs">
                    Series {s.series} · 304 × 125 cm
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Sibling collections */}
      <section className="border-border/30 border-t py-16">
        <Container>
          <p className="label-gcb text-muted">Other collections</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {siblings.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/kalingastone/terrazzo/collections/${c.slug}`}
                  className="chip-gcb border-border/50 rounded-full border px-5 py-2.5 text-sm"
                >
                  {c.label}
                  <span className="text-muted ml-2">
                    {shadesOfTerrazzoCollection(c.series).length}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/kalingastone/terrazzo/fluting"
                className="chip-gcb border-border/50 rounded-full border px-5 py-2.5 text-sm"
              >
                Fluting gallery
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-20">
        <Container className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl leading-tight">
              Specifying {collection.label} terrazzo?
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
