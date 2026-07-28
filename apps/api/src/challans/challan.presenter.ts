type DecimalLike = { toFixed(digits?: number): string };

export function presentChallanListItem<
  T extends {
    totalAmount: DecimalLike;
    _count: { items: number };
  } & Record<string, unknown>,
>(challan: T) {
  const { _count, ...data } = challan;
  return {
    ...data,
    totalAmount: challan.totalAmount.toFixed(2),
    itemCount: _count.items,
  };
}

export function presentChallanDetail<
  T extends {
    totalAmount: DecimalLike;
    items: Array<
      {
        unitPriceSnapshot: DecimalLike;
        lineTotal: DecimalLike;
        productNameSnapshot: string;
        productSkuSnapshot: string;
        productCategorySnapshot: string;
        warehouseLocationSnapshot: string;
      } & Record<string, unknown>
    >;
  } & Record<string, unknown>,
>(challan: T) {
  return {
    ...challan,
    totalAmount: challan.totalAmount.toFixed(2),
    items: challan.items.map(
      ({
        productNameSnapshot,
        productSkuSnapshot,
        productCategorySnapshot,
        unitPriceSnapshot,
        warehouseLocationSnapshot,
        ...item
      }) => ({
        ...item,
        productName: productNameSnapshot,
        productSku: productSkuSnapshot,
        productCategory: productCategorySnapshot,
        unitPrice: unitPriceSnapshot.toFixed(2),
        warehouseLocation: warehouseLocationSnapshot,
        lineTotal: item.lineTotal.toFixed(2),
      }),
    ),
  };
}
