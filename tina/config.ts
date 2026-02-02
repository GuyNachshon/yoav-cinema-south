import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "content/assets",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "about",
        label: "About (text columns)",
        path: "content",
        format: "json",
        match: { include: "about" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "column1", label: "Column 1", ui: { component: "textarea" } },
          { type: "string", name: "column2", label: "Column 2", ui: { component: "textarea" } },
        ],
      },
      {
        name: "about_leaders",
        label: "About (leaders)",
        path: "content",
        format: "json",
        match: { include: "about-leaders" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "leaders",
            label: "Leaders",
            list: true,
            fields: [
              { type: "string", name: "filename", label: "Image filename (in content/assets/about/)" },
              { type: "string", name: "name", label: "Name & email" },
              { type: "string", name: "description", label: "Role / description" },
            ],
          },
        ],
      },
      {
        name: "panorama",
        label: "Panorama (strip images)",
        path: "content",
        format: "json",
        match: { include: "panorama" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "panoramaImages",
            label: "Panorama images",
            list: true,
            fields: [
              { type: "string", name: "slug", label: "Slug (URL, e.g. nili-battles)" },
              { type: "string", name: "filename", label: "Image filename (in content/assets/panorama/)" },
            ],
          },
        ],
      },
      {
        name: "movies",
        label: "Movies",
        path: "content",
        format: "json",
        match: { include: "movies" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "movies",
            label: "Movies",
            list: true,
            fields: [
              { type: "string", name: "slug", label: "Slug (URL)", required: true },
              { type: "string", name: "categorySlugs", label: "Category slugs", list: true, description: "Add slugs like documentary, panorama" },
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "directors", label: "Directors" },
              { type: "number", name: "year", label: "Year" },
              { type: "number", name: "duration", label: "Duration (minutes)" },
              { type: "string", name: "languages", label: "Languages" },
              { type: "string", name: "genre", label: "Genre" },
              { type: "string", name: "synopsis", label: "Synopsis", ui: { component: "textarea" } },
              {
                type: "object",
                name: "credits",
                label: "Credits",
                list: true,
                fields: [
                  { type: "string", name: "role", label: "Role" },
                  { type: "string", name: "name", label: "Name" },
                ],
              },
              { type: "string", name: "stillImage", label: "Still image URL" },
              {
                type: "object",
                name: "screenings",
                label: "Screenings",
                list: true,
                fields: [
                  { type: "string", name: "date", label: "Date (e.g. 6.11)" },
                  { type: "string", name: "time", label: "Time (e.g. 14:00)" },
                  { type: "string", name: "venue", label: "Venue" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "schedule",
        label: "Events schedule",
        path: "content",
        format: "json",
        match: { include: "schedule" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "schedule",
            label: "Schedule entries",
            list: true,
            fields: [
              { type: "string", name: "date", label: "Date (e.g. 6.11)", required: true },
              { type: "string", name: "dayName", label: "Day name (e.g. חמישי)", required: true },
              { type: "string", name: "time", label: "Time (e.g. 09:30)", required: true },
              { type: "string", name: "title", label: "Event title", required: true },
              { type: "string", name: "location", label: "Location", required: true },
              { type: "number", name: "column", label: "Column (0, 1, or 2)", description: "Which schedule column. 0 = first, 1 = second, 2 = third." },
              { type: "string", name: "subtitle", label: "Subtitle (optional)" },
              { type: "string", name: "venue", label: "Venue (optional)" },
            ],
          },
        ],
      },
      {
        name: "categories",
        label: "Categories",
        path: "content",
        format: "json",
        match: { include: "categories" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "categories",
            label: "Categories",
            list: true,
            fields: [
              { type: "string", name: "slug", label: "Slug", required: true },
              { type: "string", name: "nameHe", label: "Name (Hebrew)" },
              { type: "string", name: "patternKey", label: "Pattern key" },
              { type: "number", name: "order", label: "Order" },
            ],
          },
        ],
      },
      {
        name: "competitions",
        label: "Competitions (ticker strip)",
        path: "content",
        format: "json",
        match: { include: "competitions" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "competitions",
            label: "Competitions",
            list: true,
            fields: [
              { type: "string", name: "slug", label: "Slug", required: true },
              { type: "string", name: "title", label: "Title" },
              { type: "number", name: "order", label: "Order" },
              { type: "number", name: "speed", label: "Speed" },
              { type: "number", name: "acceleration", label: "Acceleration" },
              { type: "string", name: "direction", label: "Direction", options: ["left", "right"] },
              { type: "number", name: "itemGap", label: "Item gap (px)" },
              { type: "number", name: "repeat", label: "Repeat count" },
            ],
          },
        ],
      },
      {
        name: "events_ticker",
        label: "Events (ticker strip)",
        path: "content",
        format: "json",
        match: { include: "events" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "events",
            label: "Events",
            list: true,
            fields: [
              { type: "string", name: "slug", label: "Slug", required: true },
              { type: "string", name: "title", label: "Title" },
              { type: "number", name: "order", label: "Order" },
            ],
          },
        ],
      },
    ],
  },
});
