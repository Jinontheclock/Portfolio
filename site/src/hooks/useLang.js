import { useState } from "react";

const STORAGE_KEY = "hajin-lang";
const ORDER = ["en", "ja", "ko"];

function readInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (ORDER.includes(saved)) return saved;
  } catch {
    // storage unavailable — fall through to default
  }
  return "en";
}

/** Site-wide language state, persisted like the theme choice. The <html lang>
 *  mirror lives in App and follows the *displayed* language — flipping it on
 *  click would re-resolve the still-visible old text's fallback font
 *  mid-fade (visibly reflowing e.g. Japanese glyphs) before the swap. */
export default function useLang() {
  const [lang, setLangState] = useState(readInitialLang);

  const setLang = (code) => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore write failures
    }
    setLangState(code);
  };

  return { lang, setLang };
}
