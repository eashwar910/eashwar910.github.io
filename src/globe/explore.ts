import type { Pose } from './cameraPath';

/** Resting view of the globe: Africa, Europe and Asia in frame so several landmarks show at once. */
export const EXPLORE_POSE: Pose = { lon: 55, lat: 25, height: 24_000_000, heading: 0, pitch: -90 };
export const MAX_HEIGHT = 30_000_000;
export const MIN_HEIGHT = 1_500_000;
export const LANDMARK_HEIGHT = 1_300_000;

/** Sine in-out: gentler at the ends than a cubic, so a climb through the imagery layers does not stall then rush. */
export const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;

const wrap = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180;

/** Pose between a and b: shortest way round in longitude and heading, height in log space (so the climb feels even). */
export function lerpPose(a: Pose, b: Pose, t: number): Pose {
  const l = (x: number, y: number) => x + (y - x) * t;
  return {
    lon: wrap(a.lon + wrap(b.lon - a.lon) * t),
    lat: l(a.lat, b.lat),
    height: Math.exp(l(Math.log(a.height), Math.log(b.height))),
    heading: wrap(a.heading + wrap(b.heading - a.heading) * t),
    pitch: l(a.pitch, b.pitch),
  };
}

const KM_PER_DEG = 111.32;

const rad = (d: number) => (d * Math.PI) / 180;
/** Ground distance (km) between a camera and the point at screen centre. */
const backKm = (p: Pose) => p.height / 1000 / Math.tan(rad(Math.min(-p.pitch, 90)) || 1e-6);

/**
 * Camera position for a "look-at" pose: lon/lat is the ground point at screen centre, and the camera steps back
 * along the heading so a tilted view stays centred on it (same maths as `cameraAt`).
 */
export function fromLookAt(look: Pose): Pose {
  const back = backKm(look);
  const h = rad(look.heading);
  return {
    ...look,
    lon: wrap(look.lon - (back * Math.sin(h)) / (KM_PER_DEG * Math.cos(rad(look.lat)))),
    lat: look.lat - (back * Math.cos(h)) / KM_PER_DEG,
  };
}

/** Inverse of `fromLookAt`: the ground point a camera is looking at. */
export function toLookAt(cam: Pose): Pose {
  const back = backKm(cam);
  const h = rad(cam.heading);
  const lat = cam.lat + (back * Math.cos(h)) / KM_PER_DEG;
  return { ...cam, lon: wrap(cam.lon + (back * Math.sin(h)) / (KM_PER_DEG * Math.cos(rad(lat)))), lat };
}
const HALF_FOV_TAN = Math.tan(Math.PI / 6); // Cesium default: a 60 degree field of view along the longer screen side

/**
 * Top-down pose that frames a landmark at `at` (fractions of screen: x from the left, y from the top),
 * so it can sit beside a side panel or above a bottom sheet instead of dead centre.
 */
export function landmarkPose(
  lm: { lon: number; lat: number },
  at: { x: number; y: number },
  aspect: number,
  height = LANDMARK_HEIGHT,
): Pose {
  const longKm = 2 * (height / 1000) * HALF_FOV_TAN;
  const widthKm = aspect >= 1 ? longKm : longKm * aspect;
  const heightKm = aspect >= 1 ? longKm / aspect : longKm;
  const lat = lm.lat - (0.5 - at.y) * (heightKm / KM_PER_DEG);
  const lon = lm.lon - (at.x - 0.5) * (widthKm / (KM_PER_DEG * Math.cos((lm.lat * Math.PI) / 180)));
  return { lon: wrap(lon), lat: Math.min(Math.max(lat, -85), 85), height, heading: 0, pitch: -90 };
}

/** Great-circle angle between two points, degrees. */
export function angleBetween(a: { lon: number; lat: number }, b: { lon: number; lat: number }): number {
  const s =
    Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lon - a.lon) / 2) ** 2;
  return (2 * Math.asin(Math.min(1, Math.sqrt(s))) * 180) / Math.PI;
}

const WORDS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];

/** Compass word for the initial bearing from a to b. North is up on screen in explore mode. */
export function bearingWord(a: { lon: number; lat: number }, b: { lon: number; lat: number }): string {
  const dl = rad(b.lon - a.lon);
  const y = Math.sin(dl) * Math.cos(rad(b.lat));
  const x = Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) - Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(dl);
  const deg = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  return WORDS[Math.round(deg / 45) % 8];
}
