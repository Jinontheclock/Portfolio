# originals

The full-size version of every image that was scaled down for the web, kept at
its original path under this directory.

Nothing here is built or served. It sits outside `src/assets` (which Vite
bundles) and outside `public` (which Vite copies), so it never reaches `dist`
and never reaches a visitor.

## Why the shipped files are smaller

Each image was scaled to the largest size it is ever actually displayed at,
measured in a real browser across four viewport widths at their device pixel
ratios, and including the size a case-study figure reaches when it is opened in
the lightbox — which is the binding constraint for most of them, not the size
they occupy in the column. A 4000px figure is shown at 700 device pixels in the
page but 2240 in the lightbox, so 2240 is what it needs and 2240 is what it
now is: exactly 1:1 when opened, no upscaling.

Images that belong to a hero animation carry 1.5x on top of that, because their
displayed size changes while the animation runs and a single measurement
understates it.

## Re-cutting an image

Work from the copy here, never from the shipped file — scaling an already
scaled image compounds the loss.
