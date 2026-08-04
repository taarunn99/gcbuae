#!/usr/bin/env bash
# Re-encodes the four scroll-film source clips into web deliverables.
#
#   bash scripts/build-film-assets.sh    (or: npm run assets:film)
#
# Sources live in assets/source/film/ (gitignored — ~15 MB of Kling output).
# If missing, re-download from the CloudFront URLs below, or regenerate in
# Higgsfield and update the mapping.
#
# Encodes at the native 1284px width. The spec said scale=1920, but the Kling
# masters are 1284x716 — upscaling would add bytes and soften the image.
#
# Outputs per shot into public/film/:
#   <shot>-web.mp4    H.264 high, CRF 21, keyint 12, faststart, no audio
#   <shot>-web.webm   VP9, CRF 32, keyint 12, no audio
#   <shot>-poster.jpg last frame — what the overlays sit on after playback
set -euo pipefail
cd "$(dirname "$0")/.."

SRC_DIR="assets/source/film"
OUT_DIR="public/film"
mkdir -p "$OUT_DIR"

# shot name -> source file (Higgsfield job outputs, 2026-08-04)
# CloudFront mirror: https://d8j0ntlcm91z4.cloudfront.net/user_33YfNzoWACQEEH3RSd4O1mTHTm1/<file>
shots=(
  "shot-1-quartz:hf_20260804_070412_13a3aa36-5673-451f-b3fe-5f128ef9d7eb.mp4"
  "shot-2-marble:hf_20260804_070402_732ac98d-00b9-462e-8d70-a7f4d0f51ebf.mp4"
  "shot-3-hardware:hf_20260804_070402_8b0e9360-f633-449d-85e8-7123cb10182d.mp4"
  "shot-4-terrazzo:hf_20260804_070402_12d0e1fe-f39a-45e7-8110-c05fc615f4aa.mp4"
)

for entry in "${shots[@]}"; do
  shot="${entry%%:*}"
  src="$SRC_DIR/${entry#*:}"
  if [[ ! -f "$src" ]]; then
    echo "MISSING: $src — download it into $SRC_DIR first" >&2
    exit 1
  fi

  ffmpeg -y -hide_banner -loglevel error -i "$src" \
    -an -c:v libx264 -profile:v high -crf 17 -g 12 \
    -pix_fmt yuv420p -movflags +faststart \
    "$OUT_DIR/$shot-web.mp4"

  ffmpeg -y -hide_banner -loglevel error -i "$src" \
    -an -c:v libvpx-vp9 -crf 26 -b:v 0 -g 12 -row-mt 1 \
    "$OUT_DIR/$shot-web.webm"

  ffmpeg -y -hide_banner -loglevel error -sseof -0.2 -i "$OUT_DIR/$shot-web.mp4" \
    -frames:v 1 -q:v 2 "$OUT_DIR/$shot-poster.jpg"

  echo "$shot:"
  ls -la "$OUT_DIR/$shot"-* | awk '{printf "  %8d  %s\n", $5, $NF}'
done
