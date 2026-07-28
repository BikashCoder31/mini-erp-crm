import { validateEnvironment } from './environment';

const validEnvironment = {
  DATABASE_URL: 'postgresql://user:password@localhost:5432/mini_erp',
  JWT_SECRET: 'a-secure-secret-that-is-at-least-32-characters',
  CORS_ORIGINS: 'http://localhost:5173',
};

describe('validateEnvironment', () => {
  it('applies safe development defaults and parses numeric values', () => {
    const result = validateEnvironment({
      ...validEnvironment,
      PORT: '4100',
      JWT_EXPIRES_IN_SECONDS: '3600',
    });

    expect(result).toMatchObject({
      NODE_ENV: 'development',
      PORT: 4100,
      HOST: '0.0.0.0',
      API_PREFIX: 'api/v1',
      JWT_EXPIRES_IN_SECONDS: 3600,
    });
  });

  it('rejects a non-PostgreSQL database URL', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        DATABASE_URL: 'mysql://localhost/mini_erp',
      }),
    ).toThrow('DATABASE_URL must be a valid PostgreSQL URL');
  });

  it('rejects a short JWT secret', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        JWT_SECRET: 'too-short',
      }),
    ).toThrow('JWT_SECRET must contain at least 32 characters');
  });

  it('rejects invalid positive integer configuration', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        PORT: '0',
      }),
    ).toThrow('PORT must be a positive integer');
  });
});
