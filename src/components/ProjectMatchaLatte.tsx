import type { CSSProperties } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectHeader from './ProjectHeader';
import { Language, Page } from '../types';
import MatchaBanner from '../assets/projects/matcha/matcha_banner.webp';
import MatchaComponents1 from '../assets/projects/matcha/matcha_components1.webp';
import MatchaComponents2 from '../assets/projects/matcha/matcha_components2.webp';
import MatchaDieline1 from '../assets/projects/matcha/matcha_dieline1.webp';
import MatchaDieline2 from '../assets/projects/matcha/matcha_dieline2.webp';
import MatchaLabels1 from '../assets/projects/matcha/matcha_labels1.webp';
import MatchaLabels2 from '../assets/projects/matcha/matcha_labels2.webp';
import MatchaLabels3 from '../assets/projects/matcha/matcha_labels3.webp';
import MatchaMockup1 from '../assets/projects/matcha/matcha_mockup1.webp';
import MatchaMockup2 from '../assets/projects/matcha/matcha_mockup2.webp';
import MatchaMockup3 from '../assets/projects/matcha/matcha_mockup3.webp';
import MatchaMockup4 from '../assets/projects/matcha/matcha_mockup4.webp';

type Props = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

const VEILANCE_LAYOUT_BASE_HEIGHT = 6700;
const VEILANCE_FOOTER_TOP = VEILANCE_LAYOUT_BASE_HEIGHT - 300;
const MATCHA_GRADIENT_END = '#FAFFEC';
const MATCHA_LABEL_IMAGES = [MatchaLabels1, MatchaLabels2, MatchaLabels3];
const MATCHA_MOCKUP_ROW_ONE_IMAGES = [MatchaMockup1, MatchaMockup2, MatchaMockup3];

type MatchaTypographyRow = {
  label: string;
  value: string;
  sample: string;
  style: CSSProperties;
  sampleMinHeight?: number;
};

const matchaTypographyRows: MatchaTypographyRow[] = [
  {
    label: 'Name_jp',
    value: '40px ExtraBold NotoSans',
    sample: '抹茶、本来の味わい。',
    sampleMinHeight: 56,
    style: {
      fontFamily: '"Noto Sans JP", "Noto Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: 40,
      fontWeight: 800,
      lineHeight: '1',
    },
  },
  {
    label: 'Name_sub_jp',
    value: '32px ExtraBold NotoSans',
    sample: '抹茶、本来の味わい。',
    sampleMinHeight: 48,
    style: {
      fontFamily: '"Noto Sans JP", "Noto Sans", "Plus Jakarta Sans", sans-serif',
      fontSize: 32,
      fontWeight: 800,
      lineHeight: '1',
    },
  },
  {
    label: 'Flavor',
    value: '12px Bold NotoSans',
    sample: 'Matcha, in its purest form.',
    sampleMinHeight: 28,
    style: {
      fontFamily: '"Noto Sans", "Noto Sans JP", "Plus Jakarta Sans", sans-serif',
      fontSize: 12,
      fontWeight: 700,
      lineHeight: '1.2',
    },
  },
  {
    label: 'Title_jp',
    value: '8px SemiBold NotoSerif',
    sample: '抹茶、本来の味わい。',
    sampleMinHeight: 20,
    style: {
      fontFamily: '"Noto Serif JP", "Noto Serif", "Plus Jakarta Sans", serif',
      fontSize: 8,
      fontWeight: 600,
      lineHeight: '1.2',
    },
  },
  {
    label: 'Body',
    value: '6px NotoSans',
    sample: 'Matcha, in its purest form.',
    sampleMinHeight: 16,
    style: {
      fontFamily: '"Noto Sans", "Noto Sans JP", "Plus Jakarta Sans", sans-serif',
      fontSize: 6,
      fontWeight: 400,
      lineHeight: '1.2',
    },
  },
];

const matchaColorRows = [
  {
    label: 'Flavor Deep',
    solid: '#2C4001',
    gradientStart: '#3C5B00',
  },
  {
    label: 'Flavor Classic',
    solid: '#7D8C0B',
    gradientStart: '#6F8922',
  },
  {
    label: 'Flavor Mild',
    solid: '#B9BF04',
    gradientStart: '#B0C168',
  },
] as const;

export default function ProjectMatchaLatte({ currentPage, language, onNavigate, onLanguageChange }: Props) {
  return (
    <div className="layout-viewport hide-scrollbar bg-grey-normal">
      <div className="layout-canvas" style={{ "--layout-base-height": `${VEILANCE_LAYOUT_BASE_HEIGHT}px` } as CSSProperties}>
        <div className="layout-canvas-inner">
          <div className="relative" style={{ minHeight: "var(--layout-base-height)" } as CSSProperties}>
            <div className="tinypaws-page-enter-overlay" aria-hidden>
              <span className="tinypaws-page-enter-overlay-base" />
            </div>
            <div className="tinypaws-page-enter-content">
            <Header currentPage={currentPage} language={language} onNavigate={onNavigate} onLanguageChange={onLanguageChange} />
            <div className="flex flex-col gap-0 mt-12">
              <ProjectHeader
                title="Matcha Latte"
                titleFontSize={148}
                category="Packaging"
                timeline="2 weeks"
                tools={['Adobe InDesign', 'Adobe Photoshop', 'Adobe Illustrator']}
                role="Independent"
                roleLabel="Role"
                description={[
                  'A fictional matcha latte brand and packaging concept designed as a new product series.',
                  'The project focuses on translating Japanese tea heritage into a modern visual identity through minimal typography, calm color palettes, and cohesive flavor differentiation.',
                ]}
              />

              {/* Hero image */}
              <section className="px-7">
                <div className="flex justify-center">
                  <img
                    src={MatchaBanner}
                    alt="Matcha Latte overview"
                    className="w-full max-w-[1400px] h-auto"
                  />
                </div>
              </section>
            </div>

            <div>
              {/* 01 Design Process */}
              <section className="px-7 pb-16 mt-16">
                <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                  <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">01 Design Process</h2>
                  <div className="grid gap-2 pl-48 max-w-[1280px]">
                    <p className="type-body-lg m-0 text-black-normal font-semibold">Design Approach</p>
                    <p className="type-body m-0 text-black-normal leading-[1.5]">
                      This matcha latte project reinterprets traditional Japanese tea culture as a modern packaging concept.
                      <br />
                      The brand centers on calm, minimal expression, using a restrained green palette to reflect the natural depth of matcha. The product highlights distinct flavor variations through subtle tonal differences, creating a cohesive yet differentiated lineup.
                    </p>

                    <div className="grid gap-3 mt-8">
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Typography</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5] max-w-[1120px]">
                        This project uses a bilingual typographic system that supports both Japanese and English, ensuring
                        consistency across languages. Type was selected for clarity, balance, and compatibility between
                        character sets.
                      </p>
                      <div className="grid grid-cols-[260px_1fr] gap-10 items-start mt-1">
                        <div className="text-[12px] leading-[1.5] text-black-normal space-y-3">
                          {matchaTypographyRows.map((row) => (
                            <div key={row.label} className="grid grid-cols-[140px_1fr] items-start gap-6">
                              <div>
                                <p className="m-0 text-[16px] font-normal leading-[1.3]">{row.label}</p>
                                <p className="m-0 text-[12px] font-normal leading-[1.3] whitespace-nowrap">{row.value}</p>
                              </div>
                              <div className="flex items-center pl-14" style={{ minHeight: row.sampleMinHeight ?? 44 }}>
                                <p className="m-0 text-black-normal whitespace-nowrap" style={row.style}>
                                  {row.sample}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 mt-12">
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Color</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5] max-w-[1120px]">
                        Each flavor is represented through a distinct green tone that reflects the depth and intensity of
                        the matcha. The palette helps differentiate flavors while maintaining a cohesive, natural look.
                      </p>

                      <div className="grid gap-8 max-w-[980px] mt-1">
                        {matchaColorRows.map((row, index) => (
                          <div key={row.label} className="grid grid-cols-[220px_1fr] gap-8 items-start">
                            <div className="grid gap-2">
                              <p className="m-0 text-[16px] font-normal leading-[1.3] text-black-normal">{row.label}</p>
                              <div
                                className="relative h-[90px] rounded-[4px] overflow-hidden"
                                style={{ backgroundColor: row.solid }}
                              >
                                <p className="absolute left-2 top-1.5 m-0 text-[12px] leading-[1] text-black-normal">
                                  {row.solid}
                                </p>
                              </div>
                            </div>

                            <div className="grid gap-2">
                              {index === 0 ? (
                                <p className="m-0 text-[16px] font-normal leading-[1.3] text-black-normal">background</p>
                              ) : (
                                <div className="h-[21px]" aria-hidden="true" />
                              )}
                              <div
                                className="relative h-[90px] rounded-[4px] overflow-hidden"
                                style={{
                                  backgroundImage: `linear-gradient(90deg, ${row.gradientStart} 0%, ${MATCHA_GRADIENT_END} 100%)`,
                                }}
                              >
                                <p className="absolute left-2 top-1.5 m-0 text-[12px] leading-[1] text-black-normal">
                                  {row.gradientStart}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3 mt-12">
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Dieline Template</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5] max-w-[1120px]">
                        The layout is based on standard 355 ml aluminum can dimensions to ensure production accuracy.
                        Clear trim, bleed, and seam areas were considered throughout the design.
                      </p>

                      <div className="grid grid-cols-[1.12fr_1fr] gap-8 max-w-[1120px] mt-2 items-start">
                        <img
                          src={MatchaDieline1}
                          alt="Matcha latte dieline label dimensions"
                          className="w-full h-auto block"
                        />
                        <img
                          src={MatchaDieline2}
                          alt="Matcha latte can side and top dimensions"
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 mt-12">
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Components</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5] max-w-[1120px]">
                        The matcha whisk serves as a key visual motif, referencing traditional preparation methods.
                        Background textures are inspired by the smooth, layered surface of matcha latte foam.
                      </p>

                      <div className="grid grid-cols-[0.73fr_1fr] gap-8 max-w-[1120px] mt-2 items-start">
                        <img
                          src={MatchaComponents1}
                          alt="Matcha latte brand components whisk motif and flavor circles"
                          className="w-full h-auto block"
                        />
                        <img
                          src={MatchaComponents2}
                          alt="Matcha latte background texture components"
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 02 Final Result */}
              <section className="px-7 pb-16 mt-12">
                <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                  <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">02 Final Result</h2>
                  <div className="grid gap-6 pl-48 max-w-[1280px]">
                    <div>
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Labels</p>
                    </div>
                    <div className="grid grid-cols-1 gap-0 max-w-[1180px]">
                      {MATCHA_LABEL_IMAGES.map((imageSrc, index) => (
                        <img
                          key={imageSrc}
                          src={imageSrc}
                          alt={`Matcha latte label design ${index + 1}`}
                          className="w-full h-auto block"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Mockup</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 max-w-[1180px]">
                      <div className="grid grid-cols-3 gap-6">
                        {MATCHA_MOCKUP_ROW_ONE_IMAGES.map((imageSrc, index) => (
                          <div key={imageSrc} className="w-full aspect-[4/3] overflow-hidden">
                            <img
                              src={imageSrc}
                              alt={`Matcha latte mockup ${index + 1}`}
                              className="w-full h-full object-cover block"
                              style={index === 0 ? { objectPosition: '54% center' } : undefined}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="w-full aspect-[16/10] overflow-hidden">
                        <img
                          src={MatchaMockup4}
                          alt="Matcha latte mockup 4"
                          className="w-full h-full object-cover block"
                          style={{ objectPosition: 'center 48%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <Footer onNavigate={onNavigate} top={VEILANCE_FOOTER_TOP} />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
