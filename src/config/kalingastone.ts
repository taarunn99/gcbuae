import { marbleShades } from "./kalingastone-marble";
import { quartzShades } from "./kalingastone-quartz";
import { terrazzoShades } from "./kalingastone-terrazzo";

/**
 * Brand-level KalingaStone facts (mirrors jaquarBrand in jaquar.ts) - the
 * single source for the /kalingastone hub and the /products brand rail.
 * Every figure is already published on the pillar pages; nothing invented.
 */

export const kalingaStoneBrand = {
  maker: "Classic Marble Company (CMC)",
  plant: "200,000 m² plant in Silvassa, India",
  quartzCapacity: "80,000 m² quartz per month",
  designs: "150+",
  countries: "66",
  recycled: ">90%",
  gloss: ">85%",
  superjumbo: "3300 × 2000 mm",
  authorization: "Authorized reseller, Northern Emirates - in writing",
} as const;

export type KalingaStoneMaterial = {
  slug: "quartz" | "marble" | "terrazzo";
  label: string;
  href: string;
  shadeCount: number;
  blurb: string;
};

export const kalingaStoneMaterials: KalingaStoneMaterial[] = [
  {
    slug: "quartz",
    label: "Quartz",
    href: "/kalingastone/quartz",
    shadeCount: quartzShades.length,
    blurb:
      "Engineered quartz in seven series - NSF food safe, Microban® options, formats up to the 3300 × 2000 mm superjumbo.",
  },
  {
    slug: "marble",
    label: "Marble",
    href: "/kalingastone/marble",
    shadeCount: marbleShades.length,
    blurb:
      "Engineered marble across five series in 304 × 125 cm slabs, polished past 85% gloss on SIMEC (Italy) lines.",
  },
  {
    slug: "terrazzo",
    label: "Terrazzo",
    href: "/kalingastone/terrazzo",
    shadeCount: terrazzoShades.length,
    blurb:
      "Block-form terrazzo in five collections - Class A1 fire rated, exterior grade, with fluted panel options.",
  },
];

/** Total shades across the three materials - quoted on hub and brand rail. */
export const kalingaStoneShadeTotal =
  quartzShades.length + marbleShades.length + terrazzoShades.length;

/**
 * The Brands classification - the second way into the catalogue next to the
 * product-line index. Consumed by the /products brand rail; hrefs are the
 * brand hubs (FILA's hub is pending owner files, so it routes to contact).
 */

export type Brand = {
  name: string;
  href: string;
  logo: string;
  role: string;
  blurb: string;
  stat: string;
};

export const brands: Brand[] = [
  {
    name: "KalingaStone",
    href: "/kalingastone",
    logo: "/brands/kalingastone.png",
    role: "Engineered stone",
    blurb:
      "Quartz, marble and terrazzo slabs by Classic Marble Company - authorized reseller for the Northern Emirates.",
    stat: `${kalingaStoneShadeTotal} shades · 3 materials`,
  },
  {
    name: "Jaquar",
    href: "/jaquar",
    logo: "/brands/jaquar.png",
    role: "Bathroom fittings",
    blurb:
      "Faucets, sanitaryware, showers, enclosures and whirlpools - authorized dealer, 10-year warranty serviced in the UAE.",
    stat: "6 categories · 1,480 catalogued products",
  },
  {
    name: "FILA",
    href: "/contact",
    logo: "/brands/fila.svg",
    role: "Surface care",
    blurb:
      "Sealers, cleaners and maintenance systems for stone surfaces - brand pages in production, catalogue on request.",
    stat: "Care systems · enquire",
  },
];
