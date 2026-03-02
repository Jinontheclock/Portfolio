import { Page } from '../types';
import RevealLine, { RevealHLine } from './RevealLine';

type FooterProps = {
  onNavigate: (page: Page) => void;
  onArchiveClick?: () => void;
  top?: number; // allow positioning override per page
  showTopLine?: boolean;
};

const textButton =
  "footer-nav-link absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-black-normal text-[16px] text-left bg-transparent border-none cursor-pointer p-0";

const GAP = 96;
const COPYRIGHT_TOP = 176;
const FOOTER_LEFT = 24;
const FOOTER_RIGHT = 24;
const FOOTER_WIDTH = `calc(100% - ${FOOTER_LEFT + FOOTER_RIGHT}px)`;
const FOOTER_TOP_LINE = 0;

const LINE_LEFT_PRIMARY = 'calc(75% - 6px)';
const LINE_LEFT_SECONDARY = 'calc(62.5% - 3px)';
const TEXT_INSET_FROM_LINE = 12;
const LEFT_COL_TEXT_LEFT = `calc(62.5% - 3px + ${TEXT_INSET_FROM_LINE}px)`;
const RIGHT_COL_TEXT_LEFT = `calc(75% - 6px + ${TEXT_INSET_FROM_LINE}px)`;
const COPYRIGHT_LEFT = RIGHT_COL_TEXT_LEFT;
const ARCHIVE_URL = 'https://pin.it/7KXHYfHYE';
const RESUME_URL = 'https://indd.adobe.com/view/9bde1168-a4cc-43bf-b74e-5120422cf3a2';
const EMAIL_ADDRESS = 'hajinlee.ca@gmail.com';

export default function Footer({ onNavigate, onArchiveClick = () => {}, top = 3528, showTopLine = true }: FooterProps) {
  void onNavigate;
  const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');
  const offset = (value: number) => ({ top: value });

  return (
    <div
      className="absolute"
      style={{
        left: FOOTER_LEFT,
        top,
        width: FOOTER_WIDTH,
        height: `calc(${COPYRIGHT_TOP}px + ${GAP}px)`,
      }}
    >
      {showTopLine && (
        <RevealHLine className="absolute left-0 right-0" style={offset(FOOTER_TOP_LINE)} color="var(--color-black-normal)" thickness={1} />
      )}

      <button
        type="button"
        onClick={() => openExternal('https://www.linkedin.com/in/hajin-lee-ca')}
        className={textButton}
        style={{ ...offset(GAP), left: LEFT_COL_TEXT_LEFT }}
        aria-label="Open LinkedIn profile (new tab)"
      >
        <span className="nav-underline">LinkedIn</span>
      </button>

      <button
        type="button"
        onClick={() => openExternal(RESUME_URL)}
        className={textButton}
        style={{ ...offset(GAP + 24), left: LEFT_COL_TEXT_LEFT }}
        aria-label="Open resume (new tab)"
      >
        <span className="nav-underline">Resume</span>
      </button>

      <button
        type="button"
        onClick={() => {
          window.location.href = `mailto:${EMAIL_ADDRESS}`;
        }}
        className={textButton}
        style={{ ...offset(GAP + 48), left: LEFT_COL_TEXT_LEFT }}
        aria-label="Write an email to Hajin Lee"
      >
        <span className="nav-underline">Email</span>
      </button>

      <button
        type="button"
        onClick={() => openExternal('https://github.com/Jinontheclock')}
        className={textButton}
        style={{ ...offset(GAP), left: RIGHT_COL_TEXT_LEFT }}
        aria-label="Open GitHub profile (new tab)"
      >
        <span className="nav-underline">GitHub</span>
      </button>

      <button
        type="button"
        onClick={() => {
          onArchiveClick();
          openExternal(ARCHIVE_URL);
        }}
        className={textButton}
        style={{ ...offset(GAP + 24), left: RIGHT_COL_TEXT_LEFT }}
      >
        <span className="nav-underline">Archive</span>
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
        className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-black-normal text-[16px] text-left"
        style={{ ...offset(COPYRIGHT_TOP), left: COPYRIGHT_LEFT }}
      >
        ©2026 Hajin Lee — Designed & built
      </p>
    </div>
  );
}
