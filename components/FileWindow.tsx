"use client";

import { Rnd } from "react-rnd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDesktopStore, type WindowState } from "@/store/desktopStore";
import type { LoadedDesktopContent } from "@/lib/desktopItems";
import type { TimelineEntry } from "@/types/content";
import TimelineGraphic from "./TimelineGraphic";

// Phase 2/3 file window: a real draggable/resizable window (react-rnd) whose focus/z-index and
// minimized state live in the Zustand store. Multiple can be open at once; clicking one brings it
// to front. Renders markdown for most files, and the data-driven timeline graphic for TIMELINE.
// Still visually plain — stickers/theming are Phase 4.

interface FileWindowProps {
  content: LoadedDesktopContent;
  win: WindowState;
  // Cascade offset so stacked windows don't spawn perfectly on top of each other.
  index: number;
}

export default function FileWindow({ content, win, index }: FileWindowProps) {
  const { frontmatter, body } = content;

  // Narrow the frontmatter union: only projects carry demoUrl; only TIMELINE carries a timeline.
  const demoUrl = "demoUrl" in frontmatter ? frontmatter.demoUrl : undefined;
  const timeline: TimelineEntry[] | undefined =
    "timeline" in frontmatter ? frontmatter.timeline : undefined;

  const focusWindow = useDesktopStore((s) => s.focusWindow);
  const closeWindow = useDesktopStore((s) => s.closeWindow);
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);

  return (
    <Rnd
      default={{
        x: 160 + index * 28,
        y: 90 + index * 28,
        width: 640,
        height: 460,
      }}
      minWidth={320}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      style={{ zIndex: win.z, display: win.minimized ? "none" : "flex" }}
      onMouseDown={() => focusWindow(frontmatter.slug)}
    >
      <div
        className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-panel shadow-2xl ring-1 ring-black/20"
        role="dialog"
        aria-label={frontmatter.title}
      >
        {/* titlebar (chrome voice) — the only drag handle */}
        <div className="window-titlebar flex cursor-grab items-center justify-between gap-3 border-b border-soil/25 bg-base px-4 py-2.5 active:cursor-grabbing">
          <div className="flex items-center gap-2">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-wheat" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-sky" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-leaf" />
          </div>
          <span className="font-ui text-sm font-semibold text-paper">
            {frontmatter.slug}.md
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Minimize window"
              onClick={() => minimizeWindow(frontmatter.slug)}
              className="rounded px-2 py-0.5 font-ui text-sm text-paper/80 outline-none hover:text-paper focus-visible:ring-2 focus-visible:ring-sky"
            >
              —
            </button>
            <button
              type="button"
              aria-label="Close window"
              onClick={() => closeWindow(frontmatter.slug)}
              className="rounded px-2 py-0.5 font-ui text-sm text-paper/80 outline-none hover:text-paper focus-visible:ring-2 focus-visible:ring-sky"
            >
              ✕
            </button>
          </div>
        </div>

        {/* body (document voice) */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded font-ui text-[0.65rem] font-semibold uppercase tracking-wide text-leaf"
                style={{
                  background: "color-mix(in srgb, var(--accent-leaf) 12%, transparent)",
                  padding: "3px 8px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-4 font-content text-2xl font-semibold text-ink">
            {frontmatter.title}
          </h1>

          {timeline ? (
            <TimelineGraphic entries={timeline} />
          ) : (
            <article className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </article>
          )}
        </div>

        {/* footer — the live-demo link for projects that have one */}
        {frontmatter.hasDemo && demoUrl && (
          <div className="border-t border-soil/25 bg-panel px-6 py-3">
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-leaf px-3 py-1.5 font-ui text-sm font-medium text-paper outline-none hover:bg-leaf/90 focus-visible:ring-2 focus-visible:ring-sky"
            >
              Open live demo ↗
            </a>
          </div>
        )}
      </div>
    </Rnd>
  );
}
