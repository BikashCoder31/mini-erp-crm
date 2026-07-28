export const PRODUCT_DEFAULT_PAGE_SIZE = 20;
export const PRODUCT_MAX_PAGE_SIZE = 100;
export const MOVEMENT_DEFAULT_PAGE_SIZE = 20;
export const MOVEMENT_MAX_PAGE_SIZE = 100;

export const PRODUCT_SELECT = {
  id: true,
  name: true,
  sku: true,
  category: true,
  unitPrice: true,
  currentStock: true,
  minimumStockAlertQuantity: true,
  warehouseLocation: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  createdBy: { select: { id: true, name: true } },
} as const;

export const STOCK_MOVEMENT_SELECT = {
  id: true,
  movementType: true,
  quantity: true,
  reason: true,
  balanceBefore: true,
  balanceAfter: true,
  referenceType: true,
  createdAt: true,
  product: { select: { id: true, name: true, sku: true } },
  challan: { select: { id: true, challanNumber: true } },
  createdBy: { select: { id: true, name: true, role: true } },
} as const;
