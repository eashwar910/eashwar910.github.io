import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SMOOTHING, STRAIGHT_ZOOM } from '../config';
import { chapters } from '../content/story';
import { cameraAt } from '../globe/cameraPath';
import { createGlobe } from '../globe/GlobeEngine';
import type { GlobeEngine } from '../globe/GlobeEngine';
import { EXPLORE_POSE } from '../globe/explore';
import Hub from '../hub/Hub';
import { goto, type Route } from '../hub/route';
import Caption from './Caption';
import LoadingScreen from './LoadingScreen';
import { campusOpacity, odishaOpacity, spinWeight, themeAt } from './looks';
import PinOverlay from './PinOverlay';

const LAST = chapters.length - 1;
const READY_TIMEOUT_MS = 8000;

const formatKm = (m: number) => {
  const km = m / 1000;
  return km >= 10 ? Math.round(km).toLocaleString('en') : km.toFixed(1);
};

const scrollToProgress = (p: number) => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  window.scrollTo({ top: p * max, behavior: 'smooth' }); // reduced-motion users get the static story instead
};

/** The globe and the scroll-driven descent. Once the route leaves the descent, the same globe is handed to the hub. */
export default function Descent({ route, onFail }: { route: Route; onFail: () => void }) {
  const hub = route.mode !== 'descent';
  const hubInit = useRef(hub);
  const ctl = useRef<{ setHub: (h: boolean) => void }>();
  const globeEl = useRef<HTMLDivElement>(null);
  const altEl = useRef<HTMLSpanElement>(null);
  const pinsEl = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [engine, setEngine] = useState<GlobeEngine | null>(null);

  useEffect(() => {
    let cancelled = false;
    let engine: GlobeEngine | undefined;
    let raf = 0;
    let last = 0;
    let max = 1;
    let target = 0;
    let current = 0;
    let velocity = 0;
    let drawn = -1;
    let hubMode = hubInit.current;
    let spinLon = 0; // user drag-rotation of the orbit view, degrees
    let spinLat = 0;
    let drag: { x: number; y: number } | null = null;
    const root = document.documentElement;

    const measure = () => {
      max = Math.max(root.scrollHeight - window.innerHeight, 1);
      target = hubMode ? 1 : Math.min(Math.max(window.scrollY / max, 0), 1);
    };

    const updateOverlay = () => {
      const el = pinsEl.current;
      if (!el || !engine) return;
      for (const group of Array.from(el.children) as HTMLElement[]) {
        const o = group.dataset.group === 'campus' ? campusOpacity(current) : odishaOpacity(current);
        group.style.opacity = String(o);
        if (o === 0) continue;
        for (const pin of Array.from(group.querySelectorAll<HTMLElement>('[data-lon]'))) {
          const pt = engine.project(Number(pin.dataset.lon), Number(pin.dataset.lat));
          pin.style.transform = pt ? `translate(${pt.x}px, ${pt.y}px)` : 'translate(-9999px, 0)';
        }
      }
    };

    // Progress lives in plain variables; only the chapter index touches React state.
    // In hub mode the hub owns the camera, so this loop only ever runs during the descent.
    const tick = (now: number) => {
      // A frame queued before the switch to the hub must not overwrite the hub's camera with a descent pose.
      if (hubMode) {
        raf = 0;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      // Critically damped spring: velocity carries across wheel ticks, so the camera never jolts or overshoots.
      const x = current - target;
      const k = (velocity + SMOOTHING * x) * dt;
      const decay = Math.exp(-SMOOTHING * dt);
      velocity = (velocity - SMOOTHING * k) * decay;
      current = Math.min(Math.max(target + (x + k) * decay, 0), 1);
      if (Math.abs(target - current) < 1e-5 && Math.abs(velocity) < 1e-4) {
        current = target;
        velocity = 0;
      }
      if (current !== drawn) {
        drawn = current;
        const pose = cameraAt(current, STRAIGHT_ZOOM);
        const w = spinWeight(current);
        if (w > 0) {
          pose.lon += spinLon * w;
          pose.lat = Math.min(Math.max(pose.lat + spinLat * w, -85), 85);
        }
        engine?.setCamera(pose);
        updateOverlay();
        const theme = themeAt(pose.height);
        root.style.setProperty('--scrim', theme.scrim);
        root.style.setProperty('--accent', theme.accent);
        if (altEl.current) altEl.current.textContent = formatKm(pose.height);
        setChapter(Math.round(current * LAST));
      }
      raf = current === target || hubMode ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      measure();
      if (!raf && engine && !hubMode) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    ctl.current = {
      setHub(h) {
        hubMode = h;
        if (!h) {
          window.scrollTo(0, 0); // replay: start again from orbit
          current = 0;
          velocity = 0;
        }
        measure();
        drawn = -1;
        wake();
      },
    };

    measure();
    current = hubMode ? 1 : target; // a reload mid-page starts where the scroll is
    createGlobe(globeEl.current!)
      .then((e) => {
        if (cancelled) return e.destroy();
        engine = e;
        setEngine(e);
        // A deep link to the hub starts on the resting globe; arriving from the descent pulls back instead (see Explore).
        if (hubMode) e.setCamera(EXPLORE_POSE);
        drawn = -1; // force the first frame
        wake();
        const timeout = new Promise<void>((r) => setTimeout(r, READY_TIMEOUT_MS));
        return Promise.race([e.whenReady(), timeout]).then(() => !cancelled && setLoaded(true));
      })
      .catch((err) => {
        console.error('Globe failed to start, showing the static story.', err);
        if (!cancelled) onFail();
      });

    // Drag to spin the globe while still in orbit (chapter 0). Wheel scroll is untouched.
    const dragStart = (e: PointerEvent) => {
      if (hubMode || current > 0.05 || e.button !== 0 || (e.target as Element).closest('button, a')) return;
      drag = { x: e.clientX, y: e.clientY };
      root.style.userSelect = 'none';
    };
    const dragMove = (e: PointerEvent) => {
      if (!drag) return;
      const k = 318 / Math.max(window.innerWidth, window.innerHeight); // ~1 degree per pixel of globe surface
      spinLon -= (e.clientX - drag.x) * k;
      spinLat = Math.min(Math.max(spinLat + (e.clientY - drag.y) * k, -90), 90);
      drag = { x: e.clientX, y: e.clientY };
      drawn = -1;
      wake();
    };
    const dragEnd = () => {
      drag = null;
      root.style.userSelect = '';
    };
    window.addEventListener('pointerdown', dragStart);
    window.addEventListener('pointermove', dragMove);
    window.addEventListener('pointerup', dragEnd);
    window.addEventListener('pointercancel', dragEnd);
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', wake);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('pointerdown', dragStart);
      window.removeEventListener('pointermove', dragMove);
      window.removeEventListener('pointerup', dragEnd);
      window.removeEventListener('pointercancel', dragEnd);
      dragEnd();
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', wake);
      engine?.destroy();
    };
  }, [onFail]);

  // Layout effect: switch modes before any scroll event from the chapters unmounting can reach the loop.
  useLayoutEffect(() => ctl.current?.setHub(hub), [hub]);

  return (
    <>
      <LoadingScreen visible={!loaded} />
      <div
        ref={globeEl}
        className={`globe fixed inset-0 -z-10 bg-black ${route.mode === 'explore' ? 'globe-live' : ''}`}
        aria-hidden="true"
      />
      <PinOverlay ref={pinsEl} />
      {hub && <Hub route={route} engine={engine} />}

      {!hub && (
        <>
          <header className="fixed inset-x-0 top-0 z-10 flex items-start justify-between p-4 text-white">
            <div className="font-mono text-xs tracking-widest drop-shadow">
              ALT <span ref={altEl}>25,000</span> KM
            </div>
            <button
              type="button"
              onClick={() => scrollToProgress(1)}
              className="rounded-full border border-white/60 bg-black/40 px-4 py-2 text-sm backdrop-blur hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Skip to explore
            </button>
          </header>

          {/* Captions sit in one fixed spot and cross-fade; the sections below only give the page its scroll length. */}
          <div className="descent-captions pointer-events-none fixed inset-x-6 bottom-[12vh] z-10 text-white sm:inset-x-16">
            {chapters.map((c, i) => (
              <div
                key={c.id}
                aria-hidden={i !== chapter}
                className="absolute bottom-0 left-0 w-full max-w-2xl"
              >
                <Caption chapter={c} index={i} active={i === chapter} />
              </div>
            ))}
          </div>

          {/* The descent ends here and waits: the visitor chooses when to leave Chennai. */}
          <div className="pointer-events-none fixed inset-0 z-10 grid place-items-center">
            <button
              type="button"
              onClick={() => goto('all')}
              tabIndex={chapter === LAST ? 0 : -1}
              aria-hidden={chapter !== LAST}
              className={`dive-btn group min-h-[60px] px-4 font-hub text-4xl italic text-white transition-opacity duration-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-5xl ${chapter === LAST ? 'pointer-events-auto opacity-100 delay-700' : 'opacity-0'}`}
            >
              Dive deeper{' '}
              <span aria-hidden="true" className="inline-block text-[color:var(--accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                ↓
              </span>
              <span aria-hidden="true" className="dive-line" />
            </button>
          </div>

          <main className={`[touch-action:pan-y_pinch-zoom] ${chapter === 0 ? 'cursor-grab' : ''}`}>
            {chapters.map((c) => (
              <section key={c.id} aria-label={c.title} className="h-screen" />
            ))}
          </main>
        </>
      )}
    </>
  );
}
