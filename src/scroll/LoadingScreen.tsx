export default function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <div
      role="status"
      aria-hidden={!visible}
      className={`fixed inset-0 z-50 grid place-items-center bg-[#050a1e] text-white transition-opacity duration-700 ${visible ? '' : 'pointer-events-none opacity-0'}`}
    >
      <div className="text-center">
        <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border border-white/20 border-t-[color:var(--accent)]" />
        <p className="font-display text-2xl">Eashwar Siddha</p>
        <p className="mt-2 font-mono text-xs tracking-widest opacity-70">PREPARING THE DESCENT</p>
      </div>
    </div>
  );
}
