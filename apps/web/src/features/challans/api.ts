import { apiClient } from '../../api/client';
import type { Challan, ChallanInput, ChallanListItem, PageMeta } from './challan-types';

export type ChallanListParams = {
  page: number;
  limit: number;
  search?: string;
  status?: string;
};

export async function listChallans(params: ChallanListParams) {
  return (await apiClient.get<{ data: ChallanListItem[]; meta: PageMeta }>('/challans', { params }))
    .data;
}

export async function getChallan(id: string) {
  return (await apiClient.get<{ data: Challan }>(`/challans/${id}`)).data.data;
}

export async function createChallan(input: ChallanInput) {
  return (await apiClient.post<{ data: Challan }>('/challans', input)).data.data;
}

export async function updateChallan(id: string, input: ChallanInput) {
  return (await apiClient.patch<{ data: Challan }>(`/challans/${id}`, input)).data.data;
}

export async function confirmChallan(id: string) {
  return (await apiClient.post<{ data: Challan }>(`/challans/${id}/confirm`, {})).data.data;
}

export async function cancelChallan(id: string, reason?: string) {
  return (
    await apiClient.post<{ data: Challan }>(`/challans/${id}/cancel`, {
      ...(reason ? { reason } : {}),
    })
  ).data.data;
}
