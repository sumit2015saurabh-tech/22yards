import { useState, useEffect, type ReactNode } from 'react';
import { Shield, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AgeGate({ children }: { children: ReactNode }) {
  const [ok, setOk] = useState(() => localStorage.getItem('22yards_age_verified') === 'true');

  if (ok) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pitch-950/95 backdrop-blur-md p-4">
      <div className="glass max-w-md w-full rounded-2xl p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-pitch-700 flex items-center justify-center">
          <Shield className="w-8 h-8 text-gold-400" />
        </div>
        <h2 className="text-2xl font-bold">Age Verification Required</h2>
        <p className="text-white/70 text-sm leading-relaxed">
          22yards is an entertainment platform for adults aged <strong>18 and over</strong>.
          By entering, you confirm you meet the age requirement in your jurisdiction and agree to our{' '}
          <Link to="/terms" className="text-gold-400 underline">Terms</Link> and{' '}
          <Link to="/responsible-play" className="text-gold-400 underline">Responsible Play</Link> policy.
        </p>
        <p className="text-xs text-white/50">
          Points on this platform are virtual entertainment credits managed offline by administrators.
          They are not legal tender, bank deposits, or guaranteed financial instruments.
        </p>
        <div className="flex flex-col gap-3">
          <button type="button" className="btn-primary w-full" onClick={() => { localStorage.setItem('22yards_age_verified', 'true'); setOk(true); }}>
            I am 18 or older — Enter
          </button>
          <a href="https://www.google.com" className="text-sm text-white/50 hover:text-white flex items-center justify-center gap-1">
            <X className="w-4 h-4" /> Exit
          </a>
        </div>
      </div>
    </div>
  );
}

export function CookieBanner() {
  const [show, setShow] = useState(() => !localStorage.getItem('22yards_cookies'));

  useEffect(() => {
    if (!show) return;
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto glass rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p className="text-sm text-white/80">
          We use essential cookies for security and session management. See our{' '}
          <Link to="/privacy" className="text-gold-400 underline">Privacy Policy</Link>.
        </p>
        <button
          type="button"
          className="btn-primary text-sm py-2 px-4 shrink-0"
          onClick={() => { localStorage.setItem('22yards_cookies', '1'); setShow(false); }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
