type RawEnvironment = Record<string, unknown>;

function positiveInteger(
  value: unknown,
  name: string,
  fallback?: number,
): number {
  const candidate =
    value === undefined || value === '' ? fallback : Number(value);
  if (!Number.isInteger(candidate) || Number(candidate) <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return Number(candidate);
}

function requiredString(
  value: unknown,
  name: string,
  fallback?: string,
): string {
  const candidateValue = value ?? fallback;
  if (typeof candidateValue !== 'string') {
    throw new Error(`${name} must be a string`);
  }
  const candidate = candidateValue.trim();
  if (!candidate) {
    throw new Error(`${name} is required`);
  }
  return candidate;
}

export function validateEnvironment(raw: RawEnvironment): RawEnvironment {
  const nodeEnv = requiredString(raw.NODE_ENV, 'NODE_ENV', 'development');
  const databaseUrl = requiredString(raw.DATABASE_URL, 'DATABASE_URL');
  const jwtSecret = requiredString(raw.JWT_SECRET, 'JWT_SECRET');
  const corsOrigins = requiredString(
    raw.CORS_ORIGINS,
    'CORS_ORIGINS',
    'http://localhost:5173',
  );

  try {
    const parsed = new URL(databaseUrl);
    if (!['postgres:', 'postgresql:'].includes(parsed.protocol)) {
      throw new Error();
    }
  } catch {
    throw new Error('DATABASE_URL must be a valid PostgreSQL URL');
  }

  if (jwtSecret.length < 32) {
    throw new Error('JWT_SECRET must contain at least 32 characters');
  }
  if (nodeEnv === 'production' && !corsOrigins) {
    throw new Error('CORS_ORIGINS is required in production');
  }

  return {
    ...raw,
    NODE_ENV: nodeEnv,
    PORT: positiveInteger(raw.PORT, 'PORT', 4000),
    HOST: requiredString(raw.HOST, 'HOST', '0.0.0.0'),
    API_PREFIX: requiredString(raw.API_PREFIX, 'API_PREFIX', 'api/v1'),
    DATABASE_URL: databaseUrl,
    JWT_SECRET: jwtSecret,
    JWT_EXPIRES_IN_SECONDS: positiveInteger(
      raw.JWT_EXPIRES_IN_SECONDS,
      'JWT_EXPIRES_IN_SECONDS',
      28800,
    ),
    JWT_ISSUER: requiredString(raw.JWT_ISSUER, 'JWT_ISSUER', 'mini-erp-api'),
    JWT_AUDIENCE: requiredString(
      raw.JWT_AUDIENCE,
      'JWT_AUDIENCE',
      'mini-erp-web',
    ),
    CORS_ORIGINS: corsOrigins,
  };
}
