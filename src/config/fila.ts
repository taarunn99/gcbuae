/**
 * FILA brand hub meta - facts verbatim from docs/fila-catalogue.md
 * (Company Profile 2024 + Easy Guide ME 06-2023) with printed pages.
 * The 15 source flags are respected; none propagate here. NO PRICES.
 */
import type { FilaCategory } from "./fila-products";

export const filaBrand = {
  positioning: "WE TAKE CARE OF SURFACES.",
  legalName: "FILA INDUSTRIA CHIMICA SPA",
  founded: "1943",
  founders: "twins Guido and Pietro Pettenon",
  nameOrigin: "Fabbrica Italiana di Lucidi e Affini",
  reach: "almost 90 countries",
  partnerships: "+240 partnerships",
  academyTrained: "+4000 trained per year",
  academyYears: "40+ years of training",
  waterBased: "more than 83% water-based products",
  heritage:
    "Admitted to the Registry of Historical Brands of Italian National Interest (Marchio Storico)",
  certifications:
    "UNI EN ISO 9001 and 14001 (TUV Rheinland) - Indoor Air Comfort Gold by Eurofins, September 2022, first in its sector in Italy - Climate Pledge signatory, net zero carbon by 2040",
  recommended:
    "#1 recommended: all of its products are recommended by the most important wall and floor manufacturers",
  middleEast:
    "FILA Middle East Branch Office, 2705 Fortune Tower, JLT, Dubai, UAE - since 2012",
  distributor:
    "Official UAE distribution by Lapiz Blue - Global Classic supplies the trade",
  mission:
    "At FILA, we take care of the beauty of surfaces over time, bringing wellness and balance into spaces brimming with life.",
  partnerNames: [
    "Atlas Concorde", "Bisazza", "Casone", "Cerasarda", "Coem", "Fiandre",
    "Fioranese", "Ilva", "Imola", "Inalco", "Keraben", "Laminam", "Marazzi",
    "Margraf", "Marca Corona 1741", "Panaria", "Ricchetti", "Salvatori",
    "Sannini", "Ceramica Sant'Agostino", "Serenissima CIR", "Unicomstarker",
  ],
} as const;

export type FilaCategoryMeta = {
  slug: FilaCategory;
  label: string;
  chip: string;
  query: string;
  intro: string;
  stack: [string, string, string];
};

export const filaCategories: FilaCategoryMeta[] = [
  {
    slug: "cleaners",
    label: "Cleaners",
    chip: "#2AA9DF",
    query: "tile cleaner UAE",
    intro:
      "Eleven professional cleaners from end-of-work washing to rust, silicone and epoxy removal - the chemistry that rescues a site handover. Buffered acids that produce no harmful fumes, degreasers that clean but do not attack, and spot removers that work in minutes. Supplied wholesale in the UAE.",
    stack: ["WASH", "STRIP", "RESCUE"],
  },
  {
    slug: "protectors",
    label: "Protectors",
    chip: "#E8442E",
    query: "stone sealer UAE",
    intro:
      "Fourteen professional sealers and repellents - from PW10 before the slab is even laid to MP90 ECO XTREME on the finished marble top. Water- and oil-repellent chemistry, anti-graffiti systems, efflorescence blockers and concrete consolidants, most of them water-based with Indoor Air Comfort Gold certificates. Supplied wholesale in the UAE.",
    stack: ["SEAL", "REPEL", "ENDURE"],
  },
  {
    slug: "finishing",
    label: "Finishing",
    chip: "#F07E1B",
    query: "floor wax finish UAE",
    intro:
      "Two professional finishes, indoor only: CLASSIC, the eco-friendly liquid wax that revives polished marble, terrazzo and terracotta with a natural sheen - and LONGLIFE, the glossy polymer wax built for high-traffic floors from stone to PVC and resin. Supplied wholesale in the UAE.",
    stack: ["WAX", "SHINE", "PROTECT"],
  },
  {
    slug: "ready-to-use",
    label: "Ready to Use",
    chip: "#2AA9DF",
    query: "surface care spray UAE",
    intro:
      "Seven ready-to-use sprays for the maintenance phase: daily worktop care with MARBLE REFRESH, limescale control with DEEPCLEAN and NODROPS, grout care with FUGANET and FUGAPROOF, and whole-home cleaning with CLEAN&SHINE and RAPIDSAN. The products a completed project keeps ordering. Supplied wholesale in the UAE.",
    stack: ["SPRAY", "WIPE", "DONE"],
  },
];

export const filaCategoryBySlug = new Map(
  filaCategories.map((c) => [c.slug, c]),
);

/** The FILA system sequence (catalogue section 5) - the conversion engine. */
export const filaSystem: {
  stage: string;
  body: string;
  slugs: string[];
}[] = [
  {
    stage: "PREPARE",
    body: "Before the first slab is laid: block efflorescence from the back.",
    slugs: ["pw10"],
  },
  {
    stage: "CLEAN",
    body: "End of work: strip the site off the surface without attacking it.",
    slugs: ["deterdek-pro", "instant-remover", "ps87-pro", "phzero", "cr10"],
  },
  {
    stage: "PROTECT",
    body: "Seal the stone against water, oil, dirt and graffiti.",
    slugs: ["mp90-eco-xtreme", "fob-xtreme", "w68", "hydrorep-eco", "stoneplus-eco", "fugaproof"],
  },
  {
    stage: "FINISH",
    body: "Indoor floors take their wax - natural sheen or high-traffic gloss.",
    slugs: ["classic", "longlife"],
  },
  {
    stage: "MAINTAIN",
    body: "The daily ritual that keeps the protection alive.",
    slugs: ["cleaner-pro", "marble-refresh", "deepclean", "nodrops", "clean-and-shine"],
  },
];

/** Problem router (only pairings supported by catalogue text). */
export const filaSolutions: { problem: string; answer: string; slugs: string[] }[] = [
  { problem: "Grout haze and building-site residue after tiling", answer: "End-of-work washing with the buffered-acid detergent that removes deposits without attacking the material.", slugs: ["deterdek-pro"] },
  { problem: "Fresh cement grout smears during laying", answer: "Spray and wipe during the laying process - Rapid Dry Technology, no rinsing.", slugs: ["instant-remover"] },
  { problem: "Oil or grease stain on a marble worktop", answer: "Protect with the eco stain shield; maintain daily with the pH-neutral worktop spray.", slugs: ["mp90-eco-xtreme", "marble-refresh"] },
  { problem: "Rust stain on polished marble", answer: "The non-acidic rust remover made for delicate polished surfaces - works in 15 minutes.", slugs: ["norust"] },
  { problem: "Limescale in bathrooms and showers", answer: "Descale the bathroom without dulling it; keep shower glass hydrophilic so limescale never settles.", slugs: ["deepclean", "nodrops"] },
  { problem: "Efflorescence risk before laying natural stone", answer: "Treat the back of the slab before it is laid - salts and oxides never rise to the face.", slugs: ["pw10"] },
  { problem: "Silicone smears and adhesive residues", answer: "Dissolves hardened silicone in 20 minutes, spatula included.", slugs: ["zerosil"] },
  { problem: "Old wax or unknown treatments to strip", answer: "The solvent-based remover for seasoned treatments - or the 3-in-1 degreaser for water-based waxes.", slugs: ["max", "ps87-pro"] },
  { problem: "Coloured stains - wine, coffee, marker", answer: "The stain remover developed for natural stone that does not attack polished finishes.", slugs: ["sr95"] },
  { problem: "Grout joints going grey", answer: "Deep-clean the lines, then seal them against water and stains.", slugs: ["fuganet", "fugaproof"] },
];

/** Reference projects (Profile 20-21; Guide 2). CLEANER PRO spelled correctly per flag 3. */
export const filaProjects: { name: string; place: string; products: string[]; image: string }[] = [
  { name: "Gipsoteca di Canova", place: "Possagno, Italy", products: ["CLEANER PRO", "CLASSIC", "PS87 PRO", "HYDROREP ECO", "ALGAENET"], image: "gipsoteca-di-canova-italy" },
  { name: "Hotel Mondrian", place: "Doha, Qatar", products: ["CLEANER PRO", "PS87 PRO", "STOP DIRT"], image: "hotel-mondrian-qatar-lobby" },
  { name: "Canadian Museum for Human Rights", place: "Winnipeg, Canada", products: ["MP90 ECO XTREME"], image: "canadian-museum-human-rights" },
  { name: "Library of Birmingham", place: "Birmingham, England", products: ["W68", "CLEANER PRO"], image: "library-of-birmingham-england" },
  { name: "Apple Store Piazza Liberty", place: "Milan, Italy", products: ["DETERDEK PRO", "MP90 ECO XTREME", "MATT", "CLEANER PRO", "PS87 PRO"], image: "apple-store-piazza-liberty-italy" },
];

export const filaStats: [string, string][] = [
  ["1943", "founded by the Pettenon twins"],
  ["90", "countries, almost - one expertise"],
  ["+240", "manufacturer partnerships"],
  ["+4000", "professionals trained every year"],
];
