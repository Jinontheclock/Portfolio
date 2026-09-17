/* ── Whose key is it ──
   The stages and the landing turn on the arrows, the Page keys, Home, End
   and the space bar, and they listen on the window, so a press meant for
   whatever has focus reaches them too. A control that answers the key
   itself keeps it, and the page takes the rest — so a reader who has
   tabbed to a chapter can still arrow on through the column, and the
   space bar still works the button under their finger.

   The space bar is the one that mattered: a button is activated on keyup,
   and only if the keydown was not cancelled, so a window listener that
   calls preventDefault on space turns every focused button on the page
   into a dead key. */
export function ownsKey(target, key) {
  if (!target || typeof target.closest !== "function") return false;
  /* a field, a select or a slider answers all of them: the caret, the
     options, the value */
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  /* everything else keeps the space bar alone, and only where it acts:
     a button, a summary, or anything standing in for one */
  return key === " " && !!target.closest('button, summary, [role="button"]');
}
