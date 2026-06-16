import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TemplateCard } from '@/components/TemplateCard';
import { categories, templates, getTemplatesByCategory } from '@/data/templates';
import type { SpreadsheetTemplate } from '@/data/templates';

interface TemplatesPageProps {
  onSelectTemplate: (template: SpreadsheetTemplate) => void;
}

export function TemplatesPage({ onSelectTemplate }: TemplatesPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = getTemplatesByCategory(activeCategory).filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            All Templates
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            16 free, UK-focused bookkeeping spreadsheets for every type of small business. 
            Download any or all — no email, no signup required.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <Input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-sky-500 text-slate-900'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-16 h-16 text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">No templates found</h3>
              <p className="text-slate-500">Try adjusting your search or category filter.</p>
              <Button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-6">
                Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onSelect={onSelectTemplate}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Download All CTA */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Need Them All?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Download all 16 templates one by one, or start with the essentials. 
            Each template works independently — pick what you need.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {templates.filter(t => t.isPopular).map((t) => (
              <Button
                key={t.id}
                variant="outline"
                onClick={() => onSelectTemplate(t)}
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                {t.shortName}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
