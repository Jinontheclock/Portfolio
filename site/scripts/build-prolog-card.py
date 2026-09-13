#!/usr/bin/env python3
"""The Work card's ProLog mockups, lifted back out of the hero master.

The card shows the two phones on its own orange, so the picture is put
together in the page rather than in a video: each phone is its frame as an
image with the screen open, and its screen recording plays underneath,
cropped to the hole. Nothing is keyed or made transparent — the frames'
own alpha is the matte, and the clips stay plain opaque video, which every
browser plays (Safari does not play WebM with alpha).

    python3 scripts/build-prolog-card.py           (needs ffmpeg, pillow, numpy)

Inputs
    public/media/prolog/prolog-hero-phones.mp4     (master, build-prolog-hero.py)
    public/media/prolog/frames/*.png               (see prolog_frames.py)

Outputs
    public/media/prolog/prolog-screen-dashboard.mp4 / .webm    the iPhone's screen
    public/media/prolog/prolog-screen-quiz.mp4 / .webm         the Galaxy's
    src/assets/prolog/prolog-screen-{dashboard,quiz}-poster.webp   first frames
    src/assets/prolog/prolog-frame-{iphone,galaxy}.webp        the frames
    src/assets/prolog/prolog-mask-{iphone,galaxy}.webp         the screens' shapes

and prints, for src/data/projects/prolog.js, where each screen sits in its
frame as fractions of the frame's width and height.

The clips are cut from the master at its own resolution — the screens were
laid into it at about 750×1640, which is the recordings' near-native 2× —
on the card-video encode spec. The frames are exported 1200px tall: at the
card's widest (a monitor) a phone stands 580px tall, so that is 2× with a
little over. The iPhone frame already has its hole; the Galaxy's screen is
painted, so the same soft mask the hero used to lay the clip over it here
cuts it out, and the punch-hole camera, which the mask never covered,
stays in the frame over the clip.

The clip is a rectangle and the screen is not: its corners are rounded (the
iPhone's as squircles), and a rounded body leaves the rectangle's corners
outside the phone altogether. So each screen's shape is traced from the
frame and shipped as an alpha mask the page lays over the clip — grown by
a few pixels first, so the clip runs under the frame's antialiased rim and
no seam of the card shows between them.
"""

import subprocess

import numpy as np
from PIL import Image
from prolog_frames import (
    GALAXY_FRAME,
    GALAXY_PLACE,
    IPHONE_FRAME,
    IPHONE_PLACE,
    ROOT,
    _grow,
    galaxy_screen,
    iphone_hole,
    placed_rect,
)

MEDIA = ROOT / "public" / "media" / "prolog"
ASSETS = ROOT / "src" / "assets" / "prolog"
MASTER = MEDIA / "prolog-hero-phones.mp4"
FRAME_H = 1200


def run(cmd):
    subprocess.run([str(c) for c in cmd], check=True)


def even(rect):
    """yuv420p wants even dimensions; a pixel off the far edge is nothing"""
    x, y, w, h = rect
    return x, y, w - w % 2, h - h % 2


def cut_screen(name, rect):
    """the screen's clip out of the master, in both codecs, and its poster"""
    x, y, w, h = even(rect)
    vf = f"crop={w}:{h}:{x}:{y}"
    mp4 = MEDIA / f"prolog-screen-{name}.mp4"
    webm = MEDIA / f"prolog-screen-{name}.webm"
    poster = ASSETS / f"prolog-screen-{name}-poster.webp"
    run(["ffmpeg", "-v", "error", "-y", "-i", MASTER, "-vf", vf, "-an",
         "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
         "-crf", "26", "-preset", "slow", "-movflags", "+faststart", mp4])
    run(["ffmpeg", "-v", "error", "-y", "-i", MASTER, "-vf", vf, "-an",
         "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", webm])
    run(["ffmpeg", "-v", "error", "-y", "-i", MASTER, "-vf", vf,
         "-frames:v", "1", "-quality", "88", poster])
    return mp4, webm, poster


def save_frame(img, name):
    out = ASSETS / f"prolog-frame-{name}.webp"
    w = round(img.width * FRAME_H / img.height)
    img.resize((w, FRAME_H), Image.LANCZOS).save(out, "WEBP", quality=90, method=6)
    return out


def save_mask(shape, rect, name, scale=3):
    """the screen's shape, as the alpha of an image the size of its box —
    grown 8px so the clip reaches under the frame's rim — at 1/3 size"""
    x, y, w, h = rect
    grown = _grow(shape, 8)[y : y + h, x : x + w]
    alpha = Image.fromarray(grown.astype(np.uint8) * 255, "L")
    out = Image.new("RGBA", alpha.size, (0, 0, 0, 0))
    out.putalpha(alpha)
    path = ASSETS / f"prolog-mask-{name}.webp"
    out.resize((w // scale, h // scale), Image.LANCZOS).save(path, "WEBP", lossless=True)
    return path


def fractions(inner, size):
    x, y, w, h = inner
    fw, fh = size
    return [round(v, 4) for v in (x / fw, y / fh, w / fw, h / fh)]


iphone = Image.open(IPHONE_FRAME).convert("RGBA")
galaxy = Image.open(GALAXY_FRAME).convert("RGBA")

ip_inner, ip_shape = iphone_hole(iphone)
gx_inner, gx_mask, gx_shape = galaxy_screen(galaxy)

# the Galaxy's screen, cut out: its alpha goes to zero where the mask is on
px = np.array(galaxy)
x, y, w, h = gx_inner
hole = px[y : y + h, x : x + w, 3].astype(np.float32) * (1 - np.array(gx_mask) / 255)
px[y : y + h, x : x + w, 3] = hole.round().astype(np.uint8)
galaxy_open = Image.fromarray(px, "RGBA")

outputs = [
    *cut_screen("dashboard", placed_rect(IPHONE_PLACE, iphone.size, ip_inner)),
    *cut_screen("quiz", placed_rect(GALAXY_PLACE, galaxy.size, gx_inner)),
    save_frame(iphone, "iphone"),
    save_frame(galaxy_open, "galaxy"),
    save_mask(ip_shape, ip_inner, "iphone"),
    save_mask(gx_shape, gx_inner, "galaxy"),
]
for p in outputs:
    print(f"{p.relative_to(ROOT)} {p.stat().st_size / 1e3:.0f}KB")

print("\nfor prolog.js — screen: [x, y, w, h] as fractions of the frame")
print("iphone", iphone.size, fractions(ip_inner, iphone.size))
print("galaxy", galaxy.size, fractions(gx_inner, galaxy.size))
