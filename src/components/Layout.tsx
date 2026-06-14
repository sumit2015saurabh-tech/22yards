import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Wallet, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-pitch-700 text-gold-400' : 'text-white/70 hover:text-white hover:bg-white/5'}`;

export function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-pitch-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="22yards" className="h-10 w-10 rounded-full" />
          <span className="text-xl font-bold">
            <span className="gold-gradient">22</span>
            <span className="text-white">yards</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/sports" className={linkClass}>Sports</NavLink>
          <NavLink to="/casino" className={linkClass}>Casino</NavLink>
          <NavLink to="/promotions" className={linkClass}>Promotions</NavLink>
          <NavLink to="/responsible-play" className={linkClass}>Responsible Play</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="flex items-center gap-1 text-sm text-gold-400 hover:underline">
                  <LayoutDashboard className="w-4 h-4" /> Admin
                </Link>
              )}
              <Link to="/wallet" className="flex items-center gap-1 btn-gold text-sm py-2 px-4">
                <Wallet className="w-4 h-4" /> Wallet
              </Link>
              <Link to="/profile" className="p-2 rounded-lg hover:bg-white/5">
                <User className="w-5 h-5" />
              </Link>
              <button type="button" onClick={() => { logout(); nav('/'); }} className="p-2 rounded-lg hover:bg-white/5 text-white/60">
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-white/80 hover:text-white px-4 py-2">Sign in</Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-4">Join free</Link>
            </>
          )}
        </div>

        <button type="button" className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 p-4 space-y-2 bg-pitch-900">
          <NavLink to="/sports" className={linkClass} onClick={() => setOpen(false)}>Sports</NavLink>
          <NavLink to="/casino" className={linkClass} onClick={() => setOpen(false)}>Casino</NavLink>
          <NavLink to="/wallet" className={linkClass} onClick={() => setOpen(false)}>Wallet</NavLink>
          {!user && <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>Sign in</NavLink>}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-pitch-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-8 w-8 rounded-full" />
            <span className="font-bold text-lg">22yards</span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed">
            Cricket entertainment platform. Play responsibly. Points are virtual credits — not real money.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gold-400">Platform</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/sports" className="hover:text-white">Sports</Link></li>
            <li><Link to="/casino" className="hover:text-white">Casino</Link></li>
            <li><Link to="/promotions" className="hover:text-white">Promotions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gold-400">Legal & Safety</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/responsible-play" className="hover:text-white">Responsible Play</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gold-400">Support</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/support" className="hover:text-white">Contact Support</Link></li>
            <li><a href="mailto:help@22yards.app" className="hover:text-white">help@22yards.app</a></li>
          </ul>
          <p className="mt-4 text-xs text-white/40">18+ only. Play within your limits.</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} 22yards Entertainment Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
