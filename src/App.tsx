import imgPrologMockup1 from "./assets/projects/prolog/prolog_mockup1.webp";
import imgTinypawsMockup from "./assets/projects/tinypaws/tinypaws_mockup.webp";
import imgIcelandMockup4 from "./assets/projects/iceland/BestofIceland_mockup4.webp";
import imgImg26161 from "./assets/home/about/hajin_homepage_about.webp";
import imgArrow from "./assets/common/arrow.webp";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Header, { THEME_EVENT_NAME, type ThemeMode } from "./components/Header";
import Footer from "./components/Footer";
import ProjectsPage from "./components/ProjectsPage";
import AboutPage from "./components/AboutPage";
import ProjectIceland from "./components/ProjectIceland";
import ProjectProLog from "./components/ProjectProLog";
import ProjectTinyPaws from "./components/ProjectTinyPaws";
import ProjectMuji from "./components/ProjectMuji";
import ProjectArchiveHouse from "./components/ProjectArchiveHouse";
import ProjectArchiveOfVeilance from "./components/ProjectArchiveOfVeilance";
import ProjectMatchaLatte from "./components/ProjectMatchaLatte";
import { Language, Page } from "./types";
import RevealLine, { RevealHLine } from "./components/RevealLine";

declare global {
  interface Window {
    VANTA?: {
      BIRDS?: (options: Record<string, unknown>) => { destroy?: () => void };
    };
    THREE?: unknown;
  }
}

const THREE_SCRIPT_ID = "three-r134-min-js";
const THREE_SCRIPT_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
const VANTA_SCRIPT_ID = "vanta-birds-min-js";
const VANTA_SCRIPT_SRC = "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js";

function loadExternalScript(id: string, src: string) {
  return new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(id) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        resolve();
        return;
      }

      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function Group() {
  return (
    <div className="absolute left-[727px] top-[536px]">
      <img
        src={imgArrow}
        alt="Arrow"
        className="w-6 h-6 object-contain"
      />
    </div>
  );
}

const HERO_POS = {
  title: { left: 154, top: 307 },
  subtitle: { left: 727, top: 484 },
};

const HOME_LAYOUT_BASE_HEIGHT = 3690;
const HOME_FOOTER_OFFSET = 290;
const HOME_FOOTER_TOP = HOME_LAYOUT_BASE_HEIGHT - HOME_FOOTER_OFFSET;
const HOME_VANTA_BASE_HEIGHT = 720;

type InspirationItem = {
  img: string;
  href?: string;
  label: string;
  top: number | string;
  left: number | string;
  width?: number;
  height?: number;
};

const inspirationModules = import.meta.glob("./assets/home/inspirations/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const inspirationSources = Object.entries(inspirationModules)
  .map(([path, src]) => ({
    src,
    filename: path.split("/").pop() ?? path,
  }))
  .sort((a, b) => a.filename.localeCompare(b.filename));

const INSPIRATION_FILENAME_ORDER = [
  "apple.webp",
  "Bauhaus.webp",
  "dieterRams.webp",
  "donaldJudd.webp",
  "ghibli.webp",
  "helvetica.webp",
  "paf.webp",
  "ReiKawakubo.webp",
  "RickOwens.webp",
  "sakamotoRyuichi.webp",
  "spacex.webp",
  "tadaoando.webp",
  "VirgilAbloh.webp",
  "WesAnderson.webp",
] as const;

const inspirationSourceMap = new Map(inspirationSources.map((item) => [item.filename, item]));

const orderedInspirationSources = INSPIRATION_FILENAME_ORDER
  .map((filename) => inspirationSourceMap.get(filename))
  .filter((item): item is { src: string; filename: string } => Boolean(item));

function resolveInspirationLink(filename: string) {
  const lower = filename.toLowerCase();

  if (lower.includes("bauhaus") || lower.startsWith("98248")) return "https://www.bauhaus.de/en/";
  if (lower.includes("dieterrams") || lower.startsWith("1e560")) return "https://rams-foundation.org/";
  if (lower.includes("apple") || lower.startsWith("a52234")) return "https://developer.apple.com/design/human-interface-guidelines";
  if (lower.includes("rei") || lower.startsWith("a771")) return "https://www.comme-des-garcons.com";
  if (lower.includes("rick") || lower.startsWith("10c445")) return "https://www.rickowens.eu/en-ca/pages/product-guide";
  if (lower.includes("tadao") || lower.startsWith("94ec39")) return "https://tadaoandoo.tilda.ws";
  if (lower.includes("virgil") || lower.startsWith("f0aa54")) return "https://www.youtube.com/watch?v=qie5VITX6eQ";
  if (lower.includes("spacex")) return "https://www.spacex.com/";
  if (lower.includes("donaldjudd")) return "https://juddfoundation.org/";
  if (lower.includes("sakamoto")) return "https://www.sitesakamoto.com";
  if (lower.includes("ghibli")) return "https://www.ghibli.jp";
  if (lower.includes("helvetica")) return "https://www.pixartprinting.co.uk/blog/history-font-helvetica/?srsltid=AfmBOoq2sCZ2P3jC3C27WcVplzPJiPjTJyajZgxfifOSbv49jcUJixSk";
  if (lower.includes("paf")) return "https://www.instagram.com/postarchivefaction/?hl=en";
  if (lower.includes("wesanderson")) return "https://accidentallywesanderson.com";

  return undefined;
}

const inspirationSizePattern = [96, 108, 102, 114, 100, 110, 104, 112, 98, 116, 106, 109, 103, 111];
const inspirationMaxRight = 1440 - 24;

const inspirationLayoutSlots = [
  { left: 74, top: 760 },
  { left: 332, top: 808 },
  { left: 596, top: 750 },
  { left: 878, top: 820 },
  { left: 1152, top: 764 },
  { left: 182, top: 914 },
  { left: 474, top: 972 },
  { left: 780, top: 928 },
  { left: 1072, top: 988 },
  { left: 88, top: 1048 },
  { left: 350, top: 1098 },
  { left: 640, top: 1042 },
  { left: 930, top: 1104 },
  { left: 1208, top: 1062 },
] as const;

const INSPIRATION_ITEMS: InspirationItem[] = orderedInspirationSources.map((item, index) => {
  const size = inspirationSizePattern[index % inspirationSizePattern.length];
  const slot = inspirationLayoutSlots[index] ?? inspirationLayoutSlots[index % inspirationLayoutSlots.length];
  const left = Math.max(24, Math.min(inspirationMaxRight - size, slot.left));

  return {
    img: item.src,
    href: resolveInspirationLink(item.filename),
    label: item.filename.replace(/\.[^.]+$/, ""),
    top: slot.top,
    left,
    width: size,
    height: size,
  };
});

type ProjectEntry = {
  id: number;
  top: number;
  title: string;
  desc: string[];
  skills: string[];
  skillsWidth: number;
  image: { grey: string; color: string };
};

const PROJECTS: ProjectEntry[] = [
  {
    id: 1,
    top: 1480,
    title: 'ProLog',
    desc: ['Skilled trades apprenticeship app', 'for progress tracking'],
    skills: ['Product design', 'Front-end development'],
    skillsWidth: 262,
    image: { grey: imgPrologMockup1, color: imgPrologMockup1 },
  },
  {
    id: 2,
    top: 1792,
    title: 'TinyPaws',
    desc: ['Cat adoption website', 'for a rescue nonprofit'],
    skills: ['Product design', 'WordPress Web design'],
    skillsWidth: 248,
    image: { grey: imgTinypawsMockup, color: imgTinypawsMockup },
  },
  {
    id: 3,
    top: 2104,
    title: 'Best of Iceland',
    desc: ['G Adventure itinerary', 'redesigned as a magazine'],
    skills: ['Editorial design', 'Visual storytelling', 'Print-ready composition'],
    skillsWidth: 217,
    image: { grey: imgIcelandMockup4, color: imgIcelandMockup4 },
  },
];
const PROJECT_SKILLS_TOP_OFFSET = 30;

const PAGE_PATHS: Record<Page, string> = {
  home: '/',
  projects: '/projects',
  about: '/about',
  prolog: '/projects/prolog',
  iceland: '/projects/best-of-iceland',
  tinypaws: '/projects/tinypaws',
  muji: '/projects/muji',
  archivehouse: '/projects/archive-house',
  archiveofveliance: '/projects/archive-of-veliance',
  matchalatte: '/projects/matcha-latte',
};

function normalizePath(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function pageFromPath(pathname: string): Page {
  const path = normalizePath(pathname);

  if (path === '/projects') return 'projects';
  if (path === '/about') return 'about';
  if (path === '/projects/prolog' || path === '/prolog') return 'prolog';
  if (path === '/projects/best-of-iceland' || path === '/iceland') return 'iceland';
  if (path === '/projects/tinypaws' || path === '/tinypaws') return 'tinypaws';
  if (path === '/projects/muji' || path === '/muji') return 'muji';
  if (path === '/projects/archive-house' || path === '/archive-house') return 'archivehouse';
  if (path === '/projects/archive-of-veliance' || path === '/archive-of-veliance') return 'archiveofveliance';
  if (path === '/projects/matcha-latte' || path === '/matcha-latte') return 'matchalatte';

  return 'home';
}

function InspirationLines() {
  return (
    <>
      {/* Line 1: full width */}
      <RevealHLine
        className="absolute left-[24px] right-[24px] top-[720px]"
        style={{ width: 'auto' }}
        color="var(--color-black-normal)"
        thickness={1}
      />
      {/* Line 2: starts after the inspirations label */}
      <RevealHLine
        className="absolute left-[180px] right-[24px] top-[744px]"
        style={{ width: 'auto' }}
        color="var(--color-black-normal)"
        thickness={1}
        delayMs={60}
      />
      {/* Remaining lines */}
      {Array.from({ length: 19 }).map((_, idx) => (
        <RevealHLine
          key={idx}
          className="absolute left-[24px] right-[24px]"
          style={{ top: `${768 + idx * 24}px`, width: 'auto' }}
          color="var(--color-black-normal)"
          thickness={1}
          delayMs={80 + idx * 20}
        />
      ))}
    </>
  );
}

function InspirationImages() {
  return (
    <>
      {INSPIRATION_ITEMS.map((item) => {
        const baseClass = "group absolute block transition-transform duration-300 ease-out hover:scale-[1.6] origin-center";
        const baseStyle = { top: item.top, left: item.left, width: item.width ?? 100, height: item.height ?? 100 };

        if (item.href) {
          return (
            <a
              key={item.label}
              className={`${baseClass} cursor-pointer`}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              style={baseStyle}
            >
              <img
                alt={item.label}
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full grayscale transition-[filter] duration-300 ease-out group-hover:grayscale-0"
                src={item.img}
              />
            </a>
          );
        }

        return (
          <div key={item.label} className={`${baseClass} cursor-default`} style={baseStyle}>
            <img
              alt={item.label}
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full grayscale transition-[filter] duration-300 ease-out group-hover:grayscale-0"
              src={item.img}
            />
          </div>
        );
      })}
    </>
  );
}

function ProjectBlocks({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      {PROJECTS.map((proj) => (
        <div key={proj.id} className="group home-project-row">
          <div
            className="absolute left-0 right-0 cursor-pointer"
            style={{ top: proj.top, height: 200 }}
            onClick={() => {
              if (proj.id === 1) onNavigate('prolog');
              if (proj.id === 3) onNavigate('iceland');
              if (proj.id === 2) onNavigate('tinypaws');
            }}
          >
            <p
              className="absolute home-project-hover-block m-0 font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(25%+18px)] not-italic text-[18px]"
              style={{ width: 'calc(12.5% - 35px)' }}
            >
              <span>({proj.id})</span>
            </p>
            <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(37.5%-9px)] right-[calc(37.5%+23px)] not-italic text-black-normal text-[0px]">
              <p className="type-heading-3 mb-0 home-project-hover-block">
                <span>{proj.title}</span>
              </p>
              {proj.desc.map((line) => (
                <p key={line} className="text-[18px] mb-0 px-[8px]">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div
            className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-black-normal text-[18px] whitespace-pre-wrap"
            style={{ left: 'calc(62.5% - 15px)', top: proj.top + PROJECT_SKILLS_TOP_OFFSET, width: proj.skillsWidth }}
          >
            {proj.skills.map((line) => (
              <p key={line} className="mb-0">
                {line}
              </p>
            ))}
          </div>

          <div
            className="absolute right-[24px] size-[264px]"
            style={{ top: proj.top }}
            onClick={() => {
              if (proj.id === 1) onNavigate('prolog');
              if (proj.id === 3) onNavigate('iceland');
              if (proj.id === 2) onNavigate('tinypaws');
            }}
          >
            <img
              alt=""
              className={`pointer-events-none absolute inset-0 object-cover object-center size-full transition duration-300 opacity-100 group-hover:opacity-0 ${
                proj.id === 1 || proj.id === 2 || proj.id === 3 ? 'grayscale' : ''
              }`}
              src={proj.image.grey}
            />
            <img
              alt=""
              className="pointer-events-none absolute inset-0 object-cover object-center size-full transition duration-300 opacity-0 group-hover:opacity-100"
              src={proj.image.color}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default function App() {
  const heroRoles = ['UI/UX', 'PRODUCT', 'GRAPHIC'] as const;
  const homeBackgroundClipRef = useRef<HTMLDivElement | null>(null);
  const homeBackgroundRef = useRef<HTMLDivElement | null>(null);
  const vantaEffectRef = useRef<{ destroy?: () => void } | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    if (typeof window === 'undefined') return 'home';
    return pageFromPath(window.location.pathname);
  });
  const [language, setLanguage] = useState<Language>('EN');
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
  });
  const [heroRoleIndex, setHeroRoleIndex] = useState(0);
  const renderHomeHeroReveal = (content: ReactNode, delayMs: number) => (
    <span
      className="project-header-reveal-line projects-text-reveal-line"
      style={{
        ['--project-header-reveal-delay' as string]: `${delayMs}ms`,
        display: 'inline-block',
        width: 'max-content',
        maxWidth: 'none',
      } as CSSProperties}
    >
      <span className="project-header-reveal-text">{content}</span>
    </span>
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroRoleIndex((prev) => (prev + 1) % heroRoles.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [heroRoles.length]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncFromLocation = () => {
      setCurrentPage(pageFromPath(window.location.pathname));
    };

    const canonicalPath = PAGE_PATHS[pageFromPath(window.location.pathname)];
    if (normalizePath(window.location.pathname) !== canonicalPath) {
      window.history.replaceState(window.history.state, '', canonicalPath);
    }

    window.addEventListener('popstate', syncFromLocation);
    return () => window.removeEventListener('popstate', syncFromLocation);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncThemeMode = (nextMode?: ThemeMode) => {
      if (nextMode === 'dark' || nextMode === 'light') {
        setThemeMode(nextMode);
        return;
      }
      setThemeMode(document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light');
    };

    const onThemeModeChange = (event: Event) => {
      const detail = (event as CustomEvent<ThemeMode>).detail;
      syncThemeMode(detail);
    };

    window.addEventListener(THEME_EVENT_NAME, onThemeModeChange as EventListener);
    return () => window.removeEventListener(THEME_EVENT_NAME, onThemeModeChange as EventListener);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (currentPage !== "home") {
      if (vantaEffectRef.current?.destroy) {
        vantaEffectRef.current.destroy();
      }
      vantaEffectRef.current = null;
      return;
    }

    let cancelled = false;

    const forwardPointerToVanta = (clientX: number, clientY: number) => {
      const clipEl = homeBackgroundClipRef.current;
      const backgroundEl = homeBackgroundRef.current;
      if (!clipEl || !backgroundEl) return;

      const rect = clipEl.getBoundingClientRect();
      const isWithinClip =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (!isWithinClip) return;

      backgroundEl.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX,
          clientY,
          view: window,
        }),
      );
    };

    const onWindowMouseMove = (event: MouseEvent) => {
      forwardPointerToVanta(event.clientX, event.clientY);
    };

    const onWindowTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      forwardPointerToVanta(touch.clientX, touch.clientY);
    };

    const setupBirds = async () => {
      try {
        if (!window.THREE) {
          await loadExternalScript(THREE_SCRIPT_ID, THREE_SCRIPT_SRC);
        }

        if (!window.VANTA?.BIRDS) {
          await loadExternalScript(VANTA_SCRIPT_ID, VANTA_SCRIPT_SRC);
        }

        if (cancelled || !homeBackgroundRef.current || !window.VANTA?.BIRDS) {
          return;
        }

        if (vantaEffectRef.current?.destroy) {
          vantaEffectRef.current.destroy();
        }

        const isDarkMode = themeMode === 'dark';

        vantaEffectRef.current = window.VANTA.BIRDS({
          el: homeBackgroundRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: isDarkMode ? 0x212222 : 0xf3f3f2,
          backgroundAlpha: 1,
          colorMode: "varianceGradient",
          color1: isDarkMode ? 0xf3f3f2 : 0x212222,
          color2: isDarkMode ? 0xf3f3f2 : 0x212222,
          birdSize: 1.0,
          wingSpan: 20.0,
          speedLimit: 5.0,
          separation: 20.0,
          alignment: 10.0,
          cohesion: 15.0,
          quantity: 3.0,
        });
      } catch (error) {
        console.error("Failed to initialize Vanta Birds effect", error);
      }
    };

    window.addEventListener("mousemove", onWindowMouseMove, { passive: true });
    window.addEventListener("touchmove", onWindowTouchMove, { passive: true });
    setupBirds();

    return () => {
      cancelled = true;
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("touchmove", onWindowTouchMove);
      if (vantaEffectRef.current?.destroy) {
        vantaEffectRef.current.destroy();
      }
      vantaEffectRef.current = null;
    };
  }, [currentPage, themeMode]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);

    if (typeof window !== 'undefined') {
      const nextPath = PAGE_PATHS[page];
      if (normalizePath(window.location.pathname) !== nextPath) {
        window.history.pushState({ page }, '', nextPath);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  };

  if (currentPage === 'projects') {
    return (
      <ProjectsPage
        currentPage={currentPage}
        language={language}
        onNavigate={navigateTo}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  if (currentPage === 'iceland') {
    return (
      <ProjectIceland
        currentPage={currentPage}
        language={language}
        onNavigate={navigateTo}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  if (currentPage === 'prolog') {
    return (
      <ProjectProLog
        currentPage={currentPage}
        language={language}
        onNavigate={navigateTo}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  if (currentPage === 'tinypaws') {
    return (
      <ProjectTinyPaws
        currentPage={currentPage}
        language={language}
        onNavigate={navigateTo}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  if (currentPage === 'muji') {
    return (
      <ProjectMuji
        currentPage={currentPage}
        language={language}
        onNavigate={navigateTo}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  if (currentPage === 'archivehouse') {
    return (
      <ProjectArchiveHouse
        currentPage={currentPage}
        language={language}
        onNavigate={navigateTo}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  if (currentPage === 'archiveofveliance') {
    return (
      <ProjectArchiveOfVeilance
        currentPage={currentPage}
        language={language}
        onNavigate={navigateTo}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  if (currentPage === 'matchalatte') {
    return (
      <ProjectMatchaLatte
        currentPage={currentPage}
        language={language}
        onNavigate={navigateTo}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  if (currentPage === 'about') {
    return (
      <AboutPage
        currentPage={currentPage}
        language={language}
        onNavigate={navigateTo}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  const projectSeparators = [1456, 1768, 2080, 2392];

  return (
    <div className="layout-viewport hide-scrollbar">
      <div className="layout-canvas" style={{ "--layout-base-height": `${HOME_LAYOUT_BASE_HEIGHT}px` } as CSSProperties}>
        <div
          ref={homeBackgroundClipRef}
          className="home-vanta-birds-clip"
          style={{ ["--home-vanta-base-height" as string]: `${HOME_VANTA_BASE_HEIGHT}px` } as CSSProperties}
          aria-hidden="true"
        >
          <div ref={homeBackgroundRef} className="home-vanta-birds" />
        </div>
        <div className="layout-canvas-inner">
          <div
            className="relative"
            style={{ minHeight: "var(--layout-base-height)" } as CSSProperties}
          >
        <Header
          currentPage={currentPage}
          language={language}
          onNavigate={navigateTo}
          onLanguageChange={(lang) => setLanguage(lang)}
        />

        <p
          className="absolute type-title-1 text-black-normal"
          style={HERO_POS.title}
        >
          {renderHomeHeroReveal('HAJIN', 980)}
        </p>
        
        <div
          className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-black-normal text-[18px] whitespace-nowrap"
          style={HERO_POS.subtitle}
        >
          <div className="grid grid-cols-[80px_100px] items-start gap-x-[12px] gap-y-[2px]">
            <p className="m-0">{renderHomeHeroReveal('VANCOUVER', 1040)}</p>
            <p className="m-0 text-right">{renderHomeHeroReveal('BASED', 1070)}</p>
            <div className="relative h-[26px] overflow-visible">
              {renderHomeHeroReveal(
                <span key={heroRoles[heroRoleIndex]} className="inline-block hero-role-word whitespace-nowrap">
                  {heroRoles[heroRoleIndex]}
                </span>,
                1100
              )}
            </div>
            <p className="m-0 text-right">{renderHomeHeroReveal('DESIGNER', 1130)}</p>
          </div>
        </div>
        
        <button
          onClick={() => navigateTo('projects')}
          className="absolute left-[24px] top-[1400px] cursor-pointer bg-transparent border-none p-0 home-projects-cta"
          aria-label="Go to Projects"
        >
          <span className="home-projects-cta-text nav-underline home-projects-cta-underline text-black-normal">
            <span className="home-projects-more font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-[18px]">
              more
            </span>
            <span className="type-heading-2 leading-[1.2]">Projects</span>
          </span>
        </button>
        <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(25%+18px)] not-italic text-black-normal text-[18px] top-[1402px] w-[916px] whitespace-pre-wrap">A selection of highlighted projects</p>
        <button
          onClick={() => navigateTo('about')}
          className="absolute left-[24px] top-[2592px] cursor-pointer bg-transparent border-none p-0 home-projects-cta"
          aria-label="Go to About"
        >
          <span className="home-projects-cta-text nav-underline home-projects-cta-underline text-black-normal">
            <span className="home-projects-more font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-[18px]">
              more
            </span>
            <span className="type-heading-2 leading-[1.2]">About</span>
          </span>
        </button>
        {/* Project 1 group */}
        <ProjectBlocks onNavigate={navigateTo} />
        {projectSeparators.map((top, idx) => (
          <RevealHLine
            key={top}
            className={idx === 3 ? 'left-[25px] right-[24px]' : 'left-[calc(25%+18px)] right-[24px]'}
            style={{ width: 'auto', top: `${top}px` }}
            thickness={1}
            color="var(--color-black-normal)"
            delayMs={idx * 40}
          />
        ))}
        <RevealLine
          height={192}
          className="left-[calc(75%-17px)] top-[2672px]"
          color="var(--color-black-normal)"
          delayMs={80}
        />
        <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(25%+18px)] not-italic text-black-normal text-[18px] top-[2592px] w-[531px] whitespace-pre-wrap">
          <p className="mb-0">Designing with structure and real-world constraints in mind,</p>
          <p className="mb-0">translating complex needs into clear, usable experiences.</p>
        </div>
        <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] h-[24px] leading-[normal] left-[calc(75%-6px)] not-italic text-black-normal text-[18px] top-[2672px] w-[483px] whitespace-pre-wrap">UX/UI Design for Digital Products</p>
        <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] h-[37px] leading-[normal] left-[calc(75%-6px)] not-italic text-black-normal text-[18px] top-[2816px] w-[483px] whitespace-pre-wrap">
          <p className="mb-0">Front-End Development</p>
          <p>{`& AI-Assisted Prototyping`}</p>
        </div>
        <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] h-[37px] leading-[normal] left-[calc(75%-6px)] not-italic text-black-normal text-[18px] top-[2720px] w-[483px] whitespace-pre-wrap">{`Graphic Design & Layout Composition`}</p>
        <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] h-[37px] leading-[normal] left-[calc(75%-6px)] not-italic text-black-normal text-[18px] top-[2768px] w-[483px] whitespace-pre-wrap">{`Brand Identity & Visual Systems`}</p>
        <img
          alt=""
          src={imgImg26161}
          className="absolute left-[24px] top-[2680px] grayscale pointer-events-none"
          style={{ transform: 'scale(0.59)', transformOrigin: 'top left' }}
        />
        <InspirationLines />
        <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[24px] not-italic text-black-normal text-[24px] top-[724px]">inspirations</p>
        <InspirationImages />
        <Footer
          onNavigate={navigateTo}
          onArchiveClick={() => {}}
          top={HOME_FOOTER_TOP}
        />
          </div>
        </div>
      </div>
    </div>
  );
}
