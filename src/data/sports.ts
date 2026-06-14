export interface Sport {
  id: string;
  name: string;
  slug: string;
  icon: string;
  popular?: boolean;
}

export const SPORTS: Sport[] = [
  { id: '4', name: 'Cricket', slug: 'cricket', icon: '🏏', popular: true },
  { id: '2', name: 'Tennis', slug: 'tennis', icon: '🎾', popular: true },
  { id: '1', name: 'Soccer', slug: 'soccer', icon: '⚽', popular: true },
  { id: '7', name: 'Horse Racing', slug: 'horse-racing', icon: '🐎', popular: true },
  { id: '7522', name: 'Basketball', slug: 'basketball', icon: '🏀', popular: true },
  { id: '4339', name: 'Greyhound', slug: 'greyhound', icon: '🐕' },
  { id: '66104', name: 'Lottery', slug: 'lottery', icon: '🎱' },
  { id: '2378961', name: 'Politics', slug: 'politics', icon: '🗳️' },
  { id: '66101', name: 'Virtual Sports', slug: 'virtual-sports', icon: '🎮' },
];

export const EXCHANGE_MODES = [
  { id: 'inplay', label: 'In-Play', path: '/inplay' },
  { id: 'exchange', label: 'Exchange', path: '/exchange' },
  { id: 'livecasino', label: 'Live Casino', path: '/live-casino' },
  { id: 'tips', label: 'Tips & Previews', path: '/tips' },
];

export const NEWS_TICKER = [
  'IPL 2026 season markets now open on 22yards',
  'Live casino tables running 24/7 — Teen Patti, Dragon Tiger, Roulette & more',
  'New player? Use promo WELCOME22 after admin verification',
  'Play responsibly — set limits in your profile',
  'Cricket World Cup outright winner markets updated live',
];
