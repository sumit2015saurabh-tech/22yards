import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Trophy, Sparkles, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api, type Fixture, type Promotion } from '@/lib/api';

const HERO_IMG = 'https://images.unsplash.com/photo-1531415077819-7b46a01288c0?w=1920&q=80&auto=format&fit=crop';

export function HomePage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [promos, setPromos] = useState<Promotion[]>([]);

  useEffect(() => {
    api.fixtures('cricket').then((r) => setFixtures(r.items.slice(0, 3))).catch(() => {});
    api.promotions().then(setPromos).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pitch-950 via-pitch-950/90 to-pitch-950/40" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-2xl space-y-6 animate-[fadeIn_0.8s_ease-out]">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-gold-400">
              <Sparkles className="w-4 h-4" /> India&apos;s cricket entertainment platform
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Every yard counts at{' '}
              <span className="gold-gradient">22yards</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Follow live cricket, explore markets, and enjoy casino games — all with transparent,
              admin-managed points. Built for responsible entertainment from day one.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-gold inline-flex items-center gap-2">
                Create free account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/sports" className="btn-primary inline-flex items-center gap-2">
                Browse matches
              </Link>
            </div>
            <div className="flex gap-6 pt-4 text-sm text-white/50">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-pitch-500" /> 18+ verified</span>
              <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-pitch-500" /> IPL & international</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-white/10 bg-pitch-900/50">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: Shield, label: 'Responsible Play Tools', desc: 'Self-exclusion & limits' },
            { icon: TrendingUp, label: 'Transparent Points', desc: 'Clear transaction history' },
            { icon: Trophy, label: 'Live Cricket', desc: 'Pre-match & in-play' },
            { icon: Sparkles, label: 'Fair Entertainment', desc: 'No guaranteed outcomes' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="p-4">
              <Icon className="w-6 h-6 text-gold-400 mx-auto mb-2" />
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-xs text-white/50">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured matches */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Upcoming matches</h2>
            <p className="text-white/50 mt-1">Cricket fixtures with live odds</p>
          </div>
          <Link to="/sports" className="text-gold-400 text-sm hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {fixtures.length === 0
            ? [1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-2xl p-6 h-40 animate-pulse bg-white/5" />
              ))
            : fixtures.map((f) => (
                <Link
                  key={f.id}
                  to={`/sports?fixture=${f.id}`}
                  className="glass rounded-2xl p-6 card-hover block"
                >
                  <p className="text-xs text-gold-400 mb-2">{f.competition.name}</p>
                  <p className="font-bold text-lg">{f.homeTeam.name}</p>
                  <p className="text-white/50 text-sm my-1">vs</p>
                  <p className="font-bold text-lg">{f.awayTeam.name}</p>
                  <p className="text-xs text-white/40 mt-4">
                    {new Date(f.startTime).toLocaleString()}
                  </p>
                </Link>
              ))}
        </div>
      </section>

      {/* Promotions */}
      {promos.length > 0 && (
        <section className="bg-pitch-900/30 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Active promotions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {promos.map((p) => (
                <div key={p.id} className="glass rounded-2xl p-6 card-hover border-gold-400/20">
                  <span className="text-xs font-mono bg-gold-400/20 text-gold-400 px-2 py-1 rounded">{p.code}</span>
                  <h3 className="text-xl font-bold mt-3">{p.name}</h3>
                  <p className="text-white/60 text-sm mt-2">{p.description}</p>
                  <p className="text-gold-400 font-bold mt-4">+{p.bonusAmount} bonus points</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Compliance CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="glass rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3">Play smart. Play responsibly.</h2>
            <p className="text-white/60 leading-relaxed">
              22yards provides self-exclusion, deposit guidance through admin support, and clear
              terms before you participate. Entertainment should never come at the cost of your wellbeing.
            </p>
          </div>
          <Link to="/responsible-play" className="btn-primary shrink-0">Learn more</Link>
        </div>
      </section>
    </div>
  );
}
