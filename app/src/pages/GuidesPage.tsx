import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { guides, guideCategories, type Guide } from '@/data/guides';

interface GuidesPageProps {
  onSelectGuide: (guide: Guide) => void;
}

const categoryColors: Record<string, string> = {
  bookkeeping: 'bg-sky-100 text-sky-600',
  tax: 'bg-blue-100 text-blue-700',
  mtd: 'bg-purple-100 text-purple-700',
  business: 'bg-amber-100 text-amber-700',
  expenses: 'bg-rose-100 text-rose-700',
};

export function GuidesPage({ onSelectGuide }: GuidesPageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredGuides = activeCategory
    ? guides.filter((g) => g.category === activeCategory)
    : guides;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="bg-sky-100 text-sky-700 mb-4">
              Free Guides
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Plain-English Guides to<br />UK Business Finance
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
              Jargon-free guides written for real business owners. Learn about bookkeeping, 
              tax, VAT, Making Tax Digital, and more. No accounting degree needed.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !activeCategory
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Guides
            </button>
            {guideCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGuides.map((guide) => (
              <button
                key={guide.id}
                onClick={() => onSelectGuide(guide)}
                className="bg-white rounded-xl p-6 border border-slate-200 text-left hover:shadow-lg hover:border-sky-200 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge className={categoryColors[guide.category]}>
                    {guideCategories.find((c) => c.id === guide.category)?.label}
                  </Badge>
                  <span className="text-xs text-slate-400">{guide.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Updated {guide.lastUpdated}
                  </span>
                  <span className="text-sm font-medium text-sky-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read guide
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
