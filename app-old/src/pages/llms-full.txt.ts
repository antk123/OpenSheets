import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { templates } from '@/data/templates';

export const GET: APIRoute = async () => {
  const allGuides = await getCollection('guides');

  const sections: string[] = [
    '# Open Sheets — Full Content Index',
    '',
    'Free UK bookkeeping spreadsheet templates and plain-English tax guides for sole traders, landlords, freelancers and small businesses.',
    '',
    '## Templates',
    ...templates.map((t) => `- ${t.name}: ${t.description} (https://opensheets.co.uk/templates/${t.id})`),
    '',
  ];

  for (const entry of allGuides) {
    const { Content } = await entry.render();
    // We cannot serialize the JSX component here, so we emit frontmatter + raw body.
    sections.push(`## ${entry.data.title}`);
    sections.push('');
    sections.push(`URL: https://opensheets.co.uk/guides/${entry.slug}`);
    sections.push(`Category: ${entry.data.category}`);
    sections.push(`Last updated: ${entry.data.lastUpdated}`);
    sections.push(`Read time: ${entry.data.readTime}`);
    sections.push('');
    sections.push(entry.body);
    sections.push('');
  }

  return new Response(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
