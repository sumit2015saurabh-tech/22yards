import { Link } from 'react-router-dom';
import { useLiveOdds } from '@/hooks/useLiveOdds';
import { InPlayBadge } from '@/components/exchange/ExchangeUI';
import { CASINO_GAMES, gamesForTab } from '@/data/casino';
import { getCasinoThumbnail } from '@/data/casinoImages';
import { SPORTS } from '@/data/sports';
import { ArrowRight, CloudSun } from 'lucide-react';

const HERO = 'https://images.unsplash.com/photo-1531415077819-7b46a01288c0?w=1920&q=80&auto=format&fit=crop';

export function HomePage() {
  const { fixtures, connected, latencyMs } = useLiveOdds();
  const popularGames = gamesForTab('popular').slice(0, 8);

  return (
    <div>
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src={HERO} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-pitch-950 via-pitch-950/80 to-pitch-950/30" />
        <div className="relative max-w-[1600px] mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <p className="text-pitch-400 text-sm font-medium mb-2">Cricket · Casino · Weather · Politics</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Every yard counts at <span className="gold-gradient">22yards</span>
            </h1>
            <p className="text-white/55 mt-3 leading-relaxed">
              Soothing exchange experience with live odds, 184 casino games, and markets across every genre.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link to="/register" className="btn-gold inline-flex items-center gap-2 text-sm py-2.5 px-5">
                Join free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/sport/weather" className="inline-flex items-center gap-2 text-sm py-2.5 px-5 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] transition-all">
                <CloudSun className="w-4 h-4 text-pitch-400" /> Weather markets
              </Link>
            </div>
            {connected && (
              <p className="text-[10px] text-pitch-400/70 mt-4">Live odds · {latencyMs}ms latency</p>
            )}
          </div>
        </div>
      </section>

      {/* Genre quick links */}
      <section className="max-w-[1600px] mx-auto px-4 py-5">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {SPORTS.map((s) => (
            <Link
              key={s.id}
              to={`/sport/${s.slug}`}
              className="shrink-0 px-4 py-2 rounded-xl bg-pitch-800/50 border border-white/[0.06] text-sm hover:border-pitch-500/40 hover:bg-pitch-800 transition-all"
            >
              {s.icon} {s.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Live & Upcoming</h2>
          <Link to="/inplay" className="text-xs text-pitch-400 hover:text-pitch-300 transition-colors">View in-play →</Link>
        </div>
        <div className="glass rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-4 py-2 text-[10px] text-white/35 uppercase border-b border-white/[0.06]">
            <span>Event</span><span>Back</span><span>Back</span><span></span>
          </div>
          {fixtures.slice(0, 8).map((f) => {
            const mo = f.markets.find((m) => m.type === 'MATCH_ODDS') ?? f.markets[0];
            const s0 = mo?.selections[0];
            const s1 = mo?.selections[1];
            return (
              <Link
                key={f.id}
                to={`/market/${f.id}`}
                className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-4 py-3 items-center border-b border-white/[0.04] hover:bg-white/[0.03] text-sm transition-colors group"
              >
                <div>
                  <p className="text-[10px] text-gold-400/70">{f.competition}</p>
                  <p className="font-medium group-hover:text-pitch-400 transition-colors">{f.homeShort} v {f.awayShort}</p>
                  {f.inPlay && <InPlayBadge />}
                </div>
                <span className="px-3 py-1.5 rounded-lg odds-back text-xs font-bold text-center min-w-[52px]">{s0?.back.toFixed(2)}</span>
                <span className="px-3 py-1.5 rounded-lg odds-back text-xs font-bold text-center min-w-[52px]">{s1?.back.toFixed(2)}</span>
                <span className="text-[10px] text-white/25">{f.sportSlug}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Casino — {CASINO_GAMES.length} games</h2>
          <Link to="/live-casino" className="text-xs text-pitch-400 hover:text-pitch-300">All games →</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {popularGames.map((g) => (
            <Link key={g.id} to="/live-casino" className="casino-card shrink-0 w-40 block">
              <div className="h-24 overflow-hidden relative">
                <img src={getCasinoThumbnail(g)} alt={g.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-pitch-950/80 to-transparent" />
              </div>
              <div className="p-2 bg-pitch-800/40">
                <p className="text-xs font-semibold truncate">{g.name}</p>
                <p className="text-[10px] text-white/40">{g.provider}</p>
              </div>
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
        <span className="text-[10px] text-pitch-400/70">{connected ? `Live · ${latencyMs}ms` : 'Connecting…'}</span>
      </div>
      <EventList fixtures={fixtures} />
    </div>
  );
}

export function EventList({ fixtures }: { fixtures: ReturnType<typeof useLiveOdds>['fixtures'] }) {
  if (!fixtures.length) return <p className="text-white/50 text-sm glass rounded-xl p-8 text-center">No in-play events right now</p>;
  return (
    <div className="glass rounded-xl divide-y divide-white/[0.04]">
      {fixtures.map((f) => {
        const mo = f.markets[0];
        return (
          <Link key={f.id} to={`/market/${f.id}`} className="flex flex-wrap items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors group">
            <div className="flex-1 min-w-[200px]">
              <p className="text-xs text-gold-400/70">{f.competition}</p>
              <p className="font-semibold group-hover:text-pitch-400 transition-colors">{f.homeTeam} vs {f.awayTeam}</p>
              <div className="flex gap-2 mt-1">
                {f.inPlay && <InPlayBadge />}
                {f.hasFancy && <span className="text-[10px] bg-pitch-500/20 text-pitch-400 px-2 py-0.5 rounded-full">Fancy</span>}
                {f.hasBookmaker && <span className="text-[10px] bg-amber-400/15 text-amber-300/80 px-2 py-0.5 rounded-full">BM</span>}
              </div>
            </div>
            <div className="flex gap-2">
              {mo?.selections.slice(0, 3).map((s) => (
                <div key={s.id} className="text-center">
                  <p className="text-[10px] text-white/35 mb-1">{s.name.slice(0, 10)}</p>
                  <span className="block px-4 py-2 rounded-lg odds-back text-sm font-bold">{s.back.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
