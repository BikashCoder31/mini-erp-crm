import type { StoredSession } from './auth-types';

const STORAGE_KEY = 'mini-erp-session';

export function readSession(): StoredSession | null {
  const value = sessionStorage.getItem(STORAGE_KEY);
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<StoredSession>;
    if (!parsed.accessToken || !parsed.user?.id || !parsed.user.role) {
      clearSession();
      return null;
    }
    return parsed as StoredSession;
  } catch {
    clearSession();
    return null;
  }
}

export function saveSession(session: StoredSession): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}
