import fs from 'fs';
import path from 'path';
import { fetchSearchContext } from './web_crawler.mjs';

const DEEPSEEK_API_KEY = "sk-a2dc0881aaac4bfcbe75b200177655b1";
const REVIEWS_DIR = path.join(process.cwd(), 'src', 'content', 'reviews');

if (!fs.existsSync(REVIEWS_DIR)) fs.mkdirSync(REVIEWS_DIR, { recursive: true });

function sanitizeSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function callDeepSeek(prompt) {
  const reqBody = {
    model: "deepseek-chat",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    response_format: { type: "json_object" }
  };

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify(reqBody)
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function generateEA(eaName) {
  console.log(`\n======================================================`);
  console.log(`🤖 Analyzing Quantitative Data for: ${eaName}`);
  
  // 1. Crawl for facts
  console.log(`🔍 Crawling MyFxBook and MQL5 data for ${eaName}...`);
  let searchResults = "";
  try {
    searchResults = await fetchSearchContext(`"${eaName}" MT4 MT5 expert advisor review myfxbook drawdown yield 2026`);
  } catch (e) {
    console.warn(`⚠️ Crawl failed: ${e.message}`);
  }

  // 2. Ask DeepSeek to generate Schema + Markdown
  console.log(`🧠 Generating structured EA Review...`);
  const prompt = `
You are a Quantitative Finance Analyst writing for AITraderEA.com.
Write an exhaustive, brutally honest, data-driven review for the Expert Advisor (EA): "${eaName}".

I have scraped the web for factual data. Here are the snippets:
---
${searchResults}
---

Your task is to output a single JSON object containing BOTH the frontmatter metadata and the full markdown review.
Ensure all data is as factual as possible based on the snippets (or your internal knowledge of this famous EA if snippets are empty). Be objective.

Output exactly this JSON structure (no markdown fences around it, just raw JSON):
{
  "title": "Exact EA Name",
  "description": "2-3 sentence executive summary of its trading edge.",
  "developer": "Name of the developer or company",
  "platform": "MT4, MT5, or MT4/MT5",
  "strategyType": "e.g., Grid, Martingale, Trend Following, Scalping, Neural Network",
  "monthlyYield": "e.g., 2-5%, or 15% (estimate based on data)",
  "maxDrawdown": "e.g., 18.5% or 30%+",
  "price": "e.g., $1500 or Free",
  "pros": ["Pro 1", "Pro 2", "Pro 3"],
  "cons": ["Con 1", "Con 2", "Con 3"],
  "bottomLine": "1 paragraph brutal conclusion on risk vs reward.",
  "myfxbookUrl": "https://www.myfxbook.com/...",
  "mql5Url": "https://www.mql5.com/...",
  "markdownContent": "The full detailed review in Markdown. Include H2s like '## Strategy Breakdown', '## Risk Management & Drawdown', '## Verified Performance'. Do not include the title (H1) or frontmatter."
}
`;

  const responseJson = await callDeepSeek(prompt);
  let parsed;
  try {
    parsed = JSON.parse(responseJson);
  } catch (e) {
    console.error("❌ Failed to parse output:", responseJson);
    return;
  }

  // 3. Write File
  const slug = sanitizeSlug(parsed.title);
  const filePath = path.join(REVIEWS_DIR, `${slug}.md`);
  const dateStr = new Date().toISOString().split('T')[0];

  const frontmatter = `---
title: "${parsed.title.replace(/"/g, '\\"')}"
description: "${parsed.description.replace(/"/g, '\\"')}"
developer: "${parsed.developer.replace(/"/g, '\\"')}"
platform: "${parsed.platform}"
strategyType: "${parsed.strategyType}"
monthlyYield: "${parsed.monthlyYield}"
maxDrawdown: "${parsed.maxDrawdown}"
price: "${parsed.price}"
pros: ${JSON.stringify(parsed.pros || [])}
cons: ${JSON.stringify(parsed.cons || [])}
bottomLine: "${parsed.bottomLine.replace(/"/g, '\\"')}"
myfxbookUrl: "${parsed.myfxbookUrl || ''}"
mql5Url: "${parsed.mql5Url || ''}"
publishedAt: ${dateStr}
---

${parsed.markdownContent}
`;

  fs.writeFileSync(filePath, frontmatter, 'utf-8');
  console.log(`   ✅ Created deep-dive EA review: ${slug}.md`);
}

async function run() {
  const easToReview = ["Perceptrader AI", "Waka Waka EA", "Night Hunter Pro", "Golden Pickaxe", "TickSniper"];
  
  for (const ea of easToReview) {
    await generateEA(ea);
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log(`\n🎉 Batch complete! Generated reviews for ${easToReview.length} EAs.`);
}

run();
