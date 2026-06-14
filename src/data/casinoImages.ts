import type { CasinoGame } from './casino';

/** Themed thumbnails — Unsplash (live/international) + seeded picsum (slots) */
const LIVE_IMAGES: Record<string, string> = {
  teen: 'https://images.unsplash.com/photo-1605820234824-3cfca4e2297d?w=400&h=280&fit=crop&q=80',
  dragon: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=280&fit=crop&q=80',
  tiger: 'https://images.unsplash.com/photo-1561731216-c3a4ffb1d128?w=400&h=280&fit=crop&q=80',
  baccarat: 'https://images.unsplash.com/photo-1511193312174-42534fb4acd2?w=400&h=280&fit=crop&q=80',
  poker: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=280&fit=crop&q=80',
  roulette: 'https://images.unsplash.com/photo-1596838133351-188a28a00a5e?w=400&h=280&fit=crop&q=80',
  blackjack: 'https://images.unsplash.com/photo-1541278107931-f00618f35cca?w=400&h=280&fit=crop&q=80',
  andar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=280&fit=crop&q=80',
  lucky: 'https://images.unsplash.com/photo-1606166188517-4a72e8ac09d2?w=400&h=280&fit=crop&q=80',
  cards: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=280&fit=crop&q=80',
  vimaan: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=280&fit=crop&q=80',
  balloon: 'https://images.unsplash.com/photo-1509909757755-2f9c1b0f3f3f?w=400&h=280&fit=crop&q=80',
  heads: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=280&fit=crop&q=80',
  sic: 'https://images.unsplash.com/photo-1596160360263-c3f5e8b4d0e0?w=400&h=280&fit=crop&q=80',
  evolution: 'https://images.unsplash.com/photo-1621407889753-028d8a551a8e?w=400&h=280&fit=crop&q=80',
  ezugi: 'https://images.unsplash.com/photo-1622979135225-d2fe269b6a0e?w=400&h=280&fit=crop&q=80',
};

const SLOT_THEMES = [
  'https://images.unsplash.com/photo-1589330694653-d5dc95945d50?w=400&h=280&fit=crop&q=80',
  'https://images.unsplash.com/photo-1596838133351-188a28a00a5e?w=400&h=280&fit=crop&q=80',
  'https://images.unsplash.com/photo-1606166188517-4a72e8ac09d2?w=400&h=280&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=280&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=280&fit=crop&q=80',
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
}

export function getCasinoThumbnail(game: CasinoGame): string {
  if (game.thumbnail) return game.thumbnail;
  const n = game.name.toLowerCase();
  if (n.includes('teen') || n.includes('patti')) return LIVE_IMAGES.teen;
  if (n.includes('dragon')) return LIVE_IMAGES.dragon;
  if (n.includes('tiger')) return LIVE_IMAGES.tiger;
  if (n.includes('baccarat')) return LIVE_IMAGES.baccarat;
  if (n.includes('poker')) return LIVE_IMAGES.poker;
  if (n.includes('roulette')) return LIVE_IMAGES.roulette;
  if (n.includes('blackjack')) return LIVE_IMAGES.blackjack;
  if (n.includes('andar') || n.includes('bahar')) return LIVE_IMAGES.andar;
  if (n.includes('lucky') || n.includes('32 card')) return LIVE_IMAGES.lucky;
  if (n.includes('amar') || n.includes('card') || n.includes('dtl') || n.includes('race')) return LIVE_IMAGES.cards;
  if (n.includes('vimaan')) return LIVE_IMAGES.vimaan;
  if (n.includes('balloon')) return LIVE_IMAGES.balloon;
  if (n.includes('heads') || n.includes('tails') || n.includes('0 to 9')) return LIVE_IMAGES.heads;
  if (n.includes('sic') || n.includes('fan tan')) return LIVE_IMAGES.sic;
  if (n.includes('evolution')) return LIVE_IMAGES.evolution;
  if (n.includes('ezugi')) return LIVE_IMAGES.ezugi;
  if (game.tab === 'slots') return SLOT_THEMES[hash(game.slug) % SLOT_THEMES.length];
  return `https://picsum.photos/seed/${encodeURIComponent(game.slug)}/400/280`;
}

/** Sport / genre hero images for market list cards */
export const SPORT_IMAGES: Record<string, string> = {
  cricket: 'https://images.unsplash.com/photo-1531415077819-7b46a01288c0?w=600&h=200&fit=crop&q=80',
  tennis: 'https://images.unsplash.com/photo-1554068865-24cecd4e1b51?w=600&h=200&fit=crop&q=80',
  soccer: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=200&fit=crop&q=80',
  'horse-racing': 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&h=200&fit=crop&q=80',
  basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=200&fit=crop&q=80',
  greyhound: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=200&fit=crop&q=80',
  lottery: 'https://images.unsplash.com/photo-1518539187811-45e04dd8ddb4?w=600&h=200&fit=crop&q=80',
  politics: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=200&fit=crop&q=80',
  'virtual-sports': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=200&fit=crop&q=80',
  weather: 'https://images.unsplash.com/photo-1504608524841-42fe6f008b4b?w=600&h=200&fit=crop&q=80',
};
