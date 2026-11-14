export interface Waypoint {
  /** scroll progress 0..1; chapter i is centred on screen at progress i/10 */
  p: number;
  lon: number;
  lat: number;
  /** km above the ellipsoid */
  hKm: number;
  /** degrees, -90 = straight down */
  pitch: number;
  /** part of the sideways glides; dropped by STRAIGHT_ZOOM */
  detour?: boolean;
}

export interface Pose {
  lon: number;
  lat: number;
  /** metres */
  height: number;
  heading: number;
  pitch: number;
}

// lon/lat is the point the camera looks at; cameraAt moves the camera back so tilted views stay centred on it.
// Coordinates are approximate (DESIGN.md section 2).
export const WAYPOINTS: Waypoint[] = [
  { p: 0.0, lon: 80, lat: 10, hKm: 25000, pitch: -90 }, // 0 orbit
  { p: 0.1, lon: 80, lat: 15, hKm: 9000, pitch: -90 }, // 1 age 12
  { p: 0.2, lon: 80.3, lat: 14, hKm: 2500, pitch: -90 }, // 2 detour
  { p: 0.3, lon: 80.27, lat: 13.08, hKm: 900, pitch: -80 }, // 3 age 16, Chennai region
  { p: 0.33, lon: 80.27, lat: 13.08, hKm: 800, pitch: -80 },
  { p: 0.36, lon: 91, lat: 8, hKm: 1400, pitch: -90, detour: true }, // glide arc over the Bay of Bengal
  { p: 0.4, lon: 101.875, lat: 2.945, hKm: 300, pitch: -90, detour: true }, // 4 Malaysia
  { p: 0.5, lon: 101.875, lat: 2.945, hKm: 40, pitch: -70, detour: true }, // 5 seeds
  { p: 0.6, lon: 101.875, lat: 2.945, hKm: 30, pitch: -70, detour: true }, // 6 Farmer Buddy
  { p: 0.7, lon: 101.875, lat: 2.945, hKm: 30, pitch: -70, detour: true }, // 7 back for more
  { p: 0.8, lon: 109.3, lat: 4.1, hKm: 2600, pitch: -90, detour: true }, // 8 community: all of Malaysia (peninsula + Borneo) in frame
  { p: 0.85, lon: 93, lat: 12, hKm: 1500, pitch: -90, detour: true }, // glide arc back across
  { p: 0.88, lon: 83.49, lat: 20.72, hKm: 260, pitch: -90, detour: true }, // 9 Bolangir
  { p: 0.93, lon: 86.93, lat: 21.49, hKm: 260, pitch: -90, detour: true }, // 9 Baleswar
  { p: 1.0, lon: 80.2707, lat: 13.0827, hKm: 3, pitch: -35 }, // 10 Chennai, tilt ~55deg from vertical
];

export function waypointsFor(straight: boolean): Waypoint[] {
  return straight ? WAYPOINTS.filter((w) => !w.detour) : WAYPOINTS;
}

/** Monotone cubic Hermite (Fritsch-Carlson): C1 smooth, never overshoots, flat across equal neighbours (holds). */
function monotone(xs: number[], ys: number[], x: number): number {
  const n = xs.length;
  const d = xs.slice(1).map((_, i) => (ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
  const m = ys.map((_, i) => {
    if (i === 0) return d[0];
    if (i === n - 1) return d[n - 2];
    return d[i - 1] * d[i] <= 0 ? 0 : (2 * d[i - 1] * d[i]) / (d[i - 1] + d[i]);
  });
  let i = Math.min(Math.max(xs.findIndex((v) => v > x) - 1, 0), n - 2);
  if (x >= xs[n - 1]) i = n - 2;
  const h = xs[i + 1] - xs[i];
  const t = (x - xs[i]) / h;
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    (2 * t3 - 3 * t2 + 1) * ys[i] +
    (t3 - 2 * t2 + t) * h * m[i] +
    (-2 * t3 + 3 * t2) * ys[i + 1] +
    (t3 - t2) * h * m[i + 1]
  );
}

/** Unwrap longitudes so each step takes the shortest arc. */
function unwrap(lons: number[]): number[] {
  const out = [lons[0]];
  for (let i = 1; i < lons.length; i++) {
    let l = lons[i];
    while (l - out[i - 1] > 180) l -= 360;
    while (l - out[i - 1] < -180) l += 360;
    out.push(l);
  }
  return out;
}

const KM_PER_DEG = 111.32;

/** Camera pose for scroll progress 0..1. Pure. */
/** `heading` (degrees) swings the view around the look-at point; the hub uses it for a slow drift. */
export function cameraAt(progress: number, straight = false, heading = 0): Pose {
  const w = waypointsFor(straight);
  const p = Math.min(Math.max(progress, 0), 1);
  const xs = w.map((v) => v.p);
  const lon = monotone(xs, unwrap(w.map((v) => v.lon)), p);
  const lat = monotone(
    xs,
    w.map((v) => v.lat),
    p,
  );
  const hKm = Math.exp(
    monotone(
      xs,
      w.map((v) => Math.log(v.hKm)),
      p,
    ),
  );
  const pitch = monotone(
    xs,
    w.map((v) => v.pitch),
    p,
  );

  // Step back along the heading so the tilted view stays centred on lon/lat.
  const back = hKm / Math.tan((-pitch * Math.PI) / 180);
  const rad = (heading * Math.PI) / 180;
  const lonPos = lon - (back * Math.sin(rad)) / (KM_PER_DEG * Math.cos((lat * Math.PI) / 180));
  return {
    lon: ((((lonPos + 180) % 360) + 360) % 360) - 180,
    lat: lat - (back * Math.cos(rad)) / KM_PER_DEG,
    height: hKm * 1000,
    heading,
    pitch,
  };
}
