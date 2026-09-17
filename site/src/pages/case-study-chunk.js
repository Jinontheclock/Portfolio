import { lazy } from "react";

/* ── The case studies, loaded when they are wanted ──
   The case-study page is the heaviest thing on the site: the page itself,
   the forty-odd figure components the five studies draw with, and their
   copy in three languages. None of it is on the landing page or the Work
   page, and all of it used to be in the one bundle a visitor downloads to
   read the landing's three lines.

   So it is its own chunk. The rest of the site is small enough that
   splitting it further would cost more round trips than it saves bytes.

   The import is a module-level promise once it has been asked for, so
   calling load() again is free — which is what lets the Work page start
   the download the moment a card is hovered or focused, and wait on the
   same promise when it is clicked. A reader who arrives at a case study
   directly gets the request started while the boot cover is still up. */
export const loadCaseStudy = () => import("./CaseStudyPage.jsx");

export const CaseStudyPage = lazy(loadCaseStudy);
