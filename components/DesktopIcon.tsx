"use client";

import { Rnd } from "react-rnd";
import { useDesktopStore } from "@/store/desktopStore";
import { useDraggableIcon } from "@/hooks/useDraggableIcon";
import type { DesktopItem } from "@/lib/desktopItems";

// Phase 2 desktop icon: draggable (react-rnd, position persisted via the store), selectable
// (single / modifier-click / marquee), and openable (double-click). Visuals are deliberately
// gray-box placeholders — the palette-locked squircle icon system is a Phase 4 concern, and
// ROADMAP.md forbids theming while Phase 2 mechanics are being built.

interface DesktopIconProps {
  item: DesktopItem;
}

const ICON_SIZE = 96;

export default function DesktopIcon({ item }: DesktopIconProps) {
  const { iconId, slug, kind, label, defaultPosition } = item;
  const { position, onDragStop } = useDraggableIcon(iconId, defaultPosition);

  const selected = useDesktopStore((s) => s.selection.includes(iconId));
  const selectOnly = useDesktopStore((s) => s.selectOnly);
  const toggleSelect = useDesktopStore((s) => s.toggleSelect);
  const openWindow = useDesktopStore((s) => s.openWindow);
  const openDemoPopup = useDesktopStore((s) => s.openDemoPopup);
  const openContextMenu = useDesktopStore((s) => s.openContextMenu);
  const closeContextMenu = useDesktopStore((s) => s.closeContextMenu);

  const activate = () => {
    if (kind === "exe") openDemoPopup(slug);
    else openWindow(slug);
  };

  const handleClick = (e: React.MouseEvent) => {
    closeContextMenu();
    if (e.metaKey || e.ctrlKey || e.shiftKey) toggleSelect(iconId);
    else selectOnly(iconId);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selected) selectOnly(iconId);
    openContextMenu({ iconId, slug, kind, x: e.clientX, y: e.clientY });
  };

  return (
    <Rnd
      size={{ width: ICON_SIZE, height: ICON_SIZE }}
      position={position}
      onDragStop={onDragStop}
      enableResizing={false}
      bounds="parent"
      // Small threshold so a click isn't swallowed as a micro-drag.
      dragGrid={[1, 1]}
      cancel=".icon-nodrag"
    >
      <button
        type="button"
        data-icon-id={iconId}
        aria-pressed={selected}
        onClick={handleClick}
        onDoubleClick={activate}
        onContextMenu={handleContextMenu}
        className={`group flex h-full w-full flex-col items-center gap-2 rounded-lg p-2 text-center outline-none ${
          selected ? "bg-sky/20 ring-2 ring-sky" : "hover:bg-paper/5"
        }`}
      >
        <span
          aria-hidden
          className={`flex h-14 w-14 items-center justify-center text-lg font-semibold text-paper shadow-md transition-transform group-active:scale-95 ${
            kind === "exe"
              ? "rounded-md border-2 border-dashed border-zinc-400 bg-zinc-600 font-mono"
              : "rounded-2xl bg-zinc-500"
          }`}
        >
          {kind === "exe" ? "EXE" : label.charAt(0)}
        </span>
        <span className="font-ui text-xs font-medium leading-tight text-paper">
          {label}
        </span>
      </button>
    </Rnd>
  );
}
