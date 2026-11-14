import { describe, expect, it } from 'vitest';
import { cameraAt, WAYPOINTS } from './cameraPath';

const samples = (straight: boolean) => Array.from({ length: 2001 }, (_, i) => cameraAt(i / 2000, straight));

describe('cameraAt', () => {
  it('starts in orbit and ends over Chennai', () => {
    const a = cameraAt(0);
    expect(a.height).toBeCloseTo(25_000_000, -3);
    expect(a.lon).toBeCloseTo(80, 3);
    const b = cameraAt(1);
    expect(b.height).toBeCloseTo(3000, 3);
    expect(b.lon).toBeCloseTo(80.2707, 3);
    expect(Math.abs(b.lat - 13.0827)).toBeLessThan(0.1); // camera sits back from the look-at point
  });

  it('hits every waypoint height', () => {
    for (const w of WAYPOINTS) expect(cameraAt(w.p).height).toBeCloseTo(w.hKm * 1000, 0);
  });

  it('clamps out-of-range progress', () => {
    expect(cameraAt(-1)).toEqual(cameraAt(0));
    expect(cameraAt(2)).toEqual(cameraAt(1));
  });

  it('descends monotonically with STRAIGHT_ZOOM', () => {
    const s = samples(true);
    for (let i = 1; i < s.length; i++) expect(s[i].height).toBeLessThanOrEqual(s[i - 1].height + 1e-6);
  });

  it('glide path only climbs on the two glides', () => {
    const s = samples(false);
    for (let i = 1; i < s.length; i++) {
      const p = i / 2000;
      const inGlide = (p > 0.33 && p < 0.4) || (p > 0.7 && p < 0.88);
      if (!inGlide) expect(s[i].height).toBeLessThanOrEqual(s[i - 1].height + 1e-6);
    }
  });

  it('never jumps in position or height between neighbouring samples', () => {
    for (const straight of [true, false]) {
      const s = samples(straight);
      for (let i = 1; i < s.length; i++) {
        expect(Math.abs(s[i].lon - s[i - 1].lon)).toBeLessThan(0.5);
        expect(Math.abs(s[i].lat - s[i - 1].lat)).toBeLessThan(0.5);
        expect(s[i].height / s[i - 1].height).toBeLessThan(1.1);
        expect(s[i - 1].height / s[i].height).toBeLessThan(1.1);
      }
    }
  });

  it('STRAIGHT_ZOOM skips Malaysia and Odisha', () => {
    for (const p of [0.5, 0.6, 0.88]) {
      expect(cameraAt(p, true).lon).toBeLessThan(85);
      expect(cameraAt(p, false).height).not.toBeCloseTo(cameraAt(p, true).height, -2);
    }
    expect(cameraAt(0.5, false).lon).toBeCloseTo(101.875, 1);
  });

  it('keeps the look-at point fixed while heading swings', () => {
    // The camera orbits Chennai: its distance from the look-at point stays constant.
    const dist = (h: number) => {
      const c = cameraAt(1, false, h);
      const dx = (c.lon - 80.2707) * Math.cos((13.0827 * Math.PI) / 180);
      return Math.hypot(dx, c.lat - 13.0827);
    };
    expect(dist(25)).toBeCloseTo(dist(0), 5);
    expect(cameraAt(1, false, 25).heading).toBe(25);
  });
});
