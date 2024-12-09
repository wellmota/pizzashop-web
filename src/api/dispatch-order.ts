import { api } from '@/lib/axios';

export interface dispatchOrderParam {
  orderId: string;
}

export async function dispatchOrder({ orderId }: dispatchOrderParam) {
  await api.patch(`/orders/${orderId}/dispatch`);
}
