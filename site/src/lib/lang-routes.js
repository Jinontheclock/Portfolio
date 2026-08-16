/* Language lives in the URL.

   English sits at the root and the other two take a prefix:

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
export const LANGS = ["en", "ja", "ko"];
/** the ones that show up as a path segment */
export const PREFIXED = LANGS.filter((l) => l !== DEFAULT_LANG);

/** BCP 47 tags for <html lang> and hreflang, and the OG locale codes. */
export const HTML_LANG = { en: "en", ja: "ja", ko: "ko" };
export const OG_LOCALE = { en: "en_CA", ja: "ja_JP", ko: "ko_KR" };

/** "/ko/work/prolog" → { lang: "ko", rest: "/work/prolog" }
 *  "/work/prolog"    → { lang: "en", rest: "/work/prolog" }
 *
 *  A first segment that is not a language is left alone, so /work never
 *  reads as a language called "work". */
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
