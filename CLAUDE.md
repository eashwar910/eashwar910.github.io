# CLAUDE.md

This file is read by Claude Code at the start of every session in this repo. It exists so you
don't have to re-explain the project's conventions every time you open a new session.

Everything that you log in Obsidian under Projects must go under the project named FallowOS

## Project summary

A portfolio website styled as a desktop OS. Projects are `.md` files rendered as draggable
desktop icons; opening one shows its content in a window. An agentic chat dock (replacing the
traditional taskbar) can open/close/refresh files and answer questions about the site owner.
Subtle agriculture theming throughout (see DESIGN.md).

Read `DESIGN.md` and `ROADMAP.md` in the repo root before doing any visual or planning work.
Follow the phase order in ROADMAP.md — do not build Phase 4 (theming) work while Phase 2
(desktop mechanics) is still incomplete or flaky, even if asked to "make it look nicer" —
flag this back to the user instead of skipping ahead.

---

## Tech stack (do not deviate without discussion)

- Next.js (App Router) + TypeScript
- Tailwind CSS — all colors as CSS variables defined in `globals.css`, matching DESIGN.md
  Section 2 exactly. Never hardcode a hex value in a component.
- Zustand for window/icon/selection state
- react-rnd for draggable/resizable windows
- Framer Motion for transitions and the wallpaper drone animation
- react-markdown + gray-matter for content rendering and frontmatter parsing
- Agent API route calls **Gemini 3.1 Flash Lite** (not Claude) — this is a deliberate cost
  decision for a low-traffic site. Keep the tool-calling schema as plain JSON so the provider
  is swappable later without restructuring the frontend.

---

## Content model — project file frontmatter schema

Every project lives at `content/projects/*.md` with this frontmatter shape:

```yaml
---
title: "Crop Disease Classifier"
slug: "crop-disease-classifier"
tags: ["agriculture", "ml", "computer-vision"]
hasDemo: true
demoUrl: "https://your-streamlit-app.streamlit.app"
stickerTheme: "drone-scan"   # must match an entry in content/stickers/registry.json, or omit for no sticker
icon: "leaf-circuit"          # must match an entry in public/icons/
defaultPosition: { x: 120, y: 240 }
order: 1
---

Markdown body content here.
```

Special files `content/system/TIMELINE.md`, `AWARDS.md`, `EXPERIENCE.md` follow the same schema
but with `stickerTheme` omitted or set to a neutral value — per DESIGN.md, these do NOT get
agriculture stickers.

`TIMELINE.md` additionally has a `timeline:` array in frontmatter (list of `{date, title,
description}` objects) consumed by the timeline graphic component — do not hardcode timeline
entries in JSX, always read from this array.

---

## Coding conventions

- One component per file, colocated with its own types.
- All window/icon/selection state lives in `store/desktopStore.ts` (Zustand) — no component-local
  state duplicating what's in the store.
- Drag/marquee-select logic isolated in custom hooks (`hooks/useMarqueeSelect.ts`,
  `hooks/useDraggableIcon.ts`) so they can be reasoned about and tested independently of render logic.
- Sticker/wallpaper rendering components must read opacity/placement rules from a single
  `lib/themeConstants.ts` file that mirrors DESIGN.md Section 5–6 — never inline a one-off opacity
  value in a component.
- Before adding any new agent tool, check it's listed in ROADMAP.md Phase 5. If not, ask the user
  first rather than expanding the tool schema unprompted.

---

## When asked to theme/style something

Always check DESIGN.md's Section 8 guardrail checklist before considering a themed change done.
If a request would violate a guardrail (e.g. "add a sticker to EXPERIENCE.md" or "make the drone
bigger and more central"), point out the conflict with DESIGN.md rather than silently complying —
the user explicitly wants subtlety enforced even under future requests that might drift from it.

## When asked to add features not in ROADMAP.md

Note it as a "Phase 7 / backlog" candidate in ROADMAP.md rather than building it immediately,
unless the user explicitly says to build now, out of order.
