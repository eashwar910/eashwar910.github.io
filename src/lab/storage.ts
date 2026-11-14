export type GameId = 'radicle' | 'fruit' | 'fallow';

const key = (g: GameId) => `lab:best:${g}`;

export function getBest(g: GameId): number | null {
  try {
    const v = localStorage.getItem(key(g));
    return v === null ? null : Number(v);
  } catch {
    return null; // storage blocked: scores just do not persist
  }
}

/** Saves if it beats the stored best. Returns the best after the call. */
export function saveBest(g: GameId, score: number): number {
  const best = getBest(g);
  if (best !== null && best >= score) return best;
  try {
    localStorage.setItem(key(g), String(score));
  } catch {
    /* ignore */
  }
  return score;
}
