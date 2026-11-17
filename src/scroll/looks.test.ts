import { describe, expect, it } from 'vitest';
import { campusOpacity, odishaOpacity, spaceness, spinWeight, themeAt } from './looks';

describe('themeAt', () => {
  it('is space-coloured in orbit and daylight-coloured near the ground', () => {
    expect(spaceness(25_000_000)).toBe(1);
    expect(spaceness(3000)).toBe(0);
    expect(themeAt(25_000_000).accent).toBe('rgb(74 222 128)');
    expect(themeAt(3000).accent).toBe('rgb(232 165 75)');
  });
  it('shifts monotonically as altitude drops', () => {
    let prev = 1;
    for (let km = 25000; km >= 1; km /= 1.2) {
      const s = spaceness(km * 1000);
      expect(s).toBeLessThanOrEqual(prev);
      prev = s;
    }
  });
});

describe('odishaOpacity', () => {
  it('shows only around chapter 9', () => {
    expect(odishaOpacity(0.5)).toBe(0);
    expect(odishaOpacity(0.9)).toBe(1);
    expect(odishaOpacity(1)).toBe(0);
  });
});

describe('spinWeight', () => {
  it('is full in orbit and gone by chapter 1', () => {
    expect(spinWeight(0)).toBe(1);
    expect(spinWeight(0.1)).toBe(0);
  });
});

describe('campusOpacity', () => {
  it('shows only around the Malaysia chapter', () => {
    expect(campusOpacity(0.3)).toBe(0);
    expect(campusOpacity(0.4)).toBe(1);
    expect(campusOpacity(0.5)).toBe(0);
  });
});
