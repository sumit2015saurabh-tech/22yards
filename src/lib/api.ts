const API = import.meta.env.VITE_API_URL ?? '/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data.message ?? 'Request failed');
  return data as T;
}

export const api = {
  register: (body: object) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body: object) =>
    request<{ accessToken: string; refreshToken: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  me: (token: string) => request<User>('/users/me', {}, token),
  balance: (token: string) =>
    request<{ balance: number; availableBalance: number; reservedBalance: number }>('/wallet/balance', {}, token),
  transactions: (token: string) => request<{ items: Transaction[] }>('/wallet/transactions', {}, token),
  withdrawal: (token: string, amount: number, note?: string) =>
    request('/wallet/withdrawal-requests', { method: 'POST', body: JSON.stringify({ amount, note }) }, token),
  sports: () => request<Sport[]>('/catalog/sports'),
  fixtures: (sportSlug?: string) =>
    request<{ items: Fixture[] }>(`/catalog/fixtures${sportSlug ? `?sportSlug=${sportSlug}` : ''}`),
  markets: (fixtureId: string) => request<{ items: Market[] }>(`/odds/fixtures/${fixtureId}/markets`),
  placeBet: (token: string, stake: number, legs: { selectionId: string }[]) =>
    request('/sportsbook/bets', { method: 'POST', body: JSON.stringify({ stake, legs }) }, token),
  myBets: (token: string) => request<{ items: Bet[] }>('/sportsbook/bets', {}, token),
  casinoGames: () => request<CasinoGame[]>('/casino/games'),
  promotions: () => request<Promotion[]>('/promotions/active'),
  redeemPromo: (token: string, code: string) =>
    request('/promotions/redeem', { method: 'POST', body: JSON.stringify({ code }) }, token),
  cms: () => request<CmsItem[]>('/cms/pages'),
  selfExclude: (token: string, days: number) =>
    request('/compliance/self-exclude', { method: 'POST', body: JSON.stringify({ days }) }, token),
  supportTicket: (token: string, subject: string, message: string) =>
    request('/support/tickets', { method: 'POST', body: JSON.stringify({ subject, message }) }, token),
  adminDeposit: (token: string, userId: string, amount: number, note?: string) =>
    request(`/wallet/admin/users/${userId}/deposit`, {
      method: 'POST',
      body: JSON.stringify({ amount, note }),
    }, token),
  adminUsers: (token: string, params?: string) =>
    request<{ items: WalletUser[] }>(`/wallet/admin/users${params ? `?${params}` : ''}`, {}, token),
  adminWithdrawals: (token: string) => request<{ items: Withdrawal[] }>('/wallet/admin/withdrawal-requests', {}, token),
  approveWithdrawal: (token: string, id: string, adminNote?: string) =>
    request(`/wallet/admin/withdrawal-requests/${id}/approve`, {
      method: 'PATCH',
      body: JSON.stringify({ adminNote }),
    }, token),
  rejectWithdrawal: (token: string, id: string, adminNote: string) =>
    request(`/wallet/admin/withdrawal-requests/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ adminNote }),
    }, token),
  adminNotifications: (token: string) => request<{ items: Notification[] }>('/wallet/admin/notifications?unreadOnly=true', {}, token),
};

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  state: string;
  district: string;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  balanceAfter: number;
  note?: string;
  createdAt: string;
}

export interface Sport {
  id: string;
  name: string;
  slug: string;
  competitions: { id: string; name: string; slug: string }[];
}

export interface Fixture {
  id: string;
  startTime: string;
  status: string;
  homeTeam: { name: string; shortName?: string };
  awayTeam: { name: string; shortName?: string };
  competition: { name: string; sport: { name: string } };
}

export interface Market {
  id: string;
  name: string;
  selections: { id: string; name: string; odds: string }[];
}

export interface Bet {
  id: string;
  stake: number;
  potentialWin: number;
  status: string;
  createdAt: string;
  legs: { selectionName: string; fixtureLabel: string; oddsAtPlacement: string }[];
}

export interface CasinoGame {
  id: string;
  name: string;
  slug: string;
  category: string;
  minBet: number;
  maxBet: number;
}

export interface Promotion {
  id: string;
  name: string;
  description?: string;
  bonusAmount: number;
  code?: string;
}

export interface CmsItem {
  slug: string;
  title: string;
  body: string;
  type: string;
}

export interface WalletUser {
  userId: string;
  balance: number;
  availableBalance: number;
}

export interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  status: string;
  userNote?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
}
