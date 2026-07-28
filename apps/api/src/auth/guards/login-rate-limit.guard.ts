import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { ApiException } from '../../common/exceptions/api.exception';

type AttemptWindow = { count: number; resetAt: number };

@Injectable()
export class LoginRateLimitGuard implements CanActivate {
  private readonly attempts = new Map<string, AttemptWindow>();
  private readonly limit = 5;
  private readonly windowMs = 60_000;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.ip || request.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const existing = this.attempts.get(key);

    if (!existing || existing.resetAt <= now) {
      this.attempts.set(key, { count: 1, resetAt: now + this.windowMs });
      this.removeExpired(now);
      return true;
    }

    if (existing.count >= this.limit) {
      throw new ApiException(
        429,
        'RATE_LIMIT_EXCEEDED',
        'Too many login attempts. Please try again later.',
      );
    }

    existing.count += 1;
    return true;
  }

  private removeExpired(now: number): void {
    if (this.attempts.size < 500) return;
    for (const [key, value] of this.attempts) {
      if (value.resetAt <= now) this.attempts.delete(key);
    }
  }
}
