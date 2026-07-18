"use client";

import { useCallback } from "react";
import type { RndDragCallback, DraggableData } from "react-rnd";
import { useDesktopStore } from "@/store/desktopStore";
import type { IconPosition } from "@/types/content";

// Bridges a single icon to the store's position record: reads its current position (falling back
// to the frontmatter default) and persists the new position on drag stop. Kept out of the render
// component so drag wiring stays testable in isolation (CLAUDE.md coding conventions).

interface UseDraggableIcon {
  position: IconPosition;
  onDragStop: RndDragCallback;
}

export function useDraggableIcon(
  iconId: string,
  defaultPosition: IconPosition
): UseDraggableIcon {
  const stored = useDesktopStore((s) => s.positions[iconId]);
  const setIconPosition = useDesktopStore((s) => s.setIconPosition);

  const position = stored ?? defaultPosition;

  const onDragStop = useCallback<RndDragCallback>(
    (_e, d: DraggableData) => {
      setIconPosition(iconId, { x: d.x, y: d.y });
    },
    [iconId, setIconPosition]
  );

  return { position, onDragStop };
}
