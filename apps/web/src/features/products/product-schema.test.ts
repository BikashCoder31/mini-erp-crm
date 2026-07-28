import { describe, expect, it } from 'vitest';
import { productSchema, stockAdjustmentSchema } from './product-schema';

const validProduct = {
  name: 'Industrial Adhesive 5L',
  sku: 'ADH-005L',
  category: 'Adhesives',
  unitPrice: '1250.00',
  openingStock: 10,
  minimumStockAlertQuantity: 3,
  warehouseLocation: 'Kathmandu A-01',
  isActive: true,
};

describe('productSchema', () => {
  it('accepts exact decimal strings and whole stock quantities', () => {
    expect(productSchema.safeParse(validProduct).success).toBe(true);
  });

  it('rejects fractional quantities and over-precision prices', () => {
    expect(
      productSchema.safeParse({
        ...validProduct,
        openingStock: 1.5,
        unitPrice: '10.999',
      }).success,
    ).toBe(false);
  });
});

describe('stockAdjustmentSchema', () => {
  it('requires a positive whole quantity and a reason', () => {
    expect(
      stockAdjustmentSchema.safeParse({
        movementType: 'OUT',
        quantity: 0,
        reason: '',
      }).success,
    ).toBe(false);
  });
});
