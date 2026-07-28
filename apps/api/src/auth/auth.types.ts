import type { UserRole } from '@prisma/client';

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  type: 'access';
}

export interface LoginResponse {
  data: {
    accessToken: string;
    tokenType: 'Bearer';
    expiresIn: number;
    user: AuthenticatedUser;
  };
}
