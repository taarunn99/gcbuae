#!/usr/bin/env node
/**
 * Ships EVERY catalogue product cutout as a small WebP so the product
 * browser can show what each SKU actually is (owner ruling 2026-08-14).
 * Local sharp only - no Higgsfield, no credits: composites each alpha
 * PNG onto Marble White (#F7F8F5) with a 10% margin at NATIVE resolution
 * (median 237 px long edge - correct for the ~140 px display slots).
 * Files already present in public/jaquar/products/ (the 4K salvaged
 * upscales) are kept - they are better. JPEG scans (wellness/spa
 * installed shots) are resized to 800 px covers instead.
 * Run: node scripts/build-jaquar-thumbs.mjs
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const packDir = join(root, "assets/source/jaquar-catalogue/images");
const outRoot = join(root, "public/jaquar/products");

const catalogue = JSON.parse(
  await readFile(join(root, "src/config/jaquar-products.json"), "utf8"),
);

let made = 0;
let kept = 0;
let missing = 0;

for (const collections of Object.values(catalogue)) {
  for (const products of Object.values(collections)) {
    for (const product of products) {
      if (!product.image) continue;
      const outFile = join(outRoot, `${product.image}.webp`);
      if (existsSync(outFile)) {
        kept++;
        continue;
      }
      // Pack files are .png cutouts or .jpg scans
      const pngSrc = join(packDir, `${product.image}.png`);
      const jpgSrc = join(packDir, `${product.image}.jpg`);
      const src = existsSync(pngSrc) ? pngSrc : existsSync(jpgSrc) ? jpgSrc : null;
      if (!src) {
        missing++;
        continue;
      }
      await mkdir(dirname(outFile), { recursive: true });
      const meta = await sharp(src).metadata();
      if (src.endsWith(".png")) {
        const margin = Math.round(Math.max(meta.width, meta.height) * 0.1);
        const webp = await sharp({
          create: {
            width: meta.width + margin * 2,
            height: meta.height + margin * 2,
            channels: 3,
            background: { r: 247, g: 248, b: 245 },
          },
        })
          .composite([{ input: src, left: margin, top: margin }])
          .webp({ quality: 88, effort: 6 })
          .toBuffer();
        await writeFile(outFile, webp);
      } else {
        const webp = await sharp(src)
          .resize(800, null, { withoutEnlargement: true, kernel: "lanczos3" })
          .webp({ quality: 85, effort: 6 })
          .toBuffer();
        await writeFile(outFile, webp);
      }
      made++;
    }
  }
}
console.log(`made ${made}, kept ${kept} (upscaled), missing sources ${missing}`);
