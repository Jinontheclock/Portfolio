import Dropdown from "./Dropdown.jsx";
import { THEME_LABELS, LANG_LABELS } from "../i18n.js";

const THEMES = ["light", "dark"];
const LANGS = ["en", "ja", "ko"];

/** Inner-page footer: plain-text theme and language triggers, bottom-left.
 *  Each opens a glass menu upward (drop-up), since it sits at the page foot. */
export default function SiteFooter({ theme, setTheme, lang, setLang }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-menus">
        <Dropdown
          direction="up"
          renderTrigger={(toggle) => (
            <span className="site-footer-toggle" onClick={toggle}>
              {THEME_LABELS[lang][theme]}
            </span>
          )}
          items={THEMES.map((t) => ({
            label: THEME_LABELS[lang][t],
            current: t === theme,
            onSelect: () => setTheme(t),
          }))}
        />
        <Dropdown
          direction="up"
          renderTrigger={(toggle) => (
            <span className="site-footer-toggle" onClick={toggle}>
              {LANG_LABELS[lang]}
            </span>
          )}
          items={LANGS.map((l) => ({
            label: LANG_LABELS[l],
            current: l === lang,
            onSelect: () => setLang(l),
          }))}
        />
      </div>
      <span className="site-footer-copy">
        © HAJIN LEE 2026 All rights reserved | Designed &amp; built by Hajin Lee
      </span>
    </footer>
  );
}
