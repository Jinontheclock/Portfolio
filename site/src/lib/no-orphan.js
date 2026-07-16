/* Keeps a paragraph's last line from being one or two lonely words: the
   final two breaking spaces become non-breaking, so at least three words
   wrap down together. Whitespace-only — the copy itself never changes.
   Multi-line strings (white-space: pre-line) are handled per line. */
export function noOrphan(text) {
  if (typeof text !== "string") return text;
  return text
    .split("\n")
    .map((line) => line.replace(/ +(\S+) +(\S+)$/, "\u00A0$1\u00A0$2"))
    .join("\n");
}

/* Same idea for paragraphs built from segments (strings mixed with inline
   links): walking back from the end, the last two breaking spaces found in
   string segments become non-breaking, gluing across link boundaries too. */
export function noOrphanSegments(segments) {
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
