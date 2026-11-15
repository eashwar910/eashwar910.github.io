import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { landmarkFor, landmarks } from '../content/landmarks';
import type { Pose } from '../globe/cameraPath';
import {
  angleBetween,
  bearingWord,
  EXPLORE_POSE,
  ease,
  fromLookAt,
  landmarkPose,
  lerpPose,
  MAX_HEIGHT,
  MIN_HEIGHT,
  toLookAt,
} from '../globe/explore';
import type { GlobeEngine } from '../globe/GlobeEngine';
import { useFound } from './found';
import { goto, replayDescent, SECTIONS, type Section } from './route';
import { LABELS, PANELS } from './sections';

const IDLE_MS = 4000; // stillness before the auto-rotation resumes
const ROTATE_DEG_S = 2;
const HINT_AFTER_MS = 10_000;
const PULL_BACK_MS = 6000;
const FLY_MS = 3200;
const IDLE_FRAME_MS = 33; // auto-rotation draws at ~30 fps; user drags and flights draw every frame
const ARROWS: Record<string, string> = {
  north: '↑',
  'north-east': '↗',
  east: '→',
  'south-east': '↘',
  south: '↓',
  'south-west': '↙',
  west: '←',
  'north-west': '↖',
};

/** Flights are between look-at poses (see fromLookAt), so the view stays centred while the tilt changes. */
interface Flight {
  from: Pose;
  to: Pose;
  t0: number;
  dur: number;
  /** Extra height at mid-flight (x the pose height), so a long hop between landmarks rises and descends instead of skimming. */
  arc: number;
  /** Fraction of the flight spent climbing straight up before the view starts to slide sideways (0 = slide from the start). */
  hold: number;
}

/** The globe as the interface: spin it, find the markers, open one. */
export default function Explore({ engine, section }: { engine: GlobeEngine | null; section: Section | null }) {
  const [found, markFound] = useFound();
  const [hint, setHint] = useState<string | null>(null);
  // False while the camera pulls back from the descent. Decided before the first paint so the overlay never flashes.
  const [settled, setSettled] = useState(() => !engine || engine.getCamera().height >= 1_000_000);
  const markerEls = useRef<Partial<Record<Section, HTMLButtonElement | null>>>({});
  // Everything the animation loop reads lives here, so it never restarts when React state changes.
  const st = useRef({
    section: null as Section | null,
    flight: null as Flight | null,
    returnPose: null as Pose | null,
    lastTouch: 0,
    down: false,
    hover: false, // pointer over a marker: hold still so it can be clicked
    foundAt: Date.now(),
    pullBack: false,
    prevSection: null as Section | null,
  });

  const fly = (to: Pose, dur: number, arc = 0, hold = 0) => {
    if (!engine) return;
    st.current.flight = { from: toLookAt(engine.getCamera()), to, t0: performance.now(), dur, arc, hold };
  };

  // Animation loop: auto-rotation, flights and marker placement.
  useEffect(() => {
    if (!engine) return;
    let raf = 0;
    let lastDraw = 0;
    let last = performance.now();
    const s = st.current;
    const touch = () => (s.lastTouch = performance.now());
    const down = (e: PointerEvent) => {
      if (!(e.target instanceof HTMLCanvasElement)) return;
      s.down = true;
      if (!s.section) s.flight = null; // dragging takes the camera back from a pull-back or return flight
      touch();
    };
    const up = () => {
      s.down = false;
      touch();
    };
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    window.addEventListener('wheel', touch, { passive: true });

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const flying = s.flight !== null;
      const spinning = !flying && !s.section && !s.down && !s.hover && now - s.lastTouch > IDLE_MS;
      if (!flying && s.section) return; // panel open and camera parked: nothing to draw
      if (spinning && now - lastDraw < IDLE_FRAME_MS) return;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      lastDraw = now;
      if (s.flight) {
        const t = Math.min((now - s.flight.t0) / s.flight.dur, 1);
        const f = s.flight;
        const pose = lerpPose(f.from, f.to, ease(t));
        if (f.hold > 0) {
          // Stay over where the tiles are already loaded while low; slide sideways only once high up.
          const slide = lerpPose(f.from, f.to, ease(Math.max(0, (t - f.hold) / (1 - f.hold))));
          pose.lon = slide.lon;
          pose.lat = slide.lat;
        }
        pose.height *= 1 + f.arc * Math.sin(Math.PI * t);
        engine.setCamera(fromLookAt(pose));
        if (t >= 1) {
          s.flight = null;
          if (s.pullBack) {
            s.pullBack = false;
            setSettled(true);
          }
        }
      } else if (spinning) engine.rotate(ROTATE_DEG_S * dt);
      engine.render();

      // Markers: place each one, hide it on the far side of the globe, and label the one nearest the centre.
      const w = window.innerWidth;
      const h = window.innerHeight;
      let near: HTMLButtonElement | null = null;
      let nearD = 0.16 * Math.min(w, h);
      for (const lm of landmarks) {
        const el = markerEls.current[lm.section];
        if (!el) continue;
        const p = engine.project(lm.lon, lm.lat);
        const visible = !!p && p.x > -40 && p.x < w + 40 && p.y > -40 && p.y < h + 40;
        el.dataset.hidden = String(!visible);
        el.dataset.near = 'false';
        if (!p || !visible) continue;
        el.style.transform = `translate(${p.x - 22}px, ${p.y - 22}px)`;
        el.dataset.flip = String(p.x > w * 0.62);
        const d = Math.hypot(p.x - w / 2, p.y - h / 2);
        if (d < nearD) {
          nearD = d;
          near = el;
        }
      }
      if (near) (near as HTMLButtonElement).dataset.near = 'true';
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      window.removeEventListener('wheel', touch);
      engine.setInputs(false, MIN_HEIGHT, MAX_HEIGHT);
    };
  }, [engine]);

  // Open or close a landmark, or pull back from the descent.
  useEffect(() => {
    if (!engine) return;
    const s = st.current;
    s.section = section;
    if (section) {
      markFound(section);
      s.foundAt = Date.now();
      setHint(null);
      if (!s.returnPose) s.returnPose = engine.getCamera();
      engine.setInputs(false, MIN_HEIGHT, MAX_HEIGHT);
      const narrow = window.innerWidth < 768;
      // Park the landmark beside the side panel (desktop) or above the bottom sheet (phone).
      const at = narrow ? { x: 0.5, y: 0.2 } : { x: 0.69, y: 0.5 };
      const lm = landmarkFor(section);
      const cam = engine.getCamera();
      // Already at another landmark (the Next arrow): rise over the gap instead of skimming across it.
      const arc = cam.height < 5_000_000 ? Math.min(angleBetween(cam, lm) / 8, 10) : 0;
      fly(landmarkPose(lm, at, window.innerWidth / window.innerHeight), FLY_MS + arc * 150, arc);
    } else {
      const cam = engine.getCamera();
      if (s.returnPose) fly(s.returnPose, FLY_MS * 0.8);
      else if (cam.height < 1_000_000) {
        // Arriving from the descent: the reverse trip. The overlay waits until the camera has settled.
        s.pullBack = true;
        setSettled(false);
        fly(EXPLORE_POSE, PULL_BACK_MS, 0, 0.4);
      }
      s.returnPose = null;
      s.lastTouch = performance.now();
      engine.setInputs(true, MIN_HEIGHT, MAX_HEIGHT);
      if (s.prevSection) markerEls.current[s.prevSection]?.focus({ preventScroll: true });
    }
    s.prevSection = section;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fly/markFound are stable enough for a route change
  }, [engine, section]);

  // Escape closes the panel.
  useEffect(() => {
    if (!section) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && goto('explore');
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [section]);

  // After a while without a find, point towards the nearest landmark not opened yet.
  useEffect(() => {
    if (!engine || section) return;
    st.current.foundAt = Date.now();
    const id = window.setInterval(() => {
      const left = landmarks.filter((l) => !found.includes(l.section));
      if (!left.length || Date.now() - st.current.foundAt < HINT_AFTER_MS) return setHint(null);
      const cam = engine.getCamera();
      const next = left.reduce((a, b) => (angleBetween(cam, b) < angleBetween(cam, a) ? b : a));
      const word = bearingWord(cam, next);
      setHint(`Something to the ${word}. ${ARROWS[word]}`);
    }, 1000);
    return () => clearInterval(id);
  }, [engine, section, found]);

  const open = section ? landmarkFor(section) : null;
  // Keyboard users tab to a marker on the far side: turn the globe to it.
  const onFocus = (lon: number, lat: number) => (e: React.FocusEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.hidden === 'true' && e.currentTarget.matches(':focus-visible') && engine) {
      fly({ ...engine.getCamera(), lon, lat }, 1600);
      st.current.lastTouch = performance.now();
    }
  };
  const Active = section ? PANELS[section] : null;
  const next = section ? landmarkFor(SECTIONS[(SECTIONS.indexOf(section) + 1) % SECTIONS.length]) : null;

  return (
    <div className="hub pointer-events-none fixed inset-0 z-10" data-intro={!settled}>
      <header className="pointer-events-auto absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 px-5 pt-5 sm:px-9 sm:pt-7">
        <p className="whitespace-nowrap font-hub text-xl italic">Eashwar Siddha</p>
        <nav aria-label="Mode" className="flex items-center gap-4 whitespace-nowrap text-sm sm:gap-7">
          <button type="button" onClick={replayDescent} aria-label="Replay the descent" className="min-h-[44px] text-white/65 hover:text-white">
            Replay<span className="hidden sm:inline"> the descent</span>
          </button>
          <a
            href={section ? `#/all/${section}` : '#/all'}
            className="inline-flex min-h-[44px] items-center border-b border-white/80 font-medium"
          >
            Show all
          </a>
        </nav>
      </header>

      <div role="group" aria-label="Landmarks">
        {SECTIONS.map((sec) => {
          const lm = landmarkFor(sec);
          return (
            <button
              key={sec}
              ref={(el) => {
                markerEls.current[sec] = el;
              }}
              type="button"
              data-hidden="true"
              data-found={found.includes(sec)}
              aria-label={`${lm.name}: ${LABELS[sec]}${found.includes(sec) ? ' (opened)' : ''}`}
              onFocus={onFocus(lm.lon, lm.lat)}
              onPointerEnter={() => (st.current.hover = true)}
              onPointerLeave={() => (st.current.hover = false)}
              onClick={() => goto(sec)}
              className="marker"
            >
              <span className="marker-ring" />
              <span className="marker-dot" />
              <span className="marker-label">
                {lm.name.split(',')[0]}
                <small>{lm.label}</small>
              </span>
            </button>
          );
        })}
      </div>

      {!section && (
        <>
          {hint && (
            <p role="status" className="intro-ui pointer-events-none absolute left-5 top-20 font-hub text-lg italic text-[color:var(--accent)] sm:left-9">
              {hint}
            </p>
          )}
          <div className="intro-ui pointer-events-none absolute inset-x-5 bottom-14 flex items-end justify-between gap-4 sm:inset-x-9 sm:bottom-9">
            <div className="max-w-[420px]">
              <h1 className="font-hub text-4xl italic leading-[0.98] tracking-tight sm:text-6xl">
                Find the landmarks.
              </h1>
              <p className="mt-4 hidden max-w-[330px] text-[15px] leading-relaxed text-white/65 sm:block">
                Drag to spin the globe. Each landmark holds one part of my story and work.
              </p>
            </div>
            <p className="text-right" aria-live="polite">
              <span className="whitespace-nowrap font-hub text-4xl italic tabular-nums leading-none sm:text-6xl">
                <span className="text-white/60">{String(found.length).padStart(2, '0')}</span> /{' '}
                {String(landmarks.length).padStart(2, '0')}
              </span>
              <span className="mt-2 block text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                {found.length} of {landmarks.length} found
              </span>
            </p>
          </div>
        </>
      )}

      <AnimatePresence>
        {open && Active && (
          <motion.aside
            key={section}
            aria-label={open.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="hub-panel pointer-events-auto"
          >
            <button
              type="button"
              onClick={() => goto('explore')}
              className="mb-6 inline-flex min-h-[44px] items-center text-sm text-white/65 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              ← Back to globe
            </button>
            <p className="mb-6 font-hub text-sm italic text-white/60">{open.name}</p>
            <Suspense fallback={<p role="status">Loading…</p>}>
              <Active />
            </Suspense>
          </motion.aside>
        )}
      </AnimatePresence>

      {next && (
        <button
          type="button"
          onClick={() => goto(next.section)}
          aria-label={`Next landmark: ${next.name}`}
          title={next.name}
          className="pointer-events-auto absolute bottom-[calc(64vh+1rem)] right-5 z-20 grid h-14 w-14 place-items-center rounded-full border border-white/40 bg-black/60 text-2xl backdrop-blur-sm hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:bottom-9 md:right-9"
        >
          →
        </button>
      )}
    </div>
  );
}
