import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, type User } from '@/lib/api';

interface AuthCtx {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (data: Record<string, string>) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('22yards_token'));

  useEffect(() => {
    if (!token) return;
    api.me(token).then(setUser).catch(() => logout());
  }, [token]);

  const login = async (username: string, password: string) => {
    const res = await api.login({ username, password });
    localStorage.setItem('22yards_token', res.accessToken);
    localStorage.setItem('22yards_refresh', res.refreshToken);
    setToken(res.accessToken);
    setUser(res.user);
  };

  const register = async (data: Record<string, string>) => {
    await api.register(data);
    await login(data.username, data.password);
  };

  const logout = () => {
    localStorage.removeItem('22yards_token');
    localStorage.removeItem('22yards_refresh');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAdmin: user?.role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
