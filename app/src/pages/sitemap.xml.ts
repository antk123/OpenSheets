import { getCollection } from 'astro:content';
import { templates } from '@/data/templates';

export async function GET() {
  const guides = await getCollection('guides');
  
  const pages = [
    '',
    '/templates',
    '/guides',
    '/about',
    '/how-to-use',
    '/core-bookkeeping',
    '/tax-vat',
    '/financial-reports',
    '/landlord-property',
    '/business-tools',
    '/free-bookkeeping-spreadsheet-templates-uk',
    '/sole-trader-spreadsheet-template-uk',
    '/vat-return-spreadsheet-template-uk',
    '/landlord-spreadsheet-uk',
    '/cash-book-template-uk',
    '/mileage-log-template-uk',
    '/profit-and-loss-template-uk',
    '/balance-sheet-template-uk',
    '/expense-tracker-template-uk',
    '/home-office-expenses-calculator-uk',
    '/invoice-template-uk',
    '/free-excel-templates-uk',
    '/tax-deadlines-2025-26',
    '/self-employed-tax-calculator-uk',
    '/payslip-template-uk',
    '/quote-template-uk',
    '/budget-template-uk',
    '/stock-inventory-template-uk',
    '/delivery-note-template-uk',
    '/purchase-order-template-uk',
    '/credit-note-template-uk',
    '/job-tracker-template-uk',
    '/petty-cash-template-uk',
    '/timesheet-template-uk',
    '/holiday-tracker-template-uk',
    '/bank-reconciliation-template-uk',
    '/project-budget-template-uk',
    '/gantt-chart-template-uk',
    '/self-assessment-tax-return-template-uk',
    '/dividend-tax-calculator-uk',
    '/allowable-expenses-sole-trader-uk',
    '/cis-tax-calculator-uk',
    '/rental-income-spreadsheet-uk',
    '/cash-flow-forecast-template-uk',
    '/trial-balance-template-uk',
    '/accounts-payable-template-uk',
    '/accounts-receivable-template-uk',
    '/fixed-asset-register-template-uk',
    '/general-journal-template-uk',
    '/blog/mtd-for-income-tax-2026',
    '/blog/vat-registration-guide',
    '/blog/cis-subcontractor-tax-guide',
    '/blog/self-assessment-guide-sole-traders',
    '/blog/landlord-tax-guide-2025-26',
    '/blog/how-to-do-self-assessment',
    ...templates.map((t) => `/templates/${t.id}`),
    ...guides.map((g) => `/guides/${g.slug}`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>https://opensheets.co.uk${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('/templates/') || page.startsWith('/guides/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
