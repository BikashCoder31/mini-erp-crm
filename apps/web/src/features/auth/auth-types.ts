export type UserRole = 'ADMIN' | 'SALES' | 'WAREHOUSE' | 'ACCOUNTS';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type StoredSession = {
  accessToken: string;
  user: AuthUser;
};

export type AuthState =
  | { status: 'loading'; user: null }
  | { status: 'anonymous'; user: null }
  | { status: 'authenticated'; user: AuthUser };
