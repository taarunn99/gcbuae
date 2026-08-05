import type { Metadata } from "next";

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
              {/* scroll-mt clears the fixed header when arriving via #anchor */}
              <article
                id={product.slug}
                className="grid scroll-mt-28 gap-4 py-10 sm:grid-cols-[6rem_1fr_1.2fr] sm:items-baseline"
              >
                <span className="label-gcb text-muted">{pad(index + 1)}</span>
                <h2 className="font-display text-2xl sm:text-3xl">
                  {product.label}
                </h2>
                <p className="text-muted leading-relaxed">{product.blurb}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="text-muted max-w-xl leading-relaxed">
            Detailed collections, finishes and technical sheets are being
            prepared. For specifications or availability today,{" "}
            <a
              href="/contact"
              className="text-foreground underline underline-offset-4"
            >
              talk to us
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </main>
  );
}
