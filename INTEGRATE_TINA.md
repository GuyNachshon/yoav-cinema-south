# Integrate Tina Cloud (step-by-step)

Do this once so your customer can edit content at **yoursite.com/admin** and see updates on the live site.

---

## 1. Install dependencies

```bash
npm install
```

This installs `tinacms` and `@tinacms/cli` so the admin and Tina Cloud can run.

---

## 2. Create a Tina Cloud project and connect GitHub

1. Go to **[app.tina.io](https://app.tina.io)** and sign up / log in.
2. **Create a new project** (e.g. “Yoav South Festival”).
3. **Connect your GitHub account** if prompted.
4. **Connect the repo** that Vercel deploys from (the same one). Tina will ask for repo access; approve.
5. Choose the **branch** (e.g. `main`) that Vercel builds from.

---

## 3. Get your Tina Cloud tokens

1. In Tina Cloud, open your project.
2. Go to **Tokens** (or **Project settings** → **Tokens**).
3. Create a token (or use the default).
4. Copy:
   - **Client ID** (starts with something like `a1b2c3d4-...`)
   - **Token** (long string)

---

## 4. Add env vars locally (optional, for testing the admin)

Create a file **`.env.local`** in the project root (same folder as `package.json`):

```
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id-here
TINA_TOKEN=your-token-here
```

Replace with the values from step 3.  
Do **not** commit `.env.local` (it should be in `.gitignore`). This lets you run the admin locally and have saves go to Tina Cloud → GitHub.

---

## 5. Add env vars on Vercel

1. Open your project on **[vercel.com](https://vercel.com)**.
2. **Settings** → **Environment Variables**.
3. Add:
   - **Name:** `NEXT_PUBLIC_TINA_CLIENT_ID`  
     **Value:** (paste Client ID from step 3)  
     **Environments:** Production, Preview
   - **Name:** `TINA_TOKEN`  
     **Value:** (paste Token from step 3)  
     **Environments:** Production, Preview
4. Save. Then trigger a **Redeploy** (Deployments → … → Redeploy) so the new build uses these vars.

---

## 6. Use the admin on Vercel (build the admin in production)

1. In Vercel: **Settings** → **General**.
2. Find **Build Command**. Change it from `next build` to:
   ```bash
   npm run build:cms
   ```
   This runs `tinacms build && next build` so the admin is generated and deployed.
3. Save. Redeploy the project.

After the deploy, the admin is at:

**https://your-vercel-domain.vercel.app/admin**

(or `/admin/index.html` if the above doesn’t load).

---

## 7. Test the flow

1. **Local:** Run `npm run dev:cms`, open **http://localhost:3000/admin**. Log in with Tina Cloud (or GitHub via Tina). Edit something (e.g. About) and **Save**. Check GitHub: there should be a new commit. Then check Vercel: a new deployment should start.
2. **Production:** Open **https://your-domain.com/admin**. Log in, edit, save. In 1–3 minutes the main site should show the change.

---

## 8. Give the customer access

- **URL:** `https://your-domain.com/admin` (or `/admin/index.html`).
- They open it, log in with Tina Cloud (or GitHub if you connected it). Free tier = 2 users.
- They pick a collection (Movies, Schedule, About, etc.), edit, Save. No code or Git.

---

## Troubleshooting

- **“Cannot find module 'tinacms'”**  
  Run `npm install`. If you only use `next build` (no CMS build), the app still builds; the `tina` folder is excluded from TypeScript. Use `npm run build:cms` on Vercel to deploy the admin.

- **Admin loads but Save doesn’t create a commit**  
  Check that `TINA_TOKEN` and `NEXT_PUBLIC_TINA_CLIENT_ID` are set on Vercel and in `.env.local` for local. Token must be from the same Tina Cloud project that has the repo connected.

- **Admin 404 on Vercel**  
  Build command must be `npm run build:cms` so that `tinacms build` runs and generates the `admin` output.

- **Branch / content mismatch**  
  In Tina Cloud, the project must be connected to the same repo **and** branch that Vercel builds (e.g. `main`).

- **Main branch not indexing in Tina**  
  If Tina Cloud shows that `main` (or your production branch) is not indexed:
  1. **Pull down the branch in Tina Cloud:** Go to [app.tina.io](https://app.tina.io) → your project → **Configuration** (or **Repo** / **Branches**). Find the option to **pull**, **index**, or **add** a branch. Add **main** (or your default branch name). Wait a few minutes for indexing to finish.
  2. **Check indexed branches:** In the same project, open **Configuration** and look for “Indexed branches” or similar. Confirm **main** appears. If it doesn’t, use step 1 again or try step 3.
  3. **Force reindex with `tina-lock.json`:** Tina can reindex when it sees a change on the branch. Generate the lock file locally: put your Tina **Client ID** and **Token** in `.env.local`, then run `npm run build:cms` once. Commit the new or updated **`tina/tina-lock.json`** (and any other new files under `tina/` except `tina/__generated__/`), push to **main**. That push can trigger Tina to index.  
  Ensure **`tina/config.ts`** and the rest of **`tina/`** (except **`tina/__generated__/`**) are committed and on **main**; Tina needs them to index.
  4. **Vercel env (optional):** In Vercel → Project → Environment Variables, add **`GITHUB_BRANCH`** = **`main`** so the built admin always asks for the **main** branch.
