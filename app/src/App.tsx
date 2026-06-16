import { useState, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { TemplatesPage } from '@/pages/TemplatesPage';
import { AboutPage } from '@/pages/AboutPage';
import { GuidePage } from '@/pages/GuidePage';
import { GuidesPage } from '@/pages/GuidesPage';
import { GuideArticlePage } from '@/pages/GuideArticlePage';
import { TemplateDetailModal } from '@/components/TemplateDetailModal';
import type { SpreadsheetTemplate } from '@/data/templates';
import type { Guide } from '@/data/guides';

type Page = 'home' | 'templates' | 'about' | 'guide' | 'guides' | 'guide-article';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<SpreadsheetTemplate | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectGuide = useCallback((guide: Guide) => {
    setSelectedGuide(guide);
    setCurrentPage('guide-article');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleBackToGuides = useCallback(() => {
    setSelectedGuide(null);
    setCurrentPage('guides');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={navigateTo}
            onSelectTemplate={setSelectedTemplate}
            onSelectGuide={handleSelectGuide}
          />
        );
      case 'templates':
        return <TemplatesPage onSelectTemplate={setSelectedTemplate} />;
      case 'about':
        return <AboutPage />;
      case 'guide':
        return <GuidePage />;
      case 'guides':
        return <GuidesPage onSelectGuide={handleSelectGuide} />;
      case 'guide-article':
        if (selectedGuide) {
          return (
            <GuideArticlePage
              guide={selectedGuide}
              onBack={handleBackToGuides}
              onSelectGuide={handleSelectGuide}
              onSelectTemplate={setSelectedTemplate}
            />
          );
        }
        return <GuidesPage onSelectGuide={handleSelectGuide} />;
      default:
        return (
          <HomePage
            onNavigate={navigateTo}
            onSelectTemplate={setSelectedTemplate}
            onSelectGuide={handleSelectGuide}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={navigateTo} onSelectGuide={handleSelectGuide} />

      {selectedTemplate && (
        <TemplateDetailModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  );
}

export default App;
