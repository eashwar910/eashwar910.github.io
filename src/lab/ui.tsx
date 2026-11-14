import type { ReactNode } from 'react';

/** Every game carries a plain-language label saying it is a playful demo. */
export const DemoLabel = ({ children }: { children: ReactNode }) => (
  <p className="rounded-xl border border-dashed border-white/30 px-3 py-2 text-sm opacity-80">
    <strong className="font-semibold">Playful demo.</strong> {children}
  </p>
);

export const Stat = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
    <div className="font-mono text-xs tracking-wider opacity-70">{label}</div>
    <div className="text-xl font-semibold">{value}</div>
  </div>
);
