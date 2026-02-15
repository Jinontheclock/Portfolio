import type { CSSProperties } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectHeader from './ProjectHeader';
import { Language, Page } from '../types';
import layout2col from '../assets/layout_2col.png';
import layout3col from '../assets/layout_3col.png';
type Props = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

export default function ProjectIceland({ currentPage, language, onNavigate, onLanguageChange }: Props) {

  return (
    <div className="layout-viewport hide-scrollbar bg-grey-normal">
      <div className="layout-canvas">
        <div className="layout-canvas-inner">
          <div className="relative">
            <Header currentPage={currentPage} language={language} onNavigate={onNavigate} onLanguageChange={onLanguageChange} />

            <ProjectHeader
              title="Best of Iceland"
              timeline="1 month"
              tools={['Adobe InDesign', 'Adobe Photoshop', 'Adobe Illustrator']}
              role="Independent"
              reference="G Adventures"
              description={[
                'Developed as an academic project, this brochure redesign reinterprets G Adventures’ “Best of Iceland” tour as a structured editorial publication.',
                'By reorganizing the itinerary into a clear day-by-day narrative with strong visual hierarchy, the project enhances product visibility and positions the tour as both a promotional piece and an informative guide.',
              ]}
            />

            <div className="iceland-fluid">

            {/* Typography block */}
            <section className="px-3 tablet:px-5 desktop:px-7 pb-16">
              <div className="grid desktop:grid-cols-[260px_1fr] gap-12 items-start">
                <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">01 Design Process</h2>

                <div className="grid gap-6 pl-4 tablet:pl-8 desktop:pl-48">
                  <div>
                    <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Typography</p>
                    <p className="type-body text-black-normal m-0 mt-2 leading-[1.6]">
                      The publication primarily uses Avenir to establish a clean and structured editorial hierarchy.
                      <br />
                      Clear weight contrast and consistent sizing reinforce readability while maintaining a modern and minimal aesthetic.
                    </p>
                  </div>

                  <div className="grid desktop:grid-cols-[260px_1fr] gap-10 items-start">
                    <div className="text-[12px] leading-[1.5] text-black-normal space-y-3">
                      {[
                        ['Title', '40px Bold HelveticaNeue', { fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: 40, fontWeight: 700, lineHeight: 1.1 }],
                        ['Date', '24px Black Avenir', { fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: 24, fontWeight: 900, lineHeight: 1.2 }],
                        ['Sub_title', '14px Black Avenir', { fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: 14, fontWeight: 900, lineHeight: 1.2 }],
                        ['Body_big', '12px Medium Avenir', { fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: 12, fontWeight: 500, lineHeight: 1.3 }],
                        ['Body_big_italic', '12px MediumOblique Avenir', { fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: 12, fontWeight: 500, fontStyle: 'italic', lineHeight: 1.3 }],
                        ['Body', '10px Medium Avenir', { fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: 10, fontWeight: 500, lineHeight: 1.3 }],
                        ['Body_italic', '10px Oblique Avenir', { fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: 10, fontWeight: 500, fontStyle: 'italic', lineHeight: 1.3 }],
                        ['Caption', '8px BookOblique Avenir', { fontFamily: 'Avenir, Helvetica, Arial, sans-serif', fontSize: 8, fontWeight: 400, fontStyle: 'italic', lineHeight: 1.3 }],
                      ].map(([label, value, style]) => (
                        <div key={label as string} className="grid grid-cols-[140px_1fr] items-start gap-6">
                          <div>
                            <p className="m-0 text-[16px] font-normal leading-[1.3]">{label as string}</p>
                            <p className="m-0 text-[12px] font-normal leading-[1.3] whitespace-nowrap">{value as string}</p>
                          </div>
                          <div className="flex items-center min-h-[44px] pl-6 tablet:pl-10 desktop:pl-14">
                            <p className="m-0 text-black-normal whitespace-nowrap" style={style as React.CSSProperties}>
                              A journey through fire and ice.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Grid System */}
            <section className="px-3 tablet:px-5 desktop:px-7 pb-20 mt-20">
              <div className="grid desktop:grid-cols-[260px_1fr] gap-12 items-start">
                <div className="h-0" />

                <div className="grid gap-6 pl-4 tablet:pl-8 desktop:pl-48">
                  <h3 className="type-heading-3 text-black-normal m-0 leading-[1.3] whitespace-nowrap">Grid System</h3>
                  <p className="type-body text-black-normal m-0 leading-[1.6]">
                    It uses a flexible column-based grid system to ensure clarity and consistency across spreads. Both 2–column and 3–column layouts were applied depending on content needs, balancing imagery with readable travel information.
                  </p>

                  <div className="type-body text-black-normal space-y-1 leading-[1.6]">
                    <p className="m-0">Standard Margins Top: 0.5 in | Bottom: 0.75 in | Inside: 0.5 in | Outside: 0.5 in</p>
                    <p className="m-0">Standard Gutter: 0.1667 in</p>
                    <p className="m-0">The slightly larger bottom margin creates breathing space for captions and page flow.</p>
                  </div>

                  <div className="grid desktop:grid-cols-2 gap-8 items-start">
                    <figure className="p-0 m-0 text-left">
                      <img src={layout2col} alt="2-column grid layout" className="w-full h-auto block" />
                      <figcaption className="mt-1 text-[13px] font-medium text-black-normal text-left">
                        2–Column Grid (Primary Layout)
                      </figcaption>
                    </figure>
                    <figure className="p-0 m-0 text-left">
                      <img src={layout3col} alt="3-column grid layout" className="w-full h-auto block" />
                      <figcaption className="mt-1 text-[13px] font-medium text-black-normal text-left">
                        3–Column Grid (Secondary Layout)
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </section>

            {/* Graphics */}
            <section className="px-3 tablet:px-5 desktop:px-7 pb-20">
              <div className="grid desktop:grid-cols-[260px_1fr] gap-12 items-start">
                <div className="h-0" />

                <div className="grid gap-6 pl-4 tablet:pl-8 desktop:pl-48">
                  <h3 className="type-heading-3 text-black-normal m-0 leading-[1.3] whitespace-nowrap">Graphics</h3>
                  <p className="type-body text-black-normal m-0 leading-[1.6]">
                    Key visual spreads and digital compositions used across the project.
                  </p>

                  <div className="grid desktop:grid-cols-2 gap-8 items-start">
                    <figure className="p-0 m-0 text-left">
                      <img src={layout2col} alt="Graphic 1" className="w-full h-auto block" />
                      <figcaption className="mt-1 text-[13px] font-medium text-black-normal text-left">
                        Spread sample 1
                      </figcaption>
                    </figure>
                    <figure className="p-0 m-0 text-left">
                      <img src={layout3col} alt="Graphic 2" className="w-full h-auto block" />
                      <figcaption className="mt-1 text-[13px] font-medium text-black-normal text-left">
                        Spread sample 2
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </section>

            {/* 02 Digital Edition with PDF viewer */}
            <section className="px-3 tablet:px-5 desktop:px-7 pb-20 mt-16">
              <div className="grid desktop:grid-cols-[260px_1fr] gap-12 items-start">
                <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">02 Digital Edition</h2>
                <div className="grid gap-4 pl-4 tablet:pl-8 desktop:pl-48">
                  <div className="border border-black/15 rounded-[4px] shadow-sm overflow-hidden bg-white" style={{ height: 640, minHeight: 400 }}>
                    <iframe
                      title="Best of Iceland publication"
                      src="https://indd.adobe.com/view/6f46e287-a8e6-4a4a-ae30-9abd17aed38b"
                      width="100%"
                      height="100%"
                      style={{ border: 'none' }}
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 03 Final Result */}
            <section className="px-3 tablet:px-5 desktop:px-7 pb-24 mt-16">
              <div className="grid desktop:grid-cols-[260px_1fr] gap-12 items-start">
                <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">03 Final Result</h2>
                <div className="grid gap-4 pl-4 tablet:pl-8 desktop:pl-48">
                  {/* Placeholder for final assets or summary */}
                  <p className="type-body text-black-normal m-0 leading-[1.6]">
                    Final deliverables and showcase will be added here.
                  </p>
                </div>
              </div>
            </section>

            <Footer onNavigate={onNavigate} top={5200} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
