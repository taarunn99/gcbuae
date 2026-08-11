/**
 * Downloads official Jaquar product images (we are their dealer; product
 * imagery is displayed as supplied) and converts them to sized WebP under
 * public/jaquar/. Feed it a manifest JSON:
 *
 *   node scripts/fetch-jaquar-images.mjs manifest.json
 *
 * Manifest shape: [{ "url": "https://...", "out": "faucets/aria/basin-mixer", "width": 1200 }]
 * Writes public/jaquar/<out>.webp (q88, effort 6). Skips existing files.
 */
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";

const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error("usage: node scripts/fetch-jaquar-images.mjs <manifest.json>");
  process.exit(1);
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
let ok = 0;
let failed = 0;

for (const item of manifest) {
  const dest = `public/jaquar/${item.out}.webp`;
  try {
    await stat(dest);
    continue; // already fetched
  } catch {
    /* not yet */
  }
  try {
    const response = await fetch(item.url, {
      headers: { "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    await mkdir(dirname(dest), { recursive: true });
    const webp = await sharp(buffer)
      .resize(item.width ?? 1200, null, { withoutEnlargement: true })
      .webp({ quality: 88, effort: 6 })
      .toBuffer();
    await writeFile(dest, webp);
    ok += 1;
    console.log("ok", item.out, `${Math.round(webp.length / 1024)}KB`);
  } catch (error) {
    failed += 1;
    console.error("FAIL", item.out, String(error));
  }
}

console.log(`done: ${ok} fetched, ${failed} failed`);
