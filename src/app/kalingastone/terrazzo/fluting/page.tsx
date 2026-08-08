import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { FlutingLightPlay } from "@/components/sections/terrazzo/fluting-light-play";
import { Container } from "@/components/ui/container";
import { GcbButton } from "@/components/ui/gcb-button";
import {
  flutingSamples,
  terrazzoShadeBySlug,
} from "@/config/kalingastone-terrazzo";
import { siteConfig } from "@/config/site";

/**
 * The fluting page — KalingaStone's signature terrazzo treatment gets
 * its own indexed URL (catalogue note: "it deserves its own page").
 * Owns the "fluted terrazzo / fluted stone panels UAE" query.
 */

export const metadata: Metadata = {
  title: { absolute: "Fluted Terrazzo Panels UAE — KalingaStone Fluting" },
  description:
    "KalingaStone's fluting programme: shallow machined grooves across terrazzo slabs that play with light. Nine catalogued samples on bases from Ceppo to Exotic Green — supplied UAE-wide from Sharjah stock.",
  alternates: { canonical: "/kalingastone/terrazzo/fluting" },
};

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
          name: "Fluting",
          item: `${siteConfig.url}/kalingastone/terrazzo/fluting`,
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "KalingaStone Terrazzo fluting samples",
      numberOfItems: flutingSamples.length,
      itemListElement: flutingSamples.map((f, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `KalingaStone Terrazzo ${f.label}`,
      })),
    },
  ],
};

export default function FlutingPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ---------- Hero ---------- */}
      <section className="pt-40 pb-16">
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
            <span className="text-foreground">Fluting</span>
          </nav>

          <SplitHeading
            as="h1"
            className="font-display mt-8 max-w-4xl text-4xl leading-tight tracking-tight text-balance sm:text-6xl"
          >
            Fluted terrazzo — grooves that play with light.
          </SplitHeading>

          {/* Answer-first paragraph */}
          <Reveal className="mt-8 max-w-2xl">
            <p className="text-lg leading-relaxed">
              Fluting is KalingaStone&rsquo;s signature terrazzo treatment:
              shallow grooves machined across the slab surface, creating a
              rhythmic play of light and shadow. It is applied to existing
              terrazzo shades — the catalogue shows{" "}
              <strong>nine samples</strong> on bases from Ceppo and Forum to
              Docks Grey and Exotic Green — and it is unique to the terrazzo
              range. The canvas, the technology, the creation.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---------- The light, in your hand — terrazzo's signature ---------- */}
      <section
        aria-label="Fluted terrazzo wall — interactive light"
        className="pb-4"
      >
        <Container>
          <FlutingLightPlay
            src="/kalingastone/terrazzo/fluting-feature.webp"
            alt="Fluted KalingaStone terrazzo wall panel — raking light across machined grooves"
          />
        </Container>
      </section>

      {/* ---------- The nine samples ---------- */}
      <section className="py-24">
        <Container>
          <p className="label-gcb text-muted">The catalogued samples</p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Nine flutes, one technology.
          </h2>
          <p className="text-muted mt-4 max-w-2xl leading-relaxed">
            Groove pitch and aggregate scale vary sample to sample — Ceppo alone
            is catalogued in three flute variants. Where the base shade is part
            of the 24-shade range, the card links to it.
          </p>

          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
            {flutingSamples.map((f) => {
              const base = f.baseSlug
                ? terrazzoShadeBySlug.get(f.baseSlug)
                : null;
              const media = (
                <span className="border-warm-black relative block aspect-[7/4] overflow-hidden rounded-lg border">
                  <Image
                    src={`/kalingastone/terrazzo/fluting/${f.slug}.webp`}
                    alt={`KalingaStone Terrazzo ${f.label} — fluted surface sample`}
                    fill
                    sizes="(min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </span>
              );
              const caption = (
                <span className="mt-2.5 block">
                  <span className="font-display text-foreground group-hover:text-bronze block leading-tight transition-colors">
                    {f.label}
                  </span>
                  <span className="text-muted mt-0.5 block text-[0.7rem]">
                    {base
                      ? `Base shade: ${base.name} · Series ${base.series}`
                      : "Fluting-programme exclusive"}
                  </span>
                </span>
              );
              return (
                <li key={f.slug}>
                  {base ? (
                    <Link
                      href={`/kalingastone/terrazzo/${base.slug}`}
                      className="group block"
                    >
                      {media}
                      {caption}
                    </Link>
                  ) : (
                    <span className="group block">
                      {media}
                      {caption}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ---------- Where fluting works ---------- */}
      <section className="bg-warm-black text-ink grain-gcb relative overflow-hidden py-24">
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="label-gcb text-bronze">Where it works</p>
              <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                Texture for the walls that matter.
              </h2>
              <p className="text-ink/80 mt-6 max-w-xl leading-relaxed">
                Feature walls, reception backdrops, lift lobbies, vanity fronts
                and joinery faces — anywhere a flat surface would disappear,
                fluting gives it rhythm. Cut from the same 304 × 125 cm slabs as
                the rest of the range, with terrazzo&rsquo;s A1 fire
                classification intact.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <GcbButton href="/contact" size="md" variant="dark">
                  Request fluting samples
                </GcbButton>
                <Link
                  href="/kalingastone/terrazzo"
                  className="u-line label-gcb text-ink/80"
                >
                  Back to the range
                </Link>
              </div>
            </div>
            <figure className="relative aspect-[16/15] overflow-hidden rounded-xl">
              <Image
                src="/kalingastone/terrazzo/lifestyle/fluting-lifestyle.webp"
                alt="Fluted KalingaStone terrazzo installed in an interior"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </figure>
          </div>
        </Container>
      </section>
    </main>
  );
}
