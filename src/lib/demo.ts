import type { Fixture, Promotion, CasinoGame } from './api';

/** Sample content when API gateway is offline (e.g. GitHub Pages static demo). */
export const DEMO_FIXTURES: Fixture[] = [
  {
    id: 'demo-1',
    startTime: new Date(Date.now() + 86400000).toISOString(),
    status: 'SCHEDULED',
    homeTeam: { name: 'Mumbai Indians', shortName: 'MI' },
    awayTeam: { name: 'Chennai Super Kings', shortName: 'CSK' },
    competition: { name: 'IPL 2026', sport: { name: 'Cricket' } },
  },
  {
    id: 'demo-2',
    startTime: new Date(Date.now() + 172800000).toISOString(),
    status: 'SCHEDULED',
    homeTeam: { name: 'India', shortName: 'IND' },
    awayTeam: { name: 'Australia', shortName: 'AUS' },
    competition: { name: 'T20 World Cup', sport: { name: 'Cricket' } },
  },
  {
    id: 'demo-3',
    startTime: new Date(Date.now() + 259200000).toISOString(),
    status: 'SCHEDULED',
    homeTeam: { name: 'Royal Challengers Bengaluru', shortName: 'RCB' },
    awayTeam: { name: 'Kolkata Knight Riders', shortName: 'KKR' },
    competition: { name: 'IPL 2026', sport: { name: 'Cricket' } },
  },
];

export const DEMO_PROMOTIONS: Promotion[] = [
  {
    id: 'demo-p1',
    name: 'Welcome Bonus',
    description: 'New members receive bonus points after admin verification. No payment gateway required.',
    bonusAmount: 500,
    code: 'WELCOME22',
  },
  {
    id: 'demo-p2',
    name: 'Match Day Boost',
    description: 'Extra bonus points on selected IPL fixtures. Terms apply.',
    bonusAmount: 200,
    code: 'IPLBOOST',
  },
];

export const DEMO_CASINO: CasinoGame[] = [
  { id: 'c1', name: 'Cricket Spin', slug: 'cricket-spin', category: 'Slots', minBet: 10, maxBet: 5000 },
  { id: 'c2', name: 'Sixer Roulette', slug: 'sixer-roulette', category: 'Table', minBet: 25, maxBet: 10000 },
  { id: 'c3', name: 'Stumps Blackjack', slug: 'stumps-blackjack', category: 'Cards', minBet: 50, maxBet: 20000 },
];
