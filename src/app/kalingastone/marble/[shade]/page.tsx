import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  marbleFamilyById,
  marbleShadeBySlug,
  marbleShadeIndex,
  marbleShades,
} from "@/config/kalingastone-marble";
import { siteConfig } from "@/config/site";
import { marbleBody, marbleIntro } from "@/lib/marble-copy";

/**
 * One indexed URL per marble shade — the same long-tail play as the
 * quartz and terrazzo hubs. All 35 pages statically generated.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return marbleShades.map((s) => ({ shade: s.slug }));
}

type Props = { params: Promise<{ shade: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shade: slug } = await params;
  const shade = marbleShadeBySlug.get(slug);
  if (!shade) return {};
  const family = marbleFamilyById.get(shade.family)!;
  return {
    title: `${shade.name} — KalingaStone Marble`,
    description: `${shade.name}: KalingaStone engineered marble, Series-${shade.series}, 304 × 125 cm slab${shade.microbanOption ? ", Microban® option available" : ""}. ${family.label} range — slab availability and volume pricing from Sharjah stock.`,
    alternates: { canonical: `/kalingastone/marble/${shade.slug}` },
    openGraph: {
      images: [
        {
          url: `/kalingastone/marble/swatches/${shade.slug}.webp`,
          alt: `KalingaStone Marble ${shade.name}`,
        },
      ],
    },
  };
}

export default async function MarbleShadePage({ params }: Props) {
  const { shade: slug } = await params;
  const shade = marbleShadeBySlug.get(slug);
  if (!shade) notFound();

  const family = marbleFamilyById.get(shade.family)!;
  const index = marbleShadeIndex.get(shade.slug)!;
  const prev = index > 0 ? marbleShades[index - 1] : null;
  const next = index < marbleShades.length - 1 ? marbleShades[index + 1] : null;

  const related = marbleShades
    .filter((s) => s.family === shade.family && s.slug !== shade.slug)
    .slice(0, 3);

  const swatch = `/kalingastone/marble/swatches/${shade.slug}.webp`;
  const lifestyle = shade.lifestyle
    ? `/kalingastone/marble/lifestyle/${shade.lifestyle}.webp`
    : null;

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
            name: "KalingaStone Marble",
            item: `${siteConfig.url}/kalingastone/marble`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: family.label,
            item: `${siteConfig.url}/kalingastone/marble/colours/${family.slug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: shade.name,
            item: `${siteConfig.url}/kalingastone/marble/${shade.slug}`,
          },
        ],
      },
      {
        "@type": "Product",
        name: `KalingaStone Marble ${shade.name}`,
        brand: { "@type": "Brand", name: "KalingaStone" },
        material: "Engineered marble",
        image: [
          `${siteConfig.url}${swatch}`,
          ...(lifestyle ? [`${siteConfig.url}${lifestyle}`] : []),
        ],
        description: marbleIntro(shade),
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
          <nav aria-label="Breadcrumb" className="label-gcb text-muted">
            <Link href="/" className="u-line">
              Home
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <Link href="/kalingastone/marble" className="u-line">
              KalingaStone Marble
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <Link
              href={`/kalingastone/marble/colours/${family.slug}`}
              className="u-line"
            >
              {family.label}
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span className="text-foreground">{shade.name}</span>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
              <h1 className="font-display text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
                {shade.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="border-border/50 rounded-full border px-3.5 py-1.5 text-sm">
                  Series-{shade.series}
                </span>
                <span className="border-border/50 rounded-full border px-3.5 py-1.5 text-sm">
                  304 × 125 cm
                </span>
                <Link
                  href={`/kalingastone/marble/colours/${family.slug}`}
                  className="chip-gcb border-border/50 rounded-full border px-3.5 py-1.5 text-sm"
                >
                  {family.label}
                </Link>
                {shade.microbanOption && (
                  <span className="bg-warm-black text-ink rounded-full px-3.5 py-1.5 text-sm">
                    Microban® option
                  </span>
                )}
              </div>

              {/* Answer-first paragraph */}
              <p className="mt-8 text-lg leading-relaxed">
                {marbleIntro(shade)}
              </p>

              <div className="text-muted mt-6 space-y-4 leading-relaxed">
                {marbleBody(shade).map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-4">
                <GcbButton href="/contact" size="md">
                  Request this shade
                </GcbButton>
                <Link
                  href="/kalingastone/marble"
                  className="u-line label-gcb text-foreground/80"
                >
                  Full 35-shade range
                </Link>
              </div>
            </div>

            <div className="space-y-5">
              <figure
                className={`border-warm-black relative overflow-hidden rounded-xl border ${
                  shade.wideSwatch ? "aspect-[5/2]" : "aspect-[18/5]"
                }`}
              >
                <Image
                  src={swatch}
                  alt={`KalingaStone Marble ${shade.name} — Series-${shade.series} engineered marble slab surface, 304 × 125 cm`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  preload
                />
              </figure>
              {lifestyle && (
                <figure className="border-warm-black relative aspect-[3/4] overflow-hidden rounded-xl border">
                  <Image
                    src={lifestyle}
                    alt={`${shade.name} marble installed — KalingaStone catalogue application photograph`}
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

      {/* Related shades — same colour family */}
      {related.length > 0 && (
        <section className="border-border/30 border-t py-20">
          <Container>
            <p className="label-gcb text-muted">Related shades</p>
            <h2 className="font-display mt-4 text-2xl leading-tight sm:text-3xl">
              More from the {family.label.toLowerCase()} range.
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-3">
              {related.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/kalingastone/marble/${s.slug}`}
                    className="group block"
                  >
                    <span className="border-warm-black relative block aspect-[5/2] overflow-hidden rounded-lg border">
                      <Image
                        src={`/kalingastone/marble/swatches/${s.slug}.webp`}
                        alt={`KalingaStone Marble ${s.name} swatch`}
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
                      Series-{s.series}
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
              href={`/kalingastone/marble/${prev.slug}`}
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
              href={`/kalingastone/marble/${next.slug}`}
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
              Slab availability, samples and volume pricing from Sharjah stock —
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
