"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import DesktopIcon from "./DesktopIcon";
import FileWindow from "./FileWindow";
import ContextMenu from "./ContextMenu";
import MinimizedTray from "./MinimizedTray";
import DemoPopup from "./DemoPopup";
import { useDesktopStore } from "@/store/desktopStore";
import { useMarqueeSelect, type IconRect } from "@/hooks/useMarqueeSelect";
import { buildDesktopItems, type LoadedDesktopContent } from "@/lib/desktopItems";
import type { LoadedProject, LoadedSystemFile } from "@/lib/content";

// Phase 2 desktop orchestrator: renders the icon grid (draggable + persisted), the window manager
// (open/close/focus/z-index/minimize), marquee multi-select, multi-open via Enter, the right-click
// context menu, the minimized tray, and the ".exe" demo popup. Flat background + gray-box icons —
// theming is deliberately deferred to Phase 4 (ROADMAP.md).

interface DesktopProps {
  projects: LoadedProject[];
  systemFiles: LoadedSystemFile[];
}

export default function Desktop({ projects, systemFiles }: DesktopProps) {
  const items = useMemo(
    () => buildDesktopItems(projects, systemFiles),
    [projects, systemFiles]
  );

  // Fast lookups: slug -> content (any file), slug -> project (demo popups only), iconId -> item.
  const contentBySlug = useMemo(() => {
    const m = new Map<string, LoadedDesktopContent>();
    for (const it of items) m.set(it.slug, it.content);
    return m;
  }, [items]);
  const projectBySlug = useMemo(() => {
    const m = new Map<string, LoadedProject>();
    for (const p of projects) m.set(p.frontmatter.slug, p);
    return m;
  }, [projects]);
  const itemByIconId = useMemo(() => {
    const m = new Map(items.map((it) => [it.iconId, it] as const));
    return m;
  }, [items]);

  const selection = useDesktopStore((s) => s.selection);
  const windows = useDesktopStore((s) => s.windows);
  const setSelection = useDesktopStore((s) => s.setSelection);
  const clearSelection = useDesktopStore((s) => s.clearSelection);
  const openWindows = useDesktopStore((s) => s.openWindows);
  const openDemoPopup = useDesktopStore((s) => s.openDemoPopup);
  const contextMenu = useDesktopStore((s) => s.contextMenu);
  const closeContextMenu = useDesktopStore((s) => s.closeContextMenu);
  const demoPopupSlug = useDesktopStore((s) => s.demoPopup);
  const closeDemoPopup = useDesktopStore((s) => s.closeDemoPopup);

  // Persisted icon positions rehydrate from localStorage on the client only; gate the icon layer
  // behind a mount flag so the server and first client render agree (no hydration mismatch).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Marquee reads live icon rects straight from the DOM (each icon carries a data-icon-id).
  const getIconRects = useCallback((): IconRect[] => {
    const els = document.querySelectorAll<HTMLElement>("[data-icon-id]");
    return Array.from(els).map((el) => {
      const r = el.getBoundingClientRect();
      return {
        iconId: el.dataset.iconId as string,
        rect: { x: r.x, y: r.y, width: r.width, height: r.height },
      };
    });
  }, []);

  const { marquee, onBackgroundMouseDown } = useMarqueeSelect({
    getIconRects,
    onSelect: setSelection,
  });

  // Only start a marquee / clear affordances when the press lands on the bare background,
  // not on an icon or window (those are descendants, so target !== currentTarget).
  const handleBackgroundMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    if (contextMenu) closeContextMenu();
    onBackgroundMouseDown(e);
  };

  // Keyboard: Enter opens every selected icon; Escape backs out of menu → popup → selection.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (selection.length === 0) return;
        const slugsToOpen: string[] = [];
        for (const iconId of selection) {
          const item = itemByIconId.get(iconId);
          if (!item) continue;
          if (item.kind === "exe") openDemoPopup(item.slug);
          else slugsToOpen.push(item.slug);
        }
        if (slugsToOpen.length > 0) openWindows(slugsToOpen);
      } else if (e.key === "Escape") {
        if (contextMenu) closeContextMenu();
        else if (demoPopupSlug) closeDemoPopup();
        else if (selection.length > 0) clearSelection();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    selection,
    itemByIconId,
    openWindows,
    openDemoPopup,
    contextMenu,
    closeContextMenu,
    demoPopupSlug,
    closeDemoPopup,
    clearSelection,
  ]);

  const demoProject = demoPopupSlug ? projectBySlug.get(demoPopupSlug) ?? null : null;
  const titleForSlug = useCallback(
    (slug: string) => contentBySlug.get(slug)?.frontmatter.title ?? slug,
    [contentBySlug]
  );

  return (
    <main
      onMouseDown={handleBackgroundMouseDown}
      className="relative h-screen w-screen select-none overflow-hidden bg-base"
    >
      {/* Icon + window layer. Gated on mount so persisted positions don't cause a hydration diff. */}
      {mounted && (
        <>
          {items.map((item) => (
            <DesktopIcon key={item.iconId} item={item} />
          ))}

          {windows.map((win, index) => {
            const content = contentBySlug.get(win.slug);
            if (!content) return null;
            return (
              <FileWindow
                key={`${win.slug}-${win.nonce}`}
                content={content}
                win={win}
                index={index}
              />
            );
          })}
        </>
      )}

      {/* Live marquee box (viewport coords). */}
      {marquee && (
        <div
          className="pointer-events-none fixed z-30 rounded-sm border border-sky bg-sky/15"
          style={{
            left: marquee.x,
            top: marquee.y,
            width: marquee.width,
            height: marquee.height,
          }}
        />
      )}

      <ContextMenu />
      <MinimizedTray titleForSlug={titleForSlug} />
      <DemoPopup project={demoProject} />
    </main>
  );
}
