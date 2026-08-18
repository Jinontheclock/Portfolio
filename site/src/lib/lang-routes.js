/* Language lives in the URL.

   English sits at the root and the others take a prefix:

     /work/prolog        en
     /ja/work/prolog     ja
     /ko/work/prolog     ko

   That is what makes a language linkable — there was no way to send someone
   the Korean site before — and it is what hreflang needs, since hreflang
   points at URLs. English keeps the bare path because it is x-default: the
   version anyone arriving without a language preference should get.

   Everything here is plain string work with no router import, so the build
   can use it too when it writes the static pages and the sitemap. */

export const DEFAULT_LANG = "en";

/** Every language this site has copy for. */
export const ALL_LANGS = ["en", "ja", "ko"];

/* ─────────────────────────────────────────────────────────────────────────
   Which of them are currently offered. THIS IS THE SWITCH.

   Japanese and Korean are held back for now. Nothing was deleted to do it:
   src/data/projects/*.js still carries all three languages, and so does
   i18n.js. Only the way in is closed.

   To bring them back, restore the line to:

       export const LANGS = ALL_LANGS;

   and everything downstream follows on its own — the landing-page switcher
   and the footer drop-up reappear, App.jsx generates the /ja and /ko routes
   again, and the build goes back to writing 24 static pages with the full
   hreflang set and a 21-URL sitemap. No other file needs an edit.
   ───────────────────────────────────────────────────────────────────────── */
export const LANGS = [DEFAULT_LANG];

/** Held back: copy exists, no route serves it. Empty when all are offered,
 *  which is what makes the switch above the only thing to change. */
export const RETIRED = ALL_LANGS.filter((l) => !LANGS.includes(l));

/** the offered ones that show up as a path segment */
export const PREFIXED = LANGS.filter((l) => l !== DEFAULT_LANG);

/** BCP 47 tags for <html lang> and hreflang, and the OG locale codes. */
export const HTML_LANG = { en: "en", ja: "ja", ko: "ko" };
export const OG_LOCALE = { en: "en_CA", ja: "ja_JP", ko: "ko_KR" };

/** "/ko/work/prolog" → { lang: "ko", rest: "/work/prolog" }
 *  "/work/prolog"    → { lang: "en", rest: "/work/prolog" }
 *
 *  A first segment that is not a language is left alone, so /work never
 *  reads as a language called "work". A held-back language is not a
 *  language here either: while ko is retired, /ko/work/prolog is just an
 *  unknown English path, which is what App.jsx redirects away from. */
export function splitLang(pathname) {
  const m = /^\/([^/]+)(\/.*)?$/.exec(pathname || "/");
  if (m && PREFIXED.includes(m[1])) {
    return { lang: m[1], rest: m[2] || "/" };
  }
  return { lang: DEFAULT_LANG, rest: pathname || "/" };
}

/** ("ko", "/work/prolog") → "/ko/work/prolog"
 *  ("en", "/work/prolog") → "/work/prolog" */
export function withLang(lang, rest) {
  const path = rest === "/" ? "" : rest;
  return lang === DEFAULT_LANG ? path || "/" : `/${lang}${path}`;
}

/** The same page in another language, given where the reader is now.
 *  Used by the footer switcher, which has to move the reader rather than
 *  just re-render them. */
export function swapLang(pathname, lang) {
  return withLang(lang, splitLang(pathname).rest);
}

/** "/ko/work/prolog" → "/work/prolog", for a language that is no longer
 *  offered. splitLang cannot do this — it only knows the offered ones. */
export function stripRetired(pathname) {
  if (!RETIRED.length) return pathname;
  const rest = (pathname || "/").replace(
    new RegExp(`^/(?:${RETIRED.join("|")})(?=/|$)`),
    "",
  );
  return rest || "/";
}
