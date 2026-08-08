#!/usr/bin/env python3
"""The TinyPaws Work-card thumbnail, from the case study's hero clip.

The hero video is a 2472×1362 frame with the monitor mockup sitting in the
middle of a lot of #FAFAFA — the case study wants that air, a 7:5 card
does not. The monitor is static across all 18.8s (measured: x 423–1995,
y 100–1303 at every second), so a single fixed crop centred on it holds
for the whole clip. What comes out is the same recording with the empty
margins taken off, at the card's own proportions.

Also writes the poster — the clip's first frame, which is what the card
rests on and what the video cross-fades out to when the pointer leaves —
and a VP9 copy beside the H.264 one. The site's other videos are H.264
only, which every shipping browser plays; a Chromium built without the
proprietary codecs does not, and that includes the one these changes are
checked in, so the card offers both and lets the browser choose.

    python3 scripts/build-tinypaws-thumb.py     (needs ffmpeg)
"""

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "media" / "tinypaws" / "tinypaws-hero-monitor.mp4"
VIDEO_OUT = ROOT / "public" / "media" / "tinypaws" / "tinypaws-card.mp4"
WEBM_OUT = ROOT / "public" / "media" / "tinypaws" / "tinypaws-card.webm"
POSTER_OUT = ROOT / "src" / "assets" / "tinypaws" / "tinypaws-card-poster.webp"

# 1904×1360 is exactly 7:5, the widest such window that still fits inside
# the source height, centred on the monitor (content centre x=1209)
CROP = "1904:1360:257:2"
# 1120 wide covers the card's thumbnail at 2× on any ordinary window (345px
# at 1512, 481 at 2560) without carrying a 2472px master around
SCALE = "1120:800"


def run(args):
    subprocess.run(args, check=True)


POSTER_OUT.parent.mkdir(parents=True, exist_ok=True)

run(
    [
        "ffmpeg", "-v", "error", "-y",
        "-i", str(SRC),
        "-vf", f"crop={CROP},scale={SCALE}:flags=lanczos",
        "-an",
        "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
        "-crf", "26", "-preset", "slow",
        "-movflags", "+faststart",
        str(VIDEO_OUT),
    ]
)

run(
    [
        "ffmpeg", "-v", "error", "-y",
        "-i", str(SRC),
        "-vf", f"crop={CROP},scale={SCALE}:flags=lanczos",
        "-an",
        "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0",
        "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
        str(WEBM_OUT),
    ]
)

run(
    [
        "ffmpeg", "-v", "error", "-y",
        "-i", str(SRC),
        "-vf", f"crop={CROP},scale={SCALE}:flags=lanczos",
        "-frames:v", "1",
        "-quality", "88",
        str(POSTER_OUT),
    ]
)

print(
    f"{SRC.name} {SRC.stat().st_size / 1e6:.1f}MB  →  "
    f"{VIDEO_OUT.name} {VIDEO_OUT.stat().st_size / 1e6:.2f}MB  +  "
    f"{WEBM_OUT.name} {WEBM_OUT.stat().st_size / 1e6:.2f}MB  +  "
    f"{POSTER_OUT.name} {POSTER_OUT.stat().st_size / 1e3:.0f}KB"
)
