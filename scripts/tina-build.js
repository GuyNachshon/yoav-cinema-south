#!/usr/bin/env node
/**
 * Load .env.local and .env (Tina CLI only loads .env), then run tinacms build.
 * On Vercel/CI, env vars are already set, so no file is required.
 */
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const dotenv = require("dotenv");

// Load .env.local first, then .env (later overrides)
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, ".env") });

const result = spawnSync(
  "npx",
  ["tinacms", "build", "--skip-cloud-checks"],
  { stdio: "inherit", env: process.env, cwd: root }
);
if (result.status !== 0) process.exit(result.status ?? 1);
