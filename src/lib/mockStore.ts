import type { Bet, Transaction, User, WalletUser, Withdrawal } from './api';
import { DEMO_CASINO, DEMO_FIXTURES, DEMO_PROMOTIONS } from './demo';
import { demoMarkets } from './demoMarkets';

const KEY = '22yards_demo_v1';

interface DemoState {
  users: Record<string, { user: User; password: string }>;
  wallets: Record<string, { balance: number; reserved: number }>;
  transactions: Record<string, Transaction[]>;
  withdrawals: Withdrawal[];
  bets: Record<string, Bet[]>;
  nextId: number;
}

const seedUsers = (): DemoState['users'] => ({
  demo: {
    password: 'demo123',
    user: {
      id: 'user-demo-001',
      username: 'demo',
      name: 'Demo Player',
      email: 'demo@22yards.app',
      role: 'USER',
      state: 'Maharashtra',
      district: 'Mumbai',
    },
  },
  admin: {
    password: 'admin123',
    user: {
      id: 'user-admin-001',
      username: 'admin',
      name: 'Platform Admin',
      email: 'admin@22yards.app',
      role: 'ADMIN',
      state: 'Delhi',
      district: 'New Delhi',
    },
  },
});

function initialState(): DemoState {
  return {
    users: seedUsers(),
    wallets: {
      'user-demo-001': { balance: 5000, reserved: 0 },
      'user-admin-001': { balance: 100000, reserved: 0 },
    },
    transactions: {
      'user-demo-001': [
        {
          id: 'tx-welcome',
          type: 'ADMIN_DEPOSIT',
          amount: 5000,
          balanceAfter: 5000,
          note: 'Welcome bonus — demo account',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
      'user-admin-001': [],
    },
    withdrawals: [],
    bets: {},
    nextId: 100,
  };
}

function load(): DemoState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DemoState;
      const base = initialState();
      return {
        ...base,
        ...parsed,
        users: { ...seedUsers(), ...parsed.users },
        wallets: { ...base.wallets, ...parsed.wallets },
        transactions: { ...base.transactions, ...parsed.transactions },
        withdrawals: parsed.withdrawals ?? [],
        bets: parsed.bets ?? {},
        nextId: parsed.nextId ?? base.nextId,
      };
    }
  } catch {
    /* ignore */
  }
  return initialState();
}

function save(state: DemoState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

let state = load();

export function resetDemoState() {
  state = initialState();
  save(state);
}

function uid() {
  state.nextId += 1;
  save(state);
  return `demo-${state.nextId}`;
}

function walletOf(userId: string) {
  if (!state.wallets[userId]) state.wallets[userId] = { balance: 0, reserved: 0 };
  return state.wallets[userId];
}

function txnsOf(userId: string) {
  if (!state.transactions[userId]) state.transactions[userId] = [];
  return state.transactions[userId];
}

export const mockStore = {
  getState: () => state,

  login(username: string, password: string) {
    const entry = state.users[username.toLowerCase()];
    if (!entry || entry.password !== password) throw new Error('Invalid username or password');
    return {
      accessToken: `demo-token-${entry.user.id}`,
      refreshToken: `demo-refresh-${entry.user.id}`,
      user: entry.user,
    };
  },

  register(data: Record<string, string>) {
    const username = data.username.toLowerCase();
    if (state.users[username]) throw new Error('Username already taken');
    const user: User = {
      id: uid(),
      username: data.username,
      name: data.name,
      email: data.email,
      role: 'USER',
      state: data.state,
      district: data.district,
    };
    state.users[username] = { user, password: data.password };
    walletOf(user.id);
    save(state);
    return { ok: true };
  },

  me(token: string): User {
    const userId = token.replace('demo-token-', '');
    const entry = Object.values(state.users).find((u) => u.user.id === userId);
    if (!entry) throw new Error('Session expired');
    return entry.user;
  },

  balance(token: string) {
    const userId = token.replace('demo-token-', '');
    const w = walletOf(userId);
    return { balance: w.balance, availableBalance: w.balance - w.reserved, reservedBalance: w.reserved };
  },

  transactions(token: string) {
    const userId = token.replace('demo-token-', '');
    return { items: [...txnsOf(userId)].reverse() };
  },

  withdrawal(token: string, amount: number, note?: string) {
    const userId = token.replace('demo-token-', '');
    const w = walletOf(userId);
    if (amount < 1) throw new Error('Invalid amount');
    if (amount > w.balance - w.reserved) throw new Error('Insufficient available balance');
    w.reserved += amount;
    const req: Withdrawal = {
      id: uid(),
      userId,
      amount,
      status: 'PENDING',
      userNote: note,
      createdAt: new Date().toISOString(),
    };
    state.withdrawals.unshift(req);
    save(state);
    return req;
  },

  fixtures() {
    return { items: DEMO_FIXTURES };
  },

  markets(fixtureId: string) {
    return { items: demoMarkets(fixtureId) };
  },

  placeBet(token: string, stake: number, legs: { selectionId: string }[]) {
    const userId = token.replace('demo-token-', '');
    const w = walletOf(userId);
    if (stake < 1) throw new Error('Minimum stake is 1 point');
    if (stake > w.balance - w.reserved) throw new Error('Insufficient balance');
    w.balance -= stake;
    const potentialWin = Math.floor(stake * 1.9);
    const bet: Bet = {
      id: uid(),
      stake,
      potentialWin,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
      legs: legs.map((l) => ({
        selectionName: l.selectionId,
        fixtureLabel: 'Demo match',
        oddsAtPlacement: '1.90',
      })),
    };
    if (!state.bets[userId]) state.bets[userId] = [];
    state.bets[userId].unshift(bet);
    txnsOf(userId).push({
      id: uid(),
      type: 'BET_PLACED',
      amount: -stake,
      balanceAfter: w.balance,
      note: `Bet ${bet.id}`,
      createdAt: new Date().toISOString(),
    });
    save(state);
    return bet;
  },

  myBets(token: string) {
    const userId = token.replace('demo-token-', '');
    return { items: state.bets[userId] ?? [] };
  },

  casinoGames: () => DEMO_CASINO,
  promotions: () => DEMO_PROMOTIONS,

  redeemPromo(token: string, code: string) {
    const promo = DEMO_PROMOTIONS.find((p) => p.code?.toUpperCase() === code.toUpperCase());
    if (!promo) throw new Error('Invalid promo code');
    const userId = token.replace('demo-token-', '');
    const w = walletOf(userId);
    w.balance += promo.bonusAmount;
    txnsOf(userId).push({
      id: uid(),
      type: 'PROMO_BONUS',
      amount: promo.bonusAmount,
      balanceAfter: w.balance,
      note: promo.name,
      createdAt: new Date().toISOString(),
    });
    save(state);
    return { bonusAmount: promo.bonusAmount };
  },

  selfExclude(token: string, days: number) {
    void token;
    return { excludedUntil: new Date(Date.now() + days * 86400000).toISOString() };
  },

  supportTicket() {
    return { id: uid(), message: 'Ticket received' };
  },

  adminUsers() {
    const items: WalletUser[] = Object.values(state.users).map(({ user }) => {
      const w = walletOf(user.id);
      return { userId: user.id, balance: w.balance, availableBalance: w.balance - w.reserved };
    });
    return { items };
  },

  adminWithdrawals() {
    return { items: state.withdrawals };
  },

  adminDeposit(userId: string, amount: number, note?: string) {
    const w = walletOf(userId);
    w.balance += amount;
    txnsOf(userId).push({
      id: uid(),
      type: 'ADMIN_DEPOSIT',
      amount,
      balanceAfter: w.balance,
      note: note ?? 'Admin deposit',
      createdAt: new Date().toISOString(),
    });
    save(state);
    return { balance: w.balance };
  },

  approveWithdrawal(id: string) {
    const wdr = state.withdrawals.find((w) => w.id === id);
    if (!wdr) throw new Error('Not found');
    const w = walletOf(wdr.userId);
    w.balance -= wdr.amount;
    w.reserved -= wdr.amount;
    wdr.status = 'APPROVED';
    save(state);
    return wdr;
  },

  rejectWithdrawal(id: string) {
    const wdr = state.withdrawals.find((w) => w.id === id);
    if (!wdr) throw new Error('Not found');
    walletOf(wdr.userId).reserved -= wdr.amount;
    wdr.status = 'REJECTED';
    save(state);
    return wdr;
  },

  adminNotifications() {
    const pending = state.withdrawals.filter((w) => w.status === 'PENDING');
    return {
      items: pending.map((w) => ({
        id: w.id,
        title: 'Withdrawal request',
        message: `${w.amount} points from user ${w.userId.slice(0, 8)}`,
        isRead: false,
      })),
    };
  },
};
