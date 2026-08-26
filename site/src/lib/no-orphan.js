import { useSyncExternalStore } from "react";

/* Keeps a paragraph's last line from being one or two lonely words: the
   final two breaking spaces become non-breaking, so at least three words
   wrap down together. Whitespace-only — the copy itself never changes.
   Multi-line strings (white-space: pre-line) are handled per line. */

/* ── Not on a phone ──
   Three words glued together is a nicety on a wide measure and a real cost
   on a narrow one. Measured on the About page at 390: the paragraph with
   the longest tail broke at 187px of a 350px column and closed at 178,
   because "its responsive components." is one unbreakable 178px run and
   the line before it could not take any of it. Two short lines to save one
   short line is a bad trade, and it reads as words refusing to sit where
   they fit.

   So the glue stops at the site's phone breakpoint and the copy wraps
   greedily below it: each line fills, then breaks. The query is watched
   rather than read once, or a rotation would leave the paragraphs set for
   the width they no longer have. */
const PHONE = "(max-width: 600px)";
const mq = typeof window !== "undefined" ? window.matchMedia?.(PHONE) : null;

const subscribe = (fn) => {
  mq?.addEventListener("change", fn);
  return () => mq?.removeEventListener("change", fn);
};
const isPhone = () => mq?.matches ?? false;

/** Called once by a page that sets orphan-controlled copy: re-renders it
 *  when the viewport crosses the breakpoint, so the two helpers below are
 *  always answering for the width on screen. */
export function useOrphanControl() {
  return useSyncExternalStore(subscribe, isPhone, () => false);
}
/* CJK (Hangul, kana, Han) is left alone. Orphan control here is
   space-based, which is a Latin problem: Japanese has no spaces to work
   with, and Korean does — which is worse, because gluing the last two
   eojeol together fights `word-break: keep-all` and pushes a whole short
   line down instead of a single word. CJK line breaking is typography.css's
   job. No caller changes. */
const CJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/;

export function noOrphan(text) {
  if (typeof text !== "string") return text;
  if (isPhone()) return text;
  if (CJK.test(text)) return text;
  return text
    .split("\n")
    .map((line) => line.replace(/ +(\S+) +(\S+)$/, "\u00A0$1\u00A0$2"))
    .join("\n");
}

/* Same idea for paragraphs built from segments (strings mixed with inline
   links): walking back from the end, the last two breaking spaces found in
   string segments become non-breaking, gluing across link boundaries too. */
export function noOrphanSegments(segments) {
  if (isPhone()) return segments;
  const flat = segments.map((x) => (typeof x === "string" ? x : x.text)).join("");
  if (CJK.test(flat)) return segments;
  const out = [...segments];
  let glued = 0;
  for (let i = out.length - 1; i >= 0 && glued < 2; i--) {
    if (typeof out[i] !== "string") continue;
    let s = out[i];
    while (glued < 2) {
      const at = s.lastIndexOf(" ");
      if (at === -1) break;
      s = s.slice(0, at) + "\u00A0" + s.slice(at + 1);
      glued++;
    }
    out[i] = s;
  }
  return out;
}
