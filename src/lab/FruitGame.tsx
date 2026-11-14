import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { BOT_ACCURACY, BOT_INTERVAL_MS, botAnswers, countCorrect, makeDeck, type Card } from './fruit';
import FruitArt from './FruitArt';
import { timeRng } from './rng';
import { btn, btnPrimary } from './styles';
import { DemoLabel, Stat } from './ui';
import { useGameClock } from './useGameClock';

const SWIPE_PX = 80;
const rng = timeRng();

interface Round {
  deck: Card[];
  bot: boolean[];
}
const deal = (): Round => {
  const deck = makeDeck(rng);
  return { deck, bot: botAnswers(deck, BOT_ACCURACY, rng) };
};

export default function FruitGame({ onFinish }: { onFinish: (score: number) => void }) {
  const [phase, setPhase] = useState<'intro' | 'play' | 'done'>('intro');
  const [{ deck, bot }, setRound] = useState(deal);
  const [answers, setAnswers] = useState<boolean[]>([]); // true = "rotten"
  const [botMs, setBotMs] = useState(0);
  const [dx, setDx] = useState(0);
  const [flash, setFlash] = useState('');
  const drag = useRef<number | null>(null);

  const idx = answers.length;
  const botDone = Math.min(Math.floor(botMs / BOT_INTERVAL_MS), deck.length);
  const mine = countCorrect(deck, answers);
  const botSoFar = countCorrect(deck.slice(0, botDone), bot.slice(0, botDone));
  const botFinal = countCorrect(deck, bot);

  useGameClock(phase === 'play', (dt) => setBotMs((t) => t + dt));

  const answer = (rotten: boolean) => {
    if (phase !== 'play') return;
    const ok = rotten === deck[idx].rotten;
    setFlash(ok ? 'Correct' : `Wrong: it was ${deck[idx].rotten ? 'rotten' : 'ripe'}`);
    const next = [...answers, rotten];
    setAnswers(next);
    setDx(0);
    if (next.length === deck.length) {
      setPhase('done');
      onFinish(countCorrect(deck, next));
    }
  };

  // Left arrow = rotten, right arrow = ripe, while playing.
  useEffect(() => {
    if (phase !== 'play') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        answer(e.key === 'ArrowLeft');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const reset = () => {
    setRound(deal());
    setAnswers([]);
    setBotMs(0);
    setFlash('');
    setPhase('play');
  };

  const onDown = (e: PointerEvent) => {
    drag.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (drag.current !== null) setDx(e.clientX - drag.current);
  };
  const onUp = () => {
    if (drag.current === null) return;
    drag.current = null;
    if (Math.abs(dx) > SWIPE_PX) answer(dx < 0);
    else setDx(0);
  };

  if (phase === 'intro')
    return (
      <div className="space-y-4">
        <DemoLabel>
          The bot is a simulation with a scripted {Math.round(BOT_ACCURACY * 100)}% accuracy. It is not a real
          model result.
        </DemoLabel>
        <p>
          Ten fruit cards. Swipe left for rotten and right for ripe, or use the arrow keys or the buttons.
          Some are tricky. A simulated bot plays alongside.
        </p>
        <button type="button" className={btnPrimary} onClick={() => setPhase('play')}>
          Start
        </button>
      </div>
    );

  if (phase === 'done')
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Stat label="YOU" value={`${mine} / ${deck.length}`} />
          <Stat label="BOT (SIMULATION)" value={`${botFinal} / ${deck.length}`} />
        </div>
        <p>
          {mine > botFinal
            ? 'You beat the bot.'
            : mine === botFinal
              ? 'A tie with the bot.'
              : 'The bot won this one.'}
        </p>
        <p className="text-sm opacity-80">
          The bot's score is scripted at {Math.round(BOT_ACCURACY * 100)}% accuracy for fun. It says nothing
          about how well a real fruit detector performs.
        </p>
        <button type="button" className={btnPrimary} onClick={reset}>
          Play again
        </button>
      </div>
    );

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="CARD" value={`${idx + 1} / ${deck.length}`} />
        <Stat label="YOU" value={mine} />
        <Stat label="BOT (SIM)" value={`${botSoFar} (${botDone}/${deck.length})`} />
      </div>
      <p aria-live="polite" className="h-5 text-sm">
        {flash}
      </p>
      <div
        className="relative mx-auto aspect-square w-full max-w-[240px] cursor-grab touch-pan-y select-none rounded-3xl border border-white/20 bg-white/10 p-4 active:cursor-grabbing"
        style={{
          transform: `translateX(${dx}px) rotate(${dx / 20}deg)`,
          transition: drag.current === null ? 'transform 0.2s' : 'none',
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <FruitArt card={deck[idx]} id={`f${idx}`} />
      </div>
      <div className="flex justify-center gap-3">
        <button type="button" className={btn} onClick={() => answer(true)}>
          ← Rotten
        </button>
        <button type="button" className={btn} onClick={() => answer(false)}>
          Ripe →
        </button>
      </div>
    </div>
  );
}
