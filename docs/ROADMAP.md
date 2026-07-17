# ROADMAP.md — AI-First OS Portfolio

## Tech Stack (locked decisions)

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Static-friendly, easy API routes for the agent proxy |
| Styling | Tailwind CSS | Fast iteration, pairs well with CSS variables from DESIGN.md |
| Window state | Zustand | Lightweight, no boilerplate, fine for icon/window state machine |
| Windows/drag/resize | react-rnd | Don't hand-roll drag+resize+z-index, it's a solved problem |
| Animation | Framer Motion | Window open/close transitions, drone sprite path animation |
| Markdown rendering | react-markdown + gray-matter | Renders `.md` content + parses frontmatter metadata |
| Agent model | **Gemini 3.1 Flash Lite** | Low traffic site, cost-sensitive — cheap + fast is the right call over a heavier model here |
| Asset generation | Recraft AI / Ideogram / Leonardo.Ai | See ASSET_PROMPTS.md |
| Hosting | Vercel (or similar) | Native Next.js support |
| Persistence (icon positions, minimized state) | localStorage first; optional lightweight KV (Vercel KV / Supabase) later if you want cross-device persistence | Don't over-engineer this for a portfolio |

**Note on the agent:** Gemini 3.1 Flash Lite doesn't need to match the OS's Claude-Sonnet-in-Claude-Code
branding — it's just the cheapest capable model for a low-traffic tool-calling chat widget. Keep the
system prompt + tool schema model-agnostic (plain JSON tool defs) so swapping providers later, if
traffic ever justifies a stronger model, is a one-file change in the API route, not a rewrite.

---

## Phase 0 — Design Bible (done)
- [x] `DESIGN.md` — palette, typography, sticker rules, wallpaper concept
- [x] Pick and lock actual fonts (Schibsted Grotesk / Piazzolla — see DESIGN.md Section 3)
- [x] Build the frontmatter schema for project files (`types/content.ts`)

**Exit criteria:** you can look at any two future assets side by side and know instantly if one
breaks the palette/style.

---

## Phase 1 — Prove the rendering pipeline (no OS mechanics yet)
- [ ] Static Next.js page, solid background color (no wallpaper yet)
- [ ] One hardcoded icon, click opens a modal
- [ ] Modal renders one hardcoded `.md` file's content via react-markdown
- [ ] Frontmatter parsing works (`hasDemo`, `demoUrl`, `stickerTheme` fields readable)

**Exit criteria:** clicking an icon reliably shows real markdown content in a floating box.
Nothing needs to look good yet.

---

## Phase 2 — Desktop mechanics (the core engineering lift)
- [ ] Icon grid layout with drag-to-reposition (persist position to localStorage)
- [ ] Window manager: open/close/focus/z-index via Zustand store + react-rnd
- [ ] Multi-select: marquee/box-select hook (`useMarqueeSelect`) — build and test in isolation
- [ ] Multi-open: selected icons + Enter/double-click opens all as separate windows
- [ ] Right-click context menu (Refresh, Open, Rename-disabled, etc.)
- [ ] Minimized-window tray (small chips near the chat dock, since there's no traditional taskbar)
- [ ] "Use Application" popup: when a project has `hasDemo: true`, clicking its `.exe`-styled
      sibling icon shows a popup linking out to the Streamlit demo URL

**Exit criteria:** the whole thing behaves like a real (if minimal) desktop OS using gray-box
placeholder icons and a flat color background. This phase gates everything else — don't skip
ahead to theming while anything here is flaky.

---

## Phase 3 — Real content
- [ ] Convert every real project into a frontmatter-driven `.md` file per the CLAUDE.md schema
- [ ] Write `TIMELINE.md`, `AWARDS.md`, `EXPERIENCE.md` content
- [ ] Build the timeline graphic component (can be a simple vertical/horizontal SVG/CSS timeline,
      driven by a `timeline` array in TIMELINE.md's frontmatter — not hardcoded JSX)
- [ ] Wire up real Streamlit demo URLs where applicable

**Exit criteria:** the desktop is functionally your real portfolio, just visually plain.

---

## Phase 4 — Theming pass
- [ ] Generate wallpaper base image + drone sprite (prompts in ASSET_PROMPTS.md)
- [ ] Animate drone sprite along a looping path (Framer Motion `animate` with a bezier-ish keyframe path)
- [ ] Add time-of-day CSS overlay (optional, low-cost nice-to-have)
- [ ] Generate sticker set for agriculture-tagged projects only
- [ ] Wire stickers into file windows via `stickerTheme` frontmatter, respecting the DESIGN.md
      guardrail checklist (opacity, max 2 per window, corner placement only)
- [ ] Design pass on icons (consistent badge shape, palette-locked)

**Exit criteria:** run through the Section 8 guardrail checklist in DESIGN.md on every themed
element before calling this phase done.

---

## Phase 5 — Agentic chat dock
- [ ] `/api/agent` route calling Gemini 3.1 Flash Lite with a small tool schema:
      `open_file(name)`, `close_file(name)`, `refresh_desktop()`, `list_files()`, `answer_about_me(question)`
- [ ] Frontend sends message + current desktop state (open windows, file list) as context
- [ ] Execute returned tool calls against the Zustand store
- [ ] System prompt includes your bio/resume/project summaries directly (no RAG needed at ~15-20 files)
- [ ] Start with ONLY open/close/refresh/answer — add `move_icon` or fancier tools later once
      the basics are reliable. Small tool surface first, expand only after it's solid.

**Exit criteria:** "open my timeline" in the chat box actually opens the TIMELINE.md window.
"Tell me about your ML background" gets a real, grounded answer.

---

## Phase 6 — Polish & ship
- [ ] Lazy-mount windows (don't render markdown/content for windows that aren't open)
- [ ] Mobile/narrow-viewport handling — explicit decision needed: simplified single-column
      fallback view, or a "best viewed on desktop" notice. Don't leave this undecided until launch.
- [ ] Basic performance pass (image sizes, font loading strategy)
- [ ] Deploy to Vercel, custom domain if desired
- [ ] Final guardrail checklist pass on all assets

---

## Anti-scope-creep rules (read before every session)
1. Don't theme anything until Phase 2's mechanics are fully solid with placeholder visuals.
2. Don't add new agent tools until the current tool set is reliable.
3. Don't generate a new sticker style — reuse the Section 5/6 prompt templates in DESIGN.md exactly.
4. If a feature isn't in a phase above, it's out of scope for v1. Write it down, don't build it now.
