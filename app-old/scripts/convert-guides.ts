import { guides, type Guide, type GuideSection } from '../src/data/guides.ts';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('src/content/guides');

function yamlString(value: string): string {
  const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `"${escaped}"`;
}

function escapeMdxText(text: string): string {
  // Escape characters that have special meaning in MDX v3.
  return text
    .replace(/</g, '&lt;')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}');
}

function renderSection(section: GuideSection): string {
  const parts: string[] = [];

  if (section.heading) {
    parts.push(`## ${escapeMdxText(section.heading)}`);
    parts.push('');
  }

  if (section.content) {
    const paragraphs = section.content.split('\n\n').map((p) =>
      escapeMdxText(p)
        .split('\n')
        .map((line) => line.trim())
        .join('\n')
    );
    for (const para of paragraphs) {
      if (!para.trim()) continue;
      parts.push(para);
      parts.push('');
    }
  }

  if (section.bullets && section.bullets.length > 0) {
    for (const bullet of section.bullets) {
      parts.push(`- ${escapeMdxText(bullet)}`);
    }
    parts.push('');
  }

  if (section.table) {
    const { headers, rows } = section.table;
    const escapeCell = (cell: string) => escapeMdxText(cell).replace(/\|/g, '\\|');
    parts.push(`| ${headers.map(escapeCell).join(' | ')} |`);
    parts.push(`| ${headers.map(() => '---').join(' | ')} |`);
    for (const row of rows) {
      parts.push(`| ${row.map(escapeCell).join(' | ')} |`);
    }
    parts.push('');
  }

  if (section.callout) {
    parts.push(`<Callout type="${section.callout.type}">`);
    parts.push(escapeMdxText(section.callout.text));
    parts.push('</Callout>');
    parts.push('');
  }

  return parts.join('\n');
}

function renderGuide(guide: Guide): string {
  const frontmatter = [
    '---',
    `id: ${guide.id}`,
    `title: ${yamlString(guide.title)}`,
    `description: ${yamlString(guide.description)}`,
    `category: ${guide.category}`,
    `readTime: ${yamlString(guide.readTime)}`,
    `lastUpdated: ${yamlString(guide.lastUpdated)}`,
    `slug: ${guide.slug}`,
    `relatedTemplates:`,
    ...(guide.relatedTemplates || []).map((id) => `  - ${id}`),
    `relatedGuides:`,
    ...(guide.relatedGuides || []).map((id) => `  - ${id.replace(/\s+/g, '')}`),
    `faq:`,
    ...(guide.faq || []).map((item) => [
      `  - question: ${yamlString(item.question)}`,
      `    answer: ${yamlString(item.answer)}`,
    ].join('\n')),
    '---',
    '',
  ].join('\n');

  const body = guide.sections.map(renderSection).join('\n');

  return frontmatter + body;
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const guide of guides) {
  const filePath = path.join(outDir, `${guide.slug}.mdx`);
  const mdx = renderGuide(guide);
  fs.writeFileSync(filePath, mdx, 'utf-8');
  console.log(`Wrote ${filePath}`);
}

console.log(`Converted ${guides.length} guides to MDX.`);
