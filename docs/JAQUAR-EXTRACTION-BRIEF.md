# JAQUAR CATALOGUE EXTRACTION BRIEF
### Instructions for the Claude processing the Jaquar PDF (360 pages, ~80 MB)

You are preparing the raw material for the Jaquar brand hub on
**gcbuae.com** - the website of Global Classic Building Material LLC, a
Sharjah wholesale building-materials dealer. Another Claude (in Claude
Code) will consume your two outputs to enrich and extend pages that are
ALREADY LIVE. Your job is extraction and organization, not creativity:
be exhaustive, be verbatim, flag everything uncertain, invent nothing.

---

## 0. What already exists (do not duplicate blindly - enrich it)

The site already has these pages, built from uae.jaquar.com:

- `/jaquar` - brand hub
- 5 category pages and 28 collection pages with these EXACT slugs:

| Category (slug) | Collection slugs already live |
|---|---|
| faucets | aria, kubix-prime, fusion-prime, laguna, continental-prime, sensor-taps |
| sanitary-ware | kubix-prime, bidspa, laguna, opal-prime, vignette-prime, arc |
| showers | overhead-showers, octane-showers, hand-showers, cloud-shower, body-showers |
| shower-enclosures | ritz-collection, frameless, framed, sliding-range, shower-tray |
| whirlpools | arc, kubix-prime, opal-prime, vignette-prime, darc, kubix |

Rules that follow from this:
1. When the PDF covers one of these, reuse the SAME slug so files merge
   into the live config without rework.
2. When the PDF has collections or categories NOT listed above (the
   full grid on their site runs much longer - Florentine Prime, Queen's
   Prime, Ornamix Prime, Lyric, Alive, Fonte, D'arc sanitaryware,
   Flushing Systems, Bath Tubs, Accessories, Water Heaters...), extract
   them fully and mark them **NEW** so the site Claude can decide which
   earn pages.
3. The known facts already on the site (10-year warranty, 125,000
   taps/day, Anti-Germ glazing, Rubit, Booster, 6/8/10 mm glass, 1.4 HP
   pumps...) came from the website. Where the PDF confirms, contradicts
   or extends them, SAY SO explicitly - contradictions are gold, flag
   them inline.

---

## 1. Output 1 - `jaquar-catalogue.md`

One markdown file, modeled on this exact structure (it is the third in
a series - the site team's pipeline expects it):

```
# Jaquar - [Catalogue name as printed]
### Complete catalogue extraction for Global Classic Building Material LLC

**Source:** [filename] - [publisher line as printed], [page count],
[any print date/edition/ref number found].
**Extraction method:** [how you read it - note if any pages were
unreadable, low-res or skipped, with page numbers].
**Scope of this document:** [what product divisions this PDF covers
and, importantly, what it does NOT].

## 1. Brand and manufacturer
[table: brand, manufacturer, HQ, contacts, certifications as printed,
UAE presence - only what the PDF itself states]

## 2..N - one numbered section PER CATEGORY, each containing:
- The category as the PDF names it + page range
- Collections/ranges in the PDF's own order, with per-collection:
  - name EXACTLY as printed (flag unusual spellings - do not fix them)
  - product table: | Product name | SKU | Finishes | Sizes/dimensions |
    Price (only if printed) | Page | Image file |
  - collection-level copy/claims worth quoting, verbatim in quotes
- Category-level tech sections (cartridge specs, glazing, flushing,
  glass, pumps...) - verbatim or tightly quoted, with page refs
- Finish cards per category, exactly as the PDF lists them

## N+1. Warranty and service
## N+2. Certifications
## N+3. Technical specification tables (reproduce EXACTLY as printed)
## Final section: Notes for website content generation
[numbered list: never-invent warnings, spelling landmines, flagged
contradictions, quotable statistics, image-resolution notes, anything
the site team must not get wrong]
```

**Hard rules for the MD:**
- VERBATIM names, claims, numbers. Never invent, never "correct" a
  spelling, never round a number. If the source has a typo, keep it and
  flag it inline: `*(printed as "Venatian" - likely "Venetian", kept)*`.
- Every fact carries its page number.
- Prices: record ONLY if printed, with currency exactly as shown. If no
  prices are printed anywhere, state that once, clearly - it matters to
  the SEO plan.
- Flag every contradiction (within the PDF, or vs the facts in §0.3).
- Flag territorial restrictions, disclaimers, "available on request"
  markers.
- **NO EM DASHES OR EN DASHES anywhere in the file.** Plain hyphen "-"
  only, including ranges ("150-250 mm", "Mon-Sat"). This is an owner
  law on this project, zero exceptions.

---

## 2. Output 2 - the image pack

A folder `jaquar-catalogue-images/` containing every usable product
image, cropped from the PDF:

```
jaquar-catalogue-images/
  index.csv
  faucets/
    aria/
      single-lever-basin-mixer.png
      ...
    kubix-prime/...
    [new-collection-slug]/...
  sanitary-ware/...
  showers/...
  shower-enclosures/...
  whirlpools/...
  [any-new-category-slug]/...
  banners/          <- full-width category/spread artwork
  lifestyle/        <- room scenes and installed shots
```

**Image rules:**
- Product crops: the product on its clean background, no page numbers,
  no captions, no crop marks, no neighbouring products. Largest
  resolution the PDF gives - NEVER upscale. PNG.
- Filenames: kebab-case product slugs; where a product exists in
  multiple finishes with separate shots, suffix the finish code
  (`single-lever-basin-mixer-gold-bright-pvd.png`).
- Category and collection folder names MUST use the slugs from §0's
  table where they exist.
- The site's cards use portrait 3:4, landscape 4:3 and square slots -
  when a crop decision is yours to make, prefer generous margins over
  tight crops so any aspect can be cut later.
- Lifestyle/banner images: keep whole; the site crops printed captions
  off later - note in the csv if a caption is baked into the image.
- `index.csv` header, exactly:
  `name,sku,category,collection,finish,image_file,page,notes`
  One row per image. Every image in the folders appears in the csv;
  every csv row's file exists. Reconcile before finishing.

---

## 3. SEO tactics (they shape WHAT you prioritize extracting)

The site's strategy, so you weigh the right things:

1. **One page = one query.** Category pages own "jaquar faucets UAE"
   etc.; collection pages own long-tail ("jaquar aria", "kubix prime").
   So per-collection completeness (names, SKUs, finishes, sizes) is
   worth more than prose.
2. **Spec tables are the moat.** No UAE competitor publishes real specs.
   Extract EVERY table: dimensions, flow rates, flush volumes (3/6 L),
   glass thicknesses, pump/blower ratings, load tests, cycle tests,
   coating microns, standards (EN/IS/ASTM/WRAS...). Exact numbers, page
   refs.
3. **FAQ-able facts win rich results**: warranty terms per category,
   installation requirements, size ranges, water-saving percentages,
   care instructions. Pull them wherever they hide.
4. **Entity facts feed schema**: brand history, group companies (Artize,
   Essco), factory locations, certifications, awards - a short section
   each.
5. **Prices are the biggest gap in the UAE SERP.** If this PDF is a
   price list or carries any printed prices, extract every one with
   its SKU - that alone changes the site's ranking plan.
6. **SKUs matter**: the site has a "SKU decoder" feature - the more
   real SKUs with their finish codes (CHR, BGP, BLM, GRF...) you
   record, the better it gets.

---

## 4. Design principles (they shape the images and the copy notes)

- The site uses a strict 5-colour palette: Onyx Green #0C1510, Pine
  Green #355E4D, Pastel Green #6F8F78, Marble White #F7F8F5, Dusty
  Olive #D2D4C8. Product photography is the only thing allowed to
  carry other colours - which is why clean-background crops matter:
  they sit on Marble White and Onyx Green cards.
- Typography follows a golden-ratio scale (phi = 1.618: 1rem, 1.618,
  2.618, 4.236, 6.854) and layouts split 1.618fr/1fr - so when you
  note "hero-worthy" images, portrait 3:4 for the narrow golden column
  and wide banners for full-bleed are the useful shapes.
- Copy voice: assured, spare, architectural. B2B wholesale (contractors,
  developers, fit-out companies) - stock, specs, delivery. Your MD is
  raw material, not final copy, but your "Notes for website content"
  section should flag anything that fits or fights this voice.
- Again: hyphens only, never long dashes.

---

## 5. Before you finish - the checklist

- [ ] Every category in the PDF has a numbered MD section, page-ranged.
- [ ] Collection/product counts stated per category, and they reconcile
      with the tables.
- [ ] Every image is in the csv; every csv row's file exists; slugs
      match §0 where applicable; NEW items are marked NEW.
- [ ] Every uncertainty, typo, contradiction and restriction is flagged
      INLINE where it occurs, not just summarized.
- [ ] Prices: either extracted with SKUs, or one clear statement that
      none are printed.
- [ ] Zero em/en dashes in the MD and the csv.
- [ ] "Notes for website content generation" section written last,
      numbered, complete.

Deliver: `jaquar-catalogue.md` + `jaquar-catalogue-images/` (zipped is
fine). These go straight into the site pipeline - the closer you follow
this brief, the less gets lost between you and the build.
