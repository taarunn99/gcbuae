import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  familyById,
  quartzShades,
  shadeBySlug,
  shadeIndex,
} from "@/config/kalingastone-quartz";
import { siteConfig } from "@/config/site";
import { shadeBody, shadeIntro } from "@/lib/quartz-copy";
import { seoDescription, seoTitle } from "@/lib/seo";

/**
 * One indexed URL per shade - the long-tail play no UAE KalingaStone
 * distributor executes properly (GOVERNANCE §2: Mina has no per-shade
 * URLs at all; Marmo Classic has them but noindexes its own homepage).
 * All 69 pages are statically generated from the catalogue data.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return quartzShades.map((s) => ({ shade: s.slug }));
}

type Props = { params: Promise<{ shade: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shade: slug } = await params;
  const shade = shadeBySlug.get(slug);
  if (!shade) return {};
  const family = familyById.get(shade.family)!;
  return {
    title: {
      absolute: seoTitle(
        `${shade.name} - KalingaStone Quartz`,
        " Slab UAE",
        " | Global Classic",
      ),
    },
    description: seoDescription(
      `${shade.name} - KalingaStone engineered quartz, Series ${shade.series}, ${shade.size} mm${shade.microban ? ", Microban® protected" : ""}.`,
      `${family.label} range.`,
      "AED slab pricing and availability from Sharjah stock.",
      "Delivery across the UAE.",
    ),
    alternates: { canonical: `/kalingastone/quartz/${shade.slug}` },
    openGraph: {
      images: [
        {
          url: `/kalingastone/quartz/swatches/${shade.slug}.webp`,
          alt: `KalingaStone Quartz ${shade.name}`,
        },
      ],
    },
  };
}

export default async function QuartzShadePage({ params }: Props) {
  const { shade: slug } = await params;
  const shade = shadeBySlug.get(slug);
  if (!shade) notFound();

  const family = familyById.get(shade.family)!;
  const index = shadeIndex.get(shade.slug)!;
  const prev = index > 0 ? quartzShades[index - 1] : null;
  const next = index < quartzShades.length - 1 ? quartzShades[index + 1] : null;

  const related = quartzShades
    .filter((s) => s.family === shade.family && s.slug !== shade.slug)
    .slice(0, 4);

  const swatch = `/kalingastone/quartz/swatches/${shade.slug}.webp`;
  const lifestyle = shade.hasLifestyle
    ? `/kalingastone/quartz/lifestyle/${shade.slug}.webp`
    : null;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "KalingaStone", href: "/kalingastone" },
    { label: "Quartz", href: "/kalingastone/quartz" },
    { label: family.label, href: `/kalingastone/quartz/colours/${family.slug}` },
    { label: shade.name, href: `/kalingastone/quartz/${shade.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      {
        "@type": "Product",
        name: `KalingaStone Quartz ${shade.name}`,
        brand: { "@type": "Brand", name: "KalingaStone" },
        material: "Engineered quartz",
        image: [
          `${siteConfig.url}${swatch}`,
          ...(lifestyle ? [`${siteConfig.url}${lifestyle}`] : []),
        ],
        description: shadeIntro(shade),
        sku: shade.slug,
        size: `${shade.size} mm`,
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
                  {shade.size} mm
                </span>
                <Link
                  href={`/kalingastone/quartz/colours/${family.slug}`}
                  className="chip-gcb border-border/50 rounded-full border px-3.5 py-1.5 text-sm"
                >
                  {family.label}
                </Link>
                {shade.microban && (
                  <span className="bg-warm-black text-ink rounded-full px-3.5 py-1.5 text-sm">
                    Microban® protected
                  </span>
                )}
                {shade.isNew && (
                  <span className="bg-verde text-ink rounded-full px-3.5 py-1.5 text-sm">
                    New
                  </span>
                )}
              </div>

              {/* Answer-first paragraph */}
              <p className="mt-8 text-lg leading-relaxed">
                {shadeIntro(shade)}
              </p>

              <div className="text-muted mt-6 space-y-4 leading-relaxed">
                {shadeBody(shade).map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <GcbButton href="/contact" size="md">
                  Request this shade
                </GcbButton>
                <Link
                  href="/kalingastone/quartz"
                  className="u-line label-gcb text-foreground/80"
                >
                  Full 69-shade range
                </Link>
              </div>
            </div>

            <div className="space-y-5">
              <figure className="border-warm-black relative aspect-[4/3] overflow-hidden rounded-xl border">
                <Image
                  src={swatch}
                  alt={`KalingaStone Quartz ${shade.name} - Series ${shade.series} engineered quartz slab surface, ${shade.size} mm`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  preload
                />
              </figure>
              {lifestyle && (
                <figure className="border-warm-black relative aspect-[16/10] overflow-hidden rounded-xl border">
                  <Image
                    src={lifestyle}
                    alt={`${shade.name} quartz installed - KalingaStone catalogue application photograph`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </figure>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Related shades - same colour family */}
      {related.length > 0 && (
        <section className="border-border/30 border-t py-20">
          <Container>
            <p className="label-gcb text-muted">Related shades</p>
            <h2 className="font-display mt-4 text-2xl leading-tight sm:text-3xl">
              More from the {family.label.toLowerCase()} range.
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
              {related.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/kalingastone/quartz/${s.slug}`}
                    className="group block"
                  >
                    <span className="border-warm-black relative block aspect-[4/3] overflow-hidden rounded-lg border">
                      <Image
                        src={`/kalingastone/quartz/swatches/${s.slug}.webp`}
                        alt={`KalingaStone Quartz ${s.name} swatch`}
                        fill
                        sizes="(min-width: 1024px) 22vw, 45vw"
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
              href={`/kalingastone/quartz/${prev.slug}`}
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
              href={`/kalingastone/quartz/${next.slug}`}
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
