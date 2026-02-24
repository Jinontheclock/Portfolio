import { useState, type CSSProperties } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectHeader from './ProjectHeader';
import { Language, Page } from '../types';
import PrologBanner from '../assets/projects/prolog/prolog_banner.jpeg';
import PrologPersonaPrimary from '../assets/projects/prolog/prolog_persona_primary.png';
import PrologPersonaSecondary from '../assets/projects/prolog/prolog_persona_secondary.png';
import PrologLogoPrimary from '../assets/projects/prolog/prolog_logo1.png';
import PrologLogoSecondary from '../assets/projects/prolog/prolog_logo2.png';
import PrologUser1 from '../assets/projects/prolog/prolog_user1.png';
import PrologUser2 from '../assets/projects/prolog/prolog_user2.png';
import PrologUser3 from '../assets/projects/prolog/prolog_user3.png';
import PrologUser4 from '../assets/projects/prolog/prolog_user4.png';
import PrologUser5 from '../assets/projects/prolog/prolog_user5.png';
import PrologUser6 from '../assets/projects/prolog/prolog_user6.png';
import PrologPromotionalVideo from '../assets/projects/prolog/prolog_video.mp4';
import PrologVideoItem1 from '../assets/projects/prolog/prolog_video_item1.png';
import PrologVideoItem2 from '../assets/projects/prolog/prolog_video_item2.png';
import PrologBrochureMockup from '../assets/projects/prolog/prolog_mockup_brochure.png';
import PrologSticker1 from '../assets/projects/prolog/prolog_stickers1.png';
import PrologSticker2 from '../assets/projects/prolog/prolog_stickers2.png';
import PrologBillboard1 from '../assets/projects/prolog/prolog_billboard1.png';
import PrologBillboard2 from '../assets/projects/prolog/prolog_billboard2.png';
import PrologInstagram1 from '../assets/projects/prolog/prolog_instagram1.png';
import PrologInstagram2 from '../assets/projects/prolog/prolog_instagram2.png';
import PrologInstagram3 from '../assets/projects/prolog/prolog_instagram3.png';

type Props = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

const brandPalette = [
  { hex: '#141411', textClass: 'text-white' },
  { hex: '#E06D34', textClass: 'text-white' },
  { hex: '#323232', textClass: 'text-white' },
  { hex: '#F2F2F2', textClass: 'text-black/60' },
];

const typographyScale: Array<{ label: string; value: string; style: CSSProperties }> = [
  {
    label: 'Title',
    value: '32px Medium SpaceGrotesk',
    style: { fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif', fontSize: 32, fontWeight: 500, lineHeight: '1.2', letterSpacing: '0em' },
  },
  {
    label: 'Content_bold',
    value: '24px Bold SpaceGrotesk',
    style: { fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif', fontSize: 24, fontWeight: 700, lineHeight: '1.25', letterSpacing: '0em' },
  },
  {
    label: 'Content_regular',
    value: '24px Regular SpaceGrotesk',
    style: { fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif', fontSize: 24, fontWeight: 400, lineHeight: '1.25', letterSpacing: '0em' },
  },
  {
    label: 'Section header',
    value: '20px Regular SpaceGrotesk',
    style: { fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif', fontSize: 20, fontWeight: 400, lineHeight: '1.3', letterSpacing: '0em' },
  },
  {
    label: 'Content_medium',
    value: '20px Medium Roboto',
    style: { fontFamily: '"Roboto", "Plus Jakarta Sans", sans-serif', fontSize: 20, fontWeight: 500, lineHeight: '1.3', letterSpacing: '0em' },
  },
  {
    label: 'Content_suffix',
    value: '16px Light SpaceGrotesk',
    style: { fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif', fontSize: 16, fontWeight: 300, lineHeight: '1.4', letterSpacing: '0em' },
  },
  {
    label: 'bg_body',
    value: '16px Regular Roboto',
    style: { fontFamily: '"Roboto", "Plus Jakarta Sans", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '1.4', letterSpacing: '0em' },
  },
  {
    label: 'Content_title',
    value: '16px Medium Roboto',
    style: { fontFamily: '"Roboto", "Plus Jakarta Sans", sans-serif', fontSize: 16, fontWeight: 500, lineHeight: '1.4', letterSpacing: '0em' },
  },
  {
    label: 'Button_text',
    value: '14px Medium Roboto',
    style: { fontFamily: '"Roboto", "Plus Jakarta Sans", sans-serif', fontSize: 14, fontWeight: 500, lineHeight: '1.4', letterSpacing: '0em' },
  },
  {
    label: 'Content_subtitle',
    value: '14px Light Roboto',
    style: { fontFamily: '"Roboto", "Plus Jakarta Sans", sans-serif', fontSize: 14, fontWeight: 300, lineHeight: '1.4', letterSpacing: '0em' },
  },
  {
    label: 'sm_body',
    value: '12px Regular Roboto',
    style: { fontFamily: '"Roboto", "Plus Jakarta Sans", sans-serif', fontSize: 12, fontWeight: 400, lineHeight: '1.4', letterSpacing: '0em' },
  },
  {
    label: 'Caption_bold',
    value: '10px Bold SpaceGrotesk',
    style: { fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif', fontSize: 10, fontWeight: 700, lineHeight: '1.35', letterSpacing: '0em' },
  },
  {
    label: 'Caption_light',
    value: '10px Regular SpaceGrotesk',
    style: { fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif', fontSize: 10, fontWeight: 400, lineHeight: '1.35', letterSpacing: '0em' },
  },
];

const PROLOG_LAYOUT_BASE_HEIGHT = 15500;
const PROLOG_FOOTER_TOP = PROLOG_LAYOUT_BASE_HEIGHT - 300;

export default function ProjectProLog({ currentPage, language, onNavigate, onLanguageChange }: Props) {
  const [activeUsabilitySide, setActiveUsabilitySide] = useState<'left' | 'right'>('left');
  const [activeUsabilitySideSecond, setActiveUsabilitySideSecond] = useState<'left' | 'right'>('left');
  const [activeUsabilitySideThird, setActiveUsabilitySideThird] = useState<'left' | 'right'>('left');

  return (
    <div className="layout-viewport hide-scrollbar bg-grey-normal">
      <div className="layout-canvas" style={{ "--layout-base-height": `${PROLOG_LAYOUT_BASE_HEIGHT}px` } as CSSProperties}>
        <div className="layout-canvas-inner">
          <div className="relative" style={{ minHeight: "var(--layout-base-height)" } as CSSProperties}>
            <Header currentPage={currentPage} language={language} onNavigate={onNavigate} onLanguageChange={onLanguageChange} />

            <div className="flex flex-col gap-0 mt-12">
              <ProjectHeader
                title="ProLog"
                category="App"
                timeline="4 months"
                tools={['Figma', 'HTML5', 'CSS3', 'JavaScript', 'React Native Expo', 'Trello', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere']}
                role="UI Developer"
                roleLabel="Role"
                dividerHeight={300}
                link={['Website', 'Instagram', 'Blog', 'GitHub']}
                linkUrls={{
                  Website: 'https://prolog.framer.website/',
                  Instagram: 'https://www.instagram.com/prolog.app/',
                  Blog: 'https://prolog.framer.website/blog',
                  GitHub: 'https://github.com/Jinontheclock/ProLog.git',
                }}
                description={[
                  'This project aims to address the lack of clarity and structure in the apprenticeship journey, where fragmented systems make it difficult for apprentices to understand their progress.',
                  'In collaboration with SkilledTradesBC and ConnectHER, Prolog was developed as a mobile platform that centralizes key resources and provides a clearer, more structured way to navigate training and track progress.',
                ]}
              />

              {/* Hero image */}
              <section className="px-7">
                <div className="flex justify-center">
                  <div className="relative w-full max-w-[1400px] aspect-[14/4.6] overflow-hidden">
                    <img
                      src={PrologBanner}
                      alt="ProLog overview"
                      className="absolute left-0 top-1/2 w-full h-auto -translate-y-1/2"
                    />
                  </div>
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
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Low Completion Rate</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5]">
                        Only 40% of apprentices in British Columbia complete their program within six years,
                        <br />
                        showing how unclear and demanding the pathway can be.
                      </p>
                    </div>

                    <div>
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Risk of Delay</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5]">
                        Work hours must be submitted through sponsor reporting processes,
                        <br />
                        meaning missing or inconsistent information can delay apprenticeship progression.
                      </p>
                    </div>

                    <div>
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Disconnected Progress Systems</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5]">
                        Apprenticeship progress depends on multiple separate systems,
                        <br />
                        making it difficult for individuals to understand where they stand.
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
                        Interviewed skilled trades apprentices across BC from entry-level to journey persons.
                      </p>
                    </div>

                    <div>
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Findings</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5]">
                        Requirements are understood, but guidance is scattered across disconnected sources.
                        <br />
                        Most apprentices rely on mobile access, confirming the need for on-site usability.
                        <br />
                        Hour verification and supervisor sign-offs often create delays and anxiety.
                        <br />
                        Many feel uncertain about where to turn for support.
                      </p>
                    </div>

                    <div>
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Needs</p>
                      <p className="type-body m-0 text-black-normal leading-[1.5]">
                        A centralized way to visualize progress toward certification.
                        <br />
                        Transparent tools to log hours, resolve discrepancies, and request approvals.
                        <br />
                        Quick, mobile-friendly learning resources.
                        <br />
                        Clear pathways to help, including who to contact when issues arise.
                      </p>
                    </div>

                    <div>
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Competitor Research</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5] mt-1">
                        Reviewed existing apprenticeship tools such as SkilledTradesBC portals, competency documents, union resources,
                        <br />
                        and online forums. While these platforms offer partial support, the secondary research showed that apprentices
                        <br />
                        still face fragmented guidance, unclear hour verification, limited mentorship, and difficulty accessing reliable study materials.
                        <br />
                        Most solutions do not centralize these needs in one place.
                        <br />
                        Prolog stands out by offering three key features: progress and hour tracking, competency-based learning support,
                        <br />
                        and integrated mentorship and funding resources.
                      </p>
                    </div>

                    {/* User Persona */}
                    <div className="grid gap-2">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">User Persona</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        Two contrasting personas were developed to capture the needs and challenges of apprentices from entry-level to experienced stages.
                        These insights informed key feature directions such as progress tracking, resource accessibility, and financial support.
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        <img
                          src={PrologPersonaPrimary}
                          alt="ProLog primary persona"
                          className="w-full h-auto object-contain"
                        />
                        <img
                          src={PrologPersonaSecondary}
                          alt="ProLog secondary persona"
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
                        The site map organizes core features into clear sections such as Work, School, Journey, Finances, and Competencies.
                        It structures the user flow to centralize scattered resources and make progress tracking and navigation more intuitive.
                      </p>
                    </div>
                    <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                      <iframe
                        title="ProLog Site Map"
                        style={{ border: '0' }}
                        width="100%"
                        height="520"
                        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2FPk2juekCD0mfnQ9oxcyWqh%2FSitemaps%3Fnode-id%3D0-1%26t%3Dcw8l2CASw0Xs9Hra-1"
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
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Logo Design</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        Inspired by modular systems and structured pathways, the logo reflects the step-by-step progression of an apprenticeship journey.
                        The geometric form and grid-based construction emphasize clarity, connection, and incremental growth.
                      </p>
                    </div>
                    <div className="grid grid-cols-[220px_1fr] gap-10 items-center max-w-[980px]">
                      <img
                        src={PrologLogoPrimary}
                        alt="ProLog primary logo"
                        className="w-full h-[220px] object-contain"
                      />
                      <img
                        src={PrologLogoSecondary}
                        alt="ProLog horizontal logo"
                        className="w-full h-[220px] object-contain"
                      />
                    </div>

                    <div className="grid gap-2">
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Colors</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        The palette combines industrial-inspired neutrals with a bold orange accent to highlight progress and key actions.
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

                    <div className="grid gap-2">
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Typography</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        A structured typographic system using Space Grotesk and Roboto establishes clear hierarchy and readability while maintaining a clean, modern tone.
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
                                  You've completed 1,240 hours, keep going.
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 mt-0">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1]">Wireframes &amp; Prototyping</p>

                      <div className="grid gap-6 mt-2">
                        <div className="grid gap-2">
                          <p className="type-body-lg m-0 text-black-normal font-semibold">Low Fidelity Wireframes</p>
                          <p className="type-body text-black-normal m-0 leading-[1.5]">
                            Low-fidelity wireframes were used to quickly explore layout, user flow, and core functionality.
                            This stage focused on structuring key features and validating early interaction patterns.
                          </p>
                          <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                            <iframe
                              title="ProLog low fidelity wireframes"
                              style={{ border: '0' }}
                              width="100%"
                              height="560"
                              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FxhdHkhEMLlKW1obKSbXiRi%2FWireframe--Old-%3Fnode-id%3D1157-13592%26t%3DEaRVkTnZdixYNRzQ-1"
                              allowFullScreen
                            />
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <p className="type-body-lg m-0 text-black-normal font-semibold">Mid Fidelity Wireframes</p>
                          <p className="type-body text-black-normal m-0 leading-[1.5]">
                            Mid-fidelity wireframes refined the interface with clearer hierarchy and more defined components.
                            This stage focused on improving usability, consistency, and preparing for visual design.
                          </p>
                          <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                            <iframe
                              title="ProLog middle fidelity wireframes"
                              style={{ border: '0' }}
                              width="100%"
                              height="560"
                              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FxhdHkhEMLlKW1obKSbXiRi%2FWireframe--Old-%3Fnode-id%3D1157-8496%26t%3DEaRVkTnZdixYNRzQ-1"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 mt-0">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1]">Usability Test</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        Five skilled trades apprentices were invited to test Prolog&apos;s core tracking and resource features.
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
                          className="w-[66%] p-0 border border-black/10 rounded-[4px] overflow-hidden bg-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
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
                          aria-label="Show ProLog usability progress baseline"
                        >
                          <img
                            src={PrologUser1}
                            alt="ProLog usability test baseline progress view"
                            className="w-full h-auto block object-cover"
                          />
                        </button>

                        <button
                          type="button"
                          onMouseEnter={() => setActiveUsabilitySide('right')}
                          onFocus={() => setActiveUsabilitySide('right')}
                          onClick={() => setActiveUsabilitySide('right')}
                          className="w-[66%] p-0 border border-black/10 rounded-[4px] overflow-hidden bg-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
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
                          aria-label="Show ProLog usability improved progress view"
                        >
                          <img
                            src={PrologUser2}
                            alt="ProLog usability test improved progress view"
                            className="w-full h-auto block object-cover"
                          />
                        </button>
                      </div>

                      <div className="relative min-h-[160px]">
                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            activeUsabilitySide === 'left'
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <p className="type-body text-black-normal m-0 text-left leading-[1.5]">
                            Limited Progress Visibility:
                          </p>
                          <p className="type-body text-black-normal m-0 text-left leading-[1.5]">
                            Training hours were not interactive
                            <br />
                             making it difficult for users to understand detailed progress toward the next level.
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
                            Improving Progress Tracking:
                          </p>
                          <p className="type-body text-black-normal m-0 text-right leading-[1.5]">
                            Clickable hour breakdowns and clearer progress indicators were introduced
                            <br />
                            to help apprentices explore requirements with confidence.
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
                          className="w-[66%] p-0 border border-black/10 rounded-[4px] overflow-hidden bg-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
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
                          aria-label="Show ProLog usability navigation baseline"
                        >
                          <img
                            src={PrologUser3}
                            alt="ProLog usability test baseline navigation view"
                            className="w-full h-auto block object-cover"
                          />
                        </button>

                        <button
                          type="button"
                          onMouseEnter={() => setActiveUsabilitySideSecond('right')}
                          onFocus={() => setActiveUsabilitySideSecond('right')}
                          onClick={() => setActiveUsabilitySideSecond('right')}
                          className="w-[66%] p-0 border border-black/10 rounded-[4px] overflow-hidden bg-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
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
                          aria-label="Show ProLog usability improved navigation view"
                        >
                          <img
                            src={PrologUser4}
                            alt="ProLog usability test improved navigation view"
                            className="w-full h-auto block object-cover"
                          />
                        </button>
                      </div>

                      <div className="relative min-h-[160px]">
                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            activeUsabilitySideSecond === 'left'
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <p className="type-body text-black-normal m-0 text-left leading-[1.5]">
                            Confusing Navigation:
                          </p>
                          <p className="type-body text-black-normal m-0 text-left leading-[1.5]">
                            Several key buttons (finance tools, reminders) were non-functional or difficult to locate,
                            <br />
                            interrupting the user flow.
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
                            Enhancing Navigation Clarity:
                          </p>
                          <p className="type-body text-black-normal m-0 text-right leading-[1.5]">
                            Core features were reorganized and primary actions
                            <br />
                            were made more visible to ensure smoother task completion.
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
                          onMouseEnter={() => setActiveUsabilitySideThird('left')}
                          onFocus={() => setActiveUsabilitySideThird('left')}
                          onClick={() => setActiveUsabilitySideThird('left')}
                          className="w-[66%] p-0 border border-black/10 rounded-[4px] overflow-hidden bg-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                          style={{
                            transformOrigin: 'left center',
                            transform:
                              activeUsabilitySideThird === 'left'
                                ? 'rotateY(0deg) scale(1)'
                                : 'rotateY(28deg) scale(0.93)',
                            boxShadow:
                              activeUsabilitySideThird === 'left'
                                ? '0 18px 40px rgba(0, 0, 0, 0.16)'
                                : '0 10px 24px rgba(0, 0, 0, 0.1)',
                            filter: activeUsabilitySideThird === 'left' ? 'none' : 'saturate(0.8) brightness(0.96)',
                          }}
                          aria-label="Show ProLog usability visual cues baseline"
                        >
                          <img
                            src={PrologUser5}
                            alt="ProLog usability test baseline visual cues view"
                            className="w-full h-auto block object-cover"
                          />
                        </button>

                        <button
                          type="button"
                          onMouseEnter={() => setActiveUsabilitySideThird('right')}
                          onFocus={() => setActiveUsabilitySideThird('right')}
                          onClick={() => setActiveUsabilitySideThird('right')}
                          className="w-[66%] p-0 border border-black/10 rounded-[4px] overflow-hidden bg-white cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                          style={{
                            transformOrigin: 'right center',
                            transform:
                              activeUsabilitySideThird === 'right'
                                ? 'rotateY(0deg) scale(1)'
                                : 'rotateY(-28deg) scale(0.93)',
                            boxShadow:
                              activeUsabilitySideThird === 'right'
                                ? '0 18px 40px rgba(0, 0, 0, 0.16)'
                                : '0 10px 24px rgba(0, 0, 0, 0.1)',
                            filter: activeUsabilitySideThird === 'right' ? 'none' : 'saturate(0.8) brightness(0.96)',
                          }}
                          aria-label="Show ProLog usability improved visual cues view"
                        >
                          <img
                            src={PrologUser6}
                            alt="ProLog usability test improved visual cues view"
                            className="w-full h-auto block object-cover"
                          />
                        </button>
                      </div>

                      <div className="relative min-h-[160px]">
                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            activeUsabilitySideThird === 'left'
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <p className="type-body text-black-normal m-0 text-left leading-[1.5]">
                            Unclear Visual Cues:
                          </p>
                          <p className="type-body text-black-normal m-0 text-left leading-[1.5]">
                            Users requested stronger contrast and clearer indicators
                            <br />
                            for tappable elements and important actions.
                          </p>
                        </div>

                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            activeUsabilitySideThird === 'right'
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <p className="type-body text-black-normal m-0 text-right leading-[1.5]">
                            Strengthening Interface Feedback:
                          </p>
                          <p className="type-body text-black-normal m-0 text-right leading-[1.5]">
                            Visual hierarchy and interaction cues were refined
                            <br />
                             to improve readability and usability on mobile screens.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2 mt-0">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1]">High Fidelity Wireframes</p>
                      <p className="type-body text-black-normal m-0 leading-[1.5]">
                        High-fidelity wireframes translate validated layouts into detailed screens with finalized UI components and visual styles.
                        Refinements were informed by usability testing, improving interactions and ensuring consistency across the main user flows.
                      </p>
                      <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                        <iframe
                          title="ProLog high fidelity wireframes"
                          style={{ border: '0' }}
                          width="100%"
                          height="560"
                          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FZmmIx6VY9EicEFrv7Rvdjh%2FWireFrames%3Fnode-id%3D2332-2031%26t%3DDaKp6m2Vxulc4R1d-1"
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
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Advertisment</p>
                    </div>
                    <p className="type-body text-black-normal m-0 leading-[1.5]">
                      A promotional video was created to introduce Prolog, communicate its value, and encourage user engagement through a clear and approachable narrative.
                    </p>
                    <div className="grid grid-cols-2 gap-6 -mt-10">
                      <div className="w-full rounded-[4px] overflow-hidden h-[560px]">
                        <img
                          src={PrologVideoItem1}
                          alt="ProLog advertisement item 1"
                          className="w-full h-full block object-contain"
                        />
                      </div>
                      <div className="w-full rounded-[4px] overflow-hidden h-[560px]">
                        <img
                          src={PrologVideoItem2}
                          alt="ProLog advertisement item 2"
                          className="w-full h-full block object-contain"
                        />
                      </div>
                    </div>
                    <div className="w-full border border-black/10 rounded-[4px] overflow-hidden bg-black -mt-10">
                      <video className="w-full h-auto block" controls playsInline preload="metadata">
                        <source src={PrologPromotionalVideo} type="video/mp4" />
                      </video>
                    </div>

                    <div className="flex items-center mt-6">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Printed promotional materials</p>
                    </div>
                    <p className="type-body text-black-normal m-0 leading-[1.5]">
                      The brochure, stickers and billboards were designed as promotional materials to be distributed to guests at the showcase, reinforcing brand identity and engagement.
                    </p>

                    <div className="flex items-center mt-6">
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Brochure</p>
                    </div>
                    <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                      <img
                        src={PrologBrochureMockup}
                        alt="ProLog brochure mockup"
                        className="w-full h-auto block object-cover"
                      />
                    </div>

                    <div className="flex items-center mt-6">
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Sticker</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 items-end">
                      <div className="flex h-[320px] items-end justify-center">
                        <img
                          src={PrologSticker2}
                          alt="ProLog sticker mockup 2"
                          className="w-auto h-[280px] block object-contain"
                        />
                      </div>
                      <div className="flex h-[320px] items-end justify-center">
                        <img
                          src={PrologSticker1}
                          alt="ProLog sticker mockup 1"
                          className="w-auto h-[320px] block object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex items-center mt-6">
                      <p className="type-body-lg m-0 text-black-normal font-semibold">Billboard</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                        <img
                          src={PrologBillboard1}
                          alt="ProLog billboard mockup 1"
                          className="w-full h-auto block object-cover"
                        />
                      </div>
                      <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                        <img
                          src={PrologBillboard2}
                          alt="ProLog billboard mockup 2"
                          className="w-full h-auto block object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex items-center mt-6">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Instagram</p>
                    </div>
                    <p className="type-body text-black-normal m-0 leading-[1.5]">
                      Designed in Instagram&apos;s frame format for social media posts, ensuring consistency across each slide.
                      Each frame was intentionally connected to create a seamless and continuous narrative when swiping.
                    </p>
                    <div className="grid gap-6">
                      <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                        <img
                          src={PrologInstagram1}
                          alt="ProLog instagram post 1"
                          className="w-full h-auto block object-cover"
                        />
                      </div>
                      <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                        <img
                          src={PrologInstagram2}
                          alt="ProLog instagram post 2"
                          className="w-full h-auto block object-cover"
                        />
                      </div>
                      <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                        <img
                          src={PrologInstagram3}
                          alt="ProLog instagram post 3"
                          className="w-full h-auto block object-cover"
                        />
                      </div>
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
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">Prototyping</p>
                    </div>
                    <div className="w-full border border-black/10 rounded-[4px] overflow-hidden">
                      <iframe
                        title="ProLog prototype"
                        style={{ border: '0' }}
                        width="100%"
                        height="560"
                        src="https://www.figma.com/embed?embed_host=share&hide-ui=1&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FZmmIx6VY9EicEFrv7Rvdjh%2FWireFrames%3Fpage-id%3D2332%253A2031%26node-id%3D3814-20926%26p%3Df%26viewport%3D719%252C470%252C0.06%26t%3DbRs0KPqwlh1Pl2k9-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D3814%253A20926%26show-proto-sidebar%3D1"
                        allowFullScreen
                      />
                    </div>

                    <div className="flex items-center mt-6">
                      <p className="type-heading-3 text-black-normal m-0 leading-[1.3]">App</p>
                    </div>
                    <div className="w-full border border-black/10 rounded-[4px] overflow-hidden bg-white">
                      <iframe
                        title="ProLog app (React Expo)"
                        style={{ border: '0' }}
                        width="100%"
                        height="720"
                        src="/prolog/app/index.html?v=20260219"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </section>

              <Footer onNavigate={onNavigate} top={PROLOG_FOOTER_TOP} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
