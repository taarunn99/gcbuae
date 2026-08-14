#!/usr/bin/env node
/**
 * Builds src/config/jaquar-products.json from the catalogue image pack's
 * index.csv (assets/source/jaquar-catalogue/images/index.csv - gitignored;
 * the emitted JSON is committed). Run: node scripts/build-jaquar-products.mjs
 *
 * The csv is the single source of truth for the product tables (name, SKU,
 * finish, catalogue page, image). Rows are verbatim from the Jaquar Global
 * Bath Catalogue 2025-2026 - names are never edited here beyond whitespace
 * normalization and the owner's long-dash ban.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = join(
  root,
  "assets/source/jaquar-catalogue/images/index.csv",
);
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
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const clean = (s) =>
  s
    .replace(/[–—]/g, "-") // owner law: no long dashes anywhere
    .replace(/\s+/g, " ")
    .trim();

const rows = parseCsv(readFileSync(csvPath, "utf8"));
const header = rows.shift();
const col = Object.fromEntries(header.map((h, i) => [h.trim(), i]));

const data = {};
let kept = 0;
let skipped = 0;
for (const r of rows) {
  const category = clean(r[col.category] ?? "");
  const collection = clean(r[col.collection] ?? "");
  const sku = clean(r[col.sku] ?? "");
  if (!category || !collection) {
    skipped++; // lifestyle/banner reference rows
    continue;
  }
  if (ARTIFACT_SKUS.has(sku)) {
    skipped++;
    continue;
  }
  const imageFile = clean(r[col.image_file] ?? "");
  const entry = {
    name: clean(r[col.name] ?? ""),
    sku,
    finish: clean(r[col.finish] ?? ""),
    image: imageFile ? imageFile.replace(/\.(png|jpg|jpeg)$/i, "") : "",
    page: Number(clean(r[col.page] ?? "")) || 0,
  };
  ((data[category] ??= {})[collection] ??= []).push(entry);
  kept++;
}

writeFileSync(outPath, JSON.stringify(data, null, 1) + "\n");

const catSummary = Object.entries(data)
  .map(
    ([c, colls]) =>
      `${c}: ${Object.keys(colls).length} collections, ${Object.values(colls).reduce((n, a) => n + a.length, 0)} products`,
  )
  .join("\n");
console.log(`kept ${kept}, skipped ${skipped}`);
console.log(catSummary);
