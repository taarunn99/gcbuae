/**
 * Site-wide alt-attribute audit (owner, 2026-08-24: SEO/GEO tools flag
 * alt="" as missing and it costs AI-search visibility).
 *
 * Scans every prerendered HTML document in .next/server/app after
 * `npm run build` - i.e. every static and SSG route the site ships -
 * extracts each <img> tag, and reports any with a missing or empty alt.
 * Exits 1 when offenders exist, so it can gate a release.
 *
 *   npm run build && node scripts/audit-image-alts.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = join(process.cwd(), ".next/server/app");

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith(".html")) yield full;
  }
}

const offenders = new Map(); // src signature -> { pages: Set, sample }
let pageCount = 0;
let imgCount = 0;

for await (const file of htmlFiles(ROOT)) {
  pageCount++;
  const html = await readFile(file, "utf8");
  const route = "/" + relative(ROOT, file).replace(/\.html$/, "").replace(/(^|\/)index$/, "");
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    imgCount++;
    const tag = match[0];
    const alt = tag.match(/\balt="([^"]*)"/);
    if (alt && alt[1].trim().length > 0) continue;
    const src =
      tag.match(/\bsrc="([^"]*)"/)?.[1] ??
      tag.match(/\bsrcset="([^",\s]*)/)?.[1] ??
      "(no src)";
    // Normalise /_next/image?url=... to the underlying asset for grouping.
    const key = decodeURIComponent(src.replace(/^\/_next\/image\?url=/, "").replace(/&.*$/, ""));
    if (!offenders.has(key)) offenders.set(key, { pages: new Set(), sample: tag.slice(0, 140) });
    offenders.get(key).pages.add(route);
  }
}

console.log(`${pageCount} prerendered pages scanned, ${imgCount} <img> tags.`);
if (offenders.size === 0) {
  console.log("All images carry a non-empty alt. Clean.");
  process.exit(0);
}
console.log(`\n${offenders.size} distinct images with MISSING/EMPTY alt:\n`);
for (const [src, info] of [...offenders.entries()].sort((a, b) => b[1].pages.size - a[1].pages.size)) {
  const pages = [...info.pages];
  console.log(`  ${src}`);
  console.log(`    on ${pages.length} page(s): ${pages.slice(0, 3).join(", ")}${pages.length > 3 ? " ..." : ""}`);
}
process.exit(1);
