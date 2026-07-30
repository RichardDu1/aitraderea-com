import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const easCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/eas" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    eaType: z.enum(['scalper', 'grid', 'trend', 'ai-ml', 'prop-challenge', 'martingale', 'hedging', 'multi-strategy']).optional(),
    platform: z.enum(['mt4', 'mt5', 'both']).optional().default('both'),
    author: z.string().optional(),
    score: z.number().optional(),
    price: z.string().optional(),
    priceValue: z.number().optional(),
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),
    bottomLine: z.string().optional(),
    verdict: z.string().optional(),
    verdictLabel: z.enum(['buy', 'wait', 'skip']).optional(),
    featured: z.boolean().optional().default(false),
    affiliateUrl: z.string().optional(),
    publishedAt: z.date().optional(),
    // Performance metrics
    winRate: z.number().optional(),
    maxDrawdown: z.string().optional(),
    profitFactor: z.number().optional(),
    sharpeRatio: z.number().optional(),
    monthlyReturn: z.string().optional(),
    // Backtest vs Live comparison
    backtestWinRate: z.number().optional(),
    liveWinRate: z.number().optional(),
    backtestMonthlyReturn: z.string().optional(),
    liveMonthlyReturn: z.string().optional(),
    backtestMaxDrawdown: z.string().optional(),
    liveMaxDrawdown: z.string().optional(),
    // Prop firm specific
    maxDailyLoss: z.string().optional(),
    maxDrawdownTarget: z.string().optional(),
    consistencyScore: z.number().optional(),
    // Additional
    tradingPairs: z.array(z.string()).optional(),
    recommendedBroker: z.string().optional(),
    minDeposit: z.string().optional(),
    setupDifficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Editorial Team'),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const comparisonCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/comparisons" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ea1: z.string(),
    ea2: z.string(),
    ea3: z.string().optional(),
    publishedAt: z.date().optional(),
    winner: z.string().optional(),
    verdict: z.string().optional(),
  }),
});

const bestOfsCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/best-ofs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    categorySlug: z.string(),
    featuredEas: z.array(z.string()),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'eas': easCollection,
  'comparisons': comparisonCollection,
  'bestOfs': bestOfsCollection,
};