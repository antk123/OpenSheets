import { Badge } from '@/components/ui/badge';

export function GuidePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sky-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            How to Use Our Templates
          </h1>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto">
            A quick guide to getting the most out of your bookkeeping spreadsheets. 
            From downloading to tax return submission.
          </p>
        </div>
      </section>

      {/* Guide Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Step 1 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-lg font-bold">
                1
              </div>
              <div>
                <Badge className="bg-sky-100 text-sky-600 mb-1">Download</Badge>
                <h2 className="text-2xl font-bold text-slate-900">Download Your Template</h2>
              </div>
            </div>
            <div className="pl-16">
              <p className="text-slate-600 leading-relaxed mb-4">
                Browse our templates and click the download button on any card. The file will save to 
                your Downloads folder as an .xlsx file. This format works with:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { name: 'Microsoft Excel 2010 or newer', note: 'Desktop or Office 365' },
                  { name: 'Google Sheets', note: 'Free with Google account — upload and convert' },
                  { name: 'LibreOffice Calc', note: 'Free, open-source alternative' },
                  { name: 'Apple Numbers', note: 'May need to convert format' },
                ].map((app, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-lg p-4">
                    <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{app.name}</p>
                      <p className="text-xs text-slate-500">{app.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Tip:</strong> When you first open the file in Excel, you may see a yellow bar saying 
                  &ldquo;Protected View&rdquo;. Click <strong>Enable Editing</strong> to use the template.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-lg font-bold">
                2
              </div>
              <div>
                <Badge className="bg-sky-100 text-sky-600 mb-1">Personalise</Badge>
                <h2 className="text-2xl font-bold text-slate-900">Add Your Business Details</h2>
              </div>
            </div>
            <div className="pl-16">
              <p className="text-slate-600 leading-relaxed mb-4">
                Most templates have a &ldquo;Welcome&rdquo; or &ldquo;Setup&rdquo; sheet with instructions. 
                Start by customising the template for your business:
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Replace placeholder business names with your own',
                  'Set your financial year (our templates default to UK tax year: April - March)',
                  'Add your bank account names if using multi-account templates',
                  'Customise income and expense categories to match your business',
                  'Delete example data (highlighted or in separate example sheets)',
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

          {/* Step 3 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-lg font-bold">
                3
              </div>
              <div>
                <Badge className="bg-sky-100 text-sky-600 mb-1">Record</Badge>
                <h2 className="text-2xl font-bold text-slate-900">Enter Your Transactions</h2>
              </div>
            </div>
            <div className="pl-16">
              <p className="text-slate-600 leading-relaxed mb-4">
                The key to good bookkeeping is consistency. We recommend recording transactions weekly, 
                but find a rhythm that works for you:
              </p>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                <h3 className="font-semibold text-slate-900 mb-4">Best Practices</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Record in date order',
                      desc: 'Enter transactions chronologically. This makes bank reconciliation much easier.',
                    },
                    {
                      title: 'Be consistent with categories',
                      desc: 'Always use the same category for the same type of expense. Do not use "Office Supplies" one month and "Stationery" the next.',
                    },
                    {
                      title: 'Include a description',
                      desc: 'Write clear descriptions. "Staples - printer paper" is better than "Shop purchase".',
                    },
                    {
                      title: 'Keep receipts',
                      desc: 'File every receipt. HMRC can ask to see them up to 5 years after the tax year.',
                    },
                    {
                      title: 'Reconcile monthly',
                      desc: 'Match your spreadsheet to your bank statement at the end of each month. It takes 10 minutes and catches errors early.',
                    },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-sm font-medium text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-lg font-bold">
                4
              </div>
              <div>
                <Badge className="bg-sky-100 text-sky-600 mb-1">Review</Badge>
                <h2 className="text-2xl font-bold text-slate-900">Check Your Summary Reports</h2>
              </div>
            </div>
            <div className="pl-16">
              <p className="text-slate-600 leading-relaxed mb-4">
                Our templates automatically calculate summary reports from your transaction data. 
                Check these regularly to understand your business performance:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    title: 'Profit & Loss Summary',
                    desc: 'Shows total income, total expenses, and net profit/loss. Check this monthly.',
                  },
                  {
                    title: 'Bank Reconciliation',
                    desc: 'Compares your spreadsheet balance to your actual bank balance. Should match to the penny.',
                  },
                  {
                    title: 'Expense Breakdown',
                    desc: 'See where your money goes. Useful for identifying areas to cut costs.',
                  },
                  {
                    title: 'Tax Estimate',
                    desc: 'Our Self-Employed template estimates your tax bill. Set this money aside monthly.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-sky-50 rounded-lg p-4 border border-sky-100">
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-lg font-bold">
                5
              </div>
              <div>
                <Badge className="bg-sky-100 text-sky-600 mb-1">Tax Time</Badge>
                <h2 className="text-2xl font-bold text-slate-900">Submit Your Tax Return</h2>
              </div>
            </div>
            <div className="pl-16">
              <p className="text-slate-600 leading-relaxed mb-4">
                When it is time for Self Assessment (deadline: 31 January), your spreadsheet summaries 
                will have all the figures you need:
              </p>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                <h3 className="font-semibold text-slate-900 mb-4">Self Assessment Checklist</h3>
                <div className="space-y-3">
                  {[
                    'Total turnover (income) from your Summary sheet',
                    'Total expenses by category — enter these in the relevant boxes',
                    'Capital allowances for equipment purchases over £1,000',
                    'Mileage claim total from your Mileage Log',
                    'Home office calculation from your Home Office sheet',
                    'Bank interest received (for the SA100 form)',
                  ].map((item, i) => (
                    <label key={i} className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Important Dates:</strong> 5 April is the end of the tax year. 31 January is the 
                  online Self Assessment deadline. 31 October is the paper return deadline. Missing the 
                  deadline results in an automatic £100 fine.
                </p>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-lg font-bold">
                6
              </div>
              <div>
                <Badge className="bg-sky-100 text-sky-600 mb-1">Backup</Badge>
                <h2 className="text-2xl font-bold text-slate-900">Save and Back Up Regularly</h2>
              </div>
            </div>
            <div className="pl-16">
              <p className="text-slate-600 leading-relaxed mb-4">
                Your financial records are precious. Protect them:
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'Save your file with a clear name: "BusinessName_2025-26_CashBook.xlsx"',
                  'Back up to cloud storage (Google Drive, Dropbox, OneDrive) weekly',
                  'Keep a copy on a USB drive as well',
                  'Do not rely on a single location — computers fail, files corrupt',
                  'Keep records for at least 5 years after the tax year (HMRC requirement)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-slate-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Do I need to know Excel to use these?',
                  a: 'Basic knowledge helps, but our templates are designed for beginners. You mainly need to know how to type into cells and save a file. Each template includes a Welcome sheet with step-by-step instructions.',
                },
                {
                  q: 'Are these suitable for limited companies?',
                  a: 'Yes, most templates work for limited companies too. However, if you are VAT-registered with complex requirements, you may eventually need software. Use our templates to get started and understand your finances first.',
                },
                {
                  q: 'Will my accountant accept these?',
                  a: 'Absolutely. Accountants regularly work with spreadsheet-based bookkeeping. Our templates use standard accounting layouts and HMRC-recognised categories. Your accountant will likely appreciate the clarity.',
                },
                {
                  q: 'Can I use these with Google Sheets?',
                  a: 'Yes. Upload the .xlsx file to Google Drive and open with Google Sheets. Most formulas will work. Some formatting may look slightly different, but all functionality is preserved.',
                },
                {
                  q: 'What if I make a mistake?',
                  a: 'That is the beauty of spreadsheets — everything is editable. If you delete a formula by accident, just re-download the template. We recommend keeping a backup copy of the blank template for reference.',
                },
                {
                  q: 'How often should I update my spreadsheet?',
                  a: 'Weekly is ideal. At minimum, monthly. The key is consistency. A 10-minute weekly session is far easier (and more accurate) than a 3-hour marathon at year-end.',
                },
              ].map((faq, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-slate-900 mb-1">{faq.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
