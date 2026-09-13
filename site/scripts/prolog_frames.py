"""The two ProLog phone frames: where their screens are, and where the
frames stand on the hero master.

Shared by build-prolog-hero.py, which lays the recorded screens into the
frames, and build-prolog-card.py, which lifts them back out for the Work
card. Both frames are RGBA PNGs from the mockup set. The iPhone's screen is
a transparent hole; the Galaxy's is painted a uniform near-black, so its
screen is found by colour and given a soft mask lifted from that fill.
Either way the screen is traced as a region rather than boxed, because its
corners are not circles (the iPhone's are squircles) and the box's own
corners fall outside the rounded body."""

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
FRAMES = ROOT / "public" / "media" / "prolog" / "frames"
IPHONE_FRAME = FRAMES / "iphone-17-pro-orange.png"
GALAXY_FRAME = FRAMES / "galaxy-s25-navy.png"

# the master canvas, and the pair centred on it around a 300px gap
MASTER = (3500, 1928)
_GAP = 300
_IP_W, _GX_W, _TOP, _H = 832, 826, 114, 1700
_LEFT = (MASTER[0] - (_IP_W + _GAP + _GX_W)) // 2
IPHONE_PLACE = (_LEFT, _TOP, _IP_W, _H)  # (x, y, w, h) on the master
GALAXY_PLACE = (_LEFT + _IP_W + _GAP, _TOP, _GX_W, _H)


def _shift(a, dy, dx):
    """`a` moved by (dy, dx), the vacated edge filled with False"""
    out = np.zeros_like(a)
    h, w = a.shape
    ys = slice(max(dy, 0), h + min(dy, 0))
    yd = slice(max(-dy, 0), h + min(-dy, 0))
    xs = slice(max(dx, 0), w + min(dx, 0))
    xd = slice(max(-dx, 0), w + min(-dx, 0))
    out[ys, xs] = a[yd, xd]
    return out


def _grow(a, n=1):
    """`a` dilated by n pixels, four-connected"""
    for _ in range(n):
        a = a | _shift(a, 1, 0) | _shift(a, -1, 0) | _shift(a, 0, 1) | _shift(a, 0, -1)
    return a


def region(open_px, scale=4):
    """The connected run of `open_px` around the centre — the screen, and
    nothing else that happens to be open, such as the air outside the
    body at the corners of the screen's bounding box, which a rounded
    frame leaves inside it. Grown from a seed at the centre until it stops
    growing, on a 1/`scale` copy for speed, then read back at full size
    (the full-size pixels within `scale` of the small run, so the edge is
    exact). Returns the mask and its bounding box (x, y, w, h)."""
    small = open_px[::scale, ::scale]
    seed = np.zeros_like(small)
    seed[small.shape[0] // 2, small.shape[1] // 2] = True
    assert small[small.shape[0] // 2, small.shape[1] // 2], "expected the screen at the centre"
    while True:
        grown = _grow(seed) & small
        if (grown == seed).all():
            break
        seed = grown
    h, w = open_px.shape
    near = np.repeat(np.repeat(seed, scale, 0), scale, 1)[:h, :w]
    mask = open_px & _grow(near, scale)
    ys, xs = np.nonzero(mask)
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max(), ys.max()
    return mask, (int(x0), int(y0), int(x1 - x0 + 1), int(y1 - y0 + 1))


def iphone_hole(frame_img):
    """The transparent screen hole: its bbox, and its exact shape as a mask
    of the frame. The Dynamic Island is drawn into the frame at top-centre;
    the run is grown around it, so it stays out of the hole."""
    a = np.array(frame_img)[:, :, 3]
    mask, rect = region(a < 10)
    return rect, mask


def galaxy_screen(frame_img):
    """Bbox and soft mask of the painted screen (uniform ~RGB 27), and the
    screen's exact shape as a mask of the frame. The punch-hole camera at
    top-centre is drawn over the paint, so it stays out of both masks."""
    px = np.array(frame_img).astype(np.int16)
    d = np.abs(px[:, :, :3] - 27).max(axis=2)
    screenish = (d < 12) & (px[:, :, 3] > 200)
    shape, rect = region(screenish)
    x0, y0, w, h = rect
    # soft edge: fully on inside the fill, fading over the antialiased rim
    alpha = np.clip((30 - d) * (255 / 18), 0, 255).astype(np.uint8)
    alpha[px[:, :, 3] < 200] = 0
    # ...but only the screen's own rim, not the paint's twin anywhere else
    alpha[~_grow(shape, 3)] = 0
    soft = Image.fromarray(alpha, "L").crop((x0, y0, x0 + w, y0 + h))
    return rect, soft, shape


def placed_rect(place, frame_size, inner):
    """An inner rect of the frame, mapped into master coordinates."""
    px, py, pw, ph = place
    fw, fh = frame_size
    sx, sy = pw / fw, ph / fh
    x, y, w, h = inner
    return (round(px + x * sx), round(py + y * sy), round(w * sx), round(h * sy))
