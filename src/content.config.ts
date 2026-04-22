import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['tianti']),
    category: z.enum(['L1']),
    order: z.number().default(1),
    pubDate: z.coerce.date(),
  }),
});

export const collections = {
  blog,
};
