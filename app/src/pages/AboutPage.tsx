import { Badge } from '@/components/ui/badge';

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sky-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Why Simple Spreadsheets?
          </h1>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto">
            The case for keeping your small business bookkeeping simple, affordable, and under your control.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Who This Is For */}
          <div className="mb-16">
            <Badge className="bg-sky-100 text-sky-600 mb-4">Who This Is For</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              You Don&apos;t Need Accounting Software
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              If you are a sole trader with a handful of transactions each month, a landlord with one or two 
              properties, or a micro-business just finding your feet, expensive accounting software is 
              probably overkill. And we mean that literally — you are paying for features you will never use.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              QuickBooks, Xero, Sage — these are excellent tools. But they were built for businesses with 
              employees, inventory, multiple bank accounts, and complex reporting needs. When your bookkeeping 
              consists of recording income and expenses, creating the occasional invoice, and submitting a 
              tax return once a year, a well-designed spreadsheet is not just sufficient — it is actually better.
            </p>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 my-8">
              <h3 className="font-semibold text-slate-900 mb-3">This is for you if:</h3>
              <ul className="space-y-2.5">
                {[
                  'You are a sole trader or single-person limited company',
                  'You have fewer than 50 transactions per month',
                  'You invoice occasionally, not hundreds per week',
                  'You want to understand your numbers, not just automate them',
                  'You are comfortable with basic Excel or Google Sheets',
                  'You want to own your data and keep it private',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The Problem */}
          <div className="mb-16">
            <Badge className="bg-rose-100 text-rose-700 mb-4">The Problem</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              The Hidden Cost of &ldquo;Easy&rdquo; Software
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Accounting software companies market themselves as &ldquo;simple&rdquo; and &ldquo;easy.&rdquo; 
              But simplicity comes at a price — and not just the monthly subscription fee.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 my-8">
              {[
                {
                  title: 'Monthly Subscription Costs',
                  desc: '£15-£40 per month adds up to £180-£480 per year. For a business with minimal transactions, that is a significant overhead.',
                },
                {
                  title: 'Learning Curve',
                  desc: 'Despite the marketing, accounting software has a learning curve. Journals, reconciliations, chart of accounts — it is a lot to learn when you just want to track expenses.',
                },
                {
                  title: 'Feature Overload',
                  desc: 'Payroll, inventory, multi-currency, project tracking — you are paying for (and navigating around) features you will never touch.',
                },
                {
                  title: 'Data Lock-In',
                  desc: 'Your financial history is trapped in their system. Moving away means complex exports, format conversions, and often, data loss.',
                },
                {
                  title: 'Internet Dependency',
                  desc: 'No internet? No access to your books. Cloud software requires connectivity — not always guaranteed in rural UK or while travelling.',
                },
                {
                  title: 'Over-Engineering',
                  desc: 'Double-entry bookkeeping, automated bank feeds, AI categorisation — clever technology solving a problem you do not actually have.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-rose-50 rounded-xl p-5 border border-rose-100">
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Solution */}
          <div className="mb-16">
            <Badge className="bg-sky-100 text-sky-600 mb-4">The Solution</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              Spreadsheets: The Right Tool for the Job
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              A well-designed Excel or Google Sheets template gives you everything you need and nothing 
              you do not. Our templates are built specifically for UK small businesses, with HMRC-friendly 
              categories, UK tax calculations, and clear, intuitive layouts.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 my-8">
              {[
                {
                  title: 'Zero Cost',
                  desc: 'Completely free. If you already have Excel or a free Google account, your bookkeeping software costs nothing.',
                },
                {
                  title: 'Full Control',
                  desc: 'See every formula, modify any calculation, and customise the layout to match exactly how your business works.',
                },
                {
                  title: 'UK-Specific',
                  desc: 'HMRC expense categories, UK VAT at 20%, mileage rates at 45p/mile, Self Assessment summaries — all built in.',
                },
                {
                  title: 'Learn Your Numbers',
                  desc: 'When you can see how calculations work, you understand your business better. That knowledge is valuable.',
                },
                {
                  title: 'Own Your Data',
                  desc: 'Your files, on your computer, in your control. No subscriptions to cancel, no data to export when you leave.',
                },
                {
                  title: 'Works Offline',
                  desc: 'No internet required. Update your books on a train, in a café, or anywhere you have your laptop.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-sky-50 rounded-xl p-5 border border-sky-100">
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* When to Upgrade */}
          <div className="mb-16">
            <Badge className="bg-amber-100 text-amber-700 mb-4">Growing Up</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
              When It Is Time to Upgrade
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We are honest — spreadsheets are not the forever solution for every business. 
              There comes a point where accounting software makes sense. You might be ready to upgrade when:
            </p>
            <ul className="space-y-3 my-6">
              {[
                'You process more than 100 transactions per month',
                'You have employees and need to run payroll',
                'You need real-time collaboration between multiple people',
                'Your accountant specifically requests software integration',
                'You are a VAT-registered limited company with complex requirements',
                'You need automated bank feeds to save significant time',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-slate-600 leading-relaxed">
              Until then, a well-designed spreadsheet will serve you perfectly. Many successful small 
              businesses have used spreadsheets for years before making the leap to software — and 
              by then, they understood their finances well enough to choose the right tool.
            </p>
          </div>

          {/* Our Philosophy */}
          <div className="bg-white rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Philosophy</h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              We believe that small business owners deserve simple, effective tools that respect their time 
              and their intelligence. You should not need a degree in accounting to understand your own 
              business finances. And you certainly should not need to pay hundreds of pounds a year for 
              software that solves problems you do not have.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              Our templates are designed to be the perfect middle ground — more structured and helpful 
              than a blank spreadsheet, but far simpler and more affordable than accounting software. 
              We have done the thinking so you can focus on running your business.
            </p>
            <p className="text-sky-400 font-semibold">
              Simple tools. Better understanding. Lower costs. That is the smarter way to do bookkeeping.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
