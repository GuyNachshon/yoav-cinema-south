# Content & deployment

## How it works (deployment + editing)

**Where content lives:** In your Git repo, in the `content/` folder (JSON files). The site does **not** read content from a database at runtime—it’s baked in at **build time**.

**Vercel:** You connect the repo to Vercel. Every time you push to GitHub (or something pushes for you), Vercel runs `next build`, reads the latest `content/*.json` from the repo, and deploys a new version of the site. So “go live” = “new build with the latest content.”

**Editing so the customer can update the live site:**

1. **Tina Cloud (recommended for non-devs)**  
   - You create a project at [app.tina.io](https://app.tina.io) and connect your **GitHub** repo.  
   - You add Tina’s env vars to **Vercel** (`NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`).  
   - You deploy the **admin** so the customer can open it in the browser: set Vercel’s build command to `npm run build:cms` so the admin is built and served at **yoursite.com/admin** (or **yoursite.com/admin/index.html**).  
   - **Customer flow:** Customer goes to **yoursite.com/admin** → logs in (Tina Cloud auth) → chooses a collection (Movies, Schedule, About, etc.) → edits in the form → clicks **Save**. Tina Cloud then **commits and pushes** the change to your GitHub repo. Vercel sees the new commit and **starts a new deployment**. In about 1–3 minutes the deployment finishes and the **live site** shows the new content. No code, no Git, no terminal—they only use the admin UI.

2. **Without Tina (edit in GitHub)**  
   - Someone opens the repo on GitHub → `content/` → edits a JSON file → commits. Vercel auto-deploys; same result, but they need to edit JSON and use Git.

**Summary:** Content is in Git → Vercel builds from Git → “live” = latest build. With Tina Cloud, the customer edits in the admin → Tina pushes to Git → Vercel redeploys → site updates in a couple of minutes.

**Setup checklist (so the customer can edit and see updates on Vercel):**

1. **Vercel:** Deploy the repo. In Project → Settings → General, set **Build Command** to `npm run build:cms` (so `/admin` is available on the live site).
2. **Tina Cloud:** Go to [app.tina.io](https://app.tina.io) → New project → Connect your **GitHub** repo (same one Vercel uses). Copy the **Client ID** and **Token**.
3. **Vercel env vars:** In Project → Settings → Environment Variables, add `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` (from Tina Cloud). Redeploy so the new build uses them.
4. **Customer:** Send them the admin URL: **https://your-vercel-domain.com/admin** (or `/admin/index.html`). They open it, log in with Tina Cloud (or GitHub via Tina), and edit. After they save, wait 1–3 minutes; the main site will show the new content.

---

## Content files (edit these)

All editable content lives in **`content/`**. The site reads these at build time. Each file is a JSON object with one key (e.g. `{ "movies": [...] }`) so the admin UI can edit them.

| File | Key | Used for |
|------|-----|----------|
| `content/about.json` | (flat) | About page: `column1`, `column2` |
| `content/about-leaders.json` | `leaders` | About page: leaders (filename, name, description) |
| `content/categories.json` | `categories` | Movie categories |
| `content/competitions.json` | `competitions` | Competition ticker strip |
| `content/events.json` | `events` | Events ticker strip |
| `content/movies.json` | `movies` | Movie detail data (title, directors, synopsis, credits, screenings) |
| `content/panorama.json` | `panoramaImages` | Panorama strip: slug + filename |
| `content/schedule.json` | `schedule` | Events schedule (date, dayName, time, title, location, column) |

Types are in **`types/content.ts`**. Data is loaded in **`lib/data.ts`**, **`lib/panorama.ts`**, **`lib/tickers.ts`**, **`lib/events.ts`**.

## How to edit (non-developers)

- **Admin UI (recommended):** Run `npm run dev:cms`, open **http://localhost:3000/admin/index.html**, and edit any content in the sidebar. Connect [Tina Cloud](https://app.tina.io) so saves create Git commits and trigger Vercel redeploy. No code or JSON needed.
- **GitHub:** Open the repo → `content/` → edit the JSON file → Commit. Vercel will redeploy.

## Deploy (Vercel or Cloudflare)

**Vercel:** Push the repo to GitHub. In [Vercel](https://vercel.com): **Add New Project** → Import the repo. Framework: Next.js. Build: `next build` (or `npm run build:cms` for the Tina admin). Future pushes trigger new deployments.

**Cloudflare:** Deploy the same repo to Cloudflare Workers via OpenNext; see **DEPLOY_CLOUDFLARE.md**. Tina Cloud works the same: connect the same GitHub repo to Cloudflare; when Tina pushes, Cloudflare redeploys.

Content is read from the repo at build time, so edits go live on the next deploy (push or “Redeploy”).

## TinaCMS admin UI (everything editable)

All content is editable in the Tina admin. No JSON or code required.

1. **Local:** Install deps and run the CMS: `npm install` then `npm run dev:cms`. Open **http://localhost:3000/admin/index.html**. You’ll see: About, About (leaders), Panorama, Movies, Events schedule, Categories, Competitions (ticker), Events (ticker). Edit any list or field and save.
2. **Tina Cloud (for Git + deploy):** In [app.tina.io](https://app.tina.io) create a project and connect your repo. In Vercel → Project → Settings → Environment Variables, add `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN`. Saves in the admin will create commits and trigger a new deploy.
3. **Vercel build with admin:** To serve the admin on production, set the Vercel build command to `npm run build:cms` (runs `tinacms build && next build`). Otherwise use `next build`; content is still editable locally with `dev:cms`.
