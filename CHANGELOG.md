# Changelog

## [2026-06-09]
**Conversation Source:** Domain usage strategy analysis

### Added
- **Informational SEO Architecture:** Added `src/content/blog/` collection for I-Intent content (SEO guides, MT4 backtesting tutorials, etc.).
- **E-E-A-T Compliance Pages:** Generated `/about`, `/privacy`, `/terms`, and `/how-we-rate` pages to build Google topical authority and meet CPA compliance standards.
- **Newsletter Opt-in:** Added a custom subscription form above the footer to capture email leads for future Listmonk integration.

### Changed
- **Dynamic Routing Overhaul:** Replaced the generic `/workflows/` route with highly specific `/eas/[slug].astro` routing.
- **Footer Disclaimers:** Injected mandatory CFTC Rule 4.41 high-risk trading disclaimers into the footer.
- **Global Navigation:** Removed hardcoded obsolete navigation links ("Categories", "Latest", "Compare") from `Header.astro` and scrubbed ghost links from `BaseLayout.astro`.
