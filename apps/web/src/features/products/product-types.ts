export type StockMovementType = 'IN' | 'OUT';
export type StockReferenceType =
  | 'OPENING_STOCK'
  | 'MANUAL_ADJUSTMENT'
  | 'CHALLAN_CONFIRMATION'
  | 'CHALLAN_CANCELLATION';

export type StockMovement = {
  id: string;
  movementType: StockMovementType;
  quantity: number;
  reason: string;
  balanceBefore: number;
  balanceAfter: number;
  referenceType: StockReferenceType;
  createdAt: string;
  product: { id: string; name: string; sku: string };
  challan: { id: string; challanNumber: string } | null;
  createdBy: { id: string; name: string; role: string };
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  unitPrice: string;
  currentStock: number;
  minimumStockAlertQuantity: number;
  warehouseLocation: string;
  isActive: boolean;
  isLowStock: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: { id: string; name: string };
  movementCount?: number;
  recentMovements?: StockMovement[];
};

export type ProductInput = {
  name: string;
  sku: string;
  category: string;
  unitPrice: string;
  openingStock: number;
  minimumStockAlertQuantity: number;
  warehouseLocation: string;
};

export type ProductUpdateInput = Omit<ProductInput, 'openingStock'> & {
  isActive: boolean;
};

export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
