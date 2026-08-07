#!/usr/bin/env python3
"""Cut the Japanese webfont down to the characters this site actually sets.

The Japanese faces are registered under the same family as the Korean ones
and scoped by `unicode-range`, so the browser only fetches them when a
Japanese character is on screen. That range has to list every character the
Korean face cannot draw — miss one and it falls through to whatever the
reader's operating system happens to have, which shows up as a change of
typeface in the middle of a sentence.

So the range is not maintained by hand. This reads every source file, takes
the Japanese characters out of them, subtracts what the Korean face already
covers, and writes both the subset files and the range that scopes them.
Run it after any change to Japanese copy:

    pip install fonttools brotli
    python3 scripts/build-jp-subset.py

It downloads the upstream font (~10 MB, not committed) into a scratch
directory and checks its unique ID before cutting, so a different release
cannot slip in unnoticed.
"""

import re
import subprocess
import sys
import urllib.request
from pathlib import Path

from fontTools.ttLib import TTFont

SITE = Path(__file__).resolve().parent.parent
SRC = SITE / "src"
FONTS = SRC / "design-system/assets/fonts"
CSS = SRC / "design-system/tokens/fonts.css"
CACHE = Path("/tmp/spoqa-jp-src")

UPSTREAM = "https://cdn.jsdelivr.net/npm/spoqa-han-sans@3.3.0/Subset/SpoqaHanSans_JP"
# the outlines the bundled subset was cut from; refuse anything else
EXPECT_ID = "1.002.20150607;MM;GenShinGothic-Regular;MM"

WEIGHTS = [
    ("SpoqaHanSansJPRegular.ttf", "SpoqaHanSansJP-Regular.subset.woff2"),
    ("SpoqaHanSansJPBold.ttf", "SpoqaHanSansJP-Bold.subset.woff2"),
]

# kana, ideographs, CJK punctuation and the fullwidth forms — everywhere a
# change of face would be visible inside a Japanese line
BLOCKS = ((0x3000, 0x30FF), (0x31F0, 0x31FF), (0x3400, 0x4DBF), (0x4E00, 0x9FFF), (0xFF01, 0xFF60))


def is_cjk(cp):
    return any(a <= cp <= b for a, b in BLOCKS)


def coverage(path):
    font = TTFont(path)
    cps = set()
    for table in font["cmap"].tables:
        cps |= set(table.cmap.keys())
    return cps


def unique_id(path):
    font = TTFont(path)
    for rec in font["name"].names:
        if rec.nameID == 3:
            return rec.toUnicode()
    return ""


def fetch(name):
    CACHE.mkdir(parents=True, exist_ok=True)
    dest = CACHE / name
    if not dest.exists():
        print(f"  받는 중  {name}")
        urllib.request.urlretrieve(f"{UPSTREAM}/{name}", dest)
    got = unique_id(dest)
    if got != EXPECT_ID:
        sys.exit(f"FAIL: {name} 의 출처가 다릅니다\n  기대: {EXPECT_ID}\n  실제: {got}")
    return dest


def used_characters():
    """Every CJK character written anywhere under src/.

    Deliberately blunt: it reads the files as text rather than parsing them,
    so a character in a comment is counted too. Over-including costs a few
    bytes; under-including costs a broken line of type.
    """
    found = set()
    for path in sorted(SRC.rglob("*")):
        if not path.is_file() or path.suffix not in {".js", ".jsx", ".ts", ".tsx", ".css", ".json", ".html"}:
            continue
        for ch in path.read_text(encoding="utf-8", errors="ignore"):
            cp = ord(ch)
            if is_cjk(cp):
                found.add(cp)
    return found


def to_range(cps):
    """Codepoints as a CSS unicode-range, runs collapsed."""
    out, run_start, prev = [], None, None
    for cp in sorted(cps):
        if run_start is None:
            run_start = prev = cp
        elif cp == prev + 1:
            prev = cp
        else:
            out.append((run_start, prev))
            run_start = prev = cp
    if run_start is not None:
        out.append((run_start, prev))
    return ",".join(f"U+{a:04X}" if a == b else f"U+{a:04X}-{b:04X}" for a, b in out)


def main():
    korean = coverage(FONTS / "SpoqaHanSansNeo-Regular.woff2")
    used = used_characters()
    # the Korean face already draws these in every language; leaving them to
    # it keeps one set of brackets and commas across the whole site
    wanted = {cp for cp in used if cp not in korean}
    print(f"src/ 안의 CJK 문자      {len(used)}자")
    print(f"한국어 페이스가 담은 것  {len(used) - len(wanted)}자")
    print(f"일본어 서브셋이 맡을 것  {len(wanted)}자")

    chars = ",".join(f"U+{cp:04X}" for cp in sorted(wanted))
    for source, target in WEIGHTS:
        ttf = fetch(source)
        out = FONTS / target
        subprocess.run(
            [
                "pyftsubset", str(ttf),
                f"--unicodes={chars}",
                "--flavor=woff2",
                "--layout-features=",          # no GSUB/GPOS — the copy needs none
                "--no-hinting",
                "--desubroutinize",
                f"--output-file={out}",
            ],
            check=True,
        )
        print(f"  {target}  {out.stat().st_size / 1024:.1f} KB")

    css = CSS.read_text(encoding="utf-8")
    rng = to_range(wanted)
    css, n = re.subn(r"unicode-range: [^;]+;", f"unicode-range: {rng};", css)
    CSS.write_text(css, encoding="utf-8")
    print(f"fonts.css 의 unicode-range {n}곳 갱신")


if __name__ == "__main__":
    main()
