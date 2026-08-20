/* eslint-disable @next/next/no-img-element */

import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { GcbButton } from "@/components/ui/gcb-button";

/**
 * Jaquar on the home page (owner, 2026-08-19): the products-page brand
 * slide, restaged as a static section between the film and the wheel.
 * Same stage colour, logo, chips, button and scene tiles as the deck;
 * the filmstrip drifts on the marquee instead of the scroll scrub.
 */

const TILES = [
  { src: "/jaquar/scenes/faucets.webp", alt: "Chrome basin mixer running over marble" },
  { src: "/jaquar/scenes/bathtubs.webp", alt: "Freestanding bathtub against a green wall" },
  { src: "/jaquar/scenes/showers.webp", alt: "Rain shower scene" },
  { src: "/jaquar/scenes/sanitary-ware.webp", alt: "Sanitaryware scene" },
  { src: "/jaquar/scenes/wash-basins.webp", alt: "Wash basin scene" },
  { src: "/jaquar/scenes/wellness.webp", alt: "Wellness and spa scene" },
  { src: "/jaquar/scenes/shower-enclosures.webp", alt: "Shower enclosure scene" },
  { src: "/jaquar/scenes/whirlpools.webp", alt: "Whirlpool scene" },
];

function TileStrip() {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3 md:gap-4 md:pr-4">
      {TILES.map((tile, i) => (
        <span
          key={tile.src}
          className={`border-warm-black bg-ink relative block h-24 w-32 shrink-0 overflow-hidden rounded-xl border shadow-sm sm:h-28 sm:w-40 ${
            i % 2 === 1 ? "translate-y-2" : "-translate-y-1"
          }`}
        >
          <Image
            src={tile.src}
            alt={tile.alt}
            fill
            sizes="160px"
            className="object-cover"
            loading="lazy"
          />
        </span>
      ))}
    </div>
  );
}

export function HomeJaquar() {
  return (
    <section
      aria-label="Jaquar bathroom fittings"
      className="overflow-hidden bg-[#CDD5CF] py-20 sm:py-24"
    >
      <div className="container-gcb">
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
            <div className="flex shrink-0 flex-col items-start gap-7">
              <h2 className="sr-only">
                Jaquar bathroom fittings - authorized dealer, UAE
              </h2>
              <img
                src="/brands/jaquar.png"
                alt="Jaquar Group logo"
                width={1000}
                height={331}
                className="h-20 w-auto sm:h-24"
                loading="lazy"
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip-gcb border-warm-black text-warm-black rounded-full border px-4 py-1.5 text-sm">
                  Bathroom fittings
                </span>
                <span className="chip-gcb border-warm-black text-warm-black rounded-full border px-4 py-1.5 text-sm">
                  6 categories · 1,480 catalogued products
                </span>
              </div>
              <GcbButton href="/jaquar" size="md" variant="light">
                Explore Jaquar
              </GcbButton>
            </div>

            {/* The scene filmstrip, drifting on the marquee clock */}
            <div
              className="-mr-5 min-w-0 flex-1 overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] md:-mr-10"
              aria-hidden
            >
              <div className="marquee-gcb flex w-max items-center">
                <TileStrip />
                <TileStrip />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
