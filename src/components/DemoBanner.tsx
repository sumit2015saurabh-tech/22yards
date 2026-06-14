import { Sparkles } from 'lucide-react';
import { isDemoMode } from '@/lib/api';

export function DemoBanner() {
  if (!isDemoMode) return null;

  return (
    <div className="bg-gradient-to-r from-gold-500/20 via-gold-400/10 to-gold-500/20 border-b border-gold-400/30">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-center">
        <span className="inline-flex items-center gap-1.5 font-medium text-gold-400">
          <Sparkles className="w-4 h-4" /> Live interactive demo
        </span>
        <span className="text-white/70">
          Player <strong className="text-white">demo</strong>/<strong className="text-white">demo123</strong>
          <span className="mx-2 text-white/30">|</span>
          Admin <strong className="text-white">admin</strong>/<strong className="text-white">admin123</strong>
          <span className="mx-2 text-white/30">|</span>
          184 casino games · WebSocket odds
        </span>
        <span className="text-white/40 text-xs">Data saved in your browser only · No real money</span>
      </div>
    </div>
  );
}
