/**
 * Brands a product photograph for the wheel and the catalogue:
 *   - centre-crops to 4:3
 *   - resizes to at most 2400px wide (never upscales)
 *   - stamps a small editorial caption in the corner — hairline bronze rule +
 *     two tracked-caps words in Manrope, as vector outlines (no system fonts)
 *   - writes a high-quality WebP with an SEO filename into public/products/
 *
 *   node scripts/brand-product-image.mjs <source> <seo-name> "<CAPTION>" [light|dark]
 *
 *   e.g. node scripts/brand-product-image.mjs ~/Downloads/img.png \
 *          naturally-engineered-marble-flooring-living-room-dubai \
 *          "ENGINEERED MARBLE" dark
 *
 * `light` captions in warm ivory (for dark photographs), `dark` in warm
 * charcoal (for bright ones). Default dark.
 */

import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import opentype from "opentype.js";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FONT = join(ROOT, "assets/fonts/Manrope-Medium.ttf");
const OUT_DIR = join(ROOT, "public/products");

const [, , source, seoName, caption = "GLOBAL CLASSIC", tone = "dark"] =
  process.argv;
if (!source || !seoName) {
  console.error(
    'usage: node scripts/brand-product-image.mjs <source> <seo-name> "<CAPTION>" [light|dark]',
  );
  process.exit(1);
}

// Finalized palette (2026-08-06): Porcelain on dark photos, Pine Teal on
// bright ones, Dusty Olive rule in both.
const INK = tone === "light" ? "#f7f8f5" : "#355e4d";
const RULE = "#6f8f78";

function outlineText(font, text, size, tracking) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(text);
  let width = 0;
  for (let i = 0; i < glyphs.length; i++) {
    width += glyphs[i].advanceWidth * scale;
    if (i < glyphs.length - 1) {
      width +=
        font.getKerningValue(glyphs[i], glyphs[i + 1]) * scale + tracking;
    }
  }
  return {
    width,
    toPath(x, baseline) {
      const path = new opentype.Path();
      let cx = x;
      for (let i = 0; i < glyphs.length; i++) {
        path.extend(glyphs[i].getPath(cx, baseline, size));
        cx += glyphs[i].advanceWidth * scale;
        if (i < glyphs.length - 1) {
          cx +=
            font.getKerningValue(glyphs[i], glyphs[i + 1]) * scale + tracking;
        }
      }
      return path;
    },
  };
}

const fontBuffer = await readFile(FONT);
const font = opentype.parse(
  fontBuffer.buffer.slice(
    fontBuffer.byteOffset,
    fontBuffer.byteOffset + fontBuffer.byteLength,
  ),
);

const image = sharp(source, { limitInputPixels: false });
const meta = await image.metadata();

// Centre-crop to 4:3.
let cropW = meta.width;
let cropH = Math.round((cropW * 3) / 4);
if (cropH > meta.height) {
  cropH = meta.height;
  cropW = Math.round((cropH * 4) / 3);
}
const left = Math.round((meta.width - cropW) / 2);
const top = Math.round((meta.height - cropH) / 2);

const outW = Math.min(cropW, 2400);
const outH = Math.round((outW * 3) / 4);

// Caption geometry, proportional to output width.
const capSize = Math.round(outW * 0.016);
const margin = Math.round(outW * 0.035);
const ruleW = Math.round(outW * 0.028);
const laid = outlineText(font, caption.toUpperCase(), capSize, capSize * 0.24);
const baseline = outH - margin;
const ruleY = baseline - capSize * 1.5;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${outW}" height="${outH}" viewBox="0 0 ${outW} ${outH}">
  <rect x="${margin}" y="${ruleY}" width="${ruleW}" height="${Math.max(2, Math.round(capSize * 0.08))}" fill="${RULE}"/>
  <g fill="${INK}" fill-opacity="0.92">${laid.toPath(margin, baseline).toSVG(2)}</g>
</svg>`;

const out = join(OUT_DIR, `${seoName}.webp`);
const result = await sharp(source, { limitInputPixels: false })
  .extract({ left, top, width: cropW, height: cropH })
  .resize(outW, outH, { kernel: "lanczos3", withoutEnlargement: false })
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .withIccProfile("srgb")
  .webp({ quality: 88, effort: 6, smartSubsample: false })
  .toFile(out);

console.log(
  `${seoName}.webp  ${result.width}x${result.height}  ${(result.size / 1024).toFixed(0)} KB  caption "${caption}"`,
);
