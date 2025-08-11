import { http, HttpResponse } from 'msw';
import type { OrdersByStatusResponse } from '../get-orders-by-status';

export const getOrdersByStatusMock = http.get<
  never,
  never,
  OrdersByStatusResponse
>('/metrics/orders-by-status', () => {
  // Rough distribution for demo purposes
  return HttpResponse.json({
    pending: 6,
    processing: 18,
    delivering: 9,
    delivered: 22,
    canceled: 5,
  });
});
