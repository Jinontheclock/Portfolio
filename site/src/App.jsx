import { HashRouter, Routes, Route } from "react-router-dom";
import useTheme from "./hooks/useTheme.js";
import useLang from "./hooks/useLang.js";
import LandingPage from "./pages/LandingPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import WorkPage from "./pages/WorkPage.jsx";

export default function App() {
  const { theme, setTheme, toggleTheme } = useTheme();
  const { lang, setLang } = useLang();
  const shared = { theme, setTheme, toggleTheme, lang, setLang };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage {...shared} />} />
        <Route path="/about" element={<AboutPage {...shared} />} />
        <Route path="/work" element={<WorkPage {...shared} />} />
      </Routes>
    </HashRouter>
  );
}
