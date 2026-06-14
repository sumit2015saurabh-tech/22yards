import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, type Transaction } from '@/lib/api';
import { Link } from 'react-router-dom';
import { ArrowDownCircle, ArrowUpCircle, History } from 'lucide-react';

export function WalletPage() {
  const { token } = useAuth();
  const [balance, setBalance] = useState({ balance: 0, availableBalance: 0, reservedBalance: 0 });
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => {
    if (!token) return;
    api.balance(token).then(setBalance);
    api.transactions(token).then((r) => setTxns(r.items));
  };

  useEffect(load, [token]);

  const requestWithdrawal = async () => {
    if (!token || !amount) return;
    try {
      await api.withdrawal(token, Number(amount), note);
      setMsg('Withdrawal request submitted. Admin will process offline.');
      setAmount('');
      load();
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : 'Failed');
    }
  };

  if (!token) return <div className="p-8 text-center">Please <Link to="/login" className="text-gold-400">sign in</Link></div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">My Wallet</h1>
      <p className="text-white/50 text-sm">
        Points are virtual entertainment credits managed by 22yards administrators.
        Deposits and withdrawals are processed offline — not via payment gateways.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Total balance', value: balance.balance, icon: ArrowDownCircle },
          { label: 'Available', value: balance.availableBalance, icon: ArrowUpCircle },
          { label: 'Reserved', value: balance.reservedBalance, icon: History },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass rounded-2xl p-6 text-center">
            <Icon className="w-6 h-6 text-gold-400 mx-auto mb-2" />
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-white/50 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold">Request withdrawal</h2>
        <p className="text-xs text-white/50">
          Submit a request. Our team will verify and process your payout offline.
        </p>
        <input
          type="number"
          placeholder="Amount (points)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-pitch-800 border border-white/10"
        />
        <input
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-pitch-800 border border-white/10"
        />
        <button type="button" className="btn-primary w-full" onClick={requestWithdrawal}>Submit request</button>
        {msg && <p className="text-sm text-pitch-500">{msg}</p>}
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Transaction history</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {txns.map((t) => (
            <div key={t.id} className="flex justify-between items-center py-3 border-b border-white/5 text-sm">
              <div>
                <p className="font-medium">{t.type.replace(/_/g, ' ')}</p>
                <p className="text-white/40 text-xs">{new Date(t.createdAt).toLocaleString()}</p>
              </div>
              <span className={t.amount >= 0 ? 'text-pitch-500' : 'text-red-400'}>
                {t.amount >= 0 ? '+' : ''}{t.amount}
              </span>
            </div>
          ))}
          {txns.length === 0 && <p className="text-white/50 text-sm">No transactions yet</p>}
        </div>
      </div>
    </div>
  );
}
