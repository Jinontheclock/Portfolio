import type { CSSProperties } from 'react';
import { Page } from '../types';

type FooterProps = {
  onNavigate: (page: Page) => void;
  onArchiveClick?: () => void;
  top?: number; // allow positioning override per page
};

const textButton =
  "absolute -translate-x-full font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-black-normal text-[16px] text-right bg-transparent border-none cursor-pointer";

const lineBase =
  'absolute flex h-[104px] items-center justify-center w-0';

export default function Footer({ onNavigate, onArchiveClick = () => {}, top = 3528 }: FooterProps) {
  const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');
  const baseTop = top;
  const offset = (value: number) => ({ top: value });

  return (
    <div className="absolute left-[24px]" style={{ top: baseTop, width: 'calc(100% - 48px)' }}>
      <div className="absolute h-0 left-0 right-0" style={offset(0)}>
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1.00012">
            <line id="Line 6" stroke="var(--stroke-0, #212222)" x1="0" x2="100%" y1="0.5" y2="0.500122" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('projects')}
        className={`${textButton} left-[calc(62.5%+73px)]`}
        style={offset(96)}
      >
        Projects
      </button>

      <button
        type="button"
        onClick={() => onNavigate('about')}
        className={`${textButton} left-[calc(62.5%+56px)]`}
        style={offset(120)}
      >
        About
      </button>

      <button
        type="button"
        onClick={() => openExternal('https://www.linkedin.com/in/hajin-lee-ca')}
        className={`${textButton} left-[calc(75%+70px)]`}
        style={offset(96)}
        aria-label="Open LinkedIn profile (new tab)"
      >
        LinkedIn
      </button>

      <button
        type="button"
        onClick={() => openExternal('https://github.com/Jinontheclock')}
        className={`${textButton} left-[calc(75%+61px)]`}
        style={offset(120)}
        aria-label="Open GitHub profile (new tab)"
      >
        GitHub
      </button>

      <button
        type="button"
        onClick={onArchiveClick}
        className={`${textButton} left-[calc(75%+63px)]`}
        style={offset(144)}
      >
        Archive
      </button>

      <div
        className={`${lineBase} left-[calc(75%-6px)]`}
        style={{ ...offset(96), '--transform-inner-width': '1185', '--transform-inner-height': '18' } as CSSProperties}
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[100px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 1">
                <line id="Line 8" stroke="var(--stroke-0, #212222)" x2="160" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${lineBase} left-[calc(62.5%-3px)]`}
        style={{ ...offset(96), '--transform-inner-width': '1185', '--transform-inner-height': '18' } as CSSProperties}
      >
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[100px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 160 1">
                <line id="Line 8" stroke="var(--stroke-0, #212222)" x2="160" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <p
        className="-translate-x-full absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(62.5%+138px)] not-italic text-black-normal text-[16px] text-right"
        style={offset(180)}
      >
        © Hajin Lee 2026
      </p>
    </div>
  );
}
