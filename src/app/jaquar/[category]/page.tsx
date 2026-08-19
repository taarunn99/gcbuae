import { existsSync } from "node:fs";
import { join } from "node:path";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CategorySheets } from "@/components/sections/jaquar/category-sheets";
import { FaqAccordion } from "@/components/sections/quartz/faq-accordion";
import { RuleIn } from "@/components/sections/quartz/rule-in";
import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import { jaquarCategories, jaquarCategoryBySlug } from "@/config/jaquar";
import { catalogueSectionFor } from "@/config/jaquar-catalogue";
import { productCount } from "@/config/jaquar-products";
import { siteConfig } from "@/config/site";
import { seoDescription, seoTitle } from "@/lib/seo";

const publicDir = join(process.cwd(), "public");

/** Official web image where it exists, else the generated hero. */
function cardImage(category: string, collection: string) {
  const official = `/jaquar/${category}/${collection}.webp`;
  if (existsSync(join(publicDir, official)))
    return { src: official, generated: false };
  const generated = `/jaquar/heroes/${category}/${collection}.webp`;
  if (existsSync(join(publicDir, generated)))
    return { src: generated, generated: true };
  return null;
}

/**
 * Jaquar category pages - one primary query each ("jaquar faucets UAE",
 * "shower enclosures UAE"...). Official Jaquar product photography,
 * verbatim tech claims, the spec table no UAE competitor publishes,
 * FAQPage schema, and collection cards into the range pages.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return jaquarCategories.map((c) => ({ category: c.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = jaquarCategoryBySlug.get(slug);
  if (!category) return {};
  return {
    title: {
      absolute: seoTitle(
        `Jaquar ${category.label} UAE`,
        " - Dealer Price & Supply",
        " | Global Classic",
      ),
    },
    description: seoDescription(
      `Jaquar ${category.label.toLowerCase()} in the UAE - ${category.collections.length} collections with SKUs, specs and official imagery.`,
      "AED trade pricing from Sharjah stock, dealer warranty honoured.",
      "Delivery to every emirate.",
    ),
    alternates: { canonical: `/jaquar/${category.slug}` },
  };
}

export default async function JaquarCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = jaquarCategoryBySlug.get(slug);
  if (!category) notFound();

  const siblings = jaquarCategories.filter((c) => c.slug !== slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Jaquar", href: "/jaquar" },
    { label: category.label, href: `/jaquar/${category.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      {
        "@type": "CollectionPage",
        name: `Jaquar ${category.label} - UAE`,
        url: `${siteConfig.url}/jaquar/${category.slug}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: category.collections.length,
          itemListElement: category.collections.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Jaquar ${c.name} ${category.label}`,
            url: `${siteConfig.url}/jaquar/${category.slug}/${c.slug}`,
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: category.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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

      {/* ---------- Masthead ---------- */}
      <section className="pt-40 pb-16">
        <Container>
          <Breadcrumb items={crumbs} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.618fr_1fr] lg:items-end">
            <div>
              <h1 className="font-display text-phi-4 max-w-3xl tracking-tight text-balance">
                Jaquar {category.label.toLowerCase()}, in the UAE.
              </h1>
              {/* Answer-first paragraph */}
              <p className="mt-8 max-w-2xl text-lg leading-relaxed">
                {category.intro}
              </p>
              {(() => {
                const section = catalogueSectionFor(category.slug);
                return section ? (
                  <div className="mt-8">
                    <GcbButton
                      href={`/jaquar/catalogue/${section.file}.pdf`}
                      size="sm"
                      variant="light"
                    >
                      Download the catalogue section (PDF, {section.size})
                    </GcbButton>
                  </div>
                ) : null;
              })()}
            </div>
            <figure className="border-warm-black relative hidden aspect-[3/4] overflow-hidden rounded-xl border lg:block">
              <Image
                src={`/jaquar/scenes/${category.slug}.webp`}
                alt={`Jaquar ${category.label.toLowerCase()} in a UAE bathroom scene`}
                fill
                quality={90}
                sizes="320px"
                className="object-cover"
                preload
              />
            </figure>
          </div>
        </Container>
      </section>

      {/* ---------- Collections ---------- */}
      <section className="border-warm-black border-t py-20">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-phi-3 tracking-tight">
              The collections.
            </h2>
            <p className="label-gcb text-muted">
              {category.collections.length} ranges · official imagery
            </p>
          </div>
          <RuleIn className="mt-6 w-full" />

          <ul className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {category.collections.map((collection) => {
              const image = cardImage(category.slug, collection.slug);
              const count = productCount(category.slug, collection.slug);
              return (
                <li key={collection.slug}>
                  <Link
                    href={`/jaquar/${category.slug}/${collection.slug}`}
                    className="group block"
                  >
                    {image && (
                      <span className="border-warm-black bg-ink relative block aspect-[4/3] overflow-hidden rounded-xl border">
                        <Image
                          src={image.src}
                          alt={
                            image.generated
                              ? `Jaquar ${collection.name} ${category.label.toLowerCase()} - editorial visual`
                              : `Jaquar ${collection.name} ${category.label.toLowerCase()} - official product photograph`
                          }
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                          className={
                            image.generated
                              ? "object-cover transition-transform duration-500 group-hover:scale-105"
                              : "object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          }
                          loading="lazy"
                        />
                      </span>
                    )}
                    <span className="mt-4 flex items-baseline justify-between gap-3">
                      <span className="font-display group-hover:text-bronze block text-xl leading-tight transition-colors">
                        {collection.name}
                      </span>
                      {count > 0 && (
                        <span className="text-muted shrink-0 text-xs">
                          {count} products →
                        </span>
                      )}
                    </span>
                    <span className="text-muted mt-1.5 block text-sm leading-relaxed">
                      {collection.blurb}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ---------- Tech claims + specs ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <p className="label-gcb text-bronze">Engineered, then tested</p>
          <h2 className="font-display text-phi-3 mt-4 max-w-2xl tracking-tight text-balance">
            Why specifiers write Jaquar into the BOQ.
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {category.claims.map((claim) => (
              <div key={claim.title} className="border-ink/15 border-t pt-5">
                <h3 className="font-display text-xl">{claim.title}</h3>
                <p className="text-ink/70 mt-3 leading-relaxed">{claim.body}</p>
              </div>
            ))}
          </div>

          {/* The spec table nobody else publishes */}
          <div className="mt-16 max-w-2xl">
            <h3 className="label-gcb text-bronze">
              {category.label} at a glance
            </h3>
            <dl className="divide-ink/10 border-ink/15 mt-5 divide-y border-y">
              {category.specs.map(([term, value]) => (
                <div
                  key={term}
                  className="grid gap-2 py-3 sm:grid-cols-[1fr_1.618fr] sm:gap-4"
                >
                  <dt className="text-ink/60 text-sm">{term}</dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Finish card */}
          <div className="mt-12">
            <h3 className="label-gcb text-bronze">Finishes</h3>
            <ul className="mt-4 flex max-w-3xl flex-wrap gap-2">
              {category.finishes.map((finish) => (
                <li
                  key={finish}
                  className="border-ink/25 rounded-full border px-3.5 py-1.5 text-sm"
                >
                  {finish}
                </li>
              ))}
            </ul>
          </div>

          {/* The printed catalogue sheets nobody else publishes */}
          <CategorySheets category={category.slug} />
        </Container>
      </section>

      {/* ---------- FAQ + siblings ---------- */}
      <section className="py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.618fr_1fr]">
            <div>
              <h2 className="font-display text-phi-2 tracking-tight">
                Asked before every order.
              </h2>
              <div className="mt-8">
                <FaqAccordion items={category.faqs} />
              </div>
            </div>
            <div>
              <p className="label-gcb text-muted">Also from Jaquar</p>
              <ul className="mt-5 space-y-2.5">
                {siblings.map((sibling) => (
                  <li key={sibling.slug}>
                    <Link
                      href={`/jaquar/${sibling.slug}`}
                      className="chip-gcb border-border/50 block rounded-full border px-5 py-2.5 text-sm"
                    >
                      {sibling.label}
                      <span className="text-muted ml-2 text-xs">
                        {sibling.collections.length} collections
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/jaquar"
                    className="chip-gcb border-border/50 block rounded-full border px-5 py-2.5 text-sm"
                  >
                    The Jaquar hub →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-20">
        <Container className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl leading-tight">
              Need Jaquar {category.label.toLowerCase()} priced?
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
