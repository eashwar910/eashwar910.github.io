import { useState } from 'react';
import FallowGame from '../../lab/FallowGame';
import FruitGame from '../../lab/FruitGame';
import RadicleGame from '../../lab/RadicleGame';
import { getBest, saveBest, type GameId } from '../../lab/storage';
import { btn } from '../../lab/styles';
import Panel from '../Panel';

const GAMES: { id: GameId; title: string; blurb: string; unit: string }[] = [
  {
    id: 'radicle',
    title: 'Measure the Radicle',
    blurb: 'Measure five seedling roots. Echoes my soybean seed work.',
    unit: '/ 500',
  },
  {
    id: 'fruit',
    title: 'Ripe or Rotten?',
    blurb: 'Sort ten fruit cards against a simulated bot. Echoes my rotten fruit detector.',
    unit: '/ 10',
  },
  {
    id: 'fallow',
    title: 'Fallow Finder',
    blurb: 'Tap fields while they are workable. Echoes my final-year project.',
    unit: 'pts',
  },
];

// Lazy-loaded as one chunk (see Hub): the games only download when the Lab opens.
export default function Lab() {
  const [game, setGame] = useState<GameId | null>(null);
  const [bests, setBests] = useState<Record<GameId, number | null>>(() => ({
    radicle: getBest('radicle'),
    fruit: getBest('fruit'),
    fallow: getBest('fallow'),
  }));
  const finish = (id: GameId) => (score: number) => setBests((b) => ({ ...b, [id]: saveBest(id, score) }));
  const active = GAMES.find((g) => g.id === game);

  return (
    <Panel kicker="Lab" title={active ? active.title : 'The Lab'}>
      {active ? (
        <>
          <button type="button" className={`${btn} mb-4`} onClick={() => setGame(null)}>
            ← Back to the Lab
          </button>
          {game === 'radicle' && <RadicleGame onFinish={finish('radicle')} />}
          {game === 'fruit' && <FruitGame onFinish={finish('fruit')} />}
          {game === 'fallow' && <FallowGame onFinish={finish('fallow')} />}
        </>
      ) : (
        <>
          <p className="mb-5 opacity-90">
            Three small games, each under two minutes. They are playful demos, not real model output. Your
            best scores are saved in this browser only.
          </p>
          <ul className="grid gap-4">
            {GAMES.map((g) => (
              <li key={g.id} className="flex flex-col rounded-lg border border-white/15 bg-white/[0.03] p-5">
                <h2 className="font-hub text-xl leading-snug">{g.title}</h2>
                <p className="mt-2 flex-1 text-sm opacity-90">{g.blurb}</p>
                <p className="mt-3 tabular-nums text-xs tracking-wider opacity-70">
                  BEST {bests[g.id] === null ? 'none yet' : `${bests[g.id]} ${g.unit}`}
                </p>
                <button type="button" className={`${btn} mt-3 justify-center`} onClick={() => setGame(g.id)}>
                  Play
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </Panel>
  );
}
