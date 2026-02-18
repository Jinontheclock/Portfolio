import { useState, type CSSProperties } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectHeader from './ProjectHeader';
import { Language, Page } from '../types';
import TinyBanner from '../assets/projects/tinypaws/tinypaws_banner.png';
import Persona1 from '../assets/projects/tinypaws/tinypaws_persona1.png';
import Persona2 from '../assets/projects/tinypaws/tinypaws_persona2.png';
import LogoBig from '../assets/projects/tinypaws/tinypaws_logo_big.png';
import Logo1 from '../assets/projects/tinypaws/tinypaws_logo1.png';
import Logo2 from '../assets/projects/tinypaws/tinypaws_logo2.png';
import Logo3 from '../assets/projects/tinypaws/tinypaws_logo3.png';
import UserTestBefore from '../assets/projects/tinypaws/tinypaws_user1.png';
import UserTestAfter from '../assets/projects/tinypaws/tinypaws_user2.png';
import UserTestBeforeSecond from '../assets/projects/tinypaws/tinypaws_user3.png';
import UserTestAfterSecond from '../assets/projects/tinypaws/tinypaws_user4.png';
import TinypawsPromotionalVideo from '../assets/projects/tinypaws/TinypawsPromotionalVideo.mp4';
import TinypawsMockup from '../assets/projects/tinypaws/tinypaws_mockup.png';

type Props = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

const brandPalette = [
  { hex: '#DC6E00', textClass: 'text-white' },
  { hex: '#301800', textClass: 'text-white' },
  { hex: '#000000', textClass: 'text-white' },
  { hex: '#F2F2F2', textClass: 'text-black/60' },
  { hex: '#FFFFFF', textClass: 'text-black/60' },
];

const typographyScale: Array<{ label: string; value: string; style: CSSProperties }> = [
  {
    label: 'H1',
    value: '56px Black Nexa Round',
    style: { fontFamily: '"Nexa Round", NexaRound, "Plus Jakarta Sans", sans-serif', fontSize: 56, fontWeight: 900, lineHeight: '36px', letterSpacing: '0em' },
  },
  {
    label: 'H2',
    value: '40px ExtraBold Nexa Round',
    style: { fontFamily: '"Nexa Round", NexaRound, "Plus Jakarta Sans", sans-serif', fontSize: 40, fontWeight: 800, lineHeight: '28px', letterSpacing: '0em' },
  },
  {
    label: 'H3',
    value: '32px ExtraBold Nexa Round',
    style: { fontFamily: '"Nexa Round", NexaRound, "Plus Jakarta Sans", sans-serif', fontSize: 32, fontWeight: 800, lineHeight: '32px', letterSpacing: '0em' },
  },
  {
    label: 'H4',
    value: '24px Bold Nexa Round',
    style: { fontFamily: '"Nexa Round", NexaRound, "Plus Jakarta Sans", sans-serif', fontSize: 24, fontWeight: 700, lineHeight: '24px', letterSpacing: '0em' },
  },
  {
    label: 'Body_large',
    value: '16px Regular Nexa Round',
    style: { fontFamily: '"Nexa Round", NexaRound, "Plus Jakarta Sans", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '24px', letterSpacing: '0em' },
  },
  {
    label: 'Body_small',
    value: '12px Regular Nexa Round',
    style: { fontFamily: '"Nexa Round", NexaRound, "Plus Jakarta Sans", sans-serif', fontSize: 12, fontWeight: 400, lineHeight: '20px', letterSpacing: '0em' },
  },
  {
    label: 'Buttons',
    value: '20px Bold Nexa Round',
    style: { fontFamily: '"Nexa Round", NexaRound, "Plus Jakarta Sans", sans-serif', fontSize: 20, fontWeight: 700, lineHeight: '20px', letterSpacing: '0em' },
  },
  {
    label: 'Caption',
    value: '12px Light Nexa Round',
    style: { fontFamily: '"Nexa Round", NexaRound, "Plus Jakarta Sans", sans-serif', fontSize: 12, fontWeight: 300, lineHeight: '20px', letterSpacing: '0em' },
  },
];

export default function ProjectTinyPaws({ currentPage, language, onNavigate, onLanguageChange }: Props) {
  const [activeUsabilitySide, setActiveUsabilitySide] = useState<'left' | 'right'>('left');
  const [activeUsabilitySideSecond, setActiveUsabilitySideSecond] = useState<'left' | 'right'>('left');

  return (
    <div className="layout-viewport hide-scrollbar bg-grey-normal">
      <div className="layout-canvas" style={{ "--layout-base-height": "10900px" } as CSSProperties}>
        <div className="layout-canvas-inner">
          <div className="relative" style={{ minHeight: "var(--layout-base-height)" } as CSSProperties}>
            <Header currentPage={currentPage} language={language} onNavigate={onNavigate} onLanguageChange={onLanguageChange} />

            <div className="flex flex-col gap-0 mt-12">
              <ProjectHeader
                title="TinyPaws"
                category="Website"
                timeline="5 months"
                tools={['Figma', 'WordPress', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere', 'Trello']}
                role="UI/UX Designer"
                description={[
                  'TinyPaws reimagines the cat adoption journey for a volunteer-driven rescue organization in Greater Vancouver.',
                  'Designed to replace an outdated site, it clarifies adoption, fostering, and donation pathways through friendly branding, structured navigation, and accessible resources.',
                ]}
              />

              {/* Hero image */}
              <section className="px-7">
                <div className="flex justify-center">
                  <img
                    src={TinyBanner}
                    alt="TinyPaws overview"
                    className="w-full max-w-[1400px] h-auto"
                  />
                </div>
              </section>
            </div>

            <div>
              {/* 01 Why ProLog was created */}
              <section className="px-7 pb-16 mt-16">
                <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                  <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">01 Why ProLog was created</h2>
                  <div className="grid gap-6 pl-48 max-w-[1280px]">
                    <div>
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Outdated First Impression</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5]">
                        TinyPaws’ website was the first point of contact for potential adopters,
                        <br />
                        but the existing site felt outdated and difficult to navigate.
                      </p>
                    </div>

                    <div>
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Need for Clear Adoption Guidance</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5]">
                        Visitors often lacked understanding of the rescue adoption process,
                        <br />
                        making it important to provide step-by-step education and support.    
                      </p>
                    </div>

                    <div>
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Building Trust Through Accessibility</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5]">
                        As a volunteer-driven non-profit,
                        <br />
                        TinyPaws needed a welcoming platform that highlights responsibility, transparency, and community care.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 02 Research & Analysis */}
              <section className="px-7 pb-16 mt-12">
                <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                  <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">02 Research & Analysis</h2>
                  <div className="grid gap-6 pl-48 max-w-[1280px]">
                    <div>
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">User Interview</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5] mt-1">
                        We conducted a survey to understand common concerns adopters face when considering rescue cats,
                        <br />
                        including costs, health, and behavioural adjustment.
                      </p>
                    </div>

                    <div>
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Findings</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5]">
                        Many adoption websites feel long, unclear, and difficult to navigate.
                        <br />
                        Users want transparent medical, behaviour, and vaccination information.
                        <br />
                        Post-adoption support and guidance is often missing.
                      </p>
                    </div>

                    <div>
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Needs</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5]">
                        A clear and friendly adoption journey with accessible information.
                        <br />
                        Stronger cat profiles with stories, temperament, and history.
                        <br />
                        Resources that support adopters beyond the moment of adoption.
                      </p>
                    </div>

                    <div>
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Action Points</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5]">
                        A playful, welcoming visual identity
                        <br />
                        Simplified navigation and clear information architecture
                        <br />
                        Adoption resources, donation tools, and community support features
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Secondary Research</p>
                      <p className="type-body text-black-normal m-0 leading-[1.6]">
                        Reviewed broader cat adoption and ownership studies in Canada to expand beyond our survey demographic.
                        <br />
                        External findings highlighted diverse adopter needs, financial and lifestyle concerns, and the importance of accessible post-adoption guidance.
                        <br />
                        Research also showed that successful adoption outcomes improve when clear animal profiles, support resources, and transparent care expectations are provided.
                        <br />
                        These insights reinforced TinyPaws’ goal of creating a welcoming, informative platform that supports adopters throughout the full rescue and adoption journey.
                      </p>
                    </div>

                    {/* User Persona */}
                    <div className="grid gap-2">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">User Persona</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        User personas were developed based on research insights to represent key adopter types and their goals, behaviors, and concerns.
                        <br />
                        They guided design decisions by highlighting user needs, pain points, and expectations throughout the adoption journey.
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        <img
                          src={Persona1}
                          alt="User persona Emily Green"
                          className="w-full h-auto object-contain"
                        />
                        <img
                          src={Persona2}
                          alt="User persona Alex Kim"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 03 Design Process */}
              <section className="px-7 pb-16 mt-12">
                <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                  <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">03 Design Process</h2>
                  <div className="grid gap-6 pl-48 max-w-[1280px]">
                    <div className="grid gap-2">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Site Map</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        The site map was developed by mapping key user goals such as adoption, fostering, and donations identified during research.
                        <br />
                        Content was grouped into logical categories based on user needs and common navigation patterns.
                        <br />
                        User flows were then structured to support different goals, such as exploring available cats, learning about adoption, and completing applications.
                      </p>
                    </div>
                    <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                      <iframe
                        title="TinyPaws Site Map"
                        style={{ border: '0' }}
                        width="100%"
                        height="520"
                        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2F7OQJmaCeLRisYe4FYPTUus%2FTinyPaws---Site-Map%3Fnode-id%3D0-1%26t%3DUIThs1d6GNBL63b4-1"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Branding */}
              <section className="px-7 pb-20 mt-0">
                <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                  <div className="grid gap-6 pl-48 max-w-[1280px] col-start-2">
                    <div className="grid gap-2">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1]">Branding</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">Logo Design</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        The logo combines playful, rounded forms with a cat-inspired silhouette to create a friendly and approachable identity that reflects the warmth of the adoption experience.
                      </p>
                    </div>
                    <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr] gap-6 items-end">
                      <img
                        src={LogoBig}
                        alt="TinyPaws primary logo"
                        className="w-full h-auto object-contain col-span-1"
                      />
                      {[Logo1, Logo2, Logo3].map((src, idx) => (
                        <img
                          key={src}
                          src={src}
                          alt={`TinyPaws logo variation ${idx + 1}`}
                          className="w-full h-auto object-contain"
                        />
                      ))}
                    </div>

                    <div className="grid gap-2 mt-12">
                      <p className="type-body text-black-normal m-0 leading-[1.5]">Colors</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        A warm orange is used as the primary color to convey friendliness and energy, supported by deep brown and neutral tones to maintain balance, readability, and trust.
                      </p>
                      <div className="grid grid-cols-5 gap-6">
                        {brandPalette.map(({ hex, textClass }) => (
                          <div
                            key={hex}
                            className={`w-full aspect-square rounded-[14px] flex items-center justify-center border border-black/5 ${textClass}`}
                            style={{ backgroundColor: hex }}
                          >
                            <span className="text-[14px] leading-none font-medium">{hex}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-2 mt-12">
                      <p className="type-body text-black-normal m-0 leading-[1.5]">Typography</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        Nexa Round is used across all typography to maintain a consistent, approachable tone, with clear weight contrast and structured sizing enhancing readability and a clean, modern aesthetic.
                      </p>
                      <div className="grid grid-cols-[260px_1fr] gap-10 items-start">
                        <div className="text-[12px] leading-[1.5] text-black-normal space-y-3">
                          {typographyScale.map(({ label, value, style }) => (
                            <div key={label} className="grid grid-cols-[140px_1fr] items-start gap-6">
                              <div>
                                <p className="m-0 text-[16px] font-normal leading-[1.3]">{label}</p>
                                <p className="m-0 text-[12px] font-normal leading-[1.3] whitespace-nowrap">{value}</p>
                              </div>
                              <div className="flex items-center min-h-[44px] pl-14">
                                <p className="m-0 text-black-normal whitespace-nowrap" style={style}>
                                  Small paws, safe homes.
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>    
                    </div>

                    <div className="grid gap-2 mt-16">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1]">Low Fidelity Wireframes</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        Low-fidelity wireframes were created to explore layout structures and define core user flows.
                        <br />
                        This stage focused on content hierarchy, navigation clarity, and early interaction concepts.
                      </p>
                      <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                        <iframe
                          title="TinyPaws low fidelity wireframes"
                          style={{ border: '0' }}
                          width="100%"
                          height="560"
                          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGLajfqOV2gqeDneSml8bE5%2FFi-Models%3Fnode-id%3D171-2633%26t%3DgNF9B8TPbhJ9Evx2-1"
                          allowFullScreen
                        />
                      </div>
                    </div>

                    <div className="grid gap-2 mt-16">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1]">Usability Test</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        Participants tested TinyPaws&apos; low-fidelity website mockup to evaluate core adoption and support flows.
                      </p>

                      <div
                        className="grid grid-cols-2 gap-8 items-start justify-items-center"
                        style={{ perspective: '1800px' }}
                      >
                        <button
                          type="button"
                          onMouseEnter={() => setActiveUsabilitySide('left')}
                          onFocus={() => setActiveUsabilitySide('left')}
                          onClick={() => setActiveUsabilitySide('left')}
                          className="w-[94%] p-0 border border-black/10 rounded-[4px] overflow-hidden bg-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                          style={{
                            transformOrigin: 'left center',
                            transform:
                              activeUsabilitySide === 'left'
                                ? 'rotateY(0deg) scale(1)'
                                : 'rotateY(28deg) scale(0.93)',
                            boxShadow:
                              activeUsabilitySide === 'left'
                                ? '0 18px 40px rgba(0, 0, 0, 0.16)'
                                : '0 10px 24px rgba(0, 0, 0, 0.1)',
                            filter: activeUsabilitySide === 'left' ? 'none' : 'saturate(0.8) brightness(0.96)',
                          }}
                          aria-label="Show low-fidelity usability view"
                        >
                          <img
                            src={UserTestBefore}
                            alt="TinyPaws low-fidelity usability screen"
                            className="w-full h-auto block object-cover"
                          />
                        </button>

                        <button
                          type="button"
                          onMouseEnter={() => setActiveUsabilitySide('right')}
                          onFocus={() => setActiveUsabilitySide('right')}
                          onClick={() => setActiveUsabilitySide('right')}
                          className="w-[94%] p-0 border border-black/10 rounded-[4px] overflow-hidden bg-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                          style={{
                            transformOrigin: 'right center',
                            transform:
                              activeUsabilitySide === 'right'
                                ? 'rotateY(0deg) scale(1)'
                                : 'rotateY(-28deg) scale(0.93)',
                            boxShadow:
                              activeUsabilitySide === 'right'
                                ? '0 18px 40px rgba(0, 0, 0, 0.16)'
                                : '0 10px 24px rgba(0, 0, 0, 0.1)',
                            filter: activeUsabilitySide === 'right' ? 'none' : 'saturate(0.8) brightness(0.96)',
                          }}
                          aria-label="Show refined usability view"
                        >
                          <img
                            src={UserTestAfter}
                            alt="TinyPaws refined usability screen"
                            className="w-full h-auto block object-cover"
                          />
                        </button>
                      </div>

                      <div className="relative min-h-[96px]">
                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            activeUsabilitySide === 'left'
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <p className="type-body text-black-normal m-0 text-left leading-[1.5]">
                            Confusing Navigation Bar:
                          </p>
                          <p className="type-body text-black-normal m-0 text-left leading-[1.5]">
                            Several menu labels felt interchangeable (e.g., &quot;Cats&quot; vs &quot;Adopt&quot;),
                            <br />
                             causing users to visit unintended pages and lose direction.
                          </p>
                        </div>

                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            activeUsabilitySide === 'right'
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <p className="type-body text-black-normal m-0 text-right leading-[1.5]">
                            Improving Navigation Clarity:
                          </p>
                          <p className="type-body text-black-normal m-0 text-right leading-[1.5]">
                            Navigation categories were reorganized with clearer wording,
                            <br />
                            making key actions easier to find and user flow more intuitive.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-8 mt-2">
                      <div
                        className="grid grid-cols-2 gap-8 items-start justify-items-center"
                        style={{ perspective: '1800px' }}
                      >
                        <button
                          type="button"
                          onMouseEnter={() => setActiveUsabilitySideSecond('left')}
                          onFocus={() => setActiveUsabilitySideSecond('left')}
                          onClick={() => setActiveUsabilitySideSecond('left')}
                          className="w-[94%] p-0 border border-black/10 rounded-[4px] overflow-hidden bg-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                          style={{
                            transformOrigin: 'left center',
                            transform:
                              activeUsabilitySideSecond === 'left'
                                ? 'rotateY(0deg) scale(1)'
                                : 'rotateY(28deg) scale(0.93)',
                            boxShadow:
                              activeUsabilitySideSecond === 'left'
                                ? '0 18px 40px rgba(0, 0, 0, 0.16)'
                                : '0 10px 24px rgba(0, 0, 0, 0.1)',
                            filter: activeUsabilitySideSecond === 'left' ? 'none' : 'saturate(0.8) brightness(0.96)',
                          }}
                          aria-label="Show low-fidelity volunteer page usability view"
                        >
                          <img
                            src={UserTestBeforeSecond}
                            alt="TinyPaws low-fidelity volunteer page screen"
                            className="w-full h-auto block object-cover"
                          />
                        </button>

                        <button
                          type="button"
                          onMouseEnter={() => setActiveUsabilitySideSecond('right')}
                          onFocus={() => setActiveUsabilitySideSecond('right')}
                          onClick={() => setActiveUsabilitySideSecond('right')}
                          className="w-[94%] p-0 border border-black/10 rounded-[4px] overflow-hidden bg-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                          style={{
                            transformOrigin: 'right center',
                            transform:
                              activeUsabilitySideSecond === 'right'
                                ? 'rotateY(0deg) scale(1)'
                                : 'rotateY(-28deg) scale(0.93)',
                            boxShadow:
                              activeUsabilitySideSecond === 'right'
                                ? '0 18px 40px rgba(0, 0, 0, 0.16)'
                                : '0 10px 24px rgba(0, 0, 0, 0.1)',
                            filter: activeUsabilitySideSecond === 'right' ? 'none' : 'saturate(0.8) brightness(0.96)',
                          }}
                          aria-label="Show refined volunteer page usability view"
                        >
                          <img
                            src={UserTestAfterSecond}
                            alt="TinyPaws refined volunteer page screen"
                            className="w-full h-auto block object-cover"
                          />
                        </button>
                      </div>

                      <div className="relative min-h-[126px]">
                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            activeUsabilitySideSecond === 'left'
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <p className="type-body text-black-normal m-0 text-left leading-[1.5]">
                            Overwhelming Information Layout:
                          </p>
                          <p className="type-body text-black-normal m-0 text-left leading-[1.5]">
                            Pages like &quot;Volunteer&quot; displayed too much content at once,
                            <br />
                            making information difficult to scan and visually overwhelming.
                          </p>
                        </div>

                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            activeUsabilitySideSecond === 'right'
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <p className="type-body text-black-normal m-0 text-right leading-[1.5]">
                            Strengthening Structure &amp; Calls to Action:
                          </p>
                          <p className="type-body text-black-normal m-0 text-right leading-[1.5]">
                            Content was condensed into clearer sections with consistent hierarchy,
                            <br />
                            supported by more visible and reliable call-to-action buttons.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 mt-16">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1]">High Fidelity Wireframes</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        High-fidelity wireframes were developed based on user testing insights and the established brand design system.
                        <br />
                        This stage refined usability, visual consistency, and interaction details aligned with the final product experience.
                      </p>
                      <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                        <iframe
                          title="TinyPaws high fidelity wireframes"
                          style={{ border: '0' }}
                          width="100%"
                          height="560"
                          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGLajfqOV2gqeDneSml8bE5%2FFi-Models%3Fnode-id%3D1-3%26t%3DgNF9B8TPbhJ9Evx2-1"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 04 Promotional Material */}
              <section className="px-7 pb-16 mt-12">
                <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                  <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">04 Promotional Material</h2>
                  <div className="grid gap-2 pl-48 max-w-[1280px]">
                    <div className="flex items-center">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Promotional Video</p>
                    </div>
                    <p className="type-body text-black-normal m-0 leading-[1.5]">
                      This promotional video was created to introduce the project and encourage user engagement with the platform.
                      <br />
                      Through a bright and welcoming tone, it highlights the experience of discovering and adopting rescue cats.
                      <br />
                      The video focuses on building an emotional connection while reinforcing the project&apos;s purpose and accessibility.
                    </p>
                    <div className="w-full border border-black/10 rounded-[4px] overflow-hidden bg-black">
                      <video className="w-full h-auto block" controls playsInline preload="metadata">
                        <source src={TinypawsPromotionalVideo} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </section>

              {/* 05 Final Results */}
              <section className="px-7 pb-16 mt-12">
                <div className="grid grid-cols-[260px_1fr] gap-12 items-start">
                  <h2 className="type-heading-2 text-black-normal m-0 leading-[1.2] whitespace-nowrap">05 Final Results</h2>
                  <div className="grid gap-2 pl-48 max-w-[1280px]">
                    <div className="flex items-center">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Mockup</p>
                    </div>
                    <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                      <img
                        src={TinypawsMockup}
                        alt="TinyPaws final mockup"
                        className="w-full h-auto block object-cover"
                      />
                    </div>

                    <div className="flex items-center mt-6">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Prototyping</p>
                    </div>
                    <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                      <iframe
                        title="TinyPaws prototype"
                        style={{ border: '0' }}
                        width="100%"
                        height="560"
                        src="https://www.figma.com/embed?embed_host=share&hide-ui=1&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FGLajfqOV2gqeDneSml8bE5%2FFi-Models%3Fpage-id%3D1%253A3%26node-id%3D191-1127%26viewport%3D2287%252C1347%252C0.16%26t%3D38Qt52GW30ibo8Rk-1%26scaling%3Dscale-down-width%26content-scaling%3Dfixed%26starting-point-node-id%3D191%253A1127"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </section>

              <Footer onNavigate={onNavigate} top={10600} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
