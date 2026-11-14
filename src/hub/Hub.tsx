import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { lazy, Suspense, useEffect, type ComponentType } from 'react';
import { profile } from '../content/profile';
import { replayDescent, SECTIONS, setIntroSeen, type Section } from './route';
import About from './sections/About';
import Contact from './sections/Contact';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Timeline from './sections/Timeline';

// The Lab (and its games) is its own lazy chunk.
const Lab = lazy(() => import('./sections/Lab'));

const PANELS: Record<Section, ComponentType> = {
  timeline: Timeline,
  projects: Projects,
  lab: Lab,
  about: About,
  skills: Skills,
  contact: Contact,
};
const LABELS: Record<Section, string> = {
  timeline: 'Timeline',
  projects: 'Projects',
  lab: 'Lab',
  about: 'About',
  skills: 'Skills',
  contact: 'Contact',
};

/** The explore hub: frosted panels and a dock over whatever backdrop the parent provides. */
export default function Hub({ section }: { section: Section }) {
  useEffect(() => setIntroSeen(true), []);
  const Active = PANELS[section];
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="fixed inset-0 z-10 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 p-4">
          <p className="font-display text-lg drop-shadow">{profile.name}</p>
          <button
            type="button"
            onClick={replayDescent}
            className="min-h-[44px] rounded-full border border-white/60 bg-black/40 px-4 text-sm backdrop-blur hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Replay the descent
          </button>
        </header>

        <nav
          aria-label="Sections"
          className="glass fixed inset-x-0 bottom-0 z-20 rounded-t-2xl p-1 md:inset-x-auto md:bottom-auto md:left-4 md:top-1/2 md:-translate-y-1/2 md:rounded-2xl md:p-2"
        >
          <ul className="flex md:flex-col">
            {SECTIONS.map((s) => (
              <li key={s} className="min-w-0 flex-1">
                <a
                  href={`#/${s}`}
                  aria-current={s === section ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center justify-center rounded-xl px-1 text-xs md:justify-start md:px-4 md:text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${s === section ? 'bg-[color:var(--accent)] font-semibold text-black' : 'hover:bg-white/10'}`}
                >
                  {LABELS[s]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="absolute inset-0 overflow-y-auto px-4 pb-24 pt-20 md:pb-8 md:pl-44">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="glass mx-auto w-full max-w-3xl rounded-3xl p-5 sm:p-8"
            >
              <Suspense fallback={<p role="status">Loading…</p>}>
                <Active />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
    </MotionConfig>
  );
}
