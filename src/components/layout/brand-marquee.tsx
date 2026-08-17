/* eslint-disable @next/next/no-img-element */

/**
 * Distribution-partner marquee. Logos render in their ORIGINAL brand colours
 * - the owner (an authorised distributor of all three) requires unmodified
 * third-party marks; recolouring someone else's trademark is not ours to do.
 * This is the one sanctioned exception to the five-colour palette.
 * FILA logo is the owner-supplied final art; KalingaStone remains interim.
 */
const BRANDS = [
  { name: "KalingaStone", src: "/brands/kalingastone.png", height: 34 },
  { name: "Jaquar Group", src: "/brands/jaquar.png", height: 44 },
  { name: "FILA Surface Care", src: "/brands/fila-logo.svg", height: 48 },
];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-24 pr-24">
      {BRANDS.map((brand) => (
        <img
          key={brand.name}
          src={brand.src}
          alt={brand.name}
          style={{ height: brand.height }}
          className="w-auto shrink-0"
          loading="lazy"
        />
      ))}
    </div>
  );
}

export function BrandMarquee() {
  return (
    <section
      aria-label="Distribution partners"
      className="border-border/40 overflow-hidden border-y py-10"
    >
      <p className="label-gcb text-muted mb-8 text-center">
        Authorised distribution - UAE
      </p>
      <div className="marquee-gcb flex w-max">
        <Track />
        <Track />
        <Track />
        <Track />
      </div>
    </section>
  );
}
