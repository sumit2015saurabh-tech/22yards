import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Wallet, User, LogOut, LayoutDashboard, Radio } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SPORTS, EXCHANGE_MODES, NEWS_TICKER } from '@/data/sports';
import { isDemoMode } from '@/lib/api';

const navLink = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
    isActive ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'
  }`;

export function NewsMarquee() {
  return (
    <div className="bg-[#1a2832] border-b border-white/5 overflow-hidden">
      <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap py-1.5">
        {[...NEWS_TICKER, ...NEWS_TICKER].map((t, i) => (
          <span key={i} className="mx-8 text-xs text-white/60">🎙 {t}</span>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const { user, logout, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#0f1a20] border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-3 h-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-8 w-8 rounded-full" />
            <span className="font-bold text-lg">
              <span className="text-gold-400">22</span><span className="text-white">yards</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {EXCHANGE_MODES.map((m) => (
              <NavLink key={m.id} to={m.path} className={navLink}>{m.label}</NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {isDemoMode && (
              <span className="hidden sm:flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                <Radio className="w-3 h-3" /> Live odds
              </span>
            )}
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="text-xs text-gold-400 hidden sm:block"><LayoutDashboard className="w-4 h-4 inline" /> Admin</Link>
                )}
                <Link to="/wallet" className="flex items-center gap-1 text-xs bg-gold-500 text-pitch-950 px-3 py-1.5 rounded font-bold">
                  <Wallet className="w-3.5 h-3.5" /> Wallet
                </Link>
                <Link to="/account" className="p-1.5 hover:bg-white/10 rounded"><User className="w-4 h-4" /></Link>
                <button type="button" onClick={() => { logout(); nav('/'); }} className="p-1.5 hover:bg-white/10 rounded text-white/50">
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-xs text-white/70 px-3">Login</Link>
                <Link to="/register" className="text-xs bg-gradient-to-r from-gold-500 to-gold-400 text-pitch-950 px-4 py-1.5 rounded-lg font-bold shadow-sm hover:brightness-110 transition-all">Join</Link>
              </>
            )}
            <button type="button" className="lg:hidden p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pitch-700 via-pitch-600 to-pitch-500 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-3 py-1.5 flex gap-2 overflow-x-auto scrollbar-hide">
          <NavLink to="/inplay" className={navLink}>In-Play</NavLink>
          <NavLink to="/multimarket" className={navLink}>Multi Markets</NavLink>
          {SPORTS.map((s) => (
            <NavLink key={s.id} to={`/sport/${s.slug}`} className={navLink}>{s.icon} {s.name}</NavLink>
          ))}
          <NavLink to="/live-casino" className={navLink}>🎰 Live Casino</NavLink>
          <NavLink to="/sport/weather" className={navLink}>🌤️ Weather</NavLink>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#1a2832] border-b border-white/10 p-3 grid grid-cols-2 gap-2">
          {EXCHANGE_MODES.map((m) => (
            <NavLink key={m.id} to={m.path} className={navLink} onClick={() => setMenuOpen(false)}>{m.label}</NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0f1a20] border-t border-white/10 flex">
      {[
        { to: '/exchange', label: 'Exchange' },
        { to: '/sport/cricket', label: 'Sports' },
        { to: '/multimarket', label: 'Bets' },
        { to: '/account', label: 'Account' },
      ].map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 py-3 text-center text-[10px] font-semibold ${isActive ? 'text-gold-400' : 'text-white/50'}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0f1a20] border-t border-white/10 mt-auto pb-20 md:pb-0">
      <div className="max-w-[1600px] mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-bold text-gold-400 mb-2">22yards Exchange</p>
          <p className="text-white/50 text-xs leading-relaxed">Cricket-first exchange with live casino. Virtual points only — admin-managed deposits.</p>
        </div>
        <div>
          <p className="font-semibold mb-2">Sports</p>
          <ul className="space-y-1 text-white/50 text-xs">
            {SPORTS.slice(0, 5).map((s) => (
              <li key={s.id}><Link to={`/sport/${s.slug}`} className="hover:text-white">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Legal & Safety</p>
          <ul className="space-y-1 text-white/50 text-xs">
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link to="/kyc" className="hover:text-white">KYC</Link></li>
            <li><Link to="/responsible-play" className="hover:text-white">Responsible Gambling</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Support</p>
          <p className="text-white/50 text-xs">help@22yards.app</p>
          <p className="text-white/30 text-[10px] mt-3">18+ only · Play within your limits</p>
        </div>
      </div>
      <p className="text-center text-[10px] text-white/30 py-4">© {new Date().getFullYear()} 22yards Entertainment</p>
    </footer>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a1218]">
      <Header />
      <NewsMarquee />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
