/* Freezing the page for a modal takes the scrollbar away, and on a browser
   that draws a classic one — Windows, Linux, and any Mac set to always show
   them — its width goes straight back to the layout: everything centred
   jumps sideways as the modal opens and jumps back as it closes.

   Reserving the gutter for good would fix it, but on the overlay scrollbars
   macOS and iOS use by default the bar has no width to reserve, and a
   permanent empty strip would appear on pages that never had one. So the
   width is measured at the moment of freezing and handed back as padding —
   zero on the browsers that never had the problem. */
export function freezePage() {
  const root = document.documentElement;
  const bar = window.innerWidth - root.clientWidth;
  const prev = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
  root.style.overflow = "hidden";
  if (bar > 0) root.style.paddingRight = `${bar}px`;
  return () => {
    root.style.overflow = prev.overflow;
    root.style.paddingRight = prev.paddingRight;
  };
}
