import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  jaquarCategories,
  jaquarCategoryBySlug,
  jaquarCollectionBySlug,
} from "@/config/jaquar";
import { siteConfig } from "@/config/site";

/**
 * Jaquar collection range pages - the long-tail layer ("jaquar aria
 * UAE", "kubix prime price"...). Official imagery, real product types
 * and sample SKUs from the scrape, Product JSON-LD, prev/next through
 * the category's collections.
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, collection: collectionSlug } = await params;
  const category = jaquarCategoryBySlug.get(categorySlug);
  const collection = jaquarCollectionBySlug(categorySlug, collectionSlug);
  if (!category || !collection) return {};
  return {
    title: `Jaquar ${collection.name} ${category.label} - UAE`,
    description: `${collection.blurb} Supplied in the UAE by Global Classic, Sharjah - AED trade pricing on request, Jaquar warranty honoured.`,
    alternates: {
      canonical: `/jaquar/${category.slug}/${collection.slug}`,
    },
    openGraph: {
      images: [
        {
          url: `/jaquar/${category.slug}/${collection.slug}.webp`,
          alt: `Jaquar ${collection.name}`,
        },
      ],
    },
  };
}

export default async function JaquarCollectionPage({ params }: Props) {
  const { category: categorySlug, collection: collectionSlug } = await params;
  const category = jaquarCategoryBySlug.get(categorySlug);
  const collection = jaquarCollectionBySlug(categorySlug, collectionSlug);
  if (!category || !collection) notFound();

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

  const image = `/jaquar/${category.slug}/${collection.slug}.webp`;

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
        image: [`${siteConfig.url}${image}`],
        description: collection.blurb,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "AED",
          areaServed: "AE",
          seller: { "@type": "Organization", name: siteConfig.legalName },
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

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.618fr_1fr] lg:items-start">
            <div>
              <h1 className="font-display text-phi-3 tracking-tight text-balance">
                Jaquar {collection.name}{" "}
                <span className="text-muted">
                  {category.label.toLowerCase()}
                </span>
              </h1>

              {/* Answer-first */}
              <p className="mt-8 max-w-xl text-lg leading-relaxed">
                {collection.blurb} Supplied in the UAE by Global Classic as an
                authorized Jaquar dealer - AED trade pricing against Sharjah
                stock, delivery to every emirate, and the Jaquar warranty
                honoured with the paperwork handled.
              </p>

              {/* The range, as printed */}
              <h2 className="label-gcb text-bronze mt-10">In the range</h2>
              <ul className="mt-4 max-w-xl space-y-2.5">
                {collection.productTypes.map((type) => (
                  <li key={type} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="bg-verde mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    <span className="leading-relaxed">{type}</span>
                  </li>
                ))}
              </ul>

              {collection.skuSamples && (
                <>
                  <h2 className="label-gcb text-bronze mt-8">
                    Sample SKUs - send any code for pricing
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {collection.skuSamples.map((sku) => (
                      <li
                        key={sku}
                        className="border-border/50 rounded-full border px-3.5 py-1.5 font-mono text-xs"
                      >
                        {sku}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-10 flex items-center gap-4">
                <GcbButton href="/contact" size="md">
                  Price this range
                </GcbButton>
                <Link
                  href={`/jaquar/${category.slug}`}
                  className="u-line label-gcb text-foreground/80"
                >
                  All {category.label.toLowerCase()} collections
                </Link>
              </div>
            </div>

            <figure className="border-warm-black bg-ink relative aspect-[4/5] overflow-hidden rounded-xl border">
              <Image
                src={image}
                alt={`Jaquar ${collection.name} ${category.label.toLowerCase()} - official product photograph`}
                fill
                quality={90}
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-contain p-6"
                preload
              />
            </figure>
          </div>
        </Container>
      </section>

      {/* Related collections */}
      {related.length > 0 && (
        <section className="border-border/30 border-t py-20">
          <Container>
            <p className="label-gcb text-muted">Also in {category.label}</p>
            <ul className="mt-8 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-3">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/jaquar/${category.slug}/${c.slug}`}
                    className="group block"
                  >
                    <span className="border-warm-black bg-ink relative block aspect-[4/3] overflow-hidden rounded-lg border">
                      <Image
                        src={`/jaquar/${category.slug}/${c.slug}.webp`}
                        alt={`Jaquar ${c.name}`}
                        fill
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </span>
                    <span className="font-display group-hover:text-bronze mt-3 block text-lg leading-tight transition-colors">
                      {c.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Prev / next */}
      <nav
        aria-label="Collection pagination"
        className="border-border/30 border-t"
      >
        <Container className="grid sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/jaquar/${category.slug}/${prev.slug}`}
              rel="prev"
              className="group py-8 pr-6"
            >
              <span className="label-gcb text-muted">← Previous range</span>
              <span className="font-display group-hover:text-bronze mt-2 block text-xl transition-colors">
                {prev.name}
              </span>
            </Link>
          ) : (
            <span aria-hidden className="py-8 pr-6" />
          )}
          {next ? (
            <Link
              href={`/jaquar/${category.slug}/${next.slug}`}
              rel="next"
              className="group py-8 text-right sm:pl-6"
            >
              <span className="label-gcb text-muted">Next range →</span>
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
              Need {collection.name} for a project?
            </h2>
            <p className="text-ink/70 mt-2 max-w-md">
              SKU-level AED pricing from Sharjah stock - usually within one
              working day.
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
