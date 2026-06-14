import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFixture, fixturesBySport, type Fixture } from '@/data/fixtures';
import { subscribeOddsEvent } from '@/hooks/useLiveOdds';
import { BackLayCell, MarketHeader, InPlayBadge } from '@/components/exchange/ExchangeUI';
import { ExchangeBetSlip, OpenBetsPanel } from '@/components/exchange/BetSlip';
import { useBetSlip } from '@/context/BetSlipContext';
import { SPORTS } from '@/data/sports';
import { SPORT_IMAGES } from '@/data/casinoImages';
import { Tv, Clock, ChevronRight } from 'lucide-react';

export function SportPage() {
  const { slug } = useParams();
  const sport = SPORTS.find((s) => s.slug === slug);
  const [fixtures, setFixtures] = useState<Fixture[]>(() => fixturesBySport(slug));

  useEffect(() => {
    setFixtures(fixturesBySport(slug));
  }, [slug]);

  const banner = slug ? SPORT_IMAGES[slug] : undefined;
  const isWeather = slug === 'weather';

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      {banner && (
        <div className="relative h-36 md:h-44 rounded-2xl overflow-hidden mb-6">
          <img src={banner} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-pitch-950/90 via-pitch-950/50 to-transparent flex items-center px-6">
            <div>
              <p className="text-3xl">{sport?.icon}</p>
              <h1 className="text-2xl font-bold mt-1">{sport?.name}</h1>
              <p className="text-white/50 text-sm mt-1">
                {fixtures.length} market{fixtures.length !== 1 ? 's' : ''} available
                {isWeather && ' · Rainfall, temperature & forecast'}
              </p>
            </div>
          </div>
        </div>
      )}

      {!banner && (
        <h1 className="text-xl font-bold mb-4">{sport?.icon} {sport?.name ?? 'Sport'}</h1>
      )}

      <div className="grid gap-4">
        {fixtures.map((f) => {
          const mo = f.markets[0];
          const s0 = mo?.selections[0];
          const s1 = mo?.selections[1];
          return (
            <Link
              key={f.id}
              to={`/market/${f.id}`}
              className="sport-card flex flex-wrap items-center gap-4 p-4 bg-pitch-800/30 group"
            >
              <div className="flex-1 min-w-[200px]">
                <p className="text-xs text-gold-400/80">{f.competition}</p>
                <p className="font-semibold text-lg mt-0.5 group-hover:text-pitch-400 transition-colors">
                  {f.homeTeam} <span className="text-white/30 font-normal">vs</span> {f.awayTeam}
                </p>
                <div className="flex flex-wrap gap-2 mt-2 items-center">
                  {f.inPlay && <InPlayBadge />}
                  {f.hasFancy && <span className="text-[10px] bg-pitch-500/20 text-pitch-400 px-2 py-0.5 rounded-full">Fancy</span>}
                  {f.hasBookmaker && <span className="text-[10px] bg-amber-400/15 text-amber-300/90 px-2 py-0.5 rounded-full">Bookmaker</span>}
                  <span className="text-[10px] text-white/35 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(f.startTime).toLocaleString()}
                  </span>
                </div>
              </div>
              {s0 && s1 && (
                <div className="flex gap-2 items-center">
                  <div className="text-center">
                    <p className="text-[10px] text-white/40 mb-1">{s0.name.slice(0, 12)}</p>
                    <span className="block px-4 py-2 rounded-lg odds-back text-sm font-bold min-w-[64px]">{s0.back.toFixed(2)}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-white/40 mb-1">{s1.name.slice(0, 12)}</p>
                    <span className="block px-4 py-2 rounded-lg odds-back text-sm font-bold min-w-[64px]">{s1.back.toFixed(2)}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-pitch-400 transition-colors" />
                </div>
              )}
            </Link>
          );
        })}
        {!fixtures.length && (
          <div className="text-center py-16 glass rounded-2xl">
            <p className="text-white/50">No fixtures scheduled for this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function FullMarketPage() {
  const { eventId } = useParams();
  const [fixture, setFixture] = useState<Fixture | undefined>(() => getFixture(eventId ?? ''));
  const [tab, setTab] = useState<'odds' | 'tv' | 'score'>('odds');
  const { add } = useBetSlip();

  useEffect(() => {
    if (!eventId) return;
    setFixture(getFixture(eventId));
    return subscribeOddsEvent(eventId, ([f]) => setFixture(f));
  }, [eventId]);

  if (!fixture) return <p className="p-8 text-center text-white/50">Event not found</p>;

  const sportImg = SPORT_IMAGES[fixture.sportSlug];

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      {sportImg && (
        <div className="h-24 rounded-xl overflow-hidden mb-4 opacity-60">
          <img src={sportImg} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <div>
          <p className="text-xs text-gold-400/80">{fixture.competition}</p>
          <h1 className="text-xl font-bold">{fixture.homeTeam} vs {fixture.awayTeam}</h1>
          <div className="flex gap-2 mt-2">
            {fixture.inPlay && <InPlayBadge />}
            {fixture.sportSlug === 'cricket' && (
              <Link to={`/ball-by-ball/${fixture.id}`} className="text-xs text-pitch-400 underline hover:text-pitch-300">Ball by ball →</Link>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          {(['odds', 'tv', 'score'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all border ${
                tab === t ? 'tab-active' : 'tab-inactive'
              }`}
            >
              {t === 'odds' ? 'Markets' : t === 'tv' ? 'TV' : 'Score'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {tab === 'odds' && fixture.markets.map((m) => (
            <div key={m.id} className="bg-pitch-800/40 rounded-xl overflow-hidden border border-white/[0.06] shadow-sm">
              <MarketHeader name={m.name} type={m.type} />
              <div className="grid grid-cols-[1fr_72px_72px] gap-1 px-3 py-1.5 text-[10px] text-white/35 uppercase">
                <span>Selection</span><span className="text-center">Back</span><span className="text-center">Lay</span>
              </div>
              {m.selections.map((s) => (
                <BackLayCell
                  key={s.id}
                  selection={s}
                  onBack={() => add({
                    selectionId: s.id,
                    selectionName: s.name,
                    marketName: m.name,
                    fixtureLabel: `${fixture.homeShort} v ${fixture.awayShort}`,
                    odds: s.back,
                  })}
                  onLay={() => add({
                    selectionId: `${s.id}-lay`,
                    selectionName: `${s.name} (Lay)`,
                    marketName: m.name,
                    fixtureLabel: `${fixture.homeShort} v ${fixture.awayShort}`,
                    odds: s.lay,
                  })}
                />
              ))}
              <p className="px-4 py-2 text-[10px] text-white/30">Min {m.minStake} · Max {m.maxStake} pts</p>
            </div>
          ))}
          {tab === 'tv' && (
            <div className="glass rounded-xl p-8 text-center">
              <Tv className="w-12 h-12 mx-auto text-white/20 mb-3" />
              <p className="text-white/50 text-sm">Live stream available for verified accounts</p>
            </div>
          )}
          {tab === 'score' && (
            <div className="glass rounded-xl p-6">
              {fixture.sportSlug === 'weather' ? (
                <>
                  <p className="text-2xl font-bold text-center">🌡️ 34°C · 💧 62% humidity</p>
                  <p className="text-center text-white/40 text-sm mt-2">Forecast updates every minute</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-center">{fixture.homeShort} 142/4 (16.2)</p>
                  <p className="text-center text-white/40 text-sm mt-2">Live score feed</p>
                </>
              )}
            </div>
          )}
        </div>
        <div>
          <ExchangeBetSlip />
          <OpenBetsPanel />
        </div>
      </div>
    </div>
  );
}

export function BallByBallPage() {
  const { eventId } = useParams();
  const fixture = getFixture(eventId ?? '');
  const balls = ['1', '4', '0', '6', 'W', '2', '1', '0', '4', '1'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-2">Ball by Ball</h1>
      <p className="text-white/50 text-sm mb-6">{fixture?.homeTeam} vs {fixture?.awayTeam}</p>
      <div className="flex flex-wrap gap-2">
        {balls.map((b, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-transform hover:scale-110 ${
              b === '4' || b === '6' ? 'bg-pitch-500 text-white' : b === 'W' ? 'bg-amber-600/80' : 'bg-pitch-800/80 border border-white/[0.06]'
            }`}
          >
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MultiMarketPage() {
  const [pinned] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('22yards_pins') ?? '[]'); } catch { return []; }
  });

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Multi Markets</h1>
      <p className="text-white/50 text-sm mb-6">Pin events from sport pages to bet side-by-side.</p>
      {pinned.length === 0 ? (
        <p className="text-white/40 text-sm glass rounded-xl p-8 text-center">Browse sports and pin markets to compare odds here.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {pinned.map((id) => (
            <Link key={id} to={`/market/${id}`} className="sport-card p-4 bg-pitch-800/30">
              Event {id}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
