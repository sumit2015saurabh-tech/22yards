import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CASINO_GAMES, CASINO_TABS, gamesForTab, type CasinoTab } from '@/data/casino';
import { Search, Gamepad2 } from 'lucide-react';

export function LiveCasinoPage() {
  const [tab, setTab] = useState<CasinoTab>('popular');
  const [search, setSearch] = useState('');
  const [provider, setProvider] = useState<string>('ALL');

  const games = useMemo(() => {
    let list = tab === 'popular' ? gamesForTab('popular') : gamesForTab(tab);
    if (provider !== 'ALL') list = list.filter((g) => g.provider === provider);
    if (search.length >= 2) {
      const q = search.toLowerCase();
      list = list.filter((g) => g.name.toLowerCase().includes(q));
    }
    return list;
  }, [tab, search, provider]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Live Casino</h1>
          <p className="text-white/50 text-sm">{CASINO_GAMES.length} games · Teen Patti, Dragon Tiger, Slots & more</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search games (2+ chars)"
            className="pl-10 pr-4 py-2 rounded-lg bg-[#1a2832] border border-white/10 text-sm w-64"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto mb-4 pb-1">
        {CASINO_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-semibold ${
              tab === t.id ? 'bg-gold-500 text-pitch-950' : 'bg-[#243a48] text-white/70'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['ALL', 'UNIVERSE', 'EVOLUTION', 'EZUGI', 'PLATIN'].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setProvider(p)}
            className={`text-xs px-3 py-1 rounded ${provider === p ? 'bg-white/20' : 'bg-white/5 text-white/50'}`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
      {games.length === 0 && <p className="text-center text-white/40 py-12">No games match your search</p>}
    </div>
  );
}

function GameCard({ game }: { game: (typeof CASINO_GAMES)[0] }) {
  return (
    <div className="group bg-[#243a48] rounded-lg overflow-hidden hover:ring-2 ring-gold-400/40 transition-all cursor-pointer">
      <div className="aspect-[4/3] bg-gradient-to-br from-pitch-800 to-[#0f1a20] flex items-center justify-center relative">
        <Gamepad2 className="w-8 h-8 text-white/20 group-hover:text-gold-400/50 transition-colors" />
        {game.popular && <span className="absolute top-1 right-1 text-[8px] bg-gold-500 text-pitch-950 px-1 rounded font-bold">HOT</span>}
      </div>
      <div className="p-2">
        <p className="text-xs font-semibold truncate" title={game.name}>{game.name}</p>
        <p className="text-[10px] text-white/40">{game.provider}</p>
      </div>
    </div>
  );
}

export function VimaanPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-2">✈️ VIMAAN</h1>
      <p className="text-white/50 text-sm mb-8">Crash game — cash out before the plane flies away</p>
      <div className="bg-[#1a2832] rounded-2xl p-8 border border-white/10 aspect-video flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl font-bold text-gold-400 animate-pulse">2.47x</p>
          <p className="text-white/40 text-sm mt-2">Multiplier climbing…</p>
          <button type="button" className="mt-6 bg-emerald-500 px-8 py-3 rounded-xl font-bold">Cash Out</button>
        </div>
      </div>
      <p className="text-xs text-white/30 mt-4">18+ · Entertainment only · Virtual points</p>
    </div>
  );
}

export function VirtualSportsPage() {
  const leagues = ['Universe T1 League', 'Universe T2 League', 'Virtual Cricket Cup'];
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Virtual Sports</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {leagues.map((l) => (
          <Link key={l} to="/sport/cricket" className="bg-[#1a2832] p-6 rounded-lg border border-white/10 hover:border-gold-400/30">
            <p className="font-semibold">{l}</p>
            <p className="text-xs text-white/40 mt-1">24/7 simulated events</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function LotteryPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Lottery</h1>
      <div className="bg-[#1a2832] rounded-lg p-6 border border-white/10 space-y-4">
        <p className="text-sm text-white/60">Pick your lucky numbers</p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }, (_, i) => (
            <button key={i} type="button" className="aspect-square rounded-full bg-[#243a48] hover:bg-gold-500 hover:text-pitch-950 font-bold text-sm">
              {i}
            </button>
          ))}
        </div>
        <button type="button" className="w-full py-3 bg-gold-500 text-pitch-950 rounded font-bold">Place bet</button>
      </div>
    </div>
  );
}

export function TipsPage() {
  const tips = [
    { title: 'IPL 2026: MI vs CSK preview', sport: 'Cricket', date: 'Today' },
    { title: 'T20 World Cup outright picks', sport: 'Cricket', date: 'Yesterday' },
    { title: 'Premier League weekend guide', sport: 'Soccer', date: '2 days ago' },
  ];
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-6">Tips & Previews</h1>
      <div className="space-y-4">
        {tips.map((t) => (
          <article key={t.title} className="bg-[#1a2832] p-5 rounded-lg border border-white/10">
            <span className="text-[10px] text-gold-400">{t.sport} · {t.date}</span>
            <h2 className="font-semibold mt-1">{t.title}</h2>
            <p className="text-sm text-white/50 mt-2">Expert analysis and market insights for informed entertainment decisions.</p>
          </article>
        ))}
      </div>
    </div>
  );
}

// Promotions re-export
export { PromotionsPage } from '@/pages/Casino';
