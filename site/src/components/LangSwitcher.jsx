const LANGS = [
  { code: "en", text: "English" },
  { code: "ja", text: "日本語" },
  { code: "ko", text: "한국어" },
];

/** Ported from the Hajin Lee Portfolio Design System's LangSwitcher
 *  (components/core/LangSwitcher.jsx) so the landing page matches the
 *  design system's actual component, not a re-styled approximation. */
export default function LangSwitcher({ value = "en", onChange, direction = "column" }) {
  return (
    <div className="lang-switcher" style={{ flexDirection: direction }}>
      {LANGS.map((l) => (
        <span
          key={l.code}
          lang={l.code}
          role="button"
          tabIndex={0}
          aria-pressed={value === l.code}
          onClick={() => onChange && onChange(l.code)}
          onKeyDown={(e) => {
            // spans take no keyboard activation of their own — without this
            // the language cannot be changed at all without a pointer
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onChange && onChange(l.code);
            }
          }}
          className="lang-switcher-item"
          style={{ color: value === l.code ? "var(--text-primary)" : "var(--text-faint)" }}
        >
          {l.text}
        </span>
      ))}
    </div>
  );
}
