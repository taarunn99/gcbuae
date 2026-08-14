# JAQUAR V2 BUILD BRIEF - gcbuae.com
### Instructions for the Claude Code instance building the Jaquar brand hub v2

You are receiving the third extraction package in the series, produced from
the official **Jaquar Global Bath Catalogue 2025-2026** (364 pages). Two
inputs ship with this brief:

1. `jaquar-catalogue.md` - the complete verbatim extraction: 1,650 products
   across 70+ collections/ranges, every spec table, warranty matrix,
   certifications, finish-code system, and a numbered "Notes for website
   content generation" section. Treat it as the single source of truth for
   facts. It flags every contradiction with what is currently live.
2. `jaquar-catalogue-images.zip` - 1,387 image files + `index.csv` (1,650 rows; rows without an image_file are text-only catalogue entries whose printed photo was shared, composite or too small to crop - their facts still ship on pages)
   (`name,sku,category,collection,finish,image_file,page,notes`). Product
   cutouts are PNG with alpha; lifestyle/banner scans are JPEG. Folder slugs
   match the live site where pages exist; everything else is marked NEW in
   the csv notes.

Read both fully before touching the codebase. Then work in the order below.

---

## 0. Hard laws (unchanged, zero exceptions)

- NO EM DASHES OR EN DASHES anywhere: code, copy, meta tags, alt text,
  filenames, commit messages. Plain hyphen "-" only.
- Never invent a fact, price, spec or spelling. If it is not in
  `jaquar-catalogue.md` or already verified on the live site, it does not
  go on a page. The MD flags printed typos inline - keep our copy correct
  but never "quote" a typo as if fixed in the source.
- No prices exist in this catalogue. Do not fabricate price content;
  the price-gap SEO play waits for a separate UAE price list.
- Palette lock: Onyx Green #0C1510, Pine Green #355E4D, Pastel Green
  #6F8F78, Marble White #F7F8F5, Dusty Olive #D2D4C8. Product photography
  is the only element allowed to carry other colours.
- Typography and layout stay on the golden-ratio system: phi = 1.618
  scale (1rem, 1.618, 2.618, 4.236, 6.854) and 1.618fr/1fr splits.
- Copy voice: assured, spare, architectural. B2B wholesale - stock,
  specs, delivery. Contractors, developers, fit-out companies.

## 1. What v2 adds to the live structure

Live today: `/jaquar`, 5 categories, 28 collections (see index.csv slugs).
The catalogue extraction supports this expansion. Build in this priority:

**Tier 1 - enrich live pages (highest SEO leverage, zero routing risk):**
Merge catalogue spec tables, flow rates, finish cards, SKU lists and the
warranty matrix into the 28 live pages. The MD's section 7 warranty table
and the finish-code mechanism feed the SKU decoder directly. Fix the two
flagged contradictions on live pages: whirlpool pump ratings become
per-model (four Fonte/Fusion models are 1.0HP, not 1.4HP) and the 10-year
warranty claim becomes per-category (colour-finish faucets are 5 years).

**Tier 2 - new collection pages inside live categories (long-tail wins):**
faucets: opal-prime, vignette-prime, ornamix-prime, alive, queens-prime,
queens, rendezvous, lyric, solo, florentine, florentine-prime, continental,
astra, arc, pressmatic, floor-mounted.
sanitary-ware: d-arc, aria, fonte, jdr-designer-range, urinals,
disabled-friendly.
showers: shower-panels.
whirlpools: alive, fonte, fonte-r, fusion, laguna.
Each of these has full product tables + images in the pack. One page = one
query still applies ("jaquar ornamix prime", "jaquar shower panels uae").

**Tier 3 - new categories (decide routes, then build):**
- `/jaquar/flushing-systems` (i-flush, flush-valves, cisterns,
  flush-plates) - strong UAE B2B search intent, build it.
- `/jaquar/bathtubs` (freestanding, built-in, accessories) - build it.
- `/jaquar/wellness` (spas, saunas, steam-solutions) - build as one
  category page with three collection pages; spa spec sheet is a moat.
- `/jaquar/water-heaters` - build; capacity-selection guide on p345 of the
  MD is ready-made FAQ schema.
- `/jaquar/accessories` and washroom-accessories - single combined page
  is enough at first; split later if impressions justify.
- Do NOT touch shower-enclosures or octane-showers with this data - the
  catalogue does not cover them; they stay sourced from uae.jaquar.com.

**Slug conflict you must resolve first:** the catalogue has FUSION (FUS-)
only; the site has faucets/fusion-prime. Decision: keep the live
fusion-prime page untouched, create faucets/fusion as its own page, and
cross-link the two with a one-line "related range" note. If analytics later
show cannibalisation, 301 the weaker one.

**EKO is "For projects only":** put it under a projects/contract framing
block, not the standard retail grid.

## 2. Image pipeline - Higgsfield MCP (required)

WHY: the source PDF is web-compressed. Product cutouts are roughly 150 dpi,
typically 200-500 px wide. They are accurate for identification but far
below the quality bar of the current site. Every image that ships must go
through Higgsfield. Credits are NOT a constraint on this project - spend
whatever it takes; quality is the only metric.

**Pass A - 4K upscale of every product cutout used on a page.**
Use the Higgsfield upscale tool (same ByteDance-provider flow used for the
Weber flyer rebuild). Workflow per image:
1. Upload the PNG from the pack (`media_upload` / `media_import_url`).
2. Upscale 4x (target roughly 4000 px on the long edge). Do not exceed the
   model's max; two chained 2x passes are acceptable if a single 4x
   degrades edges.
3. Export, then convert to WebP for shipping: quality 82-88, keep alpha
   for cutouts. Ship as `{sku}.webp` in
   `public/images/jaquar/{category}/{collection}/`.
4. Keep the original PNG pack untouched in the repo's raw-assets area (or
   Vercel Blob) as the provenance layer.
Batch by collection; verify a sample of each batch visually - reject any
upscale that hallucinates texture on chrome or PVD finishes (metallic
surfaces are where upscalers fail; if a finish looks painted, rerun at 2x).

**Pass B - generated hero and lifestyle imagery.**
The catalogue's lifestyle scans (folders `lifestyle/` and `banners/`) carry
baked-in captions and print artefacts; treat them as reference only, never
ship them raw. Generate originals with Higgsfield image generation for
category heroes, collection heroes and full-bleed banners. All generations
in 4K (or the model maximum, then upscale pass), shipped as WebP.

Prompt system - use this template and adapt the bracketed parts:

```
Editorial architectural photography for a luxury bathroom brand catalogue.
[SUBJECT: e.g. a chrome single-lever basin mixer with a sculpted flat
lever] on [SURFACE: honed white marble vanity], set against a deep onyx
green wall (#0C1510) with a soft vertical band of pine green (#355E4D)
shadow. Muted sage ceramics as props (#6F8F78, #D2D4C8 accents), nothing
else in frame. Soft directional daylight from the left, long gentle
shadows, slight haze. Composition follows the golden ratio: subject
occupies the right 1fr column, negative space fills the left 1.618fr
column. Assured, spare, architectural mood. No people, no text, no logos.
Ultra sharp, 4k, [ASPECT].
```

Aspect slots the design system uses:
- Portrait 3:4 for the narrow golden column and collection cards.
- Landscape 4:3 for standard cards.
- 21:9 (or the closest available wide ratio) for full-bleed category
  banners.
- Square 1:1 for grid tiles.
Generate with generous margins; the cards crop, the prompt should never
place the subject at frame edges.

Per-category subject lines (adapt per collection using the MD's printed
positioning lines - e.g. Laguna "An Iconic Form With Timeless Simplicity"
should read calm and horizontal; Queen's Prime "Regal Elegance of the
Victorian Era" earns antique bronze and deeper shadow):
- faucets: single mixer as sculptural object, water off, marble + onyx.
- sanitary-ware: wall-hung WC or basin, low camera, marble white field.
- showers: overhead shower with fine water threads backlit against onyx
  green, mist catching light.
- whirlpools/bathtubs: installed tub in a serene room, dusk light, pine
  green wall, olive textiles.
- wellness (spa/sauna/steam): warm wood + steam haze, kept inside the
  five-colour discipline.
- flushing-systems: flush plate detail macro on marble, extreme restraint.
- water-heaters: utility subject, so go abstract - product against pastel
  green field, studio light.

**Pass C - optional but wanted: one hero video.**
A 6-10 s slow-push hero for `/jaquar` (Kling flow, same as the CastedLuxe
LuxeHero component): overhead shower thread of water in slow motion against
onyx green, single caustic highlight, loopable, no text. Ship as MP4 +
poster WebP; reuse the existing LuxeHero pattern.

**Shipping rules for all passes:** WebP everywhere (except the video),
4K masters, sizes served through next/image with proper `sizes` attrs;
alt text = product name + SKU + finish from index.csv (never generic);
filenames stay kebab-case SKU slugs from the pack; every shipped image
traces back to an index.csv row or a generation prompt logged in
`docs/jaquar-image-provenance.md` (create it - one line per generated
asset: prompt, model, date, page it ships on).

## 3. SEO build directives

1. One page = one query, unchanged. New Tier 2/3 pages own their long-tail
   ("jaquar flush plates uae", "jaquar freestanding bathtub").
2. Spec tables are the moat: render the MD's tables as real HTML tables
   (not images), one table component, mobile-scrollable. Whirlpool sheet,
   spa sheet, warranty matrix, shower sizes with registered design
   numbers, flow rates at 3 bar - all of it.
3. SKU decoder v2: load every base SKU + the finish-card matrix per
   collection from the MD. The decoder can now explain the middle-infix
   system (LAG-91011B + CHR = LAG-CHR-91011B) and dual-tone Laguna codes
   (BBC, BGM, GMG).
4. FAQ schema per category from the MD: warranty years per part, i-Flush
   0.8 bar minimum, 3/6 L flush adjustable to 2/4 L, frame load 400 kg,
   sensor battery vs 9v transformer, water heater capacity selection,
   care guidelines (no acid cleaners, water hardness 300-400 ppm).
5. Entity/schema facts: 65+ years, 55+ countries, 8 plants, 330,000 sq m,
   45.9 million fittings/year, LEED Platinum HQ, first Indian Red Dot
   winner, Jaquar World Dubai, group brands Essco and Artize. Use the p13
   figures where the MD notes the p11/p13 disagreement.
6. Keep disclaimers where the MD says they are printed ("finishes are
   indicative", "pictures for illustration") - accuracy is part of the
   trust play.

## 4. Definition of done

- [ ] All Tier 1 live pages enriched; the two contradiction fixes shipped.
- [ ] Tier 2 collection pages live with tables, finish cards, upscaled
      images, internal links from their category pages.
- [ ] Tier 3 category routes decided and built per section 1.
- [ ] Every shipped image is Higgsfield-processed 4K WebP; zero raw
      catalogue crops at hero or card size; provenance doc exists.
- [ ] fusion/fusion-prime resolution implemented and noted in the doc.
- [ ] Zero em or en dashes in the diff. Run a repo-wide check before
      committing.
- [ ] Lighthouse: images lazy-loaded, LCP hero preloaded, CLS stable with
      explicit dimensions.
- [ ] Sitemap + internal linking updated; no live page orphaned; shower
      enclosures and octane untouched.
