import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { BrandMarquee } from "@/components/layout/brand-marquee";
import { FilmLoop } from "@/components/sections/film/film-loop";
import { Hero } from "@/components/sections/hero";
import { ProductWheel } from "@/components/sections/product-wheel";
import { Container } from "@/components/ui/container";
import { pad } from "@/lib/utils";

// Everything below the hero is still placeholder, pending design direction.
const capabilities = [
  {
    title: "Sourcing",
    body: "Direct supplier relationships across the GCC and beyond, matched to project specifications.",
  },
  {
    title: "Supply",
    body: "Stocked inventory and scheduled deliveries that keep site programmes on track.",
  },
  {
    title: "Support",
    body: "Technical guidance from tender stage through to handover.",
  },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />

      {/* Onyx stage — the darkest green, per the owner's palette direction. */}
      <section className="bg-warm-black grain-gcb relative overflow-hidden py-32">
        <Container className="relative z-10">
          <SplitHeading className="font-display text-ink max-w-3xl text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
            A building materials partner for contractors, developers and
            consultants across the Emirates.
          </SplitHeading>

          <RevealGroup className="mt-20 grid gap-12 sm:grid-cols-3">
            {capabilities.map((item, index) => (
              <RevealItem key={item.title} className="relative">
                {/* Oversized ghost numeral behind each capability. */}
                <span
                  aria-hidden
                  className="font-display text-ink/[0.07] pointer-events-none absolute -top-10 -left-2 text-[7rem] leading-none select-none"
                >
                  {pad(index + 1)}
                </span>
                <span className="label-gcb text-bronze relative">
                  {pad(index + 1)}
                </span>
                <h3 className="font-display text-ink relative mt-4 text-2xl">
                  {item.title}
                </h3>
                <p className="text-ink/70 relative mt-3 leading-relaxed">
                  {item.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <FilmLoop />

      <ProductWheel />

      <BrandMarquee />
    </main>
  );
}
