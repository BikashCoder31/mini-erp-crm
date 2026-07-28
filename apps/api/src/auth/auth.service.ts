import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ApiException } from '../common/exceptions/api.exception';
import { PrismaService } from '../prisma/prisma.service';
import type {
  AccessTokenPayload,
  AuthenticatedUser,
  LoginResponse,
} from './auth.types';
import type { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto, requestId: string): Promise<LoginResponse> {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        passwordHash: true,
      },
    });

    const passwordMatches = user
      ? await bcrypt.compare(dto.password, user.passwordHash)
      : await bcrypt.compare(
          dto.password,
          '$2b$12$wD7h0Q1pTl0Mmkp9.2hD0.O4SD.5f2t8d5b9C8onQ3Kx8S9z5tDwe',
        );

    if (!user || !passwordMatches || !user.isActive) {
      this.logger.warn({ event: 'login_failed', requestId });
      throw new ApiException(
        401,
        'AUTH_INVALID_CREDENTIALS',
        'Invalid email or password.',
      );
    }

    const safeUser: AuthenticatedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const expiresIn = this.config.getOrThrow<number>('JWT_EXPIRES_IN_SECONDS');
    const payload: AccessTokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      type: 'access',
    };
    const accessToken = await this.jwt.signAsync(payload);

    this.logger.log({
      event: 'login_succeeded',
      userId: user.id,
      role: user.role,
      requestId,
    });

    return {
      data: {
        accessToken,
        tokenType: 'Bearer',
        expiresIn,
        user: safeUser,
      },
    };
  }
}
