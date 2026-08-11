import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { ProductsVideoHero } from "@/components/sections/products-video-hero";
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

/** Where each line goes. Lines without a hub yet lead to the enquiry page. */
const HUBS: Record<string, string> = {
  quartz: "/kalingastone/quartz",
  "naturally-engineered-marble": "/kalingastone/marble",
  terrazzo: "/kalingastone/terrazzo",
};

export default function ProductsPage() {
  return (
    <main className="theme-forest bg-background text-foreground flex-1 pb-32">
      {/* SEO heading for the video hero (the visible word lives in the mask) */}
      <h1 className="sr-only">
        Products — KalingaStone quartz, marble and terrazzo slabs, showers,
        taps, sanitaryware and surface care, supplied across the UAE.
      </h1>

      <ProductsVideoHero />

      <Container>
        <Reveal className="mt-20">
          <p className="label-gcb text-muted">The lines</p>
          <p className="font-display mt-6 max-w-3xl text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
            Eight ways a room becomes permanent.
          </p>
        </Reveal>

        <div className="mt-16 divide-y border-y">
          {siteConfig.products.map((product, index) => {
            const href = HUBS[product.slug] ?? "/contact";
            return (
              <Reveal key={product.slug}>
                {/* The WHOLE row is the link — tap anywhere to travel.
                    Hover: an Onyx rectangle sweeps in from the left and the
                    type inverts to Porcelain. scroll-mt clears the fixed
                    header when arriving via #anchor. */}
                <Link
                  href={href}
                  id={product.slug}
                  className="group relative block scroll-mt-28 overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="bg-warm-black absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
                  />
                  <span className="relative grid gap-4 px-4 py-12 sm:grid-cols-[7rem_1fr_1.2fr] sm:items-baseline sm:px-6">
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
                    <span className="text-foreground/80 group-hover:text-ink/80 block leading-relaxed transition-colors duration-500">
                      {product.blurb}{" "}
                      <span className="u-line whitespace-nowrap">
                        {HUBS[product.slug]
                          ? "Explore the KalingaStone range →"
                          : "Talk to us about this line →"}
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16">
          <p className="text-muted max-w-xl leading-relaxed">
            Detailed collections, finishes and technical sheets are being
            prepared. For specifications or availability today,{" "}
            <Link href="/contact" className="u-line text-foreground">
              talk to us
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </main>
  );
}
