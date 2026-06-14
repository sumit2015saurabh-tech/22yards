import { useBetSlip } from '@/context/BetSlipContext';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { useState } from 'react';
import { Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export function BetSlipPanel() {
  const { items, remove, clear, stake, setStake } = useBetSlip();
  const { token } = useAuth();
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const totalOdds = items.reduce((a, i) => a * i.odds, 1);
  const potential = Math.floor(stake * totalOdds);

  const place = async () => {
    if (!token) { setErr('Please sign in first'); return; }
    setLoading(true); setErr(''); setMsg('');
    try {
      await api.placeBet(token, stake, items.map((i) => ({ selectionId: i.selectionId })));
      setMsg('Bet placed successfully!');
      clear();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Failed to place bet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-6 sticky top-24">
      <h3 className="font-bold text-lg mb-4">Bet slip</h3>
      {items.length === 0 ? (
        <p className="text-white/50 text-sm">Tap odds to add selections</p>
      ) : (
        <div className="space-y-3 mb-4">
          {items.map((i) => (
            <div key={i.selectionId} className="flex justify-between items-start gap-2 p-3 rounded-lg bg-pitch-800/50 text-sm">
              <div>
                <p className="font-medium">{i.selectionName}</p>
                <p className="text-white/50 text-xs">{i.fixtureLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold-400 font-bold">{i.odds.toFixed(2)}</span>
                <button type="button" onClick={() => remove(i.selectionId)} className="text-white/40 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3 border-t border-white/10 pt-4">
        <label className="block text-sm text-white/60">
          Stake (points)
          <input
            type="number"
            min={1}
            value={stake}
            onChange={(e) => setStake(Number(e.target.value))}
            className="mt-1 w-full px-4 py-2 rounded-lg bg-pitch-800 border border-white/10 focus:border-pitch-500 outline-none"
          />
        </label>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Total odds</span>
          <span className="font-bold">{totalOdds.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Potential return</span>
          <span className="font-bold text-gold-400">{potential} pts</span>
        </div>
        <p className="text-xs text-white/40">
          Returns are not guaranteed. Past performance does not predict future results.
        </p>
        <button type="button" className="btn-primary w-full disabled:opacity-50" disabled={!items.length || loading} onClick={place}>
          {loading ? 'Placing…' : 'Place bet'}
        </button>
        {msg && <p className="text-pitch-500 text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" />{msg}</p>}
        {err && <p className="text-red-400 text-sm flex items-center gap-1"><AlertCircle className="w-4 h-4" />{err}</p>}
      </div>
    </div>
  );
}
