import { http, HttpResponse } from 'msw';
import { GetPopularProductsResponse } from '../get-popular-products';

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Margherita', amount: 32 },
    { product: 'Pepperoni', amount: 28 },
    { product: 'Four Cheese', amount: 19 },
    { product: 'BBQ Chicken', amount: 14 },
    { product: 'Veggie Supreme', amount: 11 },
  ]);
});
