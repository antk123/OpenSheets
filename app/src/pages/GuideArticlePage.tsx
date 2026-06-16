import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { SpreadsheetTemplate } from '@/data/templates';
import { templates } from '@/data/templates';
import { guides, guideCategories, type Guide, type GuideSection } from '@/data/guides';

interface GuideArticlePageProps {
  guide: Guide;
  onBack: () => void;
  onSelectGuide: (guide: Guide) => void;
  onSelectTemplate: (template: SpreadsheetTemplate) => void;
}

const calloutStyles: Record<string, string> = {
  tip: 'bg-sky-50 border-sky-200 text-sky-700',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  note: 'bg-blue-50 border-blue-200 text-blue-800',
};

const calloutTipIcon = (
  <svg className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>
);

const calloutWarningIcon = (
  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const calloutNoteIcon = (
  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

const calloutIcons: Record<string, React.ReactNode> = {
  tip: calloutTipIcon,
  warning: calloutWarningIcon,
  note: calloutNoteIcon,
};

export function GuideArticlePage({ guide, onBack, onSelectGuide, onSelectTemplate }: GuideArticlePageProps) {
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [guide.id]);

  const relatedTemplateIds = guide.relatedTemplates || [];
  const relatedTemplatesList = templates.filter((t) => relatedTemplateIds.includes(t.id));
  const relatedGuidesList = guide.relatedGuides
    ? guides.filter((g) => guide.relatedGuides!.includes(g.id))
    : [];

  const categoryLabel = guideCategories.find((c) => c.id === guide.category)?.label;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb + Header */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <button
            onClick={onBack}
            className="text-sm text-slate-500 hover:text-sky-500 mb-6 inline-flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to all guides
          </button>

          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-sky-100 text-sky-600">{categoryLabel}</Badge>
            <span className="text-sm text-slate-400">{guide.readTime}</span>
            <span className="text-sm text-slate-400">&middot; Updated {guide.lastUpdated}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {guide.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">{guide.description}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12">
          {/* Main Content */}
          <div>
            {guide.sections.map((section: GuideSection, idx: number) => (
              <div key={idx} className="mb-10">
                {section.heading && (
                  <h2
                    className="text-2xl font-bold text-slate-900 mb-4 scroll-mt-24"
                    id={`section-${idx}`}
                  >
                    {section.heading}
                  </h2>
                )}

                {section.content && (
                  <div className="prose-content">
                    {section.content.split('\n\n').map((paragraph: string, pIdx: number) => (
                      <p key={pIdx} className="text-slate-600 leading-relaxed mb-4">
                        {paragraph.split('\n').map((line: string, lIdx: number, arr: string[]) => (
                          <span key={lIdx}>
                            {line}
                            {lIdx < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                )}

                {section.bullets && (
                  <ul className="space-y-3 mb-4">
                    {section.bullets.map((bullet: string, bIdx: number) => (
                      <li key={bIdx} className="flex gap-3 text-slate-600">
                        <svg
                          className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200">
                          {section.table.headers.map((h: string, hIdx: number) => (
                            <th
                              key={hIdx}
                              className="text-left px-4 py-3 font-semibold text-slate-700"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row: string[], rIdx: number) => (
                          <tr key={rIdx} className="border-b border-slate-100 hover:bg-slate-50">
                            {row.map((cell: string, cIdx: number) => (
                              <td key={cIdx} className="px-4 py-3 text-slate-600">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.callout && (
                  <div
                    className={`rounded-lg border p-4 ${calloutStyles[section.callout.type]}`}
                  >
                    <div className="flex gap-3">
                      {calloutIcons[section.callout.type]}
                      <p className="text-sm leading-relaxed">{section.callout.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* FAQ */}
            {guide.faq && guide.faq.length > 0 && (
              <div className="mt-12 pt-10 border-t border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {guide.faq.map((item: { question: string; answer: string }, idx: number) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setFaqOpen((prev) => ({ ...prev, [idx]: !prev[idx] }))
                        }
                        className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-medium text-slate-900 pr-4">
                          {item.question}
                        </span>
                        <svg
                          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${faqOpen[idx] ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </button>
                      {faqOpen[idx] && (
                        <div className="px-5 pb-4 text-slate-600 leading-relaxed text-sm">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back button */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <Button onClick={onBack} variant="outline" className="border-slate-300 text-slate-700">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                Back to all guides
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">
                  In This Guide
                </h3>
                <nav className="space-y-1">
                  {guide.sections
                    .filter((s: GuideSection) => s.heading)
                    .map((section: GuideSection, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const sectionIdx = guide.sections.indexOf(section);
                          const el = document.getElementById(`section-${sectionIdx}`);
                          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="block w-full text-left text-sm text-slate-600 hover:text-sky-600 py-1.5 px-2 rounded-md hover:bg-white transition-all"
                      >
                        {section.heading}
                      </button>
                    ))}
                  {guide.faq && guide.faq.length > 0 && (
                    <button
                      onClick={() => {
                        const el = document.querySelector('[class*="mt-12 pt-10"]');
                        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="block w-full text-left text-sm text-slate-600 hover:text-sky-600 py-1.5 px-2 rounded-md hover:bg-white transition-all"
                    >
                      FAQ
                    </button>
                  )}
                </nav>
              </div>

              {/* Related Templates */}
              {relatedTemplatesList.length > 0 && (
                <div className="bg-sky-50 rounded-xl p-5 border border-sky-200">
                  <h3 className="font-semibold text-sky-800 mb-3 text-sm uppercase tracking-wider">
                    Related Templates
                  </h3>
                  <div className="space-y-2">
                    {relatedTemplatesList.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => onSelectTemplate(template)}
                        className="block w-full text-left text-sm text-sky-600 hover:text-sky-800 hover:bg-sky-100/50 py-2 px-3 rounded-md transition-all"
                      >
                        <span className="font-medium">{template.name}</span>
                        <span className="block text-xs text-sky-500 mt-0.5">
                          {template.category}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Guides */}
              {relatedGuidesList.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-3 text-sm uppercase tracking-wider">
                    Related Guides
                  </h3>
                  <div className="space-y-2">
                    {relatedGuidesList.map((g: Guide) => (
                      <button
                        key={g.id}
                        onClick={() => onSelectGuide(g)}
                        className="block w-full text-left text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-100/50 py-2 px-3 rounded-md transition-all"
                      >
                        {g.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-slate-900 rounded-xl p-5 text-white">
                <h3 className="font-semibold mb-2 text-sm">Need a template?</h3>
                <p className="text-sm text-slate-300 mb-4">
                  All our spreadsheets are free to download. No email required.
                </p>
                <Button
                  onClick={onBack}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white text-sm"
                  size="sm"
                >
                  Browse Templates
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
