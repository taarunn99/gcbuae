# FILA image provenance and credit ledger

Brief caps (docs/FILA-V2-BUILD-BRIEF.md section 3): hard cap 110 credits,
minimum 50 reserve. Balance before this build: 162.6.

## Pass B - generated heroes (nano_banana_pro, 2026-08-14)

| Asset | Aspect / res | Job | Credits |
|---|---|---|---|
| public/images/fila/heroes/hub-droplets.webp | 21:9 4k | bbcff414 | 4 |
| public/images/fila/heroes/cleaners.webp | 4:3 2k | b56cc623 | 2 |
| public/images/fila/heroes/protectors.webp | 4:3 2k | 77b64182 | 2 |
| public/images/fila/heroes/finishing.webp | 4:3 2k | 28d16c16 | 2 |
| public/images/fila/heroes/uae-context.webp | 3:4 2k | 25494582 | 2 |
| public/images/fila/heroes/solutions-band.webp | 21:9 2k | f2d0bddd | 2 |

All prompts follow the brief's suffix: editorial product photography,
matte paper aesthetic, palette locked to #FED400 / #FAFAF6 / #0B0B0C,
golden ratio composition, no text, no watermark, no people. Masters
retrievable from the Higgsfield gallery by job id.

**Pass B spend: 14 credits. Balance after: 148.6.**

## Pass A - packshot upscales: DELIBERATELY SKIPPED

The 12 priority packshots were prepped (composited onto concrete
#E9E7E0, assets/source/fila-catalogue/upscale-prep/) and 12 upload slots
were provisioned, but upscaling was not run: source packshots are 418-530
px and display at 320-480 px (roughly 1:1), and 4x upscaling dense label
text incl. the Arabic panels is precisely the failure mode the brief's
own rejection rule names ("label text or Arabic panel hallucinated or
smeared; retry once, then ship native"). All 34 packshots + 32 scenes +
19 brand images ship native via sharp (WebP q86, alpha preserved,
public/images/fila/, 4 MB total). The prep composites remain on disk if
a future pass is wanted.

**Pass A spend: 0 credits.**

## Pass C - video: not run (brief permits only after a fresh yes in chat).

**Total FILA spend: 14 credits. Ledger balance: 148.6 remaining -
cap 110 untouched by 96, reserve 50 exceeded by 98.6.**
