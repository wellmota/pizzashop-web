import { http, HttpResponse } from 'msw';
import { GetMonthOrdersCanceledAmountResponse } from '../get-month-canceled-orders-amount';

export const getMonthCanceledOrderAmountMock = http.get<
  never,
  never,
  GetMonthOrdersCanceledAmountResponse
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  });
});
