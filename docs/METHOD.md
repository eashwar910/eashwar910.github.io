# METHOD: How to Build Each Phase

This file maps to the phases in `ROADMAP.md` and gives suggested frameworks, packages and techniques for each. Everything here is a recommended default, not a requirement. If a better tool or approach exists, use it and record the reason in `docs/DECISIONS.md`. Always check current docs and use current stable versions; do not trust version numbers from memory.

Experience and content details are in `DESIGN.md`.

## Global defaults

| Concern | Suggested choice | Notes |
|---|---|---|
| Build tool | Vite | Fast dev server, simple config |
| UI | React + TypeScript (strict) | Matches my skill set |
| Styling | Tailwind CSS | Define design tokens (colours, radii, spacing) as CSS variables so the altitude theme shift is easy |
| Globe and imagery | CesiumJS (`cesium` package) with a free Cesium ion token | Real globe, atmosphere, imagery down to city level |
| Globe fallback | `mapbox-gl` globe projection with satellite style, behind the same interface | Needs its own free token; only build it if Cesium proves a poor fit |
| Scroll | GSAP + ScrollTrigger (`gsap`) | Scrub progress drives the camera |
| Smooth scroll | `lenis` | Check it plays well with touch and ScrollTrigger |
| Hub motion | `motion` (Framer Motion) | Panel and dock transitions |
| Routing | Hash routing (`react-router` with `createHashRouter`, or a tiny custom hook) | Works on static hosting with no rewrites |
| Light state | `zustand` | Only if shared state grows (current section, reduced-motion, intro seen) |
| Fonts | `@fontsource/*` packages | Self-hosted, no layout shift |
| Lint and format | ESLint, Prettier, `typescript-eslint` | Strict TS |
| Tests | Vitest for logic; Playwright for smoke and mobile screenshots | Keep tests few and meaningful |
| Bundle insight | `rollup-plugin-visualizer` | Report sizes in the README |
| Hosting | Vercel | Env vars set in the Vercel dashboard |

Secrets: tokens in `.env` (git-ignored), with `.env.example` listing `VITE_CESIUM_ION_TOKEN` (and `VITE_MAPBOX_TOKEN` if the fallback is built). Note that anything with a `VITE_` prefix is visible in the browser, which is normal for these map tokens; restrict them by allowed URL in the provider dashboard.

Suggested folders (change if you have a better layout):
```
src/
  content/   story, timeline, projects, skills, profile (typed data)
  globe/     GlobeEngine interface, Cesium implementation, cameraPath
  scroll/    scroll driver, chapter overlay, progress UI
  hub/       sections, dock, routes
  lab/       minigames
  components/ ui/
public/      og-image, resume.pdf, photos
docs/        DECISIONS.md, IDEAS.md, LOG.md
```

---

## Phase 1: Descent skeleton

**Set up**
- Scaffold with Vite's React + TypeScript template. Add Tailwind, ESLint, Prettier.
- Install `cesium`. Cesium needs its static assets (workers, widgets) served; either use `vite-plugin-cesium` or copy the assets in a build step. Pick whichever works cleanly with the current Vite and Cesium versions, and keep the Cesium bundle in its own lazily loaded chunk.
- Create a free Cesium ion account for a token and put it in `.env`.

**Globe**
- Define a small `GlobeEngine` interface (`init`, `setCamera`, `destroy`, optional `addPins`) so the Cesium code is isolated.
- Create the Cesium `Viewer` with most widgets turned off (no timeline, animation, base layer picker, geocoder, home button, fullscreen), world imagery as the base layer, sky atmosphere and ground atmosphere on, and star background enabled.
- Disable the user's direct camera inputs so scroll is the only driver.
- Consider request-render mode to save battery when nothing is moving, but make sure it wakes on every scroll frame.
- Use Cesium's `Camera.setView` with `Cartesian3.fromDegrees` plus heading, pitch and roll.

**Camera path**
- Write `cameraAt(progress)` as a pure, tested function over a typed waypoint list in a config file (lon, lat, height, heading, pitch, and the progress each applies at).
- Interpolate height in log space so the descent feels even; interpolate longitude along the shortest arc; ease between waypoints (smoothstep, or a Catmull-Rom style spline if it looks better).
- Provide `STRAIGHT_ZOOM` by generating a second waypoint list that removes the Malaysia and Odisha glides.

**Scroll driver**
- A tall scroll container with the globe canvas `position: fixed` behind it.
- ScrollTrigger gives raw progress; smooth it with a requestAnimationFrame lerp so the camera eases. Do not update React state per frame; hold progress in a ref and push to the engine directly.
- Add the altitude readout and chapter dots as lightweight DOM that reads from the same progress value (throttle updates).
- Test on a real phone-width viewport and with touch inertia.

**Verify:** unit tests for `cameraAt` (endpoints, monotonic altitude, no longitude jumps, `STRAIGHT_ZOOM`); manual scroll test on desktop and mobile width.

---

## Phase 2: Story and polish

**Copy**
- Implement `story.ts` as typed chapter data (id, progress range, lines, optional flags). Component code only renders it.
- Chapter overlay: fade or slide lines in and out with GSAP timelines tied to scroll ranges, or with `motion` and `useScroll`; choose what stays smoothest.
- Add a soft scrim behind captions so text stays readable over bright imagery.

**Theme shift**
- Drive CSS variables (background tint, text colour, accent) from altitude, interpolating between a space palette and a daylight palette.

**Odisha chapter**
- Draw a stylised radar-style overlay: either Cesium entities (semi-transparent polygons and pulsing pins at Bolangir and Baleswar) or an SVG/canvas layer projected from screen positions. Pure decoration; do not imply it is real satellite data.

**Resilience**
- Loading screen that waits for the engine and first imagery tiles, with a timeout.
- `prefers-reduced-motion`: skip the animated descent and show a short static chapter-by-chapter story ending at the hub.
- Feature-detect WebGL; if it fails, show a static background image with the same captions.
- Imagery attribution visible and unobtrusive.

**Verify:** reduced-motion and no-WebGL paths tested (Playwright can emulate reduced motion); caption contrast checked; copy flags (`FACT-CHECK`, `CONFIRM`) present.

---

## Phase 3: Explore hub

**Structure**
- A hub shell with a dock and animated section transitions (`motion`'s `AnimatePresence`).
- Routes: `#/timeline`, `#/projects`, `#/lab`, `#/about`, `#/skills`, `#/contact`. Store "intro seen" in `sessionStorage` inside try/catch; offer "Replay the descent".
- Keep the Chennai globe running in the background in a low-power state (slow drift, reduced render rate), so the hub is not heavy.

**Sections**
- Timeline: data from `timeline.ts`, vertical on mobile, optionally horizontal on desktop. Cards expand in place. Optional fly-to for items with coordinates, using the globe engine's `setCamera` with a short tween.
- Projects: card grid with tag filters (simple state, no library needed). Featured projects get larger cards. Link out to the repo for Rice Fallow Radar.
- About, Skills and awards: grouped chips, no percentage bars.
- Contact: `mailto:`; add a form only if there is a simple option (for example a form service) and say what you chose. Resume PDF download from `public/`.

**Accessibility**
- Real headings and landmarks, focus management on route change, visible focus rings, keyboard-operable dock, adequate touch targets.

**Verify:** keyboard-only walkthrough; 375px layout screenshots via Playwright; deep links open the right section; refresh does not replay the intro.

---

## Phase 4: Lab (minigames)

**Approach**
- Plain React with SVG or `<canvas>`; avoid heavy game engines. Lazy-load the Lab route.
- Put scoring and round logic in pure functions with unit tests, separate from rendering.
- Support mouse, touch and keyboard. Use pointer events for the unified input.
- Save high scores to `localStorage` inside try/catch.
- Optional sound via `howler` only if audio assets exist; always muted by default.

**Per game**
- *Measure the Radicle:* generate seedlings procedurally in SVG (curved root path with a random length and curve). The player taps the root tip and the base; compute length from the points versus the true path length and score by the error. Five rounds, then a summary.
- *Ripe or Rotten?:* illustrated fruit cards drawn in SVG with variation (colour, spots, bruise). Swipe via pointer events or left and right arrows. A simulated bot with a fixed, clearly labelled accuracy plays on a timer. Show both scores with a "simulation" label.
- *Fallow Finder:* a grid of cells (about 6x6) with a radar-style texture. Each cell runs its own state cycle (too wet, workable, too dry) with randomised timing. Tapping a cell during `workable` scores; tapping otherwise costs time or points. Add a 45 to 60 second timer, combos, and a short result screen.

**Verify:** unit tests for scoring; playtest each on a phone-width viewport; confirm games pause when the tab is hidden.

---

## Phase 5: Ship

- **SEO and sharing:** title, description, Open Graph and Twitter tags, `og-image.jpg`, sitemap and `robots.txt`, favicon set, JSON-LD `Person` data. Make sure all story and portfolio text exists in the DOM (visually hidden semantic version of the story is fine for the scroll chapters).
- **Performance:** analyse with `rollup-plugin-visualizer`; lazy-load Cesium, the Lab and large assets; compress images; run Lighthouse on mobile settings and fix the worst issues. Report real numbers.
- **Accessibility pass:** axe-core (`@axe-core/playwright`) on the main routes plus a manual keyboard and screen reader sanity check.
- **Deploy:** connect the repo to Vercel, set the env vars, point `eashwarsiddha.dev` at it, and test the live site on a phone.
- **Docs:** README with prerequisites, token setup, scripts, build, deploy, content-editing guide, and known limitations; `docs/DECISIONS.md` summarising changes from these specs.
- **Final QA checklist:** run through every `// CONFIRM` and `// FACT-CHECK` flag, confirm no phone number appears, confirm imagery attribution, and confirm reduced-motion and no-WebGL paths still work.

## Room to improve

- If Cesium proves too heavy on mobile, say so with measurements and propose the fallback (or a hybrid: a lightweight globe in space, real tiles only near the end).
- If a different scroll or animation library gives smoother results, use it.
- If you can make the story better, write alternatives in `docs/IDEAS.md` for my review, but keep the facts in `DESIGN.md` unchanged without asking.
