import { useState } from 'react';
import { projects } from '../../content/projects';
import Panel, { Chip, linkClass } from '../Panel';

const tags = [...new Set(projects.flatMap((p) => p.tags))];

export default function Projects() {
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? projects.filter((p) => p.tags.includes(tag)) : projects;
  return (
    <Panel kicker="02 / PROJECTS" title="Things I've built">
      <div role="group" aria-label="Filter by tag" className="mb-5 flex flex-wrap gap-2">
        {[null, ...tags].map((t) => (
          <button
            key={t ?? 'all'}
            type="button"
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
            className={`min-h-[44px] rounded-full border px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${tag === t ? 'border-[color:var(--accent)] bg-[color:var(--accent)] text-black' : 'border-white/30 hover:bg-white/10'}`}
          >
            {t ?? 'All'}
          </button>
        ))}
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {shown.map((p) => (
          <li
            key={p.id}
            className={`rounded-2xl border border-white/15 bg-white/5 p-5 ${p.featured ? 'md:col-span-2' : ''}`}
          >
            {(p.context || p.year) && (
              <p className="font-mono text-xs tracking-wider text-[color:var(--accent)]">
                {[p.context, p.year].filter(Boolean).join(' · ').toUpperCase()}
              </p>
            )}
            <h2 className="mt-1 font-display text-2xl leading-snug">{p.name}</h2>
            {p.note && <p className="mt-1 text-sm font-semibold">{p.note}</p>}
            {p.award && <p className="mt-1 text-sm text-[color:var(--accent)]">Award: {p.award}</p>}
            <p className="mt-2 opacity-90">{p.summary}</p>
            {p.points && (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm opacity-90">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            )}
            {p.dataset && <p className="mt-3 text-sm opacity-90">Data: {p.dataset}</p>}
            {p.stack && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Stack">
                {p.stack.map((s) => (
                  <li key={s}>
                    <Chip>{s}</Chip>
                  </li>
                ))}
              </ul>
            )}
            {p.links && (
              <p className="mt-4 flex flex-wrap gap-2">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={linkClass}
                  >
                    {l.label}
                  </a>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
