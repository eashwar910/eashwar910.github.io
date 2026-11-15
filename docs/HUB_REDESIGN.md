# HUB_REDESIGN: The Globe as a Treasure Hunt

This file **replaces** the hub design in `DESIGN.md` section 3 and Phase 3 of `ROADMAP.md`. The descent (chapters 0 to 10), the content in `DESIGN.md` section 6, and the ground rules in `ROADMAP.md` are unchanged. Treat everything here as a strong starting point. Where you find a better approach, take it and note why in `docs/DECISIONS.md`.

## 1. The idea

After the descent lands in Chennai, the camera pulls all the way back out to the full globe. The globe is now the whole stage. Famous landmarks around the world each hold one part of my portfolio. Each landmark has a small floating marker. Visitors drag to spin the globe, find the markers, and open them. A button in the top right, **Show all**, turns the experience into a normal, scrolling website with the globe spinning slowly in the background.

Why this works: it rewards curiosity, keeps the globe central, keeps my personal details off the map itself (only a marker and a short label live on the globe), and always offers a plain version for people who just want the information.

## 2. What it must NOT look like (learned from earlier attempts)

- No green or night-vision tint on the imagery. Show natural satellite imagery.
- No HUD chrome, corner brackets, graticules or military-style monospace labels.
- No cream "paper" cards, scrapbook styling or script handwriting fonts.
- No cards or personal details pinned onto the globe. On the globe: a floating marker plus a short label on hover or proximity. Details open in a panel.
- No fake pins. Every marker sits on a real landmark and its meaning is in the table below.

## 3. Landmark map (proposal, I can change these)

| Section | Landmark | Location | Why |
|---|---|---|---|
| Timeline ("where it started") | Marina Beach, Chennai | India | Home and the origin of the story |
| Final-year project (Rice Fallow Radar, featured) | Konark Sun Temple | Odisha, India | The project is in Odisha, and a sun temple fits a satellite and agriculture story |
| Projects | Taj Mahal | Agra, India | Example from me; the main project showcase |
| About | Petronas Twin Towers | Kuala Lumpur, Malaysia | Where I live and study now |
| Lab (minigames) | Colosseum | Rome, Italy | An arena for games |
| Skills and awards | Eiffel Tower | Paris, France | Engineering icon |
| Contact | Christ the Redeemer | Rio de Janeiro, Brazil | Open arms: "get in touch" |

Notes:
- Three markers are in India, close together at full-globe scale. Allow enough zoom range that visitors can pull in and separate them, and make sure marker hit areas do not overlap at the default view. If it feels fiddly, merge Timeline into Chennai as the first-found marker or move the Konark content into Projects.
- Keep landmark data in a config file (name, lat, lon, section id, label, short teaser) so the list is easy to change.
- Use original simple marker icons and no landmark photos or logos unless they are clearly free to use.

## 4. Flow and interaction

1. **Pull-back.** When the descent finishes over Chennai, the camera pulls back to a full-globe view with a smooth ease, the same way it came in. This becomes the resting state. The page header shows my name small, and the **Show all** button sits top right.
2. **Spin and explore.** Drag to rotate, scroll or pinch to zoom within limits. Slow auto-rotation runs when idle, pauses on interaction, and resumes after a few seconds of stillness.
3. **Markers.** Each marker floats slightly above its landmark with a gentle bob and a soft pulse ring. Markers on the far side of the globe are hidden (occlusion culling). A short label appears on hover, on tap, or when a marker nears the centre of the view.
4. **Discovery help, not frustration.**
   - A small found counter ("2 of 7 found").
   - After roughly 10 seconds without finding a new marker, a subtle hint appears (for example, a gently pulsing arc or arrow pointing toward the nearest undiscovered marker). Tune so it does not feel pushy.
   - Show all is always available.
5. **Open a marker.** The camera flies in to the landmark and a clean panel opens on one side with that section's content. A Back to globe button returns to the full view. Opening the Lab marker opens the minigames.
6. **Show all.** Switches to a normal website: one scrolling page (or clear sections) with every section's content visible in order, the globe spinning slowly behind a soft dark scrim for legibility. A toggle in the same corner switches back to Explore the globe. Both modes read from the same content files; no duplicated copy.
7. **Deep links.** Keep hash routes for each section; opening one lands directly in that marker's view or in the Show all page scrolled to that section.

Defaults: first visit plays the descent, then lands on the globe. Returning visitors (session) skip to the globe. A Replay the descent link exists in the footer or menu.

## 5. Visual direction

- Natural daylight imagery with atmosphere glow, deep space background. No tint filter.
- Neutral dark UI surfaces, soft off-white text, **one** accent colour that is not green and not the earlier orange. Show me two palette options as screenshots first.
- Typography: one confident display face and one clean text face. No monospace HUD look. Avoid the serif plus mono eyebrow pattern from earlier versions.
- Panels: simple, spacious, minimal borders, restrained radii. They should feel like an editorial page sliding over the globe, not a frosted glass slab.
- Marker: small, clean, clearly visible against both ocean and land, with an accessible focus state.
- Motion: slow, weighty and calm. The globe is the star.

## 6. Technical notes (suggestions)

- Keep the existing `GlobeEngine` abstraction. Add an "explore" mode that re-enables camera inputs with constraints (min and max zoom height, no tilting below the horizon), and keep descent mode input-locked as before.
- Markers: HTML overlays positioned each frame from world to canvas coordinates give the crispest labels and easy accessibility; Cesium billboards are lighter if many markers are added later. Cull markers on the far side of the globe with an ellipsoid occlusion check, and hide HTML markers when occluded.
- Auto-rotation: rotate the camera about the globe's axis in a post-render step, pause on pointer down, resume after an idle timer.
- Camera flights: a small helper that tweens position and orientation with easing, interruptible if the user drags.
- State: a tiny store for mode (`descent | explore | showAll`), selected marker, found set (persist in `sessionStorage` inside try/catch), and reduced-motion.
- Show all mode: render normal semantic sections; background globe at low frame rate with a scrim, paused when the tab is hidden.
- Render only what is visible; keep the loop cheap when the panel is open.

## 7. Mobile and accessibility

- Touch drag rotates; tap targets for markers at least 44 px; the panel becomes a bottom sheet; Show all is clearly visible.
- Keyboard: a way to move focus between markers (for example, Tab cycles through them, Enter opens), and Escape closes the panel. Show all is the fully accessible path; make sure its content is real DOM text.
- `prefers-reduced-motion`: no auto-rotation, instant camera moves or short fades, and land in Show all by default.
- If WebGL fails, land in Show all with a static background image.

## 8. Acceptance (done when)

- Descent ends in Chennai, pulls back to a full globe, and the pull-back feels like the reverse of the descent.
- All seven markers are findable by spinning, openable, and each panel shows the right content from the content files; Back to globe works.
- Hint and found counter work and are not annoying (test on a naive user if possible).
- Show all gives a clean, fast, normal website with the globe spinning behind it, and toggles back.
- Works at 375px with touch, with keyboard only, and with reduced motion.
- No green tint, HUD styling, cream cards, handwriting fonts or fake pins anywhere.
- Report real performance numbers (frame rate on a mid laptop and a phone, bundle sizes).

## 9. Room to improve

Propose better landmark pairings, a more elegant marker, smarter discovery hints, or a nicer Show all layout in `docs/IDEAS.md`. Show two visual variants as screenshots before building the final one. Do not change facts or story order without asking.