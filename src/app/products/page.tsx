import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Quartz, naturally engineered marble, terrazzo, showers, taps, sanitaryware, shower trays, and marble care — supplied across the UAE.",
  // Without this, the root layout's canonical ("/") is inherited and this
  // page tells Google it is a copy of the homepage. GOVERNANCE §6.
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1 pt-40 pb-32">
      <Container>
        <p className="label-gcb text-muted">Products</p>
        <SplitHeading
          as="h1"
          className="font-display mt-6 max-w-3xl text-4xl leading-tight tracking-tight text-balance sm:text-6xl"
        >
          Eight ways a room becomes permanent.
        </SplitHeading>

        <div className="mt-24 divide-y border-y">
          {siteConfig.products.map((product, index) => (
            <Reveal key={product.slug}>
              {/* scroll-mt clears the fixed header when arriving via #anchor.
                  Hover: an Onyx rectangle sweeps in from the left and the
                  type inverts to Porcelain — the owner's requested invert. */}
              <article
                id={product.slug}
                className="group relative scroll-mt-28 overflow-hidden"
              >
                <span
                  aria-hidden
                  className="bg-warm-black absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
                />
                <div className="relative grid gap-4 px-4 py-12 sm:grid-cols-[7rem_1fr_1.2fr] sm:items-baseline sm:px-6">
                  {/* One prominent display numeral, inverting with the sweep. */}
                  <span
                    aria-hidden
                    className="font-display text-bronze group-hover:text-ink text-5xl leading-none transition-colors duration-500 sm:text-6xl"
                  >
                    {pad(index + 1)}
                  </span>
                  <h2 className="font-display text-foreground group-hover:text-ink text-2xl transition-colors duration-500 sm:text-3xl">
                    {product.label}
                  </h2>
                  <p className="text-foreground/80 group-hover:text-ink/80 leading-relaxed transition-colors duration-500">
                    {product.blurb}
                    {product.slug === "naturally-engineered-marble" && (
                      <>
                        {" "}
                        <Link
                          href="/kalingastone/marble"
                          className="u-line whitespace-nowrap"
                        >
                          Explore the KalingaStone range →
                        </Link>
                      </>
                    )}
                    {product.slug === "terrazzo" && (
                      <>
                        {" "}
                        <Link
                          href="/kalingastone/terrazzo"
                          className="u-line whitespace-nowrap"
                        >
                          Explore the KalingaStone range →
                        </Link>
                      </>
                    )}
                    {product.slug === "quartz" && (
                      <>
                        {" "}
                        <Link
                          href="/kalingastone/quartz"
                          className="u-line whitespace-nowrap"
                        >
                          Explore the KalingaStone range →
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="text-muted max-w-xl leading-relaxed">
            Detailed collections, finishes and technical sheets are being
            prepared. For specifications or availability today,{" "}
            <a href="/contact" className="u-line text-foreground">
              talk to us
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </main>
  );
}
