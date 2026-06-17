import { useState } from 'react';
import { templates, categories } from '@/data/templates';
import type { SpreadsheetTemplate } from '@/data/templates';
import { cn } from '@/lib/utils';
import TemplateIcon from './TemplateIcon';

interface TemplateModalProps {
  templateIds?: string[];
  limit?: number;
  showFilters?: boolean;
}

const categoryClasses: Record<string, string> = {
  core: 'bg-sky-100 text-sky-700',
  tax: 'bg-purple-100 text-purple-700',
  reports: 'bg-blue-100 text-blue-700',
  property: 'bg-amber-100 text-amber-700',
  business: 'bg-rose-100 text-rose-700',
};

export default function TemplateModal({ templateIds, limit, showFilters = false }: TemplateModalProps) {
  const [selected, setSelected] = useState<SpreadsheetTemplate | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  let displayed = templateIds
    ? templates.filter((t) => templateIds.includes(t.id))
    : templates;

  if (limit && !showFilters) {
    displayed = displayed.slice(0, limit);
  }

  if (showFilters) {
    if (activeCategory !== 'all') {
      displayed = displayed.filter((t) => t.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      displayed = displayed.filter(
        (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
  }

  const close = () => setSelected(null);

  return (
    <>
      {showFilters && (
        <div className="mb-8 space-y-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-700"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeCategory === 'all' ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              All Templates
            </button>
            {categories.filter((c) => c.id !== 'all').map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  activeCategory === cat.id ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {displayed.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">No templates found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelected(template)}
              className="group text-left bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-sky-200 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${template.color} bg-opacity-10 flex items-center justify-center`}>
                  <div className={`${template.color} text-white rounded-xl p-2.5`}>
                    <TemplateIcon icon={template.icon} className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {template.isNew && (
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700">New</span>
                  )}
                  {template.isPopular && (
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-sky-100 text-sky-700">Popular</span>
                  )}
                </div>
              </div>
              <h2 className="text-base font-semibold text-slate-900 mb-1.5 group-hover:text-sky-700 transition-colors">
                {template.name}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
                {template.description}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-sky-700 group-hover:translate-x-1 transition-transform">
                View details
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="template-modal-title"
        >
          <div className="absolute inset-0 bg-black/40" onClick={close} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className={`${selected.color} h-2 w-full rounded-t-2xl`} />
            <div className="px-6 pt-4 pb-2 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', categoryClasses[selected.category])}>
                    {selected.categoryLabel}
                  </span>
                  {selected.isNew && (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700">New</span>
                  )}
                  {selected.isPopular && (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-sky-100 text-sky-700">Popular</span>
                  )}
                </div>
                <h2 id="template-modal-title" className="text-2xl font-bold text-slate-900">
                  {selected.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 pb-6">
              <p className="text-slate-600 leading-relaxed mb-6">
                {selected.longDescription}
              </p>

              <hr className="my-4 border-slate-200" />

              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                What&apos;s Included
              </h3>
              <ul className="space-y-2.5 mb-6">
                {selected.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sky-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="my-4 border-slate-200" />

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`/templates/${selected.fileName}`}
                  download={selected.fileName}
                  className="flex-1 inline-flex items-center justify-center bg-sky-700 hover:bg-sky-800 text-white h-12 text-base font-semibold rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download {selected.fileName}
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="h-12 px-6 text-base font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>

              <p className="text-xs text-slate-500 text-center mt-4">
                File format: .xlsx (Microsoft Excel / Google Sheets / LibreOffice)
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
