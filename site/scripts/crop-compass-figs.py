"""Cut the Figma graphics frame's side margins off the Compass figures.

The figures are exported from 2000-wide frames laid out on the "grahics"
layout guide — seven columns, a 100px margin either side, 40px gutters —
and the margin comes with the export, so on the page the figure stood 5%
in from each edge of its column. This takes exactly that 5% off both
sides (100px at 2000, 200px at the 2x exports) and leaves the top and
bottom as they are.

Sources: the 2x originals in originals/src/assets/compass where the owner
supplied them (the ones exported at 4000 wide, cut to 0.56 of that for
the page, as before), and otherwise the export itself — the uncut copy of
which is kept beside them under originals/ the way every upload is.

    python3 scripts/crop-compass-figs.py
"""
from pathlib import Path
import shutil
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src/assets/compass"
ORIGINALS = ROOT / "originals/src/assets/compass"
MARGIN = 0.05  # the guide's 100px of a 2000px frame
SCALE_2X = 0.56  # the 4000-wide exports' share on the page (2240 wide, as cut before)
QUALITY = 88
NAMES = [
    "audit", "balance-paths", "card", "colour", "component", "coverage-roadmap",
    "cvm", "ia", "system", "task-table", "timeline", "type", "website",
]

for name in NAMES:
    out = ASSETS / f"compass-fig-{name}.webp"
    original = ORIGINALS / out.name
    if not original.exists():
        # the export is the original: keep it uncut
        ORIGINALS.mkdir(parents=True, exist_ok=True)
        shutil.copy2(out, original)
    im = Image.open(original).convert("RGB")
    w, h = im.size
    cut = round(w * MARGIN)
    im = im.crop((cut, 0, w - cut, h))
    if w >= 4000:
        im = im.resize((round(im.width * SCALE_2X), round(im.height * SCALE_2X)), Image.LANCZOS)
    im.save(out, "WEBP", quality=QUALITY, method=6)
    print(f"{out.name:36s} {w}x{h} -{cut}px each side -> {im.width}x{im.height}  {out.stat().st_size // 1024} KB")
