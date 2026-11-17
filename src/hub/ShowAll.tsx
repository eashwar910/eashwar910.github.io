import { Suspense, useEffect } from 'react';
import { EXPLORE_POSE } from '../globe/explore';
import type { GlobeEngine } from '../globe/GlobeEngine';
import { InPage } from './Panel';
import { replayDescent, SECTIONS, type Section } from './route';
import { LABELS, PANELS } from './sections';

const SPIN_DEG_S = 1.5;
const FRAME_MS = 66; // ~15 fps: it is only a backdrop

/** Every section as one normal scrolling page, with the globe turning slowly behind a dark scrim. */
export default function ShowAll({ section, engine }: { section: Section | null; engine: GlobeEngine | null }) {
  // Globe backdrop: low resolution, low frame rate, no input, paused while the tab is hidden.
  useEffect(() => {
    if (!engine) return;
    engine.setInputs(false, 0, Infinity);
    engine.setLowPower(true);
    engine.setCamera({ ...EXPLORE_POSE, lon: engine.getCamera().lon });
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden || now - last < FRAME_MS) return;
      engine.rotate((SPIN_DEG_S * (now - last)) / 1000);
      last = now;
      engine.render();
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      engine.setLowPower(false);
    };
  }, [engine]);

  // Deep link: scroll to the section once its content is on the page.
  useEffect(() => {
    if (section) document.getElementById(section)?.scrollIntoView({ block: 'start' });
  }, [section]);

  return (
    <div className="hub fixed inset-0 z-10 overflow-y-auto bg-black/65">
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 bg-black/60 px-5 py-2 backdrop-blur-sm sm:px-9">
        <p className="font-hub text-xl italic">Eashwar Siddha</p>
        <nav aria-label="Sections" className="order-3 flex w-full gap-5 overflow-x-auto text-sm sm:order-none sm:w-auto">
          {SECTIONS.map((s) => (
            <a key={s} href={`#/all/${s}`} className="inline-flex min-h-[44px] shrink-0 items-center text-white/70 hover:text-white">
              {LABELS[s]}
            </a>
          ))}
        </nav>
        <a href="#/explore" className="inline-flex min-h-[44px] items-center border-b border-white/80 text-sm font-medium">
          Explore landmarks
        </a>
      </header>

      <main className="mx-auto max-w-2xl px-5 pb-16 pt-10 sm:px-9">
        <h1 className="font-hub text-5xl italic leading-[0.98] tracking-tight sm:text-6xl">Eashwar Siddha</h1>
        <InPage.Provider value={true}>
          {SECTIONS.map((s) => {
            const Active = PANELS[s];
            return (
              <section key={s} id={s} aria-label={LABELS[s]} className="scroll-mt-16 border-t border-white/15 py-14 first:mt-10">
                <Suspense fallback={<p role="status">Loading…</p>}>
                  <Active />
                </Suspense>
              </section>
            );
          })}
        </InPage.Provider>
      </main>

      <footer className="mx-auto max-w-2xl px-5 pb-12 sm:px-9">
        <button type="button" onClick={replayDescent} className="min-h-[44px] text-sm text-white/65 hover:text-white">
          Replay the descent
        </button>
      </footer>
    </div>
  );
}
