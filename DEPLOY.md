# Deployment Guide — Open Sheets

## Current Status

✅ **Site built:** 48 pages, zero errors
✅ **Content ready:** 17 template landings, 8 guides, 5 category hubs, 3 blog articles, 9 SEO pages
✅ **SEO setup:** Sitemap, robots.txt, canonical URLs, JSON-LD schema
✅ **Analytics ready:** GA4 placeholder in Layout.astro (replace `G-XXXXXXXXXX` with real ID)
❌ **Deployment blocked:** GitHub PAT lacks write permissions

## How to Deploy

### Option 1: Fix the GitHub PAT (Recommended)

The current PAT (`github_pat_11AFJVPVI0...`) authenticates but gets **403 Permission Denied** on push.

**Fix:** Generate a new token with write access.

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token" → "Classic"**
3. Select scope: **`repo`** (full control of private repositories)
4. Or use **Fine-grained PAT** with `Contents: Read and Write` for `antk123/OpenSheets`
5. Copy the new token and send it to me

Once I have a working token, I'll push immediately and Cloudflare Pages will auto-deploy.

### Option 2: Manual Deploy via Cloudflare Dashboard

If you prefer not to share a new PAT:

1. Download the built site: `/root/.openclaw/workspace/opensheets/website/dist/`
2. Go to https://dash.cloudflare.com/ → Pages
3. Select the `opensheets` project
4. Go to **Deployments** → **Create deployment**
5. Upload the `dist/` folder
6. Site will be live at `opensheets.pages.dev`

### Option 3: GitHub Actions Auto-Deploy

I can set up a GitHub Actions workflow that auto-deploys to Cloudflare Pages on every push. This requires:
- A Cloudflare API token with `Cloudflare Pages:Edit` permission
- The token added as a GitHub secret

Let me know if you want this set up.

## Post-Deploy Checklist

- [ ] Replace `G-XXXXXXXXXX` in `Layout.astro` with real GA4 tracking ID
- [ ] Verify `opensheets.co.uk` is the custom domain in Cloudflare Pages
- [ ] Submit sitemap to Google Search Console: `https://opensheets.co.uk/sitemap.xml`
- [ ] Add GSC verification meta tag to `Layout.astro` (or upload HTML verification file)
- [ ] Test all template download links
- [ ] Post launch copy on social media (see `LAUNCH_COPY.md`)

## Site Structure

```
opensheets.co.uk/
├── /                          (homepage)
├── /templates                 (all templates grid)
├── /templates/[slug]          (17 individual template pages)
├── /guides/[slug]             (8 guide pages)
├── /about
├── /how-to-use
├── /core-bookkeeping          (category hub)
├── /tax-vat                   (category hub)
├── /financial-reports         (category hub)
├── /landlord-property         (category hub)
├── /business-tools            (category hub)
├── /blog/mtd-for-income-tax-2026
├── /blog/self-assessment-guide-sole-traders
├── /blog/landlord-tax-guide-2025-26
├── /free-bookkeeping-spreadsheet-templates-uk
├── /sole-trader-spreadsheet-template-uk
├── /vat-return-spreadsheet-template-uk
├── /landlord-spreadsheet-uk
├── /cash-book-template-uk
├── /mileage-log-template-uk
├── /profit-and-loss-template-uk
├── /balance-sheet-template-uk
├── /expense-tracker-template-uk
├── /sitemap.xml
└── /robots.txt
```

## Content Pipeline

See `CONTENT_CALENDAR.md` for the 30-day content plan.

Social launch copy ready in `LAUNCH_COPY.md` (Twitter thread, LinkedIn post, Reddit posts, IndieHackers post, email).
