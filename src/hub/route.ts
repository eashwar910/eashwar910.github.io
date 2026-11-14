import { useSyncExternalStore } from 'react';

export const SECTIONS = ['timeline', 'projects', 'lab', 'about', 'skills', 'contact'] as const;
export type Section = (typeof SECTIONS)[number];
export const DEFAULT_SECTION: Section = 'timeline';

/** '#/projects' -> 'projects'. Anything else (including '#/') -> null, meaning "the descent". */
export function parseHash(hash: string): Section | null {
  const name = hash.replace(/^#\/?/, '');
  return (SECTIONS as readonly string[]).includes(name) ? (name as Section) : null;
}

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};

/** Current hub section from the URL hash, or null. */
export const useSection = (): Section | null =>
  parseHash(useSyncExternalStore(subscribe, () => location.hash));

export const goto = (section: Section | null) => {
  location.hash = section ? `/${section}` : '/';
};

// "Intro seen" lives in sessionStorage so a refresh lands on the hub instead of replaying the descent.
const KEY = 'introSeen';
export const introSeen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};
export const setIntroSeen = (seen: boolean) => {
  try {
    if (seen) sessionStorage.setItem(KEY, '1');
    else sessionStorage.removeItem(KEY);
  } catch {
    /* storage blocked: the descent just replays on refresh */
  }
};

export const replayDescent = () => {
  setIntroSeen(false);
  goto(null);
};
