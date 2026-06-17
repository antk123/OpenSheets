# TinaCMS + TinaCloud Setup

This site is now configured to use **TinaCMS** for editing the guides in `src/content/guides/`. The frontend remains a static Astro site and does not need TinaCloud to run — TinaCloud only powers the CMS admin and the content API.

## What was added

- `tinacms` and `@tinacms/cli` dependencies
- `tina/config.ts` — schema for the `guide` collection
- `public/admin/index.html` — Tina admin entry point (generated)
- `tina/__generated__/*` — auto-generated GraphQL client (ignored by Git)
- `.env.example` — placeholder environment variables
- `package.json` scripts updated:
  - `dev`: `tinacms dev -c "astro dev"`
  - `build`: `tinacms build && astro build`

## Local development

```bash
cd app
npm run dev
```

The site runs at `http://localhost:4321` and the Tina admin is available at `http://localhost:4321/admin/index.html`.

In local mode no TinaCloud credentials are needed; Tina uses the local filesystem backend.

## Deploy with TinaCloud

### 1. Push your code to GitHub

Make sure the branch you want TinaCloud to track is pushed (e.g. `main`). The current repo is:

```
https://github.com/antk123/OpenSheets.git
```

If you are on a different branch, set the `GITHUB_BRANCH` environment variable or change the default in `tina/config.ts`.

### 2. Create a TinaCloud project

1. Go to https://app.tina.io and sign in with GitHub.
2. Create a new project.
3. Select the `OpenSheets` repository and the branch you want to use.
4. After creation, go to **Settings > Tokens** and copy:
   - **Client ID**
   - **Read Only Token**

### 3. Add environment variables

Create a `.env.local` file for local testing:

```env
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id_here
TINA_TOKEN=your_read_only_token_here
```

For production, add the same variables to your hosting dashboard:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Client ID from TinaCloud |
| `TINA_TOKEN` | Read Only Token from TinaCloud |
| `GITHUB_BRANCH` *(optional)* | The branch TinaCloud should track |

### 4. Deploy the site

TinaCloud manages the CMS backend, but it does **not** host the frontend. Deploy the Astro site to any static host:

#### Vercel (recommended)

1. Import `https://github.com/antk123/OpenSheets`.
2. Set the root directory to `app`.
3. Add the environment variables above.
4. Deploy.

#### Netlify

1. Connect the GitHub repo.
2. Set the base directory to `app`.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add the environment variables above.

#### Cloudflare Pages

1. Connect the GitHub repo.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Root directory: `app`
5. Add the environment variables above.

### 5. Log in to the admin

Once deployed, visit `https://your-domain.com/admin/index.html`. You will be prompted to log in with TinaCloud, after which you can edit the guides.

## Editing content

- Open `/admin/index.html`.
- Choose **Guides** from the sidebar.
- Edit existing guides or create new ones.
- Save changes — TinaCloud will commit them back to GitHub on your behalf.
- Your host will rebuild and redeploy the site automatically.

## Securing the admin login

When you use **TinaCloud**, authentication is handled for you:

- The admin UI at `/admin/index.html` redirects unauthenticated visitors to TinaCloud login.
- Users must be invited to your TinaCloud project before they can log in.
- Go to **Project Settings > Users** in https://app.tina.io to invite editors and assign roles.
- `TINA_TOKEN` is a **read-only** token used by the build process; it cannot be used to write content.

If you want an extra layer of protection, you can also add **HTTP Basic Auth** at the hosting level (e.g. Vercel Password Protection, Netlify Identity, Cloudflare Access) for the `/admin` path. This is optional because TinaCloud already gates access.

### Editorial workflow

By default, TinaCloud saves changes directly to the branch you configured. If you want reviews/approvals before publishing:

1. In the TinaCloud dashboard, set the project to use a **content branch** (e.g. `content`) instead of `main`.
2. Configure your host to build only from `main`.
3. Use GitHub pull requests to merge content changes from `content` into `main`.

This gives you a full editorial workflow with Git-based review.

## Important notes

- Do **not** commit `.env` or `.env.local` files.
- Do **not** commit `tina/__generated__` or `public/admin/index.html` — they are regenerated during `tinacms build`.
- The `id` field was removed from guide frontmatter because TinaCMS reserves it. The guide slug is now derived from the filename.
- Template data (`src/data/templates.ts`) is still code-driven. If you want to edit templates through TinaCMS later, move them to a JSON/YAML collection.
