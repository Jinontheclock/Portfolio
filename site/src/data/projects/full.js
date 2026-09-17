import { PROJECTS } from "./index.js";
import compassSections from "./compass.sections.js";
import welabSections from "./welab.sections.js";
import prologSections from "./prolog.sections.js";
import tinypawsSections from "./tinypaws.sections.js";
import mujiSections from "./muji.sections.js";

/* ── A project with its chapters ──
   index.js is the card: what the Work page needs, and what a case study
   needs before its body — the title, the colour, the wordmark, the
   headline. This module puts the chapters back on, and it is imported
   only by the case-study page, which is its own chunk (see
   pages/case-study-chunk.js). A visitor who opens the landing page or
   the Work page never downloads a quarter of a megabyte of section
   blocks to look at five cards.

   Composed once at module load rather than per call: the case-study page
   memoises the language fold on the project's identity, and a fresh
   object each call would refold every chapter on every render. */
const SECTIONS = {
  "compass-card": compassSections,
  welab: welabSections,
  prolog: prologSections,
  tinypaws: tinypawsSections,
  muji: mujiSections,
};

export const PROJECTS_FULL = PROJECTS.map((p) => ({ ...p, sections: SECTIONS[p.id] ?? [] }));

export const getProject = (id) => PROJECTS_FULL.find((p) => p.id === id);
