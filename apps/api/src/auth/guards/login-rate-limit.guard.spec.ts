import type { ExecutionContext } from '@nestjs/common';
import { ApiException } from '../../common/exceptions/api.exception';
import { LoginRateLimitGuard } from './login-rate-limit.guard';

describe('LoginRateLimitGuard', () => {
  it('allows five attempts and rejects the sixth for the same address', () => {
    const guard = new LoginRateLimitGuard();
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          ip: '127.0.0.1',
          socket: { remoteAddress: '127.0.0.1' },
        }),
      }),
    } as unknown as ExecutionContext;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(guard.canActivate(context)).toBe(true);
    }
    try {
      guard.canActivate(context);
      throw new Error('Expected rate limiting');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(ApiException);
      const apiError = error as ApiException;
      expect(apiError.getStatus()).toBe(429);
      expect(apiError.getResponse()).toEqual(
        expect.objectContaining({ code: 'RATE_LIMIT_EXCEEDED' }),
      );
    }
  });
});
