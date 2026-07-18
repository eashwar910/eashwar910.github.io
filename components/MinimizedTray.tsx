"use client";

import { useMemo } from "react";
import { useDesktopStore } from "@/store/desktopStore";

// Minimized-window tray (ROADMAP.md Phase 2). There's no traditional taskbar — minimized windows
// collapse to small chips docked bottom-centre, where the agentic chat dock will eventually live
// (Phase 5). Clicking a chip restores + focuses its window.

interface MinimizedTrayProps {
  // Resolve a slug to its display label (project title).
  titleForSlug: (slug: string) => string;
}

export default function MinimizedTray({ titleForSlug }: MinimizedTrayProps) {
  // Select the stable `windows` reference and derive the minimized subset in render — filtering
  // inside the selector returns a fresh array each call and trips zustand's snapshot loop.
  const windows = useDesktopStore((s) => s.windows);
  const restoreWindow = useDesktopStore((s) => s.restoreWindow);
  const minimized = useMemo(() => windows.filter((w) => w.minimized), [windows]);

  if (minimized.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[900] flex justify-center">
      <div className="pointer-events-auto flex max-w-[90vw] flex-wrap items-center gap-2 rounded-xl border border-soil/30 bg-base/90 px-3 py-2 shadow-2xl backdrop-blur">
        {minimized.map((w) => (
          <button
            key={w.slug}
            type="button"
            onClick={() => restoreWindow(w.slug)}
            title={`Restore ${titleForSlug(w.slug)}`}
            className="flex items-center gap-2 rounded-md bg-paper/10 px-3 py-1.5 font-ui text-xs font-medium text-paper outline-none hover:bg-paper/20 focus-visible:ring-2 focus-visible:ring-sky"
          >
            <span aria-hidden className="h-2 w-2 rounded-sm bg-zinc-400" />
            <span className="max-w-40 truncate">{titleForSlug(w.slug)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
