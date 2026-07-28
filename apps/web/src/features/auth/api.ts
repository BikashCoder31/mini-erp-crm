import { apiClient } from '../../api/client';
import type { AuthUser } from './auth-types';

type LoginResponse = {
  data: {
    accessToken: string;
    tokenType: 'Bearer';
    expiresIn: number;
    user: AuthUser;
  };
};

type MeResponse = { data: AuthUser };

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  return (await apiClient.post<LoginResponse>('/auth/login', { email, password })).data;
}

export async function meRequest(): Promise<AuthUser> {
  return (await apiClient.get<MeResponse>('/auth/me')).data.data;
}
