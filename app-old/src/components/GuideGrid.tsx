import { useState } from 'react';
import { guides, guideCategories, type Guide } from '@/data/guides';
import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  bookkeeping: 'bg-sky-100 text-sky-700',
  tax: 'bg-blue-100 text-blue-700',
  mtd: 'bg-purple-100 text-purple-700',
  business: 'bg-amber-100 text-amber-700',
  expenses: 'bg-rose-100 text-rose-700',
};

const categoryButtonColors: Record<string, string> = {
  bookkeeping: 'bg-sky-700',
  tax: 'bg-blue-700',
  mtd: 'bg-purple-700',
  business: 'bg-amber-700',
  expenses: 'bg-rose-700',
};

export default function GuideGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? guides.filter((g) => g.category === activeCategory)
    : guides;

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            !activeCategory ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          )}
        >
          All Guides
        </button>
        {guideCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              activeCategory === cat.id
                ? `${categoryButtonColors[cat.id]} text-white`
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((guide) => (
          <a
            key={guide.id}
            href={`/guides/${guide.slug}`}
            className="group bg-white rounded-xl p-6 border border-slate-200 text-left hover:shadow-lg hover:border-sky-200 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', categoryColors[guide.category])}>
                {guideCategories.find((c) => c.id === guide.category)?.label}
              </span>
              <span className="text-xs text-slate-500">{guide.readTime}</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors leading-snug">
              {guide.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              {guide.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Updated {guide.lastUpdated}</span>
              <span className="text-sm font-medium text-sky-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read guide
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
