import type { Card } from './fruit';

const SHAPES = {
  apple:
    'M100 62 C62 40 22 78 36 126 C50 176 86 186 100 173 C114 186 150 176 164 126 C178 78 138 40 100 62 Z',
  orange:
    'M100 38 C150 38 176 76 176 114 C176 156 142 184 100 184 C58 184 24 156 24 114 C24 76 50 38 100 38 Z',
  banana: 'M34 146 C46 78 108 38 172 46 C176 52 172 58 164 62 C122 76 98 108 92 144 C86 170 50 176 34 146 Z',
};
const HUE = { apple: 4, orange: 28, banana: 50 };

/** An illustrated fruit. Rottenness shows as duller colour, spots and a bruise. Original SVG art. */
export default function FruitArt({ card, id }: { card: Card; id: string }) {
  const hue = HUE[card.kind];
  const sat = 80 - card.severity * 45;
  const light = (card.kind === 'banana' ? 58 : 50) - card.severity * 26;
  const fill = `hsl(${hue + card.severity * 6} ${sat}% ${light}%)`;
  const clip = `clip-${id}`;
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="A piece of fruit">
      <defs>
        <clipPath id={clip}>
          <path d={SHAPES[card.kind]} />
        </clipPath>
      </defs>
      <path d={SHAPES[card.kind]} fill={fill} stroke="rgb(0 0 0 / 0.25)" strokeWidth="2" />
      <g clipPath={`url(#${clip})`}>
        {card.bruise && (
          <ellipse
            cx={card.bruise.x}
            cy={card.bruise.y}
            rx={card.bruise.rx}
            ry={card.bruise.ry}
            fill="#3b2412"
            opacity={0.25 + card.severity * 0.4}
          />
        )}
        {card.spots.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#2a1a0c" opacity={0.55 + card.severity * 0.3} />
        ))}
        <ellipse
          cx="74"
          cy="84"
          rx="18"
          ry="9"
          fill="#fff"
          opacity={0.4 - card.severity * 0.35}
          transform="rotate(-30 74 84)"
        />
      </g>
      {card.kind !== 'banana' && (
        <path
          d="M100 62 C100 50 104 42 110 36"
          stroke="#4a3418"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      )}
      {card.kind !== 'banana' && (
        <path
          d="M106 44 C122 28 140 36 144 40 C132 54 116 52 106 44 Z"
          fill={card.severity > 0.6 ? '#7a6a2a' : '#3d9a4a'}
        />
      )}
    </svg>
  );
}
