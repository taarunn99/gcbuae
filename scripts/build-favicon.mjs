/**
 * Rebuilds src/app/favicon.ico from src/app/icon.svg.
 *
 *   node scripts/build-favicon.mjs
 *
 * Packs 16/32/48px PNG layers into one ICO. Google's favicon guideline
 * asks for a size that is a multiple of 48px; browser tabs use 16/32.
 * Rerun whenever icon.svg changes.
 */
import { readFile, writeFile } from "node:fs/promises";

import sharp from "sharp";

const svg = await readFile("src/app/icon.svg");
const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((s) => sharp(svg, { density: 300 }).resize(s, s).png().toBuffer()),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);

const entries = [];
let offset = 6 + 16 * sizes.length;
for (let i = 0; i < sizes.length; i++) {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); // width (256 would be 0)
  e.writeUInt8(sizes[i], 1); // height
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  entries.push(e);
}

await writeFile(
  "src/app/favicon.ico",
  Buffer.concat([header, ...entries, ...pngs]),
);
console.log(`wrote src/app/favicon.ico (${offset} bytes, ${sizes.join("/")}px)`);
