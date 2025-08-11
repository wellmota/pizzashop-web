import { api } from '@/lib/axios';

export interface OrdersByStatusResponse {
  pending: number;
  processing: number;
  delivering: number;
  delivered: number;
  canceled: number;
}

export async function getOrdersByStatus() {
  const response = await api.get<OrdersByStatusResponse>(
    '/metrics/orders-by-status',
  );
  return response.data;
}
