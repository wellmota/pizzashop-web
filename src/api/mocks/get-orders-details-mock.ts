import { http, HttpResponse } from 'msw';
import {
  GetOrderDetailsParam,
  GetOrderDetailsResponse,
} from '../get-order-details';

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParam,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'john doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
    },

    status: 'pending',
    createdAt: new Date().toISOString(),
    totalInCents: 5000,
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        product: { name: 'Pizza 1' },
        quantity: '2',
      },
    ],
  });
});
