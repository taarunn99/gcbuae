/**
 * Distribution-partner marquee. Logos render as single-tone silhouettes via
 * CSS mask-image so third-party brand colours never enter the strict
 * five-colour palette. Two copies of the track scroll seamlessly; the
 * global reduced-motion rule freezes it into a static row.
 */
const BRANDS = [
  { name: "KalingaStone", src: "/brands/kalingastone.png", width: 200 },
  { name: "Jaquar", src: "/brands/jaquar.png", width: 120 },
  { name: "FILA Surface Care", src: "/brands/fila.svg", width: 56 },
];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-24 pr-24">
      {BRANDS.map((brand) => (
        <span
          key={brand.name}
          role="img"
          aria-label={brand.name}
          className="bg-verde block h-14 shrink-0 opacity-80"
          style={{
            width: brand.width,
            maskImage: `url(${brand.src})`,
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "contain",
            WebkitMaskImage: `url(${brand.src})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
          }}
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
        Authorised distribution — UAE
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
