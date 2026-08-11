import { marbleFamilies, marbleShades } from "@/config/kalingastone-marble";
import { quartzFamilies, quartzShades } from "@/config/kalingastone-quartz";
import {
  terrazzoCollections,
  terrazzoShades,
} from "@/config/kalingastone-terrazzo";

/**
 * The site search index - generated from the same data files that build
 * the pages, so a catalogue update can never leave search stale. Small
 * enough (~150 entries) to filter client-side on every keystroke.
 */

export type SearchEntry = {
  label: string;
  sub: string;
  href: string;
  group: "Pages" | "Quartz" | "Marble" | "Terrazzo";
  /** Lower-cased haystack, prebuilt once. */
  keywords: string;
};

const entry = (
  label: string,
  sub: string,
  href: string,
  group: SearchEntry["group"],
  extra = "",
): SearchEntry => ({
  label,
  sub,
  href,
  group,
  keywords: `${label} ${sub} ${extra}`.toLowerCase(),
});

const pages: SearchEntry[] = [
  entry(
    "Products",
    "All eight lines - The Materials Issue",
    "/products",
    "Pages",
    "catalogue lines slabs",
  ),
  entry(
    "KalingaStone Quartz",
    "69 shades · the worktop material",
    "/kalingastone/quartz",
    "Pages",
    "engineered quartz slabs hub nsf microban",
  ),
  entry(
    "KalingaStone Marble",
    "35 shades · repolishable, > 85% gloss",
    "/kalingastone/marble",
    "Pages",
    "engineered marble slabs hub",
  ),
  entry(
    "KalingaStone Terrazzo",
    "24 shades · Class A1 fire, exterior-ready",
    "/kalingastone/terrazzo",
    "Pages",
    "terrazzo slabs hub",
  ),
  entry(
    "Fluting",
    "Fluted terrazzo panels - the signature",
    "/kalingastone/terrazzo/fluting",
    "Pages",
    "fluted grooves texture wall",
  ),
  entry(
    "About",
    "Global Classic Building Materials",
    "/about",
    "Pages",
    "company sharjah lapiz",
  ),
  entry(
    "Contact",
    "Availability, samples and volume pricing",
    "/contact",
    "Pages",
    "enquiry quote whatsapp email phone",
  ),
  ...quartzFamilies.map((f) =>
    entry(
      f.label,
      `Quartz colour range - ${f.query}`,
      `/kalingastone/quartz/colours/${f.slug}`,
      "Pages",
      "colour family",
    ),
  ),
  ...marbleFamilies.map((f) =>
    entry(
      f.label,
      `Marble colour range - ${f.query}`,
      `/kalingastone/marble/colours/${f.slug}`,
      "Pages",
      "colour family",
    ),
  ),
  ...terrazzoCollections.map((c) =>
    entry(
      `${c.label} (Terrazzo)`,
      `Series ${c.series} collection - ${c.query}`,
      `/kalingastone/terrazzo/collections/${c.slug}`,
      "Pages",
      "collection",
    ),
  ),
];

const shades: SearchEntry[] = [
  ...quartzShades.map((s) =>
    entry(
      s.name,
      `Quartz · Series ${s.series} · ${s.size} mm`,
      `/kalingastone/quartz/${s.slug}`,
      "Quartz",
      `${s.family} shade slab${s.microban ? " microban" : ""}`,
    ),
  ),
  ...marbleShades.map((s) =>
    entry(
      s.name,
      `Marble · Series-${s.series} · 304 × 125 cm`,
      `/kalingastone/marble/${s.slug}`,
      "Marble",
      `${s.family} shade slab${s.microbanOption ? " microban" : ""}`,
    ),
  ),
  ...terrazzoShades.map((s) =>
    entry(
      s.name,
      `Terrazzo · Series ${s.series} · 304 × 125 cm`,
      `/kalingastone/terrazzo/${s.slug}`,
      "Terrazzo",
      `${s.family} shade slab${s.microban ? " microban" : ""}`,
    ),
  ),
];

export const searchIndex: SearchEntry[] = [...pages, ...shades];

/** Rank: prefix label match > label match > keyword match. */
export function searchSite(query: string, limit = 9): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const starts: SearchEntry[] = [];
  const labels: SearchEntry[] = [];
  const rest: SearchEntry[] = [];
  for (const item of searchIndex) {
    const label = item.label.toLowerCase();
    if (label.startsWith(q)) starts.push(item);
    else if (label.includes(q)) labels.push(item);
    else if (item.keywords.includes(q)) rest.push(item);
  }
  return [...starts, ...labels, ...rest].slice(0, limit);
}
