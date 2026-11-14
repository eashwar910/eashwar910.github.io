import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import Hub from './hub/Hub';
import { DEFAULT_SECTION, introSeen, useSection } from './hub/route';
import Descent from './scroll/Descent';
import StaticStory from './StaticStory';

const query = '(prefers-reduced-motion: reduce)';
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(query);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function App() {
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
  const [noWebGL, setNoWebGL] = useState(() => !hasWebGL());
  const onFail = useCallback(() => setNoWebGL(true), []);

  // A section in the URL opens the hub. A bare URL opens the hub too once the descent has been seen this session.
  const urlSection = useSection();
  const section = urlSection ?? (introSeen() ? DEFAULT_SECTION : null);
  useEffect(() => {
    if (!urlSection && section) location.replace(`#/${section}`);
  }, [urlSection, section]);

  if (reduced || noWebGL) {
    return section ? (
      <div className="static-bg min-h-screen">
        <Hub section={section} />
      </div>
    ) : (
      <StaticStory reason={reduced ? 'reduced-motion' : 'no-webgl'} />
    );
  }
  return <Descent section={section} onFail={onFail} />;
}
