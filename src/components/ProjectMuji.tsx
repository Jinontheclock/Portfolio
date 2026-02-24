import type { CSSProperties } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectHeader from './ProjectHeader';
import { Language, Page } from '../types';
import MujiBanner from '../assets/projects/muji/muji_banner.png';
import MujiTravel1 from '../assets/projects/muji/muji_travel1.png';
import MujiTravel2 from '../assets/projects/muji/muji_travel2.png';
import MujiTravel3 from '../assets/projects/muji/muji_travel3.png';
import MujiTravel4 from '../assets/projects/muji/muji_travel4.png';
import MujiTravel5 from '../assets/projects/muji/muji_travel5.png';
import MujiTravel6 from '../assets/projects/muji/muji_travel6.png';
import MujiTravel7 from '../assets/projects/muji/muji_travel7.png';
import MujiTravel8 from '../assets/projects/muji/muji_travel8.png';
import MujiTravel9 from '../assets/projects/muji/muji_travel9.png';
import MujiTravel10 from '../assets/projects/muji/muji_travel10.png';
import MujiTravel11 from '../assets/projects/muji/muji_travel11.png';
import MujiTravel12 from '../assets/projects/muji/muji_travel12.png';
import MujiPasta1 from '../assets/projects/muji/muji_pasta1.png';
import MujiPasta2 from '../assets/projects/muji/muji_pasta2.png';
import MujiPasta3 from '../assets/projects/muji/muji_pasta3.png';
import MujiPasta4 from '../assets/projects/muji/muji_pasta4.png';
import MujiPasta5 from '../assets/projects/muji/muji_pasta5.png';
import MujiPasta6 from '../assets/projects/muji/muji_pasta6.png';
import MujiPasta7 from '../assets/projects/muji/muji_pasta7.png';
import MujiPasta8 from '../assets/projects/muji/muji_pasta8.png';
import MujiPasta9 from '../assets/projects/muji/muji_pasta9.png';
import MujiPasta10 from '../assets/projects/muji/muji_pasta10.png';
import MujiXmas2 from '../assets/projects/muji/muji_xmas2.png';
import MujiXmas3 from '../assets/projects/muji/muji_xmas3.png';
import MujiXmas4 from '../assets/projects/muji/muji_xmas4.png';
import MujiXmas5 from '../assets/projects/muji/muji_xmas5.png';
import MujiXmas6 from '../assets/projects/muji/muji_xmas6.png';
import MujiXmas7 from '../assets/projects/muji/muji_xmas7.png';
import MujiTowel1 from '../assets/projects/muji/muji_towel1.png';
import MujiTowel2 from '../assets/projects/muji/muji_towel2.png';
import MujiTowel3 from '../assets/projects/muji/muji_towel3.png';
import MujiTowel5 from '../assets/projects/muji/muji_towel5.png';
import MujiTowel6 from '../assets/projects/muji/muji_towel6.png';
import MujiTowel7 from '../assets/projects/muji/muji_towel7.png';
import MujiTowel8 from '../assets/projects/muji/muji_towel8.png';
import MujiTowel9 from '../assets/projects/muji/muji_towel9.png';
import MujiTowel10 from '../assets/projects/muji/muji_towel10.png';
import MujiTowel11 from '../assets/projects/muji/muji_towel11.png';
import MujiTowel12 from '../assets/projects/muji/muji_towel12.png';
import MujiTaxfree1 from '../assets/projects/muji/muji_taxfree1.png';
import MujiTaxfree2 from '../assets/projects/muji/muji_taxfree2.png';
import MujiTaxfree3 from '../assets/projects/muji/muji_taxfree3.png';
import MujiTaxfree4 from '../assets/projects/muji/muji_taxfree4.png';
type Props = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

const MUJI_LAYOUT_BASE_HEIGHT = 7500;
const MUJI_FOOTER_TOP = MUJI_LAYOUT_BASE_HEIGHT - 300;

export default function ProjectMuji({ currentPage, language, onNavigate, onLanguageChange }: Props) {

  return (
    <div className="layout-viewport hide-scrollbar bg-grey-normal">
      <div className="layout-canvas" style={{ "--layout-base-height": `${MUJI_LAYOUT_BASE_HEIGHT}px` } as CSSProperties}>
        <div className="layout-canvas-inner">
          <div className="relative" style={{ minHeight: "var(--layout-base-height)" } as CSSProperties}>
            <div className="tinypaws-page-enter-overlay" aria-hidden>
              <span className="tinypaws-page-enter-overlay-base" />
            </div>
            <div className="tinypaws-page-enter-content">
            <Header currentPage={currentPage} language={language} onNavigate={onNavigate} onLanguageChange={onLanguageChange} />

            <div className="flex flex-col gap-0 -mt-20">
              <ProjectHeader
                title="Visual Merchandising"
                category="Retail Graphic"
                timeline="Campaign-based"
                tools={['Adobe InDesign', 'Adobe Illustrator']}
                role="MUJI Japan"
                roleLabel="Company"
                description={[
                  'A collection of in-store promotional POP and visual materials developed for MUJI Japan.',
                  'The work focuses on clear communication, consistent visual systems, and adapting designs across formats while maintaining brand restraint and functionality.',
                ]}
              />

              {/* Hero image */}
              <section className="px-7">
                <div className="flex justify-center">
                  <img
                    src={MujiBanner}
                    alt="MUJI overview"
                    className="w-full max-w-[1400px] h-auto"
                  />
                </div>
              </section>
            </div>

            <div>

            {/* Typography block */}
            <section className="px-7 pb-16 mt-20">
              <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">2024 MUJI to GO</h2>

                <div className="grid gap-6 pl-48">
                  <div>
                    <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Banner</p>
                    <div className="grid gap-4 mt-2">
                      <div className="grid grid-cols-1 gap-4 max-w-[980px]">
                      {[MujiTravel1, MujiTravel2, MujiTravel3, MujiTravel4].map((src, idx) => (
                        <img
                          key={src}
                          src={src}
                          alt={`MUJI travel visual ${idx + 1}`}
                          className="w-full h-auto block"
                        />
                      ))}
                      </div>

                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3] mt-8">POP</p>
                      <div className="grid grid-cols-[1fr_1fr_0.42fr] gap-4 items-start max-w-[1240px]">
                        {[
                          { src: MujiTravel5, id: 5 },
                          { src: MujiTravel6, id: 6 },
                          { src: MujiTravel10, id: 10 },
                        ].map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={`MUJI travel visual ${item.id}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4 max-w-[980px]">
                        {[
                          { src: MujiTravel7, id: 7 },
                          { src: MujiTravel8, id: 8 },
                          { src: MujiTravel9, id: 9 },
                        ].map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={`MUJI travel visual ${item.id}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>
                    </div>

                    <p className="type-heading-3 text-black-normal m-0 leading-[1.3] mt-8">Brochure</p>
                    <div className="grid grid-cols-2 gap-4 items-start max-w-[980px] mt-2">
                      {[
                        { src: MujiTravel11, id: 11 },
                        { src: MujiTravel12, id: 12 },
                      ].map((item) => (
                        <img
                          key={item.src}
                          src={item.src}
                          alt={`MUJI travel visual ${item.id}`}
                          className="w-full h-auto block"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-7 pb-16 mt-8">
              <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">2024 Pasta promotion</h2>
                <div className="grid gap-6 pl-48">
                  <div>
                    <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Banner</p>
                    <div className="grid grid-cols-[1.42fr_1.79fr_1.99fr] gap-4 max-w-[1240px] mt-2 items-start">
                      {[MujiPasta10, MujiPasta9, MujiPasta8].map((src, idx) => (
                        <img
                          key={src}
                          src={src}
                          alt={`MUJI pasta banner ${10 - idx}`}
                          className="w-full h-auto block"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">POP</p>
                    <div className="grid gap-4 max-w-[1240px] mt-2">
                      <div className="grid grid-cols-[1.98fr_1.42fr_1fr] gap-4 items-start">
                        {[MujiPasta1, MujiPasta2, MujiPasta3].map((src, idx) => (
                          <img
                            key={src}
                            src={src}
                            alt={`MUJI pasta POP ${idx + 1}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-[1.78fr_1.42fr_1.98fr] gap-4 items-start">
                        {[MujiPasta4, MujiPasta5, MujiPasta6].map((src, idx) => (
                          <img
                            key={src}
                            src={src}
                            alt={`MUJI pasta POP ${idx + 4}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>
                      <div className="max-w-[980px]">
                        <img
                          src={MujiPasta7}
                          alt="MUJI pasta POP 7"
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-7 pb-16 mt-8">
              <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">2023 Chirstmas promotion</h2>
                <div className="grid gap-6 pl-48">
                  <div>
                    <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Banner</p>
                    <div className="grid gap-4 max-w-[1240px] mt-2">
                      <div className="grid grid-cols-[2.03fr_0.5fr] gap-4 items-start">
                        {[
                          { src: MujiXmas2, id: 2 },
                          { src: MujiXmas4, id: 4 },
                        ].map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={`MUJI christmas banner ${item.id}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>

                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">POP</p>
                      <div className="grid grid-cols-[0.71fr_1fr_1fr_1fr] gap-4 items-start">
                        {[
                          { src: MujiXmas3, id: 3 },
                          { src: MujiXmas5, id: 5 },
                          { src: MujiXmas6, id: 6 },
                          { src: MujiXmas7, id: 7 },
                        ].map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={`MUJI christmas POP ${item.id}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-7 pb-16 mt-8">
              <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">2023 Towel promotion</h2>
                <div className="grid gap-6 pl-48">
                  <div>
                    <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Banner</p>
                    <div className="grid gap-4 w-full mt-2">
                      <div className="grid grid-cols-[2fr_1fr] gap-4 items-start">
                        {[
                          { src: MujiTowel1, id: 1 },
                          { src: MujiTowel2, id: 2 },
                        ].map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={`MUJI towel banner ${item.id}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 items-start">
                        {[
                          { src: MujiTowel3, id: 3 },
                          { src: MujiTowel5, id: 5 },
                        ].map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={`MUJI towel banner ${item.id}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 items-start">
                        {[
                          { src: MujiTowel6, id: 6 },
                          { src: MujiTowel7, id: 7 },
                        ].map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={`MUJI towel banner ${item.id}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>

                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3] mt-8">POP</p>
                      <div className="grid grid-cols-3 gap-4 items-start">
                        {[
                          { src: MujiTowel8, id: 8 },
                          { src: MujiTowel9, id: 9 },
                          { src: MujiTowel10, id: 10 },
                        ].map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={`MUJI towel POP ${item.id}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-4 items-start">
                        {[
                          { src: MujiTowel11, id: 11 },
                          { src: MujiTowel12, id: 12 },
                        ].map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={`MUJI towel POP ${item.id}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-7 pb-16 mt-8">
              <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">Tax-free Information</h2>
                <div className="grid gap-6 pl-48">
                  <div>
                    <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Banner</p>
                    <div className="grid gap-4 w-full mt-2">
                      <div className="grid grid-cols-[416fr_708fr_712fr_702fr] gap-4 items-start">
                        {[
                          { src: MujiTaxfree1, id: 1 },
                          { src: MujiTaxfree2, id: 2 },
                          { src: MujiTaxfree3, id: 3 },
                          { src: MujiTaxfree4, id: 4 },
                        ].map((item) => (
                          <img
                            key={item.src}
                            src={item.src}
                            alt={`MUJI tax-free banner ${item.id}`}
                            className="w-full h-auto block"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Footer onNavigate={onNavigate} top={MUJI_FOOTER_TOP} />

            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
