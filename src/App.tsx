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
import { useState } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectsPage from "./components/ProjectsPage";
import AboutPage from "./components/AboutPage";
import { Language, Page } from "./types";

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

function InspirationLines() {
  return (
    <>
      {/* Line 1: full width */}
      <div className="absolute left-[24px] right-[24px] top-[840px] h-0 border-t border-[#212222]" />
      {/* Line 2: starts after the inspirations label */}
      <div className="absolute left-[180px] right-[24px] top-[864px] h-0 border-t border-[#212222]" />
      {/* Remaining lines */}
      <div
        className="pointer-events-none absolute left-[24px] right-[24px] top-[888px] h-[480px]"
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, #212222 0, #212222 1px, transparent 1px, transparent 24px)',
        }}
      />
    </>
  );
}

function Bauhaus() {
  return (
    <a className="absolute block cursor-pointer left-[calc(12.5%+9px)] size-[100px] top-[912px] transition-transform duration-300 ease-out hover:scale-[1.6] origin-center" data-name="Bauhaus 2" href="https://www.bauhaus.de/en/">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBauhaus2} />
    </a>
  );
}

function DieterRams() {
  return (
    <a className="absolute block cursor-pointer left-[calc(25%+133px)] size-[100px] top-[1080px] transition-transform duration-300 ease-out hover:scale-[1.6] origin-center" data-name="DieterRams 2" href="https://rams-foundation.org">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDieterRams2} />
    </a>
  );
}

function HomepageEstablishHierarchy2X() {
  return (
    <a className="absolute block cursor-pointer h-[63px] left-[calc(50%+65px)] top-[1240px] w-[100px] transition-transform duration-300 ease-out hover:scale-[1.6] origin-center" data-name="homepage-establish-hierarchy@2x 2" href="https://developer.apple.com/design/human-interface-guidelines">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHomepageEstablishHierarchy2X2} />
    </a>
  );
}

function Rei() {
  return (
    <a className="absolute block cursor-pointer left-[calc(87.5%-10px)] size-[100px] top-[1222px] transition-transform duration-300 ease-out hover:scale-[1.6] origin-center" data-name="Rei 2" href="https://www.comme-des-garcons.com">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRei2} />
    </a>
  );
}

function Rick() {
  return (
    <a className="absolute block cursor-pointer h-[67px] left-[43px] top-[1176px] w-[100px] transition-transform duration-300 ease-out hover:scale-[1.6] origin-center" data-name="Rick 2" href="https://www.rickowens.eu/en/CA">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRick2} />
    </a>
  );
}

function Tadao() {
  return (
    <a className="absolute block cursor-pointer h-[66px] left-[calc(75%+41px)] top-[960px] w-[100px] transition-transform duration-300 ease-out hover:scale-[1.6] origin-center" data-name="tadao 2" href="https://tadaoandoo.tilda.ws">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgTadao2} />
    </a>
  );
}

function Virgil() {
  return (
    <a className="absolute block cursor-pointer left-[calc(50%+36px)] size-[100px] top-[864px] transition-transform duration-300 ease-out hover:scale-[1.6] origin-center" data-name="Virgil 2" href="https://www.youtube.com/watch?v=qie5VITX6eQ">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgVirgil2} />
    </a>
  );
}

function Image1() {
  return (
    <div className="absolute right-[24px] top-[1992px] size-[264px] group" data-name="image 24">
      <img
        alt=""
        className="pointer-events-none absolute inset-0 object-cover size-full transition duration-300 opacity-100 group-hover:opacity-0"
        src={imgProjTinyGrey}
      />
      <img
        alt=""
        className="pointer-events-none absolute inset-0 object-cover size-full transition duration-300 opacity-0 group-hover:opacity-100"
        src={imgProjTinyColor}
      />
    </div>
  );
}

function Image2() {
  return (
    <div className="absolute right-[24px] top-[2304px] size-[264px] group" data-name="image 33">
      <img
        alt=""
        className="pointer-events-none absolute inset-0 object-cover size-full transition duration-300 opacity-100 group-hover:opacity-0"
        src={imgProjIcelandGrey}
      />
      <img
        alt=""
        className="pointer-events-none absolute inset-0 object-cover size-full transition duration-300 opacity-0 group-hover:opacity-100"
        src={imgProjIcelandColor}
      />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute right-[24px] top-[1680px] size-[264px] group" data-name="image 21">
      <img
        alt=""
        className="pointer-events-none absolute inset-0 object-cover size-full transition duration-300 opacity-100 group-hover:opacity-0"
        src={imgProjPrologGrey}
      />
      <img
        alt=""
        className="pointer-events-none absolute inset-0 object-cover size-full transition duration-300 opacity-0 group-hover:opacity-100"
        src={imgProjPrologColor}
      />
    </div>
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

  return (
    <div className="layout-viewport hide-scrollbar">
        <div className="layout-canvas">
          <div className="layout-canvas-inner">
            <div className="relative min-h-[3850px]">
        <Header
          currentPage={currentPage}
          language={language}
          onNavigate={(page) => setCurrentPage(page)}
          onLanguageChange={(lang) => setLanguage(lang)}
        />

        <div className="absolute h-0 left-[calc(25%+18px)] right-[24px] top-[1656px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1038 1">
              <line id="Line 8" stroke="var(--stroke-0, white)" x1="0" x2="100%" y1="0.5" y2="0.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[calc(25%+18px)] right-[24px] top-[1968px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1038 1">
              <line id="Line 8" stroke="var(--stroke-0, white)" x1="0" x2="100%" y1="0.5" y2="0.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <p className="absolute type-title-1 left-[154px] text-black-normal top-[307px]">HAJIN</p>
        
        <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[727px] not-italic text-black-normal text-[18px] top-[484px] whitespace-nowrap">
          <p className="mb-0">VANCOUVER BASED</p>
          <p>UI/UX DESINGER</p>
        </div>
        
        <Group />
        
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
        <div className="absolute left-0 right-0 top-[1680px] h-[200px] group cursor-pointer">
          <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(25%+18px)] not-italic text-black-normal text-[18px] transition-colors duration-200 group-hover:text-[#256EFF]">
            (1)
          </p>
          <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(37.5%-9px)] right-[calc(37.5%+15px)] not-italic text-black-normal text-[0px] transition-colors duration-200 group-hover:text-[#256EFF]">
            <p className="type-heading-3 mb-0">ProLog</p>
            <p className="text-[18px] mb-0">Skilled trades apprenticeship app</p>
            <p className="text-[18px]">for progress tracking</p>
          </div>
        </div>

        {/* Project 2 group */}
        <div className="absolute left-0 right-0 top-[1992px] h-[200px] group cursor-pointer">
          <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(25%+18px)] not-italic text-black-normal text-[18px] transition-colors duration-200 group-hover:text-[#256EFF]">
            (2)
          </p>
          <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(37.5%-9px)] right-[calc(37.5%+15px)] not-italic text-black-normal text-[0px] transition-colors duration-200 group-hover:text-[#256EFF]">
            <p className="type-heading-3 mb-0">TinyPaws</p>
            <p className="text-[18px] mb-0">Cat adoption website</p>
            <p className="text-[18px]">for a rescue nonprofit</p>
          </div>
        </div>

        {/* Project 3 group */}
        <div className="absolute left-0 right-0 top-[2304px] h-[200px] group cursor-pointer">
          <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(25%+18px)] not-italic text-black-normal text-[18px] transition-colors duration-200 group-hover:text-[#256EFF]">
            (3)
          </p>
          <div className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[calc(37.5%-9px)] right-[calc(37.5%+15px)] not-italic text-black-normal text-[0px] transition-colors duration-200 group-hover:text-[#256EFF]">
            <p className="type-heading-3 mb-0">{` Best of Iceland`}</p>
            <p className="text-[18px] mb-0">G Adventure itinerary</p>
            <p className="text-[18px]">redesigned as a magazine</p>
          </div>
        </div>
        <div className="absolute h-0 left-[calc(25%+18px)] right-[24px] top-[1656px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1038 1">
              <line id="Line 8" stroke="var(--stroke-0, white)" x1="0" x2="100%" y1="0.5" y2="0.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[calc(25%+18px)] right-[24px] top-[1968px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1038 1">
              <line id="Line 8" stroke="var(--stroke-0, white)" x1="0" x2="100%" y1="0.5" y2="0.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[calc(25%+18px)] right-[24px] top-[1656px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1038 1">
              <line id="Line 10" stroke="var(--stroke-0, #212222)" x1="0" x2="100%" y1="0.5" y2="0.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[calc(25%+18px)] right-[24px] top-[1968px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1038 1">
              <line id="Line 10" stroke="var(--stroke-0, #212222)" x1="0" x2="100%" y1="0.5" y2="0.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[calc(25%+18px)] right-[24px] top-[2280px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1038 1">
              <line id="Line 10" stroke="var(--stroke-0, #212222)" x1="0" x2="100%" y1="0.5" y2="0.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[25px] right-[24px] top-[2592px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
              <line id="Line 19" stroke="var(--stroke-0, #212222)" x1="0" x2="100%" y1="0.5" y2="0.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
        <div className="absolute flex h-[192px] items-center justify-center left-[calc(75%-17px)] top-[2904px] w-0" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "18" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none">
            <div className="h-0 relative w-[192px]">
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 192 1">
                  <line id="Line 20" stroke="var(--stroke-0, #212222)" x2="192" y1="0.5" y2="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
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
        <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] leading-[normal] left-[24px] not-italic text-black-normal text-[24px] top-[844px]">inspirations</p>
        <Bauhaus />
        <DieterRams />
        <HomepageEstablishHierarchy2X />
        <Rei />
        <Rick />
        <Tadao />
        <Virgil />
        <Image1 />
        <Image2 />
        <Image />
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
