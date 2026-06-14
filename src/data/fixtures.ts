export type MarketType = 'MATCH_ODDS' | 'BOOKMAKER' | 'FANCY' | 'SPORTSBOOK' | 'LINE';

export interface Selection {
  id: string;
  name: string;
  back: number;
  lay: number;
  suspended?: boolean;
}

export interface Market {
  id: string;
  name: string;
  type: MarketType;
  minStake: number;
  maxStake: number;
  selections: Selection[];
}

export interface Fixture {
  id: string;
  sportId: string;
  sportSlug: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  homeShort: string;
  awayShort: string;
  startTime: string;
  inPlay: boolean;
  hasStream: boolean;
  hasFancy: boolean;
  hasBookmaker: boolean;
  markets: Market[];
}

function matchOdds(home: string, away: string, backH = 1.85, backA = 2.1): Market {
  return {
    id: 'mo',
    name: 'Match Odds',
    type: 'MATCH_ODDS',
    minStake: 100,
    maxStake: 500000,
    selections: [
      { id: 'h', name: home, back: backH, lay: backH + 0.02 },
      { id: 'a', name: away, back: backA, lay: backA + 0.02 },
    ],
  };
}

function fancyMarkets(): Market[] {
  return [
    {
      id: 'f1', name: '10 Over Runs', type: 'FANCY', minStake: 100, maxStake: 250000,
      selections: [
        { id: 'f1-y', name: 'Yes 52', back: 95, lay: 100 },
        { id: 'f1-n', name: 'No 52', back: 95, lay: 100 },
      ],
    },
    {
      id: 'f2', name: 'Fall of 1st Wkt', type: 'FANCY', minStake: 100, maxStake: 250000,
      selections: [
        { id: 'f2-y', name: 'Yes 24.5', back: 90, lay: 95 },
        { id: 'f2-n', name: 'No 24.5', back: 90, lay: 95 },
      ],
    },
    {
      id: 'f3', name: 'Match 1st Innings Runs', type: 'FANCY', minStake: 100, maxStake: 250000,
      selections: [
        { id: 'f3-y', name: 'Yes 168', back: 92, lay: 97 },
        { id: 'f3-n', name: 'No 168', back: 92, lay: 97 },
      ],
    },
  ];
}

function bookmaker(home: string, away: string): Market {
  return {
    id: 'bm', name: 'Bookmaker', type: 'BOOKMAKER', minStake: 100, maxStake: 100000,
    selections: [
      { id: 'bm-h', name: home, back: 1.75, lay: 1.78 },
      { id: 'bm-a', name: away, back: 2.05, lay: 2.08 },
    ],
  };
}

export const FIXTURES: Fixture[] = [
  {
    id: 'evt-1', sportId: '4', sportSlug: 'cricket',
    competition: 'IPL 2026', homeTeam: 'Mumbai Indians', awayTeam: 'Chennai Super Kings',
    homeShort: 'MI', awayShort: 'CSK',
    startTime: new Date(Date.now() + 3600000).toISOString(),
    inPlay: true, hasStream: true, hasFancy: true, hasBookmaker: true,
    markets: [matchOdds('Mumbai Indians', 'Chennai Super Kings', 1.72, 2.18), bookmaker('MI', 'CSK'), ...fancyMarkets()],
  },
  {
    id: 'evt-2', sportId: '4', sportSlug: 'cricket',
    competition: 'T20 World Cup', homeTeam: 'India', awayTeam: 'Australia',
    homeShort: 'IND', awayShort: 'AUS',
    startTime: new Date(Date.now() + 86400000).toISOString(),
    inPlay: false, hasStream: true, hasFancy: true, hasBookmaker: true,
    markets: [matchOdds('India', 'Australia', 1.65, 2.35), bookmaker('India', 'Australia'), ...fancyMarkets()],
  },
  {
    id: 'evt-3', sportId: '4', sportSlug: 'cricket',
    competition: 'IPL 2026', homeTeam: 'Royal Challengers Bengaluru', awayTeam: 'Kolkata Knight Riders',
    homeShort: 'RCB', awayShort: 'KKR',
    startTime: new Date(Date.now() + 172800000).toISOString(),
    inPlay: false, hasStream: false, hasFancy: true, hasBookmaker: true,
    markets: [matchOdds('RCB', 'KKR', 1.88, 2.02), bookmaker('RCB', 'KKR')],
  },
  {
    id: 'evt-4', sportId: '2', sportSlug: 'tennis',
    competition: 'ATP Indian Wells', homeTeam: 'Djokovic', awayTeam: 'Alcaraz',
    homeShort: 'DJO', awayShort: 'ALC',
    startTime: new Date(Date.now() + 7200000).toISOString(),
    inPlay: true, hasStream: true, hasFancy: false, hasBookmaker: false,
    markets: [matchOdds('Djokovic', 'Alcaraz', 1.95, 1.98)],
  },
  {
    id: 'evt-5', sportId: '1', sportSlug: 'soccer',
    competition: 'Premier League', homeTeam: 'Arsenal', awayTeam: 'Liverpool',
    homeShort: 'ARS', awayShort: 'LIV',
    startTime: new Date(Date.now() + 10800000).toISOString(),
    inPlay: true, hasStream: true, hasFancy: false, hasBookmaker: true,
    markets: [
      {
        id: 'mo', name: 'Match Odds', type: 'MATCH_ODDS', minStake: 100, maxStake: 500000,
        selections: [
          { id: '1', name: 'Arsenal', back: 2.4, lay: 2.44 },
          { id: 'x', name: 'Draw', back: 3.5, lay: 3.55 },
          { id: '2', name: 'Liverpool', back: 2.9, lay: 2.94 },
        ],
      },
    ],
  },
  {
    id: 'evt-6', sportId: '7522', sportSlug: 'basketball',
    competition: 'NBA', homeTeam: 'Lakers', awayTeam: 'Celtics',
    homeShort: 'LAL', awayShort: 'BOS',
    startTime: new Date(Date.now() + 14400000).toISOString(),
    inPlay: false, hasStream: false, hasFancy: false, hasBookmaker: false,
    markets: [matchOdds('Lakers', 'Celtics', 1.82, 2.08)],
  },
  {
    id: 'evt-7', sportId: '7', sportSlug: 'horse-racing',
    competition: 'Royal Ascot', homeTeam: 'Desert Crown', awayTeam: 'Field (12 runners)',
    homeShort: 'DC', awayShort: 'FLD',
    startTime: new Date(Date.now() + 5400000).toISOString(),
    inPlay: true, hasStream: true, hasFancy: false, hasBookmaker: true,
    markets: [matchOdds('Desert Crown', 'Field', 3.2, 1.45)],
  },
  {
    id: 'evt-8', sportId: '4339', sportSlug: 'greyhound',
    competition: 'Wimbledon Stadium', homeTeam: 'Trap 3 — Swift Shadow', awayTeam: 'Trap 5 — Blue Rocket',
    homeShort: 'T3', awayShort: 'T5',
    startTime: new Date(Date.now() + 2700000).toISOString(),
    inPlay: true, hasStream: false, hasFancy: false, hasBookmaker: false,
    markets: [matchOdds('Swift Shadow', 'Blue Rocket', 2.1, 1.75)],
  },
  {
    id: 'evt-9', sportId: '2378961', sportSlug: 'politics',
    competition: 'India General Election 2029', homeTeam: 'NDA Majority', awayTeam: 'Non-NDA Majority',
    homeShort: 'NDA', awayShort: 'OPP',
    startTime: new Date(Date.now() + 86400000 * 90).toISOString(),
    inPlay: false, hasStream: false, hasFancy: false, hasBookmaker: true,
    markets: [
      matchOdds('NDA Majority', 'Non-NDA Majority', 1.55, 2.65),
      {
        id: 'pol-seat', name: 'Seat Count Over/Under', type: 'LINE', minStake: 100, maxStake: 100000,
        selections: [
          { id: 'over', name: 'Over 280 seats', back: 1.9, lay: 1.94 },
          { id: 'under', name: 'Under 280 seats', back: 1.95, lay: 1.99 },
        ],
      },
    ],
  },
  {
    id: 'evt-10', sportId: '2378961', sportSlug: 'politics',
    competition: 'US Presidential 2028', homeTeam: 'Democrat Win', awayTeam: 'Republican Win',
    homeShort: 'DEM', awayShort: 'REP',
    startTime: new Date(Date.now() + 86400000 * 200).toISOString(),
    inPlay: false, hasStream: false, hasFancy: false, hasBookmaker: false,
    markets: [matchOdds('Democrat Win', 'Republican Win', 1.88, 2.02)],
  },
  {
    id: 'evt-11', sportId: '66104', sportSlug: 'lottery',
    competition: 'Daily Lucky Draw — 14 Jun', homeTeam: 'Number 7 Wins', awayTeam: 'Any Other',
    homeShort: '7', awayShort: 'OTH',
    startTime: new Date(Date.now() + 7200000).toISOString(),
    inPlay: false, hasStream: false, hasFancy: false, hasBookmaker: false,
    markets: [{
      id: 'lot', name: 'Winning Number', type: 'MATCH_ODDS', minStake: 10, maxStake: 5000,
      selections: [
        { id: 'n7', name: '7', back: 8.5, lay: 9.0 },
        { id: 'n3', name: '3', back: 8.5, lay: 9.0 },
        { id: 'n9', name: '9', back: 8.5, lay: 9.0 },
      ],
    }],
  },
  {
    id: 'evt-12', sportId: '66101', sportSlug: 'virtual-sports',
    competition: 'Universe T1 League', homeTeam: 'Virtual Mumbai', awayTeam: 'Virtual Delhi',
    homeShort: 'VMI', awayShort: 'VDL',
    startTime: new Date(Date.now() + 600000).toISOString(),
    inPlay: true, hasStream: false, hasFancy: true, hasBookmaker: false,
    markets: [matchOdds('Virtual Mumbai', 'Virtual Delhi', 1.78, 2.12)],
  },
  {
    id: 'evt-13', sportId: '88001', sportSlug: 'weather',
    competition: 'Mumbai — June 2026', homeTeam: 'Rainfall Over 50mm', awayTeam: 'Rainfall Under 50mm',
    homeShort: 'O50', awayShort: 'U50',
    startTime: new Date(Date.now() + 86400000 * 5).toISOString(),
    inPlay: false, hasStream: false, hasFancy: false, hasBookmaker: true,
    markets: [
      matchOdds('Over 50mm', 'Under 50mm', 1.72, 2.18),
      {
        id: 'wx-humid', name: 'Avg Humidity', type: 'LINE', minStake: 50, maxStake: 50000,
        selections: [
          { id: 'h-y', name: 'Over 78%', back: 1.85, lay: 1.89 },
          { id: 'h-n', name: 'Under 78%', back: 1.95, lay: 1.99 },
        ],
      },
    ],
  },
  {
    id: 'evt-14', sportId: '88001', sportSlug: 'weather',
    competition: 'Delhi — Max Temperature', homeTeam: 'Over 42°C', awayTeam: 'Under 42°C',
    homeShort: 'O42', awayShort: 'U42',
    startTime: new Date(Date.now() + 86400000 * 2).toISOString(),
    inPlay: true, hasStream: false, hasFancy: false, hasBookmaker: false,
    markets: [matchOdds('Over 42°C', 'Under 42°C', 2.1, 1.78)],
  },
  {
    id: 'evt-15', sportId: '88001', sportSlug: 'weather',
    competition: 'London — Weekend Forecast', homeTeam: 'Rain on Saturday', awayTeam: 'Dry Saturday',
    homeShort: 'RAIN', awayShort: 'DRY',
    startTime: new Date(Date.now() + 86400000 * 3).toISOString(),
    inPlay: false, hasStream: false, hasFancy: false, hasBookmaker: false,
    markets: [matchOdds('Rain Saturday', 'Dry Saturday', 1.65, 2.35)],
  },
  {
    id: 'evt-16', sportId: '88001', sportSlug: 'weather',
    competition: 'Chennai — Cyclone Alert', homeTeam: 'Cyclone Forms', awayTeam: 'No Cyclone',
    homeShort: 'YES', awayShort: 'NO',
    startTime: new Date(Date.now() + 86400000 * 10).toISOString(),
    inPlay: false, hasStream: false, hasFancy: false, hasBookmaker: true,
    markets: [matchOdds('Cyclone Forms', 'No Cyclone', 3.5, 1.32)],
  },
];

export function fixturesBySport(slug?: string, inPlayOnly = false): Fixture[] {
  let list = [...FIXTURES];
  if (slug) list = list.filter((f) => f.sportSlug === slug);
  if (inPlayOnly) list = list.filter((f) => f.inPlay);
  return list;
}

export function getFixture(id: string): Fixture | undefined {
  return FIXTURES.find((f) => f.id === id);
}

/** Drift odds slightly — simulates live feed without exploitable lag */
export function driftOdds(value: number, volatility = 0.008): number {
  const delta = (Math.random() - 0.5) * volatility;
  return Math.max(1.01, Math.round((value + delta) * 100) / 100);
}

export function driftFixture(fixture: Fixture): Fixture {
  return {
    ...fixture,
    markets: fixture.markets.map((m) => ({
      ...m,
      selections: m.selections.map((s) => ({
        ...s,
        back: driftOdds(s.back, m.type === 'FANCY' ? 0.5 : 0.012),
        lay: driftOdds(s.lay, m.type === 'FANCY' ? 0.5 : 0.012),
      })),
    })),
  };
}
