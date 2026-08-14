#!/usr/bin/env node
/**
 * Prepares catalogue product cutouts for the Higgsfield upscale pass.
 * Usage: node scripts/jaquar-upscale-prep.mjs <count> <category:collection> [...]
 *
 * For each collection, takes the first <count> products that have an image,
 * composites the alpha-PNG cutout onto a Marble White (#F7F8F5) canvas with
 * a 10% margin (the ByteDance upscaler flattens transparency, so we choose
 * the brand background BEFORE upscaling), and writes it plus a work manifest
 * to assets/source/jaquar-catalogue/upscale-prep/.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const packDir = join(root, "assets/source/jaquar-catalogue/images");
const prepDir = join(root, "assets/source/jaquar-catalogue/upscale-prep");

const [countArg, ...pairs] = process.argv.slice(2);
const count = Number(countArg);
if (!count || pairs.length === 0) {
  console.error(
    "usage: node scripts/jaquar-upscale-prep.mjs <count> <category:collection> [...]",
  );
  process.exit(1);
}

const catalogue = JSON.parse(
  await readFile(join(root, "src/config/jaquar-products.json"), "utf8"),
);

await mkdir(prepDir, { recursive: true });
const manifest = [];

for (const pair of pairs) {
  const [category, collection] = pair.split(":");
  const products = (catalogue[category]?.[collection] ?? []).filter(
    (p) => p.image,
  );
  for (const product of products.slice(0, count)) {
    const src = join(packDir, `${product.image}.png`);
    const img = sharp(src);
    const meta = await img.metadata();
    const margin = Math.round(Math.max(meta.width, meta.height) * 0.1);
    const canvasW = meta.width + margin * 2;
    const canvasH = meta.height + margin * 2;
    const outName = product.image.replaceAll("/", "__") + ".png";
    const outFile = join(prepDir, outName);
    await sharp({
      create: {
        width: canvasW,
        height: canvasH,
        channels: 3,
        background: { r: 247, g: 248, b: 245 },
      },
    })
      .composite([{ input: src, left: margin, top: margin }])
      .png()
      .toFile(outFile);
    manifest.push({
      file: outFile,
      filename: outName,
      width: canvasW,
      height: canvasH,
      out: `products/${product.image}`,
      sku: product.sku,
    });
  }
}

const manifestFile = join(
  prepDir,
  `manifest-${pairs[0].replace(":", "_")}-${manifest.length}.json`,
);
await writeFile(manifestFile, JSON.stringify(manifest, null, 1));
console.log(manifestFile);
console.log(`${manifest.length} images prepared`);
