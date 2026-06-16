import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TemplateCard } from '@/components/TemplateCard';
import { getPopularTemplates, templates } from '@/data/templates';
import { guides } from '@/data/guides';
import type { SpreadsheetTemplate } from '@/data/templates';
import type { Guide } from '@/data/guides';

interface HomePageProps {
  onNavigate: (page: 'home' | 'templates' | 'about' | 'guide' | 'guides') => void;
  onSelectTemplate: (template: SpreadsheetTemplate) => void;
  onSelectGuide: (guide: Guide) => void;
}

const categoryColors: Record<string, string> = {
  bookkeeping: 'bg-sky-100 text-sky-600',
  tax: 'bg-blue-100 text-blue-700',
  mtd: 'bg-purple-100 text-purple-700',
  business: 'bg-amber-100 text-amber-700',
  expenses: 'bg-rose-100 text-rose-700',
};

const guideCategoryLabels: Record<string, string> = {
  bookkeeping: 'Bookkeeping',
  tax: 'Tax',
  mtd: 'Making Tax Digital',
  business: 'Business Setup',
  expenses: 'Expenses',
};

export function HomePage({ onNavigate, onSelectTemplate, onSelectGuide }: HomePageProps) {
  const popularTemplates = getPopularTemplates();
  const allTemplates = templates.slice(0, 8);
  const featuredGuides = guides.slice(0, 4);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Are these templates really free?',
      a: 'Yes. Every spreadsheet on this site is free to download with no email required, no sign-up, and no trial period. Just click and download.',
    },
    {
      q: 'Will these work in Google Sheets?',
      a: 'Yes. All templates use standard Excel functions that are fully compatible with Google Sheets. Upload the .xlsx file to Google Drive and open it in Sheets. Minor formatting differences may appear, but all formulas work correctly.',
    },
    {
      q: 'Do I need to know Excel to use these?',
      a: 'Basic familiarity with spreadsheets helps, but you do not need to be an expert. Our templates come with instructions on the cover sheet, and only the blue-coloured cells need your input. Everything else calculates automatically.',
    },
    {
      q: 'Are these suitable for limited companies?',
      a: 'Some templates work well for limited companies (Balance Sheet, Cash Book, VAT Return), but limited companies have more complex reporting requirements than sole traders. Our templates are primarily designed for sole traders, freelancers, and landlords.',
    },
    {
      q: 'What is Making Tax Digital (MTD)?',
      a: 'MTD is HMRC\'s programme to move tax online. If you are VAT-registered, it already applies to you. For Income Tax, it starts April 2026 if your business or property income is over \u00a350,000. Our guides explain everything you need to know.',
    },
    {
      q: 'Can I share these templates with my clients or friends?',
      a: 'Yes. Feel free to share the templates. We would appreciate it if you shared a link to our site rather than the file directly, so others can discover the full range of templates and guides.',
    },
  ];

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 opacity-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              16 Free UK Bookkeeping Spreadsheets + 8 Guides
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Free Bookkeeping<br />
              <span className="text-sky-500">Spreadsheets & Guides</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl">
              Free, professional Excel spreadsheets and plain-English guides designed for UK 
              small business owners, sole traders, and landlords. No subscriptions. No jargon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => onNavigate('templates')}
                className="bg-sky-500 hover:bg-sky-600 text-white h-12 px-8 text-base font-semibold"
              >
                Browse Templates
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Button>
              <Button
                onClick={() => onNavigate('guides')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 h-12 px-8 text-base"
              >
                Read the Guides
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-slate-900">16</p>
              <p className="text-sm text-slate-500">Free Templates</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">8</p>
              <p className="text-sm text-slate-500">In-Depth Guides</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">0</p>
              <p className="text-sm text-slate-500">Cost to You</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">100%</p>
              <p className="text-sm text-slate-500">Open & Free</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO THIS IS FOR ===== */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
            Built For
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Sole Traders', 'Self-Employed', 'Landlords', 'Freelancers', 'Small Businesses', 'Startups', 'Contractors'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR TEMPLATES ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Most Popular Templates
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These are the spreadsheets our community downloads most. Start with one of these 
              and take control of your business finances today.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={onSelectTemplate}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button
              onClick={() => onNavigate('templates')}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-100 h-11 px-8"
            >
              View All 16 Templates
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== FEATURED GUIDES ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="bg-sky-100 text-sky-600 mb-4">Free Guides</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Learn the Essentials
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our jargon-free guides cover everything UK business owners need to know about 
              bookkeeping, tax, and staying compliant. Written in plain English.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredGuides.map((guide) => (
              <button
                key={guide.id}
                onClick={() => onSelectGuide(guide)}
                className="bg-white rounded-xl p-6 border border-slate-200 text-left hover:shadow-lg hover:border-sky-200 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge className={categoryColors[guide.category]}>
                    {guideCategoryLabels[guide.category]}
                  </Badge>
                  <span className="text-xs text-slate-400">{guide.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {guide.description}
                </p>
              </button>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              onClick={() => onNavigate('guides')}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-white h-11 px-8"
            >
              View All 8 Guides
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== WHY SPREADSHEETS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Why Simple Spreadsheets<br />Beat Complex Software
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'No Monthly Subscription',
                    desc: 'Save \u00a315-\u00a340 every month. Our templates are completely free. Excel or Google Sheets is all you need.',
                    icon: (
                      <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                  },
                  {
                    title: 'You Own Your Data',
                    desc: 'Your financial data stays on your computer. No cloud servers, no risk of service shutdowns, no privacy concerns.',
                    icon: (
                      <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Built for UK Tax',
                    desc: 'Unlike generic templates, ours use HMRC expense categories, UK VAT calculations, mileage rates, and SA103/SA105 box numbers.',
                    icon: (
                      <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Learn as You Go',
                    desc: 'Spreadsheets show you how the calculations work. Understanding your numbers makes you a better business owner.',
                    icon: (
                      <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Templates', count: '16', icon: '📊' },
                    { label: 'Guides', count: '8', icon: '📖' },
                    { label: 'Formulas', count: '1,800+', icon: '🔢' },
                    { label: 'HMRC Categories', count: 'All', icon: '✅' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-5 text-center border border-slate-200">
                      <p className="text-3xl mb-1">{stat.icon}</p>
                      <p className="text-2xl font-bold text-slate-900">{stat.count}</p>
                      <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-sky-500 rounded-xl p-5 text-white text-center">
                  <p className="text-sm font-medium opacity-90">Total Value</p>
                  <p className="text-3xl font-bold">£0.00</p>
                  <p className="text-xs opacity-75 mt-1">Everything here is completely free</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEMPLATE CATEGORIES ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Templates for Every Need
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Whether you are just starting out or managing multiple properties, 
              we have a spreadsheet for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: 'Core Bookkeeping',
                count: 5,
                desc: 'Cash books, expense tracking, and bank reconciliation',
                icon: (
                  <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                ),
              },
              {
                title: 'Tax & VAT',
                count: 3,
                desc: 'VAT returns, mileage logs, and home office claims',
                icon: (
                  <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V9zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V9zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V9zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V9zm0 2.25h.008v.008h-.008v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Financial Reports',
                count: 3,
                desc: 'Profit & Loss, Balance Sheet, and Budget Forecast',
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                ),
              },
              {
                title: 'Landlord & Property',
                count: 2,
                desc: 'Rental income, property expenses, MTD quarterly updates',
                icon: (
                  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                ),
              },
            ].map((cat, i) => (
              <button
                key={i}
                onClick={() => onNavigate('templates')}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-sky-200 transition-all text-left group"
              >
                <div className="mb-4">{cat.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-500 mb-3">{cat.desc}</p>
                <span className="text-xs font-medium text-sky-500">
                  {cat.count} templates &rarr;
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={onSelectTemplate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOR LANDLORDS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
                <Badge className="bg-amber-100 text-amber-700 mb-4">For Landlords</Badge>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Rental Property Tracking Made Simple
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Managing rental properties comes with unique financial complexities. 
                  Our property tracker is built specifically for UK landlords with 
                  HMRC SA105 categories built in.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Track up to 5 properties in one workbook',
                    'Mortgage interest tax relief calculated at 20%',
                    'Section 24 restrictions built in automatically',
                    'Annual summary ready for your tax return',
                    'MTD quarterly update template available',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                      <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => onNavigate('templates')}
                    className="bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    Get the Property Tracker
                  </Button>
                  <Button
                    onClick={() => {
                      const landlordGuide = guides.find((g) => g.id === 'landlord-tax-guide');
                      if (landlordGuide) onSelectGuide(landlordGuide);
                    }}
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    Read the Landlord Guide
                  </Button>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <Badge className="bg-blue-500/20 text-blue-300 mb-4">Making Tax Digital</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  MTD Is Coming.<br />Are You Ready?
                </h2>
                <p className="text-slate-300 leading-relaxed mb-6">
                  From April 2026, landlords and self-employed people with income over 
                  \u00a350,000 must submit quarterly updates to HMRC digitally. Our guides 
                  explain what you need to do and when.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    { date: 'April 2026', text: 'MTD for Income Tax starts (income over \u00a350k)' },
                    { date: 'April 2027', text: 'Threshold drops to \u00a330,000' },
                    { date: 'April 2028', text: 'Threshold drops to \u00a320,000' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-20 flex-shrink-0">
                        <span className="text-xs font-semibold bg-white/10 px-2 py-1 rounded">{item.date}</span>
                      </div>
                      <p className="text-sm text-slate-300">{item.text}</p>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => {
                    const mtdGuide = guides.find((g) => g.id === 'mtd-guide');
                    if (mtdGuide) onSelectGuide(mtdGuide);
                  }}
                  className="bg-white text-slate-900 hover:bg-slate-100"
                >
                  Read the MTD Guide
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">
              Quick answers to common questions. For more detail, read our guides.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-slate-600 leading-relaxed text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 bg-sky-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-sky-100 leading-relaxed mb-10 max-w-2xl mx-auto">
            Download your first template in under a minute. No email required, no account to create. 
            Or read our guides to learn the essentials first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('templates')}
              className="bg-white text-sky-600 hover:bg-sky-50 h-12 px-8 text-base font-semibold"
            >
              Browse All Templates
            </Button>
            <Button
              onClick={() => onNavigate('guides')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 h-12 px-8 text-base"
            >
              Read the Guides
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
