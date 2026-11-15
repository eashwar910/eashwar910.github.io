import { createContext, createElement, useContext, useEffect, useRef, type ReactNode } from 'react';

/** True inside the Show all page, where headings are h2 and opening a section must not steal focus. */
export const InPage = createContext(false);

/** Section wrapper: small-caps kicker + heading. In the globe panel it moves focus to the heading when it opens. */
export default function Panel({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  const inPage = useContext(InPage);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!inPage) heading.current?.focus({ preventScroll: true });
  }, [inPage]);
  return (
    <>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--accent)]">{kicker}</p>
      {createElement(
        inPage ? 'h2' : 'h1',
        {
          ref: heading,
          tabIndex: -1,
          className: 'mt-3 font-hub text-4xl italic leading-[1.02] tracking-tight outline-none sm:text-5xl',
        },
        title,
      )}
      <div className="mt-8">{children}</div>
    </>
  );
}

export const Chip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full border border-white/20 px-3 py-1 text-sm">{children}</span>
);

export const linkClass =
  'inline-flex min-h-[44px] items-center rounded-full border border-white/40 px-4 text-sm hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
