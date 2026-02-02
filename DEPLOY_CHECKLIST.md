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

## If something fails

- **Build fails on Vercel:** Check the build log. If you see “Cannot find module 'tinacms'”, ensure `tinacms` and `@tinacms/cli` are in `package.json` and run `npm install` locally, then commit and push.
- **Admin page 404:** Build command must be `npm run build:cms` and you must redeploy after changing it.
- **Save in admin doesn’t create a commit:** Check that `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` are set in Vercel and that the Tina Cloud project is connected to the correct repo and branch.
- **More detail:** See **INTEGRATE_TINA.md** and **CONTENT.md**.
