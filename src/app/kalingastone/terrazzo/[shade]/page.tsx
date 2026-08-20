import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  terrazzoCollectionBySeries,
  terrazzoShadeBySlug,
  terrazzoShadeIndex,
  terrazzoShades,
} from "@/config/kalingastone-terrazzo";
import { siteConfig } from "@/config/site";
import { terrazzoBody, terrazzoIntro } from "@/lib/terrazzo-copy";
import { seoDescription, seoTitle } from "@/lib/seo";

/**
 * One indexed URL per terrazzo shade - the same long-tail play as the
 * quartz hub. All 24 pages statically generated from the catalogue data.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return terrazzoShades.map((s) => ({ shade: s.slug }));
}

type Props = { params: Promise<{ shade: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shade: slug } = await params;
  const shade = terrazzoShadeBySlug.get(slug);
  if (!shade) return {};
  const collection = terrazzoCollectionBySeries.get(shade.series)!;
  return {
    title: {
      absolute: seoTitle(
        `${shade.name} - KalingaStone Terrazzo`,
        " Slab UAE",
        " | Global Classic",
      ),
    },
    description: seoDescription(
      `${shade.name} - KalingaStone terrazzo, ${collection.label} (Series ${shade.series}), 304 x 125 cm slab${shade.microban ? ", Microban® protected" : ""}.`,
      "Tiles, slabs or cut-to-size from Sharjah stock.",
      "AED trade pricing, UAE-wide delivery.",
    ),
    alternates: { canonical: `/kalingastone/terrazzo/${shade.slug}` },
    openGraph: {
      images: [
        {
          url: `/kalingastone/terrazzo/swatches/${shade.slug}.webp`,
          alt: `KalingaStone Terrazzo ${shade.name}`,
        },
      ],
    },
  };
}

export default async function TerrazzoShadePage({ params }: Props) {
  const { shade: slug } = await params;
  const shade = terrazzoShadeBySlug.get(slug);
  if (!shade) notFound();

  const collection = terrazzoCollectionBySeries.get(shade.series)!;
  const index = terrazzoShadeIndex.get(shade.slug)!;
  const prev = index > 0 ? terrazzoShades[index - 1] : null;
  const next =
    index < terrazzoShades.length - 1 ? terrazzoShades[index + 1] : null;

  const related = terrazzoShades
    .filter((s) => s.series === shade.series && s.slug !== shade.slug)
    .slice(0, 3);

  const swatch = `/kalingastone/terrazzo/swatches/${shade.slug}.webp`;
  const lifestyle = `/kalingastone/terrazzo/lifestyle/${shade.lifestyle}.webp`;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "KalingaStone", href: "/kalingastone" },
    { label: "Terrazzo", href: "/kalingastone/terrazzo" },
    {
      label: collection.label,
      href: `/kalingastone/terrazzo/collections/${collection.slug}`,
    },
    { label: shade.name, href: `/kalingastone/terrazzo/${shade.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      {
        "@type": "Product",
        name: `KalingaStone Terrazzo ${shade.name}`,
        brand: { "@type": "Brand", name: "KalingaStone" },
        material: "Engineered terrazzo",
        image: [`${siteConfig.url}${swatch}`, `${siteConfig.url}${lifestyle}`],
        description: terrazzoIntro(shade),
        sku: shade.slug,
        size: "304 × 125 cm",
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "AED",
          areaServed: "AE",
          seller: {
            "@type": "Organization",
            name: siteConfig.legalName,
          },
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

      <section className="pt-40 pb-16">
        <Container>
          <Breadcrumb items={crumbs} />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
              <h1 className="font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
                {shade.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="border-border/50 rounded-full border px-3.5 py-1.5 text-sm">
                  Series {shade.series}
                </span>
                <span className="border-border/50 rounded-full border px-3.5 py-1.5 text-sm">
                  304 × 125 cm
                </span>
                <span className="border-border/50 rounded-full border px-3.5 py-1.5 text-sm">
                  Tiles · Slabs · CTS
                </span>
                <Link
                  href={`/kalingastone/terrazzo/collections/${collection.slug}`}
                  className="chip-gcb border-border/50 rounded-full border px-3.5 py-1.5 text-sm"
                >
                  {collection.label}
                </Link>
                {shade.microban && (
                  <span className="bg-warm-black text-ink rounded-full px-3.5 py-1.5 text-sm">
                    Microban® protected
                  </span>
                )}
              </div>

              {/* Answer-first paragraph */}
              <p className="mt-8 text-lg leading-relaxed">
                {terrazzoIntro(shade)}
              </p>

              <div className="text-muted mt-6 space-y-4 leading-relaxed">
                {terrazzoBody(shade).map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <GcbButton href="/contact" size="md" variant="light">
                  Request this shade
                </GcbButton>
                <Link
                  href="/kalingastone/terrazzo"
                  className="u-line label-gcb text-foreground/80"
                >
                  Full 24-shade range
                </Link>
              </div>
            </div>

            <div className="space-y-5">
              <figure
                className={`border-warm-black relative overflow-hidden rounded-xl border ${
                  shade.squareSwatch ? "aspect-[765/804]" : "aspect-[2/1]"
                }`}
              >
                <Image
                  src={swatch}
                  alt={`KalingaStone Terrazzo ${shade.name} - Series ${shade.series} terrazzo slab surface, 304 × 125 cm`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  preload
                />
              </figure>
              <figure className="border-warm-black relative aspect-[16/15] overflow-hidden rounded-xl border">
                <Image
                  src={lifestyle}
                  alt={`${shade.name} terrazzo installed - KalingaStone catalogue application photograph`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* Related shades - same collection pair */}
      {related.length > 0 && (
        <section className="border-border/30 border-t py-20">
          <Container>
            <p className="label-gcb text-muted">Related shades</p>
            <h2 className="font-display mt-4 text-2xl leading-tight sm:text-3xl">
              More from {collection.label}.
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-3">
              {related.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/kalingastone/terrazzo/${s.slug}`}
                    className="group block"
                  >
                    <span className="border-warm-black relative block aspect-[2/1] overflow-hidden rounded-lg border">
                      <Image
                        src={`/kalingastone/terrazzo/swatches/${s.slug}.webp`}
                        alt={`KalingaStone Terrazzo ${s.name} swatch`}
                        fill
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </span>
                    <span className="font-display mt-3 block text-lg leading-tight">
                      {s.name}
                    </span>
                    <span className="text-muted mt-0.5 block text-xs">
                      Series {s.series}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Prev / next pagination through the catalogue order */}
      <nav aria-label="Shade pagination" className="border-border/30 border-t">
        <Container className="grid sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/kalingastone/terrazzo/${prev.slug}`}
              rel="prev"
              className="group py-8 pr-6"
            >
              <span className="label-gcb text-muted">← Previous shade</span>
              <span className="font-display group-hover:text-bronze mt-2 block text-xl transition-colors">
                {prev.name}
              </span>
            </Link>
          ) : (
            <span aria-hidden className="py-8 pr-6" />
          )}
          {next ? (
            <Link
              href={`/kalingastone/terrazzo/${next.slug}`}
              rel="next"
              className="group py-8 text-right sm:pl-6"
            >
              <span className="label-gcb text-muted">Next shade →</span>
              <span className="font-display group-hover:text-bronze mt-2 block text-xl transition-colors">
                {next.name}
              </span>
            </Link>
          ) : (
            <span aria-hidden className="py-8 sm:pl-6" />
          )}
        </Container>
      </nav>

      {/* CTA */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-20">
        <Container className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl leading-tight">
              Need {shade.name} for a project?
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
