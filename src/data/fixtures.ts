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
