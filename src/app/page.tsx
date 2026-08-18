import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Channels } from "@/components/sections/channels";
import { HomeContact } from "@/components/sections/home-contact";
import { SplitHeading } from "@/components/motion/split-heading";
import { BrandMarquee } from "@/components/layout/brand-marquee";
import { FilmLoop } from "@/components/sections/film/film-loop";
import { GlobalPresence } from "@/components/sections/global-presence";
import { Hero } from "@/components/sections/hero";
import { MaterialsExplore } from "@/components/sections/materials-explore";
import { ProductWheel } from "@/components/sections/product-wheel";
import { ShowroomLocator } from "@/components/sections/showroom-locator";
import { Container } from "@/components/ui/container";
import { kalingaStoneMaterials } from "@/config/kalingastone";
import { siteConfig } from "@/config/site";
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

/** The closing materials showcase, mirrored as structured data. */
const materialsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "KalingaStone materials at Global Classic",
  itemListElement: kalingaStoneMaterials.map((material, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `KalingaStone ${material.label}`,
    url: `${siteConfig.url}${material.href}`,
  })),
};

export default function HomePage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(materialsJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />

      {/* Onyx stage - the darkest green, per the owner's palette direction. */}
      <section className="bg-warm-black grain-gcb relative overflow-hidden py-32">
        <Container className="relative z-10">
          <SplitHeading className="font-display text-ink max-w-3xl text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
            A building materials partner for contractors, developers and
            consultants across the Emirates.
          </SplitHeading>

          <RevealGroup className="mt-20 grid gap-12 sm:grid-cols-3">
            {capabilities.map((item, index) => (
              <RevealItem key={item.title}>
                {/* One prominent numeral: Dusty Olive display figure with a
                    hairline, owning the top of each column. */}
                <span
                  aria-hidden
                  className="font-display text-ink block text-6xl leading-none"
                >
                  {pad(index + 1)}
                </span>
                <span aria-hidden className="bg-ink/40 mt-5 block h-px w-12" />
                <h3 className="font-display text-ink mt-6 text-2xl">
                  {item.title}
                </h3>
                <p className="text-ink/70 mt-3 leading-relaxed">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <FilmLoop />

      <ProductWheel />

      <BrandMarquee />

      <MaterialsExplore />

      <ShowroomLocator />

      <GlobalPresence />

      <HomeContact />

      <Channels />
    </main>
  );
}
