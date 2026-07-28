import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().trim().min(2).max(160),
  mobileNumber: z
    .string()
    .trim()
    .min(7)
    .max(24)
    .regex(/^[\d\s+()-]+$/, 'Use digits, spaces, +, -, or parentheses'),
  email: z.string().trim().email().max(254),
  businessName: z.string().trim().min(2).max(180),
  gstNumber: z.string().trim().max(32),
  customerType: z.enum(['RETAIL', 'WHOLESALE', 'DISTRIBUTOR']),
  address: z.string().trim().min(5).max(1000),
  status: z.enum(['LEAD', 'ACTIVE', 'INACTIVE']),
  followUpDate: z.string().min(1, 'Follow-up date is required'),
  notes: z.string().trim().min(1).max(4000),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

export const followUpSchema = z.object({
  note: z.string().trim().min(1).max(2000),
  nextFollowUpDate: z.string(),
});

export type FollowUpFormValues = z.infer<typeof followUpSchema>;
