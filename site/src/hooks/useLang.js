import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_LANG, LANGS, splitLang, withLang } from "../lib/lang-routes.js";

const STORAGE_KEY = "hajin-lang";

function read() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    // storage unavailable — no remembered choice
  }
  return null;
}

/** The language itself lives in the URL (see lib/lang-routes.js). What is
 *  left here is the memory of what the reader last chose, which is used for
 *  exactly one thing: sending a returning visitor who opens the bare root to
 *  the language they were reading in.
 *
 *  Only the root redirects, and only when something was stored. A deep link
 *  always wins — someone sent /work/prolog is meant to see it in English,
 *  whatever they read last time. Crawlers have no storage, so they are never
 *  redirected and always index the English root as x-default. */
export default function useLang() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== "/") return;
    const saved = read();
    if (!saved || saved === DEFAULT_LANG) return;
    navigate(withLang(saved, "/"), { replace: true });
  }, [pathname, navigate]);

  const remember = (code) => {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore write failures
    }
  };

  return { lang: splitLang(pathname).lang, remember };
}
