/**
 * Catalogue-level Jaquar data, transcribed from the Jaquar Global Bath
 * Catalogue 2025-2026 (364 pp) via the verbatim extraction in
 * docs/jaquar-catalogue.md. Page numbers cite the printed catalogue.
 * Two printed cells in the whirlpool sheet are ambiguous in the source
 * (marked "·"); everything else is as printed, with obvious print typos
 * written correctly in our own voice (never quoted as if fixed).
 * NO PRICES exist in this catalogue - never add price content here.
 */

/* ---------- Finish codes (the SKU decoder backbone, pp40-104) ---------- */

/** Metal finish codes - swap the middle infix: KUP-CHR-35011BPM -> KUP-BLM-35011BPM. */
export const FINISH_CODE_NAMES: Record<string, string> = {
  CHR: "Chrome",
  BLM: "Black Matt",
  BCH: "Black Chrome",
  GBP: "Gold Bright PVD",
  GMP: "Gold Matt PVD",
  BGP: "Blush Gold Bright PVD",
  ACR: "Antique Copper",
  ABR: "Antique Bronze",
  GRF: "Graphite",
  SSF: "Stainless Steel Finish",
  GLD: "Auric Gold",
  /* Dual-tone, Laguna only (p40) */
  BBC: "Lever Black Chrome / Body Black Matt",
  BGM: "Lever Gold Matt PVD / Body Black Matt",
  GMG: "Lever Gold Bright PVD / Body Gold Matt PVD",
  /* Inline codes on sanitaryware, wellness and washroom SKUs */
  WHT: "White",
  WHM: "White Matt",
  BLK: "Black",
  SLV: "Silver",
  SAP: "Satin (stainless)",
  BLC: "Black / Chrome combination",
  NAW: "Natural Wood",
  GRY: "Grey",
  STL: "Steel",
  SSA: "Stainless Steel",
};

/** Printed on every finish card - ships wherever finishes are shown. */
export const FINISH_DISCLAIMER =
  "The finishes depicted here are only indicative and may differ from that on the actual product.";

/** Printed on shower panel, spa and wellness pages. */
export const PICTURES_DISCLAIMER =
  "Pictures shown are for illustration purposes only.";

/* ---------- Warranty matrix (p360) - the honest per-part table ---------- */

export type WarrantyRow = {
  category: string;
  part: string;
  years: string;
};

export const warrantyMatrix: WarrantyRow[] = [
  { category: "Faucets", part: "Faucet, accessory (metal parts) & braided hose", years: "10" },
  { category: "Faucets", part: "Sensor faucet", years: "5" },
  { category: "Faucets", part: "Electronic / electrical assembly for sensor faucet", years: "5" },
  { category: "Faucets", part: "Showertronic", years: "5" },
  { category: "Faucets", part: "Faucets with colour finish", years: "5" },
  { category: "Flushing systems", part: "Flush valve", years: "10" },
  { category: "Flushing systems", part: "Concealed cistern - body & working mechanism", years: "7" },
  { category: "Flushing systems", part: "Wall hung cistern", years: "2" },
  { category: "Flushing systems", part: "Sensor flushing system - body, electronics", years: "5" },
  { category: "Sanitaryware", part: "Ceramic body", years: "10" },
  { category: "Sanitaryware", part: "Mechanical parts", years: "2" },
  { category: "Sanitaryware", part: "UF seat cover", years: "5" },
  { category: "Sanitaryware", part: "PP seat cover", years: "2" },
  { category: "Wellness", part: "Electrical & electronic parts, all products", years: "2" },
  { category: "Wellness", part: "Tub, whirlpool, spa, steam cabin, sauna, shower panel - non-electrical parts", years: "5" },
  { category: "Wellness", part: "Spa shell", years: "2" },
  { category: "Washroom accessories", part: "Hand dryer, soap dispenser, paper towel dispenser", years: "2" },
];

export const hotWaterWarranty: {
  line: string;
  tank: string;
  element: string;
  spares: string;
  compressor: string;
}[] = [
  { line: "Instant", tank: "5", element: "2", spares: "2", compressor: "-" },
  { line: "Storage up to 100 L", tank: "7", element: "4", spares: "2", compressor: "-" },
  { line: "Storage above 100 L", tank: "3", element: "3", spares: "3", compressor: "-" },
  { line: "Tankless", tank: "-", element: "3", spares: "1", compressor: "-" },
  { line: "Heat pump", tank: "4", element: "2", spares: "1", compressor: "2" },
  { line: "Gas geyser", tank: "1", element: "-", spares: "1", compressor: "-" },
];

export const WARRANTY_FOOTNOTE =
  "Warranty does not cover consumables like batteries or fragile items like glass. Warranty is offered by Jaquar & Company Pvt. Ltd. subject to its printed terms.";

/* ---------- Whirlpool specification sheet (pp300-301) ---------- */

export const whirlpoolModels = [
  "Arc 1900x900",
  "Kubix Prime 1800x1100",
  "Opal Prime 1800x800",
  "Kubix 1800x800",
  "Alive 1800x800",
  "D'Arc 1800x1100",
  "Vignette Prime 1900x900",
  "Fonte R 1500x1500",
  "Fonte 1800x800",
  "Fusion 1400x1400",
  "Fonte 1500x750",
  "Fonte 1700x750",
  "Laguna 1800x700",
] as const;

/** Key rows of the printed sheet. "·" marks the two cells the source prints
 *  ambiguously (Opal Prime feet jets / cross control). Pump ratings are
 *  PER-MODEL - four Fonte/Fusion models run 1.0 HP, not the 1.4 HP of the
 *  rest (this corrects the earlier blanket claim). */
export const whirlpoolSheet: { label: string; values: string[] }[] = [
  { label: "Depth (mm)", values: ["470", "480", "470", "470", "470", "470", "470", "470", "450", "450", "420", "420", "450"] },
  { label: "Shell material", values: Array(13).fill("PMMA acrylic") },
  { label: "Reinforcement", values: Array(13).fill("PU Green") },
  { label: "Water jets", values: ["8", "8", "8", "8", "8", "8", "8", "8", "6", "6", "6", "6", "6"] },
  { label: "Air jets", values: ["12", "16", "12", "12", "12", "12", "12", "16", "12", "12", "12", "12", "12"] },
  { label: "Back jets", values: ["4", "4", "4", "4", "4", "4", "4", "0", "4", "4", "4", "4", "4"] },
  { label: "Feet jets", values: ["0", "0", "·", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"] },
  { label: "Water pump", values: ["1.4 HP", "1.4 HP", "1.4 HP", "1.4 HP", "1.4 HP", "1.4 HP", "1.4 HP", "1.4 HP", "1.0 HP", "1.0 HP", "1 HP", "1 HP", "1.4 HP"] },
  { label: "Air blower", values: Array(13).fill("0.90 HP") },
  { label: "Chromotherapy", values: Array(13).fill("Yes") },
  { label: "Headrest", values: ["Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "No", "Yes", "Yes", "Yes", "Yes", "Yes"] },
  { label: "Overflow with drain & filler", values: ["Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "No", "Yes", "No", "No", "Yes"] },
  { label: "System clean / sanitisation", values: ["Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "Yes", "No", "Yes", "No", "No", "No", "Yes"] },
  { label: "Steel frame", values: Array(13).fill("SS202") },
  { label: "3-tier testing", values: Array(13).fill("Yes") },
  { label: "Digital controls", values: Array(13).fill("Yes") },
  { label: "Warranty: body / jets / electrical", values: Array(13).fill("5 / 5 / 2 yr") },
];

export const WHIRLPOOL_SHEET_NOTE =
  "Transcribed from the printed specification sheet (catalogue pp300-301). Two cells marked · are printed ambiguously in the source. All models: food-grade pipes, bow-shape no-bacteria pipes, level sensor, self drainage.";

/* ---------- Spas (pp319-334) ---------- */

export const spaModels: { name: string; size: string; seats: string }[] = [
  { name: "Hydrozone", size: "5900 x 2300 x 1300 mm", seats: "5 seater + swim lane" },
  { name: "Aquagym Max Extreme", size: "4490 x 2310 x 1300 mm", seats: "4 seater" },
  { name: "Aqua Swim", size: "4500 x 2300 x 1300 mm", seats: "swim spa" },
  { name: "Palladium", size: "3520 x 2290 x 920 mm", seats: "9 seater" },
  { name: "Xenon", size: "2300 x 2300 x 920 mm", seats: "6 seater" },
  { name: "Polaris Spa", size: "2200 x 2200 x 900 mm", seats: "6 seater" },
  { name: "Nirwana", size: "2150 x 2150 x 920 mm", seats: "5 seater" },
  { name: "Breva Spa", size: "2000 x 2000 x 900 mm", seats: "5 seater" },
  { name: "Mercury", size: "2000 x 2000 x 920 mm", seats: "5 seater" },
  { name: "Neon", size: "2060 x 1690 x 820 mm", seats: "3 seater" },
  { name: "Nuovo Spa", size: "1950 x 1400 mm", seats: "2 seater" },
  { name: "Avante Top", size: "1870 x 1280 x 740 mm", seats: "2 seater" },
  { name: "Gemini", size: "2100 x 1100 x 740 mm", seats: "2 seater" },
  { name: "Fisher 2", size: "1650 x 1650 x 740 mm", seats: "2 seater" },
];

/** Selected rows of the p334 spa features sheet - the UAE SERP moat. */
export const spaSheetHighlights: [string, string][] = [
  ["Controllers", "Balboa, Gecko and SV-series spa controllers per model"],
  ["Heaters", "Variable output heaters, 1.3 kW to 6 kW max per model"],
  ["Electrical", "13 amp (Nuovo) up to max 60 amps (Hydrozone)"],
  ["Water capacity", "300 litres (Gemini) to 8,100 litres (Aquagym Max)"],
  ["Shell", "Thermo bond 4-layer shell construction, 25 mm high-density PU insulation foam on Balboa models"],
  ["Jets", "Directional and spinning jets in 5 in / 3 in / 2 in sizes plus air, cascade, volcano and laminar jets per the p334 matrix"],
  ["Comfort", "Moulded headrests, hydrotherapy recliners, programmable multi-colour spa light, adjustable aromatherapy, lockable thermic hard cover"],
];

/* ---------- Showers (pp244-281) ---------- */

export const showerTechnologies: { title: string; body: string }[] = [
  {
    title: "Five flows",
    body: "Up to 5 flows per shower - Normal, Soft, Massage, Cascade and Mist - with precise, consistent water distribution to each individual nozzle.",
  },
  {
    title: "Advanced Rubit technology",
    body: "Spray jets in elastic silicone so limescale does not stick to the shower face - and rubs off by hand when it tries.",
  },
  {
    title: "Click Position system",
    body: "You feel and hear the click while changing the spray function - exact function selection, eyes closed.",
  },
  {
    title: "Booster technology",
    body: "Creates the sensation of a full shower regardless of the incoming water pressure.",
  },
  {
    title: "Thermo insulation",
    body: "Insulated shower systems prevent scalding by keeping the shower body from heating up.",
  },
];

export const showerSizes: { shape: string; sizes: string; regDesign: string }[] = [
  { shape: "Square overhead", sizes: "150 x 150 to 450 x 450 mm (5 sizes)", regDesign: "276017" },
  { shape: "Round overhead", sizes: "80 to 300 mm dia (11 sizes)", regDesign: "276016" },
  { shape: "Oval overhead", sizes: "340 x 220 mm", regDesign: "276015" },
  { shape: "Round edge & rectangular", sizes: "200 x 300 mm, 450 x 450 mm", regDesign: "276014" },
  { shape: "Rectangular head", sizes: "552 x 205 x 25 mm, 190 x 295 mm", regDesign: "-" },
  { shape: "Hand showers", sizes: "75 to 180 mm dia (8 sizes)", regDesign: "-" },
];

/* ---------- Flushing systems (pp217-228) ---------- */

export const flushingFacts: [string, string][] = [
  ["Dual flush", "3/6 L, adjustable to 2/4 L"],
  ["i-Flush minimum pressure", "Works from 0.8 bar (32 mm valve)"],
  ["Frame load rating", "Up to 400 kg on the in-wall frame"],
  ["Leg adjustment", "0-200 mm height-adjustable legs"],
  ["Inlet / outlet centres", "Fixed 135 mm centres - no wall chiselling"],
  ["Flush valve warranty", "10 years; concealed cistern body & mechanism 7 years"],
];

/* ---------- Water heaters (pp343-351) ---------- */

export const waterHeaterRanges: { range: string; capacities: string }[] = [
  { range: "Instant electric", capacities: "1 / 3 litres" },
  { range: "Elena Prime (manual, vertical)", capacities: "6 / 10 / 15 / 25 litres" },
  { range: "Elena (manual, horizontal)", capacities: "15 / 25 litres" },
  { range: "Erica (vertical, digital and manual)", capacities: "6 / 10 / 15 / 25 litres" },
  { range: "Versa (manual, vertical and horizontal)", capacities: "30 / 50 / 80 / 100 litres" },
  { range: "Verna (floor mounting)", capacities: "200 / 300 / 400 / 500 litres" },
];

/* ---------- Care rules (p360) ---------- */

export const careRules: string[] = [
  "Clean with a water-soaked soft towel or bathing-soap solution once in a day or two",
  "Never use cleaning agents containing acids or chemicals - flush cleaner, tile cleaner and similar",
  "No salt or vinegar based cleaning agents",
  "Special colour combinations must not be rubbed with emery paper or cleaning powder",
  "Water hardness should not exceed 300-400 ppm",
  "Basins and WCs are heavy - two people should hold them during fixing",
];

/* ---------- The catalogue itself, split for download ---------- */

export type CatalogueSection = {
  file: string;
  label: string;
  pages: string;
  size: string;
};

/** Generated by scripts/split-jaquar-catalogue.mjs from the 364 pp master. */
export const catalogueSections: CatalogueSection[] = [
  { file: "jaquar-brand-and-world", label: "The World of Jaquar", pages: "pp 1-35", size: "9 MB" },
  { file: "jaquar-faucets-sanitaryware", label: "Faucets & Sanitaryware", pages: "pp 36-216", size: "36 MB" },
  { file: "jaquar-flushing-systems", label: "i-Flush & Flushing Systems", pages: "pp 217-228", size: "3 MB" },
  { file: "jaquar-accessories", label: "Accessories", pages: "pp 229-243", size: "2 MB" },
  { file: "jaquar-showers", label: "Showers", pages: "pp 244-281", size: "16 MB" },
  { file: "jaquar-wellness", label: "Wellness - Whirlpools, Bathtubs, Spas, Saunas, Steam", pages: "pp 282-342", size: "14 MB" },
  { file: "jaquar-water-heaters", label: "Water Heaters", pages: "pp 343-351", size: "1 MB" },
  { file: "jaquar-washroom-warranty-care", label: "Washroom Accessories, Warranty & Care", pages: "pp 352-364", size: "1 MB" },
];

/** Which download covers which site category (six-way taxonomy). */
export const catalogueSectionByCategory: Record<string, string> = {
  faucets: "jaquar-faucets-sanitaryware",
  "wash-basins": "jaquar-faucets-sanitaryware",
  "water-closets": "jaquar-faucets-sanitaryware",
  showers: "jaquar-showers",
  wellness: "jaquar-wellness",
  "water-heaters": "jaquar-water-heaters",
};

/** Collection-level overrides where a collection's pages live in a
 *  different printed section than its category's default. */
const catalogueSectionByCollection: Record<string, string> = {
  "i-flush": "jaquar-flushing-systems",
  "flush-valves": "jaquar-flushing-systems",
  cisterns: "jaquar-flushing-systems",
  "flush-plates": "jaquar-flushing-systems",
  "continental-accessories": "jaquar-accessories",
  "continental-prime-accessories": "jaquar-accessories",
  "kubix-prime-accessories": "jaquar-accessories",
  "queens-accessories": "jaquar-accessories",
  "rendezvous-crystal": "jaquar-accessories",
  "combo-pack": "jaquar-accessories",
  "washroom-equipment": "jaquar-washroom-warranty-care",
};

export function catalogueSectionFor(category: string, collection?: string) {
  const file =
    (collection && catalogueSectionByCollection[collection]) ||
    catalogueSectionByCategory[category];
  return catalogueSections.find((s) => s.file === file) ?? null;
}

/* ---------- Entity facts (p13 figures - the current ones) ---------- */

export const jaquarEntity = {
  years: "65+",
  countries: "55+",
  plants: "8 plants over 330,000 m2",
  bathroomsPerYear: "3.3 million bathrooms a year",
  fittingsPerYear: "45.9 million bath fittings a year",
  hq: "LEED Platinum certified Net Positive headquarters",
  redDot: "Winner of the Red Dot Design Award for product design",
  groupBrands: "Essco (1960) - Jaquar (1986) - Artize (2009)",
  designers:
    "Matteo Thun & Antonio Rodriguez, Danelon Meroni, Michael Foley, Parichay Mehra, Lisa Bosi",
  dubai: "Jaquar World Dubai - the first Jaquar World, opened 2017",
  esma: "ESMA certified for the UAE, plus WRAS, DVGW, TISI, WELS, CE and ISO 9001 among 15 printed marks",
  sustainability:
    "2.59 MW solar generated annually, 100,000 litres of rainwater recycled daily, zero liquid discharge",
} as const;
