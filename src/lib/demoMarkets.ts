import type { Market } from './api';

export function demoMarkets(fixtureId: string): Market[] {
  const isIpl = fixtureId === 'demo-1' || fixtureId === 'demo-3';
  const home = fixtureId === 'demo-2' ? 'India' : fixtureId === 'demo-3' ? 'RCB' : 'MI';
  const away = fixtureId === 'demo-2' ? 'Australia' : fixtureId === 'demo-3' ? 'KKR' : 'CSK';

  return [
    {
      id: `${fixtureId}-match`,
      name: 'Match Winner',
      selections: [
        { id: `${fixtureId}-h`, name: home, odds: isIpl ? '1.85' : '1.72' },
        { id: `${fixtureId}-a`, name: away, odds: isIpl ? '2.05' : '2.20' },
      ],
    },
    {
      id: `${fixtureId}-total`,
      name: 'Total Runs (Over/Under)',
      selections: [
        { id: `${fixtureId}-over`, name: 'Over 168.5', odds: '1.90' },
        { id: `${fixtureId}-under`, name: 'Under 168.5', odds: '1.90' },
      ],
    },
  ];
}
