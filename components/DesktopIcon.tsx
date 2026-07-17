"use client";

// Placeholder desktop icon for Phase 1 — a gray-box badge + label. The real palette-locked
// squircle icon system (DESIGN.md Section 4) is a Phase 4 concern; nothing here should try to
// look finished. Phase 2 replaces the click handler with the drag/select/open machinery.

interface DesktopIconProps {
  label: string;
  onOpen: () => void;
}

export default function DesktopIcon({ label, onOpen }: DesktopIconProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-24 flex-col items-center gap-2 rounded-lg p-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-sky"
    >
      <span
        aria-hidden
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-leaf/85 text-2xl font-semibold text-paper shadow-md transition-transform group-hover:scale-105 group-active:scale-95"
      >
        {label.charAt(0)}
      </span>
      <span className="font-ui text-xs font-medium text-paper">{label}</span>
    </button>
  );
}
