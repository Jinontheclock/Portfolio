import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import useLang from "./hooks/useLang.js";
import LandingPage from "./pages/LandingPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import CaseStudyPage from "./pages/CaseStudyPage.jsx";

const FADE_MS = 350; // keep in sync with .lang-fade-* in components.css

export default function App() {
  const { lang, setLang } = useLang();
  // language switches fade out with the old text, then fade in with the new:
  // pages render displayLang, which only advances once the fade-out ends
  const [displayLang, setDisplayLang] = useState(lang);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (lang === displayLang) return;
    setFadingOut(true);
    const t = setTimeout(() => {
      setDisplayLang(lang);
      setFadingOut(false);
    }, FADE_MS);
    return () => clearTimeout(t);
  }, [lang, displayLang]);

  const shared = { lang: displayLang, setLang };

  return (
    <HashRouter>
      <div className={fadingOut ? "lang-fade-out" : "lang-fade-in"}>
        <Routes>
          <Route path="/" element={<LandingPage {...shared} />} />
          <Route path="/about" element={<AboutPage {...shared} />} />
          <Route path="/work" element={<WorkPage {...shared} />} />
          <Route path="/work/:id" element={<CaseStudyPage {...shared} />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
