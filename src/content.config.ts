import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviewsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/reviews" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    developer: z.string(), // e.g., "Valeriia Mishchenko"
    platform: z.string(), // e.g., "MT4 / MT5"
    strategyType: z.string(), // e.g., "Grid", "Trend", "Scalping", "Arbitrage"
    monthlyYield: z.string(), // e.g., "5-10%"
    maxDrawdown: z.string(), // e.g., "15.4%"
    price: z.string(), // e.g., "$1500"
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    bottomLine: z.string(),
    myfxbookUrl: z.string().optional(),
    mql5Url: z.string().optional(),
    publishedAt: z.date()
  }),
});

export const collections = {
  'reviews': reviewsCollection,
};
