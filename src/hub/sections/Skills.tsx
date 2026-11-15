import { awards, skillGroups } from '../../content/skills';
import Panel, { Chip } from '../Panel';

export default function Skills() {
  return (
    <Panel kicker="Skills and awards" title="What I work with">
      <div className="space-y-5">
        {skillGroups.map((g) => (
          <section key={g.group} aria-label={g.group}>
            <h2 className="text-sm font-semibold uppercase tracking-wider opacity-70">{g.group}</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {g.items.map((i) => (
                <li key={i}>
                  <Chip>{i}</Chip>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section aria-label="Awards">
          <h2 className="text-sm font-semibold uppercase tracking-wider opacity-70">Awards</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      </div>
    </Panel>
  );
}
