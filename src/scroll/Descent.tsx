import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SMOOTHING, STRAIGHT_ZOOM } from '../config';
import { chapters } from '../content/story';
import { cameraAt } from '../globe/cameraPath';
import { createGlobe } from '../globe/GlobeEngine';
import Hub from '../hub/Hub';
import { DEFAULT_SECTION, goto, type Section } from '../hub/route';
import Caption from './Caption';
import LoadingScreen from './LoadingScreen';
import { odishaOpacity, spinWeight, themeAt } from './looks';
import OdishaOverlay from './OdishaOverlay';

const LAST = chapters.length - 1;
const READY_TIMEOUT_MS = 8000;
const END_DWELL_MS = 2000; // time on the last chapter before the hub fades in
const HUB_FRAME_MS = 33; // hub backdrop renders at ~30 fps (10 fps made the drift visibly steppy)
const DRIFT_DEG = 25; // hub drift swing either side of north
const DRIFT_PERIOD_S = 90;

const formatKm = (m: number) => {
  const km = m / 1000;
  return km >= 10 ? Math.round(km).toLocaleString('en') : km.toFixed(1);
};

const scrollToProgress = (p: number) => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  window.scrollTo({ top: p * max, behavior: 'smooth' }); // reduced-motion users get the static story instead
};

/** The globe and the scroll-driven descent. With `section` set, the same globe becomes the hub backdrop. */
export default function Descent({ section, onFail }: { section: Section | null; onFail: () => void }) {
  const hub = section !== null;
  const hubInit = useRef(hub);
  const ctl = useRef<{ setHub: (h: boolean) => void }>();
  const globeEl = useRef<HTMLDivElement>(null);
  const altEl = useRef<HTMLSpanElement>(null);
  const fillEl = useRef<HTMLDivElement>(null);
  const odishaEl = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let engine: Awaited<ReturnType<typeof createGlobe>> | undefined;
    let raf = 0;
    let last = 0;
    let max = 1;
    let target = 0;
    let current = 0;
    let drawn = -1;
    let hubMode = hubInit.current;
    let lastDraw = 0;
    let endTimer = 0;
    let spinLon = 0; // user drag-rotation of the orbit view, degrees
    let spinLat = 0;
    let drag: { x: number; y: number } | null = null;
    const root = document.documentElement;

    const measure = () => {
      max = Math.max(root.scrollHeight - window.innerHeight, 1);
      target = hubMode ? 1 : Math.min(Math.max(window.scrollY / max, 0), 1);
    };

    // Resting on the last chapter long enough hands over to the hub; scrolling back up cancels it.
    const checkEnd = () => {
      const atEnd = !hubMode && target > 0.995 && current > 0.995;
      if (atEnd && !endTimer) endTimer = window.setTimeout(() => goto(DEFAULT_SECTION), END_DWELL_MS);
      if (!atEnd && endTimer) {
        clearTimeout(endTimer);
        endTimer = 0;
      }
    };

    const updateOverlay = () => {
      const el = odishaEl.current;
      if (!el || !engine) return;
      const o = odishaOpacity(current);
      el.style.opacity = String(o);
      if (o === 0) return;
      for (const pin of Array.from(el.children) as HTMLElement[]) {
        if (!pin.dataset.lon) continue;
        const pt = engine.project(Number(pin.dataset.lon), Number(pin.dataset.lat));
        pin.style.transform = pt ? `translate(${pt.x}px, ${pt.y}px)` : 'translate(-9999px, 0)';
      }
    };

    // Progress lives in plain variables; only the chapter index touches React state.
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      current += (target - current) * (1 - Math.exp(-dt * SMOOTHING));
      if (Math.abs(target - current) < 1e-5) current = target;
      const drifting = hubMode && current === 1;
      if (drifting && now - lastDraw < HUB_FRAME_MS) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (current !== drawn || drifting) {
        const first = drawn < 0;
        drawn = current;
        lastDraw = now;
        const heading = drifting ? DRIFT_DEG * Math.sin((now / 1000 / DRIFT_PERIOD_S) * 2 * Math.PI) : 0;
        const pose = cameraAt(current, STRAIGHT_ZOOM, heading);
        const w = spinWeight(current);
        if (w > 0) {
          pose.lon += spinLon * w;
          pose.lat = Math.min(Math.max(pose.lat + spinLat * w, -85), 85);
        }
        engine?.setCamera(pose);
        // Nothing below changes while the hub drifts, so skip the DOM writes on those frames.
        if (!drifting || first) {
          updateOverlay();
          const theme = themeAt(pose.height);
          root.style.setProperty('--scrim', theme.scrim);
          root.style.setProperty('--accent', theme.accent);
          if (altEl.current) altEl.current.textContent = formatKm(pose.height);
          if (fillEl.current) fillEl.current.style.transform = `scaleY(${current})`;
          setChapter(Math.round(current * LAST));
        }
      }
      checkEnd();
      raf = current === target && !hubMode ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      measure();
      if (!raf && engine) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    ctl.current = {
      setHub(h) {
        hubMode = h;
        engine?.setLowPower(h);
        if (!h) {
          window.scrollTo(0, 0); // replay: start again from orbit
          current = 0;
        }
        measure();
        drawn = -1;
        checkEnd();
        wake();
      },
    };

    measure();
    current = hubMode ? 1 : target; // a reload mid-page starts where the scroll is; a hub deep link starts over Chennai
    createGlobe(globeEl.current!)
      .then((e) => {
        if (cancelled) return e.destroy();
        engine = e;
        e.setLowPower(hubMode);
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
      clearTimeout(endTimer);
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
      <div ref={globeEl} className="globe fixed inset-0 -z-10 bg-black" aria-hidden="true" />
      <OdishaOverlay ref={odishaEl} />
      {section && <Hub section={section} />}

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

          <nav aria-label="Chapters" className="fixed right-3 top-1/2 z-10 -translate-y-1/2 text-white">
            <div className="absolute bottom-3 left-[11px] top-3 w-0.5 bg-white/20" aria-hidden="true">
              <div
                ref={fillEl}
                className="h-full origin-top bg-[color:var(--accent)]"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>
            <div className="relative flex flex-col gap-1">
              {chapters.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={`Chapter ${i}: ${c.title}`}
                  aria-current={i === chapter}
                  onClick={() => scrollToProgress(i / LAST)}
                  className="grid h-6 w-6 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span
                    className={`block rounded-full transition-all ${i === chapter ? 'h-3 w-3 bg-[color:var(--accent)]' : 'h-1.5 w-1.5 bg-white opacity-60'}`}
                  />
                </button>
              ))}
            </div>
          </nav>

          <main className={`[touch-action:pan-y_pinch-zoom] ${chapter === 0 ? 'cursor-grab' : ''}`}>
            {chapters.map((c, i) => (
              <section
                key={c.id}
                aria-label={c.title}
                className="flex h-screen items-center px-6 text-white sm:px-16"
              >
                <Caption chapter={c} index={i} active={i === chapter} />
              </section>
            ))}
          </main>
        </>
      )}
    </>
  );
}
