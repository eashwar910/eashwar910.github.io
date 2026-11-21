import type { Project } from '../../content/projects';
import { Chip, linkClass } from '../Panel';

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="border-t border-white/15 pt-5">
      {(p.context || p.year) && (
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--accent)]">
          {[p.context, p.year].filter(Boolean).join(' · ')}
        </p>
      )}
      <h3 className="mt-1 font-hub text-2xl leading-snug">{p.name}</h3>
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
      {p.links?.some((l) => l.href) && (
        <p className="mt-4 flex flex-wrap gap-2">
          {p.links.filter((l) => l.href).map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener" className={linkClass}>
              {l.label}
            </a>
          ))}
        </p>
      )}
    </article>
  );
}
