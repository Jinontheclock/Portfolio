import { useEffect, useRef, useState } from 'react';
import imgLogoGif from '../assets/common/hajin_icon.gif';
import { Language, Page } from '../types';

type HeaderProps = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

const NAV_TOP = 24;
const NAV_GAP = 152; // distance between Projects and About
const NAV_LEFT_BASE = 'calc(75% - 18px)';
const navBase =
  "absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-black-normal text-[16px] cursor-pointer bg-transparent border-none z-10";

const activeUnderline = 'underline [text-decoration-skip-ink:none] decoration-solid';

export default function Header({ currentPage, language, onNavigate, onLanguageChange }: HeaderProps) {
  const [staticSrc, setStaticSrc] = useState<string>(imgLogoGif); // first frame
  const [lastFrameSrc, setLastFrameSrc] = useState<string>(imgLogoGif); // will be updated
  const [logoSrc, setLogoSrc] = useState<string>(imgLogoGif);
  const captureRef = useRef<number | null>(null);
  const hoverStopRef = useRef<number | null>(null);
  const navigateRef = useRef<number | null>(null);
  const GIF_DURATION_MS = 1000; // actual gif length ~1s

  // Capture first and last frames
  useEffect(() => {
    const img = new Image();
    img.src = imgLogoGif;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      // first frame
      ctx.drawImage(img, 0, 0);
      const first = canvas.toDataURL('image/png');
      setStaticSrc(first);
      setLogoSrc(first);
      // capture near end (best effort)
      captureRef.current = window.setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const last = canvas.toDataURL('image/png');
        setLastFrameSrc(last);
      }, GIF_DURATION_MS - 50);
    };
    return () => {
      if (captureRef.current) window.clearTimeout(captureRef.current);
    };
  }, []);

  const startLooping = (forceRestart = false) => {
    if (hoverStopRef.current) {
      window.clearTimeout(hoverStopRef.current);
      hoverStopRef.current = null;
    }
    // If not forcing, only restart when currently frozen on a frame
    if (!forceRestart && logoSrc.endsWith('.gif') && logoSrc.includes('cb=')) {
      return;
    }
    setLogoSrc(`${imgLogoGif}?cb=${Date.now()}`); // restart GIF; it will loop while displayed
  };

  const stopAfterOne = () => {
    if (hoverStopRef.current) window.clearTimeout(hoverStopRef.current);
    hoverStopRef.current = window.setTimeout(() => {
      setLogoSrc(lastFrameSrc || staticSrc);
      hoverStopRef.current = null;
    }, GIF_DURATION_MS);
  };

  const handleLogoClick = () => {
    startLooping(true); // always restart animation on click
    if (navigateRef.current) window.clearTimeout(navigateRef.current);
    navigateRef.current = window.setTimeout(() => {
      setLogoSrc(lastFrameSrc || staticSrc);
      onNavigate('home');
      navigateRef.current = null;
    }, GIF_DURATION_MS);
  };

  useEffect(
    () => () => {
      if (captureRef.current) window.clearTimeout(captureRef.current);
      if (hoverStopRef.current) window.clearTimeout(hoverStopRef.current);
      if (navigateRef.current) window.clearTimeout(navigateRef.current);
    },
    []
  );

  const languageButtonClass = (lang: Language) =>
    `cursor-pointer bg-transparent border-none leading-[normal] ${language === lang ? activeUnderline : ''}`;
  const isProjectsActive = currentPage === 'projects' || currentPage === 'iceland' || currentPage === 'tinypaws';

  return (
    <header className="relative h-[96px]">
      <button
        onClick={handleLogoClick}
        className="absolute left-[24px] size-[48px] top-[24px] cursor-pointer z-10"
        aria-label="Go to home"
        onMouseEnter={() => startLooping(false)}
        onMouseLeave={stopAfterOne}
      >
        <img alt="Logo" className="size-full object-cover" src={logoSrc} />
      </button>

      <button
        onClick={() => onNavigate('projects')}
        className={`${navBase} ${isProjectsActive ? activeUnderline : ''}`}
        style={{ left: NAV_LEFT_BASE as string, top: NAV_TOP }}
      >
        <span className={`nav-underline ${isProjectsActive ? 'is-active' : ''}`}>Projects</span>
      </button>

      <button
        onClick={() => onNavigate('about')}
        className={`${navBase} ${currentPage === 'about' ? activeUnderline : ''}`}
        style={{ left: `calc(${NAV_LEFT_BASE} + ${NAV_GAP}px)`, top: NAV_TOP }}
      >
        <span className={`nav-underline ${currentPage === 'about' ? 'is-active' : ''}`}>About</span>
      </button>

      <div className="absolute top-[24px] right-[24px] flex items-center gap-[6px] text-[10px] whitespace-nowrap z-10">
        <button onClick={() => onLanguageChange('EN')} className={languageButtonClass('EN')}>
          EN
        </button>
        <span className="leading-[normal]">|</span>
        <button onClick={() => onLanguageChange('JP')} className={languageButtonClass('JP')}>
          JP
        </button>
        <span className="leading-[normal]">|</span>
        <button onClick={() => onLanguageChange('KR')} className={languageButtonClass('KR')}>
          KR
        </button>
      </div>
    </header>
  );
}
