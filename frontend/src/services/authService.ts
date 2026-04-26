import { api, saveTokens, clearTokens } from './api';
import { AuthTokens, User } from '@/types';

interface RegisterInput {
  academyName: string;
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function register(input: RegisterInput): Promise<AuthTokens> {
  const { data } = await api.post<AuthTokens>('/auth/register', input);
  saveTokens(data);
  return data;
}

export async function login(input: LoginInput): Promise<AuthTokens> {
  const { data } = await api.post<AuthTokens>('/auth/login', input);
  saveTokens(data);
  return data;
}

export async function logout(refreshToken: string): Promise<void> {
  await api.post('/auth/logout', { refreshToken }).catch(() => null);
  clearTokens();
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/auth/me');
  return data;
}
