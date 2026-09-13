#!/usr/bin/env python3
"""Composites the two recorded ProLog screens into the phone mockups.

    python3 scripts/build-prolog-hero.py            (needs ffmpeg, pillow, numpy)

Inputs
    public/media/prolog/raw/prolog-screen-dashboard.webm   (iPhone screen)
    public/media/prolog/raw/prolog-screen-quiz.webm        (Galaxy screen)
    public/media/prolog/raw/trims.json                     (per-clip lead cut)
    public/media/prolog/frames/iphone-17-pro-orange.png
    public/media/prolog/frames/galaxy-s25-navy.png

Outputs
    public/media/prolog/prolog-hero-phones.mp4             (master 3500x1928)
    public/media/prolog/raw/hero-layout-preview.png        (static sanity check)

The frames and their placement are prolog_frames.py. (The Work card no
longer cuts its picture from this: it shows a still render, see
data/projects/prolog.js.)

Playwright records at CSS resolution regardless of deviceScaleFactor, so the
app sits in the top-left of each capture; APP_RECT crops it out. The iPhone
frame has a transparent screen hole, so its video slides underneath and the
bezel's own antialiased edge finishes the corners. The Galaxy frame ships
with an opaque near-black screen, so its video goes on top, clipped by a
mask lifted pixel-for-pixel from that screen fill.
"""

import json
import subprocess

from PIL import Image
from prolog_frames import (
    GALAXY_FRAME,
    GALAXY_PLACE,
    IPHONE_FRAME,
    IPHONE_PLACE,
    MASTER as CANVAS,
    ROOT,
    galaxy_screen,
    iphone_hole,
    placed_rect,
)

RAW = ROOT / "public" / "media" / "prolog" / "raw"
OUT = ROOT / "public" / "media" / "prolog"

BG = "0xFAFAFA"
FPS = 30
DURATION = 10

# frame file, placement (x, y, w, h) on the canvas, app crop in the capture
IPHONE = {
    "frame": IPHONE_FRAME,
    "place": IPHONE_PLACE,
    "clip": RAW / "prolog-screen-dashboard.webm",
    "trim_key": "prolog-screen-dashboard",
    "app_rect": "402:874:0:0",
}
GALAXY = {
    "frame": GALAXY_FRAME,
    "place": GALAXY_PLACE,
    "clip": RAW / "prolog-screen-quiz.webm",
    "trim_key": "prolog-screen-quiz",
    "app_rect": "412:872:0:0",
}


def run(cmd):
    subprocess.run([str(c) for c in cmd], check=True)


trims = json.loads((RAW / "trims.json").read_text())

iphone_img = Image.open(IPHONE["frame"]).convert("RGBA")
galaxy_img = Image.open(GALAXY["frame"]).convert("RGBA")

ip_hole = placed_rect(IPHONE["place"], iphone_img.size, iphone_hole(iphone_img)[0])
gx_inner, gx_mask, _ = galaxy_screen(galaxy_img)
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

print(f"{master.name} {master.stat().st_size / 1e6:.2f}MB")
