const LANG_LABELS = { en: "English", ja: "日本語", ko: "한국어" };

/** Inner-page footer from the About design: plain-text theme toggle and
 *  language cycler, bottom-left. */
export default function SiteFooter({ theme, toggleTheme, lang, cycleLang }) {
  return (
    <footer className="site-footer">
      <span className="site-footer-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "Dark" : "Light"}
      </span>
      <span className="site-footer-toggle" onClick={cycleLang}>
        {LANG_LABELS[lang]}
      </span>
    </footer>
  );
}
