import { api } from '@/lib/axios';

export interface GetOrderDetailsParam {
  orderId: string;
}

export interface GetOrderDetailsResponse {
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
  id: string;
  createdAt: string;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: string;
    product: {
      name: string;
    };
  }[];
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParam) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`);

  return response.data;
}
