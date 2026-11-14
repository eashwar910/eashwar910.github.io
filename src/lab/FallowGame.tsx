import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { DURATION_MS, multiplier, newGame, SIZE, step, tap, type Game, type Phase } from './fallow';
import { timeRng } from './rng';
import { btnPrimary } from './styles';
import { DemoLabel, Stat } from './ui';
import { useGameClock } from './useGameClock';

const rng = timeRng();

const LOOK: Record<Phase, { cls: string; glyph: string; name: string }> = {
  wet: { cls: 'bg-blue-700 text-white', glyph: '≈', name: 'too wet' },
  workable: { cls: 'bg-green-400 text-black ring-2 ring-white', glyph: '✓', name: 'workable' },
  dry: { cls: 'bg-amber-700 text-white', glyph: '☼', name: 'too dry' },
  sown: { cls: 'bg-emerald-950 text-white', glyph: '✿', name: 'sown' },
};

export default function FallowGame({ onFinish }: { onFinish: (score: number) => void }) {
  const [started, setStarted] = useState(false);
  const [game, setGame] = useState<Game>(() => newGame(rng));
  const [miss, setMiss] = useState<number | null>(null);
  const grid = useRef<HTMLDivElement>(null);

  const playing = started && !game.done;
  useGameClock(playing, (dt) => setGame((g) => step(g, dt, rng)));

  // Save once when the clock runs out.
  useEffect(() => {
    if (started && game.done) onFinish(game.score);
  }, [started, game.done, game.score, onFinish]);

  const start = () => {
    setGame(newGame(rng));
    setStarted(true);
  };

  const press = (i: number) => {
    if (!playing) return;
    const was = game.cells[i].phase;
    setGame((g) => tap(g, i));
    if (was !== 'workable' && was !== 'sown') {
      setMiss(i);
      setTimeout(() => setMiss((m) => (m === i ? null : m)), 250);
    }
  };

  // Arrow keys move focus around the grid.
  const onKey = (e: KeyboardEvent, i: number) => {
    const d = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -SIZE, ArrowDown: SIZE }[e.key];
    if (d === undefined) return;
    e.preventDefault();
    (grid.current?.children[i + d] as HTMLElement | undefined)?.focus();
  };

  if (!started)
    return (
      <div className="space-y-4">
        <DemoLabel>The fields cycle at random. This is not real radar or soil data.</DemoLabel>
        <p>
          Each field cycles too wet, workable, then too dry. Tap fields while they are workable (green tick)
          before the {DURATION_MS / 1000} seconds run out. Chains of good taps build a bigger multiplier.
          Tapping a wet or dry field costs points and breaks your chain.
        </p>
        <button type="button" className={btnPrimary} onClick={start}>
          Start
        </button>
      </div>
    );

  const secs = Math.ceil(game.timeLeft / 1000);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        <Stat label="TIME" value={`${secs}s`} />
        <Stat label="SCORE" value={game.score} />
        <Stat label="CHAIN" value={game.chain} />
        <Stat label="NEXT x" value={multiplier(game.chain).toFixed(1)} />
      </div>
      <div className="relative mx-auto max-w-[460px] overflow-hidden rounded-2xl border border-white/20 bg-[#08140f] p-2 [background-image:repeating-radial-gradient(circle_at_50%_50%,transparent_0_28px,rgb(74_222_128/0.12)_28px_29px)]">
        <div className="fallow-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          ref={grid}
          role="group"
          aria-label="Fields"
          className="relative grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
        >
          {game.cells.map((c, i) => {
            const look = LOOK[c.phase];
            return (
              <button
                key={i}
                type="button"
                disabled={game.done}
                aria-label={`Field ${i + 1}: ${look.name}`}
                onClick={() => press(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`aspect-square rounded-lg text-xl font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${look.cls} ${miss === i ? '!bg-red-600 !text-white' : ''}`}
              >
                {look.glyph}
              </button>
            );
          })}
        </div>
      </div>
      {game.done && (
        <div className="space-y-3 rounded-2xl bg-white/10 p-4">
          <p className="font-display text-2xl">Time. {game.score} points.</p>
          <p className="text-sm opacity-90">
            {game.sown} fields sown, longest chain {game.bestChain}, {game.misses} misses.
          </p>
          <button type="button" className={btnPrimary} onClick={start}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
