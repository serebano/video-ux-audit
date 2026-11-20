#!/usr/bin/env bash
# Encode the recorded frames (captions are already burned in by the page overlay) into an mp4.
# Usage: scripts/encode.sh <audit-out-dir> [output.mp4]
set -euo pipefail
dir="${1:?usage: encode.sh <audit-out-dir> [out.mp4]}"
out="${2:-$dir/audit.mp4}"
cd "$dir"
ffmpeg -hide_banner -loglevel error -y -f concat -safe 0 -i frames.ffconcat \
  -fps_mode vfr -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -movflags +faststart "$out"
echo "wrote $out"
