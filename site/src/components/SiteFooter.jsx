import { THEME_LABELS, LANG_LABELS } from "../i18n.js";

/** Inner-page footer from the About design: plain-text theme toggle and
 *  language cycler, bottom-left. */
export default function SiteFooter({ theme, toggleTheme, lang, cycleLang }) {
  return (
    <footer className="site-footer">
      <span className="site-footer-toggle" onClick={toggleTheme}>
        {THEME_LABELS[lang][theme === "dark" ? "dark" : "light"]}
      </span>
      <span className="site-footer-toggle" onClick={cycleLang}>
        {LANG_LABELS[lang]}
      </span>
    </footer>
  );
}
