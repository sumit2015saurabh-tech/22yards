import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      nav('/');
    } catch {
      setErr('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-2xl p-8 space-y-5">
        <h1 className="text-2xl font-bold text-center">Welcome back</h1>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" required />
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <button type="submit" className="btn-primary w-full">Sign in</button>
        <p className="text-center text-sm text-white/50">
          New here? <Link to="/register" className="text-gold-400">Create account</Link>
        </p>
      </form>
    </div>
  );
}

export function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: '', name: '', email: '', password: '', state: '', district: '',
  });
  const [err, setErr] = useState('');
  const [agreed, setAgreed] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setErr('You must accept the Terms and confirm you are 18+'); return; }
    try {
      await register(form);
      nav('/');
    } catch {
      setErr('Registration failed — username or email may exist');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <form onSubmit={submit} className="glass w-full max-w-lg rounded-2xl p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center">Join 22yards</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Username" value={form.username} onChange={set('username')} className="px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" required />
          <input placeholder="Full name" value={form.name} onChange={set('name')} className="px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" required />
          <input type="email" placeholder="Email" value={form.email} onChange={set('email')} className="px-4 py-3 rounded-xl bg-pitch-800 border border-white/10 sm:col-span-2" required />
          <input type="password" placeholder="Password" value={form.password} onChange={set('password')} className="px-4 py-3 rounded-xl bg-pitch-800 border border-white/10 sm:col-span-2" required />
          <input placeholder="State" value={form.state} onChange={set('state')} className="px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" required />
          <input placeholder="District" value={form.district} onChange={set('district')} className="px-4 py-3 rounded-xl bg-pitch-800 border border-white/10" required />
        </div>
        <label className="flex gap-3 text-sm text-white/70 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
          I am 18+, I accept the <Link to="/terms" className="text-gold-400 underline">Terms</Link> and{' '}
          <Link to="/privacy" className="text-gold-400 underline">Privacy Policy</Link>, and understand points are virtual credits.
        </label>
        {err && <p className="text-red-400 text-sm">{err}</p>}
        <button type="submit" className="btn-gold w-full">Create account</button>
      </form>
    </div>
  );
}
