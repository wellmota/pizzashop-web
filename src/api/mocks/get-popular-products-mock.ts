import { http, HttpResponse } from 'msw';
import { GetPopularProductsResponse } from '../get-popular-products';

export const getDayOrderAmountMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/day-orders-amount', () => {
  return HttpResponse.json([
    {product: 'Pizza 1', amount:5},
    {product: 'Pizza 2', amount:3}, 
    {product: 'Pizza 3', amount:2},
    {product: 'Pizza 4', amount:1},
    {product: 'Pizza 5', amount:1},
    
  ]);
});
