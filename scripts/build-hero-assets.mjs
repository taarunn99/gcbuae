/**
 * Builds the hero derivatives from the master photograph.
 *
 *   node scripts/build-hero-assets.mjs      (or: npm run assets:hero)
 *
 * Produces:
 *   src/assets/hero.webp          full-bleed hero, static-imported by next/image
 *   src/app/opengraph-image.jpg   1200x630 social card with the quote baked in
 *   src/app/opengraph-image.alt.txt
 *
 * The quote is baked as vector outlines rather than SVG <text>, because the
 * SVG renderer inside sharp has no reliable @font-face support and the brand
 * fonts are not installed system-wide. Outlines render identically everywhere.
 *
 * Re-run this whenever src/config/hero-copy.json changes.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import opentype from "opentype.js";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SOURCE = join(ROOT, "assets/source/hero-original.png");
const DISPLAY_FONT = join(ROOT, "assets/fonts/CormorantGaramond-Light.ttf");
const COPY = join(ROOT, "src/config/hero-copy.json");

const HERO_OUT = join(ROOT, "src/assets/hero.webp");
const OG_OUT = join(ROOT, "src/app/opengraph-image.jpg");
const OG_ALT_OUT = join(ROOT, "src/app/opengraph-image.alt.txt");

/**
 * Measured from the master: the fluted wall is the only region flat enough and
 * dark enough to carry type. Fractions of the full source image.
 */
const SAFE_ZONE = { x0: 0.25, x1: 0.62, y0: 0.11, y1: 0.67 };

// Matches the hero's anchor: right of the wall's true centre (43.5%) so the
// block reads as balanced inside the frame, but short of dead centre, which
// would push the longest line into the shower's glass frame at x 65%.
const TEXT_CENTER = { x: 0.465, y: 0.42 };

// How much of the safe zone the longest line fills. Trimmed from 0.98 when the
// anchor moved right, to keep clearance before the glass frame.
const TEXT_FILL = 0.92;

const HERO_WIDTH = 2560;
const OG = { width: 1200, height: 630 };

const INK = "#f7f0e6"; // warm off-white; pure white reads cold on this photo
const SCRIM = "#120e0a";

/** Lay out one line as vector outlines, with kerning and optical tracking. */
function layoutLine(font, text, size, tracking) {
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
    toPath(originX, baseline) {
      const path = new opentype.Path();
      let x = originX;
      for (let i = 0; i < glyphs.length; i++) {
        path.extend(glyphs[i].getPath(x, baseline, size));
        x += glyphs[i].advanceWidth * scale;
        if (i < glyphs.length - 1) {
          x +=
            font.getKerningValue(glyphs[i], glyphs[i + 1]) * scale + tracking;
        }
      }
      return path;
    },
  };
}

/**
 * Fits the quote inside the safe zone and returns an SVG overlay containing a
 * radial scrim plus the outlined text. The scrim lifts the type off the wall's
 * specular highlights, which are locally far brighter than the wall average.
 */
function buildOverlay(font, lines, { width, height }) {
  const safeWidth = (SAFE_ZONE.x1 - SAFE_ZONE.x0) * width;
  const centerX = TEXT_CENTER.x * width;
  const centerY = TEXT_CENTER.y * height;

  // Grow the type until the longest line fills the safe zone.
  const tracking = width * 0.0006;
  let size = height * 0.12;
  const longest = Math.max(
    ...lines.map((line) => layoutLine(font, line, size, tracking).width),
  );
  size *= (safeWidth * TEXT_FILL) / longest;

  const lineHeight = size * 1.16;
  const capHeight = size * 0.7;
  const blockHeight = (lines.length - 1) * lineHeight + capHeight;
  const firstBaseline = centerY - blockHeight / 2 + capHeight;

  const paths = lines.map((line, index) => {
    const laid = layoutLine(font, line, size, tracking);
    return laid
      .toPath(centerX - laid.width / 2, firstBaseline + index * lineHeight)
      .toSVG(2);
  });

  return {
    size,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="scrim" cx="${TEXT_CENTER.x * 100}%" cy="${TEXT_CENTER.y * 100}%" r="66%">
      <stop offset="0%" stop-color="${SCRIM}" stop-opacity="0.56"/>
      <stop offset="55%" stop-color="${SCRIM}" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="${SCRIM}" stop-opacity="0.06"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#scrim)"/>
  <g fill="${INK}">${paths.join("")}</g>
</svg>`,
  };
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function main() {
  const copy = JSON.parse(await readFile(COPY, "utf8"));
  const fontBuffer = await readFile(DISPLAY_FONT);
  const font = opentype.parse(
    fontBuffer.buffer.slice(
      fontBuffer.byteOffset,
      fontBuffer.byteOffset + fontBuffer.byteLength,
    ),
  );

  const meta = await sharp(SOURCE).metadata();
  console.log(`source  ${meta.width}x${meta.height} ${meta.format}`);

  await mkdir(dirname(HERO_OUT), { recursive: true });

  // --- Hero -------------------------------------------------------------
  // No text baked in: the page overlays live HTML so it stays selectable,
  // translatable and responsive.
  const hero = await sharp(SOURCE)
    .resize({ width: HERO_WIDTH, kernel: "lanczos3" })
    .withIccProfile("srgb")
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toBuffer({ resolveWithObject: true });

  await writeFile(HERO_OUT, hero.data);
  console.log(
    `hero    ${hero.info.width}x${hero.info.height} webp  ${kb(hero.info.size)}  -> src/assets/hero.webp`,
  );

  // --- Open Graph -------------------------------------------------------
  // Cropped to 1200x630 from the centre band. Verified to retain 100% of the
  // text-safe zone. WebP is not an option here: Next's opengraph-image
  // convention only accepts jpg/jpeg/png/gif.
  const cropHeight = Math.round(meta.width / (OG.width / OG.height));
  const cropTop = Math.round((meta.height - cropHeight) / 2);

  const overlay = buildOverlay(font, copy.quote, OG);

  const og = await sharp(SOURCE)
    .extract({
      left: 0,
      top: cropTop,
      width: meta.width,
      height: cropHeight,
    })
    .resize(OG.width, OG.height, { kernel: "lanczos3" })
    .composite([{ input: Buffer.from(overlay.svg), top: 0, left: 0 }])
    .withIccProfile("srgb")
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer({ resolveWithObject: true });

  await writeFile(OG_OUT, og.data);
  await writeFile(OG_ALT_OUT, `${copy.ogAlt}\n`);

  console.log(
    `og      ${og.info.width}x${og.info.height} jpeg  ${kb(og.info.size)}  -> src/app/opengraph-image.jpg`,
  );
  console.log(
    `        crop [0, ${cropTop}, ${meta.width}x${cropHeight}], quote set at ${overlay.size.toFixed(1)}px`,
  );

  if (og.info.size > 8 * 1024 * 1024) {
    throw new Error(
      "opengraph-image exceeds the 8MB limit; the build would fail",
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
