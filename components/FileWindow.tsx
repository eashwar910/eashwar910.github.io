"use client";

import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { LoadedProject } from "@/lib/content";

// Phase 1 file window: a static centered modal. It is NOT draggable/resizable yet — react-rnd,
// z-index/focus, and the Zustand window manager all arrive in Phase 2. Its only job here is to
// prove the render pipeline: real markdown body + readable frontmatter fields.

interface FileWindowProps {
  project: LoadedProject;
  onClose: () => void;
}

export default function FileWindow({ project, onClose }: FileWindowProps) {
  const { frontmatter, body } = project;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={frontmatter.title}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close window"
        onClick={onClose}
        className="absolute inset-0 bg-base/60"
      />

      {/* window */}
      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-panel shadow-2xl">
        {/* titlebar (chrome voice) */}
        <div className="flex items-center justify-between gap-3 border-b border-soil/25 bg-base px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-wheat" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-sky" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-leaf" />
          </div>
          <span className="font-ui text-sm font-semibold text-paper">
            {frontmatter.slug}.md
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded px-2 py-0.5 font-ui text-sm text-paper/80 outline-none hover:text-paper focus-visible:ring-2 focus-visible:ring-sky"
          >
            ✕
          </button>
        </div>

        {/* body (document voice) */}
        <div className="overflow-y-auto px-6 py-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded font-ui text-[0.65rem] font-semibold uppercase tracking-wide text-leaf"
                style={{ background: "color-mix(in srgb, var(--accent-leaf) 12%, transparent)", padding: "3px 8px" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-4 font-content text-2xl font-semibold text-ink">
            {frontmatter.title}
          </h1>

          <article className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
          </article>
        </div>

        {/* footer — proves hasDemo / demoUrl frontmatter fields are readable */}
        {frontmatter.hasDemo && frontmatter.demoUrl && (
          <div className="border-t border-soil/25 bg-panel px-6 py-3">
            <a
              href={frontmatter.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-leaf px-3 py-1.5 font-ui text-sm font-medium text-paper outline-none hover:bg-leaf/90 focus-visible:ring-2 focus-visible:ring-sky"
            >
              Open live demo ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
