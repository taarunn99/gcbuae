/**
 * IndexNow submission for gcbuae.com (owner, 2026-08-24: Bing held pages
 * at "Discovered but not crawled" - IndexNow tells the engines directly
 * instead of waiting on their crawl budget).
 *
 * ── The protocol, researched 2026-08-24 (indexnow.org/documentation) ──
 * - IndexNow is an open ping protocol: one submission notifies EVERY
 *   participating engine (they share notifications) - Bing, Yandex,
 *   Seznam.cz, Naver. Google does NOT participate; Google discovery
 *   stays sitemap + Search Console.
 * - Ownership proof: a plain-text key file at
 *   https://www.gcbuae.com/<key>.txt whose content is the key itself.
 *   The key is 8-128 hex characters. Ours lives in public/<key>.txt and
 *   deploys with the site - THE KEY FILE MUST BE LIVE BEFORE A
 *   SUBMISSION VALIDATES. Do not rename or delete it.
 * - Bulk submission: POST https://api.indexnow.org/IndexNow with JSON
 *   {host, key, urlList} - up to 10,000 URLs per request,
 *   Content-Type "application/json; charset=utf-8".
 * - Response codes: 200 OK; 202 Accepted (received, key validation
 *   pending - normal on the first ever submission); 400 malformed;
 *   403 key not found/invalid; 422 URLs don't belong to the host or
 *   don't match the key; 429 spam throttle.
 * - Etiquette: submit URLs when they are created, updated or deleted.
 *   Avoid re-submitting the unchanged whole site daily - engines may
 *   deprioritise hosts that spam. Full-sitemap pushes are for launches
 *   and structural releases; day-to-day, submit just what changed.
 *
 * ── Usage ──
 *   node scripts/indexnow-submit.mjs --all          # every sitemap URL
 *   node scripts/indexnow-submit.mjs / /kalingastone /products
 *   node scripts/indexnow-submit.mjs --all --dry-run
 *   (also: npm run indexnow -- --all)
 *
 * ── Where to SEE the effect ──
 * 1. The response here: 200/202 means the batch was accepted.
 * 2. Bing Webmaster Tools -> IndexNow (left nav): shows every URL
 *    received via IndexNow with timestamps, usually within minutes.
 * 3. Bing WMT -> URL Inspection: "Discovered but not crawled" should
 *    move to crawled/indexed over hours-to-days instead of weeks.
 * 4. Bing WMT -> Site Explorer / Crawl requests graph: crawl activity
 *    typically jumps within 24-48h of a first submission.
 * 5. Yandex Webmaster (if verified) shows the same under IndexNow.
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const HOST = "www.gcbuae.com";
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const PUBLIC_DIR = join(process.cwd(), "public");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const all = args.includes("--all");
const paths = args.filter((a) => !a.startsWith("--"));

// The key is discovered from public/ (a file named <64-hex>.txt whose
// content equals its name) so this script and the deployed proof can
// never drift apart.
async function discoverKey() {
  for (const file of await readdir(PUBLIC_DIR)) {
    const match = file.match(/^([0-9a-f]{8,128})\.txt$/);
    if (!match) continue;
    const content = (await readFile(join(PUBLIC_DIR, file), "utf8")).trim();
    if (content === match[1]) return content;
  }
  throw new Error(
    "No IndexNow key file found in public/ (expected <hex-key>.txt containing the key).",
  );
}

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const key = await discoverKey();

// Sanity: refuse to submit before the deployed key file is reachable -
// engines validate ownership by fetching it, and a 403 here would waste
// the submission.
const keyUrl = `https://${HOST}/${key}.txt`;
const keyRes = await fetch(keyUrl);
if (!keyRes.ok || (await keyRes.text()).trim() !== key) {
  console.error(`Key file is NOT live yet at ${keyUrl} (HTTP ${keyRes.status}).`);
  console.error("Deploy first, then re-run.");
  process.exit(1);
}

const urlList = all
  ? await sitemapUrls()
  : paths.map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`);

if (urlList.length === 0) {
  console.error("Nothing to submit. Pass --all or one or more paths.");
  process.exit(1);
}
if (urlList.length > 10000) {
  console.error(`${urlList.length} URLs exceeds the 10,000/request limit.`);
  process.exit(1);
}

console.log(`Key file live: ${keyUrl}`);
console.log(`Submitting ${urlList.length} URL(s) for ${HOST} to ${ENDPOINT}`);
if (dryRun) {
  console.log("--dry-run: no request sent. First 10 URLs:");
  for (const u of urlList.slice(0, 10)) console.log(`  ${u}`);
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, urlList }),
});

const verdicts = {
  200: "200 OK - accepted. Check Bing WMT -> IndexNow within minutes.",
  202: "202 Accepted - received; key validation pending (normal for a first submission). Treat as success.",
  400: "400 Bad Request - malformed payload. Bug in this script; do not retry blindly.",
  403: "403 Forbidden - key file not found/invalid at the host. Is the deploy live?",
  422: "422 Unprocessable - URLs do not belong to the host or do not match the key.",
  429: "429 Too Many Requests - throttled as potential spam. Wait a day; submit less often.",
};
console.log(verdicts[res.status] ?? `HTTP ${res.status} (unexpected)`);
const body = await res.text();
if (body.trim()) console.log(body.trim());
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
