import { MotionConfig } from 'motion/react';
import { useEffect } from 'react';
import type { GlobeEngine } from '../globe/GlobeEngine';
import Explore from './Explore';
import { setIntroSeen, type Route } from './route';
import ShowAll from './ShowAll';

/** The hub: the globe as the interface (explore) or the same content as a plain scrolling page (all). */
export default function Hub({
  route,
  engine,
}: {
  route: Exclude<Route, { mode: 'descent' }>;
  engine: GlobeEngine | null;
}) {
  useEffect(() => setIntroSeen(true), []);
  return (
    <MotionConfig reducedMotion="user">
      {route.mode === 'all' ? (
        <ShowAll section={route.section} engine={engine} />
      ) : (
        <Explore engine={engine} section={route.section} />
      )}
    </MotionConfig>
  );
}
