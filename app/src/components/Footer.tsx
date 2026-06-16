import { guides } from '@/data/guides';
import type { Guide } from '@/data/guides';

interface FooterProps {
  onNavigate: (page: 'home' | 'templates' | 'about' | 'guide' | 'guides') => void;
  onSelectGuide: (guide: Guide) => void;
}

export function Footer({ onNavigate, onSelectGuide }: FooterProps) {
  const topGuides = guides.slice(0, 4);

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-sky-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-900">Open Sheets</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Free UK bookkeeping spreadsheets and plain-English guides for small business 
              owners, sole traders, and landlords. No subscriptions, no jargon.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Sole Traders', 'Self-Employed', 'Landlords', 'Freelancers', 'Small Businesses'].map((tag) => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-wider mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', page: 'home' as const },
                { label: 'All Templates', page: 'templates' as const },
                { label: 'Guides', page: 'guides' as const },
                { label: 'Why Spreadsheets?', page: 'about' as const },
                { label: 'How to Use', page: 'guide' as const },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-sm text-slate-500 hover:text-sky-600 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Guides */}
          <div>
            <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-wider mb-4">Popular Guides</h4>
            <ul className="space-y-2.5">
              {topGuides.map((guide) => (
                <li key={guide.id}>
                  <button
                    onClick={() => {
                      onNavigate('guides');
                      setTimeout(() => onSelectGuide(guide), 50);
                    }}
                    className="text-sm text-slate-500 hover:text-sky-600 transition-colors text-left"
                  >
                    {guide.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-wider mb-4">Get Started</h4>
            <p className="text-sm text-slate-500 mb-4">
              Download all 16 templates free. Start organising your business finances today.
            </p>
            <button
              onClick={() => onNavigate('templates')}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-slate-900 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Browse Templates
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            &copy; 2025 Open Sheets. All templates and guides are free to use for your business.
          </p>
          <p className="text-xs text-slate-500">
            Designed for UK small businesses, sole traders, and landlords. Not professional financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
