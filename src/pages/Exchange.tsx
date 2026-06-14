import { Link } from 'react-router-dom';
import { useLiveOdds } from '@/hooks/useLiveOdds';
import { InPlayBadge } from '@/components/exchange/ExchangeUI';
import { CASINO_GAMES, gamesForTab } from '@/data/casino';
import { ArrowRight } from 'lucide-react';

const HERO = 'https://images.unsplash.com/photo-1531415077819-7b46a01288c0?w=1920&q=80&auto=format&fit=crop';

export function HomePage() {
  const { fixtures } = useLiveOdds();
  const popularGames = gamesForTab('popular').slice(0, 8);

  return (
    <div>
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={HERO} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative max-w-[1600px] mx-auto px-4 h-full flex items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">Every yard counts</h1>
            <p className="text-white/60 mt-2 max-w-lg">Exchange-grade cricket betting, 180+ casino games, live odds via WebSocket.</p>
            <Link to="/register" className="inline-flex mt-4 items-center gap-2 bg-gold-500 text-pitch-950 px-6 py-2.5 rounded font-bold text-sm">
              Join free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Live & Upcoming</h2>
          <Link to="/inplay" className="text-xs text-gold-400">View in-play →</Link>
        </div>
        <div className="bg-[#1a2832] rounded-lg overflow-hidden border border-white/10">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-4 py-2 text-[10px] text-white/40 uppercase border-b border-white/10">
            <span>Event</span><span>1</span><span>2</span><span></span>
          </div>
          {fixtures.slice(0, 6).map((f) => {
            const mo = f.markets.find((m) => m.type === 'MATCH_ODDS');
            const s0 = mo?.selections[0];
            const s1 = mo?.selections[1];
            return (
              <Link
                key={f.id}
                to={`/market/${f.id}`}
                className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-4 py-3 items-center border-b border-white/5 hover:bg-white/5 text-sm"
              >
                <div>
                  <p className="text-[10px] text-white/40">{f.competition}</p>
                  <p className="font-medium">{f.homeShort} v {f.awayShort}</p>
                  {f.inPlay && <InPlayBadge />}
                </div>
                <span className="px-3 py-1.5 rounded bg-[#1a8ee1]/80 text-xs font-bold text-center min-w-[52px]">{s0?.back.toFixed(2)}</span>
                <span className="px-3 py-1.5 rounded bg-[#1a8ee1]/80 text-xs font-bold text-center min-w-[52px]">{s1?.back.toFixed(2)}</span>
                <span className="text-[10px] text-white/30">{f.hasFancy ? 'Fancy' : ''}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Casino — {CASINO_GAMES.length} games</h2>
          <Link to="/live-casino" className="text-xs text-gold-400">All games →</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {popularGames.map((g) => (
            <Link key={g.id} to="/live-casino" className="shrink-0 w-36 bg-[#243a48] rounded-lg p-3 hover:ring-1 ring-gold-400/30 transition-all">
              <div className="h-20 rounded bg-gradient-to-br from-pitch-700 to-pitch-900 mb-2 flex items-center justify-center text-2xl">🎰</div>
              <p className="text-xs font-semibold truncate">{g.name}</p>
              <p className="text-[10px] text-white/40">{g.provider}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ExchangeHomePage() {
  return <HomePage />;
}

export function InPlayPage() {
  const { fixtures, connected, latencyMs } = useLiveOdds({ inPlayOnly: true });
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">In-Play</h1>
        <span className="text-[10px] text-white/40">{connected ? `Live · ${latencyMs}ms` : 'Connecting…'}</span>
      </div>
      <EventList fixtures={fixtures} />
    </div>
  );
}

export function EventList({ fixtures }: { fixtures: ReturnType<typeof useLiveOdds>['fixtures'] }) {
  if (!fixtures.length) return <p className="text-white/50 text-sm">No events right now</p>;
  return (
    <div className="bg-[#1a2832] rounded-lg border border-white/10 divide-y divide-white/5">
      {fixtures.map((f) => {
        const mo = f.markets[0];
        return (
          <Link key={f.id} to={`/market/${f.id}`} className="flex flex-wrap items-center gap-4 p-4 hover:bg-white/5">
            <div className="flex-1 min-w-[200px]">
              <p className="text-xs text-white/40">{f.competition}</p>
              <p className="font-semibold">{f.homeTeam} vs {f.awayTeam}</p>
              <div className="flex gap-2 mt-1">
                {f.inPlay && <InPlayBadge />}
                {f.hasFancy && <span className="text-[10px] bg-teal-400/20 text-teal-300 px-1.5 rounded">Fancy</span>}
                {f.hasBookmaker && <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 rounded">BM</span>}
              </div>
            </div>
            <div className="flex gap-2">
              {mo?.selections.slice(0, 3).map((s) => (
                <div key={s.id} className="text-center">
                  <p className="text-[10px] text-white/40 mb-1">{s.name.slice(0, 8)}</p>
                  <span className="block px-4 py-2 rounded bg-[#1a8ee1] text-sm font-bold">{s.back.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
