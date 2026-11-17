import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { introSeen, useRoute } from './hub/route';
import ShowAll from './hub/ShowAll';
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

  // A hub URL opens the hub. A bare URL opens Show all once the descent has been seen this session.
  const route = useRoute();
  const plain = reduced || noWebGL; // no globe to explore: the plain page is the hub
  const seen = route.mode === 'descent' && introSeen();
  useEffect(() => {
    if (seen) location.replace('#/all');
  }, [seen, plain]);

  if (plain) {
    return route.mode !== 'descent' ? (
      <div className="static-bg min-h-screen">
        <ShowAll section={route.section} engine={null} />
      </div>
    ) : (
      <StaticStory reason={reduced ? 'reduced-motion' : 'no-webgl'} />
    );
  }
  return <Descent route={seen ? { mode: 'all', section: null } : route} onFail={onFail} />;
}
