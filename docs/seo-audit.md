# Open Sheets — SEO, Lighthouse & AI/SEO Audit

**Project:** `/home/antk123/OpenSheets/app`  
**Site:** Open Sheets — Free UK Business Templates  
**Stack:** React 19 + Vite 7 + Tailwind CSS 3 + TypeScript  
**Audited:** 2026-06-16

---

## Executive Summary

Open Sheets is a client-side React/Vite SPA offering free UK bookkeeping spreadsheet templates and guides. The content is strong and well-targeted, but the site is built as a **state-based single-page app with no real URLs**, which is the single biggest blocker to organic and AI-search visibility.

### Lighthouse Scores (Homepage)

| Device | Performance | Accessibility | Best Practices | SEO |
|--------|------------:|--------------:|---------------:|----:|
| Desktop | 99 | 88 | 96 | 82 |
| Mobile | 92 | 84 | 96 | 82 |

### Top 5 Priorities

1. Fix state-based navigation — replace it with real URLs (`react-router` routes + `<a>` tags).
2. Add unique `<title>`, `<meta name="description">`, Open Graph and canonical tags for every page and guide.
3. Add `robots.txt`, XML sitemap, favicon and touch icons.
4. Implement schema markup (Organization, SoftwareApplication / ItemList for templates, Article / FAQPage for guides).
5. Add `/llms.txt` and machine-readable content for AI crawlers.

---

## Lighthouse Findings

### Strengths

- **Performance is excellent on desktop** (99) and very good on mobile (92).
- Core Web Vitals mostly pass:
  - Desktop: LCP 0.8s, CLS 0.001, TBT 0ms.
  - Mobile: LCP 2.7s, CLS 0.014, TBT 60ms.
- No render-blocking resources detected.
- CSS and JS are minified.

### Issues

| Issue | Value | Impact |
|-------|------:|--------|
| Mobile LCP | 2.7s | Just above the 2.5s "Good" threshold. |
| Unused JavaScript | 144 KiB potential savings | Large monolithic bundle. |
| Total page weight | 312 KB | Acceptable, but bundle could be split. |
| SEO score capped | 82 | Missing meta description and robots.txt. |

### Performance Recommendations

- Code-split by route (`React.lazy` + `Suspense`) and split `templates.ts` / `guides.ts` from the main chunk.
- Lazy-load guide data; most visitors only hit the homepage.
- Preconnect/dns-prefetch if analytics or external fonts are added later.

---

## Technical SEO Findings

### 1. State-based navigation — no real URLs (Critical)

**Issue:** The app uses `useState` for page switching (`home`, `templates`, `about`, `guides`, `guide-article`). `react-router` is imported but never used for routing.

**Evidence:** `App.tsx` lines 16–77; `window.history` is never touched; navigation is done via `onClick` handlers.

**Impact:**
- Search engines cannot discover individual pages or guides.
- No shareable URLs for templates or guides.
- Refreshing resets to the homepage.
- No browser history / back-button support.

**Fix:**
- Use `react-router` with real routes:
  - `/` → Home
  - `/templates` → Templates
  - `/templates/:slug` → Template detail
  - `/guides` → Guides
  - `/guides/:slug` → Guide article
  - `/about` → About / Why Spreadsheets
- Replace `<button onClick={...}>` nav items with `<Link>` or `<a>`.

---

### 2. Missing `robots.txt` and XML sitemap (Critical)

**Issue:** `public/` contains only `images/` and `templates/`. No `robots.txt` or `sitemap.xml`.

**Impact:**
- Lighthouse flags robots.txt as invalid/missing.
- Search engines have no crawl roadmap.
- AI crawlers cannot determine what is allowed.

**Fix:**

Create `/public/robots.txt`:

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Disallow:

User-agent: ChatGPT-User
Disallow:

User-agent: PerplexityBot
Disallow:

User-agent: ClaudeBot
Disallow:

User-agent: Google-Extended
Disallow:

Sitemap: https://opensheets.co.uk/sitemap.xml
```

Create `/public/sitemap.xml` with all routes.

---

### 3. Missing meta tags (High)

**Issue:** `index.html` only sets a `<title>`. No meta description, Open Graph, Twitter cards, canonical or favicon.

**Evidence:** `app/index.html` lines 1–12.

**Fix:** Use `react-helmet-async` (or static site generation) to inject per-page tags.

Homepage example:

```html
<title>Open Sheets — Free UK Bookkeeping Spreadsheet Templates</title>
<meta name="description" content="Download 16 free UK bookkeeping spreadsheets for sole traders, landlords and small businesses. Cash books, VAT, mileage logs, P&L and MTD guides.">
<link rel="canonical" href="https://opensheets.co.uk/">
<meta property="og:title" content="Open Sheets — Free UK Bookkeeping Spreadsheet Templates">
<meta property="og:description" content="...">
<meta property="og:url" content="https://opensheets.co.uk/">
<meta property="og:image" content="https://opensheets.co.uk/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

Each guide and template needs unique title, description, OG and canonical.

---

### 4. No canonical tags (High)

**Issue:** No `<link rel="canonical">` anywhere.

**Fix:** Add self-referencing canonicals on every page.

---

### 5. No favicon or app icons (Medium)

**Issue:** No favicon link in `index.html`.

**Fix:** Add `favicon.ico`, `apple-touch-icon.png` and relevant `<link>` tags.

---

### 6. Large monolithic JS bundle (Medium)

**Issue:** `dist/assets/index-LCHvT4ls.js` is 821 KB (253 KB gzipped). All templates and guides ship on every page.

**Fix:**
- Code-split by route.
- Lazy-load `guides.ts` and `templates.ts` on their respective routes.
- Remove unused hero images from `public/images/` (`hero-home.jpg`, `hero-landlord.jpg`, `hero-templates.jpg`).

---

### 7. No structured data / schema markup (High)

**Issue:** No JSON-LD found.

**Fix:** Add relevant schemas.

**Organization (global):**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Open Sheets",
  "url": "https://opensheets.co.uk",
  "logo": "https://opensheets.co.uk/logo.png",
  "description": "Free UK bookkeeping spreadsheets and guides..."
}
```

**Templates (SoftwareApplication or DownloadAction):**

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Cash Book & Income Tracker",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP"
  },
  "operatingSystem": "Excel, Google Sheets"
}
```

**Guides (Article + FAQPage):**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Is Bookkeeping? A Plain-English Guide...",
  "author": { "@type": "Organization", "name": "Open Sheets" },
  "dateModified": "2026-06-01",
  "publisher": { "@type": "Organization", "name": "Open Sheets" }
}
```

Use `FAQPage` schema for FAQ sections.

---

## On-Page SEO Findings

### 8. Navigation links are `<button>`, not `<a>` (High)

**Issue:** Navbar and footer use `<button onClick={() => onNavigate(...)}>` for internal navigation.

**Impact:**
- Screen readers cannot identify them as links.
- Search engines cannot follow them as crawlable links.
- Right-click / open in new tab / copy link do not work.

**Fix:** Replace all internal navigation with `<Link to="...">` from `react-router`.

---

### 9. Heading structure (Mostly Good)

**Good:**
- HomePage: one clear H1, logical H2/H3 hierarchy.
- TemplatesPage, AboutPage, GuidesPage, GuideArticlePage: one H1 each.

**Minor issue:**
- `GuideArticlePage` has empty `heading: ''` sections that render no H2 but create DOM blocks.
- FAQ buttons are not marked up as headings; consider wrapping questions in `<h3>` inside accordions.

---

### 10. Images (Mixed)

**Good:** No broken image references; decorative icons are inline SVGs.

**Bad:** The three hero JPEGs in `public/images/` are unused and will still be copied to `dist/`.

**Fix:** Remove them or use them with descriptive `alt` text.

---

### 11. Internal linking is broken by design (Critical)

Because the app has no real URLs, there is no crawlable internal link graph.

Once real routing is in place:
- Link each template card to `/templates/:slug`.
- Link each guide card to `/guides/:slug`.
- Add breadcrumb navigation on guide/template detail pages.

---

### 12. Content quality is strong

The guides are detailed, accurate and target real UK search queries:

- “What is bookkeeping”
- “Getting started as a sole trader”
- “Landlord tax guide”
- “VAT explained”
- “Making Tax Digital”
- “Self Assessment guide”
- “Business expenses”

Length, structure and keyword coverage are good. Add author/updated dates and internal citations for stronger E-E-A-T.

---

## AI / AEO / GEO Findings

### 13. No AI-visible machine-readable files (High)

**Issue:** No `/llms.txt`, `/llms-full.txt` or machine-readable content index.

**Fix:** Create `/public/llms.txt`:

```markdown
# Open Sheets

> Free UK bookkeeping spreadsheet templates and plain-English tax guides for sole traders, landlords, freelancers and small businesses.

## Key pages
- [Home](https://opensheets.co.uk/)
- [Templates](https://opensheets.co.uk/templates)
- [Guides](https://opensheets.co.uk/guides)
- [What Is Bookkeeping?](https://opensheets.co.uk/guides/what-is-bookkeeping)
- [Sole Trader Guide](https://opensheets.co.uk/guides/sole-trader-guide)
- [Landlord Tax Guide](https://opensheets.co.uk/guides/landlord-tax-guide)
- [VAT Explained](https://opensheets.co.uk/guides/vat-explained)
- [Making Tax Digital](https://opensheets.co.uk/guides/making-tax-digital)
- [Self Assessment Guide](https://opensheets.co.uk/guides/self-assessment-guide)
- [Business Expenses](https://opensheets.co.uk/guides/business-expenses)

## Templates
- Cash Book & Income Tracker
- Self-Employed Income & Expense Log
- VAT Return Calculator
- Rental Property Income & Expenses
- ... (all 16)
```

Also create `/public/llms-full.txt` with the full guide text so AI systems can cite it accurately.

---

### 14. Content is extractable but lacks authority signals (Medium)

**Good for AI extraction:**
- “At a Glance” bullet summaries.
- FAQ sections.
- Comparison tables.
- Clear H2/H3 headings matching query intent.

**Missing for AI citation:**
- Author attribution on guides.
- Inline citations to HMRC / GOV.UK for statistics and deadlines.
- Prominently displayed “Last updated” dates.
- Original data / research.

Research shows citations (+40%) and statistics (+37%) are the strongest AI-visibility boosters.

---

### 15. No FAQPage schema for AI Overviews (High)

The homepage and every guide have FAQ content. Wrap it in `FAQPage` JSON-LD so Google can surface it in AI Overviews.

---

### 16. AI bot access is undefined (Medium)

Without a `robots.txt`, AI crawlers default to crawling everything, but you cannot signal preference. Add explicit `Allow` rules for GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot and Google-Extended.

---

## Prioritized Action Plan

### P0 — Blocking SEO / AI visibility

1. Replace state-based routing with real `react-router` URLs.
2. Convert all `<button>` nav links to `<Link>` / `<a>`.
3. Add unique `<title>`, `<meta name="description">`, canonical and Open Graph to every route.
4. Add `robots.txt` and XML sitemap.

### P1 — High impact, easy wins

5. Add Organization + SoftwareApplication + Article / FAQPage JSON-LD schemas.
6. Remove unused hero images from `public/images/`.
7. Add favicon and touch icons.
8. Add `/llms.txt` and `/llms-full.txt`.

### P2 — Content and conversion

9. Add visible “Last updated” dates and author bios on guides.
10. Add inline citations / GOV.UK links for deadlines and thresholds.
11. Code-split routes and lazy-load guide/template data.
12. Add template detail pages (`/templates/:slug`) with `DownloadAction` schema.

### P3 — Monitoring and scale

13. Submit sitemap to Google Search Console / Bing Webmaster Tools.
14. Set up monthly AI-visibility monitoring (ChatGPT, Perplexity, Google AI Overviews).
15. Add comparison / alternative pages (e.g., “Best free bookkeeping spreadsheet templates UK”, “Spreadsheets vs QuickBooks for sole traders”) — the most-cited content types in AI answers.

---

## Migration Recommendation

Given the content-heavy, mostly static nature of the site, **migrating from Vite React to Astro** is strongly recommended. Astro provides:

- Static HTML generation for every page.
- Zero-JS-by-default with React islands only where needed.
- Built-in sitemap, RSS and content collections.
- Native Markdown / MDX support for guides.
- Better Core Web Vitals and lower bundle size.

This would solve the routing, meta-tag, schema and AI-visibility issues more cleanly than patching the current SPA.
