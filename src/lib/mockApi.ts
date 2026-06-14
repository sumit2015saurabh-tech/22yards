import { mockStore } from './mockStore';

/** In-browser mock API for GitHub Pages demo — no backend required. */
export const mockApi = {
  register: (body: object) => Promise.resolve(mockStore.register(body as Record<string, string>)),
  login: (body: object) => {
    const { username, password } = body as { username: string; password: string };
    return Promise.resolve(mockStore.login(username, password));
  },
  me: (token: string) => Promise.resolve(mockStore.me(token)),
  balance: (token: string) => Promise.resolve(mockStore.balance(token)),
  transactions: (token: string) => Promise.resolve(mockStore.transactions(token)),
  withdrawal: (token: string, amount: number, note?: string) =>
    Promise.resolve(mockStore.withdrawal(token, amount, note)),
  sports: () => Promise.resolve([{ id: '1', name: 'Cricket', slug: 'cricket', competitions: [] }]),
  fixtures: () => Promise.resolve(mockStore.fixtures()),
  markets: (fixtureId: string) => Promise.resolve(mockStore.markets(fixtureId)),
  placeBet: (token: string, stake: number, legs: { selectionId: string }[]) =>
    Promise.resolve(mockStore.placeBet(token, stake, legs)),
  myBets: (token: string) => Promise.resolve(mockStore.myBets(token)),
  casinoGames: () => Promise.resolve(mockStore.casinoGames()),
  promotions: () => Promise.resolve(mockStore.promotions()),
  redeemPromo: (token: string, code: string) => Promise.resolve(mockStore.redeemPromo(token, code)),
  cms: () => Promise.resolve([]),
  selfExclude: (token: string, days: number) => Promise.resolve(mockStore.selfExclude(token, days)),
  supportTicket: (token: string, subject: string, message: string) => {
    void token; void subject; void message;
    return Promise.resolve(mockStore.supportTicket());
  },
  adminDeposit: (token: string, userId: string, amount: number, note?: string) => {
    void token;
    return Promise.resolve(mockStore.adminDeposit(userId, amount, note));
  },
  adminUsers: (token: string) => {
    void token;
    return Promise.resolve(mockStore.adminUsers());
  },
  adminWithdrawals: (token: string) => {
    void token;
    return Promise.resolve(mockStore.adminWithdrawals());
  },
  approveWithdrawal: (token: string, id: string) => {
    void token;
    return Promise.resolve(mockStore.approveWithdrawal(id));
  },
  rejectWithdrawal: (token: string, id: string, adminNote: string) => {
    void token; void adminNote;
    return Promise.resolve(mockStore.rejectWithdrawal(id));
  },
  adminNotifications: (token: string) => {
    void token;
    return Promise.resolve(mockStore.adminNotifications());
  },
};
