/**
 * KalingaStone Terrazzo - complete 24-shade range from the manufacturer's
 * 2023 catalogue extraction. NEVER invent or "correct" shade names -
 * Savvanna (double v), Ceppo, Elio, Riva, Colosseo, Deserto, Amara Light
 * and Mateo White are the brand's spellings. Catalogue truths that BIND
 * the site copy:
 * - Collection attribution is PAIR-LEVEL only (Roma & Cafe / Palladiana &
 *   Venetian / Elite) - the catalogue never splits a pair per shade.
 * - ONE slab size for the whole range: 304 × 125 cm. NO thickness is
 *   printed anywhere - never state one.
 * - Forms: Tiles / Slabs / CTS (cut-to-size).
 * - Microban mechanism wording is CONTESTED in the source (treated vs
 *   built-in) - claim protection + performance, never the mechanism.
 * - "Gold Dust" exists only on the fluting page - not a catalogued shade.
 */

export type TerrazzoShade = {
  name: string;
  slug: string;
  /** Commercial tier: "6" (Roma & Cafe) · "7" (Palladiana & Venetian) · "8" (Elite). */
  series: "6" | "7" | "8";
  microban: boolean;
  /** Editorial colour facet (site-side reading, not printed). */
  family: "mono" | "white" | "grey" | "beige" | "brown" | "accent";
  /** Shared per-spread lifestyle photo (slug under /lifestyle/). */
  lifestyle: string;
  /** Colosseo and Elio have taller square swatches (765×804 vs 765×358). */
  squareSwatch: boolean;
};

export const terrazzoShades: TerrazzoShade[] = [
  {
    name: "Colosseo",
    slug: "colosseo",
    series: "6",
    microban: true,
    family: "white",
    lifestyle: "roma-cafe-lifestyle-1",
    squareSwatch: true,
  },
  {
    name: "Forum",
    slug: "forum",
    series: "6",
    microban: false,
    family: "mono",
    lifestyle: "roma-cafe-lifestyle-2",
    squareSwatch: false,
  },
  {
    name: "Navona",
    slug: "navona",
    series: "6",
    microban: false,
    family: "mono",
    lifestyle: "roma-cafe-lifestyle-2",
    squareSwatch: false,
  },
  {
    name: "Imperiale",
    slug: "imperiale",
    series: "6",
    microban: true,
    family: "grey",
    lifestyle: "roma-cafe-lifestyle-3",
    squareSwatch: false,
  },
  {
    name: "Riva",
    slug: "riva",
    series: "6",
    microban: false,
    family: "mono",
    lifestyle: "roma-cafe-lifestyle-3",
    squareSwatch: false,
  },
  {
    name: "Elba",
    slug: "elba",
    series: "6",
    microban: false,
    family: "accent",
    lifestyle: "roma-cafe-lifestyle-4",
    squareSwatch: false,
  },
  {
    name: "Ceppo",
    slug: "ceppo",
    series: "6",
    microban: false,
    family: "beige",
    lifestyle: "roma-cafe-lifestyle-4",
    squareSwatch: false,
  },
  {
    name: "Urban White",
    slug: "urban-white",
    series: "7",
    microban: false,
    family: "white",
    lifestyle: "palladiana-venetian-lifestyle-1",
    squareSwatch: false,
  },
  {
    name: "Docks Grey",
    slug: "docks-grey",
    series: "7",
    microban: true,
    family: "grey",
    lifestyle: "palladiana-venetian-lifestyle-1",
    squareSwatch: false,
  },
  {
    name: "Amara Light",
    slug: "amara-light",
    series: "7",
    microban: false,
    family: "accent",
    lifestyle: "palladiana-venetian-lifestyle-2",
    squareSwatch: false,
  },
  {
    name: "Greta Grey",
    slug: "greta-grey",
    series: "7",
    microban: false,
    family: "grey",
    lifestyle: "palladiana-venetian-lifestyle-2",
    squareSwatch: false,
  },
  {
    name: "Hudson Sky",
    slug: "hudson-sky",
    series: "7",
    microban: false,
    family: "white",
    lifestyle: "palladiana-venetian-lifestyle-3",
    squareSwatch: false,
  },
  {
    name: "Trendy Grey",
    slug: "trendy-grey",
    series: "7",
    microban: false,
    family: "white",
    lifestyle: "palladiana-venetian-lifestyle-3",
    squareSwatch: false,
  },
  {
    name: "Elio",
    slug: "elio",
    series: "8",
    microban: false,
    family: "white",
    lifestyle: "elite-lifestyle-1",
    squareSwatch: true,
  },
  {
    name: "New Deluxe White",
    slug: "new-deluxe-white",
    series: "8",
    microban: false,
    family: "accent",
    lifestyle: "elite-lifestyle-2",
    squareSwatch: false,
  },
  {
    name: "Exotic Green",
    slug: "exotic-green",
    series: "8",
    microban: false,
    family: "accent",
    lifestyle: "elite-lifestyle-2",
    squareSwatch: false,
  },
  {
    name: "Supreme Brown",
    slug: "supreme-brown",
    series: "8",
    microban: false,
    family: "brown",
    lifestyle: "elite-lifestyle-3",
    squareSwatch: false,
  },
  {
    name: "Savvanna",
    slug: "savvanna",
    series: "8",
    microban: false,
    family: "beige",
    lifestyle: "elite-lifestyle-3",
    squareSwatch: false,
  },
  {
    name: "Deserto",
    slug: "deserto",
    series: "8",
    microban: false,
    family: "brown",
    lifestyle: "elite-lifestyle-4",
    squareSwatch: false,
  },
  {
    name: "Jade",
    slug: "jade",
    series: "8",
    microban: false,
    family: "accent",
    lifestyle: "elite-lifestyle-4",
    squareSwatch: false,
  },
  {
    name: "New White Dove",
    slug: "new-white-dove",
    series: "8",
    microban: true,
    family: "white",
    lifestyle: "elite-lifestyle-5",
    squareSwatch: false,
  },
  {
    name: "Mateo White",
    slug: "mateo-white",
    series: "8",
    microban: false,
    family: "white",
    lifestyle: "elite-lifestyle-5",
    squareSwatch: false,
  },
  {
    name: "Terra Cream",
    slug: "terra-cream",
    series: "8",
    microban: false,
    family: "beige",
    lifestyle: "elite-lifestyle-6",
    squareSwatch: false,
  },
  {
    name: "Silver Rock",
    slug: "silver-rock",
    series: "8",
    microban: false,
    family: "beige",
    lifestyle: "elite-lifestyle-6",
    squareSwatch: false,
  },
];

/* ------------------------------------------------------------------ */
/* Collection pairs - the catalogue's own grouping, one page each.     */
/* ------------------------------------------------------------------ */

export type TerrazzoCollection = {
  slug: string;
  label: string;
  series: TerrazzoShade["series"];
  /** The one primary query this page owns. */
  query: string;
  /** Answer-first opening paragraph (40-80 words). */
  intro: string;
  /** The two (or one) design languages, from the catalogue's own copy. */
  languages: { name: string; body: string }[];
};

export const terrazzoCollections: TerrazzoCollection[] = [
  {
    slug: "roma-cafe",
    label: "Roma & Cafe",
    series: "6",
    query: "black, white and earthy terrazzo UAE",
    intro:
      "Roma & Cafe is the Series 6 tier of KalingaStone Terrazzo: Roma carries the classic monochromatic blacks and whites, Cafe the earthy beiges and browns. Seven shades, all in the 304 × 125 cm slab, stocked in Sharjah by Global Classic and supplied across the UAE as tiles, slabs or cut-to-size.",
    languages: [
      {
        name: "Roma",
        body: "Classic monochromatic shades of black and white - age-old glory in new-age designs, elegance that makes a statement like no other.",
      },
      {
        name: "Cafe",
        body: "The beauty of earthy beiges and browns - rich, subtle and classy pastel shades telling a new tale of nostalgia.",
      },
    ],
  },
  {
    slug: "palladiana-venetian",
    label: "Palladiana & Venetian",
    series: "7",
    query: "palladiana terrazzo UAE",
    intro:
      "Palladiana & Venetian is the Series 7 tier of KalingaStone Terrazzo. Palladiana re-interprets the ancient Roman Opus Incertum technique popularised by Andrea Palladio - tightly composed mosaic fragments - while Venetian carries free-flowing chip patterns. Six shades in the 304 × 125 cm slab, supplied UAE-wide from Sharjah stock.",
    languages: [
      {
        name: "Palladiana",
        body: "A re-interpretation of the ancient Roman Opus Incertum construction technique of the 16th century - smaller, tightly composed mosaic patterns with the architect Andrea Palladio's name on them.",
      },
      {
        name: "Venetian",
        body: "Timeless creativity in free-flowing chip patterns - a combination of art, colour and pattern that makes every design truly timeless.",
      },
    ],
  },
  {
    slug: "elite",
    label: "Elite",
    series: "8",
    query: "statement terrazzo slabs UAE",
    intro:
      "Elite is the Series 8 tier of KalingaStone Terrazzo - eleven shades mixing big and small mosaic patterns into a statement art piece per slab, from gallery whites to Exotic Green and Jade. All in the 304 × 125 cm format, stocked in Sharjah and supplied across the UAE as tiles, slabs or cut-to-size.",
    languages: [
      {
        name: "Elite",
        body: "Anything but ordinary - a class mix of big and small mosaic patterns creating a perfect art piece in each slab, made for exquisite taste.",
      },
    ],
  },
];

export const terrazzoCollectionBySlug = new Map(
  terrazzoCollections.map((c) => [c.slug, c]),
);
export const terrazzoCollectionBySeries = new Map(
  terrazzoCollections.map((c) => [c.series, c]),
);

export const terrazzoShadeBySlug = new Map(
  terrazzoShades.map((s) => [s.slug, s]),
);

export const shadesOfTerrazzoCollection = (series: TerrazzoShade["series"]) =>
  terrazzoShades.filter((s) => s.series === series);

/** Catalogue order - the axis for prev/next pagination. */
export const terrazzoShadeIndex = new Map(
  terrazzoShades.map((s, i) => [s.slug, i]),
);

/* ------------------------------------------------------------------ */
/* Fluting - Terrazzo-only signature feature (own page).               */
/* ------------------------------------------------------------------ */

export type FlutingSample = {
  label: string;
  /** File slug under /kalingastone/terrazzo/fluting/. */
  slug: string;
  /** Catalogued base shade, when it exists ("Gold Dust" has none). */
  baseSlug: string | null;
};

export const flutingSamples: FlutingSample[] = [
  { label: "Ceppo - Fluting I", slug: "ceppo-fluting-1", baseSlug: "ceppo" },
  { label: "Ceppo - Fluting II", slug: "ceppo-fluting-2", baseSlug: "ceppo" },
  { label: "Ceppo - Fluting III", slug: "ceppo-fluting-3", baseSlug: "ceppo" },
  { label: "Forum - Fluting", slug: "forum-fluting", baseSlug: "forum" },
  {
    label: "Imperiale - Fluting",
    slug: "imperiale-fluting",
    baseSlug: "imperiale",
  },
  {
    label: "Docks Grey - Fluting",
    slug: "docks-grey-fluting",
    baseSlug: "docks-grey",
  },
  {
    label: "Deluxe White - Fluting",
    slug: "deluxe-white-fluting",
    baseSlug: "new-deluxe-white",
  },
  {
    label: "Exotic Green - Fluting",
    slug: "exotic-green-fluting",
    baseSlug: "exotic-green",
  },
  { label: "Gold Dust - Fluting", slug: "gold-dust-fluting", baseSlug: null },
];
