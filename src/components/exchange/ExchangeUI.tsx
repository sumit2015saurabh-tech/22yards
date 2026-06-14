import type { MarketType, Selection } from '@/data/fixtures';

const TYPE_STYLES: Record<MarketType, string> = {
  MATCH_ODDS: 'border-l-4 border-l-blue-500',
  BOOKMAKER: 'border-l-4 border-l-amber-400',
  FANCY: 'border-l-4 border-l-teal-400',
  SPORTSBOOK: 'border-l-4 border-l-orange-400',
  LINE: 'border-l-4 border-l-purple-400',
};

export function MarketHeader({ name, type }: { name: string; type: MarketType }) {
  const badge =
    type === 'BOOKMAKER' ? 'BM' : type === 'FANCY' ? 'Fancy' : type === 'SPORTSBOOK' ? 'SB' : null;
  return (
    <div className={`flex items-center justify-between px-4 py-2 bg-[#243a48] ${TYPE_STYLES[type]}`}>
      <h3 className="font-semibold text-sm">{name}</h3>
      {badge && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
          type === 'BOOKMAKER' ? 'bg-amber-400/20 text-amber-300' : 'bg-teal-400/20 text-teal-300'
        }`}>{badge}</span>
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
      <div className="relative flex rounded overflow-hidden opacity-60">
        <div className="flex-1 py-3 text-center bg-[#1a8ee1]/30 text-sm">{selection.name}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/60 text-xs font-bold">SUSPENDED</div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-[1fr_72px_72px] items-center gap-1 p-2 hover:bg-white/5 rounded-lg transition-colors">
      <span className="text-sm font-medium truncate pr-2">{selection.name}</span>
      <button
        type="button"
        onClick={onBack}
        className="py-2.5 rounded text-center text-sm font-bold bg-[#1a8ee1]/90 hover:bg-[#1a8ee1] text-white transition-colors"
      >
        {selection.back.toFixed(2)}
      </button>
      <button
        type="button"
        onClick={onLay}
        className="py-2.5 rounded text-center text-sm font-bold bg-[#f4496d]/90 hover:bg-[#f4496d] text-white transition-colors"
      >
        {selection.lay.toFixed(2)}
      </button>
    </div>
  );
}

export function InPlayBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-emerald-400">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      In-Play
    </span>
  );
}
