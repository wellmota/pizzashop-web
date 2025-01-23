import { http, HttpResponse } from 'msw';
import { dispatchOrderParam } from '../dispatch-order';

export const dispatchOrderMock = http.patch<dispatchOrderParam, never, never>(
  '/orders/:orderId/dispatch',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 });
    }
    return new HttpResponse(null, { status: 204 });
  },
);
