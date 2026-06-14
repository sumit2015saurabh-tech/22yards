import { getCasinoThumbnail, getCasinoHueClass } from '@/data/casinoImages';
import type { CasinoGame } from '@/data/casino';
import { useState } from 'react';

export function CasinoGameImage({
  game,
  className = '',
}: {
  game: CasinoGame;
  className?: string;
}) {
  const [err, setErr] = useState(false);
  const src = getCasinoThumbnail(game);
  const hue = getCasinoHueClass(game);

  if (err) {
    return (
      <div className={`flex items-center justify-center bg-pitch-800 ${className}`}>
        <span className="text-4xl">🎰</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={game.name}
      className={`w-full h-full object-cover ${hue} ${className}`}
      loading="lazy"
      decoding="async"
      onError={() => setErr(true)}
    />
  );
}
