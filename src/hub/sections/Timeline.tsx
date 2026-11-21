import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { timeline } from '../../content/timeline';
import Panel, { Chip, linkClass } from '../Panel';

export default function Timeline() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Panel kicker="Timeline" title="The path so far">
      <ol className="relative space-y-4 border-l border-white/25 pl-5">
        {timeline.map((t) => {
          const isOpen = open === t.id;
          return (
            <li key={t.id} className="relative">
              <span
                className="absolute -left-[26px] top-2 h-2.5 w-2.5 rounded-full bg-[color:var(--accent)]"
                aria-hidden="true"
              />
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`tl-${t.id}`}
                onClick={() => setOpen(isOpen ? null : t.id)}
                className="block min-h-[44px] w-full rounded-md p-2 text-left hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <span className="block tabular-nums text-xs tracking-wider text-[color:var(--accent)]">
                  {t.date}
                </span>
                <span className="mt-1 block text-lg font-semibold leading-snug">{t.title}</span>
                {t.place && <span className="block text-sm opacity-75">{t.place}</span>}
                <span className="mt-1 block opacity-90">{t.summary}</span>
                <span className="mt-1 block text-xs opacity-60">
                  {isOpen ? 'Hide detail' : 'Show detail'}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`tl-${t.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="p-2 opacity-90">{t.detail}</p>
                    {t.skills && (
                      <ul className="flex flex-wrap gap-2 p-2" aria-label="Skills">
                        {t.skills.map((s) => (
                          <li key={s}>
                            <Chip>{s}</Chip>
                          </li>
                        ))}
                      </ul>
                    )}
                    {t.repo && (
                      <p className="p-2">
                        <a href={t.repo} target="_blank" rel="noreferrer noopener" className={linkClass}>
                          GitHub repository
                        </a>
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}
