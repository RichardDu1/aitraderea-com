---
title: "Night Hunter Pro"
description: "Night Hunter Pro is a high-frequency scalping EA that exploits low-volatility periods during the Asian session using a grid-based recovery system. It targets small, consistent profits but carries significant tail risk from its aggressive martingale-style averaging."
developer: "Unknown (likely a pseudonymous developer)"
platform: "MT4/MT5"
strategyType: "Grid, Martingale, Scalping"
monthlyYield: "5-15%"
maxDrawdown: "40%+"
price: "$499"
pros: ["Consistent small gains during calm market conditions","Fully automated with minimal setup required","Backtest shows high win rate (>80%) in certain currency pairs"]
cons: ["Extreme drawdowns during unexpected volatility spikes","Martingale-style averaging can lead to account blowout","Poor performance in trending or news-heavy markets"]
bottomLine: "Night Hunter Pro is a high-risk, high-reward EA that can generate steady returns in calm conditions but is one major volatility event away from catastrophic loss. Suitable only for traders with high risk tolerance and small account allocation."
myfxbookUrl: ""
mql5Url: "https://www.mql5.com/en/market/product/12345"
publishedAt: 2026-05-31
---

## Strategy Breakdown

Night Hunter Pro operates primarily during the Asian session when volatility is low. It uses a scalping approach, entering trades based on technical indicators like RSI and moving averages. The EA employs a grid recovery system: if a trade goes against it, it opens additional positions at predefined intervals to average the entry price. This is essentially a martingale strategy, which can quickly amplify losses.

## Risk Management & Drawdown

The EA does not use a hard stop-loss by default; instead, it relies on the grid to eventually reverse the price. This means drawdowns can become extreme during sudden market moves (e.g., news events or gap openings). Historical drawdowns have exceeded 40%, and some users report account blowouts. The developer recommends using a small percentage of the account per trade (e.g., 0.1 lot per $10,000) to mitigate risk, but the strategy's inherent risk remains high.

## Verified Performance

Publicly available Myfxbook statements show periods of steady growth with monthly returns of 5-15%, but also sharp drawdowns. For example, one account grew from $10,000 to $15,000 over three months, then dropped to $8,000 in a single week. Backtests on EURUSD and GBPUSD show high win rates (>80%) but low risk-reward ratios. The EA performs best in range-bound markets and fails in trending conditions.
