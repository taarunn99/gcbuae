import {
  marbleFamilyById,
  type MarbleShade,
} from "@/config/kalingastone-marble";

/**
 * Deterministic editorial copy for the 35 marble shade pages, composed
 * strictly from catalogue facts. Bound by the source's limits: this is
 * the ENGINEERED marble line (never conflated with CMC's natural
 * marble), one slab size, NO published thickness, Microban as an OPTION
 * only, NO food-safe/NSF claims, and honesty about where marble sits —
 * the most refined surface of the three ranges, not the toughest.
 */

const FAMILY_CHARACTER: Record<MarbleShade["family"], string> = {
  white:
    "a white design — the register the marble range concentrates its finest work in, and the light UAE lobbies and vanities are specified around",
  cream:
    "a cream-and-pearl design in the warm register Gulf interiors are built on, held perfectly consistent slab after slab by engineered manufacture",
  grey: "a grey design — contemporary stone-and-concrete tones that hold their own against steel, glass and pale timber",
  warm: "one of the range's deep warm designs — the classic gold and Emperador marble language in an engineered slab",
};

const SERIES_POSITION: Record<MarbleShade["series"], string> = {
  "1": "Series-1 is the range's single-entry opening tier — Candy White stands alone in it.",
  "2": "Series-2 is the core tier of the collection, carrying eleven of its whites, creams and pearls.",
  "3": "Series-3 is the largest tier in the collection — twelve designs, and the range most projects specify from.",
  "4": "Series-4 carries the collection's deeper tones — the concretes, greys and both Emperador designs.",
  "5A": "Series-5A is a tier of one: Amelia, at the top of the range beside Bianco Thassos.",
  "5B": "Series-5B is the pinnacle of the collection — Bianco Thassos, the brilliant white the range builds toward.",
};

export function marbleIntro(shade: MarbleShade): string {
  const family = marbleFamilyById.get(shade.family)!;
  return `${shade.name} is ${FAMILY_CHARACTER[shade.family]}. It is a KalingaStone engineered marble design in Series-${shade.series}, from the ${family.label.toLowerCase()} range, produced as a 304 × 125 cm slab and supplied in the UAE by Global Classic Building Material LLC from stock in Sharjah.`;
}

export function marbleBody(shade: MarbleShade): string[] {
  const paragraphs: string[] = [];

  paragraphs.push(SERIES_POSITION[shade.series]);

  paragraphs.push(
    `KalingaStone Marble is the engineered marble line from Classic Marble Company's Silvassa plant — SIMEC (Italy) polishing with 36 heads, distinct from the natural marble CMC also produces. The surface is non-porous with water absorption under 0.1%, polishes past 85% gloss — the highest of KalingaStone's three ranges — and is repolishable: high-traffic floors are restored in situ rather than replaced.`,
  );

  if (shade.microbanOption) {
    paragraphs.push(
      `${shade.name} is one of eight marble shades offered with the option of Microban® antibacterial protection — reducing up to 99.99% of bacterial growth, active around the clock. The same shade is also available without Microban. (Microban is not available for products sold in the USA.)`,
    );
  }

  paragraphs.push(
    `Typical applications: flooring, wall cladding, vanity counters, bathroom floors and walls, window sills, lift-lobby cladding, furniture counters, wardrobe partitions and shelves, door jambs and staircases. Finishes on request: Honed, Graffiato, Leather, Distress and Silken.`,
  );

  return paragraphs;
}
