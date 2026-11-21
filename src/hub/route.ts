import { useMemo, useSyncExternalStore } from 'react';

// Table order from docs/HUB_REDESIGN.md section 3.
export const SECTIONS = ['timeline', 'rice-fallow', 'projects', 'about', 'skills', 'contact', 'lab'] as const;
export type Section = (typeof SECTIONS)[number];

/** descent: the scroll story. explore: the globe (section = an open landmark). all: the plain scrolling page. */
export type Route =
  | { mode: 'descent' }
  | { mode: 'explore'; section: Section | null }
  | { mode: 'all'; section: Section | null };

export const isSection = (s: string | undefined): s is Section => (SECTIONS as readonly string[]).includes(s ?? '');

/** '#/' -> descent, '#/explore' -> globe, '#/projects' -> that landmark open, '#/all/projects' -> Show all scrolled there. */
export function parseHash(hash: string): Route {
  const [a, b] = hash.replace(/^#\/?/, '').split('/');
  if (a === 'explore') return { mode: 'explore', section: null };
  if (a === 'all') return { mode: 'all', section: isSection(b) ? b : null };
  if (isSection(a)) return { mode: 'explore', section: a };
  return { mode: 'descent' };
}

const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};

export const useRoute = (): Route => {
  const hash = useSyncExternalStore(subscribe, () => location.hash);
  return useMemo(() => parseHash(hash), [hash]);
};

export const goto = (path: string | null) => {
  location.hash = path ? `/${path}` : '/';
};

// "Intro seen" lives in sessionStorage so a refresh lands on the globe instead of replaying the descent.
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
