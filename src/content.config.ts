import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['leetcode', 'tianti']),
    category: z.enum(['simulate', 'search', 'L1', 'L2', 'L3']),
    order: z.number().default(1),
    pubDate: z.coerce.date(),
  }),
});

export const collections = {
  blog,
};
