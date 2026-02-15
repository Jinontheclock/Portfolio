import { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProjectHeader from './ProjectHeader';
import { Language, Page } from '../types';

type Props = {
  currentPage: Page;
  language: Language;
  onNavigate: (page: Page) => void;
  onLanguageChange: (language: Language) => void;
};

export default function ProjectIceland({ currentPage, language, onNavigate, onLanguageChange }: Props) {
  const [sdkReady, setSdkReady] = useState(false);
  const containerIdRef = useRef('adobe-pdf-container');
  const clientId = '031661d769be41b789643d3ae8e8d8d4';

  // Load Adobe PDF Embed SDK once
  useEffect(() => {
    const scriptId = 'adobe-dc-view-sdk';
    if (document.getElementById(scriptId)) {
      setSdkReady(true);
      return;
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://documentcloud.adobe.com/view-sdk/main.js';
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
    return () => {
      script.onload = null;
    };
  }, []);

  // Initialize viewer when SDK is ready
  useEffect(() => {
    if (!sdkReady) return;

    const initViewer = () => {
      if (!(window as any).AdobeDC) return;
      const adobeDC = new (window as any).AdobeDC.View({
        clientId,
        divId: containerIdRef.current,
      });
      adobeDC.previewFile(
        {
          content: { location: { url: '/BestOfIceland.pdf' } },
          metaData: { fileName: 'BestOfIceland.pdf' },
        },
        {
          embedMode: 'SIZED_CONTAINER',
          defaultViewMode: 'FIT_PAGE',
          showLeftHandPanel: true,
          showPageControls: true,
          enableLinearization: true,
          showAnnotationTools: false,
        }
      );
    };

    if ((window as any).AdobeDC) {
      initViewer();
    } else {
      document.addEventListener('adobe_dc_view_sdk.ready', initViewer, { once: true });
      return () => document.removeEventListener('adobe_dc_view_sdk.ready', initViewer);
    }
  }, [sdkReady, clientId]);

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

            <div className="px-3 tablet:px-5 desktop:px-7 pb-12">
              <div
                id={containerIdRef.current}
                className="border border-black/15 rounded-[4px] shadow-sm overflow-hidden bg-white"
                style={{ height: 720, minHeight: 480 }}
              />
            </div>

            <Footer onNavigate={onNavigate} top={1500} />
          </div>
        </div>
      </div>
    </div>
  );
}
