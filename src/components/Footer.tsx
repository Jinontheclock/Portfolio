import type { CSSProperties } from 'react';
import { Page } from '../types';
import RevealLine, { RevealHLine } from './RevealLine';

type FooterProps = {
  onNavigate: (page: Page) => void;
  onArchiveClick?: () => void;
  top?: number; // allow positioning override per page
  showTopLine?: boolean;
};

const textButton =
  "absolute -translate-x-full font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-black-normal text-[16px] text-right bg-transparent border-none cursor-pointer";

const GAP = 96; // distance from top line to nav text AND from copyright to bottom for symmetry
const COPYRIGHT_TOP = 180;
const FOOTER_LEFT = 24;
const FOOTER_RIGHT = 24;
const FOOTER_WIDTH = `calc(100% - ${FOOTER_LEFT + FOOTER_RIGHT}px)`;
const FOOTER_TOP_LINE = 0;
const PROJECT_LEFT = 'calc(62.5% + 73px)';
const ABOUT_LEFT = 'calc(62.5% + 56px)';
const LINKEDIN_LEFT = 'calc(75% + 70px)';
const GITHUB_LEFT = 'calc(75% + 61px)';
const ARCHIVE_LEFT = 'calc(75% + 63px)';
const LINE_LEFT_PRIMARY = 'calc(75% - 6px)';
const LINE_LEFT_SECONDARY = 'calc(62.5% - 3px)';
const COPYRIGHT_LEFT = 'calc(62.5% + 138px)';

export default function Footer({ onNavigate, onArchiveClick = () => {}, top = 3528, showTopLine = true }: FooterProps) {
  const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');
  const baseTop = top;
  const offset = (value: number) => ({ top: value });

  return (
    <div
      className="absolute"
      style={{
        left: FOOTER_LEFT,
        top: baseTop,
        width: FOOTER_WIDTH,
        height: `calc(${COPYRIGHT_TOP}px + ${GAP}px)`,
      }}
    >
      {showTopLine && (
        <RevealHLine className="absolute left-0 right-0" style={offset(FOOTER_TOP_LINE)} color="var(--color-black-normal)" thickness={1} />
      )}

      <button
        type="button"
        onClick={() => onNavigate('projects')}
        className={textButton}
        style={{ ...offset(GAP), left: PROJECT_LEFT }}
      >
        Projects
      </button>

      <button
        type="button"
        onClick={() => onNavigate('about')}
        className={textButton}
        style={{ ...offset(GAP + 24), left: ABOUT_LEFT }}
      >
        About
      </button>

      <button
        type="button"
        onClick={() => openExternal('https://www.linkedin.com/in/hajin-lee-ca')}
        className={textButton}
        style={{ ...offset(GAP), left: LINKEDIN_LEFT }}
        aria-label="Open LinkedIn profile (new tab)"
      >
        LinkedIn
      </button>

      <button
        type="button"
        onClick={() => openExternal('https://github.com/Jinontheclock')}
        className={textButton}
        style={{ ...offset(GAP + 24), left: GITHUB_LEFT }}
        aria-label="Open GitHub profile (new tab)"
      >
        GitHub
      </button>

      <button
        type="button"
        onClick={onArchiveClick}
        className={textButton}
        style={{ ...offset(GAP + 48), left: ARCHIVE_LEFT }}
      >
        Archive
      </button>

      <RevealLine
        height={100}
        className="absolute"
        style={{ left: LINE_LEFT_PRIMARY, top: GAP }}
        color="var(--color-black-normal)"
        thickness={1}
        delayMs={80}
      />

      <RevealLine
        height={100}
        className="absolute"
        style={{ left: LINE_LEFT_SECONDARY, top: GAP }}
        color="var(--color-black-normal)"
        thickness={1}
        delayMs={120}
      />

      <p
        className="-translate-x-full absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-black-normal text-[16px] text-right"
        style={{ ...offset(COPYRIGHT_TOP), left: COPYRIGHT_LEFT }}
      >
        © Hajin Lee 2026
      </p>
    </div>
  );
}
