/**
 * Builds the home page "Explore the materials" scene derivatives.
 *
 *   node scripts/build-home-materials.mjs      (or: npm run assets:home-materials)
 *
 * Reads the Higgsfield 4K masters from assets/source/home-materials/
 * ({quartz,marble,terrazzo}-master.png|jpg|webp) and writes
 * public/home/materials/{slug}-scene.webp at 1920x1232 - 2x the widest
 * CSS slot of the expanded panel (~960px inside the 90rem container), in
 * the panel's landscape aspect so object-cover crops nothing sharp away.
 * One single encode from the master (never re-compress a compressed
 * derivative), per PILLAR-PLAYBOOK §7. Prints the output size and fails
 * loudly if any derivative exceeds the 300KB asset budget from
 * GOVERNANCE §4.
 */

import { mkdir, readdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = join(ROOT, "assets", "source", "home-materials");
const OUT_DIR = join(ROOT, "public", "home", "materials");

const SLUGS = ["quartz", "marble", "terrazzo"];
const WIDTH = 2048;
const HEIGHT = 1314;
const BUDGET_KB = 300;

/** Terrazzo chip detail is entropy-heavy - it needs a lower encode to fit
 *  the budget; the sharpness lives in the 2048px resolution, not the q. */
const QUALITY = { quartz: 86, marble: 86, terrazzo: 70 };

/** The ball textures - generated 4K seamless macros
 *  ({slug}-ball-master.*), cut square at 2.5x the 208px ball. */
const BALL_SIZE = 512;

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
    .webp({ quality: QUALITY[slug], effort: 6, smartSubsample: true })
    .toFile(out);
  const kb = Math.round((await stat(out)).size / 1024);
  const flag = kb > BUDGET_KB ? "  <-- OVER 300KB BUDGET" : kb > 200 ? "  (over 200KB target)" : "";
  console.log(`${slug}-scene.webp  ${WIDTH}x${HEIGHT}  ${kb}KB${flag}`);
  if (kb > BUDGET_KB) failed = true;

  const ballMaster = sources.find((f) => f.startsWith(`${slug}-ball-master.`));
  if (!ballMaster) {
    console.error(`MISSING ball master for ${slug} in ${SOURCE_DIR}`);
    failed = true;
    continue;
  }
  const ballOut = join(OUT_DIR, `${slug}-ball.webp`);
  await sharp(join(SOURCE_DIR, ballMaster), { limitInputPixels: false })
    .resize(BALL_SIZE, BALL_SIZE, { fit: "cover" })
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toFile(ballOut);
  const ballKb = Math.round((await stat(ballOut)).size / 1024);
  console.log(`${slug}-ball.webp  ${BALL_SIZE}x${BALL_SIZE}  ${ballKb}KB`);
  if (ballKb > BUDGET_KB) failed = true;
}

if (failed) {
  console.error("Budget or source failure - fix before shipping.");
  process.exit(1);
}
