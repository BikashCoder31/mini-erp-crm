import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().trim().min(2).max(180),
  sku: z
    .string()
    .trim()
    .min(2)
    .max(64)
    .regex(
      /^[A-Za-z0-9][A-Za-z0-9._/-]*$/,
      'Use letters, numbers, dots, underscores, slashes, or hyphens',
    ),
  category: z.string().trim().min(2).max(120),
  unitPrice: z
    .string()
    .trim()
    .regex(/^\d{1,10}(\.\d{1,2})?$/, 'Enter a non-negative price with up to 2 decimal places'),
  openingStock: z.number().int().min(0).max(2_147_483_647),
  minimumStockAlertQuantity: z.number().int().min(0).max(2_147_483_647),
  warehouseLocation: z.string().trim().min(2).max(160),
  isActive: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const stockAdjustmentSchema = z.object({
  movementType: z.enum(['IN', 'OUT']),
  quantity: z.number().int().min(1).max(2_147_483_647),
  reason: z.string().trim().min(3).max(300),
});

export type StockAdjustmentFormValues = z.infer<typeof stockAdjustmentSchema>;
