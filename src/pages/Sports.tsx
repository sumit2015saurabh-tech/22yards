import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, type Fixture, type Market } from '@/lib/api';
import { useBetSlip } from '@/context/BetSlipContext';
import { useAuth } from '@/context/AuthContext';
import { BetSlipPanel } from '@/components/BetSlipPanel';
import { Loader2 } from 'lucide-react';

export function SportsPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const { add } = useBetSlip();
  const { token } = useAuth();

  useEffect(() => {
    api.fixtures('cricket').then((r) => {
      setFixtures(r.items);
      const fid = params.get('fixture') ?? r.items[0]?.id;
      if (fid) setSelected(fid);
    }).finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    if (!selected) return;
    api.markets(selected).then((r) => setMarkets(r.items)).catch(() => setMarkets([]));
  }, [selected]);

  const fixture = fixtures.find((f) => f.id === selected);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Cricket</h1>
      <p className="text-white/50 mb-8">Select a match and add selections to your slip</p>

      {loading ? (
        <Loader2 className="animate-spin w-8 h-8 text-pitch-500" />
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {fixtures.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelected(f.id)}
                  className={`shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    selected === f.id ? 'bg-pitch-600 text-white' : 'glass hover:bg-white/10'
                  }`}
                >
                  {f.homeTeam.shortName ?? f.homeTeam.name.slice(0, 3)} vs {f.awayTeam.shortName ?? f.awayTeam.name.slice(0, 3)}
                </button>
              ))}
            </div>

            {fixture && (
              <div className="glass rounded-2xl p-6 mb-6">
                <p className="text-gold-400 text-sm">{fixture.competition.name}</p>
                <h2 className="text-2xl font-bold mt-1">
                  {fixture.homeTeam.name} <span className="text-white/40 font-normal">vs</span> {fixture.awayTeam.name}
                </h2>
                <p className="text-white/50 text-sm mt-2">{new Date(fixture.startTime).toLocaleString()} · {fixture.status}</p>
              </div>
            )}

            {markets.map((m) => (
              <div key={m.id} className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4">{m.name}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {m.selections.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => add({
                        selectionId: s.id,
                        selectionName: s.name,
                        marketName: m.name,
                        fixtureLabel: fixture ? `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}` : '',
                        odds: Number(s.odds),
                      })}
                      className="flex justify-between items-center p-4 rounded-xl bg-pitch-800/50 hover:bg-pitch-700/50 border border-transparent hover:border-pitch-500 transition-all"
                    >
                      <span>{s.name}</span>
                      <span className="font-bold text-gold-400">{Number(s.odds).toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {!token && (
              <p className="text-sm text-white/50 text-center py-4">
                Sign in to place bets with your points balance.
              </p>
            )}
          </div>

          <div className="lg:col-span-1">
            <BetSlipPanel />
          </div>
        </div>
      )}
    </div>
  );
}
