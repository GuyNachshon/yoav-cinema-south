# Deploy to Cloudflare

You can deploy this Next.js app to **Cloudflare Workers** and use the same GitHub repo + Tina Cloud flow: customer edits in the admin → Tina pushes to GitHub → Cloudflare redeploys.

This app uses **Node.js APIs** in API routes (e.g. `readFile`, `path` for panorama images). The recommended way to run it on Cloudflare is **OpenNext for Cloudflare** (`@opennextjs/cloudflare`), which supports the Node.js runtime on Workers. The older **@cloudflare/next-on-pages** path only supports the Edge runtime and would require rewriting those API routes.

---

## 1. Install OpenNext for Cloudflare and Wrangler

```bash
npm install @opennextjs/cloudflare@latest
npm install --save-dev wrangler@latest
```

Use Wrangler **3.99.0** or later.

---

## 2. Wrangler config

Create **`wrangler.jsonc`** in the project root:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "yoav-south-festival",
  "compatibility_date": "2024-12-30",
  "compatibility_flags": [
    "nodejs_compat",
    "global_fetch_strictly_public"
  ],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "yoav-south-festival"
    }
  ]
}
```

See [OpenNext Cloudflare get-started](https://opennext.js.org/cloudflare/get-started) for optional R2 cache and image bindings.

---

## 3. Scripts and build

In **`package.json`**, keep your existing `build` script. Add Cloudflare scripts:

```json
"scripts": {
  "dev": "next dev",
  "dev:cms": "tinacms dev -c \"next dev\"",
  "build": "next build",
  "build:cms": "tinacms build && next build",
  "start": "next start",
  "preview:cf": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
  "deploy:cf": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
  "lint": "next lint"
}
```

- **Build for Cloudflare:** OpenNext runs your `build` script (e.g. `next build`) and then transforms the output. To include the Tina admin in the deploy, use a build that runs Tina first, e.g. set **Build command** in Cloudflare to: `npm run build:cms` and ensure the **build** script in `package.json` is what OpenNext should run (e.g. `next build` only; then in CI you run `tinacms build && opennextjs-cloudflare build` or equivalent). See step 6.
- **Local preview (Workers runtime):** `npm run preview:cf`
- **Deploy:** `npm run deploy:cf` (or use Git integration below).

---

## 4. Gitignore

Add to **`.gitignore`**:

```
.open-next
```

---

## 5. Env vars (Tina + any others)

For local preview with Wrangler, use **`.dev.vars`** (do not commit secrets):

```
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
TINA_TOKEN=your-token
```

For production, set the same variables in the Cloudflare dashboard: **Workers & Pages** → your project → **Settings** → **Variables and Secrets**.

---

## 6. Deploy via Git (recommended) + Tina

1. **Cloudflare dashboard:** [Workers & Pages](https://dash.cloudflare.com) → **Create** → **Pages** (or **Workers** depending on UI) → **Connect to Git** → select the same GitHub repo you use for Vercel/Tina.
2. **Build settings:**
   - **Framework preset:** None (or Next.js if available; override the commands below).
   - **Build command:**  
     `npm run build:cms && npx opennextjs-cloudflare build`  
     (or `tinacms build && next build && npx opennextjs-cloudflare build` if your OpenNext version expects `next build` only and doesn’t run it itself).  
     Check [OpenNext Cloudflare CLI](https://opennext.js.org/cloudflare/cli): if the CLI runs `npm run build`, then set **Build command** to `tinacms build && npx opennextjs-cloudflare build` and keep **build** in package.json as `next build`.
   - **Build output directory:** leave as default (OpenNext outputs to `.open-next`; the Cloudflare Git integration may expect a specific output—see Cloudflare’s “Build configuration” for Workers/Pages).
3. **Root directory:** project root.
4. **Environment variables:** Add `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` (and any others) in the dashboard.

After you save, each push to the connected branch (including commits from Tina Cloud) will trigger a new build and deploy. Customer edits in Tina → Tina pushes to GitHub → Cloudflare runs the build and deploys → site updates.

---

## 7. Tina Cloud with Cloudflare

Use the **same** Tina Cloud project and repo as for Vercel. No change to Tina. When the customer saves in the admin, Tina pushes to GitHub; if Cloudflare is connected to that repo, it will redeploy. You can run the site on both Vercel and Cloudflare from the same repo if you want.

---

## References

- [OpenNext for Cloudflare – Get started](https://opennext.js.org/cloudflare/get-started)
- [OpenNext for Cloudflare – CLI](https://opennext.js.org/cloudflare/cli)
- [Cloudflare Workers – Deploy from Git](https://developers.cloudflare.com/workers/ci-cd/)
