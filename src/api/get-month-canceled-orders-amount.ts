import { api } from '@/lib/axios';

export interface GetMonthOrdersCanceledAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersCanceledAmount() {
  const response = await api.get<GetMonthOrdersCanceledAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  );

  return response.data;
}
