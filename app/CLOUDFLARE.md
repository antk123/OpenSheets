# Deploying to Cloudflare Pages

This project is already set up for **Cloudflare Pages** static hosting. The Cloudflare Pages project `opensheets` has been created and will be available at `https://opensheets.pages.dev/` once the first deployment runs.

## What was prepared

- Cloudflare Pages project: **`opensheets`**
- Production branch: **`main`**
- `.nvmrc` set to Node `20` (required by Astro 5 and TinaCMS)
- Build command already in `package.json`: `tinacms build && astro build`
- Output directory: `dist`

## 1. Connect the GitHub repository

Cloudflare Pages needs to be linked to your GitHub repo through the dashboard.

1. Go to the Cloudflare dashboard: https://dash.cloudflare.com
2. Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select the **`antk123/OpenSheets`** repository.
4. Select the **`main`** branch.
5. Use these build settings:
   - **Project name:** `opensheets`
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `app`
6. Add these environment variables:
   | Variable | Value |
   |---|---|
   | `NODE_VERSION` | `20` |
   | `NEXT_PUBLIC_TINA_CLIENT_ID` | Your TinaCloud Client ID |
   | `TINA_TOKEN` | Your TinaCloud Read Only Token |
   | `GITHUB_BRANCH` | `main` |
7. Click **Save and Deploy**.

The first build will fetch your TinaCloud schema, build the admin UI, and generate the static Astro site.

## 2. Add your Namecheap domain

### Point the domain to Cloudflare

Cloudflare Pages custom domains work best when Cloudflare manages your DNS.

1. In the Cloudflare dashboard, click **Add a Site**.
2. Enter your domain (e.g. `opensheets.co.uk`).
3. Choose the **Free** plan.
4. Cloudflare will scan for existing DNS records. Review them, then continue.
5. Cloudflare will give you two nameservers, for example:
   ```text
   lara.ns.cloudflare.com
   greg.ns.cloudflare.com
   ```
6. Log in to **Namecheap** → **Domain List** → click **Manage** next to your domain.
7. Under **Nameservers**, choose **Custom DNS** and enter the two Cloudflare nameservers.
8. Save and wait for DNS propagation (usually a few minutes, up to 24 hours).

### Add the custom domain in Pages

1. In Cloudflare Pages, open the `opensheets` project.
2. Go to **Custom domains** → **Set up a custom domain**.
3. Enter your domain (e.g. `opensheets.co.uk`).
4. Cloudflare will verify the DNS and issue an SSL certificate automatically.

## 3. Test the deployment

- Site: `https://opensheets.pages.dev/` (and later your custom domain)
- Tina admin: `https://opensheets.pages.dev/admin/index.html`

## 4. After TinaCloud edits

When an editor saves a guide in the Tina admin, TinaCloud commits the change to the `main` branch on GitHub. Cloudflare Pages will detect the push and rebuild the site automatically.

## Notes

- The `TINA_TOKEN` should be kept secret in the Cloudflare Pages dashboard.
- `NEXT_PUBLIC_TINA_CLIENT_ID` is safe to expose; it is used by the browser admin UI.
- If you do not want to use Cloudflare DNS, you can instead create a `CNAME` record at Namecheap pointing to `opensheets.pages.dev`. This works for `www`, but for an apex domain (`opensheets.co.uk` with no `www`) Cloudflare DNS is strongly recommended.
- If you want server-side rendering (SSR) or Cloudflare Workers functions later, install the `@astrojs/cloudflare` adapter. For this static content site, Pages static hosting is the simplest choice.
