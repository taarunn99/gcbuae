/**
 * Builds the home page "Explore the materials" scene derivatives.
 *
 *   node scripts/build-home-materials.mjs      (or: npm run assets:home-materials)
 *
 * Reads the Higgsfield 4K masters from assets/source/home-materials/
 * ({quartz,marble,terrazzo}-master.png|jpg|webp) and writes
 * public/home/materials/{slug}-scene.webp at 840x1120 - 2x the ~420px CSS
 * slot of the expanded panel. One single encode from the master (never
 * re-compress a compressed derivative), per PILLAR-PLAYBOOK §7. Prints the
 * output size and fails loudly if any derivative exceeds the 300KB asset
 * budget from GOVERNANCE §4.
 */

import { mkdir, readdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = join(ROOT, "assets", "source", "home-materials");
const OUT_DIR = join(ROOT, "public", "home", "materials");

const SLUGS = ["quartz", "marble", "terrazzo"];
const WIDTH = 840;
const HEIGHT = 1120;
const BUDGET_KB = 300;

await mkdir(OUT_DIR, { recursive: true });
const sources = await readdir(SOURCE_DIR);

let failed = false;
for (const slug of SLUGS) {
  const master = sources.find((f) => f.startsWith(`${slug}-master.`));
  if (!master) {
    console.error(`MISSING master for ${slug} in ${SOURCE_DIR}`);
    failed = true;
    continue;
  }
  const out = join(OUT_DIR, `${slug}-scene.webp`);
  await sharp(join(SOURCE_DIR, master), { limitInputPixels: false })
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
    .webp({ quality: 86, effort: 6, smartSubsample: true })
    .toFile(out);
  const kb = Math.round((await stat(out)).size / 1024);
  const flag = kb > BUDGET_KB ? "  <-- OVER 300KB BUDGET" : kb > 200 ? "  (over 200KB target)" : "";
  console.log(`${slug}-scene.webp  ${WIDTH}x${HEIGHT}  ${kb}KB${flag}`);
  if (kb > BUDGET_KB) failed = true;
}

if (failed) {
  console.error("Budget or source failure - fix before shipping.");
  process.exit(1);
}
