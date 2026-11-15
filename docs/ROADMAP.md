# ROADMAP: Scroll-to-Chennai Portfolio

Read this first, then `DESIGN.md` (what it should feel and look like, plus the content) and `METHOD.md` (how to build each phase). These three files are a strong starting point, not a cage. If you find a better approach, take it and note what you changed and why in `docs/DECISIONS.md`.

## Vision

A narrative portfolio for Eashwar Siddha. A visitor starts in orbit over Earth. As they scroll, the camera descends over real satellite imagery while short captions tell the story of my path into agricultural AI, one chapter per stage. The descent ends over Chennai, my home, where the page turns into an explorable hub: timeline, projects, skills, awards, contact, and a small "Lab" of minigames.

Satellite imagery is the theme because my work is reading change from imagery to help farmers. The scroll should feel like the work itself: from a whole planet down to one field.

## Ground rules

1. **Honest content only.** Use the facts in `DESIGN.md` section 6. Never invent metrics, accuracy numbers, employers, testimonials or dates. My final-year project has no results yet, so show none.
2. **No phone number** anywhere on the site.
3. **The story leads.** Animation serves the narration.
4. **Original assets only.** No copyrighted characters, logos or imagery.
5. **Content lives in data files**, not inside components, so I can edit copy later.
6. Work **phase by phase**. Stop after each phase, tell me how to run it, and wait for my review.

## Phases

### Phase 1: Descent skeleton
**Goal:** a smooth, scroll-driven zoom from orbit to Chennai over real imagery.
**Done when:**
- Scrolling moves the camera along the chapter waypoints from orbit to Chennai, on desktop and at phone width.
- Placeholder captions appear per chapter, with an altitude readout.
- A "Skip to explore" button works.
- `STRAIGHT_ZOOM` config flag switches between the glide path and a straight zoom.
- Project runs with one command and documents the token setup.

### Phase 2: Story and polish
**Goal:** the descent feels like a finished story.
**Done when:**
- Real copy loads from the content files with caption animations and chapter progress.
- The theme shifts with altitude (space to daylight).
- Chapter 9 (Odisha) shows a stylised radar-style overlay and pins, with no real data claims.
- Loading screen, reduced-motion path, and a no-WebGL fallback all work.

### Phase 3: Explore hub
**Goal:** a useful, shareable portfolio at the end of the descent.
**Done when:**
- Timeline, Projects, About, Skills and Awards, and Contact all work with animated transitions.
- Each section has a deep link; refreshing lands on the hub rather than replaying the intro; "Replay the descent" exists.
- Works at 375px wide and with keyboard only.

### Phase 4: Lab (minigames)
**Goal:** three small games that echo my real work.
**Done when:**
- *Measure the Radicle*, *Ripe or Rotten?* and *Fallow Finder* are playable in under two minutes each, on desktop and touch.
- Scores save locally per visitor.
- Games are clearly labelled as playful demos, not real model output.

### Phase 5: Ship
**Goal:** live on `eashwarsiddha.dev`.
**Done when:**
- SEO and social previews are set; accessibility and performance pass done.
- README covers run, build, env vars and deploy.
- Final QA checklist completed and results reported honestly (bundle sizes, Lighthouse numbers, known gaps).

## Quality bar (applies to every phase)

- **Mobile first:** works at 375px with touch scrolling.
- **Accessible:** respects `prefers-reduced-motion`, keyboard navigable, readable contrast, real text content in the DOM.
- **Performant:** engine and games lazy-loaded; report bundle sizes; graceful fallback if WebGL fails.
- **Private:** no analytics unless I ask.
- **Maintainable:** strict TypeScript, linting and formatting, a few tests for the camera path and game scoring.

## Open items (use these defaults, mark with `// CONFIRM`, do not stop to ask)

1. **Agritix dates.** The resume says "June 2026 to present" but my account is a three-month freelance summer. Default: "Summer 2026, 3 months".
2. **Award wording.** Resume says "First Place, Best School Project Category" for Farmer Buddy. Show exactly as written.
3. **Age-12 workshop.** Year, name and city unknown. Show none.
4. **Seed research lecturer** is unnamed. Do not name them.
5. **Assets.** Photos, favicon, resume PDF and og-image are placeholders until I supply them.
6. **GitHub.** Only `rice-fallow-radar` is public. Link only repos listed in the content files.
7. **GitHub profile README** still says "second-year". I will update it myself.

## Room to improve

You are encouraged to propose better ideas for the camera choreography, the caption writing, the hub layout, or the games, as long as the ground rules hold. Put suggestions in `docs/IDEAS.md` and ask before making large changes to the story order.
