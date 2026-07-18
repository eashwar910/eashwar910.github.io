"use client";

import { useCallback, useRef, useState } from "react";

// Marquee (box) selection, isolated from render so the geometry can be reasoned about and
// unit-tested independently (CLAUDE.md coding conventions). The two helpers below are pure and
// side-effect free; the hook only wires them to pointer events.

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IconRect {
  iconId: string;
  rect: Rect;
}

// Axis-aligned bounding-box overlap test. Pure — safe to unit test in isolation.
export function rectsIntersect(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Which icons fall inside the marquee. Pure — safe to unit test in isolation.
export function iconIdsInRect(marquee: Rect, icons: IconRect[]): string[] {
  return icons.filter((i) => rectsIntersect(marquee, i.rect)).map((i) => i.iconId);
}

// Normalise two corner points (in any order) into a positive-size rect.
function rectFromPoints(
  a: { x: number; y: number },
  b: { x: number; y: number }
): Rect {
  return {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };
}

interface UseMarqueeSelectOptions {
  // Live icon rects in viewport coordinates (getBoundingClientRect space).
  getIconRects: () => IconRect[];
  // Called with the currently-intersecting iconIds as the box is dragged.
  onSelect: (iconIds: string[]) => void;
}

interface UseMarqueeSelect {
  // The live marquee rect (viewport coords) while dragging, else null.
  marquee: Rect | null;
  // Attach to the desktop background's onMouseDown.
  onBackgroundMouseDown: (e: React.MouseEvent) => void;
}

export function useMarqueeSelect({
  getIconRects,
  onSelect,
}: UseMarqueeSelectOptions): UseMarqueeSelect {
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const [marquee, setMarquee] = useState<Rect | null>(null);

  const onBackgroundMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return; // left button only
      const start = { x: e.clientX, y: e.clientY };
      startRef.current = start;
      // Pressing on empty desktop clears the current selection; a drag then re-populates it.
      onSelect([]);

      const handleMove = (ev: MouseEvent) => {
        if (!startRef.current) return;
        const rect = rectFromPoints(startRef.current, { x: ev.clientX, y: ev.clientY });
        setMarquee(rect);
        onSelect(iconIdsInRect(rect, getIconRects()));
      };

      const handleUp = () => {
        startRef.current = null;
        setMarquee(null);
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
      };

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
    },
    [getIconRects, onSelect]
  );

  return { marquee, onBackgroundMouseDown };
}
