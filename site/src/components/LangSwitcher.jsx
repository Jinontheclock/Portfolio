import { LANGS } from "../lib/lang-routes.js";
import { LANG_LABELS } from "../i18n.js";

/** Ported from the Hajin Lee Portfolio Design System's LangSwitcher
 *  (components/core/LangSwitcher.jsx) so the landing page matches the
 *  design system's actual component, not a re-styled approximation.
 *
 *  Which languages it lists comes from lib/lang-routes.js rather than a
 *  list of its own, so holding one back closes the way in here too. With
 *  only one language offered there is nothing to switch between, and a
 *  lone unclickable label reads as something broken — so it renders
 *  nothing at all. */
export default function LangSwitcher({ value = "en", onChange, direction = "column" }) {
  if (LANGS.length < 2) return null;

  return (
    <div className="lang-switcher" style={{ flexDirection: direction }}>
      {LANGS.map((code) => (
        <span
          key={code}
          lang={code}
          role="button"
          tabIndex={0}
          aria-pressed={value === code}
          onClick={() => onChange && onChange(code)}
          onKeyDown={(e) => {
            // spans take no keyboard activation of their own — without this
            // the language cannot be changed at all without a pointer
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onChange && onChange(code);
            }
          }}
          className="lang-switcher-item"
          style={{ color: value === code ? "var(--text-primary)" : "var(--text-faint)" }}
        >
          {LANG_LABELS[code]}
        </span>
      ))}
    </div>
  );
}
