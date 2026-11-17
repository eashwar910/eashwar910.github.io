import { forwardRef } from 'react';
import { campusPin, odishaPins } from '../content/story';

const Pin = ({ pin }: { pin: { name: string; lon: number; lat: number } }) => (
  <div data-lon={pin.lon} data-lat={pin.lat} className="absolute left-0 top-0 will-change-transform">
    <span className="radar-sweep" />
    <span className="radar-ring" />
    <span className="radar-ring" style={{ animationDelay: '1s' }} />
    <span className="radar-ring" style={{ animationDelay: '2s' }} />
    <span className="radar-dot" />
    <span className="radar-label">{pin.name}</span>
  </div>
);

/** Story pins: the Malaysia campus and the two Odisha study districts. Each group's opacity and pin positions are set by Descent each frame. */
const PinOverlay = forwardRef<HTMLDivElement>(function PinOverlay(_, ref) {
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      <div data-group="campus" className="opacity-0">
        <Pin pin={campusPin} />
      </div>
      {/* Odisha: decoration only, no data is implied. */}
      <div data-group="odisha" className="opacity-0">
        {odishaPins.map((pin) => (
          <Pin key={pin.name} pin={pin} />
        ))}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-white/70">
          STUDY DISTRICTS · ILLUSTRATIVE OVERLAY
        </p>
      </div>
    </div>
  );
});

export default PinOverlay;
