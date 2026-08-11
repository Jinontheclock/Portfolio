#!/usr/bin/env python3
"""Web copies of the MUJI card thumbnails.

Takes the three uploads in public/media/muji/ and writes the WebPs the
Work card imports. 1400px wide covers the widest the thumbnail ever gets
(about 750 on a 4K window) at 2× device pixels, and the sources are flat
line art, so a high quality setting still lands under 200KB.

    python3 scripts/build-muji-thumbs.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "media" / "muji"
OUT = ROOT / "src" / "assets" / "muji"
WIDTH = 1400
QUALITY = 86

OUT.mkdir(parents=True, exist_ok=True)

for i in (1, 2, 3):
    src = SRC / f"muji-thumb-{i}.png"
    im = Image.open(src)
    # the alpha channel is fully opaque in all three; drop it rather than
    # carry a channel of 255s through the encoder
    if im.mode != "RGB":
        im = im.convert("RGB")
    height = round(im.height * WIDTH / im.width)
    im = im.resize((WIDTH, height), Image.LANCZOS)
    dst = OUT / f"muji-thumb-{i}.webp"
    im.save(dst, "WEBP", quality=QUALITY, method=6)
    print(
        f"{src.name} {Image.open(src).size} {src.stat().st_size / 1e6:.1f}MB"
        f"  →  {dst.name} {im.size} {dst.stat().st_size / 1e3:.0f}KB"
    )
