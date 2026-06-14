import { useEffect, useState } from 'react';
import { api, type CasinoGame } from '@/lib/api';
import { DEMO_CASINO, DEMO_PROMOTIONS } from '@/lib/demo';
import { useAuth } from '@/context/AuthContext';
import { Gamepad2 } from 'lucide-react';

export function CasinoPage() {
  const [games, setGames] = useState<CasinoGame[]>([]);

  useEffect(() => {
    api.casinoGames().then(setGames).catch(() => setGames(DEMO_CASINO));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Casino</h1>
      <p className="text-white/50 mb-8">Play with points — entertainment only, 18+</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((g) => (
          <div key={g.id} className="glass rounded-2xl p-6 card-hover">
            <Gamepad2 className="w-10 h-10 text-gold-400 mb-4" />
            <h3 className="text-xl font-bold">{g.name}</h3>
            <p className="text-sm text-white/50 capitalize mt-1">{g.category}</p>
            <p className="text-xs text-white/40 mt-4">Min {g.minBet} · Max {g.maxBet} pts</p>
          </div>
        ))}
        {games.length === 0 && (
          <p className="text-white/50 col-span-full text-center py-12">Games loading when backend is connected…</p>
        )}
      </div>
    </div>
  );
}

export function PromotionsPage() {
  const { token } = useAuth();
  const [promos, setPromos] = useState<Awaited<ReturnType<typeof api.promotions>>>([]);
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => { api.promotions().then(setPromos).catch(() => setPromos(DEMO_PROMOTIONS)); }, []);

  const redeem = async () => {
    if (!token) { setMsg('Sign in to redeem codes'); return; }
    if (!code.trim()) return;
    try {
      const res = await api.redeemPromo(token, code.trim()) as { bonusAmount?: number };
      setMsg(`Redeemed! +${res.bonusAmount ?? 0} bonus points added to your wallet.`);
      setCode('');
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : 'Invalid code');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Promotions</h1>
      <div className="glass rounded-2xl p-6 flex gap-3">
        <input placeholder="Enter promo code" value={code} onChange={(e) => setCode(e.target.value)} className="flex-1 px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" />
        <button type="button" className="btn-gold" onClick={redeem}>Redeem</button>
      </div>
      {msg && <p className="text-sm text-white/60">{msg}</p>}
      <div className="space-y-4">
        {promos.map((p) => (
          <div key={p.id} className="glass rounded-2xl p-6">
            <span className="text-gold-400 font-mono text-sm">{p.code}</span>
            <h3 className="text-xl font-bold mt-2">{p.name}</h3>
            <p className="text-white/60 text-sm mt-2">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
