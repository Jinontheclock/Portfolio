#!/usr/bin/env python3
"""Composites the two recorded Compass screens into their device mockups
and cuts the Work-card video — the Compass sibling of build-prolog-hero.py.

    python3 scripts/build-compass-hero.py           (needs ffmpeg, pillow, numpy)

Inputs
    public/media/compass-card/raw/compass-screen-wallet.mp4   (iPhone screen, 402x874)
    public/media/compass-card/raw/compass-screen-watch.mp4    (watch screen, 444x648)
    public/media/compass-card/raw/trims.json
    public/media/compass-card/frames/iphone-17-pro-blue.png
    public/media/compass-card/frames/apple-watch.png

Outputs
    public/media/compass-card/compass-hero-devices.mp4        (master 3500x1928)
    public/media/compass-card/compass-card.mp4 / .webm        (1120x800 card cut)
    src/assets/compass/compass-card-poster.webp
    public/media/compass-card/raw/hero-layout-preview.png

The iPhone frame has a transparent screen hole, so its video slides
underneath. The watch frame is one of the case-study stills — its screen is
painted, so the video goes on top; screen and video are both black-backed,
which makes a plain rectangle overlay seamless (no corner mask needed).
The recorder's virtual-time capture delivers CSS-resolution frames at an
exact 30fps, so APP_RECT is simply the whole frame.
"""

import json
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "public" / "media" / "compass-card" / "raw"
FRAMES = ROOT / "public" / "media" / "compass-card" / "frames"
OUT = ROOT / "public" / "media" / "compass-card"

CANVAS = (3500, 1928)
BG = "0xFAFAFA"
FPS = 30
DURATION = 10

GAP = 300
_IP_W, _TOP, _H = 832, 114, 1700
_WATCH_H = 1300  # the watch sits smaller than the phone, centred on its height

IPHONE = {
    "frame": FRAMES / "iphone-17-pro-blue.png",
    "clip": RAW / "compass-screen-wallet.mp4",
    "trim_key": "compass-screen-wallet",
    "app_rect": "402:874:0:0",
}
WATCH = {
    "frame": FRAMES / "apple-watch.png",
    "clip": RAW / "compass-screen-watch.mp4",
    "trim_key": "compass-screen-watch",
    "app_rect": "444:648:0:0",
    # the display area inside the still — measured as the union of pixels
    # that differ between the five case-study watch shots
    "screen": (331, 537, 886, 1296),
}

CARD_CROP = "2699:1928:400:0"
CARD_SCALE = "1120:800"


def run(cmd):
    subprocess.run([str(c) for c in cmd], check=True)


def iphone_hole(frame_img):
    """Transparent screen hole; the vertical walk avoids the Dynamic Island."""
    a = np.array(frame_img)[:, :, 3]
    h, w = a.shape
    cy, cx = h // 2, w // 2
    assert a[cy, cx] < 10, "expected a transparent screen hole at the centre"
    x0 = x1 = cx
    while x0 > 0 and a[cy, x0 - 1] < 10:
        x0 -= 1
    while x1 < w - 1 and a[cy, x1 + 1] < 10:
        x1 += 1
    wx = x0 + (x1 - x0) * 15 // 100
    y0 = y1 = cy
    while y0 > 0 and a[y0 - 1, wx] < 10:
        y0 -= 1
    while y1 < h - 1 and a[y1 + 1, wx] < 10:
        y1 += 1
    return x0, y0, x1 - x0 + 1, y1 - y0 + 1


def placed_rect(place, frame_size, inner):
    px, py, pw, ph = place
    sx, sy = pw / frame_size[0], ph / frame_size[1]
    x, y, w, h = inner
    return (round(px + x * sx), round(py + y * sy), round(w * sx), round(h * sy))


trims = json.loads((RAW / "trims.json").read_text())

iphone_img = Image.open(IPHONE["frame"]).convert("RGBA")
watch_img = Image.open(WATCH["frame"]).convert("RGBA")

watch_w = round(watch_img.width * _WATCH_H / watch_img.height)
left = (CANVAS[0] - (_IP_W + GAP + watch_w)) // 2
IPHONE["place"] = (left, _TOP, _IP_W, _H)
WATCH["place"] = (left + _IP_W + GAP, _TOP + (_H - _WATCH_H) // 2, watch_w, _WATCH_H)

ip_hole = placed_rect(IPHONE["place"], iphone_img.size, iphone_hole(iphone_img))
watch_screen = placed_rect(WATCH["place"], watch_img.size, WATCH["screen"])
print("iphone screen at", ip_hole, "· watch screen at", watch_screen)

scaled = RAW / "scaled"
scaled.mkdir(exist_ok=True)
iphone_img.resize(IPHONE["place"][2:], Image.LANCZOS).save(scaled / "iphone.png")
watch_img.resize(WATCH["place"][2:], Image.LANCZOS).save(scaled / "watch.png")

# ── static layout preview ──
preview = Image.new("RGBA", CANVAS, "#FAFAFA")
preview.paste(Image.new("RGBA", ip_hole[2:], "#D5D5D5"), ip_hole[:2])
preview.alpha_composite(Image.open(scaled / "iphone.png"), IPHONE["place"][:2])
preview.alpha_composite(Image.open(scaled / "watch.png"), WATCH["place"][:2])
preview.paste(Image.new("RGBA", watch_screen[2:], "#333333"), watch_screen[:2])
preview.convert("RGB").save(RAW / "hero-layout-preview.png")

# ── master composite ──
t_ip = trims[IPHONE["trim_key"]]["lead"]
t_w = trims[WATCH["trim_key"]]["lead"]
graph = (
    f"color=c={BG}:s={CANVAS[0]}x{CANVAS[1]}:d={DURATION}:r={FPS}[bg];"
    f"[0:v]trim=start={t_ip},setpts=PTS-STARTPTS,"
    f"crop={IPHONE['app_rect']},scale={ip_hole[2]}:{ip_hole[3]}:flags=lanczos[ip];"
    f"[1:v]trim=start={t_w},setpts=PTS-STARTPTS,"
    f"crop={WATCH['app_rect']},scale={watch_screen[2]}:{watch_screen[3]}:flags=lanczos[wa];"
    f"[bg][ip]overlay={ip_hole[0]}:{ip_hole[1]}[a];"
    f"[a][2:v]overlay={IPHONE['place'][0]}:{IPHONE['place'][1]}[b];"
    f"[b][3:v]overlay={WATCH['place'][0]}:{WATCH['place'][1]}[c];"
    f"[c][wa]overlay={watch_screen[0]}:{watch_screen[1]}[out]"
)
master = OUT / "compass-hero-devices.mp4"
run(["ffmpeg", "-v", "error", "-y",
     "-i", IPHONE["clip"], "-i", WATCH["clip"],
     "-loop", "1", "-i", scaled / "iphone.png",
     "-loop", "1", "-i", scaled / "watch.png",
     "-filter_complex", graph, "-map", "[out]",
     "-t", str(DURATION), "-r", str(FPS), "-an",
     "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
     "-crf", "18", "-preset", "slow", "-movflags", "+faststart", master])

# ── card cut: same encode spec as scripts/build-card-videos.py ──
vf = f"crop={CARD_CROP},scale={CARD_SCALE}:flags=lanczos"
card_mp4 = OUT / "compass-card.mp4"
card_webm = OUT / "compass-card.webm"
poster = ROOT / "src" / "assets" / "compass" / "compass-card-poster.webp"
run(["ffmpeg", "-v", "error", "-y", "-i", master, "-vf", vf, "-an",
     "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
     "-crf", "26", "-preset", "slow", "-movflags", "+faststart", card_mp4])
run(["ffmpeg", "-v", "error", "-y", "-i", master, "-vf", vf, "-an",
     "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", card_webm])
run(["ffmpeg", "-v", "error", "-y", "-i", master, "-vf", vf,
     "-frames:v", "1", "-quality", "88", poster])

for p in (master, card_mp4, card_webm, poster):
    print(f"{p.name} {p.stat().st_size / 1e6:.2f}MB")
