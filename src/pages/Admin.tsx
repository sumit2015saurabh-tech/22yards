import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, type Withdrawal, type WalletUser, type Notification } from '@/lib/api';
import { Navigate } from 'react-router-dom';
import { Bell, Users, Wallet, Check, X } from 'lucide-react';

export function AdminPage() {
  const { token, isAdmin } = useAuth();
  const [users, setUsers] = useState<WalletUser[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [depositUserId, setDepositUserId] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositNote, setDepositNote] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => {
    if (!token) return;
    api.adminUsers(token).then((r) => setUsers(r.items)).catch(() => {});
    api.adminWithdrawals(token).then((r) => setWithdrawals(r.items.filter((w) => w.status === 'PENDING'))).catch(() => {});
    api.adminNotifications(token).then((r) => setNotifications(r.items)).catch(() => {});
  };

  useEffect(load, [token]);

  if (!isAdmin) return <Navigate to="/" replace />;

  const deposit = async () => {
    if (!token || !depositUserId || !depositAmount) return;
    await api.adminDeposit(token, depositUserId, Number(depositAmount), depositNote);
    setMsg('Points credited successfully');
    setDepositAmount('');
    load();
  };

  const approve = async (id: string) => {
    if (!token) return;
    await api.approveWithdrawal(token, id, 'Approved offline');
    load();
  };

  const reject = async (id: string) => {
    if (!token) return;
    await api.rejectWithdrawal(token, id, 'Rejected — contact support');
    load();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Users className="w-8 h-8 text-gold-400" /> Admin Dashboard
      </h1>

      {notifications.length > 0 && (
        <div className="glass rounded-2xl p-4 border-gold-400/30">
          <h2 className="font-semibold flex items-center gap-2 mb-2"><Bell className="w-4 h-4" /> Alerts</h2>
          {notifications.slice(0, 3).map((n) => (
            <p key={n.id} className="text-sm text-white/70">{n.title}: {n.message}</p>
          ))}
        </div>
      )}

      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><Wallet className="w-5 h-5" /> Credit points to user</h2>
        <p className="text-xs text-white/50">Offline deposit — no payment gateway. User receives points after admin verification.</p>
        <div className="grid sm:grid-cols-3 gap-3">
          <input placeholder="User ID" value={depositUserId} onChange={(e) => setDepositUserId(e.target.value)} className="px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" />
          <input type="number" placeholder="Points" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" />
          <input placeholder="Note" value={depositNote} onChange={(e) => setDepositNote(e.target.value)} className="px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" />
        </div>
        <button type="button" className="btn-gold" onClick={deposit}>Deposit points</button>
        {msg && <p className="text-pitch-500 text-sm">{msg}</p>}
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Pending withdrawals</h2>
        {withdrawals.length === 0 ? (
          <p className="text-white/50 text-sm">No pending requests</p>
        ) : (
          <div className="space-y-3">
            {withdrawals.map((w) => (
              <div key={w.id} className="flex flex-wrap justify-between items-center gap-4 p-4 rounded-xl bg-pitch-800/50">
                <div>
                  <p className="font-medium">{w.amount} points</p>
                  <p className="text-xs text-white/50">User: {w.userId.slice(0, 8)}… · {new Date(w.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="flex items-center gap-1 px-4 py-2 rounded-lg bg-pitch-600 hover:bg-pitch-500 text-sm" onClick={() => approve(w.id)}>
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button type="button" className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-900/50 hover:bg-red-800/50 text-sm" onClick={() => reject(w.id)}>
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-semibold mb-4">User wallets</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/50 border-b border-white/10">
                <th className="text-left py-2">User ID</th>
                <th className="text-right py-2">Balance</th>
                <th className="text-right py-2">Available</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userId} className="border-b border-white/5">
                  <td className="py-3 font-mono text-xs">{u.userId}</td>
                  <td className="py-3 text-right">{u.balance}</td>
                  <td className="py-3 text-right text-gold-400">{u.availableBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
