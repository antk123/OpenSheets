import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { guides, guideCategories } from '@/data/guides';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'templates' | 'about' | 'guide' | 'guides') => void;
}

const navLinks = [
  { label: 'Home', page: 'home' as const },
  { label: 'Templates', page: 'templates' as const },
  { label: 'Why Spreadsheets?', page: 'about' as const },
  { label: 'How to Use', page: 'guide' as const },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const guidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guidesRef.current && !guidesRef.current.contains(event.target as Node)) {
        setGuidesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (page: 'home' | 'templates' | 'about' | 'guide' | 'guides') => {
    onNavigate(page);
    setMobileOpen(false);
    setGuidesOpen(false);
  };

  const isGuideActive = currentPage === 'guides' || currentPage === 'guide-article';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-slate-900 leading-tight tracking-tight group-hover:text-sky-600 transition-colors">
                Open Sheets
              </span>
              <span className="text-[10px] font-medium text-sky-600 uppercase tracking-wider leading-none">
                UK Business Tools
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNav('home')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === 'home'
                  ? 'bg-sky-50 text-sky-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Guides Dropdown */}
            <div className="relative" ref={guidesRef}>
              <button
                onClick={() => setGuidesOpen(!guidesOpen)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-1 ${
                  isGuideActive
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Guides
                <svg
                  className={`w-4 h-4 transition-transform ${guidesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {guidesOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 mb-2">
                    <button
                      onClick={() => handleNav('guides')}
                      className="text-sm font-semibold text-slate-900 hover:text-sky-600 transition-colors"
                    >
                      View All Guides
                    </button>
                  </div>
                  {guideCategories.map((cat) => {
                    const catGuides = guides.filter((g) => g.category === cat.id);
                    if (catGuides.length === 0) return null;
                    return (
                      <div key={cat.id} className="px-4 py-2">
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                          {cat.label}
                        </span>
                        <div className="mt-1 space-y-0.5">
                          {catGuides.map((g) => (
                            <button
                              key={g.id}
                              onClick={() => handleNav('guides')}
                              className="block w-full text-left text-sm text-slate-600 hover:text-sky-600 py-1 px-2 rounded-md hover:bg-slate-50 transition-all"
                            >
                              {g.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === link.page
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            <Button
              onClick={() => handleNav('templates')}
              className="ml-3 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium"
              size="sm"
            >
              Download Free Templates
            </Button>
          </nav>

          {/* Mobile Nav */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-6">
              <div className="flex flex-col gap-1 mt-8">
                <button
                  onClick={() => handleNav('home')}
                  className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${
                    currentPage === 'home' ? 'bg-sky-50 text-sky-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNav('guides')}
                  className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${
                    isGuideActive ? 'bg-sky-50 text-sky-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Guides
                </button>
                {navLinks.slice(1).map((link) => (
                  <button
                    key={link.page}
                    onClick={() => handleNav(link.page)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${
                      currentPage === link.page
                        ? 'bg-sky-50 text-sky-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  onClick={() => handleNav('templates')}
                  className="mt-4 bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Download Free Templates
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
