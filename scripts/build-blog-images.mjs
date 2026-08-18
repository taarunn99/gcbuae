/**
 * Builds The Journal's hero derivatives.
 *
 *   node scripts/build-blog-images.mjs      (or: npm run assets:blog)
 *
 * Reads the Higgsfield 2K masters from assets/source/blog/{slug}.png
 * and writes public/blog-images/{slug}.webp at 1600x1200 (4:3, 2x the
 * ~800px card/hero slot). Single encode from master. The BLOG-PACKAGE
 * perf gate says <=120KB per image; the GOVERNANCE hard cap is 300KB.
 * Prints sizes, warns over 120KB, fails over 300KB.
 */

import { mkdir, readdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = join(ROOT, "assets", "source", "blog");
const OUT_DIR = join(ROOT, "public", "blog-images");

await mkdir(OUT_DIR, { recursive: true });
const sources = (await readdir(SOURCE_DIR)).filter((f) => f.endsWith(".png"));

let failed = false;
let total = 0;
for (const file of sources.sort()) {
  const slug = file.replace(/\.png$/, "");
  const out = join(OUT_DIR, `${slug}.webp`);
  try {
    await sharp(join(SOURCE_DIR, file), { limitInputPixels: false })
      .resize(1600, 1200, { fit: "cover" })
      .webp({ quality: 80, effort: 6, smartSubsample: true })
      .toFile(out);
  } catch (error) {
    console.error(`FAILED ${slug}: ${error.message}`);
    failed = true;
    continue;
  }
  const kb = Math.round((await stat(out)).size / 1024);
  total += kb;
  const flag = kb > 300 ? "  <-- OVER 300KB HARD CAP" : kb > 120 ? "  (over 120KB target)" : "";
  console.log(`${slug}.webp  ${kb}KB${flag}`);
  if (kb > 300) failed = true;
}
console.log(`\n${sources.length} images, ${Math.round(total / 1024)}MB total`);
if (sources.length !== 39) {
  console.error(`EXPECTED 39 masters, found ${sources.length}`);
  failed = true;
}
if (failed) process.exit(1);
