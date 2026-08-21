import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb, breadcrumbJsonLd } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  familyBySlug,
  quartzFamilies,
  shadesOfFamily,
} from "@/config/kalingastone-quartz";
import { siteConfig } from "@/config/site";
import { seoDescription } from "@/lib/seo";

/**
 * Colour-family category pages. Each owns exactly one search query
 * ("white quartz slabs UAE", "grey quartz slabs UAE"…) per GOVERNANCE §1,
 * and links pillar ⇄ category ⇄ shade in both directions (§8 hub & spoke).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return quartzFamilies.map((f) => ({ family: f.slug }));
}

type Props = { params: Promise<{ family: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { family: slug } = await params;
  const family = familyBySlug.get(slug);
  if (!family) return {};
  const count = shadesOfFamily(family.id).length;
  return {
    title: {
      absolute: `${family.label} Slabs UAE - ${count} KalingaStone Shades`,
    },
    description: seoDescription(
      `${count} ${family.label.toLowerCase()} shades from the KalingaStone quartz collection - 20 mm slabs, NSF food safe.`,
      "Stocked in Sharjah, supplied UAE-wide with specs per shade.",
      "AED trade pricing.",
    ),
    alternates: { canonical: `/kalingastone/quartz/colours/${family.slug}` },
  };
}

export default async function QuartzFamilyPage({ params }: Props) {
  const { family: slug } = await params;
  const family = familyBySlug.get(slug);
  if (!family) notFound();

  const shades = shadesOfFamily(family.id);
  const siblings = quartzFamilies.filter((f) => f.slug !== family.slug);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "KalingaStone", href: "/kalingastone" },
    { label: "Quartz", href: "/kalingastone/quartz" },
    { label: family.label, href: `/kalingastone/quartz/colours/${family.slug}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd(crumbs),
      {
        "@type": "CollectionPage",
        name: `KalingaStone ${family.label} - UAE`,
        url: `${siteConfig.url}/kalingastone/quartz/colours/${family.slug}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: shades.length,
          itemListElement: shades.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `KalingaStone Quartz ${s.name}`,
            url: `${siteConfig.url}/kalingastone/quartz/${s.slug}`,
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
            {family.label.toLowerCase().includes("quartz")
              ? `${family.label} slabs in the UAE.`
              : `${family.label} quartz slabs in the UAE.`}
          </h1>

          {/* Answer-first paragraph */}
          <p className="mt-8 max-w-2xl text-lg leading-relaxed">
            {family.intro}
          </p>

          <p className="text-muted mt-6 text-sm">
            {shades.length} shades in this range ·{" "}
            <Link href="/kalingastone/quartz" className="u-line">
              all 69 KalingaStone Quartz shades
            </Link>
          </p>
        </Container>
      </section>

      <section className="border-border/30 border-t py-20">
        <Container>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {shades.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/kalingastone/quartz/${s.slug}`}
                  className="group block"
                >
                  <span className="border-warm-black relative block aspect-[4/3] overflow-hidden rounded-lg border">
                    <Image
                      src={`/kalingastone/quartz/swatches-v2/${s.slug}.webp`}
                      alt={`KalingaStone Quartz ${s.name} - Series ${s.series} ${family.label.toLowerCase()} slab`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
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
                    Series {s.series} · {s.size} mm
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
                  href={`/kalingastone/quartz/colours/${f.slug}`}
                  className="chip-gcb border-border/50 rounded-full border px-5 py-2.5 text-sm"
                >
                  {f.label}
                  <span className="text-muted ml-2">
                    {shadesOfFamily(f.id).length}
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
