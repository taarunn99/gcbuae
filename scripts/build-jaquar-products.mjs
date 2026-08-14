#!/usr/bin/env node
/**
 * Builds src/config/jaquar-products.json from the catalogue image pack's
 * index.csv (assets/source/jaquar-catalogue/images/index.csv - gitignored;
 * the emitted JSON is committed). Run: node scripts/build-jaquar-products.mjs
 *
 * v2: every printed product name is parsed into a human-readable shape -
 * clean `title`, attribute chips (`attrs`), a `group` for browser
 * filtering - and every product is re-mapped into the site's SIX-category
 * taxonomy (owner ruling 2026-08-14): faucets, wash-basins, water-closets,
 * showers, wellness, water-heaters. Raw printed names are preserved in
 * `name` (verbatim law); image paths stay pack-relative
 * (public/jaquar/products/<pack category>/<pack collection>/<sku>.webp).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = join(root, "assets/source/jaquar-catalogue/images/index.csv");
const outPath = join(root, "src/config/jaquar-products.json");

/* Finish-card sentences that bled into the source tables as fake rows. */
const ARTIFACT_SKUS = new Set([
  "ARC-CHR-87011B",
  "KUP-CHR-35011BPM",
  "OPP-CHR-15011BPM",
  "FLV-CHR-1075NK",
]);

/** Minimal RFC 4180 parser - quoted fields may contain commas and newlines. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else field += ch;
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const clean = (s) =>
  s
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

/* ---------------- attribute extraction ---------------- */

function parseName(rawName, sku) {
  const attrs = [];
  // Cross-reference clauses stay in the verbatim name but not the title
  let rest = rawName.split(/\s+Also available/i)[0];
  // Embedded second-product descriptions ("JWA-WHT-XXX: Angular Panel...")
  rest = rest.split(/\s+[A-Z]{2,4}-[A-Z0-9-]{2,}:\s/)[0];

  const take = (regex, format) => {
    const m = rest.match(regex);
    if (m) {
      attrs.push(format ? format(m) : clean(m[1] ?? m[0]));
      rest = rest.replace(m[0], " ");
    }
  };

  // Flow rate ("*" = at 3 bar pressure, printed footnote)
  take(/Flow rate:?\s*([\d.]+\s*l\/(?:min|sec))\s*\*?/i, (m) => `${m[1]} at 3 bar`);
  // Sizes / dimensions
  take(/Size:?\s*(\d{2,4}\s*[xX]\s*\d{2,4}(?:\s*[xX]\s*\d{2,4})?\s*(?:mm)?)/, (m) => `${m[1].replace(/\s+/g, " ")}${/mm/.test(m[1]) ? "" : " mm"}`);
  take(/(\d{2,4}\s*[xX]\s*\d{2,4}(?:\s*[xX]\s*\d{2,4})?\s*mm)/, (m) => m[1]);
  take(/(\d{2,3}\s*mm dia\.?)/i, (m) => m[1]);
  take(/Size\s*(\d\d\s*mm)/i, (m) => `${m[1]} size`);
  // Hoses / rails / arms lengths
  take(/with\s+(\d{3,4}\s*mm)\s+Long Braided Hoses/i, (m) => `${m[1]} braided hoses`);
  take(/(\d{3,4}\s*mm)\s+Long\b/i, (m) => `${m[1]} long`);
  // Cartridges
  take(/(\d\d\s*mm)\s+Cartridge/i, (m) => `${m[1]} cartridge`);
  // Traps
  take(/\b([PS]-?\d{3})\b/, (m) => `${m[1]} trap`);
  take(/\b([PS])[- ]type\b/i, (m) => `${m[1].toUpperCase()}-type trap`);
  // Seat covers
  take(/with\s+(UF|PP)(?:\s+Soft Close)?(?:\s+Slim)?\s+Seat Cover/i, (m) => `${m[1]} soft close seat`);
  // Capacities / power
  take(/(\d+(?:\/\d+)+\s*[Ll]itres?)/, (m) => m[1]);
  take(/(\d+(?:\.\d+)?\s*[Ll]itres?)\b/, (m) => m[1]);
  take(/(\d+(?:\.\d+)?\s*kW)\b/i, (m) => m[1]);
  take(/(\d{3,4})\s*W\b/, (m) => `${m[1]} W`);
  // Common clauses
  take(/\bwithout Popup Waste\b/i, () => "without popup waste");
  take(/\bwith Popup Waste\b/i, () => "with popup waste");
  take(/\bwith click clack waste(?:\s*\(ALD-729\))?/i, () => "click clack waste");
  take(/\bRimless\b/i, () => "rimless");
  take(/\bBlind Installation\b/i, () => "blind installation");

  // Title = what remains, tidied
  let title = clean(
    rest
      .replace(/[,;]\s*(?=[,;]|$)/g, "")
      .replace(/\s*[,;]\s*$/, "")
      .replace(/\(\s*\)/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/\s+,/g, ","),
  )
    .replace(/^[-,;\s]+|[-,;\s]+$/g, "")
    .replace(/\s*,\s*,/g, ",");
  // Collapse dangling connectors left by extraction
  title = title.replace(/\b(?:with|and|in|of)\s*$/i, "").trim();
  title = title.replace(/\s*,\s*$/, "");
  if (!title || title === sku || /^[A-Z]{2,4}-/.test(title)) title = "";
  // Clamp very long titles at a word boundary - the verbatim name stays
  // available in full (card tooltip + printed table).
  if (title.length > 96) {
    const cut = title.slice(0, 96);
    title = `${cut.slice(0, cut.lastIndexOf(" "))}...`;
  }
  return { title, attrs };
}

/* ---------------- classification ---------------- */

const has = (name, re) => re.test(name);

/** Returns { group, category, collection } for a product. */
function classify(packCat, packColl, rawName, sku) {
  const n = rawName;

  /* ---- sanitary-ware: split basins vs WCs by type ---- */
  if (packCat === "sanitary-ware") {
    if (packColl === "urinals" || has(n, /\bUrinal/i))
      return { group: "urinals", category: "water-closets", collection: "urinals" };
    if (packColl === "disabled-friendly")
      return { group: "accessible", category: "water-closets", collection: "accessible" };
    if (packColl === "bidspa" || /^ITS-/.test(sku))
      return { group: "smart-wcs", category: "water-closets", collection: "smart-wcs" };
    if (has(n, /\bBidet/i))
      return { group: "bidets", category: "water-closets", collection: "bidets" };
    if (has(n, /Sensor|Tankless/i) && has(n, /WC|Flush/i))
      return { group: "smart-wcs", category: "water-closets", collection: "smart-wcs" };
    if (has(n, /Wall Hung WC/i))
      return { group: "wall-hung-wcs", category: "water-closets", collection: "wall-hung-wcs" };
    if (has(n, /Single Piece WC|Coupled|Bowl With Cistern|Back to Wall WC|WC|Commode/i))
      return { group: "floor-mounted-wcs", category: "water-closets", collection: "floor-mounted-wcs" };
    if (has(n, /Seat Cover|Cistern Fitting|Flush/i))
      return { group: "wc-parts", category: "water-closets", collection: "floor-mounted-wcs" };
    // Basins by type
    if (has(n, /Under Counter/i))
      return { group: "under-counter", category: "wash-basins", collection: "under-counter" };
    if (has(n, /Counter Top/i))
      return { group: "counter-top", category: "wash-basins", collection: "counter-top" };
    if (has(n, /Semi Recessed|Corner Basin|Wall Hung Corner/i))
      return { group: "semi-recessed-corner", category: "wash-basins", collection: "semi-recessed-corner" };
    if (has(n, /Table Top|Thin Rim|Vessel/i))
      return { group: "table-top", category: "wash-basins", collection: "table-top" };
    if (has(n, /Pedestal/i))
      return { group: "pedestals", category: "wash-basins", collection: "pedestals" };
    if (has(n, /Wall Hung Basin|Wash ?basin|Basin/i))
      return { group: "wall-hung-basins", category: "wash-basins", collection: "wall-hung-basins" };
    return { group: "table-top", category: "wash-basins", collection: "table-top" };
  }

  /* ---- flushing systems -> water-closets ---- */
  if (packCat === "flushing-systems")
    return { group: packColl, category: "water-closets", collection: packColl };

  /* ---- washroom equipment -> wash-basins ---- */
  if (packCat === "washroom-accessories")
    return {
      group: "washroom-equipment",
      category: "wash-basins",
      collection: "washroom-equipment",
    };

  /* ---- bathroom accessory families -> faucets (design-matched) ---- */
  if (packCat === "accessories") {
    const collection =
      packColl === "rendezvous-crystal" || packColl === "combo-pack"
        ? packColl
        : `${packColl}-accessories`;
    return { group: "accessories", category: "faucets", collection };
  }

  /* ---- showers (heads, panels, rails) ---- */
  if (packCat === "showers") {
    const groups = {
      "overhead-showers": "overhead-showers",
      "hand-showers": "hand-showers",
      "body-showers": "body-showers",
      "cloud-shower": "overhead-showers",
      "shower-panels": "shower-panels",
      "shower-accessories": "shower-fittings",
    };
    return {
      group: groups[packColl] ?? "shower-fittings",
      category: "showers",
      collection: packColl,
    };
  }

  /* ---- wellness merges ---- */
  if (packCat === "whirlpools")
    return { group: "whirlpools", category: "wellness", collection: packColl };
  if (packCat === "bathtubs") {
    const map = {
      freestanding: "freestanding-bathtubs",
      "built-in": "built-in-bathtubs",
      accessories: "bathtub-accessories",
    };
    return {
      group: map[packColl] ?? "bathtubs",
      category: "wellness",
      collection: map[packColl] ?? packColl,
    };
  }
  if (packCat === "wellness")
    return { group: packColl, category: "wellness", collection: packColl };

  /* ---- water heaters ---- */
  if (packCat === "water-heaters")
    return {
      group: "water-heaters",
      category: "water-heaters",
      collection: "water-heaters",
    };

  /* ---- faucets: keep collections, classify groups ---- */
  if (packCat === "faucets") {
    let group = "mixers";
    if (has(n, /Sensor/i)) group = "sensor";
    else if (has(n, /Thermostatic|Aquamax|Showertronic/i)) group = "thermostatic";
    else if (has(n, /Non-?concussive|Pressmatic|Foot Operated/i)) group = "pressmatic";
    else if (has(n, /Spout Operated/i)) group = "taps";
    else if (has(n, /Pillar Tap|Pillar Cock|Basin Tap|Bib Tap|Sink Tap|Angle Valve|Bib Cock|Sink Cock|Angle Cock/i))
      group = "taps";
    else if (has(n, /Bath ?Tub Filler|Bath Filler/i)) group = "bath-fillers";
    else if (has(n, /Spout/i)) group = "spouts";
    else if (has(n, /In-?wall Body|Exposed Part|Basic Set|Concealed/i)) group = "in-wall-parts";
    else if (has(n, /Waste|Bottle Trap|Health Faucet|Spreader|Extension|Flange|Hose/i))
      group = "parts";
    return { group, category: "faucets", collection: packColl };
  }

  return { group: "other", category: packCat, collection: packColl };
}

/* ---------------- build ---------------- */

const rows = parseCsv(readFileSync(csvPath, "utf8"));
const header = rows.shift();
const col = Object.fromEntries(header.map((h, i) => [h.trim(), i]));

const data = {};
let kept = 0;
let skipped = 0;
const groupCounts = {};

for (const r of rows) {
  const packCat = clean(r[col.category] ?? "");
  const packColl = clean(r[col.collection] ?? "");
  const sku = clean(r[col.sku] ?? "");
  if (!packCat || !packColl) {
    skipped++;
    continue;
  }
  if (ARTIFACT_SKUS.has(sku)) {
    skipped++;
    continue;
  }
  const rawName = clean(r[col.name] ?? "");
  // Lifestyle/banner reference rows that carry a category but no product
  if (!sku && /(?:lifestyle|banners?) image$/i.test(rawName)) {
    skipped++;
    continue;
  }
  const imageFile = clean(r[col.image_file] ?? "");
  const { title, attrs } = parseName(rawName, sku);
  const { group, category, collection } = classify(
    packCat,
    packColl,
    rawName,
    sku,
  );
  const entry = {
    name: rawName,
    title,
    attrs,
    sku,
    finish: clean(r[col.finish] ?? ""),
    group,
    image: imageFile ? imageFile.replace(/\.(png|jpg|jpeg)$/i, "") : "",
    page: Number(clean(r[col.page] ?? "")) || 0,
  };
  ((data[category] ??= {})[collection] ??= []).push(entry);
  groupCounts[`${category}/${collection}`] =
    (groupCounts[`${category}/${collection}`] ?? 0) + 1;
  kept++;
}

writeFileSync(outPath, JSON.stringify(data, null, 1) + "\n");
console.log(`kept ${kept}, skipped ${skipped}`);
for (const [key, count] of Object.entries(groupCounts).sort())
  console.log(`  ${key}: ${count}`);
