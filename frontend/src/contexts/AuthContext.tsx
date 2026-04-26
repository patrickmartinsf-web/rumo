import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/types';
import * as authService from '@/services/authService';
import { getAccessToken, clearTokens } from '@/services/api';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { academyName: string; name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    authService
      .getMe()
      .then(setUser)
      .catch(() => clearTokens())
      .finally(() => setIsLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const result = await authService.login({ email, password });
    setUser(result.user);
  }

  async function register(data: { academyName: string; name: string; email: string; password: string }) {
    const result = await authService.register(data);
    setUser(result.user);
  }

  async function logout() {
    const refreshToken = localStorage.getItem('rumo:refreshToken') ?? '';
    await authService.logout(refreshToken);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
