import axios from 'axios';
import { clearSession, readSession } from '../features/auth/auth-storage';

const baseURL = import.meta.env.VITE_API_BASE_URL as string | undefined;

if (!baseURL) {
  throw new Error('VITE_API_BASE_URL is required');
}

export const apiClient = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = readSession()?.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const code = (error.response.data as { error?: { code?: string } } | undefined)?.error?.code;
      if (
        code &&
        ['AUTH_TOKEN_EXPIRED', 'AUTH_TOKEN_INVALID', 'AUTH_USER_INACTIVE'].includes(code)
      ) {
        clearSession();
        window.dispatchEvent(new Event('auth:invalid-session'));
      }
    }
    return Promise.reject(error);
  },
);
