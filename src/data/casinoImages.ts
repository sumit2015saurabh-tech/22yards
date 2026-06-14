import type { CasinoGame } from './casino';

const B = import.meta.env.BASE_URL;

function local(path: string) {
  return `${B}images/casino/${path}`;
}

export const HERO_IMAGE = `${B}images/hero-cricket.svg`;

const ASSETS = {
  teenPatti: local('teen-patti.svg'),
  dragonTiger: local('dragon-tiger.svg'),
  roulette: local('roulette.svg'),
  slots: local('slots.svg'),
  crash: local('crash.svg'),
  live: local('live-casino.svg'),
  cards: local('cards.svg'),
  andarBahar: local('andar-bahar.svg'),
};

export function getCasinoThumbnail(game: CasinoGame): string {
  if (game.thumbnail) return game.thumbnail;
  const n = game.name.toLowerCase();

  if (n.includes('teen') || n.includes('patti')) return ASSETS.teenPatti;
  if (n.includes('dragon') && n.includes('tiger')) return ASSETS.dragonTiger;
  if (n.includes('dragon') || n.includes('tiger')) return ASSETS.dragonTiger;
  if (n.includes('andar') || n.includes('bahar')) return ASSETS.andarBahar;
  if (n.includes('vimaan') || n.includes('balloon') || n.includes('crash')) return ASSETS.crash;
  if (n.includes('roulette')) return ASSETS.roulette;
  if (n.includes('baccarat') || n.includes('poker') || n.includes('blackjack')) return ASSETS.cards;
  if (n.includes('lucky') || n.includes('32 card') || n.includes('card') || n.includes('dtl') || n.includes('race') || n.includes('amar')) return ASSETS.cards;
  if (n.includes('heads') || n.includes('tails') || n.includes('0 to 9') || n.includes('sic') || n.includes('fan tan')) return ASSETS.roulette;
  if (n.includes('evolution') || n.includes('ezugi')) return ASSETS.live;
  if (game.tab === 'slots' || game.provider === 'PLATIN') return ASSETS.slots;
  if (game.tab === 'universe-live') return ASSETS.teenPatti;
  if (game.tab === 'universe-original') return ASSETS.crash;
  if (game.tab === 'international') return ASSETS.live;

  return ASSETS.live;
}

/** Hue rotation for slot variety (applied via CSS class) */
export function getCasinoHueClass(game: CasinoGame): string {
  if (game.tab !== 'slots' && game.provider !== 'PLATIN') return '';
  const hues = ['hue-slot-0', 'hue-slot-1', 'hue-slot-2', 'hue-slot-3', 'hue-slot-4', 'hue-slot-5'];
  let h = 0;
  for (let i = 0; i < game.slug.length; i++) h = (h + game.slug.charCodeAt(i)) % hues.length;
  return hues[h];
}

export const SPORT_IMAGES: Record<string, string> = {
  cricket: HERO_IMAGE,
  tennis: local('live-casino.svg'),
  soccer: local('live-casino.svg'),
  'horse-racing': local('dragon-tiger.svg'),
  basketball: local('live-casino.svg'),
  greyhound: local('dragon-tiger.svg'),
  lottery: local('roulette.svg'),
  politics: local('cards.svg'),
  'virtual-sports': local('crash.svg'),
  weather: local('crash.svg'),
};
