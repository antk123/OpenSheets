import { defineCollection, z } from 'astro:content';

const faqSchema = z.array(
  z.object({
    question: z.string(),
    answer: z.string(),
  })
).default([]);

const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['bookkeeping', 'tax', 'mtd', 'business', 'expenses']),
    readTime: z.string(),
    lastUpdated: z.string(),
    relatedTemplates: z.array(z.string()).default([]),
    relatedGuides: z.array(z.string()).default([]),
    faq: faqSchema,
  }),
});

export const collections = {
  guides: guidesCollection,
};
