import { useEffect, useState } from "react";

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

/** Site-wide language state, persisted like the theme choice and mirrored
 *  onto <html lang> so the design system's per-language type rules apply. */
export default function useLang() {
  const [lang, setLangState] = useState(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (code) => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore write failures
    }
    setLangState(code);
  };

  // The About footer cycles languages in the design's order: en → ja → ko
  const cycleLang = () => setLang(ORDER[(ORDER.indexOf(lang) + 1) % ORDER.length]);

  return { lang, setLang, cycleLang };
}
