import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BeforeAfter } from "@/components/sections/fila/before-after";
import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  filaCategories,
  filaCategoryBySlug,
  filaSystem,
} from "@/config/fila";
import {
  filaProductBySlug,
  filaProducts,
  filaProductsByCategory,
  type FilaCategory,
} from "@/config/fila-products";
import { siteConfig } from "@/config/site";

/**
 * One dynamic segment serves both levels: /fila/cleaners (4 category
 * pages) and /fila/deterdek-pro (34 product pages). Category slugs win
 * the lookup; static siblings (solutions, about, projects) take
 * precedence over this route automatically.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...filaCategories.map((c) => ({ slug: c.slug })),
    ...filaProducts.map((p) => ({ slug: p.slug })),
  ];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = filaCategoryBySlug.get(slug as FilaCategory);
  if (category) {
    return {
      title: { absolute: `FILA ${category.label} UAE - ${category.query} | Global Classic` },
      description: `${category.intro.slice(0, 150)}...`,
      alternates: { canonical: `/fila/${category.slug}` },
    };
  }
  const product = filaProductBySlug.get(slug);
  if (!product) return {};
  return {
    title: `${product.name} UAE - ${product.title}`,
    description: `FILA ${product.name}: ${product.title.toLowerCase()} for ${product.surfaces.slice(0, 3).join(", ").toLowerCase()}. ${product.packaging}. Printed coverage tables, official UAE distribution - wholesale supply, AED trade pricing on enquiry.`,
    alternates: { canonical: `/fila/${product.slug}` },
    openGraph: {
      images: [{ url: `/images/fila/products/${product.slug}.webp`, alt: `FILA ${product.name}` }],
    },
  };
}

export default async function FilaSlugPage({ params }: Props) {
  const { slug } = await params;
  const category = filaCategoryBySlug.get(slug as FilaCategory);
  if (category) return <CategoryView slug={slug as FilaCategory} />;
  const product = filaProductBySlug.get(slug);
  if (!product) notFound();
  return <ProductView slug={slug} />;
}

/* ================= Category view ================= */

function CategoryView({ slug }: { slug: FilaCategory }) {
  const category = filaCategoryBySlug.get(slug)!;
  const products = filaProductsByCategory(slug);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "FILA", href: "/fila" },
    { label: category.label, href: `/fila/${category.slug}` },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      {
        "@type": "CollectionPage",
        name: `FILA ${category.label} - UAE`,
        url: `${siteConfig.url}/fila/${category.slug}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: products.length,
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `FILA ${p.name}`,
            url: `${siteConfig.url}/fila/${p.slug}`,
          })),
        },
      },
    ],
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`/images/fila/heroes/${slug === "ready-to-use" ? "cleaners" : slug}.webp`}
            alt={`FILA ${category.label} in application`}
            fill
            sizes="100vw"
            quality={88}
            className="object-cover"
            preload
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/85 via-[#0B0B0C]/30 to-[#0B0B0C]/20" />
        </div>
        <Container className="relative z-10 pt-44 pb-16 text-white">
          <Breadcrumb items={crumbs} />
          <h1 className="fila-display mt-10 text-[clamp(2.6rem,6.5vw,6rem)]">
            {category.stack.map((word) => (
              <span key={word} className="block">{word}</span>
            ))}
          </h1>
          <span className="fila-bar mt-6" data-fila-bar />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            {category.intro}
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="fila-display text-4xl">
              FILA {category.label.toLowerCase()}.
            </h2>
            <p className="text-sm text-[#0B0B0C]/60">
              {products.length} products · Easy Guide ME 06-2023
            </p>
          </div>
          <span className="fila-bar mt-4" data-fila-bar />
          <div className="fila-masonry mt-10">
            {products.map((p) => (
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
                <span className="fila-display mt-4 block text-lg">{p.name}</span>
                <span className="mt-1 block text-sm text-[#0B0B0C]/70">{p.title}</span>
                <span className="mt-3 block text-xs text-[#0B0B0C]/50">
                  {p.surfaces.slice(0, 3).join(" · ")}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-3">
            {filaCategories
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/fila/${c.slug}`}
                  className="rounded-full border border-[#0B0B0C]/20 px-5 py-2.5 text-sm transition-colors hover:bg-[#0B0B0C] hover:text-white"
                >
                  FILA {c.label}
                </Link>
              ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#0B0B0C] py-16 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="fila-display text-2xl">
            Wholesale and project quantities only.
          </p>
          <GcbButton href="/contact" size="md" variant="dark">
            Send the BOQ
          </GcbButton>
        </Container>
      </section>
    </main>
  );
}

/* ================= Product view ================= */

function ProductView({ slug }: { slug: string }) {
  const product = filaProductBySlug.get(slug)!;
  const category = filaCategoryBySlug.get(product.category)!;
  const stage = filaSystem.find((s) => s.slugs.includes(slug));
  const related = filaProductsByCategory(product.category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "FILA", href: "/fila" },
    { label: category.label, href: `/fila/${category.slug}` },
    { label: product.name, href: `/fila/${product.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      {
        "@type": "Product",
        name: `FILA ${product.name}`,
        brand: { "@type": "Brand", name: "FILA" },
        image: [`${siteConfig.url}/images/fila/products/${product.slug}.webp`],
        description: `${product.title}. ${product.whatFor[0]}`,
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
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="pt-40 pb-20">
        <Container>
          <Breadcrumb items={crumbs} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.618fr] lg:items-start">
            {/* Packshot on the concrete well */}
            <div className="lg:sticky lg:top-32">
              <div className="rounded-xl bg-[#E9E7E0] p-10">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px]">
                  <Image
                    src={`/images/fila/products/${product.slug}.webp`}
                    alt={`${product.name} ${product.title.toLowerCase()} for ${product.surfaces[0].toLowerCase()}, FILA UAE`}
                    fill
                    sizes="(min-width: 1024px) 34vw, 80vw"
                    quality={90}
                    className="object-contain"
                    preload
                  />
                </div>
              </div>
              {product.badges.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.badges.map((badge) => (
                    <li
                      key={badge}
                      className="rounded-full bg-[#0B0B0C] px-3.5 py-1.5 text-xs text-white"
                    >
                      {badge}
                    </li>
                  ))}
                  <li className="rounded-full border border-[#0B0B0C]/20 px-3.5 py-1.5 text-xs">
                    {product.indoorOnly ? "Indoor use" : "Indoor + outdoor"}
                  </li>
                </ul>
              )}
            </div>

            <div>
              <p
                className="fila-display text-sm"
                style={{ color: category.chip }}
              >
                FILA {category.label}
                {product.line === "ready-to-use" && " · Ready to use"}
              </p>
              <h1 className="fila-display mt-3 text-5xl sm:text-6xl">
                {product.name}
              </h1>
              <span className="fila-bar mt-5" data-fila-bar />
              <p className="mt-5 text-xl text-[#0B0B0C]/80">{product.title}</p>

              <h2 className="fila-display mt-10 text-xl">What it&apos;s for</h2>
              <ul className="mt-4 space-y-2.5">
                {product.whatFor.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FED400]" />
                    <span className="leading-relaxed text-[#0B0B0C]/85">{line}</span>
                  </li>
                ))}
              </ul>

              <h2 className="fila-display mt-10 text-xl">Advantages</h2>
              <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {product.advantages.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B0B0C]/30" />
                    <span className="text-sm leading-relaxed text-[#0B0B0C]/80">{line}</span>
                  </li>
                ))}
              </ul>

              <h2 className="fila-display mt-10 text-xl">Surfaces</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.surfaces.map((surface) => (
                  <li key={surface} className="rounded-full border border-[#0B0B0C]/20 px-3.5 py-1.5 text-sm">
                    {surface}
                  </li>
                ))}
              </ul>

              <h2 className="fila-display mt-10 text-xl">
                Coverage and packaging
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[420px] text-sm">
                  <caption className="sr-only">
                    {product.name} printed coverage and dilution
                  </caption>
                  <thead>
                    <tr className="fila-display border-b-2 border-[#FED400] text-left text-xs">
                      <th scope="col" className="py-2 pr-4">Use</th>
                      <th scope="col" className="py-2 pr-4">Dilution</th>
                      <th scope="col" className="py-2">Printed coverage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0B0B0C]/10">
                    {product.coverage.map(([use, dilution, coverage]) => (
                      <tr key={use + dilution}>
                        <td className="py-2.5 pr-4">{use}</td>
                        <td className="py-2.5 pr-4">{dilution}</td>
                        <td className="py-2.5">{coverage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-[#0B0B0C]/70">
                Packaging: {product.packaging} · Easy Guide p{product.page}
              </p>
              <p className="mt-2 text-xs text-[#0B0B0C]/55">
                Before full application, carefully read the instructions on the
                product label or on the technical data sheet found at{" "}
                <a
                  href="https://www.filasolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#FED400] decoration-2 underline-offset-2"
                >
                  filasolutions.com
                </a>
                .
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <GcbButton href="/contact" size="md" variant="light">
                  Request AED trade pricing
                </GcbButton>
                <a
                  href={`https://wa.me/971529927827?text=${encodeURIComponent(`FILA ${product.name} - wholesale enquiry`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fila-display text-sm underline decoration-[#FED400] decoration-4 underline-offset-8"
                >
                  WhatsApp the enquiry
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Scene / before-after */}
      {product.hasScene && (
        <section className="pb-20">
          <Container>
            {product.beforeAfter ? (
              <>
                <h2 className="fila-display text-3xl">Before, after.</h2>
                <span className="fila-bar mt-4 mb-8" data-fila-bar />
                <BeforeAfter
                  src={`/images/fila/scenes/${product.slug}-scene.webp`}
                  alt={`${product.name} before and after application, FILA UAE`}
                />
              </>
            ) : (
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={`/images/fila/scenes/${product.slug}-scene.webp`}
                  alt={`${product.name} in application, FILA UAE`}
                  width={1280}
                  height={720}
                  className="h-auto w-full"
                  loading="lazy"
                />
              </div>
            )}
          </Container>
        </section>
      )}

      {/* System position + related */}
      <section className="border-t border-[#0B0B0C]/10 py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.618fr]">
            {stage && (
              <div>
                <p className="fila-display text-sm text-[#0B0B0C]/50">
                  In the FILA system
                </p>
                <p className="fila-display mt-2 text-4xl">{stage.stage}</p>
                <span className="fila-bar mt-3" data-fila-bar />
                <p className="mt-4 text-sm leading-relaxed text-[#0B0B0C]/70">
                  {stage.body}
                </p>
              </div>
            )}
            <div>
              <p className="fila-display text-sm text-[#0B0B0C]/50">
                Also in {category.label.toLowerCase()}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/fila/${p.slug}`}
                    data-fila-card
                    className="fila-card block rounded-xl bg-[#E9E7E0] p-4"
                  >
                    <div className="relative mx-auto aspect-[4/5] w-full max-w-[140px]">
                      <Image
                        src={`/images/fila/products/${p.slug}.webp`}
                        alt={`${p.name}, FILA UAE`}
                        fill
                        sizes="140px"
                        className="object-contain"
                        loading="lazy"
                      />
                    </div>
                    <span className="fila-display mt-3 block text-sm">{p.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
