import { useBetSlip } from '@/context/BetSlipContext';
import { Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

const QUICK_STAKES = [100, 200, 500, 5000, 10000, 25000, 50000, 100000];

export function ExchangeBetSlip() {
  const { items, remove, clear, stake, setStake } = useBetSlip();
  const { token } = useAuth();
  const [side, setSide] = useState<'back' | 'lay'>('back');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const totalOdds = items.reduce((a, i) => a * i.odds, 1);
  const potential = Math.floor(stake * totalOdds);
  const liability = side === 'lay' ? Math.floor(stake * (totalOdds - 1)) : stake;

  const place = async () => {
    if (!token) { setErr('Sign in to place bets'); return; }
    setLoading(true); setErr(''); setMsg('');
    try {
      await api.placeBet(token, stake, items.map((i) => ({ selectionId: i.selectionId })));
      setMsg(`${side === 'back' ? 'Back' : 'Lay'} bet placed — exposure updated`);
      clear();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Bet failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a2832] border border-white/10 rounded-lg overflow-hidden sticky top-20">
      <div className="flex border-b border-white/10">
        {(['back', 'lay'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSide(s)}
            className={`flex-1 py-2.5 text-sm font-bold uppercase ${
              side === s
                ? s === 'back' ? 'bg-[#1a8ee1] text-white' : 'bg-[#f4496d] text-white'
                : 'text-white/50 hover:bg-white/5'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-white/40 text-sm text-center py-6">Click back or lay odds to add selections</p>
        ) : items.map((i) => (
          <div key={i.selectionId} className="p-3 rounded bg-[#243a48] text-sm">
            <div className="flex justify-between">
              <span className="font-medium">{i.selectionName}</span>
              <button type="button" onClick={() => remove(i.selectionId)} className="text-white/40 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-white/50 mt-1">{i.fixtureLabel} · {i.marketName}</p>
            <p className={`text-sm font-bold mt-1 ${side === 'back' ? 'text-[#1a8ee1]' : 'text-[#f4496d]'}`}>
              {i.odds.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="flex flex-wrap gap-1">
          {QUICK_STAKES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStake(s)}
              className="px-2 py-1 text-[10px] rounded bg-white/10 hover:bg-white/20"
            >
              {s >= 100000 ? `${s / 100000}L` : s >= 1000 ? `${s / 1000}K` : s}
            </button>
          ))}
        </div>
        <input
          type="number"
          value={stake}
          onChange={(e) => setStake(Number(e.target.value))}
          className="w-full px-3 py-2 rounded bg-[#0f1a20] border border-white/10 text-sm"
          min={1}
        />
        <div className="flex justify-between text-xs text-white/60">
          <span>{side === 'lay' ? 'Liability' : 'Potential win'}</span>
          <span className="font-bold text-gold-400">{side === 'lay' ? liability : potential} pts</span>
        </div>
        <button
          type="button"
          disabled={!items.length || loading}
          onClick={place}
          className={`w-full py-3 rounded font-bold text-sm disabled:opacity-40 ${
            side === 'back' ? 'bg-[#1a8ee1] hover:bg-[#1578c4]' : 'bg-[#f4496d] hover:bg-[#e03a5d]'
          }`}
        >
          {loading ? 'Placing…' : `Place ${side} bet`}
        </button>
        {msg && <p className="text-emerald-400 text-xs flex gap-1"><CheckCircle className="w-3 h-3" />{msg}</p>}
        {err && <p className="text-red-400 text-xs flex gap-1"><AlertCircle className="w-3 h-3" />{err}</p>}
        <p className="text-[10px] text-white/30">Odds update in real-time. Stale prices auto-refresh.</p>
      </div>
    </div>
  );
}

export function OpenBetsPanel() {
  const { token } = useAuth();
  if (!token) return null;
  return (
    <div className="bg-[#1a2832] border border-white/10 rounded-lg p-4 mt-4">
      <h3 className="font-bold text-sm mb-3">Open Bets</h3>
      <p className="text-white/40 text-xs">Matched and unmatched bets appear here with live exposure.</p>
    </div>
  );
}
