import { describe, expect, it } from 'vitest';
import { normalizeApiError } from './api-error';

describe('normalizeApiError', () => {
  it('preserves stable API codes, request IDs, and field errors', () => {
    const normalized = normalizeApiError({
      isAxiosError: true,
      response: {
        status: 400,
        data: {
          error: {
            code: 'VALIDATION_FAILED',
            message: 'The request contains invalid values.',
            requestId: 'request-1',
            details: [
              { field: 'quantity', message: 'quantity must be positive' },
              { field: 'quantity', message: 'quantity must be an integer' },
            ],
          },
        },
      },
    });

    expect(normalized).toMatchObject({
      status: 400,
      code: 'VALIDATION_FAILED',
      requestId: 'request-1',
      fieldErrors: {
        quantity: ['quantity must be positive', 'quantity must be an integer'],
      },
    });
  });

  it('returns a safe network message when no response exists', () => {
    const normalized = normalizeApiError({ isAxiosError: true });
    expect(normalized.code).toBe('NETWORK_ERROR');
    expect(normalized.message).toContain('unreachable');
  });
});
