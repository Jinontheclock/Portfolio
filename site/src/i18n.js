/* UI strings per language. Content translations (About intro, etc.)
   join this file when the copy is ready. */

/* The language names themselves stay in their own language on purpose —
   standard practice, so each visitor can find their own. */
export const LANG_LABELS = { en: "English", ja: "日本語", ko: "한국어" };

/* Landing page. `indent` hangs the first glyph's left side bearing so its
   ink starts exactly at the margin: EN/KO measured from the Spoqa font
   (BoundsPen ink-left); JA uses typical values — those glyphs aren't in the
   bundled subset, so they render in the platform's fallback font. */
export const LANDING = {
  en: {
    hero: "HAJIN, Product Designer",
    heroIndent: "-0.09em",
    work: "Work",
    workIndent: "-0.025em",
    about: "About",
    aboutIndent: "-0.0025em",
  },
  ko: {
    hero: "하진, 프로덕트 디자이너",
    heroIndent: "-0.038em",
    work: "작업",
    workIndent: "-0.049em",
    about: "소개",
    aboutIndent: "-0.053em",
  },
  ja: {
    hero: "ハジン, プロダクト　デザイナー",
    heroIndent: "-0.06em",
    work: "実績",
    workIndent: "-0.03em",
    about: "経歴",
    aboutIndent: "-0.03em",
  },
};
