import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Language, Page } from '../types';

// Remote asset from Figma (valid ~7 days). Replace with local if needed.
const heroImage = "https://www.figma.com/api/mcp/asset/54595635-ee19-4eb0-ab84-23945735eca3";

type AboutPageProps = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

export default function AboutPage({ currentPage, language, onNavigate, onLanguageChange }: AboutPageProps) {
  const photos = [heroImage];
  const [photoIndex, setPhotoIndex] = useState(0);
  const currentImage = photos[photoIndex] ?? heroImage;
  const total = photos.length;

  const goPrev = () => setPhotoIndex((i) => (i - 1 + total) % total);
  const goNext = () => setPhotoIndex((i) => (i + 1) % total);

  return (
    <div className="layout-viewport hide-scrollbar">
      <div className="layout-canvas">
        <div className="layout-canvas-inner">
          <div className="relative min-h-[2800px] bg-grey-normal text-black-normal">
            <Header
              currentPage={currentPage}
              language={language}
              onNavigate={onNavigate}
              onLanguageChange={onLanguageChange}
            />

            {/* Hero title and year */}
            <p className="absolute type-title-2 left-[24px] top-[193px] leading-[1]">Hajin</p>
            <p className="absolute type-title-2 left-[24px] top-[337px] leading-[1]">Lee</p>
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[160px] leading-[1] right-[24px] top-[193px]">
              2026©
            </p>

            {/* About intro */}
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[32px] left-[24px] top-[648px]">
              About Me
            </p>
            <div className="absolute type-body-lg left-[calc(37.5%+15px)] top-[648px] w-[861px]">
              <p className="mb-0">Originally from Seoul, I moved to Canada in 2024 to transition my career into UX/UI design.</p>
              <p className="mb-0">
                With professional experience in the Japanese retail industry, I developed a strong foundation in an
                experience-focused mindset and purposeful visual storytelling through visual merchandising. Shaped by
                diverse cultural experiences, I bring a flexible way of thinking into digital design.
              </p>
            </div>

            {/* Hero image */}
            <div
              className="absolute top-[839px] w-[1038px] h-[625px] overflow-hidden"
              style={{ left: 'calc(25% + 190px)' }}
            >
              <img src={currentImage} alt="Exhibit" className="absolute h-[124.56%] w-full left-0 top-[-20.84%] object-cover" />
            </div>
            {/* Image captions */}
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black left-[calc(37.5%+15px)] top-[1481px]">
              Christian Boltanski at MOT
            </p>
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black left-[calc(37.5%+15px)] top-[1492px]">
              2019
            </p>
            <p className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black left-[calc(62.5%+9px)] top-[1481px]">
              {String(photoIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={goPrev}
              className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black left-[calc(75%+137px)] top-[1476px] bg-transparent border-none cursor-pointer"
              aria-label="Previous photo"
            >
              prev
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-black left-[calc(87.5%+3px)] top-[1476px] bg-transparent border-none cursor-pointer"
              aria-label="Next photo"
            >
              next
            </button>

            {/* Secondary paragraph */}
            <div className="absolute type-body-lg left-[calc(37.5%+15px)] top-[1608px] w-[860px]">
              I approach design with a focus on clarity and real-world feasibility. I identify challenges within user flows and refine interfaces through clear structure and iterative improvement. With a combined understanding of graphic design and development, I value delivering seamless, frustration-free digital experiences that go beyond aesthetics.
            </div>

            {/* Vertical dividers for stacks */}
            <div className="absolute h-[264px] left-[calc(25%+18px)] top-[1896px] w-[0px] border-l border-black/60" />
            <div className="absolute h-[264px] left-[calc(50%+12px)] top-[1896px] w-[0px] border-l border-black/60" />
            <div className="absolute h-[264px] left-[calc(75%+6px)] top-[1896px] w-[0px] border-l border-black/60" />

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
            <div className="absolute left-[calc(25%+30px)] top-[2256px] w-[391px]">
              <div className="absolute -left-[12px] top-[0px] h-[216px] w-[0px] border-l border-black/60" />
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
            <div className="absolute left-[24px] right-[24px] top-[2568px] h-0 border-t border-black/60" />
            <Footer onNavigate={onNavigate} top={2568} />
          </div>
        </div>
      </div>
    </div>
  );
}
