#!/usr/bin/env python3
"""Composites the two recorded ProLog screens into the phone mockups and
cuts the Work-card video from the result.

    python3 scripts/build-prolog-hero.py            (needs ffmpeg, pillow, numpy)

Inputs
    public/media/prolog/raw/prolog-screen-dashboard.webm   (iPhone screen)
    public/media/prolog/raw/prolog-screen-quiz.webm        (Galaxy screen)
    public/media/prolog/raw/trims.json                     (per-clip lead cut)
    public/media/prolog/frames/iphone-17-pro-orange.png
    public/media/prolog/frames/galaxy-s25-navy.png

Outputs
    public/media/prolog/prolog-hero-phones.mp4             (master 3500x1928)
    public/media/prolog/prolog-card.mp4 / .webm            (1120x800 card cut)
    src/assets/prolog/prolog-card-poster.webp
    public/media/prolog/raw/hero-layout-preview.png        (static sanity check)

Playwright records at CSS resolution regardless of deviceScaleFactor, so the
app sits in the top-left of each capture; APP_RECT crops it out. The iPhone
frame has a transparent screen hole, so its video slides underneath and the
bezel's own antialiased edge finishes the corners. The Galaxy frame ships
with an opaque near-black screen, so its video goes on top, clipped by a
mask lifted pixel-for-pixel from that screen fill.
"""

import json
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "public" / "media" / "prolog" / "raw"
FRAMES = ROOT / "public" / "media" / "prolog" / "frames"
OUT = ROOT / "public" / "media" / "prolog"

CANVAS = (3500, 1928)
BG = "0xFAFAFA"
FPS = 30
DURATION = 10

# the pair is centred on the canvas around this gap
GAP = 300
_IP_W, _GX_W, _TOP, _H = 832, 826, 114, 1700
_LEFT = (CANVAS[0] - (_IP_W + GAP + _GX_W)) // 2

# frame file, placement (x, y, w, h) on the canvas, app crop in the capture
IPHONE = {
    "frame": FRAMES / "iphone-17-pro-orange.png",
    "place": (_LEFT, _TOP, _IP_W, _H),
    "clip": RAW / "prolog-screen-dashboard.webm",
    "trim_key": "prolog-screen-dashboard",
    "app_rect": "402:874:0:0",
}
GALAXY = {
    "frame": FRAMES / "galaxy-s25-navy.png",
    "place": (_LEFT + _IP_W + GAP, _TOP, _GX_W, _H),
    "clip": RAW / "prolog-screen-quiz.webm",
    "trim_key": "prolog-screen-quiz",
    "app_rect": "412:872:0:0",
}

CARD_CROP = "2699:1928:400:0"  # 7:5 slice of the master, both phones in frame
CARD_SCALE = "1120:800"


def run(cmd):
    subprocess.run([str(c) for c in cmd], check=True)


def iphone_hole(frame_img):
    """The transparent screen hole, walked out from the centre of the alpha.
    The vertical walk runs up a column left of centre — the Dynamic Island
    is drawn into the frame at top-centre and would stop it short."""
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


def galaxy_screen(frame_img):
    """Bbox and soft mask of the painted screen (uniform ~RGB 27)."""
    px = np.array(frame_img).astype(np.int16)
    d = np.abs(px[:, :, :3] - 27).max(axis=2)
    screenish = (d < 12) & (px[:, :, 3] > 200)
    h, w = screenish.shape
    cy, cx = h // 2, w // 2
    assert screenish[cy, cx], "expected the painted screen at the centre"
    x0 = x1 = cx
    while x0 > 0 and screenish[cy, x0 - 1]:
        x0 -= 1
    while x1 < w - 1 and screenish[cy, x1 + 1]:
        x1 += 1
    # walk a column clear of the punch-hole camera at top centre
    wx = x0 + (x1 - x0) * 15 // 100
    y0 = y1 = cy
    while y0 > 0 and screenish[y0 - 1, wx]:
        y0 -= 1
    while y1 < h - 1 and screenish[y1 + 1, wx]:
        y1 += 1
    # soft edge: fully on inside the fill, fading over the antialiased rim
    alpha = np.clip((30 - d) * (255 / 18), 0, 255).astype(np.uint8)
    alpha[px[:, :, 3] < 200] = 0
    mask = Image.fromarray(alpha, "L").crop((x0, y0, x1 + 1, y1 + 1))
    return (x0, y0, x1 - x0 + 1, y1 - y0 + 1), mask


def placed_rect(place, frame_size, inner):
    """An inner rect of the frame, mapped into canvas coordinates."""
    px, py, pw, ph = place
    fw, fh = frame_size
    sx, sy = pw / fw, ph / fh
    x, y, w, h = inner
    return (round(px + x * sx), round(py + y * sy), round(w * sx), round(h * sy))


trims = json.loads((RAW / "trims.json").read_text())

iphone_img = Image.open(IPHONE["frame"]).convert("RGBA")
galaxy_img = Image.open(GALAXY["frame"]).convert("RGBA")

ip_hole = placed_rect(IPHONE["place"], iphone_img.size, iphone_hole(iphone_img))
gx_inner, gx_mask = galaxy_screen(galaxy_img)
gx_hole = placed_rect(GALAXY["place"], galaxy_img.size, gx_inner)
print("iphone screen at", ip_hole, "· galaxy screen at", gx_hole)

# pre-scale the overlays once so ffmpeg only composites
scaled = RAW / "scaled"
scaled.mkdir(exist_ok=True)
iphone_img.resize(IPHONE["place"][2:], Image.LANCZOS).save(scaled / "iphone.png")
galaxy_img.resize(GALAXY["place"][2:], Image.LANCZOS).save(scaled / "galaxy.png")
gx_mask.resize(gx_hole[2:], Image.LANCZOS).save(scaled / "galaxy-mask.png")

# ── static layout preview: grey screens where the clips will go ──
preview = Image.new("RGBA", CANVAS, "#FAFAFA")
grey = Image.new("RGBA", ip_hole[2:], "#D5D5D5")
preview.paste(grey, ip_hole[:2])
preview.alpha_composite(Image.open(scaled / "iphone.png"), IPHONE["place"][:2])
preview.alpha_composite(Image.open(scaled / "galaxy.png"), GALAXY["place"][:2])
gshot = Image.new("RGBA", gx_hole[2:], "#D5D5D5")
gshot.putalpha(Image.open(scaled / "galaxy-mask.png").convert("L"))
preview.alpha_composite(gshot, gx_hole[:2])
preview.convert("RGB").save(RAW / "hero-layout-preview.png")

# ── master composite ──
def source_chain(label, spec, out):
    """trim the lead — and splice out the marked span, if one was recorded —
    then crop the app region and scale it into its screen hole."""
    t = trims[spec["trim_key"]]
    hole = ip_hole if spec is IPHONE else gx_hole
    tail = f"crop={spec['app_rect']},scale={hole[2]}:{hole[3]}:flags=lanczos"
    if "cut" in t:
        a, b = t["cut"]
        # open on the action: 0.3s of the resting state, then the splice
        # lands straight on the progress animation
        t = {**t, "lead": max(t["lead"], a - 0.3)}
        return (
            f"[{label}]split[{out}s1][{out}s2];"
            f"[{out}s1]trim=start={t['lead']}:end={a},setpts=PTS-STARTPTS[{out}a];"
            f"[{out}s2]trim=start={b},setpts=PTS-STARTPTS[{out}b];"
            f"[{out}a][{out}b]concat=n=2:v=1:a=0,{tail}[{out}];"
        )
    return f"[{label}]trim=start={t['lead']},setpts=PTS-STARTPTS,{tail}[{out}];"


graph = (
    f"color=c={BG}:s={CANVAS[0]}x{CANVAS[1]}:d={DURATION}:r={FPS}[bg];"
    + source_chain("0:v", IPHONE, "dash")
    + source_chain("1:v", GALAXY, "quiz")
    +
    f"[4:v]loop=loop=-1:size=1,scale={gx_hole[2]}:{gx_hole[3]}[qmask];"
    f"[quiz][qmask]alphamerge[quizm];"
    f"[bg][dash]overlay={ip_hole[0]}:{ip_hole[1]}[a];"
    f"[a][2:v]overlay={IPHONE['place'][0]}:{IPHONE['place'][1]}[b];"
    f"[b][3:v]overlay={GALAXY['place'][0]}:{GALAXY['place'][1]}[c];"
    f"[c][quizm]overlay={gx_hole[0]}:{gx_hole[1]}:format=auto[out]"
)
master = OUT / "prolog-hero-phones.mp4"
run(["ffmpeg", "-v", "error", "-y",
     "-i", IPHONE["clip"], "-i", GALAXY["clip"],
     "-loop", "1", "-i", scaled / "iphone.png",
     "-loop", "1", "-i", scaled / "galaxy.png",
     "-loop", "1", "-i", scaled / "galaxy-mask.png",
     "-filter_complex", graph, "-map", "[out]",
     "-t", str(DURATION), "-r", str(FPS), "-an",
     "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
     "-crf", "18", "-preset", "slow", "-movflags", "+faststart", master])

# ── card cut: same encode spec as scripts/build-card-videos.py ──
vf = f"crop={CARD_CROP},scale={CARD_SCALE}:flags=lanczos"
card_mp4 = OUT / "prolog-card.mp4"
card_webm = OUT / "prolog-card.webm"
poster = ROOT / "src" / "assets" / "prolog" / "prolog-card-poster.webp"
run(["ffmpeg", "-v", "error", "-y", "-i", master, "-vf", vf, "-an",
     "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
     "-crf", "26", "-preset", "slow", "-movflags", "+faststart", card_mp4])
run(["ffmpeg", "-v", "error", "-y", "-i", master, "-vf", vf, "-an",
     "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", card_webm])
run(["ffmpeg", "-v", "error", "-y", "-i", master, "-vf", vf,
     "-frames:v", "1", "-quality", "88", poster])

for p in (master, card_mp4, card_webm, poster):
    print(f"{p.name} {p.stat().st_size / 1e6:.2f}MB")
