import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AuthTokens } from '@/types';

const TOKEN_KEY = 'rumo:accessToken';
const REFRESH_KEY = 'rumo:refreshToken';

export const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveTokens(tokens: Pick<AuthTokens, 'accessToken' | 'refreshToken'>) {
  localStorage.setItem(TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshQueue.push((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(api(original));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem(REFRESH_KEY);
      if (!refreshToken) throw new Error('No refresh token');

      const { data } = await axios.post<AuthTokens>('/api/auth/refresh', { refreshToken });
      saveTokens(data);

      refreshQueue.forEach((cb) => cb(data.accessToken));
      refreshQueue = [];

      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);
    } catch {
      clearTokens();
      window.location.href = '/login';
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);
