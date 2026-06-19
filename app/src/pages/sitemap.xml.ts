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
    '/blog/mtd-for-income-tax-2026',
    '/blog/self-assessment-guide-sole-traders',
    '/blog/landlord-tax-guide-2025-26',
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
