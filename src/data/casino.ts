export type CasinoProvider = 'UNIVERSE' | 'EVOLUTION' | 'EZUGI' | 'PLATIN' | 'TVBET' | 'BETGAMES';
export type CasinoTab = 'popular' | 'universe-live' | 'universe-original' | 'international' | 'slots';

export interface CasinoGame {
  id: string;
  name: string;
  slug: string;
  category: string;
  tab: CasinoTab;
  provider: CasinoProvider;
  popular?: boolean;
  minBet: number;
  maxBet: number;
  thumbnail?: string;
}

const universeLive: CasinoGame[] = [
  '20-20 TEENPATTI', '1DAY TEEN PATTI', 'JOKER TEEN PATTI', 'MUFLIS TEEN PATTI',
  '20-20 DRAGON TIGER', '1 DAY DRAGON TIGER', 'DRAGON TIGER', 'ANDAR BAHAR',
  'BACCARAT', 'POKER', 'LUCKY 7', '32 CARDS', 'DTL', 'CARD RACE', 'AMAR AKBAR ANTHONY',
].map((name, i) => ({
  id: `ul-${i}`,
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  category: 'Live Dealer',
  tab: 'universe-live' as const,
  provider: 'UNIVERSE' as const,
  popular: i < 5,
  minBet: 100,
  maxBet: 500000,
}));

const universeOriginal: CasinoGame[] = [
  { name: 'VIMAAN', category: 'Crash', popular: true },
  { name: 'BALLOON', category: 'Instant' },
  { name: 'HEADS & TAILS', category: 'Instant' },
  { name: 'LUCKY 0 TO 9', category: 'Instant' },
].map((g, i) => ({
  id: `uo-${i}`,
  name: g.name,
  slug: g.name.toLowerCase().replace(/\s+/g, '-'),
  category: g.category,
  tab: 'universe-original' as const,
  provider: 'UNIVERSE' as const,
  popular: g.popular,
  minBet: 10,
  maxBet: 100000,
}));

const evolutionCategories = [
  'Top Games', 'Dragon Tiger', 'Baccarat', 'Sic Bo', 'Fan Tan',
  'Blackjack', 'Roulette', 'Poker', 'Game Shows', 'RNG', "Casino's Choice", 'All Games',
];
const ezugiCategories = ['Ezugi Lobby', 'Baccarat', 'Blackjack', 'Lottery', 'Poker', 'Roulette'];

const international: CasinoGame[] = [
  ...evolutionCategories.map((name, i) => ({
    id: `evo-${i}`,
    name: `Evolution — ${name}`,
    slug: `evolution-${name.toLowerCase().replace(/\s+/g, '-')}`,
    category: 'Live Casino',
    tab: 'international' as const,
    provider: 'EVOLUTION' as const,
    popular: i < 3,
    minBet: 50,
    maxBet: 500000,
  })),
  ...ezugiCategories.map((name, i) => ({
    id: `ezu-${i}`,
    name: `Ezugi — ${name}`,
    slug: `ezugi-${name.toLowerCase().replace(/\s+/g, '-')}`,
    category: 'Live Casino',
    tab: 'international' as const,
    provider: 'EZUGI' as const,
    minBet: 50,
    maxBet: 500000,
  })),
];

const slotNames = `50 Galaxy Stones,80s Retro Spin,Ages Of Wild,Antique Fortune,Arabian Legacy,Arcane Infinity,Arcane Scratch,Atomic Wild,Aztec Legends,Blazing Wild,Bloom Wild,Bomb Balloonza,Book Of Amon,Book Of Deep,Book Of Forest,Book Of Future,Book Of Immortality,Book Of Knight,Book Of Lama,Book Of Los Muertos,Book Of Panic,Book Of Safari,Book Of Samurai,Book Of The Street,Bounty Hunter Wheel,Bunch of Fruit,Burn Wild Burn,Call Of The Sea,Chefs Book,Cherry Riches,Dazzling Jewels 77,DiamondX,Double Yield 77,Doubled Gems 77,Dragon Hunter,Dragon Parchment,Elixir Of Fortune,Epoch Of Sands,Fat Fish,Fire Breath Fortune,Fire Gems,Freezing Wild,Frosty Scratch,Fruit Charm,Fruit Pulse,Fruits 2 Gold,Fruits Shock,Fruits Sizzle,Ftn Future,Funky Pirates,Gem Cave,Gem Garden 50,Gladiator,Glass Stones X,Glitch City,Glowing Wild,Gold Of Goblin,Great Fire 7s,Great Millions Scratch,Head Fights Book,Holiday Cocktails,Hot Bar 7,Hot Fabuleuse 5,Hot Fruit Box,Hot Fruits 5,Hot Gemstone 5,Hot Shine 7s,Hot Tropic,Hot Twins 7s,Instant Win Beach,Island Riches,Jade Hills,Jet Fashion 50,Jump Shot Scratch,Junk Town,Lord Of Hell,Lucky Bar 50,Lucky Goblin Scratch,Lucky Gold Strike,Lucky Rollers,Magic Opals X,Mega Diamond Fortune,Mega Fruit Harvest,Mega Prize,Mexican 1024 Ways,Pearl Heart,Poly Fruits 50,Precious Gems 77,Prehistoric Wheel,Pyramid Treasure Token Quest,Rise Of Mafia,Root Seekers,Sands Of Mummy,Scratch League,Secret Treasure Of Pharaoh,Serve And Score,Shocky Gems,Soul Stones 50,Space Stones 50,Spooky Night,Squishy Bonanza,Squishy Fruits,Stack Bars 7,Sugar Pop Bonanza,Surprise Xmas Gift,Swamp Mafia,Sweet 7s,Sweet Burn 50,Sweet Fortune 50,Sweet Fortune Wheel,Sweet Valantine,SweetX,Temple Treasure Scratch,The Barn Fellows,The Booos,The Booos Scratch,The Goblins Keen,The Grand Arena,The Grand League,The Legends Of Pirates,The Viking Berserkers,Thunder 777,Tombs Of Immortal,Tribe Codes,Tropica Fortuna 50,Twin Samba,Twinkle Gems,Unknown Monolith,Valentine Letter,Voodoo Jungle,Warriors Journey,Wealthy Fruits 50,Western Bandit,Wild Cocktail,Wild Fossils,Wild Red Noon,Wild Ring,Wildy Bars 7,Xtra 777 Bar,Xtra Bright,Xtra Flashy,Xtra Fruits,Xtra Gem,Xtra Sunshine,Xtra Volt,Zeuss War,xHot Fruits`.split(',');

const slots: CasinoGame[] = slotNames.map((name, i) => ({
  id: `slot-${i}`,
  name: name.trim(),
  slug: name.trim().toLowerCase().replace(/\s+/g, '-'),
  category: 'Slots',
  tab: 'slots' as const,
  provider: 'PLATIN' as const,
  popular: i < 12,
  minBet: 10,
  maxBet: 50000,
}));

export const CASINO_GAMES: CasinoGame[] = [...universeLive, ...universeOriginal, ...international, ...slots];

export const CASINO_TABS: { id: CasinoTab; label: string }[] = [
  { id: 'popular', label: 'Popular' },
  { id: 'universe-live', label: 'Universe Live' },
  { id: 'universe-original', label: 'Universe Original' },
  { id: 'international', label: 'International' },
  { id: 'slots', label: 'Slots' },
];

export function gamesForTab(tab: CasinoTab): CasinoGame[] {
  if (tab === 'popular') return CASINO_GAMES.filter((g) => g.popular);
  return CASINO_GAMES.filter((g) => g.tab === tab);
}
