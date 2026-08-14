#!/usr/bin/env node
/**
 * Ingests completed Higgsfield generations for the Jaquar hub.
 * Usage: node scripts/ingest-jaquar-generated.mjs <manifest.json>
 * Manifest: [{ "url": "https://...", "out": "heroes/faucets/solo", "width": 1280 }]
 *
 * Saves the raw master to assets/source/jaquar/generated/<out>.png
 * (gitignored, provenance layer) and ships a WebP derivative to
 * public/jaquar/<out>.webp - house convention: single compression,
 * q88/effort 6, lanczos3, no upscaling past the master.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error("usage: node scripts/ingest-jaquar-generated.mjs <manifest.json>");
  process.exit(1);
}

const items = JSON.parse(await readFile(manifestPath, "utf8"));
let ok = 0;
let failed = 0;

for (const item of items) {
  try {
    const res = await fetch(item.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());

    const masterPath = join(
      root,
      "assets/source/jaquar/generated",
      `${item.out}.png`,
    );
    await mkdir(dirname(masterPath), { recursive: true });
    await writeFile(masterPath, buf);

    const outPath = join(root, "public/jaquar", `${item.out}.webp`);
    await mkdir(dirname(outPath), { recursive: true });
    const webp = await sharp(buf)
      .resize(item.width ?? 1280, null, {
        withoutEnlargement: true,
        kernel: "lanczos3",
      })
      .webp({ quality: 88, effort: 6 })
      .toBuffer();
    await writeFile(outPath, webp);
    console.log(`ok ${item.out} ${(webp.length / 1024).toFixed(0)}KB`);
    ok++;
  } catch (err) {
    console.error(`FAIL ${item.out}: ${err.message}`);
    failed++;
  }
}
console.log(`done: ${ok} ingested, ${failed} failed`);
