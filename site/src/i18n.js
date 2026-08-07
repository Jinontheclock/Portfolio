/* UI strings per language. Content translations (About intro, etc.)
   join this file when the copy is ready. */

/* The language names themselves stay in their own language on purpose —
   standard practice, so each visitor can find their own. */
export const LANG_LABELS = { en: "English", ja: "日本語", ko: "한국어" };

/* Landing page. `indent` hangs the first glyph's left side bearing so its
   ink starts exactly at the margin — all values measured from the bundled
   fonts (BoundsPen ink-left): EN/KO from Spoqa Neo, JA from the Spoqa JP
   subset. */
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
    // Hangul reads visually denser at the fitted size, so sit a bit smaller
    heroRatio: 0.94,
    heroIndent: "-0.038em",
    work: "작업",
    workIndent: "-0.049em",
    about: "소개",
    aboutIndent: "-0.053em",
  },
  ja: {
    hero: "ハジン, プロダクト　デザイナー",
    heroIndent: "-0.05em",
    work: "実績",
    workIndent: "-0.056em",
    about: "経歴",
    aboutIndent: "-0.029em",
  },
};

/* Browser tab / bookmark / search-result name. Held in all three languages
   so the structure is there, but all three read English on purpose: the
   wordmark, the header pills and every other fixed label on this site are
   English, and a tab that alone switched script would read as a different
   site. */
export const PAGE_TITLE = {
  work: { en: "Work — HAJIN", ja: "Work — HAJIN", ko: "Work — HAJIN" },
  about: { en: "About — HAJIN", ja: "About — HAJIN", ko: "About — HAJIN" },
};
