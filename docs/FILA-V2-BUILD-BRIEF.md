# FILA SURFACE CARE HUB V2, BUILD BRIEF FOR CLAUDE CODE
Target: gcbuae.com, new brand hub at /fila. Companion inputs: fila-catalogue.md (single source of truth for all facts) and fila-catalogue-images/ (85 assets plus index.csv).

## 0. Hard laws
1. DASH LAW: never output em dashes or en dashes anywhere: code, copy, meta tags, alt text, commit messages. Hyphens only.
2. FACT LAW: every product claim must exist in fila-catalogue.md with its page number. Never invent coverage figures, certifications or prices. NO PRICES exist in the source; do not fabricate any.
3. FLAG LAW: section 4 of the catalogue lists 15 source defects (MATT/SATIN index misprint, CONCRETE swap, LEANER PRO typo, Lorem ipsum remnant, HUMILTY, duplicated CSR copy, PRIMA DOPO labels, etc). None of these may leak into published copy.
4. VOICE: B2B UAE distributor voice. Confident, technical, specifying-engineer friendly. Lapiz Blue is the distributor; FILA is the manufacturer. Never imply gcbuae manufactures FILA.
5. DO NOT touch existing gcbuae pages outside /fila except to add nav entry and cross links from KalingaStone care sections.

## 1. Design system: "Yellow Editorial" (this is the correction pass, read carefully)
The previous Jaquar wrapper was judged too generic. This hub must look like a designer-led editorial site, Pinterest-save quality. Concrete rules, not vibes:

### 1.1 Palette (locked)
| Token | Hex | Use |
|---|---|---|
| fila-yellow | #FED400 | blocks, underlines, hover fills, category tabs. Never as body text colour |
| ink | #0B0B0C | display type, editorial bands, footer |
| paper | #FAFAF6 | page background |
| concrete | #E9E7E0 | card wells, section separators |
| cleaner-cyan | #2AA9DF | thin index rules and chips for Cleaners only |
| protector-red | #E8442E | chips for Protectors only |
| finishing-orange | #F07E1B | chips for Finishing only |
Ratio discipline: 60% paper, 25% ink, 12% yellow, 3% category chips. If a screen is more than 15% yellow it is wrong.

### 1.2 Typography
Display: Archivo Expanded or Anton, uppercase, tracking -1%, sizes on a 1.618 scale from 18px body (18/29/47/76/123). Oversized single words stacked like the FILA profile covers: WHO / WE / ARE becomes CLEAN / PROTECT / FINISH. Body: Inter 18/1.6. Signature motif: 6px fila-yellow underline bars beneath section titles, exactly like FILA's own print system. Big outlined ghost numerals (01, 02, 03) behind section heads at 8% ink opacity.

### 1.3 Layout motifs (implement all six)
1. HERO: full bleed macro droplet photography (brand/droplets-macro-stone-hero.png upscaled, or generated per Pass B), ink overlay gradient, headline "WE TAKE CARE OF SURFACES." with animated yellow underline draw, sub line "FILA surface care, official UAE distribution by Lapiz Blue".
2. YELLOW CHECKERBOARD: the Values-page motif. Use a 4x2 grid of alternating fila-yellow and paper tiles for the category chooser (Cleaners, Protectors, Finishing, Ready to Use, Solutions, Projects, Academy, Contact).
3. PINTEREST MASONRY: the /fila product grid is a true masonry (CSS columns or JS) mixing three card sizes: tall packshot cards (alpha PNG on concrete well), wide scene cards, and typographic quote cards in ink with white text pulling verbatim lines like "It cleans but does not attack" (Guide 5). Cards hover-lift 4px with yellow border sweep.
4. EDITORIAL BANDS: between grid sections, full width ink bands with huge white display lines and a small yellow stat block: "+240 partnerships", "almost 90 countries", "1943", "+4000 trained per year". All stats from catalogue section 1.
5. BEFORE/AFTER: interactive slider component reusing the scene crops that contain before/after pairs (deterdek-pro, ps87-pro, w68, fuganet, nodrops, stop-dirt, pw10, mp90-eco-xtreme, stoneplus-eco, hydrorep-eco, max, contractors-choice, fugaproof, nospot, wet-eco). Where PRIMA DOPO appears in artwork, overlay English chips BEFORE and AFTER in ink pills.
6. SYSTEM STRIP: a horizontal scroll-snapped strip PREPARE, CLEAN, PROTECT, FINISH, MAINTAIN mapping products to stages (catalogue section 5). This is the conversion engine; each stage links its products.

### 1.4 Motion
GSAP + ScrollTrigger. Droplet hero parallax at 0.85 speed; yellow blocks reveal with clip-path wipes; underline bars draw on enter; masonry cards stagger 60ms; marquee of partner names (catalogue section 1, named partners) in outlined ink type. Respect prefers-reduced-motion. Core Web Vitals budgets: LCP under 2.0s, CLS under 0.05, JS under 160KB gzip. Hero image priority loaded as AVIF/WebP with explicit dimensions.

## 2. Information architecture and pages
1. /fila hub (hero, checkerboard, masonry grid of all 34, system strip, brand story band, projects, FAQ, distributor CTA).
2. /fila/cleaners (11 professional + note on 6 ready to use), /fila/protectors (14 + fugaproof), /fila/finishing (2: CLASSIC, LONGLIFE, indoor only), /fila/ready-to-use (7).
3. /fila/[slug] x34 product pages: packshot left on concrete well, sticky spec rail right. Sections: What it's for, Advantages, Surfaces, Packaging, Coverage and dilution (HTML table, not image), badges row (Biodegradable, Water-based, Eco Advanced, Indoor Air Comfort Gold, Solvent Technology as printed per product), scene image or before/after slider, System strip position, related products, TDS outlink to filasolutions.com per the printed instruction, WhatsApp and enquiry CTA.
4. /fila/solutions: "What to do if" problem router (grout haze after tiling -> DETERDEK PRO; oil stain on marble worktop -> MP90 ECO XTREME or MARBLE REFRESH; rust on marble -> NORUST; limescale in bathroom -> DEEPCLEAN; efflorescence risk before laying -> PW10; silicone smears -> ZEROSIL; wax removal -> MAX or PS87 PRO). Only pairings supportable by catalogue text.
5. /fila/about: brand story from catalogue section 1 (1943 twins, Fabbrica Italiana di Lucidi e Affini, Marchio Storico, divisions, Academy, sustainability, certifications, Middle East office since 2012, Dubai JLT address).
6. /fila/projects: Gipsoteca di Canova, Hotel Mondrian Qatar, Canadian Museum for Human Rights, Library of Birmingham, Apple Store Piazza Liberty with the exact product lists from Profile 20-21 (write CLEANER PRO, never LEANER PRO), plus Armani Hotel Dubai visual reference.

## 3. Higgsfield MCP image pipeline, CREDIT RATIONED
Balance reality: about 166 credits on the account. HARD CAP for this build: 110 credits. RESERVE: minimum 50 credits must remain untouched. Before any generation call the balance tool, log the number, and after every job append to docs/fila-image-provenance.md: job id, model, credits before/after, prompt, output path. If balance ever reads 56 or lower, STOP all generation immediately and fall back to native assets.

Budget split (agreed 50/50):
1. PASS A, UPSCALES, up to 55 credits. Source packshots are 360 dpi (roughly 420x530 to 530x530). Upscale 4x only the 12 priority SKUs, in this order, cheapest suitable upscaler first: deterdek-pro, cleaner-pro, ps87-pro, mp90-eco-xtreme, fob-xtreme, hydrorep-eco, w68, pw10, instant-remover, fugaproof, deepclean, marble-refresh. Check the per-job cost via models_explore before starting; if 12 exceed the sub budget, cut from the tail. Reject any output where the label text, Arabic panel or FILA logotype is hallucinated or smeared; retry once, then ship native. The other 22 packshots ship native (they hold up at card size). Ship every raster as WebP q82-88, alpha preserved, to public/images/fila/products/{slug}.webp. Scenes ship native WebP, no upscale.
2. PASS B, GENERATED HEROES, up to 55 credits. 6 images maximum, 3:4 and 21:9 variants where budget allows:
   a. Hub hero 21:9: extreme macro of water beads and one amber oil bead on honed travertine, hard raking light, paper background tone #FAFAF6, subtle yellow #FED400 gel light from frame right, photoreal, no text, no bottles.
   b. Cleaners hero 4:3: fresh porcelain tile floor mid clean, foam arc, dramatic side light, cyan cast kept below 10%.
   c. Protectors hero 4:3: water beading on dark granite, single sharp reflection line, ink shadow field.
   d. Finishing hero 4:3: warm terracotta floor with satin sheen raking light, Tuscan warmth.
   e. UAE context 3:4: luxury Dubai hotel bathroom in marble, morning light, no identifiable landmark logos.
   f. Solutions band 21:9: split texture strip, stained stone left transitioning to clean sealed stone right, seam perfectly vertical for the slider illusion.
   Prompt suffix for all: "editorial product photography, matte paper aesthetic, palette locked to #FED400 accents on #FAFAF6 and #0B0B0C, golden ratio composition, no text, no watermark, no people". Reject outputs with text artifacts or wrong palette. Log all in provenance.
3. NO VIDEO in this budget. If, after Passes A and B, at least 20 of the 110 remain unspent, one optional 5s hero loop of droplets may be considered ONLY after reporting remaining balance to Tarun and getting a yes in chat.

## 4. SEO directives (top priority, target #1 like Jaquar)
1. Keyword map: hub -> "FILA surface care UAE", "FILA products Dubai distributor"; category -> "tile cleaner UAE", "stone sealer UAE", "marble protection Dubai"; product pages -> "{PRODUCT NAME} UAE", "{PRODUCT NAME} price Dubai" (price intent lands on enquiry CTA since no prices are printed), problem pages -> "remove grout haze porcelain", "remove rust stain marble", "efflorescence prevention natural stone", "limescale remover bathroom UAE".
2. Schema: Organization (FILA + distributor Lapiz Blue relationship), Product with brand FILA on all 34 (offers omitted, availability InStock via distributor), FAQPage on /fila/solutions, BreadcrumbList sitewide. Facts only from catalogue.
3. Entity signals: cite 1943 founding, Marchio Storico registry, ISO 9001 and 14001 TUV Rheinland, Indoor Air Comfort Gold Eurofins September 2022 first in sector in Italy, Climate Pledge net zero 2040, FILA Middle East Dubai JLT since 2012. These verifiable facts differentiate against thin affiliate pages.
4. Internal links: KalingaStone marble and quartz pages link to MP90 ECO XTREME, MARBLE REFRESH and PW10 as care system; FILA pages link back to slab categories. Every product page links its System strip neighbours.
5. Alt text pattern: "{PRODUCT NAME} {title case function} for {first surface}, FILA UAE". Coverage tables as real HTML with th scope, crawlable.
6. hreflang not needed now; en only. Canonicals absolute. OG images: generated heroes with ink band and product name set in the display face.

## 5. Definition of done
1. All 34 product pages render from a single products data file generated out of fila-catalogue.md; zero hardcoded product copy in components.
2. Zero em/en dashes in the repo (grep gate in CI).
3. All 15 catalogue flags verified absent from published copy.
4. Credit ledger in docs/fila-image-provenance.md shows total spend <= 110 and final balance >= 50 remaining, with per job entries.
5. Lighthouse mobile: performance >= 90, SEO 100, a11y >= 95 on hub and one product page.
6. Before/after sliders keyboard accessible; masonry degrades to 2 column grid without JS.
7. Sitemap and robots updated; nav entry FILA added; KalingaStone cross links live.
