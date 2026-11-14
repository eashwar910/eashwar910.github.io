import type { Chapter } from '../content/story';

/** One chapter's caption. `active` drives the staggered reveal (see .caption in index.css). */
export default function Caption({
  chapter,
  index,
  active,
}: {
  chapter: Chapter;
  index: number;
  active: boolean;
}) {
  return (
    <div className="caption max-w-2xl rounded-2xl p-6 sm:p-8" data-active={active}>
      <p className="font-mono text-xs tracking-[0.25em] text-[color:var(--accent)]">
        {String(index).padStart(2, '0')} / {chapter.title.toUpperCase()}
      </p>
      {chapter.lines.map((line, j) => (
        <p
          key={j}
          className={`caption-line ${j === 0 ? 'mt-3 font-display text-2xl leading-snug sm:text-4xl' : 'mt-3 text-lg leading-relaxed opacity-90 sm:text-xl'}`}
          style={{ ['--d' as string]: `${j * 160}ms` }}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
