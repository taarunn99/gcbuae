import { existsSync } from "node:fs";
import { join } from "node:path";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductBrowser } from "@/components/sections/jaquar/product-browser";
import { SpecTable } from "@/components/sections/jaquar/spec-table";
import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  jaquarCategories,
  jaquarCategoryBySlug,
  jaquarCollectionBySlug,
} from "@/config/jaquar";
import {
  FINISH_CODE_NAMES,
  FINISH_DISCLAIMER,
  catalogueSectionFor,
} from "@/config/jaquar-catalogue";
import { productsOf, productsOfGroups } from "@/config/jaquar-products";
import { siteConfig } from "@/config/site";

/**
 * Jaquar collection range pages - the long-tail layer ("jaquar ornamix
 * prime", "jaquar flush plates uae"...). v2: full product tables from the
 * 2025-2026 Global Bath Catalogue (name, SKU, finish, catalogue page - the
 * SEO moat), Higgsfield-processed product imagery, finish cards with the
 * orderable-code system, EKO contract framing, fusion cross-link. Pages
 * without catalogue data (shower enclosures, Octane) render exactly as v1.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return jaquarCategories.flatMap((category) =>
    category.collections.map((collection) => ({
      category: category.slug,
      collection: collection.slug,
    })),
  );
}

type Props = { params: Promise<{ category: string; collection: string }> };

const publicDir = join(process.cwd(), "public");

/** Masthead figure: official web image where it exists, else the
 *  generated editorial hero (docs/jaquar-image-provenance.md). */
function heroFor(category: string, collection: string) {
  const official = `/jaquar/${category}/${collection}.webp`;
  if (existsSync(join(publicDir, official)))
    return { src: official, generated: false };
  const generated = `/jaquar/heroes/${category}/${collection}.webp`;
  if (existsSync(join(publicDir, generated)))
    return { src: generated, generated: true };
  return null;
}

/** Products for a page - the taps landing aggregates the tap groups
 *  across every faucet range (owner: "a subcategory for taps"). */
function pageProducts(categorySlug: string, collectionSlug: string) {
  if (categorySlug === "faucets" && collectionSlug === "taps")
    return productsOfGroups("faucets", ["taps", "pressmatic"]);
  return productsOf(categorySlug, collectionSlug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, collection: collectionSlug } = await params;
  const category = jaquarCategoryBySlug.get(categorySlug);
  const collection = jaquarCollectionBySlug(categorySlug, collectionSlug);
  if (!category || !collection) return {};
  const products = pageProducts(categorySlug, collectionSlug);
  const countPhrase = products.length
    ? `All ${products.length} catalogue products with SKUs. `
    : "";
  const hero = heroFor(categorySlug, collectionSlug);
  return {
    title: `Jaquar ${collection.name} ${category.label} - UAE`,
    description: `${collection.blurb} ${countPhrase}Supplied in the UAE by Global Classic, Sharjah - AED trade pricing on request, Jaquar warranty honoured.`,
    alternates: {
      canonical: `/jaquar/${category.slug}/${collection.slug}`,
    },
    openGraph: hero
      ? {
          images: [{ url: hero.src, alt: `Jaquar ${collection.name}` }],
        }
      : undefined,
  };
}

export default async function JaquarCollectionPage({ params }: Props) {
  const { category: categorySlug, collection: collectionSlug } = await params;
  const category = jaquarCategoryBySlug.get(categorySlug);
  const collection = jaquarCollectionBySlug(categorySlug, collectionSlug);
  if (!category || !collection) notFound();

  const products = pageProducts(categorySlug, collectionSlug);
  const pages = products.map((p) => p.page).filter(Boolean);
  const pageRange = pages.length
    ? `pp. ${Math.min(...pages)}-${Math.max(...pages)}`
    : null;
  const section = catalogueSectionFor(categorySlug, collectionSlug);

  const hero = heroFor(categorySlug, collectionSlug);

  const index = category.collections.findIndex(
    (c) => c.slug === collectionSlug,
  );
  const prev = index > 0 ? category.collections[index - 1] : null;
  const next =
    index < category.collections.length - 1
      ? category.collections[index + 1]
      : null;
  const related = category.collections
    .filter((c) => c.slug !== collectionSlug)
    .slice(0, 3);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Jaquar", href: "/jaquar" },
    { label: category.label, href: `/jaquar/${category.slug}` },
    {
      label: collection.name,
      href: `/jaquar/${category.slug}/${collection.slug}`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      {
        "@type": "Product",
        name: `Jaquar ${collection.name} ${category.label}`,
        brand: { "@type": "Brand", name: "Jaquar" },
        ...(hero ? { image: [`${siteConfig.url}${hero.src}`] } : {}),
        description: collection.blurb,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "AED",
          areaServed: "AE",
          seller: { "@type": "Organization", name: siteConfig.legalName },
        },
      },
      ...(products.length
        ? [
            {
              "@type": "ItemList",
              name: `Jaquar ${collection.name} products - 2025-2026 catalogue`,
              numberOfItems: products.length,
              itemListElement: products.slice(0, 50).map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.sku,
              })),
            },
          ]
        : []),
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

      {/* ---------- Masthead - golden split ---------- */}
      <section className="pt-40 pb-16">
        <Container>
          <Breadcrumb items={crumbs} />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.618fr_1fr] lg:items-start">
            <div>
              {collection.tagline && (
                <p className="label-gcb text-bronze">{collection.tagline}</p>
              )}
              <h1 className="font-display text-phi-3 mt-4 tracking-tight text-balance">
                Jaquar {collection.name}{" "}
                <span className="text-muted">
                  {category.label.toLowerCase()}
                </span>
              </h1>

              {collection.projectsOnly && (
                <p className="border-warm-black bg-surface/60 mt-6 inline-block rounded-full border px-5 py-2 text-sm">
                  For projects only - supplied against contract and BOQ
                  enquiries, not retail
                </p>
              )}

              {/* Answer-first paragraph */}
              <p className="mt-6 max-w-2xl text-lg leading-relaxed">
                {collection.blurb} Supplied in the UAE by Global Classic
                Building Material LLC - wholesale from Sharjah, delivery to
                every emirate.
              </p>

              {collection.related && (
                <p className="text-muted mt-4 text-sm">
                  Related range:{" "}
                  <Link
                    href={collection.related.href}
                    className="u-line text-foreground"
                  >
                    {collection.related.label}
                  </Link>
                </p>
              )}

              <div className="mt-8">
                <p className="label-gcb text-muted">In the range</p>
                <ul className="mt-4 grid max-w-xl gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {collection.productTypes.map((type) => (
                    <li key={type} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="bg-bronze mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      <span className="text-sm leading-relaxed">{type}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Finish card with orderable codes */}
              {collection.finishCodes && collection.finishCodes.length > 0 && (
                <div className="mt-8">
                  <p className="label-gcb text-muted">
                    The finish card - swap the middle code to order
                  </p>
                  <ul className="mt-4 flex max-w-xl flex-wrap gap-2">
                    {collection.finishCodes.map((code) => (
                      <li
                        key={code}
                        className="border-border/50 rounded-full border px-3.5 py-1.5 text-sm"
                      >
                        <span className="font-mono text-xs">{code}</span>
                        <span className="text-muted ml-2 text-xs">
                          {FINISH_CODE_NAMES[code] ?? code}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted mt-3 max-w-xl text-xs leading-relaxed">
                    {FINISH_DISCLAIMER}
                  </p>
                </div>
              )}

              {collection.skuSamples && (
                <div className="mt-8">
                  <p className="label-gcb text-muted">
                    Sample SKUs - send any code for pricing
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {collection.skuSamples.map((sku) => (
                      <li
                        key={sku}
                        className="border-border/50 rounded-full border px-3.5 py-1.5 font-mono text-xs"
                      >
                        {sku}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <GcbButton href="/contact" size="md" variant="light">
                  {collection.projectsOnly
                    ? "Send the project BOQ"
                    : "Request AED pricing"}
                </GcbButton>
                <Link
                  href={`/jaquar/${category.slug}`}
                  className="u-line label-gcb"
                >
                  All {category.label.toLowerCase()} collections
                </Link>
              </div>
            </div>

            {hero && (
              <figure className="border-warm-black bg-ink relative aspect-[4/5] overflow-hidden rounded-xl border">
                <Image
                  src={hero.src}
                  alt={
                    hero.generated
                      ? `Jaquar ${collection.name} ${category.label.toLowerCase()} - editorial visual for Global Classic UAE`
                      : `Jaquar ${collection.name} - official product photograph`
                  }
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className={hero.generated ? "object-cover" : "object-contain p-6"}
                  preload
                />
              </figure>
            )}
          </div>
        </Container>
      </section>

      {/* ---------- The range, browsable ---------- */}
      {products.length > 0 && (
        <section className="border-border/30 border-t py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1.618fr_1fr] lg:items-end">
              <div>
                <p className="label-gcb text-muted">The range, in pictures</p>
                <h2 className="font-display text-phi-2 mt-4 tracking-tight">
                  Every {collection.name} product, browsable.
                </h2>
                <p className="text-muted mt-4 max-w-xl text-sm leading-relaxed">
                  {products.length} products from the Jaquar Global Bath
                  Catalogue 2025-2026{pageRange && ` (${pageRange})`} - each
                  with its photograph, specification chips and SKU. Flow rates
                  are at 3 bar. Send any SKU list for AED wholesale pricing.
                </p>
              </div>
              {section && (
                <div className="lg:justify-self-end">
                  <GcbButton
                    href={`/jaquar/catalogue/${section.file}.pdf`}
                    size="sm"
                    variant="light"
                  >
                    Download this section (PDF, {section.size})
                  </GcbButton>
                </div>
              )}
            </div>
            <div className="mt-12">
              <ProductBrowser
                products={products}
                collectionName={collection.name}
              />
            </div>

            {/* Verbatim printed table, folded for reference and search */}
            <details className="border-border/40 group mt-14 rounded-xl border">
              <summary className="label-gcb flex cursor-pointer items-center justify-between px-6 py-4">
                The printed table, verbatim - {products.length} rows
                <span
                  aria-hidden
                  className="transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-6">
                <SpecTable
                  dark={false}
                  caption={`Jaquar ${collection.name} printed product table`}
                  head={["Product as printed", "SKU", "Finish", "Page"]}
                  rows={products.map((p) => [
                    p.name === p.sku ? "-" : p.name,
                    <span key={p.sku} className="font-mono text-xs">
                      {p.sku}
                    </span>,
                    p.finish || "-",
                    p.page ? String(p.page) : "-",
                  ])}
                  minWidth={640}
                />
              </div>
            </details>
          </Container>
        </section>
      )}

      {/* ---------- Also in category ---------- */}
      <section className="border-border/30 border-t py-20">
        <Container>
          <p className="label-gcb text-muted">Also in {category.label}</p>
          <ul className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-3">
            {related.map((r) => {
              const relatedHero = heroFor(category.slug, r.slug);
              return (
                <li key={r.slug}>
                  <Link
                    href={`/jaquar/${category.slug}/${r.slug}`}
                    className="group block"
                  >
                    {relatedHero && (
                      <span className="border-warm-black bg-ink relative block aspect-[4/3] overflow-hidden rounded-xl border">
                        <Image
                          src={relatedHero.src}
                          alt={`Jaquar ${r.name}`}
                          fill
                          sizes="(min-width: 640px) 30vw, 100vw"
                          className={
                            relatedHero.generated
                              ? "object-cover transition-transform duration-500 group-hover:scale-105"
                              : "object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          }
                          loading="lazy"
                        />
                      </span>
                    )}
                    <span className="font-display group-hover:text-bronze mt-4 block text-xl leading-tight transition-colors">
                      {r.name}
                    </span>
                    <span className="text-muted mt-1.5 block text-sm leading-relaxed">
                      {r.blurb}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Prev / next through the category */}
          <nav
            aria-label="Collections"
            className="border-border/30 mt-14 flex items-center justify-between gap-6 border-t pt-8"
          >
            {prev ? (
              <Link
                href={`/jaquar/${category.slug}/${prev.slug}`}
                className="group text-left"
              >
                <span className="label-gcb text-muted">Previous</span>
                <span className="font-display group-hover:text-bronze mt-1 block text-lg transition-colors">
                  {prev.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/jaquar/${category.slug}/${next.slug}`}
                className="group text-right"
              >
                <span className="label-gcb text-muted">Next</span>
                <span className="font-display group-hover:text-bronze mt-1 block text-lg transition-colors">
                  {next.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-20">
        <Container className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl leading-tight">
              {collection.projectsOnly
                ? `Specifying ${collection.name} for a project?`
                : `Need ${collection.name} priced?`}
            </h2>
            <p className="text-ink/70 mt-2 max-w-md">
              Send the SKUs or the BOQ - AED trade pricing from Sharjah stock,
              usually within one working day.
            </p>
          </div>
          <GcbButton href="/contact" size="md" variant="dark">
            Request pricing
          </GcbButton>
        </Container>
      </section>
    </main>
  );
}
