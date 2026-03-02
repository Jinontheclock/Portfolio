import type { CSSProperties } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectHeader from './ProjectHeader';
import { Language, Page } from '../types';
import ArchiveHouseBanner from '../assets/projects/archivehouse/archivehouse_banner.webp';
import ArchiveHouseLogo from '../assets/projects/archivehouse/archivehouse_logo.webp';
import ArchiveHouseChair from '../assets/projects/archivehouse/archivehouse_chair.webp';
import ArchiveHouseGraphic1 from '../assets/projects/archivehouse/archivehouse_graphic1.webp';
import ArchiveHouseGraphic2 from '../assets/projects/archivehouse/archivehouse_graphic2.webp';
import ArchiveHouseGraphic3 from '../assets/projects/archivehouse/archivehouse_graphic3.webp';
import ArchiveHouseGraphic4 from '../assets/projects/archivehouse/archivehouse_graphic4.webp';
import ArchiveHouseGraphic5 from '../assets/projects/archivehouse/archivehouse_graphic5.webp';
import ArchiveHouseGraphic6 from '../assets/projects/archivehouse/archivehouse_graphic6.webp';
import ArchiveHouseGraphic7 from '../assets/projects/archivehouse/archivehouse_graphic7.webp';
import ArchiveHouseGraphic8 from '../assets/projects/archivehouse/archivehouse_graphic8.webp';
import ArchiveHouseResult1 from '../assets/projects/archivehouse/archivehouse_result1.webp';
import ArchiveHouseResult2 from '../assets/projects/archivehouse/archivehouse_result2.webp';
import ArchiveHouseResult3 from '../assets/projects/archivehouse/archivehouse_result3.webp';
import ArchiveHouseMockup1 from '../assets/projects/archivehouse/archivehouse_Mockup1.webp';
import ArchiveHouseMockup2 from '../assets/projects/archivehouse/archivehouse_Mockup2.webp';
import ArchiveHouseMockup3 from '../assets/projects/archivehouse/archivehouse_Mockup3.webp';
import ArchiveHouseMockup4 from '../assets/projects/archivehouse/archivehouse_Mockup4.webp';
import ArchiveHouseMockup5 from '../assets/projects/archivehouse/archivehouse_Mockup5.webp';
import ArchiveHouseMockup6 from '../assets/projects/archivehouse/archivehouse_Mockup6.webp';

type Props = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

const archiveTypographyScale: Array<{ label: string; value: string; sample: string; style: CSSProperties }> = [
  {
    label: 'H1',
    value: '80px Black Avenir',
    sample: 'Timeless form',
    style: { fontFamily: '"Avenir", "Plus Jakarta Sans", sans-serif', fontSize: 80, fontWeight: 800, lineHeight: '1', letterSpacing: '0em' },
  },
  {
    label: 'H2',
    value: '56px Black Avenir',
    sample: 'Timeless form',
    style: { fontFamily: '"Avenir", "Plus Jakarta Sans", sans-serif', fontSize: 56, fontWeight: 800, lineHeight: '1', letterSpacing: '0em' },
  },
  {
    label: 'H3',
    value: '40px Black Avenir',
    sample: 'Timeless form',
    style: { fontFamily: '"Avenir", "Plus Jakarta Sans", sans-serif', fontSize: 40, fontWeight: 800, lineHeight: '1', letterSpacing: '0em' },
  },
  {
    label: 'Body_large',
    value: '16px Heavy Avenir',
    sample: 'Timeless form',
    style: { fontFamily: '"Avenir", "Plus Jakarta Sans", sans-serif', fontSize: 16, fontWeight: 700, lineHeight: '1.35', letterSpacing: '0em' },
  },
  {
    label: 'Body',
    value: '12px Medium Avenir',
    sample: 'Timeless form',
    style: { fontFamily: '"Avenir", "Plus Jakarta Sans", sans-serif', fontSize: 12, fontWeight: 500, lineHeight: '1.35', letterSpacing: '0em' },
  },
  {
    label: 'Caption',
    value: '8px Roman Avenir',
    sample: 'Timeless form',
    style: { fontFamily: '"Avenir", "Plus Jakarta Sans", sans-serif', fontSize: 8, fontWeight: 400, lineHeight: '1.35', letterSpacing: '0em' },
  },
];

const posterPalette = [
  { hex: '#141416', textClass: 'text-black-normal' },
  { hex: '#00315A', textClass: 'text-black-normal' },
  { hex: '#E4EAF0', textClass: 'text-black-normal' },
];

const posterPalette02 = [
  { hex: '#141416', textClass: 'text-black-normal' },
  { hex: '#DBDADB', textClass: 'text-black-normal' },
];

const posterPalette03 = [
  { hex: '#141416', textClass: 'text-black-normal' },
  { hex: '#7AC8EB', textClass: 'text-black-normal' },
  { hex: '#FF7885', textClass: 'text-black-normal' },
  { hex: '#F2E782', textClass: 'text-black-normal' },
];

const archiveMockupImages = [
  ArchiveHouseMockup1,
  ArchiveHouseMockup2,
  ArchiveHouseMockup3,
  ArchiveHouseMockup4,
  ArchiveHouseMockup5,
  ArchiveHouseMockup6,
];

const ARCHIVE_HOUSE_LAYOUT_BASE_HEIGHT = 5700;
const ARCHIVE_HOUSE_FOOTER_TOP = ARCHIVE_HOUSE_LAYOUT_BASE_HEIGHT - 300;

export default function ProjectArchiveHouse({ currentPage, language, onNavigate, onLanguageChange }: Props) {
  return (
    <div className="layout-viewport hide-scrollbar bg-grey-normal">
      <div className="layout-canvas" style={{ "--layout-base-height": `${ARCHIVE_HOUSE_LAYOUT_BASE_HEIGHT}px` } as CSSProperties}>
        <div className="layout-canvas-inner">
          <div className="relative" style={{ minHeight: "var(--layout-base-height)" } as CSSProperties}>
            <div className="tinypaws-page-enter-overlay" aria-hidden>
              <span className="tinypaws-page-enter-overlay-base" />
            </div>
            <div className="tinypaws-page-enter-content">
            <Header currentPage={currentPage} language={language} onNavigate={onNavigate} onLanguageChange={onLanguageChange} />

            <div className="flex flex-col gap-0 mt-12">
              <ProjectHeader
                title="Archive House"
                category="Poster Design"
                timeline="2 weeks"
                tools={['Adobe InDesign', 'Adobe Photoshop', 'Adobe Illustrator']}
                role="Independent"
                description={[
                  'A promotional poster project for a fictional furniture concept store, designed around a featured plywood lounge chair as the key product.',
                  'Three posters explore different visual moods, demonstrating how atmosphere and layout influence brand perception in retail promotion.',
                ]}
              />

              <section className="px-7">
                <div className="flex justify-center">
                  <div className="w-full max-w-[1400px] overflow-hidden">
                    <img
                      src={ArchiveHouseBanner}
                      alt="Archive House overview"
                      className="w-full h-auto block scale-[1.01] origin-center"
                    />
                  </div>
                </div>
              </section>
            </div>

            <section className="px-7 pb-16 mt-16">
              <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">01 Design Approach</h2>
                <div className="grid gap-10 pl-48 max-w-[1280px]">
                  <div className="grid gap-3">
                    <p className="type-body-lg m-0 text-black-normal font-semibold">Branding</p>
                    <p className="type-body text-black-normal m-0 leading-[1.5] max-w-[980px]">
                      A conceptual furniture concept store curating vintage pieces alongside a refined archive of
                      contemporary selections, with a focus on the North American and Japanese markets.
                      <br />
                      The shop emphasizes timeless design, craftsmanship, and thoughtful curation across cultures.
                    </p>
                    <p className="type-body-lg m-0 text-black-normal font-semibold">Brand Logo</p>
                    <img
                      src={ArchiveHouseLogo}
                      alt="Archive House logo"
                      className="h-auto block"
                      style={{ width: 320, maxWidth: '100%' }}
                    />
                  </div>

                  <div className="grid gap-3">
                    <p className="type-body-lg m-0 text-black-normal font-semibold">Hero Product</p>
                    <div className="flex items-start max-w-[860px]" style={{ columnGap: 96 }}>
                      <img
                        src={ArchiveHouseChair}
                        alt="Plywood Lounge Chair"
                        className="h-auto block"
                        style={{ width: 200, maxWidth: '100%', flex: '0 0 auto' }}
                      />
                      <div className="grid gap-2" style={{ width: 600, maxWidth: '100%', flex: '0 0 auto' }}>
                        <p className="type-body text-black-normal m-0 leading-[1.5]">Plywood Lounge Chair</p>
                        <p className="type-body text-black-normal m-0 leading-[1.5]">
                          This upholstered version of Charles and Ray Eames&apos; molded plywood chair adds a soft touch and
                          subtle color to a classic silhouette.
                          <br />
                          Chosen as the hero product for its iconic form and adaptability, it serves as a consistent
                          visual anchor across all poster directions while allowing mood and tone to shift.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <p className="type-body-lg m-0 text-black-normal font-semibold">Typography</p>
                    <p className="type-body text-black-normal m-0 leading-[1.5]">
                      A unified type system anchors the brand identity across three distinct visual moods.
                    </p>
                    <div className="grid grid-cols-[260px_1fr] gap-10 items-start">
                      <div className="text-[12px] leading-[1.5] text-black-normal space-y-3">
                        {archiveTypographyScale.map(({ label, value, sample, style }, index) => (
                          <div
                            key={label}
                            className={`grid grid-cols-[140px_1fr] gap-6 ${index === 0 ? 'items-center' : 'items-start'}`}
                          >
                            <div>
                              <p className="m-0 text-[16px] font-normal leading-[1.3]">{label}</p>
                              <p className="m-0 text-[12px] font-normal leading-[1.3] whitespace-nowrap">{value}</p>
                            </div>
                            <div className={`flex min-h-[44px] pl-14 ${index === 0 ? 'items-center' : 'items-start'}`}>
                              <p className="m-0 text-black-normal whitespace-nowrap" style={style}>
                                {sample}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-7 pb-12 mt-0">
              <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">02 Comparison</h2>
                <div className="grid gap-6 pl-48 max-w-[1280px]">
                  <p className="type-body-lg m-0 text-black-normal font-semibold">Poster 01/03</p>
                  <p className="type-body text-black-normal m-0 leading-[1.5] max-w-[1080px]">
                    An archival, restrained layout inspired by mid-century modern editorial design, highlighting the
                    chair&apos;s form and material through balanced composition.
                  </p>

                  <div className="grid gap-3">
                    <p className="type-body text-black-normal m-0 leading-[1.5]">Color</p>
                    <div
                      className="grid gap-6 max-w-[860px]"
                      style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
                    >
                      {posterPalette.map(({ hex, textClass }) => (
                        <div
                          key={hex}
                          className={`h-[96px] rounded-[4px] ${textClass}`}
                          style={{ backgroundColor: hex, padding: '14px 16px' }}
                        >
                          <p className="m-0 text-[12px] leading-[1.2]">{hex}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <p className="type-body text-black-normal m-0 leading-[1.5]">Graphics</p>
                    <div className="flex items-end gap-4 max-w-[1180px]">
                      <img
                        src={ArchiveHouseGraphic1}
                        alt="Archive House poster graphic lines"
                        className="w-auto object-contain"
                        style={{ height: 112, width: 'auto', maxWidth: 'none', flex: '0 0 auto' }}
                      />
                      <img
                        src={ArchiveHouseGraphic2}
                        alt="Archive House poster graphic chair 1"
                        className="w-auto object-contain"
                        style={{ height: 112, width: 'auto', maxWidth: 'none', flex: '0 0 auto' }}
                      />
                      <img
                        src={ArchiveHouseGraphic3}
                        alt="Archive House poster graphic chair 2"
                        className="w-auto object-contain"
                        style={{ height: 112, width: 'auto', maxWidth: 'none', flex: '0 0 auto' }}
                      />
                      <img
                        src={ArchiveHouseGraphic4}
                        alt="Archive House poster graphic chair 3"
                        className="w-auto object-contain"
                        style={{ height: 112, width: 'auto', maxWidth: 'none', flex: '0 0 auto' }}
                      />
                      <img
                        src={ArchiveHouseGraphic5}
                        alt="Archive House poster graphic chair 4"
                        className="w-auto object-contain"
                        style={{ height: 112, width: 'auto', maxWidth: 'none', flex: '0 0 auto' }}
                      />
                      <img
                        src={ArchiveHouseGraphic6}
                        alt="Archive House poster graphic chair 5"
                        className="w-auto object-contain"
                        style={{ height: 112, width: 'auto', maxWidth: 'none', flex: '0 0 auto' }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 mt-8">
                    <p className="type-body-lg m-0 text-black-normal font-semibold">Poster 02/03</p>
                    <p className="type-body text-black-normal m-0 leading-[1.5] max-w-[1080px]">
                      A bold, high-contrast approach influenced by Swiss modernism, using strict typographic hierarchy
                      and graphic clarity to emphasize structure and function.
                    </p>

                    <div className="grid gap-3">
                      <p className="type-body text-black-normal m-0 leading-[1.5]">Color</p>
                      <div
                        className="grid gap-6 max-w-[860px]"
                        style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
                      >
                        {posterPalette02.map(({ hex, textClass }) => (
                          <div
                            key={hex}
                            className={`h-[96px] rounded-[4px] ${textClass}`}
                            style={{ backgroundColor: hex, padding: '14px 16px' }}
                          >
                            <p className="m-0 text-[12px] leading-[1.2]">{hex}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <p className="type-body text-black-normal m-0 leading-[1.5]">Graphics</p>
                      <div className="flex items-end gap-4 max-w-[1180px]">
                        <img
                          src={ArchiveHouseGraphic7}
                          alt="Archive House poster 02 graphic chair"
                          className="w-auto object-contain"
                          style={{ height: 112, width: 'auto', maxWidth: 'none', flex: '0 0 auto' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 mt-8">
                    <p className="type-body-lg m-0 text-black-normal font-semibold">Poster 03/03</p>
                    <p className="type-body text-black-normal m-0 leading-[1.5] max-w-[1080px]">
                      A systematic composition based on the Bauhaus grid system, focusing on geometry, alignment, and
                      functional order to present the product with clarity and precision.
                    </p>

                    <div className="grid gap-3">
                      <p className="type-body text-black-normal m-0 leading-[1.5]">Color</p>
                      <div
                        className="grid gap-6 max-w-[860px]"
                        style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
                      >
                        {posterPalette03.map(({ hex, textClass }) => (
                          <div
                            key={hex}
                            className={`h-[96px] rounded-[4px] ${textClass}`}
                            style={{ backgroundColor: hex, padding: '14px 16px' }}
                          >
                            <p className="m-0 text-[12px] leading-[1.2]">{hex}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <p className="type-body text-black-normal m-0 leading-[1.5]">Graphics</p>
                      <div className="flex items-end gap-4 max-w-[1180px]">
                        <img
                          src={ArchiveHouseGraphic8}
                          alt="Archive House poster 03 graphic composition"
                          className="w-auto object-contain"
                          style={{ height: 180, width: 'auto', maxWidth: 'none', flex: '0 0 auto' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-7 pb-12 mt-0">
              <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">03 Final Result</h2>
                <div className="grid gap-6 pl-48 max-w-[1280px]">
                  <p className="type-body-lg m-0 text-black-normal font-semibold">Original View</p>
                  <div className="grid grid-cols-3 gap-6 max-w-[1180px]">
                    <div className="grid gap-2">
                      <img
                        src={ArchiveHouseResult1}
                        alt="Archive House poster result 01"
                        className="w-full h-[460px] object-contain"
                      />
                      <p className="type-body m-0 text-black-normal leading-[1.5]">Poster 01</p>
                    </div>
                    <div className="grid gap-2">
                      <img
                        src={ArchiveHouseResult2}
                        alt="Archive House poster result 02"
                        className="w-full h-[460px] object-contain"
                      />
                      <p className="type-body m-0 text-black-normal leading-[1.5]">Poster 02</p>
                    </div>
                    <div className="grid gap-2">
                      <img
                        src={ArchiveHouseResult3}
                        alt="Archive House poster result 03"
                        className="w-full h-[460px] object-contain"
                      />
                      <p className="type-body m-0 text-black-normal leading-[1.5]">Poster 03</p>
                    </div>
                  </div>
                  <p className="type-body-lg m-0 text-black-normal font-semibold">Mockup</p>
                  <div className="grid grid-cols-2 gap-6 max-w-[1180px]">
                    {archiveMockupImages.map((imageSrc, index) => (
                      <div key={imageSrc} className="w-full aspect-[16/10] overflow-hidden">
                        <img
                          src={imageSrc}
                          alt={`Archive House mockup ${index + 1}`}
                          className="w-full h-full object-cover object-center block"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <Footer onNavigate={onNavigate} top={ARCHIVE_HOUSE_FOOTER_TOP} />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
