import { apiClient } from '../../api/client';
import type {
  PageMeta,
  Product,
  ProductInput,
  ProductUpdateInput,
  StockMovement,
  StockMovementType,
} from './product-types';

export type ProductListParams = {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  warehouseLocation?: string;
  isActive?: boolean;
  lowStock?: boolean;
};

export async function listProducts(params: ProductListParams) {
  return (
    await apiClient.get<{ data: Product[]; meta: PageMeta }>('/products', {
      params,
    })
  ).data;
}

export async function getProduct(id: string) {
  return (await apiClient.get<{ data: Product }>(`/products/${id}`)).data.data;
}

export async function createProduct(input: ProductInput) {
  return (await apiClient.post<{ data: Product }>('/products', input)).data.data;
}

export async function updateProduct(id: string, input: ProductUpdateInput) {
  return (await apiClient.patch<{ data: Product }>(`/products/${id}`, input)).data.data;
}

export async function listProductMovements(id: string, page = 1, limit = 20) {
  return (
    await apiClient.get<{ data: StockMovement[]; meta: PageMeta }>(
      `/products/${id}/stock-movements`,
      { params: { page, limit } },
    )
  ).data;
}

export async function createStockMovement(
  id: string,
  input: { movementType: StockMovementType; quantity: number; reason: string },
) {
  return (
    await apiClient.post<{ data: StockMovement & { productBalance: number } }>(
      `/products/${id}/stock-movements`,
      input,
    )
  ).data.data;
}
