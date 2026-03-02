import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Language, Page } from '../types';
import RevealLine from './RevealLine';

const aboutPhotoModules = import.meta.glob('../assets/aboutme/[0-9]*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

type AboutPhotoCaption = {
  title: string;
  year: string;
};

const PINNED_FIRST_PHOTO_FILENAME = '2020_Moerenuma Park_Sapporo.webp';

function shufflePhotos<T>(items: T[]) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const preloadedAboutImageSrc = new Set<string>();

function preloadAboutImage(src: string) {
  if (!src || preloadedAboutImageSrc.has(src) || typeof window === 'undefined') return;

  preloadedAboutImageSrc.add(src);
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
}

function toReadableToken(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
}

function captionFromFilename(filename: string): AboutPhotoCaption {
  const baseName = filename.replace(/\.[^.]+$/, '').trim();
  const parts = baseName
    .split('_')
    .map((part) => toReadableToken(part))
    .filter(Boolean);

  if (parts.length === 0) return { title: '', year: '' };

  const year = /^\d{4}$/.test(parts[0]) ? parts[0] : '';
  const contentParts = year ? parts.slice(1) : parts;
  const normalizedContentParts = [...contentParts];

  if (
    year &&
    normalizedContentParts.length > 1 &&
    /^\d{4}$/.test(normalizedContentParts[normalizedContentParts.length - 1]) &&
    normalizedContentParts[normalizedContentParts.length - 1] === year
  ) {
    normalizedContentParts.pop();
  }

  if (normalizedContentParts.length === 0) {
    return { title: baseName, year };
  }

  const maybeLocation = normalizedContentParts.length > 1 ? normalizedContentParts[normalizedContentParts.length - 1] : '';
  const hasLocation = Boolean(maybeLocation) && !/^\d{4}$/.test(maybeLocation);
  const titleParts = hasLocation ? normalizedContentParts.slice(0, -1) : normalizedContentParts;
  const titleMain = titleParts.join(' ').trim();
  const title = hasLocation && titleMain ? `${titleMain}, ${maybeLocation}` : (titleMain || maybeLocation || baseName);

  return { title, year };
}

const aboutPhotoList = Object.entries(aboutPhotoModules)
  .map(([path, src]) => {
    const filename = path.split('/').pop() ?? path;
    return {
      src,
      filename,
      caption: captionFromFilename(filename),
    };
  });

const pinnedFirstPhoto = aboutPhotoList.find((photo) => photo.filename === PINNED_FIRST_PHOTO_FILENAME);
const remainingPhotos = shufflePhotos(aboutPhotoList.filter((photo) => photo.filename !== PINNED_FIRST_PHOTO_FILENAME));
const photos = pinnedFirstPhoto ? [pinnedFirstPhoto, ...remainingPhotos] : remainingPhotos;

type AboutPageProps = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

type PhotoDirection = 'prev' | 'next';
const ABOUT_PAGE_LAYOUT_BASE_HEIGHT = 2800;
const ABOUT_PAGE_FOOTER_OFFSET = 232;
const ABOUT_PAGE_FOOTER_TOP = ABOUT_PAGE_LAYOUT_BASE_HEIGHT - ABOUT_PAGE_FOOTER_OFFSET + 80;

export default function AboutPage({ currentPage, language, onNavigate, onLanguageChange }: AboutPageProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [leavingPhotoIndex, setLeavingPhotoIndex] = useState<number | null>(null);
  const [photoDirection, setPhotoDirection] = useState<PhotoDirection>('next');
  const transitionTimerRef = useRef<number | null>(null);
  const currentPhoto = photos[photoIndex] ?? photos[0];
  const currentImage = currentPhoto?.src ?? '';
  const currentCaption = currentPhoto?.caption ?? { title: '', year: '' };
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
    if (total === 0) return;

    // Preload current + nearby photos so prev/next transitions can start from cache.
    [0, 1, 2, -1, -2].forEach((offset) => {
      const targetIndex = (photoIndex + offset + total) % total;
      preloadAboutImage(photos[targetIndex]?.src ?? '');
    });
  }, [photoIndex, total]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const changePhoto = (direction: PhotoDirection) => {
    if (total <= 1 || isTransitioning) return;

    const nextIndex = direction === 'next' ? (photoIndex + 1) % total : (photoIndex - 1 + total) % total;
    preloadAboutImage(photos[nextIndex]?.src ?? '');

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
                  'Originally from Seoul, I moved to Vancouver in 2024 to transition my career into UX/UI design.',
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
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
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
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black-normal" style={{ left: heroImageFrame.left, top: captionTop }}>
              {currentCaption.title}
            </p>
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black-normal" style={{ left: heroImageFrame.left, top: captionTop + 11 }}>
              {currentCaption.year}
            </p>
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black-normal" style={{ left: 'calc(62.5% + 9px)', top: captionTop }}>
              {String(total === 0 ? 0 : photoIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={goPrev}
              disabled={total <= 1 || isTransitioning}
              className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black-normal bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-default"
              style={{ left: 'calc(75% + 137px)', top: captionTop - 4 }}
              aria-label="Previous photo"
            >
              prev
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={total <= 1 || isTransitioning}
              className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black-normal bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-default"
              style={{ left: 'calc(87.5% + 3px)', top: captionTop - 4 }}
              aria-label="Next photo"
            >
              next
            </button>

            {/* Secondary paragraph */}
            <div className="absolute type-body-lg" style={{ left: 'calc(37.5% + 15px)', top: 1580, width: 860 }}>
              I approach design with a focus on clarity and real-world feasibility, identify challenges within user flows and refine interfaces through clear structure and iterative improvement.
              <br />
              With a combined understanding of graphic design and development, I value delivering seamless, frustration-free digital experiences that go beyond aesthetics.
            </div>

            {/* Vertical dividers for stacks */}
            {['calc(25% + 18px)', 'calc(50% + 12px)', 'calc(75% + 6px)'].map((left, idx) => (
              <RevealLine
                key={left}
                height={260}
                thickness={1}
                className="absolute"
                style={{ left, top: 1864 }}
                color="var(--color-black-normal)"
                delayMs={idx * 60}
              />
            ))}

            {/* Design Stack */}
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[24px] left-[calc(25%+30px)] top-[1856px]">
              Design Stack
            </p>
            {['Figma', 'After Effects', 'Photoshop', 'Illustrator', 'InDesign', ].map((item, idx) => (
              <p
                key={item}
                className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px] left-[calc(25%+30px)]"
                style={{ top: 1904 + idx * 24 }}
              >
                {item}
              </p>
            ))}

            {/* Tech Stack */}
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[24px] left-[calc(50%+24px)] top-[1856px]">
              Tech Stack
            </p>
            {['WordPress', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Git' ].map((item, idx) => (
              <p
                key={item}
                className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px] left-[calc(50%+24px)]"
                style={{ top: 1904 + idx * 24 }}
              >
                {item}
              </p>
            ))}

            {/* Productivity Tools */}
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[24px] left-[calc(75%+18px)] top-[1856px]">
              Productivity Tools
            </p>
            {[ 'Google Workspace', 'PowerPoint', 'Excel', 'Word', 'Notion'].map((item, idx) => (
              <p
                key={item}
                className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[18px] left-[calc(75%+18px)]"
                style={{ top: 1904 + idx * 24 }}
              >
                {item}
              </p>
            ))}

            {/* Education */}
            <div className="absolute" style={{ left: 'calc(25% + 30px)', top: 2216, width: 391 }}>
              <RevealLine height={260} thickness={1} className="absolute" style={{ left: -12, top: 8 }} color="var(--color-black-normal)" />
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
            <div
              className="absolute left-[24px] right-[24px] h-0 border-t"
              style={{
                top: ABOUT_PAGE_FOOTER_TOP,
                borderTopColor: 'var(--color-black-normal)',
                borderTopWidth: 1,
              }}
            />
            <Footer onNavigate={onNavigate} top={ABOUT_PAGE_FOOTER_TOP} showTopLine={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
