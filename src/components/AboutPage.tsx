import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Language, Page } from '../types';
import RevealLine from './RevealLine';

const aboutPhotoModules = import.meta.glob('../assets/aboutme/aboutme*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const photos = Object.entries(aboutPhotoModules)
  .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: 'base' }))
  .map(([path, src]) => ({
    src,
    filename: path.split('/').pop() ?? path,
  }));

type AboutPhotoCaption = {
  title: string;
  year: string;
};

const ABOUT_PHOTO_CAPTIONS: Record<string, AboutPhotoCaption> = {
  aboutme1: {
    title: 'Christian Boltanski at MOT',
    year: '2019',
  },
  aboutme2: {
    title: 'Thomas Demand at TFAM',
    year: '2025',
  },
};

function resolveAboutCaption(filename: string) {
  const normalized = filename.toLowerCase().replace(/\.[^.]+$/, '');
  return ABOUT_PHOTO_CAPTIONS[normalized] ?? ABOUT_PHOTO_CAPTIONS.aboutme1;
}

type AboutPageProps = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

type PhotoDirection = 'prev' | 'next';
const ABOUT_PAGE_LAYOUT_BASE_HEIGHT = 2800;
const ABOUT_PAGE_FOOTER_OFFSET = 232;
const ABOUT_PAGE_FOOTER_TOP = ABOUT_PAGE_LAYOUT_BASE_HEIGHT - ABOUT_PAGE_FOOTER_OFFSET;

export default function AboutPage({ currentPage, language, onNavigate, onLanguageChange }: AboutPageProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [leavingPhotoIndex, setLeavingPhotoIndex] = useState<number | null>(null);
  const [photoDirection, setPhotoDirection] = useState<PhotoDirection>('next');
  const transitionTimerRef = useRef<number | null>(null);
  const currentPhoto = photos[photoIndex] ?? photos[0];
  const currentImage = currentPhoto?.src ?? '';
  const currentCaption = resolveAboutCaption(currentPhoto?.filename ?? '');
  const leavingImage = leavingPhotoIndex !== null ? (photos[leavingPhotoIndex]?.src ?? '') : '';
  const total = photos.length;
  const isTransitioning = leavingPhotoIndex !== null;
  const PHOTO_TRANSITION_MS = 520;
  const heroImageFrame = {
    top: 839,
    left: 'calc(25% + 190px)',
    right: 24,
    height: 625,
    maxWidth: 1038,
  } as const;
  const captionTop = 1470;

  useEffect(() => {
    if (total === 0) {
      setPhotoIndex(0);
      setLeavingPhotoIndex(null);
      return;
    }

    setPhotoIndex((prev) => Math.min(prev, total - 1));
  }, [total]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const changePhoto = (direction: PhotoDirection) => {
    if (total <= 1 || isTransitioning) return;

    setPhotoDirection(direction);
    setLeavingPhotoIndex(photoIndex);
    setPhotoIndex((current) => {
      if (direction === 'next') return (current + 1) % total;
      return (current - 1 + total) % total;
    });

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = window.setTimeout(() => {
      setLeavingPhotoIndex(null);
      transitionTimerRef.current = null;
    }, PHOTO_TRANSITION_MS);
  };

  const goPrev = () => changePhoto('prev');
  const goNext = () => changePhoto('next');
  const renderTextReveal = (content: ReactNode, delayMs: number) => (
    <span
      className="project-header-reveal-line"
      style={{ ['--project-header-reveal-delay' as string]: `${delayMs}ms` } as CSSProperties}
    >
      <span className="project-header-reveal-text">{content}</span>
    </span>
  );

  return (
    <div className="layout-viewport hide-scrollbar">
      <div className="layout-canvas" style={{ "--layout-base-height": `${ABOUT_PAGE_LAYOUT_BASE_HEIGHT}px` } as CSSProperties}>
        <div className="layout-canvas-inner">
          <div
            className="relative bg-grey-normal text-black-normal"
            style={{ minHeight: "var(--layout-base-height)" } as CSSProperties}
          >
            <div className="tinypaws-page-enter-overlay" aria-hidden>
              <span className="tinypaws-page-enter-overlay-base" />
            </div>
            <div className="tinypaws-page-enter-content">
            <Header
              currentPage={currentPage}
              language={language}
              onNavigate={onNavigate}
              onLanguageChange={onLanguageChange}
            />

            {/* Hero title and year */}
            <p className="absolute type-title-2 left-[24px] top-[193px] leading-[1]">{renderTextReveal('Hajin', 980)}</p>
            <p className="absolute type-title-2 left-[24px] top-[337px] leading-[1]">{renderTextReveal('Lee', 1040)}</p>
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[160px] leading-[1] right-[24px] top-[193px]">
              {renderTextReveal('2026©', 1010)}
            </p>

            {/* About intro */}
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[32px] left-[24px] top-[648px]">
              {renderTextReveal('About Me', 1120)}
            </p>
            <div className="absolute type-body-lg" style={{ left: 'calc(37.5% + 15px)', top: 648, width: 861 }}>
              <p className="mb-0">
                {renderTextReveal(
                  'Originally from Seoul, I moved to Canada in 2024 to transition my career into UX/UI design.',
                  1160
                )}
              </p>
              <p className="mb-0">
                {renderTextReveal(
                  <>
                    With professional experience in the Japanese retail industry, I developed a strong foundation in an
                    experience-focused mindset and purposeful visual storytelling through visual merchandising. Shaped by
                    diverse cultural experiences, I bring a flexible way of thinking into digital design.
                  </>,
                  1200
                )}
              </p>
            </div>

            {/* Hero image */}
            <div
              className="absolute overflow-hidden"
              style={heroImageFrame}
            >
              {leavingImage && (
                <img
                  src={leavingImage}
                  alt=""
                  aria-hidden
                  className={`about-photo-layer ${
                    photoDirection === 'next' ? 'about-photo-exit-next' : 'about-photo-exit-prev'
                  }`}
                />
              )}
              {currentImage && (
                <img
                  src={currentImage}
                  alt={currentCaption.title}
                  className={`about-photo-layer ${
                    isTransitioning
                      ? photoDirection === 'next'
                        ? 'about-photo-enter-next'
                        : 'about-photo-enter-prev'
                      : ''
                  }`}
                />
              )}
            </div>
            {/* Image captions */}
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black" style={{ left: heroImageFrame.left, top: captionTop }}>
              {currentCaption.title}
            </p>
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black" style={{ left: heroImageFrame.left, top: captionTop + 11 }}>
              {currentCaption.year}
            </p>
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black" style={{ left: 'calc(62.5% + 9px)', top: captionTop }}>
              {String(total === 0 ? 0 : photoIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={goPrev}
              disabled={total <= 1 || isTransitioning}
              className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-default"
              style={{ left: 'calc(75% + 137px)', top: captionTop - 4 }}
              aria-label="Previous photo"
            >
              prev
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={total <= 1 || isTransitioning}
              className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-default"
              style={{ left: 'calc(87.5% + 3px)', top: captionTop - 4 }}
              aria-label="Next photo"
            >
              next
            </button>

            {/* Secondary paragraph */}
            <div className="absolute type-body-lg" style={{ left: 'calc(37.5% + 15px)', top: 1608, width: 860 }}>
              I approach design with a focus on clarity and real-world feasibility. I identify challenges within user flows and refine interfaces through clear structure and iterative improvement. With a combined understanding of graphic design and development, I value delivering seamless, frustration-free digital experiences that go beyond aesthetics.
            </div>

            {/* Vertical dividers for stacks */}
            {['calc(25% + 18px)', 'calc(50% + 12px)', 'calc(75% + 6px)'].map((left, idx) => (
              <RevealLine
                key={left}
                height={264}
                className="absolute"
                style={{ left, top: 1896 }}
                color="rgba(33,34,34,0.6)"
                delayMs={idx * 60}
              />
            ))}

            {/* Design Stack */}
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[24px] left-[calc(25%+30px)] top-[1896px]">
              Design Stack
            </p>
            {['Figma', 'Photoshop', 'Illustrator', 'Indesign', 'After Effects'].map((item, idx) => (
              <p
                key={item}
                className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px] left-[calc(25%+30px)]"
                style={{ top: 1944 + idx * 24 }}
              >
                {item}
              </p>
            ))}

            {/* Tech Stack */}
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[24px] left-[calc(50%+24px)] top-[1896px]">
              Tech Stack
            </p>
            {['Vercel', 'WordPress', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Git'].map((item, idx) => (
              <p
                key={item}
                className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px] left-[calc(50%+24px)]"
                style={{ top: 1944 + idx * 24 }}
              >
                {item}
              </p>
            ))}

            {/* Productivity Tools */}
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[24px] left-[calc(75%+18px)] top-[1896px]">
              Productivity Tools
            </p>
            {['PowerPoint', 'Excel', 'Word', 'Notion', 'Google Workspace', 'Trello'].map((item, idx) => (
              <p
                key={item}
                className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px] left-[calc(75%+18px)]"
                style={{ top: 1944 + idx * 24 }}
              >
                {item}
              </p>
            ))}

            {/* Education */}
            <div className="absolute" style={{ left: 'calc(25% + 30px)', top: 2256, width: 391 }}>
              <RevealLine height={216} className="absolute" style={{ left: -12, top: 0 }} color="rgba(33,34,34,0.6)" />
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[24px] mb-[12px]">Education</p>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px] m-0">2026</p>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px] m-0">Digital Design and Development</p>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px] mb-[12px]">
                British Columbia Institute of Technology
              </p>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px] m-0">2022</p>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px] m-0">Fashion Design and Textiles</p>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px]">Inha University</p>
            </div>

            {/* Footer line and nav block */}
            <div className="absolute left-[24px] right-[24px] h-0 border-t border-black/60" style={{ top: ABOUT_PAGE_FOOTER_TOP }} />
            <Footer onNavigate={onNavigate} top={ABOUT_PAGE_FOOTER_TOP} showTopLine={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
