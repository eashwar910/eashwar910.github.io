import { useState } from 'react';
import { projects } from '../../content/projects';
import Panel from '../Panel';
import ProjectCard from './ProjectCard';

// Rice Fallow Radar has its own landmark (RiceFallow.tsx), so it is not repeated here.
const others = projects.filter((p) => p.id !== 'rice-fallow-radar');
const tags = [...new Set(others.flatMap((p) => p.tags))];

export default function Projects() {
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? others.filter((p) => p.tags.includes(tag)) : others;
  return (
    <Panel kicker="Projects" title="Things I've built">
      <div role="group" aria-label="Filter by tag" className="mb-6 flex flex-wrap gap-2">
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
      <ul className="space-y-8">
        {shown.map((p) => (
          <li key={p.id}>
            <ProjectCard p={p} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
