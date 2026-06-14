import type { MarketType, Selection } from '@/data/fixtures';

const TYPE_STYLES: Record<MarketType, string> = {
  MATCH_ODDS: 'border-l-4 border-l-[var(--color-back)]',
  BOOKMAKER: 'border-l-4 border-l-amber-400/80',
  FANCY: 'border-l-4 border-l-pitch-400',
  SPORTSBOOK: 'border-l-4 border-l-orange-400/70',
  LINE: 'border-l-4 border-l-violet-400/70',
};

export function MarketHeader({ name, type }: { name: string; type: MarketType }) {
  const badge =
    type === 'BOOKMAKER' ? 'BM' : type === 'FANCY' ? 'Fancy' : type === 'LINE' ? 'Line' : null;
  return (
    <div className={`flex items-center justify-between px-4 py-2.5 bg-pitch-800/80 ${TYPE_STYLES[type]}`}>
      <h3 className="font-semibold text-sm">{name}</h3>
      {badge && (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white/70">{badge}</span>
      )}
    </div>
  );
}

export function BackLayCell({
  selection,
  onBack,
  onLay,
}: {
  selection: Selection;
  onBack?: () => void;
  onLay?: () => void;
}) {
  if (selection.suspended) {
    return (
      <div className="relative flex rounded-lg overflow-hidden opacity-60 mx-2">
        <div className="flex-1 py-3 text-center odds-back/30 text-sm">{selection.name}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-pitch-900/70 text-xs font-bold">SUSPENDED</div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[1fr_72px_72px] items-center gap-2 p-2 mx-1 hover:bg-white/[0.03] rounded-lg transition-all duration-200">
      <span className="text-sm font-medium truncate pr-2 text-white/90">{selection.name}</span>
      <button
        type="button"
        onClick={onBack}
        className="odds-back py-2.5 rounded-lg text-center text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm"
      >
        {selection.back.toFixed(2)}
      </button>
      <button
        type="button"
        onClick={onLay}
        className="odds-lay py-2.5 rounded-lg text-center text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-sm"
      >
        {selection.lay.toFixed(2)}
      </button>
    </div>
  );
}

export function InPlayBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-pitch-400">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pitch-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-pitch-500" />
      </span>
      In-Play
    </span>
  );
}
