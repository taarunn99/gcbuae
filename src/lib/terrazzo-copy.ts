import {
  flutingSamples,
  terrazzoCollectionBySeries,
  type TerrazzoShade,
} from "@/config/kalingastone-terrazzo";

/**
 * Deterministic editorial copy for the 24 terrazzo shade pages, composed
 * strictly from catalogue facts. Bound by the source's own limits: pair-
 * level collection attribution, one slab size, NO published thickness,
 * NO Microban mechanism claims (the catalogue contradicts itself on
 * treated-vs-integrated — we claim protection and performance only).
 */

const FAMILY_CHARACTER: Record<TerrazzoShade["family"], string> = {
  mono: "a monochrome design in the Roma register — black-and-white chips composing the classic terrazzo statement",
  white:
    "a light-ground design — pale terrazzo in the register UAE lobbies, bathrooms and retail floors are most often specified around",
  grey: "a grey design — the working palette of contemporary architecture, holding its own against concrete, steel and pale timber",
  beige:
    "a warm neutral design — the sand and cream register Gulf interiors are built on, with the chips supplying the movement",
  brown:
    "an earth-toned design — deep, warm and grounded, with the mosaic chips carrying the drama",
  accent:
    "one of the collection's colour statements — terrazzo used as the room's centrepiece rather than its background",
};

export function terrazzoIntro(shade: TerrazzoShade): string {
  const collection = terrazzoCollectionBySeries.get(shade.series)!;
  return `${shade.name} is ${FAMILY_CHARACTER[shade.family]}. It is a KalingaStone Terrazzo design from the ${collection.label} collections (Series ${shade.series}), produced as a 304 × 125 cm slab and supplied in the UAE by Global Classic Building Material LLC from stock in Sharjah — as tiles, full slabs or cut-to-size.`;
}

export function terrazzoBody(shade: TerrazzoShade): string[] {
  const collection = terrazzoCollectionBySeries.get(shade.series)!;
  const paragraphs: string[] = [];

  paragraphs.push(
    `${collection.label} is the Series ${shade.series} tier of the terrazzo range. ${collection.languages
      .map((l) => `${l.name}: ${l.body}`)
      .join(" ")}`,
  );

  paragraphs.push(
    `KalingaStone Terrazzo is made in block form, which keeps water absorption below 0.2% and suits it to bathrooms, counters and vanity tops; its structured finish is stated by the manufacturer as ideal for exterior cladding and outdoors. It carries an A1 fire classification (EN 13501-1) for wall cladding and flooring — the top non-combustible class, and a genuine specification advantage for UAE lift lobbies and commercial fit-out.`,
  );

  if (shade.microban) {
    paragraphs.push(
      `${shade.name} is one of only four terrazzo shades carrying Microban® antibacterial protection, reducing up to 99.99% of bacterial growth on the surface, active around the clock. (Microban is not available for products sold in the USA.)`,
    );
  }

  if (flutingSamples.some((f) => f.baseSlug === shade.slug)) {
    paragraphs.push(
      `${shade.name} is also shown in the catalogue's fluted programme — shallow machined grooves that run the surface and play with light. See the fluting page for the sample gallery.`,
    );
  }

  paragraphs.push(
    `Typical applications: flooring, wall cladding, bathroom floors and walls, lift-lobby cladding, and wardrobe partitions and shelves. Finishes on request: Distress, Honed, River Wash, Urban and Leather.`,
  );

  return paragraphs;
}
