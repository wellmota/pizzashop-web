import { api } from '@/lib/axios';

export type GetPopularProductsResponse = {
  product: string;
  amount: number;
}[];

export async function getPopularProductsMock() {
  const response = await api.get<GetPopularProductsResponse>(
    '/metrics/popular-products',
  );

  return response.data;
}
