import imgBauhaus2 from "./assets/98248a16c49e0cee4b6b97d80c1ae3025468b5d7.png";
import imgDieterRams2 from "./assets/1e560d605ce3de7651e4f03fa05a25201a37af02.png";
import imgHomepageEstablishHierarchy2X2 from "./assets/a522343bdbee9e5fe1cfac41b370f3ffaeb11481.png";
import imgRei2 from "./assets/a771b976b8e33ee1454d01fb5f620ea74b08d172.png";
import imgRick2 from "./assets/10c445b9937ff5886d511a0c35dbd90450f6791a.png";
import imgTadao2 from "./assets/94ec395168fd9eb207275e6762f7f0ff0360fdf8.png";
import imgVirgil2 from "./assets/f0aa54e2232b7229379c44b76f3517073a2390bf.png";
import imgProjTinyGrey from "./assets/homepage_projects_tinypaws_gray.png";
import imgProjTinyColor from "./assets/homepage_projects_tinypaws_color.png";
import imgProjIcelandGrey from "./assets/homepage_projects_bestoficeland_gray.png";
import imgProjIcelandColor from "./assets/homepage_projects_bestoficeland_color.png";
import imgProjPrologGrey from "./assets/homepage_projects_prolog_gray.png";
import imgProjPrologColor from "./assets/homepage_projects_prolog_color.png";
import imgImg26161 from "./assets/hajin_homepage_about.png";
import imgArrow from "./assets/arrow.png";
import { useState, type CSSProperties } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectsPage from "./components/ProjectsPage";
import AboutPage from "./components/AboutPage";
import ProjectIceland from "./components/ProjectIceland";
import { Language, Page } from "./types";
import RevealLine, { RevealHLine } from "./components/RevealLine";

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

type InspirationItem = {
  img: string;
  href: string;
  label: string;
  top: number;
  left: string | number;
  width?: number;
  height?: number;
};

const INSPIRATION_ITEMS: InspirationItem[] = [
  { img: imgBauhaus2, href: "https://www.bauhaus.de/en/", label: "Bauhaus", top: 792, left: 'calc(12.5% + 9px)' },
  { img: imgDieterRams2, href: "https://rams-foundation.org", label: "Dieter Rams", top: 960, left: 'calc(25% + 133px)' },
  { img: imgHomepageEstablishHierarchy2X2, href: "https://developer.apple.com/design/human-interface-guidelines", label: "Apple HIG", top: 1120, left: 'calc(50% + 65px)', width: 100, height: 63 },
  { img: imgRei2, href: "https://www.comme-des-garcons.com", label: "Rei", top: 1102, left: 'calc(87.5% - 10px)' },
  { img: imgRick2, href: "https://www.rickowens.eu/en/CA", label: "Rick", top: 1056, left: 43, width: 100, height: 67 },
  { img: imgTadao2, href: "https://tadaoandoo.tilda.ws", label: "Tadao", top: 840, left: 'calc(75% + 41px)', width: 100, height: 66 },
  { img: imgVirgil2, href: "https://www.youtube.com/watch?v=qie5VITX6eQ", label: "Virgil", top: 744, left: 'calc(50% + 36px)' },
];

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
    top: 1680,
    title: 'ProLog',
    desc: ['Skilled trades apprenticeship app', 'for progress tracking'],
    skills: ['Product design', 'Mobile UX/UI design', 'Interface development'],
    skillsWidth: 262,
    image: { grey: imgProjPrologGrey, color: imgProjPrologColor },
  },
  {
    id: 2,
    top: 1992,
    title: 'TinyPaws',
    desc: ['Cat adoption website', 'for a rescue nonprofit'],
    skills: ['Product design', 'WordPress Web design', 'Brand identity'],
    skillsWidth: 248,
    image: { grey: imgProjTinyGrey, color: imgProjTinyColor },
  },
  {
    id: 3,
    top: 2304,
    title: 'Best of Iceland',
    desc: ['G Adventure itinerary', 'redesigned as a magazine'],
    skills: ['Editorial design', 'Visual storytelling', 'Print-ready composition'],
    skillsWidth: 217,
    image: { grey: imgProjIcelandGrey, color: imgProjIcelandColor },
  },
];

function InspirationLines() {
  return (
    <>
      {/* Line 1: full width */}
      <RevealHLine
        className="absolute left-[24px] right-[24px] top-[720px]"
        style={{ width: 'auto' }}
        color="#212222"
        thickness={1}
      />
      {/* Line 2: starts after the inspirations label */}
      <RevealHLine
        className="absolute left-[180px] right-[24px] top-[744px]"
        style={{ width: 'auto' }}
        color="#212222"
        thickness={1}
        delayMs={60}
      />
      {/* Remaining lines */}
      {Array.from({ length: 19 }).map((_, idx) => (
        <RevealHLine
          key={idx}
          className="absolute left-[24px] right-[24px]"
          style={{ top: `${768 + idx * 24}px`, width: 'auto' }}
          color="#212222"
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
      {INSPIRATION_ITEMS.map((item) => (
        <a
          key={item.label}
          className="absolute block cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.6] origin-center"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          style={{ top: item.top, left: item.left, width: item.width ?? 100, height: item.height ?? 100 }}
        >
          <img alt={item.label} className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={item.img} />
        </a>
      ))}
    </>
  );
}

function ProjectBlocks({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      {PROJECTS.map((proj) => (
        <div key={proj.id}>
          <div className="absolute left-0 right-0 group cursor-pointer" style={{ top: proj.top, height: 200 }} onClick={() => proj.id === 3 ? onNavigate('iceland') : null}>
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(25%+18px)] not-italic text-black-normal text-[18px] transition-colors duration-200 group-hover:text-[#256EFF]">
              ({proj.id})
            </p>
            <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(37.5%-9px)] right-[calc(37.5%+15px)] not-italic text-black-normal text-[0px] transition-colors duration-200 group-hover:text-[#256EFF]">
              <p className="type-heading-3 mb-0">{proj.title}</p>
              {proj.desc.map((line) => (
                <p key={line} className="text-[18px] mb-0">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div
            className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-black-normal text-[18px] whitespace-pre-wrap"
            style={{ left: 'calc(62.5% - 15px)', top: proj.top, width: proj.skillsWidth }}
          >
            {proj.skills.map((line) => (
              <p key={line} className="mb-0">
                {line}
              </p>
            ))}
          </div>

          <div className="absolute right-[24px] size-[264px] group" style={{ top: proj.top }} onClick={() => proj.id === 3 ? onNavigate('iceland') : null}>
            <img
              alt=""
              className="pointer-events-none absolute inset-0 object-cover size-full transition duration-300 opacity-100 group-hover:opacity-0"
              src={proj.image.grey}
            />
            <img
              alt=""
              className="pointer-events-none absolute inset-0 object-cover size-full transition duration-300 opacity-0 group-hover:opacity-100"
              src={proj.image.color}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [language, setLanguage] = useState<Language>('EN');

  if (currentPage === 'projects') {
    return (
      <ProjectsPage
        currentPage={currentPage}
        language={language}
        onNavigate={(page) => setCurrentPage(page)}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  if (currentPage === 'iceland') {
    return (
      <ProjectIceland
        currentPage={currentPage}
        language={language}
        onNavigate={(page) => setCurrentPage(page)}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  if (currentPage === 'about') {
    return (
      <AboutPage
        currentPage={currentPage}
        language={language}
        onNavigate={(page) => setCurrentPage(page)}
        onLanguageChange={(lang) => setLanguage(lang)}
      />
    );
  }

  const projectSeparators = [1656, 1968, 2280, 2592];

  return (
    <div className="layout-viewport hide-scrollbar">
      <div className="layout-canvas">
        <div className="layout-canvas-inner">
          <div
            className="relative"
            style={{ "--layout-base-height-home": "3850px", minHeight: "calc(var(--layout-base-height-home) * var(--layout-scale-height))" } as CSSProperties}
          >
        <Header
          currentPage={currentPage}
          language={language}
          onNavigate={(page) => setCurrentPage(page)}
          onLanguageChange={(lang) => setLanguage(lang)}
        />

        <p
          className="absolute type-title-1 text-black-normal"
          style={HERO_POS.title}
        >
          HAJIN
        </p>
        
        <div
          className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] not-italic text-black-normal text-[18px] whitespace-nowrap"
          style={HERO_POS.subtitle}
        >
          <p className="mb-0">VANCOUVER BASED</p>
          <p>UI/UX DESINGER</p>
        </div>
        
        {/* Removed arrow icon as requested */}
        
        <button
          onClick={() => setCurrentPage('projects')}
          className="absolute left-[24px] top-[1560px] flex items-center gap-[12px] cursor-pointer bg-transparent border-none p-0"
          aria-label="Go to Projects"
        >
          <p className="type-heading-2 text-black-normal m-0 leading-[1.2]">Projects</p>
          <img src={imgArrow} alt="" className="w-6 h-6 object-contain translate-y-[2px]" />
        </button>
        <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(25%+18px)] not-italic text-black-normal text-[18px] top-[1571px] w-[916px] whitespace-pre-wrap">A selection of highlighted projects showcasing recent work across UX/UI, web, and visual design.</p>
        <button
          onClick={() => setCurrentPage('about')}
          className="absolute left-[24px] top-[2784px] flex items-center gap-[12px] cursor-pointer bg-transparent border-none p-0"
          aria-label="Go to About"
        >
          <p className="type-heading-2 text-black-normal m-0 leading-[1.2]">About</p>
          <img src={imgArrow} alt="" className="w-6 h-6 object-contain translate-y-[2px]" />
        </button>
        <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(62.5%-15px)] not-italic text-black-normal text-[18px] top-[1680px] w-[262px] whitespace-pre-wrap">
          <p className="mb-0">Product design</p>
          <p className="mb-0">Mobile UX/UI design</p>
          <p>Interface development</p>
        </div>
        <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(62.5%-15px)] not-italic text-black-normal text-[18px] top-[1992px] w-[248px] whitespace-pre-wrap">
          <p className="mb-0">Product design</p>
          <p className="mb-0">WordPress Web design</p>
          <p>Brand identity</p>
        </div>
        <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(62.5%-15px)] not-italic text-black-normal text-[18px] top-[2304px] w-[217px] whitespace-pre-wrap">
          <p className="mb-0">Editorial design</p>
          <p className="mb-0">Visual storytelling</p>
          <p>Print-ready composition</p>
        </div>
        {/* Project 1 group */}
        <ProjectBlocks onNavigate={setCurrentPage} />
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
          className="left-[calc(75%-17px)] top-[2904px]"
          color="var(--color-black-normal)"
          delayMs={80}
        />
        <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(25%+18px)] not-italic text-black-normal text-[18px] top-[2784px] w-[531px] whitespace-pre-wrap">
          <p className="mb-0">Grounded in visual clarity and practical usability,</p>
          <p className="mb-0">design is approached as a way to simplify digital experiences.</p>
          <p className="mb-0">Each interface is shaped with structure and intention,</p>
          <p>keeping both users and real-world execution in mind.</p>
        </div>
        <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] h-[24px] leading-[normal] left-[calc(75%-6px)] not-italic text-black-normal text-[18px] top-[2904px] w-[483px] whitespace-pre-wrap">UX/UI Design for Digital Products</p>
        <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] h-[37px] leading-[normal] left-[calc(75%-6px)] not-italic text-black-normal text-[18px] top-[3048px] w-[483px] whitespace-pre-wrap">
          <p className="mb-0">Front-End Development</p>
          <p>{`& AI-Assisted Prototyping`}</p>
        </div>
        <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] h-[37px] leading-[normal] left-[calc(75%-6px)] not-italic text-black-normal text-[18px] top-[2952px] w-[483px] whitespace-pre-wrap">{`Graphic Design & Layout Composition`}</p>
        <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] h-[37px] leading-[normal] left-[calc(75%-6px)] not-italic text-black-normal text-[18px] top-[3000px] w-[483px] whitespace-pre-wrap">{`Brand Identity & Visual Systems`}</p>
        <img
          alt=""
          src={imgImg26161}
          className="absolute left-[24px] top-[2904px] grayscale pointer-events-none"
          style={{ transform: 'scale(0.56)', transformOrigin: 'top left' }}
        />
        <InspirationLines />
        <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[24px] not-italic text-black-normal text-[24px] top-[724px]">inspirations</p>
        <InspirationImages />
        <Footer
          onNavigate={(page) => setCurrentPage(page)}
          onArchiveClick={() => {}}
          top={3560}
        />
          </div>
        </div>
      </div>
    </div>
  );
}
