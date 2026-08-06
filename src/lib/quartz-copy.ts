import type { QuartzShade } from "@/config/kalingastone-quartz";

/**
 * Deterministic editorial copy for the 69 shade pages, composed strictly
 * from catalogue facts (family, series tier, slab format, Microban, NEW
 * flag). Nothing visual is invented beyond the family-level language —
 * the swatch photograph does the describing. Sentences vary by facet so
 * no two pages read as duplicates.
 */

const FAMILY_CHARACTER: Record<QuartzShade["family"], string> = {
  white:
    "a white-ground design — the palette UAE kitchens and joinery are most often specified around, and the one that shows workmanship most honestly",
  veined:
    "a marble-look design, carrying the veined drama of natural Calacatta and Carrara stones in an engineered slab that does not share their porosity",
  beige:
    "a cream-and-beige design in the warm register Gulf interiors are built on — sand, travertine and crema tones that sit naturally with brass, walnut and warm plaster",
  grey: "a grey design in the working palette of contemporary UAE architecture — tones that hold their own against concrete, steel and pale timber",
  dark: "a dark design — the strongest single statement a surface can make, reading as depth rather than colour under showroom and daylight alike",
};

const SERIES_POSITION: Record<string, string> = {
  "7": "Series 7 sits at the top of the KalingaStone Quartz collection — the premium veined tier, where the most complex marble-look designs live.",
  "6": "Series 6 is the collection's second tier, a step below the premium veined designs, balancing design complexity against project budgets.",
  "5": "Series 5 sits in the upper-middle of the collection — layered designs with more movement than the core tiers.",
  "4": "Series 4 is the collection's upper-middle tier, where design depth starts to build over the essential particulates.",
  "3": "Series 3 is the workhorse of the collection — its largest single tier, and the range most UAE projects specify from.",
  "2": "Series 2 sits just above the essentials — economical slabs with more design interest than the entry tier.",
  "1 A":
    "Series 1 A is a catalogue tier of its own, positioned with the essential range.",
  "1": "Series 1 is the essential tier — the most economical slabs in the collection, engineered to the same 20 mm specification as every other series.",
};

export function shadeIntro(shade: QuartzShade): string {
  const character = FAMILY_CHARACTER[shade.family];
  return `${shade.name} is ${character}. It is a KalingaStone engineered quartz slab in Series ${shade.series}, produced at ${shade.size} mm, and supplied in the UAE by Global Classic Building Material LLC from stock in Sharjah.`;
}

export function shadeBody(shade: QuartzShade): string[] {
  const paragraphs: string[] = [];

  paragraphs.push(SERIES_POSITION[shade.series] ?? "");

  const [w, h] = shade.size.split("×").map((p) => p.trim());
  const isSuperjumbo = shade.size.startsWith("3300");
  paragraphs.push(
    isSuperjumbo
      ? `The slab format is the collection's superjumbo — ${w} × ${h} mm at 20 mm thickness, the largest quartz format KalingaStone produces. It allows kitchen islands, counters and double-height cladding panels to be cut with minimal joints.`
      : `The slab format is ${w} × ${h} mm at 20 mm thickness. Like every KalingaStone Quartz slab it is non-porous, with water absorption below 0.05% — lower than natural granite — NSF-certified food safe, and resistant to heat, stains and scratches.`,
  );

  if (shade.microban) {
    paragraphs.push(
      `${shade.name} is one of only eight shades in the collection manufactured with Microban® antibacterial protection: the technology is built into the slab at manufacture, reduces up to 99.99% of bacterial growth, works continuously for the product's lifetime and cannot wash off or wear away. (Microban is not available for products sold in the USA.)`,
    );
  }

  if (shade.isNew) {
    paragraphs.push(
      `It carries the NEW mark in the current catalogue — one of fifteen designs added in KalingaStone's latest quartz release.`,
    );
  }

  paragraphs.push(
    `Typical applications: kitchen countertops and islands, vanity counters, wall cladding, flooring, lift-lobby cladding, staircases and furniture counters. Slabs are available in polished as standard, with Distress, Leather, Honed and Nalico finishes on request, and any of the collection's 21 edge profiles.`,
  );

  return paragraphs.filter(Boolean);
}
