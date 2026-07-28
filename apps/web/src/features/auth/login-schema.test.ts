import { describe, expect, it } from 'vitest';
import { loginSchema } from './login-schema';

describe('loginSchema', () => {
  it('normalizes a valid email without changing the password', () => {
    const result = loginSchema.parse({
      email: '  SALES@EXAMPLE.COM ',
      password: ' password-with-spaces ',
    });
    expect(result).toEqual({
      email: 'SALES@EXAMPLE.COM',
      password: ' password-with-spaces ',
    });
  });

  it('rejects an invalid email and short password', () => {
    const result = loginSchema.safeParse({ email: 'invalid', password: 'short' });
    expect(result.success).toBe(false);
  });
});
