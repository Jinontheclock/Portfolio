/* @ds-bundle: {"format":3,"namespace":"HajinLeePortfolioDesignSystem_2627bb","components":[{"name":"ArrowLink","sourcePath":"components/core/ArrowLink.jsx"},{"name":"LangSwitcher","sourcePath":"components/core/LangSwitcher.jsx"},{"name":"NavLink","sourcePath":"components/core/NavLink.jsx"},{"name":"PillButton","sourcePath":"components/core/PillButton.jsx"},{"name":"ThemeToggle","sourcePath":"components/core/ThemeToggle.jsx"},{"name":"MetaList","sourcePath":"components/site/MetaList.jsx"},{"name":"SiteFooter","sourcePath":"components/site/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/site/SiteHeader.jsx"},{"name":"WorkCard","sourcePath":"components/site/WorkCard.jsx"},{"name":"AboutScreen","sourcePath":"ui_kits/portfolio/AboutScreen.jsx"},{"name":"LandingScreen","sourcePath":"ui_kits/portfolio/LandingScreen.jsx"},{"name":"PortfolioApp","sourcePath":"ui_kits/portfolio/PortfolioApp.jsx"},{"name":"WorkScreen","sourcePath":"ui_kits/portfolio/WorkScreen.jsx"}],"sourceHashes":{"components/core/ArrowLink.jsx":"000d8fc765d4","components/core/LangSwitcher.jsx":"272b85143dea","components/core/NavLink.jsx":"8764c86ab7db","components/core/PillButton.jsx":"8c56da35c98f","components/core/ThemeToggle.jsx":"cc1d48e1ef04","components/site/MetaList.jsx":"e74d48a1856e","components/site/SiteFooter.jsx":"4d72117ffe27","components/site/SiteHeader.jsx":"6543669e6000","components/site/WorkCard.jsx":"2069c77a67d0","ui_kits/portfolio/AboutScreen.jsx":"bb79c6b4f0ef","ui_kits/portfolio/LandingScreen.jsx":"3d67df772699","ui_kits/portfolio/PortfolioApp.jsx":"7ff4660912f6","ui_kits/portfolio/WorkScreen.jsx":"188e1e1b6762"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HajinLeePortfolioDesignSystem_2627bb = window.HajinLeePortfolioDesignSystem_2627bb || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/ArrowLink.jsx
try { (() => {
function ArrowLink({
  children,
  label,
  size = 28,
  arrowSrc,
  href = "#",
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: e => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 30,
      textDecoration: "none",
      opacity: hover ? 0.5 : 1,
      transition: "opacity var(--duration-fast) var(--easing)",
      cursor: "pointer",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 ${size}px/1.25 var(--font-sans)`,
      letterSpacing: "-0.01em",
      color: "var(--black)"
    }
  }, children ?? label ?? "Work"), arrowSrc ? /*#__PURE__*/React.createElement("img", {
    src: arrowSrc,
    alt: "",
    width: 36,
    height: 36,
    style: {
      display: "block",
      transform: hover ? "translateY(3px)" : "none",
      transition: "transform var(--duration-fast) var(--easing)"
    }
  }) : null);
}
Object.assign(__ds_scope, { ArrowLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ArrowLink.jsx", error: String((e && e.message) || e) }); }

// components/core/LangSwitcher.jsx
try { (() => {
const LANGS = [{
  code: "en",
  text: "English"
}, {
  code: "ja",
  text: "日本語"
}, {
  code: "ko",
  text: "한국어"
}];
function LangSwitcher({
  value = "en",
  onChange,
  direction = "column",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: direction,
      gap: 4,
      alignItems: "flex-start",
      ...style
    }
  }, LANGS.map(l => /*#__PURE__*/React.createElement("span", {
    key: l.code,
    lang: l.code,
    onClick: () => onChange && onChange(l.code),
    style: {
      font: "400 12px/1.4 var(--font-sans)",
      color: value === l.code ? "var(--text-primary)" : "var(--text-faint)",
      cursor: "pointer",
      transition: "color var(--duration-fast) var(--easing)"
    }
  }, l.text)));
}
Object.assign(__ds_scope, { LangSwitcher });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LangSwitcher.jsx", error: String((e && e.message) || e) }); }

// components/core/NavLink.jsx
try { (() => {
function NavLink({
  children,
  label,
  href = "#",
  size = 16,
  muted = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: e => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      font: `400 ${size}px/1.5 var(--font-ui)`,
      color: muted ? "var(--text-faint)" : "var(--text-primary)",
      opacity: hover ? 0.5 : 1,
      textDecoration: "none",
      transition: "opacity var(--duration-fast) var(--easing)",
      cursor: "pointer",
      ...style
    }
  }, children ?? label ?? "Work");
}
Object.assign(__ds_scope, { NavLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/NavLink.jsx", error: String((e && e.message) || e) }); }

// components/core/PillButton.jsx
try { (() => {
function PillButton({
  children,
  label,
  active = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: 35,
      padding: "0 19px",
      border: "none",
      borderRadius: 17,
      background: active ? "var(--bg-muted)" : "var(--pill-bg)",
      opacity: 0.96,
      filter: hover ? "brightness(0.96)" : "none",
      font: "400 13.2px/20px var(--font-ui)",
      letterSpacing: "0.21px",
      color: "var(--pill-text)",
      cursor: "pointer",
      transition: "filter var(--duration-fast) var(--easing), background var(--duration-fast) var(--easing)",
      ...style
    }
  }, children ?? label ?? "All");
}
Object.assign(__ds_scope, { PillButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PillButton.jsx", error: String((e && e.message) || e) }); }

// components/core/ThemeToggle.jsx
try { (() => {
function ThemeToggle({
  value = "light",
  onChange,
  style
}) {
  const Opt = ({
    mode,
    text
  }) => /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(mode),
    style: {
      font: "400 14px/14px var(--font-ui)",
      color: value === mode ? "var(--text-primary)" : "var(--text-faint)",
      cursor: "pointer",
      transition: "color var(--duration-fast) var(--easing)"
    }
  }, text);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 9,
      ...style
    }
  }, /*#__PURE__*/React.createElement(Opt, {
    mode: "light",
    text: "Light"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 14px/14px var(--font-ui)",
      color: "var(--text-primary)"
    }
  }, "|"), /*#__PURE__*/React.createElement(Opt, {
    mode: "dark",
    text: "Dark"
  }));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// components/site/MetaList.jsx
try { (() => {
function MetaList({
  label = "Design Stack",
  items = [],
  gap = 4,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 40px/1.2 var(--font-ui)",
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap,
      font: "400 16px/1.6 var(--font-ui)",
      color: "var(--text)"
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, it))));
}
Object.assign(__ds_scope, { MetaList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/MetaList.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteFooter.jsx
try { (() => {
function SiteFooter({
  theme = "light",
  onThemeChange,
  lang = "en",
  onLangChange,
  year = 2026,
  markSrc,
  style
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      padding: "0 24px 24px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ThemeToggle, {
    value: theme,
    onChange: onThemeChange
  }), /*#__PURE__*/React.createElement(__ds_scope.LangSwitcher, {
    value: lang,
    onChange: onLangChange
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 12px/16px var(--font-ui)",
      color: "var(--text-faint)",
      whiteSpace: "nowrap"
    }
  }, "\xA9 HAJIN LEE ", year, " All rights reserved | Designed & built by Hajin Lee"), markSrc ? /*#__PURE__*/React.createElement("img", {
    src: markSrc,
    alt: "",
    width: 12,
    height: 12,
    style: {
      display: "block"
    }
  }) : null));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteHeader.jsx
try { (() => {
function SiteHeader({
  active = "work",
  onNavigate,
  wordmark = "HAJIN",
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      padding: "24px",
      gap: 73,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onNavigate && onNavigate("home"),
    style: {
      position: "absolute",
      left: "50%",
      top: 20,
      transform: "translateX(-50%)",
      font: "400 20px/24px var(--font-ui)",
      color: "var(--text-primary)",
      cursor: "pointer"
    }
  }, wordmark), /*#__PURE__*/React.createElement(__ds_scope.NavLink, {
    label: "Work",
    onClick: () => onNavigate && onNavigate("work"),
    muted: active !== "work"
  }), /*#__PURE__*/React.createElement(__ds_scope.NavLink, {
    label: "About",
    onClick: () => onNavigate && onNavigate("about"),
    muted: active !== "about"
  }));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/site/WorkCard.jsx
try { (() => {
function WorkCard({
  title = "ProLog",
  description = "skilled trades apprenticeship app for progress tracking",
  roles = ["product design", "Front-end development"],
  imageSrc,
  imageHeight = 328,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      gap: 48,
      alignItems: "flex-start",
      cursor: onClick ? "pointer" : "default",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 300,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 20px/32px var(--font-ui)",
      color: "var(--text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 16px/1.6 var(--font-ui)",
      color: "var(--text-secondary)"
    }
  }, description), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 12px/1.6 var(--font-ui)",
      color: "var(--text-muted)",
      whiteSpace: "pre-line"
    }
  }, roles.join("\n"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: imageHeight,
      background: imageSrc ? `url(${imageSrc}) center / cover no-repeat` : "var(--surface-placeholder)",
      opacity: hover ? 0.9 : 1,
      transition: "opacity var(--duration-base) var(--easing)"
    }
  }));
}
Object.assign(__ds_scope, { WorkCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/WorkCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/AboutScreen.jsx
try { (() => {
const INTRO_1 = "Originally from Seoul, I moved to Vancouver in 2024 to transition my career into UX/UI design.\nWith professional experience in the Japanese retail industry, I developed a strong foundation in an experience-focused mindset and purposeful visual storytelling through visual merchandising. Shaped by diverse cultural experiences, I bring a flexible way of thinking into digital design.";
const INTRO_2 = "I approach design with a focus on clarity and real-world feasibility, identify challenges within user flows and refine interfaces through clear structure and iterative improvement. With a combined understanding of graphic design and development, I value delivering seamless, frustration-free digital experiences that go beyond aesthetics.";
const EDUCATION = ["2026", "Digital Design and Development", "British Columbia Institute of Technology", "", "2022", "Fashion Design and Textiles", "Inha University"];
const STACK = ["Figma", "After Effects", "Photoshop", "Illustrator", "InDesign"];
function AboutScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      minHeight: 860
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SiteHeader, {
    active: "about",
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 24px 48px",
      display: "flex",
      flexDirection: "column",
      gap: 64
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 40px/1.2 var(--font-ui)",
      color: "var(--text-primary)"
    }
  }, "Hajin Lee"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 96,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 32,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 16px/1.6 var(--font-ui)",
      color: "var(--text)",
      whiteSpace: "pre-line"
    }
  }, INTRO_1), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 16px/1.6 var(--font-ui)",
      color: "var(--text)"
    }
  }, INTRO_2), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      flexWrap: "wrap",
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.NavLink, {
    label: "LinkedIn"
  }), /*#__PURE__*/React.createElement(__ds_scope.NavLink, {
    label: "Resume"
  }), /*#__PURE__*/React.createElement(__ds_scope.NavLink, {
    label: "Contact"
  }), /*#__PURE__*/React.createElement(__ds_scope.NavLink, {
    label: "GitHub"
  }), /*#__PURE__*/React.createElement(__ds_scope.NavLink, {
    label: "Instagram"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 624,
      maxWidth: "45%",
      height: 283,
      background: "var(--surface-placeholder)",
      flexShrink: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 96,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MetaList, {
    label: "Education",
    items: EDUCATION
  }), /*#__PURE__*/React.createElement(__ds_scope.MetaList, {
    label: "Design Stack",
    items: STACK
  }), /*#__PURE__*/React.createElement(__ds_scope.MetaList, {
    label: "Tech Stack",
    items: STACK
  }), /*#__PURE__*/React.createElement(__ds_scope.MetaList, {
    label: "Productivity",
    items: STACK
  }))));
}
Object.assign(__ds_scope, { AboutScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/AboutScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/LandingScreen.jsx
try { (() => {
function LandingScreen({
  onNavigate,
  assetBase = "../../assets"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minHeight: 860,
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "700 clamp(56px, 7.8vw, 112px)/1.2 var(--font-sans)",
      letterSpacing: "-0.01em",
      color: "var(--text-primary)"
    }
  }, "HAJIN, Product Designer"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      marginTop: 48,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ArrowLink, {
    label: "Work",
    size: 28,
    arrowSrc: `${assetBase}/arrow-down.png`,
    onClick: () => onNavigate && onNavigate("work")
  }), /*#__PURE__*/React.createElement(__ds_scope.ArrowLink, {
    label: "About",
    size: 28,
    arrowSrc: `${assetBase}/arrow-down.png`,
    onClick: () => onNavigate && onNavigate("about")
  })));
}
Object.assign(__ds_scope, { LandingScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/LandingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/WorkScreen.jsx
try { (() => {
const PROJECTS = [{
  id: "prolog",
  title: "ProLog",
  description: "skilled trades apprenticeship app for progress tracking",
  roles: ["product design", "Front-end development"]
}, {
  id: "prolog-2",
  title: "ProLog",
  description: "skilled trades apprenticeship app for progress tracking",
  roles: ["product design", "Front-end development"]
}];
function WorkScreen({
  onNavigate,
  onOpenProject
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      minHeight: 860
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SiteHeader, {
    active: "work",
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.PillButton, {
    label: "All",
    active: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 63,
      padding: "40px 24px 48px"
    }
  }, PROJECTS.map(p => /*#__PURE__*/React.createElement(__ds_scope.WorkCard, {
    key: p.id,
    title: p.title,
    description: p.description,
    roles: p.roles,
    onClick: () => onOpenProject && onOpenProject(p.id)
  }))));
}
Object.assign(__ds_scope, { WorkScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/WorkScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/PortfolioApp.jsx
try { (() => {
function PortfolioApp({
  assetBase = "../../assets"
}) {
  const [page, setPage] = React.useState(() => localStorage.getItem("hajin-page") || "home");
  // Default: light. If the user's desktop is set to dark, follow it; an explicit
  // in-site choice (saved) wins over the OS setting.
  const [theme, setTheme] = React.useState(() => {
    try {
      const saved = localStorage.getItem("hajin-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [lang, setLang] = React.useState("en");
  React.useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = e => {
      try {
        if (localStorage.getItem("hajin-theme")) return;
      } catch (err) {}
      setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const chooseTheme = mode => {
    setTheme(mode);
    try {
      localStorage.setItem("hajin-theme", mode);
    } catch (e) {}
  };
  const go = p => {
    const target = p === "home" ? "home" : p;
    setPage(target);
    try {
      localStorage.setItem("hajin-page", target);
    } catch (e) {}
  };
  return /*#__PURE__*/React.createElement("div", {
    className: theme === "dark" ? "dark" : "",
    style: {
      background: "var(--surface-canvas)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      transition: "background var(--duration-base) var(--easing)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, page === "home" && /*#__PURE__*/React.createElement(__ds_scope.LandingScreen, {
    onNavigate: go,
    assetBase: assetBase
  }), page === "work" && /*#__PURE__*/React.createElement(__ds_scope.WorkScreen, {
    onNavigate: go,
    onOpenProject: () => go("work")
  }), page === "about" && /*#__PURE__*/React.createElement(__ds_scope.AboutScreen, {
    onNavigate: go
  })), /*#__PURE__*/React.createElement(__ds_scope.SiteFooter, {
    theme: theme,
    onThemeChange: chooseTheme,
    lang: lang,
    onLangChange: setLang,
    markSrc: `${assetBase}/footer-mark.svg`
  }));
}
Object.assign(__ds_scope, { PortfolioApp });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/PortfolioApp.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ArrowLink = __ds_scope.ArrowLink;

__ds_ns.LangSwitcher = __ds_scope.LangSwitcher;

__ds_ns.NavLink = __ds_scope.NavLink;

__ds_ns.PillButton = __ds_scope.PillButton;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

__ds_ns.MetaList = __ds_scope.MetaList;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.WorkCard = __ds_scope.WorkCard;

__ds_ns.AboutScreen = __ds_scope.AboutScreen;

__ds_ns.LandingScreen = __ds_scope.LandingScreen;

__ds_ns.PortfolioApp = __ds_scope.PortfolioApp;

__ds_ns.WorkScreen = __ds_scope.WorkScreen;

})();
