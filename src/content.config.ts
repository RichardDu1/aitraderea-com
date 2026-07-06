import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const easCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/eas" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    author: z.string().optional(),
    score: z.number().optional(),
    price: z.string().optional(),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    bottomLine: z.string().optional(),
    verdict: z.string().optional(),
    publishedAt: z.date().optional()
  }),
});


const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Editorial Team'),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional()
  }),
});

export const collections = {
  'blog': blogCollection,
  'eas': easCollection,
};
