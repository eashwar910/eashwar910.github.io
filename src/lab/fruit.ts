import { between, shuffle, type Rng } from './rng';

export type Kind = 'apple' | 'orange' | 'banana';
export interface Card {
  kind: Kind;
  rotten: boolean;
  /** 0..1: how bad it looks. Ripe fruit can have mild blemishes, so some cards are hard. */
  severity: number;
  spots: { x: number; y: number; r: number }[];
  bruise: { x: number; y: number; rx: number; ry: number } | null;
}

export const DECK_SIZE = 10;
/** Scripted accuracy of the simulated bot. It is a made-up number, not a model result. */
export const BOT_ACCURACY = 0.8;
export const BOT_INTERVAL_MS = 2500;

const KINDS: Kind[] = ['apple', 'orange', 'banana'];

export function makeDeck(rng: Rng, n = DECK_SIZE): Card[] {
  const flags = shuffle(
    Array.from({ length: n }, (_, i) => i < n / 2),
    rng,
  );
  return flags.map((rotten) => {
    const severity = rotten ? between(rng, 0.3, 1) : between(rng, 0, 0.3);
    const spots = Array.from({ length: Math.round(severity * 7) }, () => {
      const a = rng() * Math.PI * 2;
      const d = Math.sqrt(rng()) * 52;
      return { x: 100 + Math.cos(a) * d, y: 105 + Math.sin(a) * d, r: between(rng, 3, 7) };
    });
    const bruise =
      severity > 0.5
        ? {
            x: between(rng, 75, 125),
            y: between(rng, 85, 125),
            rx: between(rng, 18, 30),
            ry: between(rng, 14, 24),
          }
        : null;
    return { kind: KINDS[Math.floor(rng() * KINDS.length)], rotten, severity, spots, bruise };
  });
}

/** What the bot says for each card (true = "rotten"): exactly round((1 - accuracy) * n) are wrong. */
export function botAnswers(deck: Card[], accuracy: number, rng: Rng): boolean[] {
  const wrong = new Set(
    shuffle(
      deck.map((_, i) => i),
      rng,
    ).slice(0, Math.round((1 - accuracy) * deck.length)),
  );
  return deck.map((c, i) => (wrong.has(i) ? !c.rotten : c.rotten));
}

export const countCorrect = (deck: Card[], answers: boolean[]) =>
  answers.reduce((n, said, i) => n + (i < deck.length && said === deck[i].rotten ? 1 : 0), 0);
