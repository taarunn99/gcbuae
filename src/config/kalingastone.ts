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
 * Home page "Explore the materials" showcase - one featured shade per
 * material. The swatch fills the collapsed ball and the generated scene
 * fills the expanded panel, and both show the SAME shade (owner spec,
 * 2026-08-17). Scenes are Higgsfield-generated portraits; 4K masters live
 * in assets/source/home-materials/ (gitignored), derivatives are built by
 * scripts/build-home-materials.mjs. Label/href/blurb join from
 * kalingaStoneMaterials by slug - never duplicate them here.
 */
export type HomeMaterialShowcase = {
  slug: KalingaStoneMaterial["slug"];
  shadeSlug: string;
  shadeLabel: string;
  swatch: string;
  scene: string;
  sceneAlt: string;
};

export const homeMaterialsShowcase: HomeMaterialShowcase[] = [
  {
    slug: "quartz",
    shadeSlug: "calacatta-lazza",
    shadeLabel: "Calacatta Lazza",
    swatch: "/kalingastone/quartz/swatches/calacatta-lazza.webp",
    scene: "/home/materials/quartz-scene.webp",
    sceneAlt:
      "Calacatta Lazza quartz kitchen island with a waterfall edge in soft daylight",
  },
  {
    slug: "marble",
    shadeSlug: "emperador-scuro",
    shadeLabel: "Emperador Scuro",
    swatch: "/kalingastone/marble/swatches/emperador-scuro.webp",
    scene: "/home/materials/marble-scene.webp",
    sceneAlt:
      "Emperador Scuro engineered marble vanity wall in a warm bathroom",
  },
  {
    slug: "terrazzo",
    shadeSlug: "exotic-green",
    shadeLabel: "Exotic Green",
    swatch: "/kalingastone/terrazzo/swatches/exotic-green.webp",
    scene: "/home/materials/terrazzo-scene.webp",
    sceneAlt:
      "Exotic Green terrazzo floor with green marble chips in a gallery stair hall",
  },
];

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
    href: "/fila",
    logo: "/brands/fila-logo.svg",
    role: "Surface care",
    blurb:
      "Italian surface care since 1943 - 34 professional cleaners, protectors and finishes with printed coverage tables, official UAE distribution.",
    stat: "34 products · 4 lines",
  },
];
