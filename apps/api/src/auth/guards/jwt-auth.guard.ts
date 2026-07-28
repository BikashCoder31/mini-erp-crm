import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiException } from '../../common/exceptions/api.exception';
import type { AuthenticatedUser } from '../auth.types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = AuthenticatedUser>(
    error: unknown,
    user: TUser | false | null,
    info: Error | undefined,
  ): TUser {
    if (error instanceof ApiException) throw error;

    if (!user) {
      if (info?.name === 'TokenExpiredError') {
        throw new ApiException(
          401,
          'AUTH_TOKEN_EXPIRED',
          'Your session has expired.',
        );
      }
      if (!info) {
        throw new ApiException(
          401,
          'AUTH_TOKEN_MISSING',
          'Authentication is required.',
        );
      }
      throw new ApiException(
        401,
        'AUTH_TOKEN_INVALID',
        'The access token is invalid.',
      );
    }

    return user;
  }
}
