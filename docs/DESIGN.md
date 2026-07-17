# DESIGN.md — Visual & Style Bible

This is the single source of truth for how anything visual in this project looks.
Any AI-generated asset (sticker, wallpaper, icon) MUST be checked against this file before
being accepted into the repo. If a generated asset doesn't match this doc, regenerate it —
don't "make it work" with one-off CSS hacks, or consistency breaks project-by-project.

---

## 1. Core Concept

An AI-first desktop OS as a portfolio shell. Agriculture is a **subtle undertone**, not the
main character — think "this OS happens to have been designed by someone who thinks about
farms," not "farm-themed clip art everywhere."

Two visual registers that must never bleed into each other:
- **OS chrome** (windows, taskbar/dock, icons, cursors, menus) — clean, neutral, modern desktop OS aesthetic.
- **Sticker layer** (agriculture motifs inside opened files) — soft, decorative, low-opacity, corner-anchored.

---

## 2. Color Palette

Keep this tight. Every hex below should be a CSS variable, never a hardcoded hex in components.

| Token | Hex | Use |
|---|---|---|
| `--bg-base` | `#1C1F1A` | OS background base / window chrome dark mode |
| `--bg-panel` | `#F4F1E8` | Window/file background (warm off-white, like paper) |
| `--accent-leaf` | `#4C7A3D` | Primary accent (buttons, active states, links) |
| `--accent-soil` | `#8A6142` | Secondary accent (borders, dividers) |
| `--accent-sky` | `#A9C6D6` | Tertiary accent (info states, hover) |
| `--accent-wheat` | `#D9B168` | Highlight / warning / badge color |
| `--text-primary` | `#1C1F1A` | Body text on light panels |
| `--text-inverse` | `#F4F1E8` | Text on dark chrome |
| `--sticker-opacity` | `0.18` | Fixed opacity value for all sticker overlays — do not vary per-sticker |

No pure black, no pure white. No neon. No saturated greens — "leaf" should read as muted,
not "Android green."

---

## 3. Typography

**LOCKED (Phase 0, tested in `phase0/font-presets-v2.html` preset 4):**

- **UI/Chrome font**: `Schibsted Grotesk` — weights 400/500/600/700. Used for titlebars, dock/
  taskbar labels, buttons, context menus, chat dock — the "OS" voice. Newspaper-grotesk feel,
  clean and neutral without reading as a generic SaaS-template sans.
- **Markdown/content font**: `Piazzolla` — regular/italic, weights 400/500. Used for all body
  copy inside opened `.md` file windows — the "document" voice. Has an optical "wonk" character
  that keeps it from reading as a stock serif.
- Both are free on Google Fonts (`fonts.googleapis.com`) — no self-hosting needed.
- CSS variables: `--font-ui: 'Schibsted Grotesk', sans-serif;` / `--font-content: 'Piazzolla', serif;`
  — set once in `globals.css`, never hardcode a font-family in a component.
- Never use a decorative/handwritten font anywhere. It undercuts the "OS" premise.

---

## 4. Iconography (desktop icons)

- Flat, 2-tone (base color + one shade), rounded-corner geometric icons.
- Consistent stroke weight if any linework is used (2px at 64px icon size).
- Icon shape language: soft squircle badges behind a simple pictogram, similar to modern OS
  icon systems (macOS/Windows 11 style), not skeuomorphic.
- Every project icon uses the SAME badge shape/size; only the pictogram inside changes.

---

## 5. Sticker System (agriculture motifs)

**Rule: stickers only appear in files whose frontmatter tag includes an agriculture-related
project. TIMELINE.md, AWARDS.md, EXPERIENCE.md, and non-agri projects get NO stickers, or at
most a neutral "paper texture" corner fold — no drones/sprinklers on unrelated files.**

- Stickers render as absolutely-positioned PNGs, opacity `--sticker-opacity` (0.18), desaturated
  10%, placed only in the four corners or behind the scrollable content (z-index below text).
- Max 2 stickers visible per open window at once. More reads as clutter, not theme.
- Each project gets ONE assigned sticker theme (see frontmatter `stickerTheme` field), not a
  random one — so re-opening a file always shows the same motif (consistency = intentionality).

**Sticker style prompt template (use for ALL sticker generations, swap only [SUBJECT]):**

> flat vector sticker illustration, transparent background, muted earthy agriculture palette
> (soil brown #8A6142, leaf green #4C7A3D, pale sky blue #A9C6D6, wheat gold #D9B168), soft
> rounded edges, minimal flat shading, consistent 2px line weight, no gradients, no drop shadow,
> centered composition, isolated on transparent background — [SUBJECT]

Subject list (one sticker theme per relevant project): drone, sprinkler, wheat stalk, soil
sensor, greenhouse, tractor, leaf-scan/loupe, rain cloud, seedling, barn silhouette, satellite
dish, irrigation pipe.

---

## 6. Wallpaper

- NOT a video file. A static painterly farm landscape background + ONE separate transparent
  drone sprite animated via CSS/Framer Motion along a looping path. This is the entire "dynamic"
  effect — cheap, reliable, no video hosting/perf cost.
- Optional: a low-opacity color-overlay gradient that shifts with local time of day (warm gold
  overlay 6am–10am and 5pm–8pm, neutral otherwise) — CSS only, no new assets needed.
- Wallpaper palette must draw from the SAME palette table in Section 2 — no separate wallpaper
  color scheme.

**Wallpaper style prompt template:**

> wide landscape digital painting, aerial view of a farm at golden hour, muted earthy palette
> (soil brown, leaf green, pale sky blue, wheat gold), soft painterly brushwork, gentle depth of
> field, no text, no logos, cinematic wide composition, calm and minimal — [VARIANT DETAIL]

Variant detail options: "rolling wheat fields with a single dirt road," "rice paddy terraces with
mist," "orchard rows with a small greenhouse," "vineyard hills with a distant barn."

**Drone sprite prompt (separate asset, transparent PNG):**

> small flat-illustration agricultural drone with four rotors, top-down 3/4 view, transparent
> background, muted palette matching soil brown/leaf green/sky blue, flat vector style, no
> shadow baked in, simple and iconic silhouette, consistent with sticker set style

---

## 7. What "subtle" means in practice (guardrail checklist)

Before merging any themed asset, check:
- [ ] Does it ever overlap or sit behind readable text at >30% opacity? → reject
- [ ] Does a non-agriculture file (TIMELINE, AWARDS, EXPERIENCE) have a sticker? → reject
- [ ] Are there more than 2 stickers in one window? → reject
- [ ] Does the sticker use a color outside the Section 2 palette? → reject
- [ ] Would someone need to be told "this is agriculture-themed" to notice it, or is it
      screaming for attention? → if screaming, reject and regenerate softer.

---

## 8. Explicit non-goals

- No literal photographic textures (keep everything flat/illustrated).
- No sound effects tied to the theme (e.g. no ambient farm sounds — this is a portfolio, keep
  it professional).
- No seasonal/weather variation beyond the time-of-day overlay — scope control.
