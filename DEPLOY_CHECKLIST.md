# Deployment checklist (Vercel + Tina Cloud)

Your repo: **github.com/GuyNachshon/yoav-cinema-south** (branch: `main`).  
Do these in order. Each step is something you do in the browser or terminal.

---

## Step 1: Commit and push

Make sure everything is pushed so Vercel and Tina see the latest code.

```bash
git add .
git status
git commit -m "Ready for deployment"
git push origin main
```

---

## Step 2: Deploy to Vercel

1. Open **[vercel.com/new](https://vercel.com/new)** (or **Add New** → **Project**).
2. **Import** your GitHub repo: `GuyNachshon/yoav-cinema-south`.
3. **Configure:**
   - **Framework Preset:** Next.js (should be auto-detected).
   - **Root Directory:** leave empty (project root).
   - **Build Command:** leave default `next build` for now (we’ll change it in Step 5).
   - **Output Directory:** leave default.
   - **Install Command:** leave default `npm install`.
4. Click **Deploy**. Wait for the first deployment to finish.
5. Open the **Visit** URL (e.g. `https://yoav-cinema-south-xxx.vercel.app`). The site should load.

---

## Step 3: Create Tina Cloud project and connect GitHub

1. Open **[app.tina.io](https://app.tina.io)** and sign up or log in.
2. **Create a new project** (e.g. “Yoav South Festival”).
3. When asked to **connect a repository**, choose **GitHub** and authorize Tina.
4. Select the repo **GuyNachshon/yoav-cinema-south**.
5. Choose branch **main**.
6. Finish the project setup.

---

## Step 4: Get Tina tokens and add them to Vercel

1. In Tina Cloud, open your project.
2. Go to **Tokens** (or **Project** → **Tokens** / **Settings**).
3. **Create a token** (or use the default). Copy:
   - **Client ID** (looks like `a1b2c3d4-...`)
   - **Token** (long string)
4. In **Vercel:** open your project → **Settings** → **Environment Variables**.
5. Add two variables (for **Production** and **Preview**):
   - **Name:** `NEXT_PUBLIC_TINA_CLIENT_ID`  
     **Value:** (paste Client ID)
   - **Name:** `TINA_TOKEN`  
     **Value:** (paste Token)
6. Save. Do **not** trigger a redeploy yet (we’ll do that after changing the build command).

---

## Step 4b: Generate `tina/tina-lock.json` (recommended)

Tina Cloud uses **`tina/tina-lock.json`** to index your branch. The file is created only when the Tina CLI runs with valid credentials.

**Important:** The Tina CLI only loads **`.env`** (not `.env.local`). So for this step use **`.env`** in the project root. Keep `.env` in `.gitignore` and do not commit it.

1. In the project root, create **`.env`** with:
   ```bash
   NEXT_PUBLIC_TINA_CLIENT_ID=<paste Client ID from Step 4>
   TINA_TOKEN=<paste Token from Step 4>
   ```
2. Run once:
   ```bash
   npm run build:cms
   ```
   (You can cancel after the Tina build step if you don't need the full Next build.)
3. Confirm **`tina/tina-lock.json`** exists. Commit and push:
   ```bash
   git add tina/tina-lock.json
   git commit -m "Add tina-lock.json for Tina Cloud indexing"
   git push origin main
   ```
4. Keep **`tina/tina-lock.json`** in the repo; do **not** add it to `.gitignore`.

---

## Step 5: Enable the Tina admin on the live site

1. In **Vercel** → your project → **Settings** → **General**.
2. Find **Build & Development Settings** → **Build Command**.
3. Change it from `next build` to:
   ```bash
   npm run build:cms
   ```
4. Save.
5. Go to **Deployments**, open the **⋯** on the latest deployment, click **Redeploy** (use existing build cache or not, your choice). Wait for the new deployment to finish.

---

## Step 6: Open the admin and test

1. Open **https://your-vercel-url.vercel.app/admin** (replace with your real Vercel URL, e.g. `https://yoav-cinema-south-xxx.vercel.app/admin`).
2. You should see the Tina login screen. Log in with the same account you used for Tina Cloud (or GitHub).
3. In the sidebar, open a collection (e.g. **About** or **Panorama**).
4. Make a small edit and click **Save**.
5. In GitHub, check the repo: there should be a new commit from Tina.
6. In Vercel, a new deployment should start automatically. When it finishes (1–3 min), reload the main site and confirm the change is visible.

---

## Step 7: Share with the customer

- **Admin URL:** `https://your-vercel-domain.com/admin`  
  (Use your real Vercel domain, e.g. from the **Domains** tab or the deployment URL.)
- They open it, log in with Tina Cloud (or GitHub), and edit. After they save, the site updates after the next Vercel deploy.

---

## Optional: Custom domain

In **Vercel** → your project → **Settings** → **Domains**, add your domain and follow the DNS instructions. The admin will then be at **https://yourdomain.com/admin**.

---

## If main branch is not indexing in Tina

1. In **[app.tina.io](https://app.tina.io)** → your project → **Configuration** (or **Repo** / **Branches**), find where to **pull**, **index**, or **add** a branch. Add **main** and wait a few minutes.
2. Ensure **`tina/config.ts`** (and any **`tina/tina-lock.json`** if present) is committed on **main** and not ignored.
3. To force reindex: add `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` to **`.env.local`**, run **`npm run build:cms`** once, then commit **`tina/tina-lock.json`** (if created) and push to **main**.
4. Optionally in **Vercel** → Environment Variables, add **`GITHUB_BRANCH`** = **`main`**.

More detail: **INTEGRATE_TINA.md** → “Main branch not indexing”.

---

## If something fails

- **Build fails on Vercel:** Check the build log. If you see “Cannot find module 'tinacms'”, ensure `tinacms` and `@tinacms/cli` are in `package.json` and run `npm install` locally, then commit and push.
- **Admin page 404:** Build command must be `npm run build:cms` and you must redeploy after changing it.
- **Save in admin doesn’t create a commit:** Check that `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` are set in Vercel and that the Tina Cloud project is connected to the correct repo and branch.
- **More detail:** See **INTEGRATE_TINA.md** and **CONTENT.md**.
