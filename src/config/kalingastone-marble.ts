/**
 * KalingaStone Marble - complete 35-shade range from the manufacturer's
 * 2023 catalogue extraction. NEVER invent or "correct" shade names -
 * Artic White (not "Arctic"), Mellissa (double l), Dallia (not "Dahlia"),
 * Grigio Billiame, Minta Flurry, Camelia (single l), Emperador Chiara /
 * Scuro (not "Emperor") are the brand's spellings. Catalogue truths that
 * BIND the site copy:
 * - This is the ENGINEERED marble line - CMC makes natural marble in a
 *   separate factory at the same plant; never conflate the two.
 * - ONE slab size: 304 × 125 cm. NO thickness printed - never state one.
 * - Microban is an OPTION on eight shades, not a fixed property ("also
 *   available without microban protection" is printed on every shade
 *   page). Mechanism wording is contested - claim protection and
 *   performance only.
 * - NO NSF mark, kitchen countertops absent from the application list -
 *   never carry the food-safe claim to marble.
 * - Series-5 splits into 5A (Amelia) and 5B (Bianco Thassos) - two
 *   distinct sub-tiers, never collapsed.
 * - The wins: > 85% gloss (highest of the three ranges) and the
 *   REPOLISHABLE surface - unique to this catalogue.
 */

export type MarbleShade = {
  name: string;
  slug: string;
  series: "1" | "2" | "3" | "4" | "5A" | "5B";
  /** Microban is OFFERED on these shades - an option, not an attribute. */
  microbanOption: boolean;
  /** Consolidated colour facet for the four category pages. */
  family: "white" | "cream" | "grey" | "warm";
  /** Shared lifestyle photo slug, where the catalogue has one. */
  lifestyle: string | null;
  /** 1007×398 panels vs 1007×279 grid panels. */
  wideSwatch: boolean;
};

export const marbleShades: MarbleShade[] = [
  {
    name: "Candy White",
    slug: "candy-white",
    series: "1",
    microbanOption: false,
    family: "white",
    lifestyle: "candy-white-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Cristallo",
    slug: "cristallo",
    series: "2",
    microbanOption: true,
    family: "white",
    lifestyle: "cristallo-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Artic White",
    slug: "artic-white",
    series: "2",
    microbanOption: false,
    family: "white",
    lifestyle: "cristallo-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Raffaele",
    slug: "raffaele",
    series: "2",
    microbanOption: true,
    family: "cream",
    lifestyle: "raffaele-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Romolo",
    slug: "romolo",
    series: "2",
    microbanOption: false,
    family: "cream",
    lifestyle: "raffaele-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Bianco Venus",
    slug: "bianco-venus",
    series: "2",
    microbanOption: true,
    family: "white",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Classic Crystal",
    slug: "classic-crystal",
    series: "2",
    microbanOption: false,
    family: "cream",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Crema Nova",
    slug: "crema-nova",
    series: "2",
    microbanOption: false,
    family: "cream",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Dallia",
    slug: "dallia",
    series: "2",
    microbanOption: false,
    family: "cream",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Mellissa",
    slug: "mellissa",
    series: "2",
    microbanOption: false,
    family: "grey",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Ottone",
    slug: "ottone",
    series: "2",
    microbanOption: false,
    family: "cream",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Romeo",
    slug: "romeo",
    series: "2",
    microbanOption: false,
    family: "cream",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Tiberio",
    slug: "tiberio",
    series: "3",
    microbanOption: false,
    family: "cream",
    lifestyle: "tiberio-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Cleopatra",
    slug: "cleopatra",
    series: "3",
    microbanOption: false,
    family: "white",
    lifestyle: "tiberio-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Gardenia",
    slug: "gardenia",
    series: "3",
    microbanOption: false,
    family: "white",
    lifestyle: "gardenia-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Luna",
    slug: "luna",
    series: "3",
    microbanOption: false,
    family: "cream",
    lifestyle: "gardenia-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Aurelio Nuovo",
    slug: "aurelio-nuovo",
    series: "3",
    microbanOption: false,
    family: "white",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Minta Flurry",
    slug: "minta-flurry",
    series: "3",
    microbanOption: true,
    family: "grey",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Palladio Grey",
    slug: "palladio-grey",
    series: "3",
    microbanOption: false,
    family: "grey",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Arcadio",
    slug: "arcadio",
    series: "3",
    microbanOption: false,
    family: "warm",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Grigio Classico",
    slug: "grigio-classico",
    series: "3",
    microbanOption: false,
    family: "grey",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Valente",
    slug: "valente",
    series: "3",
    microbanOption: false,
    family: "warm",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Grigio Billiame",
    slug: "grigio-billiame",
    series: "3",
    microbanOption: false,
    family: "grey",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Ottoman Beige",
    slug: "ottoman-beige",
    series: "3",
    microbanOption: true,
    family: "cream",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Althea",
    slug: "althea",
    series: "4",
    microbanOption: true,
    family: "white",
    lifestyle: "fresh-concrete-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Fresh Concrete",
    slug: "fresh-concrete",
    series: "4",
    microbanOption: false,
    family: "cream",
    lifestyle: "fresh-concrete-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Alyssa",
    slug: "alyssa",
    series: "4",
    microbanOption: false,
    family: "grey",
    lifestyle: "camelia-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Camelia",
    slug: "camelia",
    series: "4",
    microbanOption: false,
    family: "cream",
    lifestyle: "camelia-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Dantea",
    slug: "dantea",
    series: "4",
    microbanOption: true,
    family: "cream",
    lifestyle: null,
    wideSwatch: true,
  },
  {
    name: "Sleek Concrete",
    slug: "sleek-concrete",
    series: "4",
    microbanOption: false,
    family: "grey",
    lifestyle: null,
    wideSwatch: true,
  },
  {
    name: "Emperador Chiara",
    slug: "emperador-chiara",
    series: "4",
    microbanOption: false,
    family: "warm",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Emperador Scuro",
    slug: "emperador-scuro",
    series: "4",
    microbanOption: false,
    family: "warm",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Majestic Grey",
    slug: "majestic-grey",
    series: "4",
    microbanOption: false,
    family: "grey",
    lifestyle: null,
    wideSwatch: false,
  },
  {
    name: "Amelia",
    slug: "amelia",
    series: "5A",
    microbanOption: true,
    family: "white",
    lifestyle: "amelia-lifestyle",
    wideSwatch: true,
  },
  {
    name: "Bianco Thassos",
    slug: "bianco-thassos",
    series: "5B",
    microbanOption: false,
    family: "white",
    lifestyle: "amelia-lifestyle",
    wideSwatch: true,
  },
];

/* ------------------------------------------------------------------ */
/* Colour-category pages - consolidated from the extraction's families */
/* so no page is thin (the range has no black at all).                 */
/* ------------------------------------------------------------------ */

export type MarbleFamily = {
  id: MarbleShade["family"];
  slug: string;
  label: string;
  query: string;
  intro: string;
};

export const marbleFamilies: MarbleFamily[] = [
  {
    id: "white",
    slug: "white-marble",
    label: "White Marble",
    query: "white engineered marble slabs UAE",
    intro:
      "White is where the KalingaStone Marble range concentrates its finest work - from Candy White through Cristallo and Gardenia to Amelia and Bianco Thassos, the brilliant white at the top of the range. Ten shades, all engineered in 304 × 125 cm slabs with the collection's signature > 85% gloss, stocked in Sharjah by Global Classic.",
  },
  {
    id: "cream",
    slug: "cream-beige-marble",
    label: "Cream & Beige Marble",
    query: "cream and beige marble slabs UAE",
    intro:
      "Cream, pearl and beige carry the warm register Gulf interiors are built on - thirteen shades from Classic Crystal and Crema Nova to Tiberio and Ottoman Beige. Engineered marble holds these tones consistently slab after slab, repolishable in situ, in a single 304 × 125 cm format supplied UAE-wide from Sharjah stock.",
  },
  {
    id: "grey",
    slug: "grey-marble",
    label: "Grey Marble",
    query: "grey marble slabs UAE",
    intro:
      "Grey and stone tones for contemporary schemes - Palladio Grey, Grigio Classico, Majestic Grey, the concrete-inspired Sleek Concrete and more. Eight engineered marble shades in 304 × 125 cm slabs, with the range's > 85% polished gloss and a repolishable surface built for high-traffic floors.",
  },
  {
    id: "warm",
    slug: "gold-brown-marble",
    label: "Gold & Emperador Marble",
    query: "emperador brown marble UAE",
    intro:
      "The range's deepest tones: warm gold Arcadio and Valente, and the two Emperador designs - Chiara and Scuro - carrying the classic brown-marble language in an engineered slab. Four shades, 304 × 125 cm, repolishable, stocked in Sharjah and supplied across the UAE.",
  },
];

export const marbleFamilyBySlug = new Map(
  marbleFamilies.map((f) => [f.slug, f]),
);
export const marbleFamilyById = new Map(marbleFamilies.map((f) => [f.id, f]));

export const marbleShadeBySlug = new Map(marbleShades.map((s) => [s.slug, s]));

export const shadesOfMarbleFamily = (id: MarbleShade["family"]) =>
  marbleShades.filter((s) => s.family === id);

/** Catalogue (ascending-series) order - the prev/next pagination axis. */
export const marbleShadeIndex = new Map(
  marbleShades.map((s, i) => [s.slug, i]),
);

/** The six series tiers for the ladder. Series-5 stays split (5A ≠ 5B). */
export const marbleSeries: { series: MarbleShade["series"]; note: string }[] = [
  { series: "1", note: "" },
  { series: "2", note: "the core whites" },
  { series: "3", note: "the largest tier" },
  { series: "4", note: "deep tones & concretes" },
  { series: "5A", note: "Amelia" },
  { series: "5B", note: "Bianco Thassos" },
];
