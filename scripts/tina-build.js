#!/usr/bin/env node
/**
 * Load .env.local and .env (Tina CLI only loads .env), then run tinacms build.
 * tinacms build does not write tina-lock.json (only dev does), so we write it from __generated__ after build.
 * On Vercel/CI, env vars are already set, so no file is required.
 */
const path = require("path");
const fs = require("fs");
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

// tinacms build does not write tina-lock.json; create it from __generated__ so Tina Cloud can index
const tinaDir = path.join(root, "tina");
const genDir = path.join(tinaDir, "__generated__");
const schemaPath = path.join(genDir, "_schema.json");
const lookupPath = path.join(genDir, "_lookup.json");
const graphqlPath = path.join(genDir, "_graphql.json");
if (
  fs.existsSync(schemaPath) &&
  fs.existsSync(lookupPath) &&
  fs.existsSync(graphqlPath)
) {
  const lock = {
    schema: JSON.parse(fs.readFileSync(schemaPath, "utf8")),
    lookup: JSON.parse(fs.readFileSync(lookupPath, "utf8")),
    graphql: JSON.parse(fs.readFileSync(graphqlPath, "utf8")),
  };
  fs.writeFileSync(
    path.join(tinaDir, "tina-lock.json"),
    JSON.stringify(lock, null, 2)
  );
}
