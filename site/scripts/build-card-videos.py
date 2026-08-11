#!/usr/bin/env python3
"""Work-card thumbnails cut from the case studies' own hero clips.

A hero frame is a monitor mockup sitting in a lot of #FAFAFA — the case
study wants that air, a 7:5 card does not. In every one of these clips the
mockup is static (measured second by second: the content's bounding box is
the same to a pixel at every sample), so one fixed crop centred on it holds
for the whole clip. What comes out is the same recording with the empty
margins taken off, at the card's proportions and without the logo the hero
floats over its corner.

Each entry also gets a poster — the clip's first frame, which is what the
card rests on and what the video cross-fades out to when the pointer leaves
— and a VP9 copy beside the H.264 one. The site's other videos are H.264
only, which every shipping browser plays; a Chromium built without the
proprietary codecs does not, and that includes the one these changes are
checked in, so the cards offer both and let the browser choose.

    python3 scripts/build-card-videos.py            (needs ffmpeg)
    python3 scripts/build-card-videos.py welab      (one project)

The crops below are derived, not guessed: `--measure` prints the content's
bounding box across a clip, which is where each `crop` came from. Each is
the widest exact 7:5 window that fits the source height, centred on the
mockup, leaving it about 83% of the card's width and 89% of its height —
so the two cards frame their mockups alike.
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

CARDS = {
    # source clip 2472×1362, mockup at x 423–1995, y 100–1303
    "tinypaws": {"src": "tinypaws-hero-monitor.mp4", "crop": "1904:1360:257:2"},
    # source clip 3500×1928, mockup at x 600–2825, y 144–1845
    "welab": {"src": "welab-hero-mockup.mp4", "crop": "2688:1920:368:8"},
}

# 1120 wide covers a card thumbnail at 2× on any ordinary window (345px at
# 1512, 481 at 2560) without carrying a 2500–3500px master around
SCALE = "1120:800"


def run(args):
    subprocess.run(args, check=True)


def measure(path, samples=8):
    """Content bounding box across a clip — where the crops come from."""
    import numpy as np
    from PIL import Image

    dur = float(
        subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "csv=p=0", str(path)],
            capture_output=True, text=True, check=True,
        ).stdout.strip()
    )
    tmp = ROOT / "node_modules" / ".card-frame.png"
    box = None
    for i in range(samples):
        t = dur * i / samples
        run(["ffmpeg", "-v", "error", "-ss", f"{t:.2f}", "-i", str(path),
             "-frames:v", "1", "-y", str(tmp)])
        a = np.asarray(Image.open(tmp).convert("RGB")).astype(int)
        ys, xs = np.nonzero(np.abs(a - a[0, 0]).sum(axis=2) > 18)
        b = (xs.min(), xs.max(), ys.min(), ys.max())
        box = b if box is None else (
            min(box[0], b[0]), max(box[1], b[1]), min(box[2], b[2]), max(box[3], b[3])
        )
        print(f"  {t:6.2f}s  x {b[0]}–{b[1]}  y {b[2]}–{b[3]}")
    tmp.unlink(missing_ok=True)
    print(f"  union   x {box[0]}–{box[1]}  y {box[2]}–{box[3]}"
          f"  ({box[1] - box[0]}×{box[3] - box[2]})")


def build(name, spec):
    src = ROOT / "public" / "media" / name / spec["src"]
    media = ROOT / "public" / "media" / name
    mp4 = media / f"{name}-card.mp4"
    webm = media / f"{name}-card.webm"
    poster = ROOT / "src" / "assets" / name / f"{name}-card-poster.webp"
    poster.parent.mkdir(parents=True, exist_ok=True)
    vf = f"crop={spec['crop']},scale={SCALE}:flags=lanczos"

    run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-vf", vf, "-an",
         "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
         "-crf", "26", "-preset", "slow", "-movflags", "+faststart", str(mp4)])
    run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-vf", vf, "-an",
         "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0",
         "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", str(webm)])
    run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-vf", vf,
         "-frames:v", "1", "-quality", "88", str(poster)])

    print(
        f"{src.name} {src.stat().st_size / 1e6:.1f}MB  →  "
        f"{mp4.name} {mp4.stat().st_size / 1e6:.2f}MB  +  "
        f"{webm.name} {webm.stat().st_size / 1e6:.2f}MB  +  "
        f"{poster.name} {poster.stat().st_size / 1e3:.0f}KB"
    )


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if a != "--measure"]
    names = args or list(CARDS)
    for n in names:
        if "--measure" in sys.argv:
            print(n)
            measure(ROOT / "public" / "media" / n / CARDS[n]["src"])
        else:
            build(n, CARDS[n])
