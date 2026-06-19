import type { APIRoute } from 'astro';
import { templates } from '@/data/templates';
import { guides } from '@/data/guides';

export const GET: APIRoute = () => {
  const lines = [
    '# Open Sheets',
    '',
    '> Free UK bookkeeping spreadsheet templates and plain-English tax guides for sole traders, landlords, freelancers and small businesses.',
    '',
    '## Key pages',
    '- [Home](https://opensheets.co.uk/)',
    '- [Templates](https://opensheets.co.uk/templates)',
    '- [Guides](https://opensheets.co.uk/guides)',
    '- [Why Spreadsheets?](https://opensheets.co.uk/about)',
    '- [How to Use](https://opensheets.co.uk/how-to-use)',
    '',
    '## Guides',
    ...guides.map((g) => `- [${g.title}](https://opensheets.co.uk/guides/${g.slug})`),
    '',
    '## Templates',
    ...templates.map((t) => `- ${t.name} — https://opensheets.co.uk/templates/${t.id}`),
    '',
    '## Contact & usage',
    'All templates and guides are free to use for your business. No signup required.',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
