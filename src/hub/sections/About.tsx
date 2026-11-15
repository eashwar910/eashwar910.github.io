import { profile } from '../../content/profile';
import Panel, { Chip } from '../Panel';

export default function About() {
  return (
    <Panel kicker="About" title={profile.name}>
      <div className="grid gap-6">
        <div>
          <p className="opacity-80">{profile.tagline}</p>
          <p className="mt-1 text-sm opacity-70">{profile.role}</p>
          <p className="mt-4 text-lg leading-relaxed">{profile.intro}</p>
          {profile.bio.map((b) => (
            <p key={b} className="mt-4 text-lg leading-relaxed">
              {b}
            </p>
          ))}
          <blockquote className="mt-5 border-l-2 border-[color:var(--accent)] pl-4 font-hub text-xl">
            {profile.principle}
          </blockquote>
          <p className="mt-5 opacity-90">{profile.availability}</p>
          <ul className="mt-4 space-y-1 text-sm italic opacity-80" aria-label="Taglines">
            {profile.taglines.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider opacity-70">
            How a project goes
          </h2>
          <ol className="mt-2 grid gap-2">
            {profile.workflow.map((w, i) => (
              <li key={w.step} className="rounded-md border border-white/15 bg-white/[0.03] p-3 text-sm">
                <span className="tabular-nums text-xs text-[color:var(--accent)]">
                  {i + 1}. {w.step.toUpperCase()}
                </span>
                <span className="mt-1 block opacity-90">{w.text}</span>
              </li>
            ))}
          </ol>
          <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider opacity-70">Languages</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {profile.languages.map((l) => (
              <li key={l}>
                <Chip>{l}</Chip>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider opacity-70">Interests</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {profile.interests.map((l) => (
              <li key={l}>
                <Chip>{l}</Chip>
              </li>
            ))}
          </ul>
        </div>
        {profile.photo ? (
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            className="aspect-[4/5] w-full max-w-[200px] rounded-lg object-cover"
          />
        ) : (
          <div
            className="grid aspect-[4/5] w-full max-w-[200px] place-items-center rounded-lg border border-dashed border-white/30 text-sm opacity-60"
            role="img"
            aria-label="Photo placeholder"
          >
            Photo coming
          </div>
        )}
      </div>
      <p className="mt-6 text-sm opacity-70">{profile.location}</p>
    </Panel>
  );
}
