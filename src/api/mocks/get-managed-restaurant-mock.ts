import { http, HttpResponse } from 'msw';
import { GetManagedRestaurantResponse } from '../get-managed-restaurant';

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/me', () => {
  return HttpResponse.json({
    id: 'custom-restaurant-id',
    name: 'Pizza shop',
    description: 'Managed restaurant',
    managerId: 'custom-user-id',
    createdAt: new Date(),
    updatedAt: null,
  });
});
