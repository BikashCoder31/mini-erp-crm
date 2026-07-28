import { apiClient } from '../../api/client';
import type { Customer, CustomerFollowUp, CustomerInput, PageMeta } from './customer-types';

export type CustomerListParams = {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  customerType?: string;
};

export async function listCustomers(params: CustomerListParams) {
  return (
    await apiClient.get<{ data: Customer[]; meta: PageMeta }>('/customers', {
      params,
    })
  ).data;
}

export async function getCustomer(id: string) {
  return (await apiClient.get<{ data: Customer }>(`/customers/${id}`)).data.data;
}

export async function createCustomer(input: CustomerInput) {
  return (await apiClient.post<{ data: Customer }>('/customers', input)).data.data;
}

export async function updateCustomer(id: string, input: Partial<CustomerInput>) {
  return (await apiClient.patch<{ data: Customer }>(`/customers/${id}`, input)).data.data;
}

export async function listCustomerFollowUps(id: string) {
  return (
    await apiClient.get<{ data: CustomerFollowUp[]; meta: PageMeta }>(`/customers/${id}/follow-ups`)
  ).data;
}

export async function addCustomerFollowUp(
  id: string,
  input: { note: string; nextFollowUpDate?: string },
) {
  return (
    await apiClient.post<{ data: CustomerFollowUp & { customerFollowUpDate: string } }>(
      `/customers/${id}/follow-ups`,
      input,
    )
  ).data.data;
}
