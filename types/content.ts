// Frontmatter schema for content/*.md files — see CLAUDE.md "Content model" section.
// Type-only, no runtime deps. Phase 1 wires this into gray-matter parsing.

export interface IconPosition {
  x: number;
  y: number;
}

// Base fields shared by every content file — projects and system files alike.
export interface BaseFrontmatter {
  title: string;
  slug: string;
  tags: string[];
  icon: string; // must match an entry in public/icons/
  defaultPosition: IconPosition;
  order: number;
}

// content/projects/*.md
export interface ProjectFrontmatter extends BaseFrontmatter {
  hasDemo: boolean;
  demoUrl?: string; // required when hasDemo is true
  // must match an entry in content/stickers/registry.json, or omit for no sticker.
  // Only set for agriculture-tagged projects — see DESIGN.md Section 5.
  stickerTheme?: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
}

// content/system/TIMELINE.md, AWARDS.md, EXPERIENCE.md
// stickerTheme is intentionally absent — these files never get agriculture stickers
// (DESIGN.md Section 5 guardrail).
export interface SystemFrontmatter extends BaseFrontmatter {
  hasDemo?: false;
}

// TIMELINE.md only — the `timeline` array drives the timeline graphic component.
// Never hardcode timeline entries in JSX; always read from this array (see ROADMAP.md Phase 3).
export interface TimelineFrontmatter extends SystemFrontmatter {
  timeline: TimelineEntry[];
}

export type ContentFrontmatter = ProjectFrontmatter | SystemFrontmatter | TimelineFrontmatter;
