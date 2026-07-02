import { useEffect, useState } from "react";

const STORAGE_KEY = "hajin-theme";

function readInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  } catch {
    // localStorage/matchMedia unavailable — fall through to default
  }
  return "light";
}

/** Tracks the light/dark theme, persists explicit choices, and mirrors the
 *  choice onto <html data-theme> so the design system's CSS tokens apply. */
export default function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore write failures (private browsing, storage disabled)
      }
      return next;
    });
  };

  return { theme, toggleTheme };
}
