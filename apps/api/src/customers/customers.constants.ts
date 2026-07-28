export const CUSTOMER_DEFAULT_PAGE_SIZE = 20;
export const CUSTOMER_MAX_PAGE_SIZE = 100;

export const CUSTOMER_SELECT = {
  id: true,
  name: true,
  mobileNumber: true,
  email: true,
  businessName: true,
  gstNumber: true,
  customerType: true,
  address: true,
  status: true,
  followUpDate: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
  createdBy: {
    select: { id: true, name: true },
  },
} as const;
