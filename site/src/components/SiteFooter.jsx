import Dropdown from "./Dropdown.jsx";
import { LANG_LABELS } from "../i18n.js";
import useFitToWidth from "../hooks/useFitToWidth.js";

const LANGS = ["en", "ja", "ko"];

/** Inner-page footer: plain-text language trigger bottom-left, opening a
 *  glass menu upward (drop-up), plus the copyright line bottom-right. */
export default function SiteFooter({ lang, setLang }) {
  // keep the copyright on one line; smaller on mobile so it shares the
  // bottom row with the language trigger inside the margins
  const copyRef = useFitToWidth(12, { mobileMax: 9 });

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
          items={LANGS.filter((l) => l !== lang).map((l) => ({
            label: LANG_LABELS[l],
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
