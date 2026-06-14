import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CASINO_GAMES, CASINO_TABS, gamesForTab, type CasinoTab } from '@/data/casino';
import { getCasinoThumbnail } from '@/data/casinoImages';
import { Search, Play } from 'lucide-react';

export function LiveCasinoPage() {
  const [tab, setTab] = useState<CasinoTab>('popular');
  const [search, setSearch] = useState('');
  const [provider, setProvider] = useState<string>('ALL');
  const [hovered, setHovered] = useState<string | null>(null);

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
          <p className="text-white/50 text-sm">{CASINO_GAMES.length} games with live thumbnails · Teen Patti, Slots & more</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search games (2+ chars)"
            className="pl-10 pr-4 py-2.5 rounded-xl bg-pitch-800/80 border border-white/[0.08] text-sm w-64 focus:border-pitch-500/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto mb-4 pb-1 scrollbar-hide">
        {CASINO_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              tab === t.id
                ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-pitch-950 shadow-md'
                : 'bg-pitch-800/60 text-white/60 hover:bg-pitch-700/60 hover:text-white'
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
            className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
              provider === p ? 'bg-pitch-500/30 text-pitch-400 border border-pitch-500/40' : 'bg-white/[0.04] text-white/45 hover:bg-white/[0.08]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {games.map((g) => (
          <GameCard
            key={g.id}
            game={g}
            isHovered={hovered === g.id}
            onHover={() => setHovered(g.id)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </div>
      {games.length === 0 && <p className="text-center text-white/40 py-12">No games match your search</p>}
    </div>
  );
}

function GameCard({
  game,
  isHovered,
  onHover,
  onLeave,
}: {
  game: (typeof CASINO_GAMES)[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const img = getCasinoThumbnail(game);
  return (
    <Link
      to={game.slug === 'vimaan' ? '/vimaan' : '/live-casino'}
      className="casino-card group block"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-pitch-900">
        <img
          src={img}
          alt={game.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-950/90 via-pitch-950/20 to-transparent" />
        {game.popular && (
          <span className="absolute top-2 right-2 text-[9px] bg-gold-500 text-pitch-950 px-1.5 py-0.5 rounded-md font-bold shadow">HOT</span>
        )}
        <div className="casino-play absolute inset-0 flex items-center justify-center bg-pitch-950/40 backdrop-blur-[2px]">
          <span className="flex items-center gap-1.5 bg-gold-500 text-pitch-950 px-4 py-2 rounded-full text-xs font-bold shadow-lg">
            <Play className="w-3.5 h-3.5 fill-current" /> Play
          </span>
        </div>
      </div>
      <div className="p-2.5 bg-pitch-800/40">
        <p className="text-xs font-semibold truncate text-white/90" title={game.name}>{game.name}</p>
        <p className="text-[10px] text-white/40 mt-0.5">{game.provider} · {game.minBet}+ pts</p>
      </div>
    </Link>
  );
}

export function VimaanPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 text-center">
      <img
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop&q=80"
        alt="Vimaan"
        className="w-24 h-24 rounded-2xl mx-auto mb-4 object-cover shadow-lg ring-2 ring-gold-400/30"
      />
      <h1 className="text-3xl font-bold mb-2">VIMAAN</h1>
      <p className="text-white/50 text-sm mb-8">Crash game — cash out before the plane flies away</p>
      <div className="bg-pitch-800/60 rounded-2xl p-8 border border-white/[0.08] aspect-video flex items-center justify-center relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&h=400&fit=crop&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative text-center">
          <p className="text-5xl font-bold text-gold-400 animate-pulse">2.47x</p>
          <p className="text-white/40 text-sm mt-2">Multiplier climbing…</p>
          <button type="button" className="mt-6 bg-gradient-to-r from-pitch-500 to-pitch-400 px-8 py-3 rounded-xl font-bold shadow-lg hover:brightness-110 transition-all active:scale-95">
            Cash Out
          </button>
        </div>
      </div>
      <p className="text-xs text-white/30 mt-4">18+ · Entertainment only · Virtual points</p>
    </div>
  );
}

export function VirtualSportsPage() {
  const leagues = [
    { name: 'Universe T1 League', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop&q=80' },
    { name: 'Universe T2 League', img: 'https://images.unsplash.com/photo-1519861537503-b9e01aefad54?w=400&h=200&fit=crop&q=80' },
    { name: 'Virtual Cricket Cup', img: 'https://images.unsplash.com/photo-1531415077819-7b46a01288c0?w=400&h=200&fit=crop&q=80' },
  ];
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Virtual Sports</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {leagues.map((l) => (
          <Link key={l.name} to="/sport/virtual-sports" className="sport-card block group">
            <div className="h-32 overflow-hidden">
              <img src={l.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4 bg-pitch-800/40">
              <p className="font-semibold">{l.name}</p>
              <p className="text-xs text-white/40 mt-1">24/7 simulated events</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function LotteryPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <img
        src="https://images.unsplash.com/photo-1518539187811-45e04dd8ddb4?w=600&h=200&fit=crop&q=80"
        alt=""
        className="w-full h-32 object-cover rounded-xl mb-6 opacity-80"
      />
      <h1 className="text-xl font-bold mb-4">Lottery</h1>
      <div className="glass rounded-xl p-6 space-y-4">
        <p className="text-sm text-white/60">Pick your lucky numbers — daily draw at 8 PM IST</p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }, (_, i) => (
            <button
              key={i}
              type="button"
              className="aspect-square rounded-xl bg-pitch-800/80 hover:bg-gold-500 hover:text-pitch-950 font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95 border border-white/[0.06]"
            >
              {i}
            </button>
          ))}
        </div>
        <button type="button" className="btn-gold w-full">Place bet</button>
      </div>
    </div>
  );
}

export function TipsPage() {
  const tips = [
    { title: 'IPL 2026: MI vs CSK preview', sport: 'Cricket', date: 'Today', img: 'https://images.unsplash.com/photo-1531415077819-7b46a01288c0?w=200&h=120&fit=crop&q=80' },
    { title: 'Mumbai rainfall outlook — June', sport: 'Weather', date: 'Today', img: 'https://images.unsplash.com/photo-1504608524841-42fe6f008b4b?w=200&h=120&fit=crop&q=80' },
    { title: 'Lok Sabha 2029 seat projections', sport: 'Politics', date: 'Yesterday', img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=200&h=120&fit=crop&q=80' },
    { title: 'Premier League weekend guide', sport: 'Soccer', date: '2 days ago', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=120&fit=crop&q=80' },
  ];
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-6">Tips & Previews</h1>
      <div className="space-y-4">
        {tips.map((t) => (
          <article key={t.title} className="sport-card flex gap-4 p-0 overflow-hidden bg-pitch-800/30">
            <img src={t.img} alt="" className="w-28 h-24 object-cover shrink-0" />
            <div className="p-4">
              <span className="text-[10px] text-gold-400">{t.sport} · {t.date}</span>
              <h2 className="font-semibold mt-1">{t.title}</h2>
              <p className="text-sm text-white/50 mt-1">Expert analysis for informed entertainment decisions.</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export { PromotionsPage } from '@/pages/Casino';
