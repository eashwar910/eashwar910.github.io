"use client";

import type { TimelineEntry } from "@/types/content";

// Data-driven timeline graphic (ROADMAP.md Phase 3): a simple vertical CSS timeline rendered
// entirely from the `timeline` frontmatter array of content/system/TIMELINE.md. Entries are NEVER
// hardcoded here — the array is the single source of truth (CLAUDE.md content model). Visuals stay
// plain per the Phase 3 "functionally real, visually plain" exit criteria; theming is Phase 4.

interface TimelineGraphicProps {
  entries: TimelineEntry[];
}

// "2023-08" -> "Aug 2023". Falls back to the raw string if it isn't a YYYY-MM value.
function formatDate(raw: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(raw);
  if (!match) return raw;
  const [, year, month] = match;
  const monthName = new Date(Number(year), Number(month) - 1, 1).toLocaleString("en-US", {
    month: "short",
  });
  return `${monthName} ${year}`;
}

export default function TimelineGraphic({ entries }: TimelineGraphicProps) {
  if (entries.length === 0) {
    return <p className="font-content text-sm italic text-ink/60">No timeline entries yet.</p>;
  }

  return (
    <ol className="relative ml-2 border-l-2 border-soil/40 pl-6">
      {entries.map((entry, i) => (
        <li key={`${entry.date}-${i}`} className="relative pb-7 last:pb-0">
          {/* node on the spine */}
          <span
            aria-hidden
            className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-leaf bg-panel"
          />
          <time className="font-ui text-xs font-semibold uppercase tracking-wide text-soil">
            {formatDate(entry.date)}
          </time>
          <h3 className="mt-0.5 font-content text-base font-semibold text-ink">
            {entry.title}
          </h3>
          {entry.description && (
            <p className="mt-1 font-content text-sm leading-relaxed text-ink/75">
              {entry.description}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
