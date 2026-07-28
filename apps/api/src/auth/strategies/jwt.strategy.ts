import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserRole } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiException } from '../../common/exceptions/api.exception';
import { PrismaService } from '../../prisma/prisma.service';
import type { AccessTokenPayload, AuthenticatedUser } from '../auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
      issuer: config.getOrThrow<string>('JWT_ISSUER'),
      audience: config.getOrThrow<string>('JWT_AUDIENCE'),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: AccessTokenPayload): Promise<AuthenticatedUser> {
    if (
      payload.type !== 'access' ||
      !payload.sub ||
      !Object.values(UserRole).includes(payload.role)
    ) {
      throw new ApiException(
        401,
        'AUTH_TOKEN_INVALID',
        'The access token is invalid.',
      );
    }

    const user = await this.prisma.user.findFirst({
      where: { id: payload.sub, isActive: true },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      throw new ApiException(
        401,
        'AUTH_USER_INACTIVE',
        'This account is unavailable.',
      );
    }
    return user;
  }
}
