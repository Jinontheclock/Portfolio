import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./design-system/styles.css";
import "./styles/breakpoints.css";
import "./styles/landing.css";
import "./styles/components.css";
import "./styles/about.css";
import "./styles/work.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
