/**
 * Converts a folder of upscaled swatch PNGs (Higgsfield ByteDance output)
 * into site-ready WebP swatches:
 *
 *   node scripts/convert-swatch-set.mjs <src-dir-of-pngs> <out-dir> [width]
 *
 * e.g. node scripts/convert-swatch-set.mjs ~/Downloads/swatches-4k \
 *        public/kalingastone/quartz/swatches-v2
 *
 * Default width 2400px: covers the largest swatch render on the site
 * (quartz shade-compare at 60vw desktop, retina ~2300 device px). Never
 * upscales - a smaller source passes through at its own size.
 */
import { readdir, mkdir } from "node:fs/promises";
import { join, basename, resolve } from "node:path";

import sharp from "sharp";

const [, , srcDir, outDir, widthArg] = process.argv;
if (!srcDir || !outDir) {
  console.error(
    "usage: node scripts/convert-swatch-set.mjs <src-dir> <out-dir> [width]",
  );
  process.exit(1);
}
const WIDTH = Number(widthArg) || 2400;
const SRC = resolve(srcDir);
const OUT = resolve(outDir);

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => f.endsWith(".png")).sort();
let total = 0;
for (const file of files) {
  const slug = basename(file, ".png");
  const result = await sharp(join(SRC, file), { limitInputPixels: false })
    .resize({ width: WIDTH, withoutEnlargement: true, kernel: "lanczos3" })
    .withIccProfile("srgb")
    .webp({ quality: 85, effort: 6, smartSubsample: false })
    .toFile(join(OUT, `${slug}.webp`));
  total += result.size;
  console.log(
    `${slug}.webp  ${result.width}x${result.height}  ${(result.size / 1024).toFixed(0)} KB`,
  );
}
console.log(
  `\n${files.length} files, ${(total / 1024 / 1024).toFixed(1)} MB total -> ${OUT}`,
);
