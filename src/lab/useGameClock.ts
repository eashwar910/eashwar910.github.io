import { useEffect, useRef } from 'react';

/**
 * Calls onTick(dtMs) every `everyMs` while `running`. Game time pauses while the tab is hidden:
 * ticks are skipped, and dt is capped so coming back never jumps the clock.
 */
export function useGameClock(running: boolean, onTick: (dtMs: number) => void, everyMs = 100) {
  const cb = useRef(onTick);
  useEffect(() => {
    cb.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      const dt = Math.min(now - last, 250);
      last = now;
      if (!document.hidden) cb.current(dt);
    }, everyMs);
    return () => clearInterval(id);
  }, [running, everyMs]);
}
