# Competitor Audit - August 2026 (full-field crawl + SERP validation)

Run 2026-08-18 across every product field (marble, quartz, terrazzo,
bathrooms, care, wellness): deep audits of the three never-audited
competitors, refreshes of the four known ones, a discovery sweep for
unknown players, and a 33-query live SERP map. Method notes: crawled
via web fetch + search (US-based index, so treat SERP verdicts as
content-gap verdicts, not exact UAE rank predictions); JSON-LD
negatives are soft where the fetcher stripped page heads. Ahrefs volume
data was not available this run; targeting is validated by SERP
composition instead. **gcbuae.com appeared in zero of the 33 SERPs
checked - the baseline is zero visibility, everything from here is
upside.**

## 1. Headline findings

1. **The KalingaStone vacuum is now uncontested.** Mina Marbles has
   structurally exited the brand: every KalingaStone URL 404s, the
   category is purged from all sitemaps, and their nav now sells
   Caesarstone. Their dead pages still hold legacy rankings - free
   territory plus link-reclamation targets. The only remaining
   KalingaStone merchandiser is marmoclassic.ae, whose rebuilt site
   ships the placeholder title "GMC-Website" on every page, no schema,
   no specs.
2. **Nobody occupies GCB's intersection.** Across all audited and
   discovered competitors: none seriously covers terrazzo as a
   material, and none carries a stone-care product line with technical
   content. Terrazzo + FILA-anchored care + bathrooms + slabs is an
   intersection only gcbuae.com sits on.
3. **Entrenchment is by distributorship, not content quality.** Where a
   brand has an appointed distributor (FILA-QCON, Jaquar-itself), the
   head brand term is locked; where it does not (KalingaStone pricing,
   FILA application content, brand-vs-brand comparisons), the SERP is
   open.
4. **The rising threat is casamilanoitaly.com** - Shopify, EN/AR/RU,
   thousands of priced SKUs, an agentic-discovery sitemap, and seven
   2,000-word FAQ-format explainers published in the three weeks before
   this audit. Track monthly. Their gaps: no terrazzo, no care line,
   narrative intros instead of direct answers.
5. **The technical benchmark is granitiuae.com** - now running Product +
   Organization + BreadcrumbList schema with per-SKU specs, stock and
   AED prices. Beating them on quartz queries requires matching schema
   depth (which The Journal's template already does) - but their quartz
   is 7mm tile-adjacent, not slabs, and their focus has drifted to
   sanitaryware.

## 2. Known competitors - state as of 2026-08-18

| Site | KalingaStone | Schema | Blog | Key weakness | Threat |
|---|---|---|---|---|---|
| minamarbles.com | ABANDONED (404s, sitemap-purged) | none | stale ~7 months | keyword-stuffed titles, dead brand section | fading |
| marmoclassic.ae | yes - 8+ shades, 3 sub-types, /ar live | none | new CMS | "GMC-Website" placeholder title on EVERY page; Kalinga pages outside sitemap | medium |
| glaze.ae | no (Caesarstone distributor) | none detected | 9/14 posts from 2021 | NO XML sitemap at standard path; duplicate titles; blog templates emit site title, not post titles; ~900 shade pages padded with identical boilerplate quotes | high (stone only) |
| archistoneuae.com | no (Casla quartz) | none | 38 posts, no dates rendered | zero JSON-LD across the site; visible FAQs with no FAQPage markup; no engineered marble at all | high (quartz) |
| granitiuae.com | no | Product+Org+Breadcrumb | active 2026 | pivoted to sanitaryware; quartz is 7mm tile stock | medium-high |
| casamilanoitaly.com | no (Techlam/Apavisa) | unverified (Shopify) | 7 new posts Jul-Aug 2026 | no terrazzo, no care, buried ledes | HIGH, rising |
| alqamaceramics.com | no | Breadcrumb only | 22 live casino-spam posts | STILL HACKED (new spam July 2026); 27 products; no metas | none (cautionary tale) |

## 3. Newly discovered competitors (deep-audit shortlist starred)

High threat: *sabtagranite.com (pure content-led SEO, ranks on article
URLs, blocks crawlers - manual audit needed), *ronakintl.com (#1 for
"quartz supplier uae", publishing Jul-Aug 2026, own Fugenstone brand),
*marmara.ae (sharpest content aim: comparison + climate articles + the
only real "marble price Dubai" guide), siommarble.com (most ubiquitous
across stone SERPs), fairdealuae.com (Sharjah, active blog),
mahabldg.com (the one GCB-shaped multi-category content model, in
bathrooms). Medium: alrafahia.com (publishes quartz prices - and ranks
for it), qconinternational.com (FILA channel competitor),
independentmarble.com (HMK Moller care agent), tilesman.com,
hottubkart.com (only wellness content player), marblelife-dubai.ae.
Directory problem: yellowpages-uae.com colonises "[product] suppliers
UAE" head terms across every field (8+ SERPs), with reachuae.com and
atninfo.com behind it - get listed, don't fight them. A template farm
(dubaiflooring.ae / dubaiinteriors.ae / parquetflooring.ae /
risalafurniture.ae / eternalhome.ae, apparently one operator) owns
terrazzo SERPs with thin discount pages.

## 4. SERP verdicts for our target queries (compressed)

EASY (no credible direct answer exists): kalingastone price (zero AED
pricing anywhere - clearest vacuum found), terrazzo flooring/tiles
uae+dubai (thin contractor pages only), whirlpool bath uae (no buyer's
guide), fila mp90 uae (SERP ranks the sportswear brand's Wikipedia),
jaquar vs grohe (YouTube/Quora only), marble sealer uae (nobody matches
sealer to stone), quartz countertops sharjah (no dedicated page exists
anywhere), engineered marble guide / vs natural (a USPTO patent PDF
ranks top-3), kalingastone vs caesarstone (zero pages on earth).

MEDIUM: marble price dubai (only marmara.ae answers), quartz
countertops dubai (no price transparency except alrafahia), best
bathroom brands uae (thin self-promoting listicles), wall hung toilet
uae (uae.jaquar.com's blog is the one answer), jacuzzi dubai price
(split intent - target "jacuzzi bathtub price dubai").

HARD (entrenched - win via qualified variants): marble slab supplier
uae (six showroom domains), marble supplier abu dhabi (genuine Musaffah
operators), jaquar dealer dubai (brand owns 5/8 slots), unqualified
US-authority queries (quartz vs marble, terrazzo pros and cons, how to
clean marble floors - our UAE-qualified versions are the play),
kalingastone uae (Mina's legacy grip, weakening), fila stone care uae
(QCON).

## 5. Actions taken in this pass

- Five new Journal posts shipped against the top validated vacuums:
  /blog/kalingastone-price-uae, /blog/kalingastone-vs-caesarstone,
  /blog/quartz-countertops-sharjah, /blog/hard-water-stains-on-marble,
  /blog/jaquar-vs-grohe. All follow the expansion protocol, carry
  product CTAs and full schema, registered against the cannibalization
  registry (44 posts total).
- Already covered by the existing 39 before this audit: terrazzo
  cluster (P3+C13-C16), whirlpool guide (C29+P6), marble sealer (C24),
  quartz/marble price guides (C3, C12), UAE-qualified care cluster.
- GOVERNANCE §2 appendix updated (see that file).

## 6. Backlog from this audit (next passes)

1. "fila mp90 uae" application guide post (easy vacuum, FILA tie).
2. "engineered marble price uae" + "quartz price per square metre
   dubai" - both near-zero SERPs; decide whether to fold into C3/C12
   as H2s+metas or ship as posts (watch cannibalization vs C12/C3).
3. Geo set: quartz-countertops-abu-dhabi (same structural gap as
   Sharjah); marble-supplier-sharjah angle via the Al Sajaa story.
4. Brand-vs-brand cluster continuation: jaquar-vs-rak-ceramics (the
   listicles name both, nobody compares).
5. "jacuzzi bathtub price dubai" intent-split post.
6. Manual (browser) audit of sabtagranite.com - blocks crawlers.
7. Directory placements: yellowpages-uae.com, reachuae.com listings.
8. Link reclamation: approach sites linking to Mina's dead KalingaStone
   URLs.
9. Quarterly re-crawl per GOVERNANCE standing rule (next: Nov 2026).

## 7. Gap-list reconciliation (owner's pasted list vs this repo)

| Item | Status here |
|---|---|
| "Blog posts aren't written" | DONE - all 39 bodies written 2026-08-18 per protocol, +5 today (44) |
| Search volume never verified | PARTIALLY CLOSED - live SERP composition validated per query this audit (US-index caveat); Ahrefs volumes still unavailable |
| PDF extraction / 3 catalogues + swatch ZIPs | DONE LONG AGO in this repo - quartz/marble/terrazzo catalogues live as 128 shade pages |
| Lifestyle images 1 of 4 | STALE (other chat) - this repo ships 60+ lifestyle/scene images across all lines |
| Al Qama / Casa Milano / Glaze never audited | DONE - this audit, §2 above |
| No 9:16 mobile clips | DONE - four clips produced 2026-08-18, assets/social/ |
