import { z } from 'zod';

export const challanSchema = z
  .object({
    customerId: z.string().uuid('Select a customer'),
    items: z
      .array(
        z.object({
          productId: z.string().uuid('Select a product'),
          quantity: z.number().int().min(1).max(2_147_483_647),
        }),
      )
      .min(1, 'Add at least one product'),
  })
  .superRefine((value, context) => {
    const seen = new Set<string>();
    value.items.forEach((item, index) => {
      if (seen.has(item.productId)) {
        context.addIssue({
          code: 'custom',
          message: 'A product can appear only once',
          path: ['items', index, 'productId'],
        });
      }
      seen.add(item.productId);
    });
  });

export type ChallanFormValues = z.infer<typeof challanSchema>;
