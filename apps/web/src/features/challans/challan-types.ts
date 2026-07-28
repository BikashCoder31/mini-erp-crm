export type ChallanStatus = 'DRAFT' | 'CONFIRMED' | 'CANCELLED';

export type ChallanItem = {
  id: string;
  productId: string;
  lineNumber: number;
  productName: string;
  productSku: string;
  productCategory: string;
  unitPrice: string;
  warehouseLocation: string;
  quantity: number;
  lineTotal: string;
};

export type Challan = {
  id: string;
  sequenceNumber: number;
  challanNumber: string;
  status: ChallanStatus;
  totalQuantity: number;
  totalAmount: string;
  customer: {
    id: string;
    name: string;
    businessName: string;
    mobileNumber: string;
    email: string;
    address: string;
  };
  items: ChallanItem[];
  createdBy: { id: string; name: string; role: string };
  confirmedBy: { id: string; name: string; role: string } | null;
  cancelledBy: { id: string; name: string; role: string } | null;
  confirmedAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ChallanListItem = {
  id: string;
  challanNumber: string;
  status: ChallanStatus;
  totalQuantity: number;
  totalAmount: string;
  itemCount: number;
  customer: { id: string; name: string; businessName: string };
  createdBy: { id: string; name: string };
  createdAt: string;
  confirmedAt: string | null;
};

export type ChallanInput = {
  customerId: string;
  items: Array<{ productId: string; quantity: number }>;
};

export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
