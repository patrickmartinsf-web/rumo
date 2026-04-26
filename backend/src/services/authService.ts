import bcrypt from 'bcryptjs';
import { prisma } from '../config/database';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';

interface RegisterInput {
  academyName: string;
  email: string;
  password: string;
  name: string;
}

interface LoginInput {
  email: string;
  password: string;
}

function refreshExpiresAt(): Date {
  const days = parseInt(env.JWT_REFRESH_EXPIRES_IN);
  const date = new Date();
  date.setDate(date.getDate() + (isNaN(days) ? 7 : days));
  return date;
}

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new AppError('Email já cadastrado', 409);

  const hashed = await bcrypt.hash(input.password, 12);

  const academy = await prisma.academy.create({
    data: {
      name: input.academyName,
      email: input.email,
      users: {
        create: {
          email: input.email,
          password: hashed,
          name: input.name,
          role: 'ADMIN',
        },
      },
    },
    include: { users: true },
  });

  const user = academy.users[0];

  const accessToken = signAccessToken({
    userId: user.id,
    academyId: academy.id,
    role: user.role,
  });
  const refreshToken = signRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt: refreshExpiresAt() },
  });

  return { accessToken, refreshToken, user: sanitizeUser(user) };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new AppError('Credenciais inválidas', 401);

  const valid = await bcrypt.compare(input.password, user.password);
  if (!valid) throw new AppError('Credenciais inválidas', 401);

  const accessToken = signAccessToken({
    userId: user.id,
    academyId: user.academyId,
    role: user.role,
  });
  const refreshToken = signRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt: refreshExpiresAt() },
  });

  return { accessToken, refreshToken, user: sanitizeUser(user) };
}

export async function refresh(token: string) {
  let payload: { userId: string };
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new AppError('Refresh token inválido', 401);
  }

  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored || stored.expiresAt < new Date()) {
    throw new AppError('Refresh token expirado', 401);
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) throw new AppError('Usuário não encontrado', 404);

  await prisma.refreshToken.delete({ where: { token } });

  const newAccessToken = signAccessToken({
    userId: user.id,
    academyId: user.academyId,
    role: user.role,
  });
  const newRefreshToken = signRefreshToken(user.id);

  await prisma.refreshToken.create({
    data: { token: newRefreshToken, userId: user.id, expiresAt: refreshExpiresAt() },
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function logout(token: string) {
  await prisma.refreshToken.deleteMany({ where: { token } });
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { academy: { select: { id: true, name: true, plan: true } } },
  });
  if (!user) throw new AppError('Usuário não encontrado', 404);
  return sanitizeUser(user);
}

function sanitizeUser(user: { id: string; name: string; email: string; role: string; academyId: string; createdAt: Date }) {
  const { id, name, email, role, academyId, createdAt } = user;
  return { id, name, email, role, academyId, createdAt };
}
