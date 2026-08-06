# GLOBALCLASSIC.md — Build & Publishing Governance
**Read this before writing any page, component, or content. These rules apply to every build and every publish. When a rule here conflicts with convenience, the rule wins. When a rule must be broken, STOP and notify Tarun with the reason and the cost.**

Site: Global Classic Building Material LLC (UAE) — distributor of KalingaStone engineered Marble / Terrazzo / Quartz, Jaquar hardware & sanitaryware, FILA surface care.
Stack assumption: Next.js (App Router) on Vercel. If the repo differs, map these rules to the equivalent.

---

## 0. PRIORITY ORDER (when trade-offs happen)
1. SEO & indexability
2. Core Web Vitals / performance
3. Mobile experience (incl. poor networks)
4. Design fidelity & animation
5. Everything else

An animation that costs LCP loses. A design flourish that requires client-rendering a text block loses.

---

## 1. TARGET SEARCH TERMS & HONEST STRATEGY

Primary terms (Tarun's list) with the realistic play for each. **Do not stuff these; map each to ONE owning page.**

| Term | Reality check | Owning page | Play |
|---|---|---|---|
| kalinga stone | kalingastone.com (manufacturer) will hold #1. Target: #1 *distributor* result, and #1 for "kalinga stone uae / dubai / supplier / price" | `/kalingastone` brand hub | Deepest KalingaStone resource in the UAE: every series, every shade with its own indexed URL, specs, availability. Outrank Mina's thin pages on depth. |
| jaquar | jaquar.com owns #1. Target: "jaquar dealer dubai", "jaquar uae", "jaquar bathroom fittings uae" | `/jaquar` brand hub | Authorized-dealer positioning, range pages, finish guides (Blush Gold PVD, Antique Bronze). |
| fila surface solutions | filasolutions.com owns brand. Target: "fila uae", "fila stone care uae", "marble sealer uae" | `/fila` brand hub | Care-and-maintenance content cluster — pairs naturally with every stone page (internal-link goldmine). |
| engineered stone / artificial stone | Genuinely winnable in UAE + informational SERPs | `/collections/engineered-stone` pillar | Definitive pillar page: what it is, vs natural, types, specs, applications. Question-structured for AI Overviews. |
| terrazzo | Winnable for "terrazzo uae/dubai/supplier/tiles" | `/collections/terrazzo` | Pillar + every shade as child page. Fluting content nobody else has. |
| marble slab supplier | Transactional, winnable | `/marble-slab-supplier-uae` landing (or collections/marble with this H1 focus) | Local intent: showroom, stock, delivery, GBP integration. |
| quartz slabs | Winnable for UAE variants | `/collections/quartz` | Pillar + shade children + slab-size/edge-profile technical content. |

**Rule: every page targets exactly one primary query + a cluster of variants. Two pages must never compete for the same query (check before creating any new page).**

Localization: every commercial page must carry UAE/Dubai/Abu Dhabi/Sharjah signals naturally (copy, schema, NAP). That is where these terms are winnable.

---

## 2. COMPETITOR INTELLIGENCE (audited Aug 2026)

### minamarbles.com — MAIN TARGET
- WordPress + WP Rocket. Distributes **Caesarstone AND KalingaStone** — they have `/kalingastone-marble/` and `/kalingastone-terrazo/` (note: their URL misspells "terrazzo" — they rank on it anyway; we beat this with correct + deeper pages).
- Strengths: age/authority (30-yr legacy content), blogs, projects page, services pages, request-a-sample funnel, GTM tracking, strong social footprint.
- Weaknesses to exploit: **keyword-stuffed title tags** ("Marble Suppliers UAE | Marble Company UAE | Artificial Marble UAE | Top Marble Companies…") — spam-era SEO; thin per-collection pages; no per-shade URLs for KalingaStone; generic stock-feel content; WordPress bloat (revslider, dummy.png placeholders in DOM).
- Our play: per-shade indexed pages (they have none), clean intent-matched titles, superior CWV, richer KalingaStone depth than the distributor that treats it as a side line next to Caesarstone.

### marmoclassic.ae
- WordPress/WooCommerce + WPML (has ARABIC version — we should plan `/ar` with hreflang, they're the only one doing this).
- Has **individual product pages per KalingaStone shade** (Supreme Brown, Silver Rock, Savvanna…) — the long-tail play we must also do, but better.
- **Fatal flaw found: homepage meta-robots is `noindex, nofollow`.** Their homepage is invisible to Google right now. Do not copy anything from their setup blindly; do capture their per-shade URL idea.
- Hero = four autoplaying YouTube embeds → terrible LCP/INP. We beat them on CWV without trying.

### alqamaceramics.com / casamilanoitaly.com / glaze.ae
- Not deep-audited this pass. Claude Code: before launch, run a metadata + sitemap + schema crawl of each and append findings to this file (titles, URL patterns, schema types, blog cadence, hreflang).

### Audit appendix — 2026-08-06 (quartz-focused crawl)
- **minamarbles.com: entire KalingaStone section is DEAD.** `/quartz-collection/`, `/kalingastone-marble/` and every `/product/collection/kalingastone-quartz/*` URL returns 404, and all KalingaStone URLs were removed from their sitemap (page-sitemap lastmod 2026-08-01). Google still lists the stale keyword-stuffed titles. Either they dropped the brand or botched a restructure — the "KalingaStone UAE" SERP is currently directories + dead links. **Ranking vacuum; ship our pages before it re-fills.** Their remaining strength: Rank Math LocalBusiness/Organization JSON-LD with full Sharjah NAP; still no Product/FAQPage schema, no spec tables, near-duplicate shade pages.
- **alqamaceramics.com** (Al Qama General Trading, Al Quoz): tiles/sanitaryware/RAK dealer, **no quartz offering at all**, and the site appears hacked (injected casino spam). Not a quartz competitor.
- **emiratesceramic.ae** (Al Jaber Group, Abu Dhabi): ceramic tiles/sanitaryware; products split onto verdeuae.com, no JSON-LD, no quartz. Not a quartz competitor.
- Actual quartz-SERP incumbents to watch instead: archistoneuae.com (~3,500-word pillar, 60+ internal links, no schema), glaze.ae (400+ shade pages, thin), granitiuae.com (AED prices shown, ranks #1 "quartz slabs UAE"), tilesman.com, ronakintl.com. **Universal gaps we exploit: none has Product schema, FAQPage, spec tables, or B2B/wholesale copy; "quartz countertops Sharjah" SERP is spam blogs — easiest geo win.**

### Standing competitor rule
Quarterly: re-crawl all five; diff their sitemaps; note new content clusters; report to Tarun.

---

## 3. RENDERING RULES (SSR-first, animation islands only)

- **Default is Server Components.** Every page is server-rendered (SSG/ISR preferred; ISR for collection pages so shade updates don't need redeploys).
- `"use client"` is permitted ONLY for: animation wrappers (GSAP/ScrollTrigger, hover states), forms, filters/search, the scroll-film sequence, map embeds, WhatsApp float.
- **All text content, headings, product data, specs, and images must exist in server-rendered HTML.** If a component animates a heading, the heading itself is server-rendered; the client component wraps/animates it. Pattern: server component renders content → client "animator" island attaches behavior. Never fetch content client-side that could be in the HTML.
- View-source test: every piece of indexable content must be visible in the raw HTML response. If it isn't, the build is wrong.
- Animations: transform/opacity only (compositor-friendly). No animating layout properties (width/height/top/left). No layout shift from animation — reserve final space. `prefers-reduced-motion` honored on every animation, no exceptions.

---

## 4. CORE WEB VITALS — BUDGETS (hard gates, check EVERY build)

Targets: **LCP < 2.0s (mobile, throttled), CLS < 0.05, INP < 200ms. Lighthouse Performance/SEO/Accessibility/Best-Practices: 100/100/100/100 on mobile emulation.** Anything below 95 performance blocks merge.

Media rules:
- Images: AVIF+WebP via `next/image` (or equivalent) with `srcset`; explicit width/height always (CLS); hero image `priority` + `fetchpriority=high`; everything below fold lazy. Dark luxury imagery compresses well — target ≤200KB hero, ≤100KB card images.
- Video: only the scroll-film per its own spec; `preload="metadata"`, posters, no autoplay outside the pinned sequence. NEVER YouTube embeds for decoration (see Marmo Classic failure).
- Fonts: self-hosted, `font-display: swap`, subset, preload the two critical weights only. Display serif + one sans; no third family.
- JS: initial route JS ≤ 150KB gzipped. GSAP imported only in animation islands, tree-shaken. No jQuery-era sliders, no heavy UI kits.
- Third-party: GTM loaded after interaction/idle (Partytown or delayed init); zero third-party scripts in critical path.

### ⚠ MANDATORY NOTIFICATION RULE
If any element/design choice will exceed: 300KB single asset, 1MB page weight (mobile route), 150KB route JS, or measurably degrade LCP/INP — **STOP and notify Tarun before building it**, with: what it costs, why, and a lighter alternative. This includes future requests from Tarun himself. Do not silently implement heavy things; do not silently strip them either. Flag, propose, let him decide.

---

## 5. RESPONSIVE & MOBILE (poor-network first)

- Breakpoints: 360 / 390 / 768 / 1024 / 1440 / 1920 / **2560+ (4K TV: cap content width ~1800–2000px, scale type fluidly — the site must look intentional on a showroom TV, not stretched)**.
- Fluid type via `clamp()`; spacing scales with viewport; test every page at 360px and 2560px minimum before merge.
- Poor-network (most UAE mobile traffic): meaningful first paint on 3G Slow < 3.5s; adaptive loading — respect `Save-Data` header and `navigator.connection.effectiveType` (serve posters instead of film, smaller imagery); page must be readable with JS disabled (content is SSR anyway per §3).
- Touch targets ≥ 44px; no hover-only information (every hover reveal has a touch/visible equivalent); test iOS Safari toolbar collapse on pinned sections.
- **Every build: run mobile Lighthouse + real-device check (Tarun's phone) before calling anything done.**

---

## 6. TECHNICAL SEO (implement once, verify every build)

- Metadata API per page: unique title ≤ 60ch (`Primary Query — Global Classic UAE` pattern; NEVER Mina-style pipe-stuffing), meta description 140–160ch with intent + CTA, canonical on every page, OG + Twitter cards with real imagery (1200×630).
- URLs: lowercase, hyphenated, shallow: `/collections/quartz/calacatta-lazza`. No dates, no params for canonical content.
- `sitemap.xml` auto-generated (incl. every shade page) + `robots.txt` (allow all, point to sitemap). **Verify no accidental noindex anywhere — this exact blunder is currently killing marmoclassic.ae's homepage.**
- Structured data (JSON-LD, only where it matches visible content):
  - Org-wide: `Organization` + `LocalBusiness` (NAP, geo, hours, sameAs → GBP/social) on every page via layout
  - `Product` on every shade page (name, brand=KalingaStone, material, image, offers→availability)
  - `BreadcrumbList` everywhere; `FAQPage` on pillars where visible FAQs exist; `Article` on blog posts
- hreflang plan: build EN now with `/ar` architecture ready (Marmo Classic is the only competitor with Arabic — matching this later is a real edge in UAE SERPs).
- Redirects: any URL change ever → 301 in config, never let a published URL 404.
- Accessibility = SEO here: semantic HTML (one `h1`, ordered heading levels, `nav`/`main`/`footer` landmarks, alt text on every image describing the STONE not "image of room"). Agent-friendly = screen-reader-friendly.
- Google Search Console + GA4 wired at launch; monitor the generative-AI performance report (rolling out since June 2026).

---

## 7. CONTENT WRITING RULES (SEO + AI Overviews)

Voice: assured, spare, architectural (per design brief). Banned phrases: "premium quality", "wide range", "best in class", keyword-stuffed lists. Mina writes like a trading company; we write like a design house that happens to rank.

Structure every informational page/section for extraction:
- **H2/H3 phrased as the actual question, followed by a 40–80 word direct answer in the first paragraph.** ("What is engineered marble?" → immediate, complete answer, then depth.) This is the pattern AI Overviews cite.
- Lead with the answer; never a 300-word wind-up.
- One H1 = the primary query intent. Variants live in H2s naturally.
- Entity clarity: name real entities and relationships explicitly — KalingaStone by Classic Marble Company, Silvassa plant, SIMEC Italy lines, Microban, Jaquar Group, FILA Industria Chimica, Global Classic as UAE distributor, Lapiz Group. Google's Knowledge Graph rewards unambiguous entity webs.
- First-hand experience signals (E-E-A-T): our showroom, our stock, our installs, our project photos — commodity AI-sounding content will not rank and will not get cited. Every blog needs at least one thing only WE can say (a project, a spec sheet, a real photo).
- Freshness: pillar pages reviewed/updated at least every 12 months; show visible "updated" dates honestly.
- Per Google's own May-2026 guidance: **no llms.txt needed, no special AI schema, no content chunking tricks** — AI Overviews run on the same ranking systems. Do not waste sprints on AI-search gimmicks; win the organic top-10 and the citations follow.

---

## 8. INTERLINKING ARCHITECTURE (hub & spoke — mandatory)

```
HOME
 ├── /kalingastone (brand hub) ⇄ /collections/{marble|terrazzo|quartz} (pillars)
 │        pillars ⇄ every child shade page (both directions)
 ├── /jaquar (brand hub) ⇄ application pages (bathrooms, kitchens)
 ├── /fila (brand hub) ⇄ EVERY stone page links to matching care guide, care guides link back
 ├── /applications/* ⇄ relevant collections + projects
 ├── /projects/* → materials used link to their shade pages
 └── /blog/* → every post links to ≥2 product/pillar pages + 1 other post; pillars link to supporting posts
```

Rules: every new page gets ≥3 contextual internal links IN and ≥3 OUT at publish time (descriptive anchors — "Calacatta Lazza quartz", never "click here"); breadcrumbs on everything; related-shades block on every product page; no orphan pages ever (build check: crawl for orphans before deploy).

---

## 9. PER-PAGE PUBLISH CHECKLIST (run before every publish)

- [ ] One primary query assigned; no cannibalization with existing pages
- [ ] Title/description/canonical/OG unique and within limits
- [ ] H1 correct; question-H2s with 40–80w direct answers where informational
- [ ] Server-rendered content passes view-source test
- [ ] JSON-LD valid (Rich Results test) and matches visible content
- [ ] Images: AVIF/WebP, sized, alt-texted, lazy below fold
- [ ] ≥3 internal links in, ≥3 out, breadcrumb present, added to sitemap
- [ ] Mobile Lighthouse 95+ perf / 100 SEO / 100 a11y; tested at 360px & 2560px
- [ ] Reduced-motion verified on any animation
- [ ] No noindex, no accidental robots block

## 10. THINGS CLAUDE CODE MUST PROACTIVELY FLAG TO TARUN
1. Anything breaching the budgets in §4 (before building, not after)
2. Any request that would client-render indexable content
3. Any new page competing with an existing page's query
4. Competitor changes found in the quarterly re-crawl
5. Any URL structure change (needs 301 plan)
6. Opportunities noticed: unclaimed queries, schema types, content gaps vs the five competitors
