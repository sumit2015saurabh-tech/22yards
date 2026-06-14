import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  User, FileText, History, TrendingUp, Activity, Settings, Shield, Wallet,
} from 'lucide-react';

const LINKS = [
  { to: '/account/profile', icon: User, label: 'My Profile' },
  { to: '/wallet', icon: Wallet, label: 'My Wallet' },
  { to: '/account/statement', icon: FileText, label: 'Account Statement' },
  { to: '/account/bets', icon: History, label: 'Bet History' },
  { to: '/account/pnl', icon: TrendingUp, label: 'Profit & Loss' },
  { to: '/account/activity', icon: Activity, label: 'Activity Log' },
  { to: '/kyc', icon: Shield, label: 'KYC Verification' },
  { to: '/account/settings', icon: Settings, label: 'Settings' },
  { to: '/profile', icon: Shield, label: 'Self-Exclusion' },
  { to: '/support', icon: FileText, label: 'Support' },
];

export function AccountHubPage() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      <div className="grid sm:grid-cols-2 gap-3">
        {LINKS.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 p-4 bg-[#1a2832] rounded-lg border border-white/10 hover:border-gold-400/30 transition-colors"
          >
            <Icon className="w-5 h-5 text-gold-400" />
            <span className="font-medium text-sm">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function AccountStatementPage() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Account Statement</h1>
      <div className="bg-[#1a2832] rounded-lg border border-white/10 p-4 text-sm text-white/50">
        Full ledger of deposits, bets, casino, bonuses, and withdrawals.
      </div>
    </div>
  );
}

export function BetHistoryPage() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Bet History</h1>
      <p className="text-white/50 text-sm">Matched, unmatched, and settled exchange bets.</p>
    </div>
  );
}

export function ProfitLossPage() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Profit & Loss</h1>
      <p className="text-white/50 text-sm">P/L by sport, event, and market type — match odds, fancy, bookmaker.</p>
    </div>
  );
}

export function ActivityLogPage() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Activity Log</h1>
      <p className="text-white/50 text-sm">Login history, password changes, and security events.</p>
    </div>
  );
}

export function SettingsPage() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  const themes = ['Classic', 'Dark Teal', 'Midnight', 'Cricket Green'];
  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold">Settings</h1>
      <div className="bg-[#1a2832] rounded-lg p-4 border border-white/10">
        <p className="text-sm font-semibold mb-3">Theme</p>
        <div className="grid grid-cols-2 gap-2">
          {themes.map((t) => (
            <button key={t} type="button" className="py-2 text-xs rounded bg-white/10 hover:bg-gold-500/20">{t}</button>
          ))}
        </div>
      </div>
      <div className="bg-[#1a2832] rounded-lg p-4 border border-white/10">
        <p className="text-sm font-semibold mb-2">Default stakes</p>
        <p className="text-xs text-white/50">100 · 200 · 500 · 5K · 10K · 25K · 50K · 1L</p>
      </div>
    </div>
  );
}

export function KycPage() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold">KYC Verification</h1>
      <p className="text-white/50 text-sm">Upload identity documents for account verification. Required before large withdrawals.</p>
      <div className="bg-[#1a2832] rounded-lg p-6 border border-white/10 space-y-4">
        <div>
          <label className="text-xs text-white/60">ID proof (Aadhaar / Passport)</label>
          <input type="file" className="mt-1 w-full text-sm" />
        </div>
        <div>
          <label className="text-xs text-white/60">Address proof</label>
          <input type="file" className="mt-1 w-full text-sm" />
        </div>
        <button type="button" className="w-full py-3 bg-gold-500 text-pitch-950 rounded font-bold text-sm">Submit for review</button>
        <p className="text-[10px] text-white/30">Documents reviewed within 24–48 hours by admin team.</p>
      </div>
    </div>
  );
}

export function ProfileDetailPage() {
  const { user, token } = useAuth();
  if (!token || !user) return <Navigate to="/login" replace />;
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">My Profile</h1>
      <div className="bg-[#1a2832] rounded-lg p-6 border border-white/10 space-y-3 text-sm">
        <p><span className="text-white/40">Name</span><br />{user.name}</p>
        <p><span className="text-white/40">Username</span><br />{user.username}</p>
        <p><span className="text-white/40">Email</span><br />{user.email}</p>
        <p><span className="text-white/40">Location</span><br />{user.district}, {user.state}</p>
      </div>
    </div>
  );
}
