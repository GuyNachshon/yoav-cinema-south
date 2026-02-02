# Yoav South Festival — Site Plan (No Code Yet)

Planning doc based on Figma designs. Implementation must follow designs exactly.

---

## 1. Design concept: moving patterns

- **Visual language:** Repeating horizontal bands of patterns that read as continuous / infinite. Intended to feel animated or in motion (implementation will need motion).
- **Palette:** Black, white, light grey. Monochrome, high contrast.
- **Background texture:** Light grey hexagonal/honeycomb grid used on headers and some areas.
- **Pattern types in designs:**
  - Repeating Hebrew text (e.g. "פנורמה", "תחרויות", "אירועים", "אודות")
  - Geometric: diamonds, X’s, chevrons (single/double, right/down), zigzags, diagonal stripes
  - Silhouettes: camels, film projectors/cameras, digging figures
  - Striped “caution tape” / film-strip bands
- **RTL:** Hebrew primary; layout and text direction must support RTL (and EN toggle where shown).

---

## 2. Site map & routes

| Route | Page | Figma node | Nested in |
|-------|------|------------|-----------|
| `/` | Landing | 1:16, 0:318 | — |
| `/events` | Events (schedule) | 0:494 | — |
| `/about` | About | 0:257 | — |
| `/competition` or `/movies` | Competition / categories list | 0:267 | — |
| `/competition/[slug]` or `/movies/[slug]` | Single movie | 0:3 | Competition |

**Navbar:** Global, always on top (fixed/sticky). Same on every page.

**Nesting:** Movie page is the detail view for an item from the competition/category list. URL structure should reflect that (e.g. `/competition/new-south-cinema` for category, `/competition/new-south-cinema/[movie-slug]` for movie, or flat `/movies/[slug]` — to be aligned with content/cms).

---

## 3. Global: navbar

- **Top strip (utility):**
  - Left: language "EN" (toggle), plus placeholder-style items in design: "Estimated arrival time", "Distance" — confirm with designer if these are real features or to remove.
  - Right: main nav links (Hebrew): הסרטים (Movies), לוח אירועים (Events), אודות (About).
- **Background:** Black, with light grey hexagonal grid texture.
- **Typography:** White text, vertical dividers between items.
- **Below (on landing):** Large repeating title band (e.g. "פנורמה") + diagonal stripe band. On other pages the pattern band may differ (e.g. date/time on movie page). So: navbar = top strip + optional page-specific pattern band directly under it.

---

## 4. Page-by-page breakdown

### 4.1 Landing (`/`)

- **Above the fold:** Navbar (strip + repeating “פנורמה” title + diagonal stripe band).
- **Hero:** Full-width content area on black. Two overlapping images: (1) main — dramatic portrait/cinematic still; (2) secondary — e.g. guitar headstock on fabric, overlapping from the left. Collage / layered look.
- **No long scroll of patterns on landing in the frames reviewed;** the “moving patterns” are in the header band and in the striped divider. Rest is hero imagery.

### 4.2 Events (`/events`)

- **Title:** "לוח אירועים" (Events schedule), then subtitle with locations: Rahat, Ofakim, Kibbutz Dorot, Sderot (Hebrew + Arabic/English as in design).
- **Layout:** Two main columns:
  - **Left:** Dates as anchors — day name (e.g. חמישי) + large date (e.g. 6.11). Multiple days 6.11–13.11.
  - **Right:** Events per day in a multi-column grid (e.g. 3–4 columns). Each event: time (HH:MM), title, optional subtitle/category, location (place + venue).
- **Background:** Dark, with subtle hexagonal grid.
- **Data needed:** Day, date, time, title, subtitle, location (place + venue). i18n for Hebrew/Arabic/English names.

### 4.3 About (`/about`)

- **Header band:** Repeating "אודות" on light grey hexagonal grid, black text; can be implemented as infinite scroll or tiling.
- **Body:** Solid black background. Two columns of white body copy (Hebrew). Content: festival intro (Sapir College, South International Film Festival, summer, first time in large format…) and artistic program (independent cinema, margins, critical dialogue, journey).
- **Exact copy and line breaks** to be taken from Figma/designer.

### 4.4 Competition / categories (`/competition` or `/movies`)

- **Header band:** Repeating "תחרויות" (Competitions).
- **Main content:** Vertical stack of horizontal bands. Each band = one category, with:
  - **Left/content:** Repeating pattern (different per category): diamonds, camels, waves/N-shape, double chevrons, diagonal stripes, single chevrons, up/down arrows, cameras, thin line, curved arrows, walking figure, X’s.
  - **Right:** Fixed black vertical bar with white Hebrew labels listing the same categories in order (sticky or scroll-synced).
- **Categories (order matters):** קולנוע דרום חדש, חיפה לדרום, תחרות ביכורים, תחרות נגב לסטודנטים, סרטים/פיצ'רים, סרך רחב, סרטי סלולר ותנועה, תיעודי, אירועים (separator?), פרימיירות, נוער לסטודנטים דרום, אנימציה, מוזיקה.
- **Interaction:** Each band is a link (or contains a link) to the category view or to a list of movies in that category. Exact URL and “category vs competition” naming to be aligned with content.

### 4.5 Movie (`/competition/[slug]` or `/movies/[slug]`)

- **Pattern header:** Repeating "00 6.11 14:00" (or screening-specific date/time) on grey hexagonal background; then diagonal white stripes on black.
- **Layout:**
  - **Left (narrow column):** Credits — labels (בימוי, הפקה, צילום, עריכה, סאונד, מוזיקה מקורית, משתתפים, תומכים…) + names. White, bold labels + regular names.
  - **Left (wider column):** Title (e.g. "הקרבות של נילי | יניב בן אהרון, טל קושנר"), then metadata line (year | duration | languages | genre), then long synopsis (Hebrew).
  - **Right:** Large still (portrait aspect) with optional small "פנורמה" label.
- **Background:** Black; text white.
- **Data needed:** Title, directors, year, duration, languages, genre, synopsis, credits (role + name), still image, screening(s) — date/time for pattern header.

---

## 5. Design system (to extract from Figma)

- **Colors:** Black, white, light grey (hex values from Figma variables/local styles).
- **Typography:** Sans-serif; weights: regular, bold, extra-bold for titles. Project already has **Next Exit** (NextExitRegular, Light, Bold, ExtraBold) in `fonts/next-exit/` — confirm with design if this is the festival typeface.
- **Patterns:** Each band is a repeatable unit (SVG or CSS/SVG pattern). List: text bands, diamonds, X, camels, zigzag, double chevron, diagonal stripes, single chevron, up/down arrows, camera, curved arrow, figure, thin line. Animation: horizontal (or diagonal) motion to support “moving patterns.”
- **Spacing:** Document from Figma (margins, padding, gap between bands, between nav items).
- **RTL:** All layouts and components must work in RTL; mirror where needed, keep logical order.

---

## 6. Content & data

- **Events:** Structured by date → list of events (time, title, subtitle, location). Source: CMS or static JSON.
- **Competition:** List of categories with slug, Hebrew name, pattern key (for choosing band pattern).
- **Movies:** Per movie: slug, category slug(s), title, directors, year, duration, languages, genre, synopsis, credits array, still image, screenings (date, time, venue). Link from competition band → category → movie list → movie page.
- **About:** Two blocks of Hebrew copy (and any future EN/AR versions).
- **Landing:** Hero images (2), any tagline/copy if added later.

---

## 7. Technical notes (for later)

- **Stack:** Not decided in this doc; common choice would be Next.js (App Router) + RTL + i18n (EN/HE, maybe AR).
- **Patterns:** Implement as reusable components; each pattern type = one component driven by props (e.g. scale, speed). Prefer SVG for sharpness.
- **Motion:** “Moving patterns” = horizontal (or diagonal) animation on pattern bands (CSS animation or GSAP). Performance: prefer `transform` and `will-change` where needed.
- **Figma fidelity:** Use Figma dev mode / design context per node (1:16, 0:318, 0:494, 0:257, 0:267, 0:3) when implementing to match spacing, type sizes, and colors exactly.
- **Placeholders in design:** "Estimated arrival time", "Distance" — clarify with designer; remove or replace with real features.

---

## 8. Figma reference

- File: `URUC2Fvdwo59j8JucK4jzX` (Untitled).
- Nodes:
  - Landing: `1:16`, `0:318`
  - Events: `0:494`
  - About: `0:257`
  - Competition: `0:267`
  - Movie: `0:3`

---

## 9. Open decisions

1. **URL scheme:** `/competition` vs `/movies`; nested `/competition/[category]/[movie]` vs flat `/movies/[slug]`.
2. **Navbar utility strip:** Keep "Estimated arrival time" and "Distance" or drop?
3. **Font:** Confirm Next Exit = design font; if not, get correct family and weights from Figma.
4. **i18n:** Full EN (and AR?) or only EN toggle with HE primary.
5. **Data source:** CMS (Strapi, Contentful, etc.) vs JSON/MD for events and films.

Once these are decided, implementation can follow this plan and the Figma frames exactly.
