import { chapters } from './content/story';
import Caption from './scroll/Caption';

/** Reduced-motion and no-WebGL path: the same story, stacked, no animated descent. */
export default function StaticStory({ reason }: { reason: 'reduced-motion' | 'no-webgl' }) {
  return (
    <div className="static-bg min-h-screen text-white">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4">
        <p className="font-mono text-xs tracking-widest">
          {reason === 'no-webgl' ? 'GLOBE UNAVAILABLE · STATIC STORY' : 'STATIC STORY'}
        </p>
        <a
          href="#/all"
          className="rounded-full border border-white/60 bg-black/40 px-4 py-2 text-sm hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Skip to the portfolio
        </a>
      </header>
      <main className="mx-auto flex max-w-2xl flex-col gap-6 px-6 pb-24 pt-8">
        {chapters.map((c, i) => (
          <section key={c.id} aria-label={c.title}>
            <Caption chapter={c} index={i} active />
          </section>
        ))}
        <section aria-label="Explore" className="caption rounded-2xl p-6 sm:p-8" data-active>
          <p className="font-display text-2xl">Explore</p>
          <a
            href="#/all"
            className="mt-4 inline-flex min-h-[44px] items-center rounded-full border border-white/60 px-5 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Open the portfolio
          </a>
        </section>
      </main>
    </div>
  );
}
