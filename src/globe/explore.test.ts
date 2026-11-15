import { describe, expect, it } from 'vitest';
import { landmarks } from '../content/landmarks';
import { SECTIONS, parseHash } from '../hub/route';
import { angleBetween, bearingWord, ease, EXPLORE_POSE, fromLookAt, landmarkPose, lerpPose, toLookAt } from './explore';

describe('lerpPose', () => {
  it('hits both ends and takes the short way over the antimeridian', () => {
    const a = { ...EXPLORE_POSE, lon: 170, height: 1000 };
    const b = { ...EXPLORE_POSE, lon: -170, height: 100_000 };
    expect(lerpPose(a, b, 0).lon).toBeCloseTo(170);
    expect(lerpPose(a, b, 1).lon).toBeCloseTo(-170);
    expect(Math.abs(lerpPose(a, b, 0.5).lon)).toBeCloseTo(180);
    expect(lerpPose(a, b, 0.5).height).toBeCloseTo(10_000, 0); // geometric mean
  });
  it('ease runs 0 to 1 and is symmetric', () => {
    expect(ease(0)).toBe(0);
    expect(ease(1)).toBe(1);
    expect(ease(0.5)).toBeCloseTo(0.5);
  });
});

describe('look-at poses', () => {
  const chennai = { lon: 80.2707, lat: 13.0827, height: 3000, heading: 0, pitch: -35 };
  it('a tilted camera sits south of what it looks at, and the round trip is exact', () => {
    const cam = fromLookAt(chennai);
    expect(cam.lat).toBeLessThan(chennai.lat);
    const back = toLookAt(cam);
    expect(back.lat).toBeCloseTo(chennai.lat, 6);
    expect(back.lon).toBeCloseTo(chennai.lon, 6);
  });
  it('top-down is the identity', () => {
    const top = fromLookAt(EXPLORE_POSE);
    expect(top.lat).toBeCloseTo(EXPLORE_POSE.lat, 6);
    expect(top.lon).toBeCloseTo(EXPLORE_POSE.lon, 6);
  });
  it('keeps the look-at point steady while the pull-back tilts up, so the globe stays centred', () => {
    // Every frame of a Chennai-to-resting-globe flight looks at a point on the line between the two.
    for (const t of [0.1, 0.3, 0.5, 0.7, 0.9]) {
      const look = lerpPose(chennai, EXPLORE_POSE, ease(t));
      const cam = fromLookAt(look);
      const seen = toLookAt(cam);
      expect(seen.lon).toBeCloseTo(look.lon, 4);
      expect(seen.lat).toBeCloseTo(look.lat, 4);
    }
  });
});

describe('landmarkPose', () => {
  it('centred target puts the camera right above it', () => {
    const lm = { lon: 31, lat: 30 };
    const p = landmarkPose(lm, { x: 0.5, y: 0.5 }, 16 / 9);
    expect(p.lon).toBeCloseTo(31);
    expect(p.lat).toBeCloseTo(30);
  });
  it('a landmark right of centre means the camera looks west of it', () => {
    expect(landmarkPose({ lon: 31, lat: 30 }, { x: 0.7, y: 0.5 }, 16 / 9).lon).toBeLessThan(31);
  });
  it('on a portrait phone the 60 degree fov runs along the height', () => {
    const p = landmarkPose({ lon: 31, lat: 30 }, { x: 0.5, y: 0.2 }, 375 / 740);
    expect(30 - p.lat).toBeCloseTo((0.3 * (2 * 1300 * Math.tan(Math.PI / 6))) / 111.32, 3);
  });
  it('a landmark above centre means the camera looks south of it', () => {
    expect(landmarkPose({ lon: 31, lat: 30 }, { x: 0.5, y: 0.25 }, 0.5).lat).toBeLessThan(30);
  });
});

describe('hints', () => {
  it('angleBetween: quarter turn along the equator is 90 degrees', () => {
    expect(angleBetween({ lon: 0, lat: 0 }, { lon: 90, lat: 0 })).toBeCloseTo(90);
  });
  it('bearingWord names the direction', () => {
    expect(bearingWord({ lon: 0, lat: 0 }, { lon: 40, lat: 0 })).toBe('east');
    expect(bearingWord({ lon: 0, lat: 0 }, { lon: 0, lat: -40 })).toBe('south');
    expect(bearingWord({ lon: 50, lat: 20 }, { lon: 100, lat: 3 })).toBe('east');
  });
});

describe('landmarks config', () => {
  it('has exactly one landmark per section, on the real planet', () => {
    expect(landmarks.map((l) => l.section).sort()).toEqual([...SECTIONS].sort());
    for (const l of landmarks) {
      expect(Math.abs(l.lat)).toBeLessThanOrEqual(90);
      expect(Math.abs(l.lon)).toBeLessThanOrEqual(180);
    }
  });
  it('keeps the markers far enough apart to hit separately at the resting view', () => {
    for (const a of landmarks)
      for (const b of landmarks) if (a !== b) expect(angleBetween(a, b)).toBeGreaterThan(8);
  });
});

describe('routes', () => {
  it('parses every shape', () => {
    expect(parseHash('')).toEqual({ mode: 'descent' });
    expect(parseHash('#/')).toEqual({ mode: 'descent' });
    expect(parseHash('#/explore')).toEqual({ mode: 'explore', section: null });
    expect(parseHash('#/projects')).toEqual({ mode: 'explore', section: 'projects' });
    expect(parseHash('#/rice-fallow')).toEqual({ mode: 'explore', section: 'rice-fallow' });
    expect(parseHash('#/all')).toEqual({ mode: 'all', section: null });
    expect(parseHash('#/all/lab')).toEqual({ mode: 'all', section: 'lab' });
    expect(parseHash('#/nonsense')).toEqual({ mode: 'descent' });
  });
});
