# Scroll-to-Chennai portfolio

Scroll from orbit down to Chennai over real satellite imagery. Plan: `ROADMAP.md`, `DESIGN.md`, `METHOD.md`.
Status: phase 4 (descent, explore hub and Lab).

## Run

```
npm install
cp .env.example .env   # then paste your Cesium ion token (below)
npm run dev
```

Other scripts: `npm run build`, `npm test`, `npm run lint`, `npm run format`.

## Cesium ion token

1. Create a free account at https://ion.cesium.com, then **Access Tokens** > create a token (default scopes are enough).
2. Put it in `.env` as `VITE_CESIUM_ION_TOKEN=...` (`.env` is git-ignored).
3. It is visible in the browser by design; restrict it to your site URLs in the ion dashboard.

Without a token the site still runs on bundled low-resolution Natural Earth imagery (blurry below ~500 km), so you can test scrolling and the camera path. A console warning says so.

## Tuning the descent

- `src/config.ts`: `STRAIGHT_ZOOM` (true = no Malaysia/Odisha glides), `SMOOTHING`.
- `src/globe/cameraPath.ts`: waypoints (chapter `i` is centred on screen at progress `i/10`).
- `src/content/story.ts`: chapter captions (placeholders until phase 2).

`predev`/`prebuild` copy Cesium's workers and textures from `node_modules` into `public/cesium` (git-ignored).

## Editing content

All copy lives in `src/content/`: `story.ts` (descent captions), `timeline.ts`, `projects.ts`, `skills.ts` (skills and awards), `profile.ts` (bio, contact, resume link). Search for `CONFIRM` and `FACT-CHECK` to find claims to verify.

## Routes

The hub uses hash links: `#/timeline`, `#/projects`, `#/lab`, `#/about`, `#/skills`, `#/contact`. Finishing (or skipping) the descent opens `#/timeline`. "Intro seen" is kept in `sessionStorage`, so a refresh stays in the hub; "Replay the descent" clears it.
