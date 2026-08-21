#!/usr/bin/env bash
# Stitches the four material shots into ONE continuous film with slow
# crossfades, for the ambient looping film section.
#
#   bash scripts/build-film-loop.sh    (or: npm run assets:film)
#
# Sources (gitignored) live in assets/source/film/ — see the CloudFront URLs
# in this repo's history or re-download from Higgsfield.
#
# Quality pipeline (owner complaint 2026-08-21: the film looked soft):
#   - assets/source/film/2k/ holds ML-upscaled 2K versions of the SAME four
#     masters (Higgsfield/ByteDance video upscale - enhancement, not
#     regeneration). ffmpeg itself never upscales (repo rule); it only
#     stitches the 2K sources and downscales for the small file.
#   - film-loop-2k.mp4 (~2560px wide, CRF 19) serves large/retina screens.
#   - film-loop-sd.mp4 (1284x716, CRF 18) serves phones and low-DPI screens.
#     Both are H.264: Safari-class engines stalled on VP9 WebM while
#     claiming support (WebKit audit, 2026-08-20), so no WebM is built.
#   The component picks the file by effective device resolution at runtime.
#   The old film-loop.mp4 / film-loop-poster.webp are intentionally left in
#   the repo unreferenced: rollback = revert the pointer commit, and no
#   stale cache can ever serve the old encode under the new names.
#
# Timeline (each source is 5.04s, crossfade 1s, dip to black at the loop seam):
#   quartz   0.00 –  4.54   (crossfade 4.04–5.04)
#   marble   4.54 –  8.58   (crossfade 8.08–9.08)
#   jaquar   8.58 – 12.62   (crossfade 12.12–13.12)
#   terrazzo 12.62 – 17.12  (fade to black 16.72–17.12; fade in 0–0.4)
# The overlay cue points in src/config/film.ts must match these numbers.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="assets/source/film/2k"
OUT="public/film"
mkdir -p "$OUT"

S1="$SRC/quartz-2k.mp4"
S2="$SRC/marble-2k.mp4"
S3="$SRC/jaquar-2k.mp4"
S4="$SRC/terrazzo-2k.mp4"
for f in "$S1" "$S2" "$S3" "$S4"; do
  [[ -f "$f" ]] || { echo "MISSING: $f" >&2; exit 1; }
done

# Normalise every input to one even-dimension 2K frame before the crossfades
# (xfade needs identical geometry; the upscaler's exact output size can vary
# by a few pixels). This only ever scales DOWN from the upscaled masters.
NORM="scale=2560:1428:flags=lanczos,setsar=1,fps=24"

FILTER="[0:v]${NORM}[s0];[1:v]${NORM}[s1];[2:v]${NORM}[s2];[3:v]${NORM}[s3];
[s0][s1]xfade=transition=fade:duration=1:offset=4.04[v01];
[v01][s2]xfade=transition=fade:duration=1:offset=8.08[v02];
[v02][s3]xfade=transition=fade:duration=1:offset=12.12[v03];
[v03]fade=t=in:st=0:d=0.4,fade=t=out:st=16.72:d=0.4[v]"

# 2K tier - large and high-density screens.
ffmpeg -y -hide_banner -loglevel error -i "$S1" -i "$S2" -i "$S3" -i "$S4" \
  -filter_complex "$FILTER" -map "[v]" \
  -an -c:v libx264 -profile:v high -level 5.0 -crf 19 -preset slow -g 48 \
  -pix_fmt yuv420p -movflags +faststart "$OUT/film-loop-2k.mp4"

# SD tier - phones and 1x screens. Downscaled from the same graded stitch.
ffmpeg -y -hide_banner -loglevel error -i "$OUT/film-loop-2k.mp4" \
  -vf "scale=1284:716:flags=lanczos" \
  -an -c:v libx264 -profile:v high -crf 18 -preset slow -g 48 \
  -pix_fmt yuv420p -movflags +faststart "$OUT/film-loop-sd.mp4"

# Poster: first fully faded-in frame of the 2K file, WebP to match the
# filename the config already ships. 1920 wide: it paints before the film
# and under save-data, so it must stay light.
ffmpeg -y -hide_banner -loglevel error -ss 0.5 -i "$OUT/film-loop-2k.mp4" \
  -frames:v 1 -vf "scale=1920:-2:flags=lanczos" -c:v libwebp -quality 80 \
  "$OUT/film-loop-poster-2k.webp"

ls -la "$OUT"/film-loop* | awk '{printf "  %8d  %s\n", $5, $NF}'
