import Header from './Header';
import Footer from './Footer';
import { Language, Page } from '../types';
import React, { type CSSProperties } from 'react';

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
  year: 'left-[calc(87.5%+94px)]',
};

const ROW_START = 696;
const ROW_GAP = 48;
const rows = [
  { offset: 0, workType: 'App & Website', title: 'Individual Project', role: 'Independent', year: '2026' },
  { offset: 1, workType: 'App', title: 'ProLog', role: 'UI Developer', year: '2025' },
  { offset: 2, workType: 'Website', title: 'TinyPaws', role: 'UI/UX Designer', year: '2025' },
  { offset: 3, workType: 'Magazine', title: 'Best of Iceland', role: 'Independent', year: '2025' },
  { offset: 4, workType: 'Package', title: 'Matcha Drinks', role: 'Independent', year: '2025' },
  { offset: 5, workType: 'Motion', title: 'StarLink', role: 'Independent', year: '2025' },
  { offset: 6, workType: 'Poster', title: 'Ikea', role: 'Independent', year: '2025' },
  { offset: 7, workType: 'Promotional Material', title: 'MUJI', role: 'VMD', year: '2024' },
];

export default function ProjectsPage({ currentPage, language, onNavigate, onLanguageChange }: ProjectsPageProps) {
  return (
    <div className="layout-viewport hide-scrollbar">
      <div className="layout-canvas">
        <div className="layout-canvas-inner">
          <div
            className="relative bg-grey-normal"
            style={{ "--layout-base-height-projects": "1480px", minHeight: "calc(var(--layout-base-height-projects) * var(--layout-scale-height))" } as CSSProperties}
          >
            <Header
              currentPage={currentPage}
              language={language}
              onNavigate={onNavigate}
              onLanguageChange={onLanguageChange}
            />

            <p
              className="absolute type-title-2 left-[24px] text-black-normal top-[169px]"
              data-node-id="117:406"
            >
              Select work
            </p>
            <p
              className="absolute type-title-2 left-[24px] text-black-normal top-[337px]"
              data-node-id="117:458"
            >
              2024/current
            </p>

            {/* Column headers */}
            <p
              className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-medium leading-[normal] text-black-normal text-[18px] top-[648px] ${columnLeft.workType}`}
              data-node-id="117:409"
            >
              work type
            </p>
            <p
              className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-medium leading-[normal] text-black-normal text-[18px] top-[648px] ${columnLeft.title}`}
              data-node-id="117:407"
            >
              title
            </p>
            <p
              className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-medium leading-[normal] text-black-normal text-[18px] top-[648px] ${columnLeft.role}`}
              data-node-id="117:408"
            >
              role
            </p>
            <p
              className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-medium leading-[normal] text-black-normal text-[18px] top-[648px] ${columnLeft.year}`}
              data-node-id="117:410"
            >
              year
            </p>

            {rows.map((row) => {
              const top = ROW_START + row.offset * ROW_GAP;
              return (
              <React.Fragment key={row.offset}>
                <p
                  className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-black-normal text-[24px] ${columnLeft.workType}`}
                  style={{ top, cursor: row.title.includes('Iceland') || row.title.includes('TinyPaws') ? 'pointer' : 'default' }}
                  onClick={() => {
                    if (row.title.includes('Iceland')) onNavigate('iceland');
                    if (row.title.includes('TinyPaws')) onNavigate('tinypaws');
                  }}
                >
                  {row.workType}
                </p>
                <p
                  className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-black-normal text-[24px] ${columnLeft.title}`}
                  style={{ top, cursor: row.title.includes('Iceland') || row.title.includes('TinyPaws') ? 'pointer' : 'default' }}
                  onClick={() => {
                    if (row.title.includes('Iceland')) onNavigate('iceland');
                    if (row.title.includes('TinyPaws')) onNavigate('tinypaws');
                  }}
                >
                  {row.title}
                </p>
                <p
                  className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-black-normal text-[24px] ${columnLeft.role}`}
                  style={{ top, cursor: row.title.includes('Iceland') || row.title.includes('TinyPaws') ? 'pointer' : 'default' }}
                  onClick={() => {
                    if (row.title.includes('Iceland')) onNavigate('iceland');
                    if (row.title.includes('TinyPaws')) onNavigate('tinypaws');
                  }}
                >
                  {row.role}
                </p>
                <p
                  className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-black-normal text-[24px] ${columnLeft.year}`}
                  style={{ top, cursor: row.title.includes('Iceland') || row.title.includes('TinyPaws') ? 'pointer' : 'default' }}
                  onClick={() => {
                    if (row.title.includes('Iceland')) onNavigate('iceland');
                    if (row.title.includes('TinyPaws')) onNavigate('tinypaws');
                  }}
                >
                  {row.year}
                </p>
              </React.Fragment>
            );
            })}

            {/* Footer for this page sits near the bottom of the list */}
            <Footer onNavigate={onNavigate} top={1200} />
          </div>
        </div>
      </div>
    </div>
  );
}
