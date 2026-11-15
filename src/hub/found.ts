import { useCallback, useState } from 'react';
import { isSection, type Section } from './route';

const KEY = 'found';

function load(): Section[] {
  try {
    const raw: unknown = JSON.parse(sessionStorage.getItem(KEY) ?? '[]');
    return Array.isArray(raw) ? raw.filter(isSection) : [];
  } catch {
    return []; // storage blocked or corrupt: start the hunt again
  }
}

/** Landmarks the visitor has opened this session. */
export function useFound() {
  const [found, set] = useState<Section[]>(load);
  const add = useCallback((s: Section) => {
    set((f) => {
      if (f.includes(s)) return f;
      const next = [...f, s];
      try {
        sessionStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* storage blocked: the counter just resets on refresh */
      }
      return next;
    });
  }, []);
  return [found, add] as const;
}
