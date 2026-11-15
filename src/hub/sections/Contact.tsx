import { profile } from '../../content/profile';
import Panel, { linkClass } from '../Panel';

// mailto only: a form needs a backend or a third-party service, and none was asked for.
export default function Contact() {
  return (
    <Panel kicker="Contact" title="Say hello">
      <p className="text-lg">{profile.availability}</p>
      <ul className="mt-6 flex flex-wrap gap-3">
        <li>
          <a href={`mailto:${profile.email}`} className={linkClass}>
            {profile.email}
          </a>
        </li>
        <li>
          <a href={profile.github} target="_blank" rel="noreferrer noopener" className={linkClass}>
            GitHub
          </a>
        </li>
        <li>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className={linkClass}>
            LinkedIn
          </a>
        </li>
        <li>
          {profile.resumeUrl ? (
            <a href={profile.resumeUrl} download className={linkClass}>
              Download resume (PDF)
            </a>
          ) : (
            <span className={`${linkClass} cursor-not-allowed opacity-60`} aria-disabled="true">
              Resume PDF coming soon
            </span>
          )}
        </li>
      </ul>
    </Panel>
  );
}
