type RGB = [number, number, number];

// Space palette (cool, deep navy) -> daylight palette (warm, earthy). Text stays white on both scrims.
const SPACE = { scrim: [6, 12, 32, 0.55], accent: [74, 222, 128] };
const DAY = { scrim: [38, 26, 14, 0.62], accent: [232, 165, 75] };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => lerp(v, b[i], t));

/** 0 = daylight (<= 300 km), 1 = space (>= 8,000 km), smooth in log altitude. */
export function spaceness(heightM: number): number {
  const lo = Math.log(300);
  const hi = Math.log(8000);
  const t = Math.min(Math.max((Math.log(heightM / 1000) - lo) / (hi - lo), 0), 1);
  return t * t * (3 - 2 * t);
}

const rgb = (c: number[]) => `rgb(${c.map(Math.round).join(' ')})`;

/** CSS variable values for a camera height in metres. */
export function themeAt(heightM: number): { scrim: string; accent: string } {
  const t = spaceness(heightM);
  const [r, g, b, a] = mix(DAY.scrim, SPACE.scrim, t);
  return {
    scrim: `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)} / ${a.toFixed(2)})`,
    accent: rgb(mix(DAY.accent as RGB, SPACE.accent as RGB, t)),
  };
}

const ramp = (x: number, a: number, b: number) => Math.min(Math.max((x - a) / (b - a), 0), 1);

/** Odisha overlay opacity over scroll progress: fades in just before Bolangir, out as the camera heads home. */
export function odishaOpacity(p: number): number {
  return ramp(p, 0.84, 0.87) * (1 - ramp(p, 0.95, 0.98));
}

/** How much of the user's drag-rotation applies at scroll progress p: full in orbit, eased out by the time chapter 1 arrives. */
export function spinWeight(p: number): number {
  return 1 - ramp(p, 0.02, 0.1);
}
