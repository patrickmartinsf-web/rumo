export type Role = 'ADMIN' | 'MANAGER' | 'RECEPTIONIST' | 'INSTRUCTOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  academyId: string;
  createdAt: string;
}

export interface Academy {
  id: string;
  name: string;
  plan: string;
}

export type InstructorStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';

export interface Instructor {
  id: string;
  academyId: string;
  name: string;
  email: string;
  phone?: string;
  specialties: string[];
  status: InstructorStatus;
  createdAt: string;
  updatedAt: string;
}

export type ClassStatus = 'DRAFT' | 'CONFIRMED' | 'CANCELLED';

export interface Class {
  id: string;
  academyId: string;
  instructorId?: string;
  name: string;
  specialty: string;
  date: string;
  startTime: string;
  endTime: string;
  room?: string;
  capacity: number;
  status: ClassStatus;
  instructor?: Instructor;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ApiError {
  error: string;
  details?: Record<string, string[]>;
}
