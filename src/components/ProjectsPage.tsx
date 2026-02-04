import Header from './Header';
import Footer from './Footer';
import { Language, Page } from '../types';
import React from 'react';

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

const rows = [
  {
    top: 696,
    workType: 'App & Website',
    title: 'Individual Project',
    role: 'Independent',
    year: '2026',
  },
  {
    top: 744,
    workType: 'App',
    title: 'ProLog',
    role: 'UI Developer',
    year: '2025',
  },
  {
    top: 792,
    workType: 'Website',
    title: 'TinyPaws',
    role: 'UI/UX Designer',
    year: '2025',
  },
  {
    top: 864,
    workType: 'Magazine',
    title: 'Best of Iceland',
    role: 'Independent',
    year: '2025',
  },
  {
    top: 912,
    workType: 'Package',
    title: 'Matcha Drinks',
    role: 'Independent',
    year: '2025',
  },
  {
    top: 960,
    workType: 'Motion',
    title: 'StarLink',
    role: 'Independent',
    year: '2025',
  },
  {
    top: 1008,
    workType: 'Poster',
    title: 'Ikea',
    role: 'Independent',
    year: '2025',
  },
  {
    top: 1080,
    workType: 'Promotional Material',
    title: 'MUJI',
    role: 'VMD',
    year: '2024',
  },
];

export default function ProjectsPage({ currentPage, language, onNavigate, onLanguageChange }: ProjectsPageProps) {
  return (
    <div className="layout-viewport hide-scrollbar">
      <div className="layout-canvas">
        <div className="layout-canvas-inner">
          <div className="relative min-h-[1480px] bg-grey-normal">
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

            {rows.map((row) => (
              <React.Fragment key={row.top}>
                <p
                  className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-black-normal text-[24px] ${columnLeft.workType}`}
                  style={{ top: row.top }}
                >
                  {row.workType}
                </p>
                <p
                  className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-black-normal text-[24px] ${columnLeft.title}`}
                  style={{ top: row.top }}
                >
                  {row.title}
                </p>
                <p
                  className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-black-normal text-[24px] ${columnLeft.role}`}
                  style={{ top: row.top }}
                >
                  {row.role}
                </p>
                <p
                  className={`absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold leading-[normal] text-black-normal text-[24px] ${columnLeft.year}`}
                  style={{ top: row.top }}
                >
                  {row.year}
                </p>
              </React.Fragment>
            ))}

            {/* Footer for this page sits near the bottom of the list */}
            <Footer onNavigate={onNavigate} top={1200} />
          </div>
        </div>
      </div>
    </div>
  );
}
