import { defineConfig } from 'tinacms';
import { templates } from '../app/src/data/templates';

const categoryOptions = [
  { value: 'bookkeeping', label: 'Bookkeeping' },
  { value: 'tax', label: 'Tax' },
  { value: 'mtd', label: 'Making Tax Digital' },
  { value: 'business', label: 'Business Setup' },
  { value: 'expenses', label: 'Expenses' },
];

const templateOptions = templates.map((t) => ({
  value: t.id,
  label: t.name,
}));

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.NETLIFY_BRANCH ||
    'main',

  // Client ID is public and safe to commit. Token must stay secret.
  clientId:
    process.env.NEXT_PUBLIC_TINA_CLIENT_ID ||
    process.env.PUBLIC_TINA_CLIENT_ID ||
    'e239f708-4478-4359-9814-203eea8957fa',
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: 'admin',
    publicFolder: 'app/public',
  },

  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'app/public',
    },
  },

  schema: {
    collections: [
      {
        name: 'guide',
        label: 'Guides',
        path: 'app/src/content/guides',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
            isTitle: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: { component: 'textarea' },
            required: true,
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            required: true,
            options: categoryOptions,
          },
          {
            type: 'string',
            name: 'readTime',
            label: 'Read Time',
            description: 'e.g. "7 min read"',
            required: true,
          },
          {
            type: 'string',
            name: 'lastUpdated',
            label: 'Last Updated',
            description: 'e.g. "June 2025"',
            required: true,
          },
          {
            type: 'string',
            name: 'relatedTemplates',
            label: 'Related Templates',
            list: true,
            options: templateOptions,
          },
          {
            type: 'string',
            name: 'relatedGuides',
            label: 'Related Guides',
            list: true,
            description: 'Guide IDs (match the guide filename)',
          },
          {
            type: 'object',
            name: 'faq',
            label: 'FAQ Items',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'question',
                label: 'Question',
                required: true,
                isTitle: true,
              },
              {
                type: 'string',
                name: 'answer',
                label: 'Answer',
                ui: { component: 'textarea' },
                required: true,
              },
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/guides/${document._sys.filename}`,
        },
      },
    ],
  },
});
