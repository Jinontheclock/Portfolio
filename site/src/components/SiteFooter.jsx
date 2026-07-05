import Dropdown from "./Dropdown.jsx";
import { LANG_LABELS } from "../i18n.js";
import useFitToWidth from "../hooks/useFitToWidth.js";

const LANGS = ["en", "ja", "ko"];

/** Inner-page footer: plain-text language trigger bottom-left, opening a
 *  glass menu upward (drop-up), plus the copyright line bottom-right. */
export default function SiteFooter({ lang, setLang }) {
  const copyRef = useFitToWidth(12); // keep the copyright on one line

  return (
    <footer className="site-footer">
      <div className="site-footer-menus">
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
      <span className="site-footer-copy" ref={copyRef}>
        © HAJIN LEE 2026 All rights reserved | Designed &amp; built by Hajin Lee
      </span>
    </footer>
  );
}
