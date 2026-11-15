import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { makeSeedling, measure, ROUNDS, scoreRound, toMm, type Pt, type Seedling } from './radicle';
import { timeRng } from './rng';
import { btn, btnPrimary } from './styles';
import { DemoLabel, Stat } from './ui';

const W = 400;
const H = 300;
const rngOnce = timeRng();

interface Result {
  score: number;
  measured: number;
  truth: number;
  off: number;
}

export default function RadicleGame({ onFinish }: { onFinish: (score: number) => void }) {
  const [phase, setPhase] = useState<'intro' | 'play' | 'done'>('intro');
  const [round, setRound] = useState(0);
  const [seedling, setSeedling] = useState<Seedling>(() => makeSeedling(rngOnce));
  const [clicks, setClicks] = useState<Pt[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [cursor, setCursor] = useState<Pt>({ x: W / 2, y: H / 2 });
  const [kbd, setKbd] = useState(false);
  const startedAt = useRef(0);
  const svg = useRef<SVGSVGElement>(null);

  const last = results[round]; // result of the current round once both points are placed
  const total = results.reduce((s, r) => s + r.score, 0);

  const place = (p: Pt) => {
    if (last || phase !== 'play') return;
    const next = [...clicks, p];
    setClicks(next);
    if (next.length === 2) {
      const m = measure(seedling, next[0], next[1]);
      const result = {
        score: scoreRound(m.measured, seedling.length, m.off),
        measured: m.measured,
        truth: seedling.length,
        off: m.off,
      };
      setResults((r) => [...r, result]);
    }
  };

  const toSvg = (e: PointerEvent): Pt => {
    const el = svg.current!;
    const pt = el.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const q = pt.matrixTransform(el.getScreenCTM()!.inverse());
    return { x: q.x, y: q.y };
  };

  const onKey = (e: KeyboardEvent) => {
    const d = e.shiftKey ? 24 : 6;
    const move: Record<string, Pt> = {
      ArrowLeft: { x: -d, y: 0 },
      ArrowRight: { x: d, y: 0 },
      ArrowUp: { x: 0, y: -d },
      ArrowDown: { x: 0, y: d },
    };
    if (move[e.key]) {
      e.preventDefault();
      setKbd(true);
      setCursor((c) => ({
        x: Math.min(W, Math.max(0, c.x + move[e.key].x)),
        y: Math.min(H, Math.max(0, c.y + move[e.key].y)),
      }));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      place(cursor);
    }
  };

  const start = () => {
    startedAt.current = Date.now();
    setPhase('play');
  };
  const next = () => {
    if (round + 1 === ROUNDS) {
      setPhase('done');
      onFinish(total);
      return;
    }
    setRound(round + 1);
    setSeedling(makeSeedling(rngOnce));
    setClicks([]);
  };
  const again = () => {
    setRound(0);
    setResults([]);
    setClicks([]);
    setSeedling(makeSeedling(rngOnce));
    startedAt.current = Date.now();
    setPhase('play');
  };

  const path = useMemo(
    () => seedling.points.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '),
    [seedling],
  );
  const base = seedling.points[0];
  const tip = seedling.points[seedling.points.length - 1];

  if (phase === 'intro')
    return (
      <div className="space-y-4">
        <DemoLabel>The microscope and its scale are simulated. Nothing here is real model output.</DemoLabel>
        <p>
          Five seedlings. For each, click the tip of the root and then the seed end to measure it. The closer
          your length is to the true one, the more you score (100 per round).
        </p>
        <p className="text-sm opacity-80">
          Keyboard: focus the image, move with the arrow keys (Shift for bigger steps), place a point with
          Enter.
        </p>
        <button type="button" className={btnPrimary} onClick={start}>
          Start
        </button>
      </div>
    );

  if (phase === 'done') {
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Stat label="TOTAL" value={`${total} / ${ROUNDS * 100}`} />
          <Stat label="TIME" value={`${secs} s`} />
        </div>
        <ol className="list-decimal space-y-1 pl-5 text-sm opacity-90">
          {results.map((r, i) => (
            <li key={i}>
              {r.score} points: you {toMm(r.measured).toFixed(1)} mm, true {toMm(r.truth).toFixed(1)} mm
            </li>
          ))}
        </ol>
        {/* FACT-CHECK: framing from DESIGN.md section 4 */}
        <p>
          That took you {secs} seconds. The U-Net from my seed project measures an image like this in
          milliseconds, pixel by pixel.
        </p>
        <button type="button" className={btnPrimary} onClick={again}>
          Play again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="ROUND" value={`${round + 1} / ${ROUNDS}`} />
        <Stat label="SCORE" value={total} />
        <Stat label="CLICKS" value={`${Math.min(clicks.length, 2)} / 2`} />
      </div>
      <p aria-live="polite" className="text-sm">
        {last
          ? `You measured ${toMm(last.measured).toFixed(1)} mm. True length ${toMm(last.truth).toFixed(1)} mm. ${last.score} points.`
          : clicks.length === 0
            ? 'Click the tip of the root.'
            : 'Now click the seed end.'}
      </p>
      <svg
        ref={svg}
        viewBox={`0 0 ${W} ${H}`}
        tabIndex={0}
        role="application"
        aria-label="Seedling under a simulated microscope. Click the root tip, then the seed end. Arrow keys move a crosshair, Enter places a point."
        className="mx-auto w-full max-w-[560px] cursor-crosshair touch-none rounded-lg bg-[#0b1d16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        onPointerDown={(e) => {
          setKbd(false);
          place(toSvg(e));
        }}
        onKeyDown={onKey}
        onBlur={() => setKbd(false)}
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#ffffff" strokeOpacity="0.06" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />
        <path
          d={path}
          fill="none"
          stroke="#efe3c2"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx={base.x} cy={base.y - 8} rx="28" ry="20" fill="#c9a66b" />
        <ellipse cx={base.x - 8} cy={base.y - 14} rx="10" ry="6" fill="#e6cf9e" opacity="0.7" />
        {clicks.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r="6" fill="none" stroke="#4ade80" strokeWidth="2" />
            <circle cx={c.x} cy={c.y} r="1.5" fill="#4ade80" />
          </g>
        ))}
        {last && (
          <>
            <circle
              cx={tip.x}
              cy={tip.y}
              r="9"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <circle
              cx={base.x}
              cy={base.y}
              r="9"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
          </>
        )}
        {kbd && (
          <g stroke="#fff" strokeWidth="1.5">
            <line x1={cursor.x - 10} x2={cursor.x + 10} y1={cursor.y} y2={cursor.y} />
            <line x1={cursor.x} x2={cursor.x} y1={cursor.y - 10} y2={cursor.y + 10} />
          </g>
        )}
      </svg>
      <div className="flex gap-3">
        {last ? (
          <button type="button" className={btnPrimary} onClick={next}>
            {round + 1 === ROUNDS ? 'See results' : 'Next round'}
          </button>
        ) : (
          clicks.length > 0 && (
            <button type="button" className={btn} onClick={() => setClicks([])}>
              Undo clicks
            </button>
          )
        )}
      </div>
    </div>
  );
}
