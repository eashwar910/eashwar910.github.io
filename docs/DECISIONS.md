# Decisions (changes from METHOD.md)

## Phase 1
- **Kept Vite 5, React 18, Tailwind 3.** Vitest 5 needs Node 22 (machine has Node 20), so Vitest 3 is used. Upgrade Vite/Tailwind/React later if wanted.
- **No `vite-plugin-cesium`.** It injects a blocking `<script src=Cesium.js>`, so Cesium was not lazy. Instead `cesium` is bundled behind a dynamic `import()` (own 4.1 MB / 1.1 MB gzip chunk) and `scripts/copy-cesium.mjs` copies workers and textures to `public/cesium`.
- **No GSAP ScrollTrigger or Lenis yet.** Scroll progress is `scrollY / (scrollHeight - innerHeight)` with an rAF lerp; native scroll plus the lerp already gives the smoothing. Revisit in phase 2 if caption timelines need GSAP.
- **Old site removed.** The previous pages/components are replaced; they remain in git history on `main`.
- **Camera interpolation:** monotone cubic Hermite per channel (longitude unwrapped, height in log space). Smooth like Catmull-Rom but never overshoots, and holds stay flat.
- **Glide arcs rise.** Malaysia and Odisha glides climb mid-way (1,400-1,500 km) so the long sideways hops read as a flight, not a ground-skim. "Monotonic altitude" therefore applies to `STRAIGHT_ZOOM` and to the glide path outside the glides (tested).
- **Tilted views** step the camera back so the tilt stays centred on the waypoint's lon/lat.
- **No-token fallback imagery** (bundled Natural Earth) so the project runs before a token exists.
- **Skip to explore** jumps to the end of the descent (Chennai). The hub itself is phase 3.
- Orbit "slow rotation" skipped (conflicts with scroll-only driving); revisit in phase 2.

## Phase 2
- **Caption animation in CSS, not GSAP.** The active chapter (from scroll progress) flips `data-active`; CSS staggers the lines in. Captions stay real DOM text in normal scroll flow.
- **Chapter progress:** a thin accent line fills down the chapter dots with overall progress.
- **Theme shift:** `scroll/looks.ts` interpolates (in log altitude, 8,000 km to 300 km) between a navy space palette and a warm earthy daylight palette, written to `--scrim` and `--accent` on `:root` each frame. Text stays white on both scrims for contrast.
- **Odisha overlay is DOM, not Cesium entities.** Pins are projected from lon/lat to screen each frame (`GlobeEngine.project`); the pulsing rings and radar sweep are CSS, so nothing needs a continuous render loop. Labelled "illustrative overlay"; no data implied.
- **Loading screen** waits for the first camera pose and for the tile queue to drain, capped at 8 s (`READY_TIMEOUT_MS`).
- **Reduced motion and no WebGL share one `StaticStory`** (stacked chapters, original CSS grid-and-gradient backdrop, skip link to a placeholder "Explore" block until phase 3). WebGL is feature-detected up front, and a failed Cesium start (or chunk load) falls back to it too.
- **Fonts:** Fraunces (display, captions) and DM Sans (text), self-hosted via `@fontsource-variable`. Readout stays on the system mono font.
- **Pacing untouched:** every chapter is still 100vh (1100vh total). Chapter 9 is the densest; tune after you've felt it.
- Copy comes from `DESIGN.md`. FACT-CHECK / CONFIRM / ADD MEMORY tags are comments in `src/content/story.ts`. The lecturer in chapter 5 stays unnamed; chapter 1 shows no year, name or city.

## Phase 3
- **One globe, two modes.** `Descent` keeps the single Cesium engine alive and, when a hub section is in the URL, hides the chapters and shows `<Hub>` over it. No second engine, no tile reload, and the descent flows straight into the hub. The hub backdrop drifts +/-25 degrees around Chennai over 90 s and renders at ~10 fps.
- **Hand-off:** resting on the last chapter for 2 s opens `#/timeline` (scrolling back up cancels). "Skip to explore" just scrolls there, so it takes the same path.
- **Routing is a ~40-line hash hook (`hub/route.ts`)**, not react-router. Removed the unused `react-router-dom`, `framer-motion` and `lucide-react`; added `motion` for panel and card transitions.
- **Reduced-motion and no-WebGL visitors** get the static story, whose "Enter the hub" link opens the same hub over the static backdrop. `MotionConfig reducedMotion="user"` trims hub animation.
- **Focus management:** each panel moves focus to its `h1` when it opens.
- **Lab** is a placeholder panel so the route and dock entry exist; phase 4 fills it.
- **Contact is `mailto:` only** (no form). **Resume is not linked**: `public/static/resume.pdf` contains a phone number, which breaks ground rule 2. `profile.resumeUrl` is `null` and Contact shows "Resume PDF coming soon". Supply a phone-free PDF and set the URL. That file is still copied into every build, so remove or replace it before this ships.
- **Project cards** show only facts from `DESIGN.md`: "what I built" is the summary and bullet list, and a stack appears only where the source names one. Rice Fallow Radar carries "No results yet". PMY is shown unexpanded (CONFIRM).
- **Timeline fly-to** (optional in the brief) not built. **Agritix** shows the default "Summer 2026, 3 months".

## Phase 4
- **Logic is pure and tested (`src/lab/*.ts`), rendering is separate (`*Game.tsx`).** A seeded RNG (`rng.ts`) makes the tests deterministic. 11 tests cover scoring, the scripted bot, chains, the 45 s clock and the off-root penalty.
- **Lab is lazy.** `sections/Lab.tsx` is loaded with `React.lazy` from the hub: its own ~7 kB gzipped chunk, fetched only when the Lab opens. No game engines, no audio, all art is inline SVG.
- **Measure the Radicle:** the player's two clicks are snapped to the nearest point on the root, and the measured length is the arc between them. Score = 100 minus length error (zero at 30% off) minus 2 points per unit a click lands more than 12 units from the root, so clicking in empty space near the ends does not game it. Mouse, touch and keyboard (arrows move a crosshair, Enter places). Scale (10 units = 1 mm) is simulated and labelled.
- **Ripe or Rotten?:** swipe (pointer events), arrow keys, or buttons. The bot's accuracy is scripted (exactly 8 of 10 right, shown as 80%), its progress ticks along on a timer, and its final score is fixed up front so the result does not depend on how fast the player is. Every bot score is labelled "simulation".
- **Fallow Finder:** 6x6 grid of real buttons (arrow keys move focus), 45 s, +10 times a chain multiplier (up to 3x), -5 and a broken chain for a wrong tap, tapped fields rest as "sown" for 1.5 s. State cues use glyphs as well as colour. The clock ticks every 100 ms.
- **Pausing:** `useGameClock` skips ticks while `document.hidden` and caps dt, so the clock cannot jump when the tab returns. Checked by forcing `document.hidden`: the countdown stayed put for 3 s.
- **Scores:** best per game in `localStorage` (try/catch), shown on the Lab menu. Each game also has its own "Playful demo" label.
- Not built: sound, the optional quiz and Konami easter egg. `// FACT-CHECK` on the closing "milliseconds" line in the radicle game.
