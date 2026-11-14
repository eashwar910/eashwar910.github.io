import type { Pose } from './cameraPath';

/** Keeps Cesium behind one small surface so the globe can be swapped (see METHOD.md "Globe fallback"). */
export interface GlobeEngine {
  setCamera(pose: Pose): void;
  /** Resolves once imagery for the current view has loaded (callers add their own timeout). */
  whenReady(): Promise<void>;
  /** Screen position (px, viewport space) of a lon/lat, or null if it cannot be projected. */
  project(lon: number, lat: number): { x: number; y: number } | null;
  /** Cheaper rendering for the hub backdrop (lower resolution, coarser tiles). */
  setLowPower(on: boolean): void;
  destroy(): void;
}

/** Cesium is a dynamic import so it ships in its own chunk. */
export async function createGlobe(container: HTMLElement): Promise<GlobeEngine> {
  (window as unknown as { CESIUM_BASE_URL: string }).CESIUM_BASE_URL = '/cesium/'; // see scripts/copy-cesium.mjs
  const { createCesiumEngine } = await import('./cesiumEngine');
  return createCesiumEngine(container);
}
