import { between, type Rng } from './rng';

export interface Pt {
  x: number;
  y: number;
}
export interface Seedling {
  points: Pt[];
  /** cumulative arc length at each point */
  cum: number[];
  length: number;
}

export const ROUNDS = 5;
/** Clicks within this many units of the root count as "on the root". */
export const TOLERANCE = 12;
/** Relative length error at which the length score reaches zero. */
const MAX_ERR = 0.3;
/** Display scale: 10 drawing units = 1 mm (simulated, not a real microscope). */
export const toMm = (units: number) => units / 10;

const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);

export function fromPoints(points: Pt[]): Seedling {
  const cum = [0];
  for (let i = 1; i < points.length; i++) cum.push(cum[i - 1] + dist(points[i - 1], points[i]));
  return { points, cum, length: cum[cum.length - 1] };
}

/** A root curving down from the seed: cubic Bezier with random length and bends, sampled as a polyline. */
export function makeSeedling(rng: Rng): Seedling {
  const len = between(rng, 120, 220);
  const x0 = between(rng, 170, 230);
  const y0 = 45;
  const p = [
    { x: x0, y: y0 },
    { x: x0 + between(rng, -60, 60), y: y0 + len * 0.35 },
    { x: x0 + between(rng, -60, 60), y: y0 + len * 0.7 },
    { x: x0 + between(rng, -40, 40), y: y0 + len },
  ];
  const N = 120;
  const points = Array.from({ length: N + 1 }, (_, i) => {
    const t = i / N;
    const u = 1 - t;
    const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
    return { x: w.reduce((s, k, j) => s + k * p[j].x, 0), y: w.reduce((s, k, j) => s + k * p[j].y, 0) };
  });
  return fromPoints(points);
}

/** Nearest point of the root to a click: its index and how far the click was. */
export function project(s: Seedling, p: Pt): { index: number; dist: number } {
  let index = 0;
  let best = Infinity;
  s.points.forEach((q, i) => {
    const d = dist(p, q);
    if (d < best) {
      best = d;
      index = i;
    }
  });
  return { index, dist: best };
}

/** Length along the root between the two clicks, plus how far off the root they landed. */
export function measure(s: Seedling, a: Pt, b: Pt) {
  const pa = project(s, a);
  const pb = project(s, b);
  return {
    measured: Math.abs(s.cum[pa.index] - s.cum[pb.index]),
    off: Math.max(0, pa.dist - TOLERANCE) + Math.max(0, pb.dist - TOLERANCE),
  };
}

/** 0..100: full marks for the right length, falling to zero at 30% error; clicks off the root cost extra. */
export function scoreRound(measured: number, truth: number, off = 0): number {
  const lengthScore = 100 * Math.max(0, 1 - Math.abs(measured - truth) / truth / MAX_ERR);
  return Math.max(0, Math.round(lengthScore - 2 * off));
}
