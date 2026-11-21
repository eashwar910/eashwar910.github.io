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
          <p className="mt-5 opacity-90">{profile.availability}</p>
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
      </div>
      <p className="mt-6 text-sm opacity-70">{profile.location}</p>
    </Panel>
  );
}
