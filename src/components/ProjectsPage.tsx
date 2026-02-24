import Header from './Header';
import Footer from './Footer';
import { Language, Page } from '../types';
import React, { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import BestOfIcelandMockup5 from '../assets/projects/iceland/BestofIceland_mockup5.png';
import PrologMockup from '../assets/projects/prolog/prolog_mockup1.png';
import TinypawsMockup from '../assets/projects/tinypaws/tinypaws_mockup.png';
import MujiThumbnail from '../assets/projects/muji/muji.jpeg';
import ArchiveHouseResult2 from '../assets/projects/archivehouse/archivehouse_result2.png';
import VeilanceResult2 from '../assets/projects/archiveofveilance/veilance_result2.png';
import MatchaMockup4 from '../assets/projects/matcha/matcha_mockup4.png';

type ProjectsPageProps = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

const columnLeft = {
  workType: 'left-[24px]',
  title: 'left-[calc(25%+18px)]',
  role: 'left-[calc(75%+6px)]',
  year: 'right-[32px]',
};

const ROW_START = 696;
const ROW_GAP_WITHIN_CATEGORY = 40;
const ROW_GAP_BETWEEN_CATEGORIES = 80;
const FIRST_CATEGORY_LAST_OFFSET = 2;
const PROJECTS_PAGE_LAYOUT_BASE_HEIGHT = 1480;
const PROJECTS_PAGE_FOOTER_OFFSET = 280;
const PROJECTS_PAGE_FOOTER_TOP = PROJECTS_PAGE_LAYOUT_BASE_HEIGHT - PROJECTS_PAGE_FOOTER_OFFSET;
const columnWidths = {
  workType: 'calc(25% - 14px)',
  title: 'calc(50% - 20px)',
  role: 'calc(25% - 130px)',
  year: 84,
};
type ProjectRow = {
  offset: number;
  workType: string;
  title: string;
  role: string;
  year: string;
  hidden?: boolean;
  page?: Page;
  thumbnail?: string;
  hoverThumbnailWidth?: number;
  hoverThumbnailHeight?: number;
};

const rows: ProjectRow[] = [
  { offset: 0, workType: 'App & Website', title: 'Individual Project', role: 'Independent', year: '2026', hidden: true },
  { offset: 1, workType: 'App', title: 'ProLog', role: 'UI Developer', year: '2025', page: 'prolog', thumbnail: PrologMockup },
  { offset: 2, workType: 'Website', title: 'TinyPaws', role: 'UI/UX Designer', year: '2025', page: 'tinypaws', thumbnail: TinypawsMockup },
  { offset: 3, workType: 'Brochure', title: 'Best of Iceland', role: 'Independent', year: '2025', page: 'iceland', thumbnail: BestOfIcelandMockup5 },
  {
    offset: 4,
    workType: 'Poster',
    title: 'Archive House',
    role: 'Independent',
    year: '2025',
    page: 'archivehouse',
    thumbnail: ArchiveHouseResult2,
    hoverThumbnailWidth: 252,
    hoverThumbnailHeight: 350,
  },
  {
    offset: 5,
    workType: 'Poster',
    title: 'Archive of Veilance',
    role: 'Independent',
    year: '2025',
    page: 'archiveofveliance',
    thumbnail: VeilanceResult2,
    hoverThumbnailWidth: 252,
    hoverThumbnailHeight: 350,
  },
  { offset: 6, workType: 'Motion', title: 'StarLink', role: 'Independent', year: '2025', hidden: true },
  { offset: 7, workType: 'Package', title: 'Matcha Latte', role: 'Independent', year: '2024', page: 'matchalatte', thumbnail: MatchaMockup4 },
  {
    offset: 8,
    workType: 'Promotional Material',
    title: 'MUJI',
    role: 'VMD',
    year: '2024',
    page: 'muji',
    thumbnail: MujiThumbnail,
    hoverThumbnailWidth: 240,
    hoverThumbnailHeight: 333,
  },
];
const HIDDEN_ROW_OFFSETS = rows.filter((row) => row.hidden).map((row) => row.offset);

function getRowTop(offset: number) {
  const hiddenRowsBefore = HIDDEN_ROW_OFFSETS.filter((hiddenOffset) => hiddenOffset < offset).length;

  if (offset <= FIRST_CATEGORY_LAST_OFFSET) {
    return ROW_START + offset * ROW_GAP_WITHIN_CATEGORY - hiddenRowsBefore * ROW_GAP_WITHIN_CATEGORY;
  }

  const firstCategoryCount = FIRST_CATEGORY_LAST_OFFSET + 1;
  const baseTop = (
    ROW_START +
    FIRST_CATEGORY_LAST_OFFSET * ROW_GAP_WITHIN_CATEGORY +
    ROW_GAP_BETWEEN_CATEGORIES +
    (offset - firstCategoryCount) * ROW_GAP_WITHIN_CATEGORY
  );
  return baseTop - hiddenRowsBefore * ROW_GAP_WITHIN_CATEGORY;
}

export default function ProjectsPage({ currentPage, language, onNavigate, onLanguageChange }: ProjectsPageProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement | null>(null);
  const visibleRows = rows.filter((row) => !row.hidden);
  const activeRow = rows.find((row) => row.offset === hoveredRow);
  const activeThumbnail = activeRow?.thumbnail;

  const handleRowClick = (row: ProjectRow) => {
    if (row.page) onNavigate(row.page);
  };

  const thumbnailWidth = activeRow?.hoverThumbnailWidth ?? 360;
  const thumbnailHeightEstimate = activeRow?.hoverThumbnailHeight ?? 500;
  const thumbOffsetX = 28;
  const thumbOffsetY = 24;
  const frameWidth = frameRef.current?.offsetWidth ?? 1440;
  const frameHeight = frameRef.current?.offsetHeight ?? 1480;
  const thumbnailLeft = Math.max(
    24,
    Math.min(cursorPosition.x + thumbOffsetX, frameWidth - thumbnailWidth - 24)
  );
  const thumbnailTop = Math.max(
    24,
    Math.min(cursorPosition.y - thumbOffsetY, frameHeight - thumbnailHeightEstimate - 24)
  );

  const updateCursorPosition = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    const scaleX = rect.width / frameRef.current.offsetWidth || 1;
    const scaleY = rect.height / frameRef.current.offsetHeight || 1;

    const localX = (event.clientX - rect.left) / scaleX;
    const localY = (event.clientY - rect.top) / scaleY;

    setCursorPosition({ x: localX, y: localY });
  };

  const renderTextReveal = (content: ReactNode, delayMs: number) => (
    <span
      className="project-header-reveal-line projects-text-reveal-line"
      style={{ ['--project-header-reveal-delay' as string]: `${delayMs}ms` } as CSSProperties}
    >
      <span className="project-header-reveal-text">{content}</span>
    </span>
  );

  return (
    <div className="layout-viewport hide-scrollbar">
      <div className="layout-canvas" style={{ "--layout-base-height": `${PROJECTS_PAGE_LAYOUT_BASE_HEIGHT}px` } as CSSProperties}>
        <div className="layout-canvas-inner">
          <div
            ref={frameRef}
            className="relative bg-grey-normal"
            style={{ minHeight: "var(--layout-base-height)" } as CSSProperties}
          >
            <div className="tinypaws-page-enter-overlay" aria-hidden>
              <span className="tinypaws-page-enter-overlay-base" />
            </div>
            <div className="tinypaws-page-enter-content">
            <Header
              currentPage={currentPage}
              language={language}
              onNavigate={onNavigate}
              onLanguageChange={onLanguageChange}
            />

            <p
              className="absolute type-title-2 left-[24px] text-black-normal top-[205px]"
              data-node-id="117:406"
            >
              {renderTextReveal('Select work', 980)}
            </p>
            <p
              className="absolute type-title-2 left-[24px] text-black-normal top-[373px]"
              data-node-id="117:458"
            >
              {renderTextReveal('2024/current', 1040)}
            </p>

            {/* Column headers */}
            <p
              className={`absolute z-[30] font-['Plus_Jakarta_Sans',sans-serif] font-medium leading-[normal] text-black-normal text-[18px] top-[648px] ${columnLeft.workType}`}
              style={{ width: columnWidths.workType, paddingLeft: 8 }}
              data-node-id="117:409"
            >
              {renderTextReveal('work type', 1120)}
            </p>
            <p
              className={`absolute z-[30] font-['Plus_Jakarta_Sans',sans-serif] font-medium leading-[normal] text-black-normal text-[18px] top-[648px] ${columnLeft.title}`}
              style={{ width: columnWidths.title, paddingLeft: 8 }}
              data-node-id="117:407"
            >
              {renderTextReveal('title', 1150)}
            </p>
            <p
              className={`absolute z-[30] font-['Plus_Jakarta_Sans',sans-serif] font-medium leading-[normal] text-black-normal text-[18px] top-[648px] ${columnLeft.role}`}
              style={{ width: columnWidths.role, paddingLeft: 8 }}
              data-node-id="117:408"
            >
              {renderTextReveal('role', 1180)}
            </p>
            <p
              className={`absolute z-[30] font-['Plus_Jakarta_Sans',sans-serif] font-medium leading-[normal] text-black-normal text-[18px] top-[648px] text-right ${columnLeft.year}`}
              style={{ width: columnWidths.year, paddingRight: 8 }}
              data-node-id="117:410"
            >
              {renderTextReveal('year', 1210)}
            </p>

            {activeThumbnail && (
              <div
                className="pointer-events-none absolute z-[20] transition-opacity duration-150 opacity-100"
                style={{ left: thumbnailLeft, top: thumbnailTop, width: thumbnailWidth }}
                aria-hidden
              >
                <img
                  src={activeThumbnail}
                  alt=""
                  className="w-full h-auto object-contain rounded-[2px] shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
                />
              </div>
            )}

            {visibleRows.map((row, visibleIndex) => {
              const top = getRowTop(row.offset);
              const isInteractive = Boolean(row.page);
              const isActive = hoveredRow === row.offset;
              const rowBaseDelay = 1260 + visibleIndex * 42;

              return (
                <div
                  key={row.offset}
                  className="absolute left-0 right-0 h-[32px] z-[30]"
                  style={{ top }}
                  onMouseEnter={(event) => {
                    setHoveredRow(row.offset);
                    updateCursorPosition(event);
                  }}
                  onMouseMove={updateCursorPosition}
                  onMouseLeave={() => setHoveredRow((value) => (value === row.offset ? null : value))}
                >
                  <p
                    className={`absolute projects-hover-cell ${columnLeft.workType} ${isActive ? 'is-active' : ''} font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-[24px]`}
                    style={{ width: columnWidths.workType, cursor: isInteractive ? 'pointer' : 'default' }}
                    onClick={() => handleRowClick(row)}
                  >
                    <span>{renderTextReveal(row.workType, rowBaseDelay)}</span>
                  </p>
                  <p
                    className={`absolute projects-hover-cell ${columnLeft.title} ${isActive ? 'is-active' : ''} font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-[24px]`}
                    style={{ width: columnWidths.title, cursor: isInteractive ? 'pointer' : 'default' }}
                    onClick={() => handleRowClick(row)}
                  >
                    <span>{renderTextReveal(row.title, rowBaseDelay + 18)}</span>
                  </p>
                  <p
                    className={`absolute projects-hover-cell ${columnLeft.role} ${isActive ? 'is-active' : ''} font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-[24px]`}
                    style={{ width: columnWidths.role, cursor: isInteractive ? 'pointer' : 'default' }}
                    onClick={() => handleRowClick(row)}
                  >
                    <span>{renderTextReveal(row.role, rowBaseDelay + 36)}</span>
                  </p>
                  <p
                    className={`absolute projects-hover-cell projects-hover-cell-year ${columnLeft.year} ${isActive ? 'is-active' : ''} font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-[24px]`}
                    style={{ width: columnWidths.year, cursor: isInteractive ? 'pointer' : 'default' }}
                    onClick={() => handleRowClick(row)}
                  >
                    <span>{renderTextReveal(row.year, rowBaseDelay + 54)}</span>
                  </p>
                </div>
              );
            })}

            {/* Footer for this page sits near the bottom of the list */}
            <Footer onNavigate={onNavigate} top={PROJECTS_PAGE_FOOTER_TOP} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
