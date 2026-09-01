/* Freezing the page for a modal takes the scrollbar away, and on a browser
   that draws a classic one — Windows, Linux, and any Mac set to always show
   them — its width goes straight back to the layout: everything centred
   jumps sideways as the modal opens and jumps back as it closes.

   Reserving the gutter for good would fix it, but on the overlay scrollbars
   macOS and iOS use by default the bar has no width to reserve, and a
   permanent empty strip would appear on pages that never had one. So the
   width is measured at the moment of freezing and handed back — zero on the
   browsers that never had the problem. */

/**
 * Hold the page still while a modal is over it. Returns the undo.
 *
 * @param pin  also take the body out of flow. iOS Safari ignores
 *   overflow:hidden on the root for touch scrolling, and a page that scrolls
 *   underneath drags fixed overlays out of place — bare bands above and below
 *   a backdrop — so a modal that has to hold on a phone pins the body as
 *   well. It is not the default because it costs the sticky header its place:
 *   the whole document shifts up by the scroll offset, and under a backdrop
 *   you can see through, that is a header sliding away as the modal opens.
 */
export function freezePage({ pin = false } = {}) {
  const root = document.documentElement;
  const body = document.body.style;
  /* the width the page is laid out in right now, scrollbar excluded, and
     what the scrollbar is taking. Both have to be read before the overflow
     below takes the bar away. */
  const width = root.clientWidth;
  const bar = window.innerWidth - width;
  const y = window.scrollY;
  const prevRoot = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
  const prevBody = { position: body.position, top: body.top, width: body.width };

  root.style.overflow = "hidden";
  if (pin) {
    /* A fixed body is laid out against the viewport rather than against the
       root's content box, so the padding in the other branch never reaches
       it — and width:100% here means the viewport, scrollbar and all. That
       was the page stepping sideways by the bar's width as the demo modal
       opened, on exactly the browsers that draw a bar. The measured width is
       what the page already had. */
    body.position = "fixed";
    body.top = `-${y}px`;
    body.width = `${width}px`;
  } else if (bar > 0) {
    root.style.paddingRight = `${bar}px`;
  }

  return () => {
    root.style.overflow = prevRoot.overflow;
    root.style.paddingRight = prevRoot.paddingRight;
    if (!pin) return;
    body.position = prevBody.position;
    body.top = prevBody.top;
    body.width = prevBody.width;
    window.scrollTo(0, y);
  };
}
