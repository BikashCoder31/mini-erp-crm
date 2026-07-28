import axios from 'axios';

export type NormalizedApiError = {
  status?: number;
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
  details?: unknown;
  requestId?: string;
};

export function normalizeApiError(error: unknown): NormalizedApiError {
  if (!axios.isAxiosError(error)) {
    return {
      code: 'UNKNOWN_ERROR',
      message: 'The request could not be completed.',
    };
  }
  const payload = error.response?.data as
    | {
        error?: {
          code?: string;
          message?: string;
          details?: unknown;
          requestId?: string;
        };
      }
    | undefined;
  const details = payload?.error?.details;
  const fieldErrors: Record<string, string[]> = {};
  if (Array.isArray(details)) {
    for (const detail of details) {
      if (
        typeof detail === 'object' &&
        detail !== null &&
        'field' in detail &&
        typeof detail.field === 'string' &&
        'message' in detail &&
        typeof detail.message === 'string'
      ) {
        fieldErrors[detail.field] = [...(fieldErrors[detail.field] ?? []), detail.message];
      }
    }
  }
  return {
    status: error.response?.status,
    code: payload?.error?.code ?? 'NETWORK_ERROR',
    message:
      payload?.error?.message ??
      (error.response
        ? 'The request could not be completed.'
        : 'The service is unreachable. Check the connection and try again.'),
    ...(Object.keys(fieldErrors).length > 0 ? { fieldErrors } : {}),
    ...(details === undefined ? {} : { details }),
    ...(payload?.error?.requestId ? { requestId: payload.error.requestId } : {}),
  };
}
