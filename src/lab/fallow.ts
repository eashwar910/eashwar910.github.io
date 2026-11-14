import { between, type Rng } from './rng';

export type Phase = 'wet' | 'workable' | 'dry' | 'sown';
export interface Cell {
  phase: Phase;
  /** ms until the next phase */
  left: number;
}
export interface Game {
  cells: Cell[];
  timeLeft: number;
  score: number;
  chain: number;
  bestChain: number;
  sown: number;
  misses: number;
  done: boolean;
}

export const SIZE = 6;
export const DURATION_MS = 45_000;
export const POINTS = 10;
export const MISS_PENALTY = 5;

const NEXT: Record<Phase, Phase> = { wet: 'workable', workable: 'dry', dry: 'wet', sown: 'wet' };
const DWELL: Record<Phase, [number, number]> = {
  wet: [2000, 5000],
  workable: [1300, 2400],
  dry: [2000, 5000],
  sown: [1500, 1500],
};
const PHASES: Phase[] = ['wet', 'workable', 'dry'];

/** Points multiplier for the next successful tap, given the current chain. */
export const multiplier = (chain: number) => 1 + Math.min(chain, 10) * 0.2;

export function newGame(rng: Rng): Game {
  const cells = Array.from({ length: SIZE * SIZE }, () => {
    const phase = PHASES[Math.floor(rng() * 3)];
    return { phase, left: between(rng, 300, DWELL[phase][1]) };
  });
  return { cells, timeLeft: DURATION_MS, score: 0, chain: 0, bestChain: 0, sown: 0, misses: 0, done: false };
}

/** Advance time by dt ms (dt must stay below the shortest dwell, 1300 ms). */
export function step(g: Game, dt: number, rng: Rng): Game {
  if (g.done) return g;
  const timeLeft = Math.max(0, g.timeLeft - dt);
  const cells = g.cells.map((c) => {
    let { phase, left } = c;
    left -= dt;
    if (left <= 0) {
      phase = NEXT[phase];
      left += between(rng, ...DWELL[phase]);
    }
    return { phase, left };
  });
  return { ...g, cells, timeLeft, done: timeLeft === 0 };
}

/** Tap a field: +points (with chain multiplier) if workable, otherwise a penalty and the chain resets. */
export function tap(g: Game, i: number): Game {
  const cell = g.cells[i];
  if (g.done || !cell || cell.phase === 'sown') return g;
  if (cell.phase === 'workable') {
    const chain = g.chain + 1;
    const cells = g.cells.map((c, j) => (j === i ? { phase: 'sown' as const, left: DWELL.sown[0] } : c));
    return {
      ...g,
      cells,
      score: g.score + Math.round(POINTS * multiplier(g.chain)),
      chain,
      bestChain: Math.max(g.bestChain, chain),
      sown: g.sown + 1,
    };
  }
  return { ...g, score: Math.max(0, g.score - MISS_PENALTY), chain: 0, misses: g.misses + 1 };
}
