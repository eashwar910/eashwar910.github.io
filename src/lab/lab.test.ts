import { describe, expect, it } from 'vitest';
import { DURATION_MS, MISS_PENALTY, multiplier, newGame, step, tap } from './fallow';
import { BOT_ACCURACY, botAnswers, countCorrect, makeDeck } from './fruit';
import { fromPoints, makeSeedling, measure, scoreRound, TOLERANCE } from './radicle';
import { mulberry32 } from './rng';

const straight = fromPoints(Array.from({ length: 101 }, (_, i) => ({ x: 200, y: 50 + i })));

describe('radicle', () => {
  it('scores exact clicks 100 and gives nothing for a wild guess', () => {
    const m = measure(straight, { x: 200, y: 50 }, { x: 200, y: 150 });
    expect(m.measured).toBeCloseTo(100);
    expect(scoreRound(m.measured, 100, m.off)).toBe(100);
    expect(scoreRound(50, 100)).toBe(0);
  });
  it('gets worse as the error grows', () => {
    expect(scoreRound(95, 100)).toBeGreaterThan(scoreRound(85, 100));
    expect(scoreRound(85, 100)).toBeGreaterThan(scoreRound(75, 100));
  });
  it('does not reward clicking in the open instead of on the root', () => {
    // far above and below the root: it snaps to the ends, but the off-root distance costs points
    const m = measure(straight, { x: 200, y: -100 }, { x: 200, y: 400 });
    expect(m.off).toBeGreaterThan(TOLERANCE);
    expect(scoreRound(m.measured, 100, m.off)).toBe(0);
  });
  it('makes roots with a positive, varied length', () => {
    const a = makeSeedling(mulberry32(1));
    const b = makeSeedling(mulberry32(2));
    expect(a.length).toBeGreaterThan(100);
    expect(a.length).not.toBeCloseTo(b.length, 0);
  });
});

describe('fruit', () => {
  it('deals a balanced deck', () => {
    const d = makeDeck(mulberry32(3));
    expect(d).toHaveLength(10);
    expect(d.filter((c) => c.rotten)).toHaveLength(5);
  });
  it('bot hits its scripted accuracy exactly', () => {
    const d = makeDeck(mulberry32(4));
    expect(countCorrect(d, botAnswers(d, BOT_ACCURACY, mulberry32(5)))).toBe(8);
  });
  it('counts correct answers', () => {
    const d = makeDeck(mulberry32(6));
    expect(
      countCorrect(
        d,
        d.map((c) => c.rotten),
      ),
    ).toBe(10);
    expect(
      countCorrect(
        d,
        d.map((c) => !c.rotten),
      ),
    ).toBe(0);
  });
});

describe('fallow', () => {
  const rng = mulberry32(7);

  it('rewards workable taps with a growing chain and resets on a miss', () => {
    let g = newGame(rng);
    // force known states
    g = {
      ...g,
      cells: g.cells.map((_, i) =>
        i < 3 ? { phase: 'workable', left: 2000 } : { phase: 'wet', left: 2000 },
      ),
    };
    g = tap(tap(tap(g, 0), 1), 2);
    expect(g.chain).toBe(3);
    expect(g.score).toBe(10 + 12 + 14);
    g = tap(g, 5); // wet: a miss
    expect(g.chain).toBe(0);
    expect(g.score).toBe(36 - MISS_PENALTY);
    expect(g.bestChain).toBe(3);
  });
  it('never goes below zero and ignores sown fields', () => {
    let g = newGame(rng);
    g = { ...g, cells: g.cells.map(() => ({ phase: 'dry' as const, left: 2000 })) };
    expect(tap(g, 0).score).toBe(0);
    const sown = { ...g, cells: g.cells.map(() => ({ phase: 'sown' as const, left: 1500 })) };
    expect(tap(sown, 0)).toBe(sown);
  });
  it('multiplier caps at 3x', () => {
    expect(multiplier(0)).toBe(1);
    expect(multiplier(50)).toBeCloseTo(3);
  });
  it('ends after the duration and cycles every field', () => {
    let g = newGame(rng);
    const seen = new Set<string>();
    for (let t = 0; t < DURATION_MS; t += 100) {
      g = step(g, 100, rng);
      g.cells.forEach((c) => seen.add(c.phase));
    }
    expect(g.done).toBe(true);
    expect(g.timeLeft).toBe(0);
    expect(['wet', 'workable', 'dry'].every((p) => seen.has(p))).toBe(true);
  });
});
