#!/usr/bin/env node
/**
 * Splits the Jaquar Global Bath Catalogue 2025-2026 (364 pp master in
 * assets/source/jaquar-catalogue/catalogue-master.pdf, gitignored) into
 * per-section PDFs served as downloads from public/jaquar/catalogue/.
 * Printed page numbers map 1:1 to PDF pages. Section ranges follow the
 * catalogue's own TOC (see docs/jaquar-catalogue.md).
 * Run: node scripts/split-jaquar-catalogue.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PDFDocument } from "pdf-lib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const masterPath = join(
  root,
  "assets/source/jaquar-catalogue/catalogue-master.pdf",
);
const outDir = join(root, "public/jaquar/catalogue");

const SECTIONS = [
  { file: "jaquar-brand-and-world", label: "The World of Jaquar", from: 1, to: 35 },
  { file: "jaquar-faucets-sanitaryware", label: "Faucets & Sanitaryware", from: 36, to: 216 },
  { file: "jaquar-flushing-systems", label: "i-Flush & Flushing Systems", from: 217, to: 228 },
  { file: "jaquar-accessories", label: "Accessories", from: 229, to: 243 },
  { file: "jaquar-showers", label: "Showers", from: 244, to: 281 },
  { file: "jaquar-wellness", label: "Wellness - Whirlpools, Bathtubs, Spas, Saunas, Steam", from: 282, to: 342 },
  { file: "jaquar-water-heaters", label: "Water Heaters", from: 343, to: 351 },
  { file: "jaquar-washroom-warranty-care", label: "Washroom Accessories, Warranty & Care", from: 352, to: 364 },
];

const master = await PDFDocument.load(await readFile(masterPath), {
  ignoreEncryption: true,
});
await mkdir(outDir, { recursive: true });

for (const section of SECTIONS) {
  const doc = await PDFDocument.create();
  const indices = [];
  for (let p = section.from; p <= section.to; p++) indices.push(p - 1);
  const pages = await doc.copyPages(master, indices);
  for (const page of pages) doc.addPage(page);
  doc.setTitle(`Jaquar Global Bath Catalogue 2025-2026 - ${section.label}`);
  const bytes = await doc.save();
  const outFile = join(outDir, `${section.file}.pdf`);
  await writeFile(outFile, bytes);
  console.log(
    `ok ${section.file}.pdf pp${section.from}-${section.to} ${(bytes.length / 1024 / 1024).toFixed(1)}MB`,
  );
}
