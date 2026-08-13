import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { brands } from "@/config/kalingastone";

/**
 * The Brands - the second classification next to the product-line index.
 * The index answers "I need quartz"; this rail answers "I buy
 * KalingaStone" and lands on the brand hubs, whose crumb trails then run
 * Products / Brand / Material. Server-rendered, config-driven.
 */
export function BrandRail() {
  return (
    <section className="border-border/30 border-t py-24">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="label-gcb text-muted">By brand</p>
              <h2 className="font-display text-phi-3 mt-4 tracking-tight">
                The brands.
              </h2>
            </div>
            <p className="label-gcb text-muted">
              Three names · two ways to browse
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, index) => (
            <Reveal key={brand.name} delay={index * 0.05} className="h-full">
              <Link
                href={brand.href}
                className="group border-warm-black flex h-full flex-col rounded-xl border p-7"
              >
                <span className="relative block h-9">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    sizes="200px"
                    className="object-contain object-left"
                    loading="lazy"
                  />
                </span>
                <span className="mt-6 flex items-baseline justify-between gap-3">
                  <span className="font-display group-hover:text-bronze text-phi-1 leading-tight transition-colors">
                    {brand.name}
                  </span>
                  <span className="label-gcb text-muted shrink-0">
                    {brand.role}
                  </span>
                </span>
                <span className="text-muted mt-3 block flex-1 text-sm leading-relaxed">
                  {brand.blurb}
                </span>
                <span className="border-border/40 mt-6 flex items-center justify-between border-t pt-4 text-sm">
                  <span className="text-muted">{brand.stat}</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
