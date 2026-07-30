// EA SVG Image Generator — run: node generate-ea-images.mjs
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = 'public/images/eas';

const EAS = [
  { slug: 'forex-fury-v6', name: 'Forex Fury', category: 'scalper', color: '#0052ff' },
  { slug: 'perceptrader-ai-ea', name: 'Perceptrader AI', category: 'ai-ml', color: '#7c3aed' },
  { slug: 'neurobot-ai', name: 'NeuroBot AI', category: 'ai-ml', color: '#0891b2' },
  { slug: 'ftmo-robot-pro', name: 'FTMO Robot Pro', category: 'prop-challenge', color: '#059669' },
  { slug: 'golden-pickaxe-ea', name: 'Golden Pickaxe', category: 'trend', color: '#d97706' },
  { slug: 'alfa-scalper', name: 'Alfa Scalper', category: 'scalper', color: '#dc2626' },
  { slug: 'waka-waka-ea', name: 'Waka Waka EA', category: 'grid', color: '#7c3aed' },
  { slug: 'forex-flex-ea', name: 'Forex Flex EA', category: 'multi-strategy', color: '#0891b2' },
  { slug: 'forex-diamond-ea', name: 'Forex Diamond', category: 'trend', color: '#059669' },
  { slug: 'evening-scalper-pro', name: 'Evening Scalper', category: 'scalper', color: '#dc2626' },
  { slug: 'night-hunter-pro', name: 'Night Hunter Pro', category: 'scalper', color: '#1d4ed8' },
  { slug: 'valerytrading-matrix', name: 'ValeryTrading', category: 'multi-strategy', color: '#7c3aed' },
  { slug: '1000pip-climber-system', name: '1000pip Climber', category: 'trend', color: '#d97706' },
  { slug: 'gps-forex-robot-3', name: 'GPS Forex 3', category: 'multi-strategy', color: '#0891b2' },
  { slug: 'vader-forex-robot', name: 'Vader Robot', category: 'scalper', color: '#1d4ed8' },
  { slug: 'odin-forex-robot', name: 'Odin Robot', category: 'trend', color: '#059669' },
  { slug: 'wallstreet-forex-robot-3-0', name: 'Wallstreet 3.0', category: 'scalper', color: '#dc2626' },
  { slug: 'keltner-pro', name: 'Keltner Pro', category: 'multi-strategy', color: '#6b7280' },
  { slug: 'fxmasterbot', name: 'FX Master Bot', category: 'grid', color: '#7c3aed' },
  { slug: 'autoarima-grid-bot', name: 'AutoARIMA Grid', category: 'grid', color: '#0891b2' },
  { slug: '3commas-dca-bot', name: '3Commas DCA', category: 'martingale', color: '#0052ff' },
  { slug: 'bitsgap-arbitrage-bot', name: 'Bitsgap Bot', category: 'hedging', color: '#059669' },
  { slug: 'pionex-grid-trading-bot', name: 'Pionex Grid', category: 'grid', color: '#d97706' },
];

const CATEGORY_ICONS = {
  'scalper': '⚡',
  'ai-ml': '🧠',
  'prop-challenge': '🏆',
  'trend': '📈',
  'grid': '🔲',
  'multi-strategy': '🔄',
  'martingale': '📊',
  'hedging': '🛡️',
};

function generateSVG(name, category, color) {
  const icon = CATEGORY_ICONS[category] || '🤖';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
    </linearGradient>
    <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="400" height="400" rx="40" fill="url(#bg)"/>
  <!-- Shine -->
  <rect width="400" height="400" rx="40" fill="url(#shine)"/>
  <!-- Grid pattern overlay -->
  <g opacity="0.05">
    <line x1="0" y1="100" x2="400" y2="100" stroke="white" stroke-width="0.5"/>
    <line x1="0" y1="200" x2="400" y2="200" stroke="white" stroke-width="0.5"/>
    <line x1="0" y1="300" x2="400" y2="300" stroke="white" stroke-width="0.5"/>
    <line x1="100" y1="0" x2="100" y2="400" stroke="white" stroke-width="0.5"/>
    <line x1="200" y1="0" x2="200" y2="400" stroke="white" stroke-width="0.5"/>
    <line x1="300" y1="0" x2="300" y2="400" stroke="white" stroke-width="0.5"/>
  </g>
  <!-- Chart icon -->
  <g transform="translate(80, 60)" opacity="0.15">
    <polyline points="0,80 30,60 60,70 90,30 120,40 150,10 180,25 210,5 240,15" fill="none" stroke="white" stroke-width="4"/>
  </g>
  <!-- Category Icon -->
  <text x="200" y="180" text-anchor="middle" font-size="80" dominant-baseline="central">${icon}</text>
  <!-- EA Name -->
  <text x="200" y="270" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" fill="white" dominant-baseline="central">${name}</text>
  <!-- Badge -->
  <rect x="140" y="295" width="120" height="28" rx="14" fill="rgba(255,255,255,0.15)"/>
  <text x="200" y="309" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="12" fill="rgba(255,255,255,0.9)" dominant-baseline="central">${category.toUpperCase()}</text>
  <!-- MT4/MT5 Badge -->
  <text x="200" y="340" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="11" fill="rgba(255,255,255,0.5)" dominant-baseline="central">MT4 / MT5</text>
</svg>`;
}

// Ensure output dir
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Generate all SVGs
for (const ea of EAS) {
  const svg = generateSVG(ea.name, ea.category, ea.color);
  const filePath = path.join(OUTPUT_DIR, `${ea.slug}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✓ ${filePath}`);
}

// Also generate a default/generic EA image
const defaultSVG = generateSVG('Expert Advisor', 'multi-strategy', '#0052ff');
fs.writeFileSync(path.join(OUTPUT_DIR, 'default.svg'), defaultSVG);
console.log('✓ default.svg');

console.log(`\n✅ Generated ${EAS.length + 1} EA images!`);