# PILLAR-PLAYBOOK.md — how a product-line pillar gets built here

Written after shipping `/kalingastone/quartz` (69 shades, 5 colour pages,
87 static URLs). **Read this in full before building the next product-line
pillar** (marble, terrazzo, Jaquar, FILA…). Tarun supplies the same two
inputs each time; this file is the process, the rules, and every mistake
already paid for once. GOVERNANCE.md and AGENTS.md still bind — this file
adds the line-page specifics on top.

---

## 1. The inputs (two files per product line)

1. **Catalogue extraction MD** (e.g. `~/Downloads/kalingastone-quartz.md`)
   — verbatim extraction of the printed catalogue: brand facts, pillars,
   applications, specs tables, finishes/edges, per-item table with flags.
   **This is the single source of truth. Never invent, extend or "correct"
   an item name** — Wizzard, Bianco Gioa, Bermingham, Nisley, Ush, Repen,
   Grey Fjordo, Chandan are brand spellings, and every catalogue will have
   its own. Typos in the source get flagged inline, not silently fixed.
2. **Image folder/zip** — per-item swatches (+ lifestyle shots where they
   exist). Convert to WebP into `public/<brand>/<line>/swatches/` and
   `/lifestyle/` with kebab-case slugs matching the data file.

## 2. The three passes (this is the owner's intended workflow)

1. **Content & SEO pass** — data file, copy, JSON-LD, URL architecture,
   all pages building and indexed. Competitive research first (see §4).
2. **Creative pass** — replace every table/chart/list with designed
   interactive sections; generated imagery; component libraries. The
   owner's words: tables and bar charts read as "AI slop"; the catalogue
   itself (real swatches) is the best data-viz material.
3. **Refinement pass** — owner reviews with screenshots; expect precise
   surgical notes (spacing, one colour, one section). Fix EXACTLY what is
   pointed at — nothing wider (see mistakes ledger §8).

## 3. URL architecture & data layer (copy the quartz pattern)

```
/kalingastone/quartz                      pillar (owns line + generic query)
/kalingastone/quartz/colours/[family]     5 category pages (one query each)
/kalingastone/quartz/[shade]              69 item pages (SSG, dynamicParams=false)
```

- Data: one `src/config/<line>.ts` — typed item array + families with
  slug/label/query/intro + `bySlug` maps + catalogue-order index for
  prev/next. EVERYTHING derives from it: pages, sitemap, JSON-LD, counts.
- Copy engine: `src/lib/<line>-copy.ts` — deterministic paragraphs from
  facts only (family character, tier position, format, flags). No two
  pages read identical; nothing visual invented beyond family language.
- JSON-LD: pillar = BreadcrumbList + ItemList + FAQPage; category =
  BreadcrumbList + CollectionPage/ItemList; item = 4-level BreadcrumbList
  + Product (brand, material, image, offers→InStock, AED, seller).
- Titles ≤60ch, no pipe-stuffing, mind the layout template
  (`%s — Global Classic UAE`): don't put "UAE" in the templated part
  (double-UAE bug); category pages use `title.absolute`.
- Sitemap generated from the data arrays — a catalogue update can never
  orphan a URL.
- Explorer/drawers: ALL items server-rendered; filters/expanders only
  toggle CSS `hidden` — view-source test is non-negotiable. Every card
  links to its item page (crawlable in-content links).

## 4. Competitor context (audited 2026-08-06, full notes in GOVERNANCE §2)

- minamarbles.com's KalingaStone section 404'd → ranking vacuum; ship fast.
- Nobody in the UAE niche has Product schema, FAQPage, spec tables, or
  B2B/wholesale copy. Those four things ARE the moat — repeat per line.
- Answer-first 40–80-word paragraphs under question-phrased H2s; UAE-wide
  delivery stated plainly ("across the whole of the UAE", all emirates —
  owner correction); wholesale buyer language (contractors, developers,
  fabricators, decor companies); "quartz countertops Sharjah"-style geo
  SERPs are spam-weak — a geo section wins them.

## 5. Component inventory (built for quartz — reuse/adapt, don't rebuild)

All in `src/components/sections/quartz/` — generalize or copy per line:

| Component | What it is | Notes |
|---|---|---|
| `series-ladder` | counts as fanned REAL swatches + NumberFlow | numbers column clean & centred; tier notes sit beside the counts, never under the numbers; cap width (`max-w-3xl`) or the right side reads as dead space |
| `spectrum-strip` | all items as one colour-sorted band, segments link to category pages | server component, pure CSS hover |
| `slab-scale` | formats at true relative scale, real textures, 1.70 m figure, GSAP dimension lines | replaces empty boxes |
| `lifestyle-carousel` | Embla + WheelGestures: drag, swipe, trackpad, arrows, accent progress line | never a naked overflow-x strip with a visible scrollbar |
| `test-bench` | PINNED scroll sequence: wrapper `lg:h-[300vh]`, sticky full-height frame, scroll progress selects card, instrument holds | see §8 for the two ways this broke |
| `certificates` | spec table regrouped into themed stamped cards, classic table kept behind `<details>` | never key cells by text (§8) |
| `finish-explorer` | tabs + macro texture crossfade | |
| `edge-profiles` | drawn SVG cross-sections instead of a comma list | |
| `faq-accordion` | one open, grid-rows collapse, answers stay in DOM | |
| `microban-timeline` | scroll-filled line, dots light up, steps reveal | pattern works for any staged story |
| `rule-in` | underline that draws in under section H2s | |
| shade explorer | sticky family headers + jump chips (with real swatch dots) + per-family "show all" expanders | kills the endless drawer |

**Editorial "Materials Issue" system (products page, 2026-08-11):** a
golden-ratio type scale lives in globals.css (`.text-phi-0`…`.text-phi-4`,
`.dropcap`, `.text-outline-gcb`; grids split `1.618fr/1fr`). Components in
`src/components/sections/products/`: issue-opener (masthead spread),
materials-ticker (outlined-type marquee), feature-stack (sticky stacking
cards), issue-stats (NumberFlow band), index-rows (whole-row links + the
cursor-trailing image preview via `gsap.quickTo`). Reuse the system for
future magazine-style pages.

Packages already installed: `embla-carousel-react`, `embla-carousel-wheel-gestures`,
`@number-flow/react`, `lucide-react` (strokeWidth 1.3). Aceternity/ReactBits
patterns get rebuilt natively on Motion + GSAP — no new animation runtimes.

## 5b. Signature elements — every hub gets ONE exclusive interaction

Owner rule (2026-08-08): each product-line pillar carries one bespoke
interactive element no other hub has. Registry so none is duplicated:

| Hub | Element | Component |
|---|---|---|
| Quartz | Compare any two shades — drag divider over one slab | `quartz/shade-compare.tsx` |
| Terrazzo | Raking-light slider sweeping the fluted panel | `terrazzo/fluting-light-play.tsx` |
| Marble | The specifier's loupe — magnifier over the vein panel | `marble/marble-loupe.tsx` |
| Jaquar | (unassigned — invent on build) | |
| FILA | (unassigned — invent on build) | |

Pick the element from the material's own selling gesture (quartz =
shortlisting, terrazzo = light play, marble = vein inspection). Keep it
input-driven (no autoplay), palette-safe, keyboard-operable where it can
be, and content-free (the SEO copy never lives inside it).

## 6. Design rules the owner has personally set (do not re-learn these)

- **Colour nicknames (his words):** Onyx Green `#0C1510` · Pine Green
  `#355E4D` · Pastel Green `#6F8F78` (`--bronze` token) · Marble White
  `#F7F8F5` · Dusty Olive `#D2D4C8` (⚠ renamed — no longer #6F8F78).
- **Pine Green is NEVER a text colour.** Text on light = Onyx Green.
- Every pill chip/button hovers to Onyx Green bg + Marble White text
  (`.chip-gcb` in globals.css). No exceptions by size or importance.
- Swatch/card FRAMES: full-strength Onyx Green hairline (`border-warm-black`,
  1px). **An almost-black colour at partial opacity reads as GREY — never
  ship Onyx borders below full alpha.** Global `--border` stays Pine.
- Dark-stage icons: Marble White, not Pastel Green.
- Section sub-headings are display-size (`font-display text-2xl`), not
  label-size — labels-as-subtitles read undersized.
- Lists like "applications": numbered grid with hairlines (`01 …`), never
  a dotted flow line. Footer products: numbered ordered list across two
  aligned columns under ONE heading.
- Decorative imagery: Pastel Green is the least-used colour — generated
  decor images lead with it (sage vase/olive, sample stacks in sage linen,
  sage machinery). Fill empty zones: beside hero H1, beside ladders,
  banner above text-only sections, sticky beside FAQ. Portraits hide
  below `lg`.

## 7. Generated imagery pipeline (Higgsfield)

- Model `nano_banana_pro`, 4K, palette-locked prompts ("no beige or
  yellow cast", one named accent colour, "no text, no watermark").
- **Keep the 4K masters.** The bg-session scratchpad is temp — copy
  masters into `assets/source/<line>/` (gitignored) before the session
  ends, or re-download from the Higgsfield gallery (`show_generations`).
- Derivatives: sharp, sized at **2× the CSS display slot** (retina), one
  light compression (`quality 84–90, effort 6, smartSubsample`), served
  via `next/image quality={90}` (config `images.qualities: [75, 90]`).
  **Never double-crunch (small q78 file re-encoded at q75) and never let
  the display slot exceed the source width — both read as pixelation.**
- Budgets: ≤300KB per asset ON THE WIRE too — check the `/_next/image`
  response size, not just the file on disk (a q90 re-encode of a heavy
  texture can exceed the disk size). Heavy textures: serve default q75
  from a clean high-res source instead.
- `priority` is dead in Next 16 → `preload`. OG images can't be WebP.

## 8. Mistakes ledger — every correction this page cost

1. **React keys from cell text** — comparison table repeated strings
   ("Every block differs" ×2) → duplicate-key console errors. Key by
   index/id, never by display text.
2. **A Cyrillic typo ("двух-storey")** survived into shipped copy.
   Proof-read generated copy for foreign-script artifacts.
3. **38vh gaps between sticky-scroll cards** → screens of empty ground
   mid-scroll. Space cards normally; drive sequences with a pinned frame.
4. **`overflow-hidden` on an ancestor silently kills `position: sticky`**
   — the pinned test bench died invisibly. Grain sections don't need the
   clip (`::after` is `inset:0`). Check the WHOLE ancestor chain.
5. **Pixelation** = double WebP compression + retina upscaling (§7).
6. **Onyx at 40% alpha = grey.** Owner: "WHY DOES IT STILL SHOW AS GREY".
7. **Scope discipline:** when a screenshot says "these lines", it means
   THOSE lines. I changed the global `--border` token and had to revert
   (`b5aa217`→`7d2ab98`). Match the fix to the pixels pointed at; ship
   risky styling trials as one isolated commit for clean undo.
8. **Screenshots in `/var/folders/**/TemporaryItems/` vanish in seconds.**
   Read them FIRST, before any other tool call, or ask for a ⌘⇧4 Desktop
   path. Four were lost this way.
9. **Title template double-geo** ("…UAE — Global Classic UAE") — mind the
   layout template when writing page titles.
10. **eslint `set-state-in-effect`**: Embla canScroll state must use
    `useSyncExternalStore`, not setState inside `useEffect`.
11. **NumberFlow's `format` prop is its own `Format` type**, not
    `Intl.NumberFormatOptions`.
12. **SVG stroke-draw**: set `pathLength={1}` on every path so the CSS
    dash animation normalises.
13. **Pinned pattern the owner wants** (after two rounds): section HOLDS,
    left instrument fixed, cards slide through on the right; scroll must
    visibly drive the number roll + diagram redraw. Mobile/reduced-motion
    get a plain stack.
14. **Pine-as-text stragglers** hide in odd places (a rotated "2000 mm"
    label). Grep `text-verde` after any new section.
15. **Verify the actual output** — a `grep -c` that returns 0 exits
    non-zero and silently skips chained verification; don't push blind
    (it happened once; the build was fine by luck).

## 8b. Marble catalogue landmines (2026-08-08 build)

- ENGINEERED marble — CMC makes natural marble separately; never conflate.
- Microban is an OPTION on 8 shades ("also available without"), never an
  intrinsic attribute — filter and badges say "Microban® option".
- NO NSF / food-safe / kitchen-worktop claims on marble (mark absent,
  kitchen absent from the applications list) — kitchens belong to quartz.
- Series-5 = 5A (Amelia) + 5B (Bianco Thassos), never collapsed.
- Wins: > 85% gloss (highest of three) + REPOLISHABLE (unique) — marble
  is "the most refined surface, not the toughest".
- Spellings: Artic White, Mellissa, Dallia, Camelia, Grigio Billiame,
  Emperador (not Emperor).
- Lifestyle photos carry printed captions — crop the bottom ~8% before
  publishing (done in the conversion step).

16. **No long dashes, ever** (owner, 2026-08-11): em/en dashes read as
    AI writing to the owner. Plain hyphen "-" everywhere - copy, titles,
    metadata, alt text, JSON-LD. A sweep replaced 578 of them; grep
    `[chars U+2014 U+2013]` in src before every push.

## 9. Pre-push checklist (per line page, on top of GOVERNANCE §9)

```bash
npm run typecheck && npm run lint && npm run build
```
- All routes 200 on the production build (`npm start` + curl), including
  new item/category pages; content, JSON-LD, prev/next present in RAW
  HTML; no `noindex`; sitemap count = pages built.
- Shared chrome touched? Verify EVERY route + mobile viewport
  (AGENTS.md non-negotiable).
- `grep -rn "text-verde" src` → only line-work/icons, never text.
- Wire-size spot-check the heaviest `/_next/image` URLs.
- One commit per risky visual change; push fast — the SERP vacuum is
  open (§4) and every day matters.
