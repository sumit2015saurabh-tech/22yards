import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function ProfilePage() {
  const { user, token, logout } = useAuth();
  const [days, setDays] = useState(30);
  const [msg, setMsg] = useState('');

  if (!user) return <div className="p-8 text-center"><Link to="/login" className="text-gold-400">Sign in</Link></div>;

  const selfExclude = async () => {
    if (!token) return;
    await api.selfExclude(token, days);
    setMsg(`Self-exclusion activated for ${days} days.`);
    setTimeout(logout, 2000);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="glass rounded-2xl p-6 space-y-3 text-sm">
        <p><span className="text-white/50">Name:</span> {user.name}</p>
        <p><span className="text-white/50">Username:</span> {user.username}</p>
        <p><span className="text-white/50">Email:</span> {user.email}</p>
        <p><span className="text-white/50">Location:</span> {user.district}, {user.state}</p>
      </div>
      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-red-400">Self-exclusion</h2>
        <p className="text-xs text-white/50">Temporarily block your account from participation.</p>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl bg-pitch-800 border border-white/10">
          <option value={30}>30 days</option>
          <option value={90}>90 days</option>
          <option value={180}>180 days</option>
        </select>
        <button type="button" className="w-full py-3 rounded-xl border border-red-500/50 text-red-400 hover:bg-red-900/20" onClick={selfExclude}>
          Activate self-exclusion
        </button>
        {msg && <p className="text-sm text-pitch-500">{msg}</p>}
      </div>
    </div>
  );
}

export function SupportPage() {
  const { token } = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    await api.supportTicket(token, subject, message);
    setSent(true);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Support</h1>
      {!token ? (
        <p className="text-white/50"><Link to="/login" className="text-gold-400">Sign in</Link> to contact support.</p>
      ) : sent ? (
        <p className="text-pitch-500">Ticket submitted. We&apos;ll respond within 24 hours.</p>
      ) : (
        <form onSubmit={submit} className="glass rounded-2xl p-6 space-y-4">
          <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" required />
          <textarea placeholder="Message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" required />
          <button type="submit" className="btn-primary w-full">Submit ticket</button>
        </form>
      )}
    </div>
  );
}
