"use client";

import { useEffect } from "react";
import { useDesktopStore } from "@/store/desktopStore";
import type { LoadedProject } from "@/lib/content";

// "Use Application" popup (ROADMAP.md Phase 2): triggered by the ".exe" sibling icon of a
// `hasDemo` project. It's a small launcher dialog that links out to the external Streamlit demo —
// distinct from the in-OS markdown window.

interface DemoPopupProps {
  project: LoadedProject | null;
}

export default function DemoPopup({ project }: DemoPopupProps) {
  const closeDemoPopup = useDesktopStore((s) => s.closeDemoPopup);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDemoPopup();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, closeDemoPopup]);

  if (!project || !project.frontmatter.demoUrl) return null;

  const { title, slug, demoUrl } = project.frontmatter;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Dismiss"
        onClick={closeDemoPopup}
        className="absolute inset-0 bg-base/50"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Launch ${title}`}
        className="relative w-full max-w-sm overflow-hidden rounded-xl bg-panel shadow-2xl ring-1 ring-black/20"
      >
        <div className="flex items-center justify-between border-b border-soil/25 bg-base px-4 py-2.5">
          <span className="font-ui text-sm font-semibold text-paper">{slug}.exe</span>
          <button
            type="button"
            aria-label="Close"
            onClick={closeDemoPopup}
            className="rounded px-2 py-0.5 font-ui text-sm text-paper/80 outline-none hover:text-paper focus-visible:ring-2 focus-visible:ring-sky"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">
          <h2 className="mb-1 font-ui text-base font-semibold text-ink">
            Use Application — {title}
          </h2>
          <p className="mb-4 font-ui text-sm text-ink/70">
            This opens the live interactive demo in a new tab.
          </p>
          <div className="flex items-center gap-2">
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeDemoPopup}
              className="inline-flex items-center gap-1 rounded-md bg-leaf px-3 py-1.5 font-ui text-sm font-medium text-paper outline-none hover:bg-leaf/90 focus-visible:ring-2 focus-visible:ring-sky"
            >
              Launch demo ↗
            </a>
            <button
              type="button"
              onClick={closeDemoPopup}
              className="rounded-md px-3 py-1.5 font-ui text-sm font-medium text-ink/70 outline-none hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-sky"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
