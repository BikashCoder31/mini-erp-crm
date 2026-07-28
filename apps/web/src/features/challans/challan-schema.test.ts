import { describe, expect, it } from 'vitest';
import { challanSchema } from './challan-schema';

const customerId = '7154f07d-55b1-4f25-9a4a-201375475b75';
const productId = '2154f07d-55b1-4f25-9a4a-201375475b75';

describe('challanSchema', () => {
  it('accepts a customer and positive whole quantities', () => {
    expect(
      challanSchema.safeParse({
        customerId,
        items: [{ productId, quantity: 2 }],
      }).success,
    ).toBe(true);
  });

  it('rejects duplicate products', () => {
    expect(
      challanSchema.safeParse({
        customerId,
        items: [
          { productId, quantity: 1 },
          { productId, quantity: 2 },
        ],
      }).success,
    ).toBe(false);
  });

  it('rejects empty and fractional lines', () => {
    expect(challanSchema.safeParse({ customerId, items: [] }).success).toBe(false);
    expect(
      challanSchema.safeParse({
        customerId,
        items: [{ productId, quantity: 1.5 }],
      }).success,
    ).toBe(false);
  });
});
