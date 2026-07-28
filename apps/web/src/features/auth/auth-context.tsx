import { type PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { meRequest, loginRequest } from './api';
import { clearSession, readSession, saveSession } from './auth-storage';
import type { AuthState, UserRole } from './auth-types';
import { AuthContext } from './auth-context-value';

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AuthState>({ status: 'loading', user: null });
  const [sessionError, setSessionError] = useState<string | null>(null);

  const logout = useCallback(() => {
    clearSession();
    setSessionError(null);
    setState({ status: 'anonymous', user: null });
  }, []);

  const restoreSession = useCallback(async () => {
    const stored = readSession();
    if (!stored) {
      setState({ status: 'anonymous', user: null });
      return;
    }
    setState({ status: 'loading', user: null });
    setSessionError(null);
    try {
      const user = await meRequest();
      saveSession({ ...stored, user });
      setState({ status: 'authenticated', user });
    } catch (error) {
      const status =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof error.response === 'object' &&
        error.response !== null &&
        'status' in error.response
          ? error.response.status
          : undefined;
      if (status === 401) {
        logout();
      } else {
        setSessionError('We could not verify your session. Check the connection and retry.');
        setState({ status: 'loading', user: null });
      }
    }
  }, [logout]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginRequest(email, password);
    saveSession({ accessToken: response.data.accessToken, user: response.data.user });
    setSessionError(null);
    setState({ status: 'authenticated', user: response.data.user });
  }, []);

  const hasRole = useCallback(
    (...roles: UserRole[]) => state.status === 'authenticated' && roles.includes(state.user.role),
    [state],
  );

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    const handleInvalidSession = () => logout();
    window.addEventListener('auth:invalid-session', handleInvalidSession);
    return () => window.removeEventListener('auth:invalid-session', handleInvalidSession);
  }, [logout]);

  const value = useMemo(
    () => ({ state, sessionError, login, logout, restoreSession, hasRole }),
    [state, sessionError, login, logout, restoreSession, hasRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
