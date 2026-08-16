import { useLocation } from "react-router-dom";
import { splitLang, withLang } from "../lib/lang-routes.js";

/** Builds links that stay in the language the reader is already in.
 *
 *  Every internal link has to carry the prefix or a Korean reader clicking
 *  through to a case study lands back in English. Reading it off the URL
 *  rather than taking it as a prop keeps the two from drifting: during a
 *  language fade the rendered `lang` prop deliberately lags the URL, and a
 *  link built from the lagging value would point at the page the reader is
 *  leaving. */
export default function useLangPath() {
  const { pathname } = useLocation();
  const { lang } = splitLang(pathname);
  return (rest) => withLang(lang, rest);
}
