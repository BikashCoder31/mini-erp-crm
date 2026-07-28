import { createContext } from 'react';
import type { AuthState, UserRole } from './auth-types';

export type AuthContextValue = {
  state: AuthState;
  sessionError: string | null;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  restoreSession(): Promise<void>;
  hasRole(...roles: UserRole[]): boolean;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
