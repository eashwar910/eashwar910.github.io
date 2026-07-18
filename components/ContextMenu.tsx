"use client";

import { useEffect, useRef } from "react";
import { useDesktopStore } from "@/store/desktopStore";

// Right-click context menu (ROADMAP.md Phase 2). Actions dispatch against the store; Rename is
// intentionally present-but-disabled (files are read-only content). Renders nothing when no menu
// is open. Position comes from the click coordinates captured in the store.

export default function ContextMenu() {
  const menu = useDesktopStore((s) => s.contextMenu);
  const closeContextMenu = useDesktopStore((s) => s.closeContextMenu);
  const openWindow = useDesktopStore((s) => s.openWindow);
  const openDemoPopup = useDesktopStore((s) => s.openDemoPopup);
  const refreshWindow = useDesktopStore((s) => s.refreshWindow);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) closeContextMenu();
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [menu, closeContextMenu]);

  if (!menu) return null;

  const isExe = menu.kind === "exe";

  const handleOpen = () => {
    if (isExe) openDemoPopup(menu.slug);
    else openWindow(menu.slug);
    closeContextMenu();
  };

  const handleRefresh = () => {
    refreshWindow(menu.slug);
    closeContextMenu();
  };

  return (
    <div
      ref={ref}
      role="menu"
      style={{ left: menu.x, top: menu.y }}
      className="fixed z-[1000] min-w-40 overflow-hidden rounded-md border border-soil/30 bg-base py-1 font-ui text-sm text-paper shadow-2xl"
    >
      <button
        type="button"
        role="menuitem"
        onClick={handleOpen}
        className="block w-full px-3 py-1.5 text-left hover:bg-paper/10"
      >
        {isExe ? "Use Application" : "Open"}
      </button>
      <button
        type="button"
        role="menuitem"
        onClick={handleRefresh}
        disabled={isExe}
        className="block w-full px-3 py-1.5 text-left hover:bg-paper/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        Refresh
      </button>
      <div className="my-1 border-t border-paper/10" />
      <button
        type="button"
        role="menuitem"
        disabled
        className="block w-full cursor-not-allowed px-3 py-1.5 text-left opacity-40"
      >
        Rename
      </button>
    </div>
  );
}
