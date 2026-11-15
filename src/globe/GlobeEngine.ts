import type { Pose } from './cameraPath';

/** Keeps Cesium behind one small surface so the globe can be swapped (see METHOD.md "Globe fallback"). */
export interface GlobeEngine {
  setCamera(pose: Pose): void;
  /** Resolves once imagery for the current view has loaded (callers add their own timeout). */
  whenReady(): Promise<void>;
  /** Screen position (px, viewport space) of a lon/lat, or null if it cannot be projected or is on the far side of the globe. */
  project(lon: number, lat: number): { x: number; y: number } | null;
  /** Where the camera is now (also after the user has dragged it). */
  getCamera(): Pose;
  /** Explore mode: let the user rotate and zoom (never tilt) within height limits. Off = scroll or code drives the camera. */
  setInputs(on: boolean, minHeight: number, maxHeight: number): void;
  /** Spin the globe about its axis by this many degrees (positive = eastward as seen on screen). */
  rotate(deg: number): void;
  /** Draw a frame now (the engine renders on request only). */
  render(): void;
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
