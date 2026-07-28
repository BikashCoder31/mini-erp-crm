export type CustomerType = 'RETAIL' | 'WHOLESALE' | 'DISTRIBUTOR';
export type CustomerStatus = 'LEAD' | 'ACTIVE' | 'INACTIVE';

export type Customer = {
  id: string;
  name: string;
  mobileNumber: string;
  email: string;
  businessName: string;
  gstNumber: string | null;
  customerType: CustomerType;
  address: string;
  status: CustomerStatus;
  followUpDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  createdBy: { id: string; name: string };
  followUpCount?: number;
  challanCount?: number;
};

export type CustomerFollowUp = {
  id: string;
  note: string;
  nextFollowUpDate: string | null;
  createdAt: string;
  createdBy: { id: string; name: string };
};

export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type CustomerInput = {
  name: string;
  mobileNumber: string;
  email: string;
  businessName: string;
  gstNumber?: string;
  customerType: CustomerType;
  address: string;
  status: CustomerStatus;
  followUpDate: string;
  notes: string;
};
