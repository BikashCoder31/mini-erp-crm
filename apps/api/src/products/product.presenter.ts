type PresentableProduct = {
  unitPrice: { toFixed(digits?: number): string };
  currentStock: number;
  minimumStockAlertQuantity: number;
} & Record<string, unknown>;

export function presentProduct<T extends PresentableProduct>(product: T) {
  return {
    ...product,
    unitPrice: product.unitPrice.toFixed(2),
    isLowStock: product.currentStock <= product.minimumStockAlertQuantity,
  };
}
