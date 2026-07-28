import type { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { ApiException } from '../../common/exceptions/api.exception';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  const getAllAndOverride = jest.fn();
  const reflector = { getAllAndOverride } as unknown as Reflector;
  const guard = new RolesGuard(reflector);

  function context(role?: UserRole): ExecutionContext {
    return {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({
          user: role
            ? {
                id: 'user-id',
                name: 'User',
                email: 'user@example.com',
                role,
              }
            : undefined,
        }),
      }),
    } as unknown as ExecutionContext;
  }

  it('allows authenticated routes with no role restriction', () => {
    getAllAndOverride.mockReturnValue(undefined);
    expect(guard.canActivate(context(UserRole.ACCOUNTS))).toBe(true);
  });

  it('allows a matching role', () => {
    getAllAndOverride.mockReturnValue([UserRole.ADMIN, UserRole.SALES]);
    expect(guard.canActivate(context(UserRole.SALES))).toBe(true);
  });

  it('rejects a non-matching role with the stable error code', () => {
    getAllAndOverride.mockReturnValue([UserRole.ADMIN]);
    try {
      guard.canActivate(context(UserRole.WAREHOUSE));
      throw new Error('Expected role denial');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(ApiException);
      const apiError = error as ApiException;
      expect(apiError.getStatus()).toBe(403);
      expect(apiError.getResponse()).toEqual(
        expect.objectContaining({ code: 'FORBIDDEN_ROLE' }),
      );
    }
  });
});
