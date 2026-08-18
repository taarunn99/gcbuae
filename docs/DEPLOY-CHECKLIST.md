# Production deploy checklist - gcbuae.com

Run 2026-08-18 against the production build (334 sitemap routes + 404 +
llms.txt = 344 generated pages). Re-run the automated section after any
significant change; the crawl scripts live in this repo's history and in
docs/metadata-inventory-2026-08.csv.

## A. Verified in this pass (automated)

- [x] `npm run typecheck && npm run lint && npm run build` - clean.
- [x] All 334 sitemap routes return 200; zero non-200 pages.
- [x] Every internal link on every page resolves (336 unique links, 0
      dead after fixing the white-quartz family CTA + 4 in-post links).
- [x] Every referenced asset resolves (1,903 unique images/videos/PDFs,
      0 dead after disabling the two missing FILA scene images).
- [x] All JSON-LD blocks on all pages parse as valid JSON
      (Organization+LocalBusiness with parentOrganization, Article,
      FAQPage, Product, BreadcrumbList, CollectionPage, ItemList).
- [x] Metadata: every title <= 60ch keyword-filled, every description
      120-160ch (blog metas package-locked); zero duplicate titles;
      canonical on every route; zero noindex; zero long dashes.
      Inventory: docs/metadata-inventory-2026-08.csv.
- [x] robots.txt: allow-all + sitemap pointer. AI crawlers (GPTBot,
      ClaudeBot, PerplexityBot, Google-Extended) are allowed - required
      for AI Overviews / answer-engine presence.
- [x] llms.txt: NEW - generated at /llms.txt from the same registries as
      the sitemap (company summary, all hubs, all 44 Journal posts).
- [x] sitemap.xml (334 URLs), RSS at /blog/feed.xml - both 200.
- [x] Favicons: favicon.ico, icon.svg, apple-icon.png; Open Graph image
      (96KB JPG) - all 200.
- [x] Branded 404 page (real 404 status + recovery links) - NEW.
- [x] x-powered-by header disabled (poweredByHeader: false) - NEW.
- [x] Contact form: sample enquiry submitted through the real /contact
      form against the prod build; success state rendered, delivery API
      accepted, zero server errors. See section C.
- [x] Template cruft removed from /public (next.svg, vercel.svg, etc.).
- [x] Blog pricing corrected to the real supply-only basis (AED 250-500
      per sqm, slabs 4-5 sqm, no invented installed figures).
- [x] Clips: 4 ambient videos poster-first, preload=none, in-view play
      only, reduced-motion safe - no LCP or data-budget impact.

## B. Host/DNS level - do these AT deploy (only the owner can)

1. **Apex redirect**: gcbuae.com must 301 to https://www.gcbuae.com -
   every canonical says www. Configure at the host/registrar.
2. **HTTPS + HSTS** on, certificate valid for apex and www.
3. **Env vars in production**: set `RESEND_API_KEY` (and later
   `CONTACT_FROM` once the domain is verified in Resend) - see C.
4. **No platform noindex**: confirm the production deployment is not a
   "preview" environment adding `X-Robots-Tag: noindex` (Vercel does
   this on preview URLs; production domains are fine).
5. **Google Search Console**: Domain property for gcbuae.com (DNS TXT),
   submit /sitemap.xml, Request Indexing for home + 6 hubs + the 5
   vacuum-strike posts. (GOVERNANCE §6 - not yet done.)
6. **GA4**: create property, hand the G- measurement ID over for wiring
   (deferred-load per the perf budget; not yet in the codebase).
7. **Bing Webmaster Tools**: import from GSC (2 clicks, free traffic).

## C. Contact form - delivery state and the one click needed

- Wiring: server action -> Resend API when `RESEND_API_KEY` is set,
  else FormSubmit (keyless) -> info@gcbuae.com. Errors are never
  silent: the visitor is shown the direct email address on failure.
- A sample enquiry ("SAMPLE ENQUIRY - proving the contact form...") was
  submitted 2026-08-18 and accepted for delivery to info@gcbuae.com.
- **ACTION (owner): open info@gcbuae.com.** Either the sample is there
  (done - form fully live), or there is an activation email from
  formsubmit.co - click "Activate" ONCE and delivery becomes automatic
  from then on. This is FormSubmit's one-time anti-spam gate.
- **Recommended for production**: create a free Resend account, verify
  gcbuae.com (SPF/DKIM records - the domain already publishes SPF, per
  its DMARC reports), set `RESEND_API_KEY` + `CONTACT_FROM=GCB Website
  <website@gcbuae.com>`. Resend gives deliverability + logs; FormSubmit
  remains the automatic fallback if the key is ever absent.

## D. AI Overview / answer-engine readiness (owner ask, 2026-08-18)

- robots.txt allows all AI crawlers (no Disallow rules at all).
- /llms.txt gives LLMs the curated site map with descriptions.
- Every Journal post: verbatim direct answer in the first paragraph +
  FAQPage schema - the format AI Overviews and chatbots quote.
- Organization/LocalBusiness schema carries NAP + parentOrganization
  (Lapiz Group) for entity grounding.
- After launch: the same GSC property reports AI Overview impressions
  within the Performance report as Google rolls that reporting out.

## E. Known non-blockers

- Blog descriptions are 90-120ch (package-locked verbatim; harmless).
- Videos in /public/clips are 300-690KB - above the 300KB image cap but
  ambient-loaded (poster-first, in-view only), matching the FilmLoop
  precedent.
- The two FILA products without scene imagery (NORUST, MARBLE REFRESH)
  have hasScene: false; generate the two images in a future Higgsfield
  pass and flip the flags back.
