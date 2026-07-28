import { describe, expect, it } from 'vitest';
import { customerSchema, followUpSchema } from './customer-schema';

describe('customerSchema', () => {
  const valid = {
    name: 'Acme Retail',
    mobileNumber: '+977 981-234-5678',
    email: 'contact@acme.example',
    businessName: 'Acme Retail Pvt. Ltd.',
    gstNumber: '',
    customerType: 'RETAIL' as const,
    address: 'Kathmandu, Nepal',
    status: 'LEAD' as const,
    followUpDate: '2026-08-01T10:30',
    notes: 'Initial contact.',
  };

  it('accepts the complete source-required customer shape', () => {
    expect(customerSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects unsupported mobile characters and missing notes', () => {
    expect(customerSchema.safeParse({ ...valid, mobileNumber: 'call-me', notes: '' }).success).toBe(
      false,
    );
  });
});

describe('followUpSchema', () => {
  it('requires a note while allowing an omitted next date value', () => {
    expect(
      followUpSchema.safeParse({ note: 'Called customer.', nextFollowUpDate: '' }).success,
    ).toBe(true);
    expect(followUpSchema.safeParse({ note: '', nextFollowUpDate: '' }).success).toBe(false);
  });
});
