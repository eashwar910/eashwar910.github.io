import { useEffect, useRef, type ReactNode } from 'react';

/** Section wrapper: kicker + h1, and moves focus to the heading when the panel opens (route change). */
export default function Panel({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  const h1 = useRef<HTMLHeadingElement>(null);
  useEffect(() => h1.current?.focus({ preventScroll: true }), []);
  return (
    <>
      <p className="font-mono text-xs tracking-[0.25em] text-[color:var(--accent)]">{kicker}</p>
      <h1 ref={h1} tabIndex={-1} className="mt-2 font-display text-3xl outline-none sm:text-4xl">
        {title}
      </h1>
      <div className="mt-6">{children}</div>
    </>
  );
}

export const Chip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm">{children}</span>
);

export const linkClass =
  'inline-flex min-h-[44px] items-center rounded-full border border-white/40 px-4 text-sm hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
