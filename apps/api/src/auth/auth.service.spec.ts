import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ApiException } from '../common/exceptions/api.exception';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

const compareMock = bcrypt.compare as jest.MockedFunction<
  typeof bcrypt.compare
>;

async function expectApiError(
  promise: Promise<unknown>,
  status: number,
  code: string,
): Promise<void> {
  try {
    await promise;
    throw new Error('Expected the operation to fail');
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(ApiException);
    const apiError = error as ApiException;
    expect(apiError.getStatus()).toBe(status);
    expect(apiError.getResponse()).toEqual(expect.objectContaining({ code }));
  }
}

describe('AuthService', () => {
  const findUnique = jest.fn();
  const signAsync = jest.fn().mockResolvedValue('signed-token');
  const configValues: Record<string, unknown> = {
    JWT_EXPIRES_IN_SECONDS: 28800,
  };
  const service = new AuthService(
    { user: { findUnique } } as unknown as PrismaService,
    { signAsync } as unknown as JwtService,
    {
      getOrThrow: (key: string) => configValues[key],
    } as unknown as ConfigService,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('normalizes email, verifies the password, and signs the required claims', async () => {
    findUnique.mockResolvedValue({
      id: '7154f07d-55b1-4f25-9a4a-201375475b75',
      name: 'Sales User',
      email: 'sales@example.com',
      role: UserRole.SALES,
      isActive: true,
      passwordHash: 'stored-hash',
    });
    compareMock.mockResolvedValue(true as never);

    const result = await service.login(
      { email: '  SALES@EXAMPLE.COM ', password: 'correct-password' },
      'request-1',
    );

    expect(findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { email: 'sales@example.com' } }),
    );
    expect(compareMock).toHaveBeenCalledWith('correct-password', 'stored-hash');
    expect(signAsync).toHaveBeenCalledWith({
      sub: '7154f07d-55b1-4f25-9a4a-201375475b75',
      email: 'sales@example.com',
      role: UserRole.SALES,
      type: 'access',
    });
    expect(result).toEqual({
      data: {
        accessToken: 'signed-token',
        tokenType: 'Bearer',
        expiresIn: 28800,
        user: {
          id: '7154f07d-55b1-4f25-9a4a-201375475b75',
          name: 'Sales User',
          email: 'sales@example.com',
          role: UserRole.SALES,
        },
      },
    });
    expect(result.data.user).not.toHaveProperty('passwordHash');
  });

  it('uses the generic credential error for a wrong password', async () => {
    findUnique.mockResolvedValue({
      id: 'user-id',
      name: 'Sales User',
      email: 'sales@example.com',
      role: UserRole.SALES,
      isActive: true,
      passwordHash: 'stored-hash',
    });
    compareMock.mockResolvedValue(false as never);

    await expectApiError(
      service.login(
        { email: 'sales@example.com', password: 'incorrect-password' },
        'request-2',
      ),
      401,
      'AUTH_INVALID_CREDENTIALS',
    );
  });

  it('uses the same public error for an unknown user', async () => {
    findUnique.mockResolvedValue(null);
    compareMock.mockResolvedValue(false as never);

    await expectApiError(
      service.login(
        { email: 'unknown@example.com', password: 'incorrect-password' },
        'request-3',
      ),
      401,
      'AUTH_INVALID_CREDENTIALS',
    );
  });

  it('uses the same public error for an inactive user', async () => {
    findUnique.mockResolvedValue({
      id: 'user-id',
      name: 'Sales User',
      email: 'sales@example.com',
      role: UserRole.SALES,
      isActive: false,
      passwordHash: 'stored-hash',
    });
    compareMock.mockResolvedValue(true as never);

    await expectApiError(
      service.login(
        { email: 'sales@example.com', password: 'correct-password' },
        'request-4',
      ),
      401,
      'AUTH_INVALID_CREDENTIALS',
    );
  });
});
