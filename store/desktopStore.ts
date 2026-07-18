import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IconPosition } from "@/types/content";

// Single source of truth for all window/icon/selection state (see CLAUDE.md coding conventions).
// No component may keep its own copy of anything defined here.
//
// Identity model:
// - Each desktop icon has an `iconId`. A project's markdown icon uses its `slug` as the id.
//   A `hasDemo` project also gets a sibling ".exe" icon whose id is `${slug}.exe` (see
//   lib/desktopItems.ts). Selection, positions and the context menu are keyed by `iconId`.
// - Windows are keyed by `slug` — only markdown files open as windows; an ".exe" icon opens
//   the "Use Application" demo popup instead of a window.

export type IconKind = "md" | "exe";

export interface WindowState {
  slug: string;
  z: number;
  minimized: boolean;
  // Bumped by refreshWindow() to force a content remount (the desktop-OS "Refresh" action).
  nonce: number;
}

export interface ContextMenuState {
  iconId: string;
  slug: string;
  kind: IconKind;
  x: number;
  y: number;
}

interface DesktopState {
  // --- persisted ---
  positions: Record<string, IconPosition>;

  // --- ephemeral (not persisted) ---
  selection: string[];
  windows: WindowState[];
  zCounter: number;
  contextMenu: ContextMenuState | null;
  demoPopup: string | null; // slug of the project whose demo popup is open

  // positions
  setIconPosition: (iconId: string, pos: IconPosition) => void;

  // selection (all args are iconIds)
  selectOnly: (iconId: string) => void;
  toggleSelect: (iconId: string) => void;
  setSelection: (iconIds: string[]) => void;
  clearSelection: () => void;

  // windows (all args are slugs)
  openWindow: (slug: string) => void;
  openWindows: (slugs: string[]) => void;
  closeWindow: (slug: string) => void;
  focusWindow: (slug: string) => void;
  minimizeWindow: (slug: string) => void;
  restoreWindow: (slug: string) => void;
  refreshWindow: (slug: string) => void;

  // context menu + demo popup
  openContextMenu: (menu: ContextMenuState) => void;
  closeContextMenu: () => void;
  openDemoPopup: (slug: string) => void;
  closeDemoPopup: () => void;
}

const Z_BASE = 100;

export const useDesktopStore = create<DesktopState>()(
  persist(
    (set, get) => ({
      positions: {},
      selection: [],
      windows: [],
      zCounter: Z_BASE,
      contextMenu: null,
      demoPopup: null,

      setIconPosition: (iconId, pos) =>
        set((s) => ({ positions: { ...s.positions, [iconId]: pos } })),

      selectOnly: (iconId) => set({ selection: [iconId] }),

      toggleSelect: (iconId) =>
        set((s) => ({
          selection: s.selection.includes(iconId)
            ? s.selection.filter((id) => id !== iconId)
            : [...s.selection, iconId],
        })),

      setSelection: (iconIds) => set({ selection: iconIds }),

      clearSelection: () => set({ selection: [] }),

      openWindow: (slug) =>
        set((s) => {
          const nextZ = s.zCounter + 1;
          const existing = s.windows.find((w) => w.slug === slug);
          if (existing) {
            // Re-focus + un-minimize an already-open window.
            return {
              zCounter: nextZ,
              windows: s.windows.map((w) =>
                w.slug === slug ? { ...w, z: nextZ, minimized: false } : w
              ),
            };
          }
          return {
            zCounter: nextZ,
            windows: [...s.windows, { slug, z: nextZ, minimized: false, nonce: 0 }],
          };
        }),

      openWindows: (slugs) => {
        // Open each as its own window, giving each a distinct (increasing) z so they cascade.
        slugs.forEach((slug) => get().openWindow(slug));
      },

      closeWindow: (slug) =>
        set((s) => ({ windows: s.windows.filter((w) => w.slug !== slug) })),

      focusWindow: (slug) =>
        set((s) => {
          const nextZ = s.zCounter + 1;
          return {
            zCounter: nextZ,
            windows: s.windows.map((w) => (w.slug === slug ? { ...w, z: nextZ } : w)),
          };
        }),

      minimizeWindow: (slug) =>
        set((s) => ({
          windows: s.windows.map((w) =>
            w.slug === slug ? { ...w, minimized: true } : w
          ),
        })),

      restoreWindow: (slug) =>
        set((s) => {
          const nextZ = s.zCounter + 1;
          return {
            zCounter: nextZ,
            windows: s.windows.map((w) =>
              w.slug === slug ? { ...w, minimized: false, z: nextZ } : w
            ),
          };
        }),

      refreshWindow: (slug) =>
        set((s) => {
          const nextZ = s.zCounter + 1;
          const existing = s.windows.find((w) => w.slug === slug);
          if (!existing) {
            // "Refresh" on a closed file just opens a fresh copy.
            return {
              zCounter: nextZ,
              windows: [...s.windows, { slug, z: nextZ, minimized: false, nonce: 0 }],
            };
          }
          return {
            zCounter: nextZ,
            windows: s.windows.map((w) =>
              w.slug === slug
                ? { ...w, minimized: false, z: nextZ, nonce: w.nonce + 1 }
                : w
            ),
          };
        }),

      openContextMenu: (menu) => set({ contextMenu: menu }),
      closeContextMenu: () => set({ contextMenu: null }),
      openDemoPopup: (slug) => set({ demoPopup: slug }),
      closeDemoPopup: () => set({ demoPopup: null }),
    }),
    {
      name: "fallowos-desktop",
      storage: createJSONStorage(() => localStorage),
      // Only icon positions survive reloads — windows/selection are session state.
      partialize: (s) => ({ positions: s.positions }),
    }
  )
);
