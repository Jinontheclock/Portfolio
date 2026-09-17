import { useEffect } from "react";

/* ── A modal's focus ──
   freezePage stops the page behind a modal scrolling, but it does not stop
   its controls being reached: without a trap, Tab walks out of the modal
   and through the chapter list, the figures and the footer of a page the
   reader can neither see nor scroll to, with the focus ring somewhere
   behind the backdrop.

   So the modal takes focus when it opens, keeps Tab inside while it is up,
   and hands focus back to whatever opened it when it closes. Escape is
   left to each modal, which already answers it. */

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/** @param active  false while the modal is mounted but not shown — the demo
 *  modal stays in the tree and renders nothing until it opens, so the trap
 *  has to be told when the dialog is actually on screen rather than
 *  reading a ref that was null the one time an effect ran. */
export default function useFocusTrap(ref, active = true) {
  useEffect(() => {
    const box = active ? ref.current : null;
    if (!box) return undefined;
    /* where focus was, so it can go back — the button that opened the
       modal is the place the reader was reading from */
    const opener = document.activeElement;
    /* drawn, rather than merely present: a control in a collapsed branch
       cannot be focused and would trap Tab at an edge that is not there */
    const inside = () =>
      [...box.querySelectorAll(FOCUSABLE)].filter((el) => el.getClientRects().length > 0);

    const first = inside()[0];
    if (first) first.focus();
    else {
      box.setAttribute("tabindex", "-1");
      box.focus();
    }

    const onKey = (e) => {
      if (e.key !== "Tab") return;
      const list = inside();
      if (!list.length) {
        e.preventDefault();
        box.focus();
        return;
      }
      const head = list[0];
      const tail = list[list.length - 1];
      const at = document.activeElement;
      /* off either end, or focus that has escaped the modal altogether
         (the page behind it, or the document): back to the other end */
      if (!box.contains(at)) {
        e.preventDefault();
        (e.shiftKey ? tail : head).focus();
      } else if (e.shiftKey && at === head) {
        e.preventDefault();
        tail.focus();
      } else if (!e.shiftKey && at === tail) {
        e.preventDefault();
        head.focus();
      }
    };
    /* captured, so a handler inside the modal cannot swallow the Tab
       before the trap sees which end it is at */
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus();
    };
  }, [ref, active]);
}
