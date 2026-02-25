
import { Analytics } from "@vercel/analytics/react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    __portfolioWindowsViewportSync?: boolean;
  }
}

if (
  typeof window !== "undefined" &&
  typeof document !== "undefined" &&
  typeof navigator !== "undefined" &&
  /Windows/i.test(navigator.userAgent)
) {
  const root = document.documentElement;
  root.classList.add("platform-windows");

  const updateWindowsViewportWidth = () => {
    root.style.setProperty("--windows-viewport-width", `${root.clientWidth}px`);
  };

  updateWindowsViewportWidth();

  if (!window.__portfolioWindowsViewportSync) {
    window.addEventListener("resize", updateWindowsViewportWidth, { passive: true });
    window.__portfolioWindowsViewportSync = true;
  }
}

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
  </>,
);
