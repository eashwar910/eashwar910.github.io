import { forwardRef } from 'react';
import { odishaPins } from '../content/story';

/** Stylised radar rings at the two study districts. Pure decoration: no data is implied. Positioned by Descent each frame. */
const OdishaOverlay = forwardRef<HTMLDivElement>(function OdishaOverlay(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden opacity-0"
    >
      {odishaPins.map((pin) => (
        <div
          key={pin.name}
          data-lon={pin.lon}
          data-lat={pin.lat}
          className="absolute left-0 top-0 will-change-transform"
        >
          <span className="radar-sweep" />
          <span className="radar-ring" />
          <span className="radar-ring" style={{ animationDelay: '1s' }} />
          <span className="radar-ring" style={{ animationDelay: '2s' }} />
          <span className="radar-dot" />
          <span className="radar-label">{pin.name}</span>
        </div>
      ))}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-white/70">
        STUDY DISTRICTS · ILLUSTRATIVE OVERLAY
      </p>
    </div>
  );
});

export default OdishaOverlay;
