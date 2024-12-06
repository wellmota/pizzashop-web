import { api } from '@/lib/axios';

export interface GetOrderQuery {
  pageIndex: number | null;
}

interface GetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: Date;
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrders({ pageIndex }: GetOrderQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
    },
  });

  return response.data;
}
