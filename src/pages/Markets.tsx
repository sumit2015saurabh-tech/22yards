import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFixture, type Fixture } from '@/data/fixtures';
import { subscribeOddsEvent } from '@/hooks/useLiveOdds';
import { BackLayCell, MarketHeader, InPlayBadge } from '@/components/exchange/ExchangeUI';
import { ExchangeBetSlip, OpenBetsPanel } from '@/components/exchange/BetSlip';
import { useBetSlip } from '@/context/BetSlipContext';
import { SPORTS } from '@/data/sports';
import { Tv } from 'lucide-react';

export function SportPage() {
  const { slug } = useParams();
  const sport = SPORTS.find((s) => s.slug === slug);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    import('@/data/fixtures').then(({ fixturesBySport }) => {
      setFixtures(fixturesBySport(slug));
    });
  }, [slug]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">{sport?.icon} {sport?.name ?? 'Sport'}</h1>
      <div className="bg-[#1a2832] rounded-lg border border-white/10 divide-y divide-white/5">
        {fixtures.map((f) => (
          <Link key={f.id} to={`/market/${f.id}`} className="block p-4 hover:bg-white/5">
            <p className="text-xs text-white/40">{f.competition}</p>
            <p className="font-semibold">{f.homeTeam} vs {f.awayTeam}</p>
            {f.inPlay && <InPlayBadge />}
          </Link>
        ))}
        {!fixtures.length && <p className="p-8 text-white/50 text-sm text-center">No fixtures scheduled</p>}
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

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <div>
          <p className="text-xs text-white/40">{fixture.competition}</p>
          <h1 className="text-xl font-bold">{fixture.homeTeam} vs {fixture.awayTeam}</h1>
          <div className="flex gap-2 mt-2">
            {fixture.inPlay && <InPlayBadge />}
            <Link to={`/ball-by-ball/${fixture.id}`} className="text-xs text-gold-400 underline">Ball by ball →</Link>
          </div>
        </div>
        <div className="flex gap-1">
          {(['odds', 'tv', 'score'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-semibold rounded ${tab === t ? 'bg-gold-500 text-pitch-950' : 'bg-white/10'}`}
            >
              {t === 'odds' ? 'Markets' : t === 'tv' ? 'TV' : 'Score'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {tab === 'odds' && fixture.markets.map((m) => (
            <div key={m.id} className="bg-[#1a2832] rounded-lg overflow-hidden border border-white/10">
              <MarketHeader name={m.name} type={m.type} />
              <div className="grid grid-cols-[1fr_72px_72px] gap-1 px-2 py-1 text-[10px] text-white/40 uppercase">
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
            <div className="bg-[#1a2832] rounded-lg p-8 text-center border border-white/10">
              <Tv className="w-12 h-12 mx-auto text-white/20 mb-3" />
              <p className="text-white/50 text-sm">Live stream available for verified accounts</p>
            </div>
          )}
          {tab === 'score' && (
            <div className="bg-[#1a2832] rounded-lg p-6 border border-white/10">
              <p className="text-2xl font-bold text-center">{fixture.homeShort} 142/4 (16.2)</p>
              <p className="text-center text-white/40 text-sm mt-2">Live score feed · updates every second</p>
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
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
              b === '4' || b === '6' ? 'bg-emerald-500' : b === 'W' ? 'bg-red-500' : 'bg-[#243a48]'
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
  const [pinned, setPinned] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('22yards_pins') ?? '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('22yards_pins', JSON.stringify(pinned));
  }, [pinned]);

  void setPinned;

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-4">Multi Markets</h1>
      <p className="text-white/50 text-sm mb-6">Pin events from sport pages to bet side-by-side.</p>
      {pinned.length === 0 ? (
        <p className="text-white/40 text-sm">No pinned markets yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {pinned.map((id) => (
            <Link key={id} to={`/market/${id}`} className="bg-[#1a2832] p-4 rounded-lg border border-white/10">
              Event {id}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
