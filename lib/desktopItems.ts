import type { LoadedProject, LoadedSystemFile } from "@/lib/content";
import type { IconPosition } from "@/types/content";
import type { IconKind } from "@/store/desktopStore";

// Pure, client-safe derivation (no fs) of the flat icon list the desktop renders.
// One markdown icon per project AND per system file (TIMELINE/AWARDS/EXPERIENCE), plus a sibling
// ".exe" icon for every `hasDemo` project — see ROADMAP.md Phase 2 ("Use Application" popup) and
// the identity model in desktopStore.ts.

export type LoadedDesktopContent = LoadedProject | LoadedSystemFile;

export interface DesktopItem {
  iconId: string;
  slug: string;
  kind: IconKind;
  label: string;
  defaultPosition: IconPosition;
  content: LoadedDesktopContent;
}

// Vertical offset of the ".exe" sibling below its markdown icon (placeholder layout only).
const EXE_OFFSET_Y = 112;

export function buildDesktopItems(
  projects: LoadedProject[],
  systemFiles: LoadedSystemFile[]
): DesktopItem[] {
  const items: DesktopItem[] = [];

  for (const project of projects) {
    const { frontmatter } = project;

    items.push({
      iconId: frontmatter.slug,
      slug: frontmatter.slug,
      kind: "md",
      label: frontmatter.title,
      defaultPosition: frontmatter.defaultPosition,
      content: project,
    });

    if (frontmatter.hasDemo && frontmatter.demoUrl) {
      items.push({
        iconId: `${frontmatter.slug}.exe`,
        slug: frontmatter.slug,
        kind: "exe",
        label: `${frontmatter.slug}.exe`,
        defaultPosition: {
          x: frontmatter.defaultPosition.x,
          y: frontmatter.defaultPosition.y + EXE_OFFSET_Y,
        },
        content: project,
      });
    }
  }

  for (const systemFile of systemFiles) {
    const { frontmatter } = systemFile;
    items.push({
      iconId: frontmatter.slug,
      slug: frontmatter.slug,
      kind: "md",
      label: frontmatter.title,
      defaultPosition: frontmatter.defaultPosition,
      content: systemFile,
    });
  }

  return items;
}
