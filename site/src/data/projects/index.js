/* Project data — Work-page card copy plus case-study page content.
   Case studies share one block model per section:
     { type:"h", text, tag? }   sub-heading (tag = small muted note)
     { type:"p", text }         paragraph
     { type:"list", items }     bullet list
     { type:"stats", items }    { value, label } rows
     { type:"quote", text, cite }
     { type:"solution", title, tag?, paras, media, caption?, wide? }
     { type:"figure", graphic|graphics, caption? }
     { type:"demo", label?, note? }
     { type:"cta", label|buttons, href?, demo?, note? }
     { type:"tagline", text }

   Any string the reader sees may instead be an { en, ja, ko } object; a
   bare string means all three languages use it. See resolve.js. */

import compass from "./compass.js";
import welab from "./welab.js";
import prolog from "./prolog.js";
import tinypaws from "./tinypaws.js";
import muji from "./muji.js";

export const PROJECTS = [compass, welab, prolog, tinypaws, muji];

export const getProject = (id) => PROJECTS.find((p) => p.id === id);
