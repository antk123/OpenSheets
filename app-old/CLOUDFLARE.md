# Deploying to Cloudflare Pages

This project is set up as an **npm workspace** with the Astro app in `app/` and the TinaCMS config at the repo root (`tina/`). Cloudflare Pages will build from the repository root.

## What was prepared

- Cloudflare Pages project: **`opensheets`**
- Production branch: **`main`**
- `.nvmrc` at repo root → Node `20`
- Root `package.json` with workspaces and build script: `tinacms build && npm run build -w app`
- Output directory: `app/dist`

## 1. Connect the GitHub repository

1. Go to https://dash.cloudflare.com → **Workers & Pages**.
2. Find the **`opensheets`** project and click it.
3. Go to **Settings** → **Builds & deployments** → **Configure**.
4. Connect to the **`antk123/OpenSheets`** repository and the **`main`** branch.
5. Set:
   | Setting | Value |
   |---|---|
   | **Project name** | `opensheets` |
   | **Production branch** | `main` |
   | **Build command** | `npm run build` |
   | **Build output directory** | `app/dist` |
   | **Root directory** | `/` (repo root) |
6. Add environment variables:
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

## Troubleshooting

### `/admin` shows the homepage

This happens when the Tina admin files were not built. Make sure:

1. Cloudflare Pages is building from the **repo root** (`/`), not `app/`.
2. The build command is `npm run build`.
3. `TINA_TOKEN` is set and valid.
4. Trigger a new deployment.

If `tinacms build` does not run, `admin/index.html` is never created, and Cloudflare Pages falls back to serving `index.html` for missing routes.

### `/some-missing-page` shows the homepage

The site now includes a `404.html`, so unknown paths should show a 404 page. If you still see the homepage, purge the Cloudflare cache and redeploy.

## Notes

- The `TINA_TOKEN` should be kept secret in the Cloudflare Pages dashboard.
- `NEXT_PUBLIC_TINA_CLIENT_ID` is safe to expose; it is used by the browser admin UI.
- TinaCMS config must live at the repo root so TinaCloud can index branches. The Astro app remains in `app/`.
- If you want server-side rendering (SSR) or Cloudflare Workers functions later, install the `@astrojs/cloudflare` adapter. For this static content site, Pages static hosting is the simplest choice.
