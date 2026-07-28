import { QueryClient } from '@tanstack/react-query';
import { normalizeApiError } from './api-error';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const status = normalizeApiError(error).status;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 1;
      },
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
    mutations: { retry: false },
  },
});
