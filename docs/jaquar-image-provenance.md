# Jaquar v2 image provenance

Every image shipped for the Jaquar hub v2 traces to one of the sources
below. Masters live in `assets/source/jaquar/generated/` (gitignored,
re-downloadable from the Higgsfield gallery); WebP derivatives ship in
`public/jaquar/` via `scripts/ingest-jaquar-generated.mjs` (sharp, q88,
effort 6, lanczos3). Generated 2026-08-14.

## Pass A - product cutout upscales

- Source: `assets/source/jaquar-catalogue/images/` - the official product
  cutouts cropped from the Jaquar Global Bath Catalogue 2025-2026 PDF
  (~150 dpi, 140-500 px). Listed row-by-row in that folder's `index.csv`.
- Process: `scripts/jaquar-upscale-prep.mjs` composites each alpha PNG
  onto a Marble White #F7F8F5 canvas with a 10% margin (the upscaler
  flattens transparency, so the brand background is chosen first), then
  Higgsfield `bytedance_image_upscale` at 4K, then sharp to
  `public/jaquar/products/{category}/{collection}/{sku}.webp` at 800 px.
- Coverage: the first 2 catalogued products with images per new
  collection page (59 collections), QC-sampled per batch for metallic
  texture hallucination.
- These are Jaquar's own product photographs, upscaled for legibility -
  not generative imagery. Alt text carries name + SKU + finish from
  index.csv.

## Pass B - generated editorial imagery (model: nano_banana_pro, 2k;
   hub banner 4k)

All prompts follow the v2 brief's template: editorial architectural
photography, five-colour palette (onyx #0C1510 ground, pine #355E4D
shadow band, sage #6F8F78 / dusty olive #D2D4C8 props, marble white
surfaces), golden-ratio composition (subject right 1fr, negative space
left 1.618fr), soft directional light, no people, no text, no logos.
Catalogue lifestyle scans (`assets/source/jaquar-catalogue/images/
lifestyle|banners/`) were reference only - never shipped (baked-in
captions/print artefacts).

| Asset | Subject |
|---|---|
| `scenes/{flushing-systems,bathtubs,wellness,water-heaters,accessories}.webp` (3:4) + `categories/{same}.webp` (4:3) | Category art for the 5 new categories, per-category subject rules from the brief |
| `heroes/faucets/*.webp` (4:5, 25) | One editorial hero per new faucet range, art-directed from its printed positioning line (Queen's Prime = antique bronze Victorian, Rendezvous = crystal + auric gold, Pressmatic = frozen water burst...) |
| `heroes/sanitary-ware/*.webp` (4:5, 13) | Wall-hung WCs / basins, low camera, marble-white field |
| `heroes/showers/*.webp` (2), `heroes/whirlpools/*.webp` (5), `heroes/flushing-systems/*.webp` (4), `heroes/bathtubs/*.webp` (3), `heroes/wellness/*.webp` (3), `heroes/accessories/*.webp` (7) | Per-collection heroes, subjects matched to the printed range descriptions |
| `hub/banner.webp` (21:9, 4k) | Ultrawide marble vanity banner for the hub maker section |
| `hub/editorial-mixer.webp`, `hub/editorial-wc.webp` | Hub editorial inserts |

## Pass C - hero film (model: seedance_2_5, 8 s, 16:9)

- `public/jaquar/hero/jaquar-hero.mp4` + `jaquar-hero-poster.webp` -
  slow push on backlit water threads from a square rain shower against
  onyx green, single caustic highlight, loopable. Master:
  `assets/source/jaquar/generated/hero/jaquar-hero-master.mp4`. Encoded
  libx264 crf 23, 1920 px, faststart, no audio. Plays via the
  `JaquarHero` component (IntersectionObserver-gated, reduced-motion
  ships the poster).

## Not touched

`public/jaquar/{faucets,sanitary-ware,showers,shower-enclosures,
whirlpools}/*.webp`, `categories/`, `scenes/` for the 5 original
categories, and `src/assets/jaquar-hero.webp` - the uae.jaquar.com
official imagery from the v1 build (see scripts/fetch-jaquar-images.mjs).
Shower-enclosures and Octane pages remain fed by that source only; the
2025-2026 catalogue does not cover them.
