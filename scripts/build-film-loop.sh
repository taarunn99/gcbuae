#!/usr/bin/env bash
# Stitches the four material shots into ONE continuous film with slow
# crossfades, for the ambient looping film section.
#
#   bash scripts/build-film-loop.sh    (or: npm run assets:film)
#
# Sources (gitignored) live in assets/source/film/ — see the CloudFront URLs
# in this repo's history or re-download from Higgsfield.
#
# Timeline (each source is 5.04s, crossfade 1s, dip to black at the loop seam):
#   quartz   0.00 –  4.54   (crossfade 4.04–5.04)
#   marble   4.54 –  8.58   (crossfade 8.08–9.08)
#   jaquar   8.58 – 12.62   (crossfade 12.12–13.12)
#   terrazzo 12.62 – 17.12  (fade to black 16.72–17.12; fade in 0–0.4)
# The overlay cue points in src/config/film.ts must match these numbers.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="assets/source/film"
OUT="public/film"
mkdir -p "$OUT"

S1="$SRC/hf_20260804_070412_13a3aa36-5673-451f-b3fe-5f128ef9d7eb.mp4"
S2="$SRC/hf_20260804_070402_732ac98d-00b9-462e-8d70-a7f4d0f51ebf.mp4"
S3="$SRC/hf_20260804_070402_8b0e9360-f633-449d-85e8-7123cb10182d.mp4"
S4="$SRC/hf_20260804_070402_12d0e1fe-f39a-45e7-8110-c05fc615f4aa.mp4"
for f in "$S1" "$S2" "$S3" "$S4"; do
  [[ -f "$f" ]] || { echo "MISSING: $f" >&2; exit 1; }
done

FILTER="[0:v][1:v]xfade=transition=fade:duration=1:offset=4.04[v01];
[v01][2:v]xfade=transition=fade:duration=1:offset=8.08[v02];
[v02][3:v]xfade=transition=fade:duration=1:offset=12.12[v03];
[v03]fade=t=in:st=0:d=0.4,fade=t=out:st=16.72:d=0.4[v]"

ffmpeg -y -hide_banner -loglevel error -i "$S1" -i "$S2" -i "$S3" -i "$S4" \
  -filter_complex "$FILTER" -map "[v]" \
  -an -c:v libx264 -profile:v high -crf 17 -g 48 -pix_fmt yuv420p \
  -movflags +faststart "$OUT/film-loop.mp4"

ffmpeg -y -hide_banner -loglevel error -i "$S1" -i "$S2" -i "$S3" -i "$S4" \
  -filter_complex "$FILTER" -map "[v]" \
  -an -c:v libvpx-vp9 -crf 26 -b:v 0 -g 48 -row-mt 1 "$OUT/film-loop.webm"

# Poster: first fully faded-in frame, so the static fallback matches the open.
ffmpeg -y -hide_banner -loglevel error -ss 0.5 -i "$OUT/film-loop.mp4" \
  -frames:v 1 -q:v 2 "$OUT/film-loop-poster.jpg"

ls -la "$OUT"/film-loop* | awk '{printf "  %8d  %s\n", $5, $NF}'
