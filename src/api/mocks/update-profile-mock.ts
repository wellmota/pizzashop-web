import { UpdateProfileBody } from '../update-profile';
import { http, HttpResponse } from 'msw';

export const updateProfileMock = http.put<never, UpdateProfileBody>(
  '/profile',
  async ({ request }) => {
    const { name } = await request.json();

    if (name === 'Square Pizza') {
      return new HttpResponse(null, { status: 204 });
    }
    return new HttpResponse(null, { status: 400 });
  },
);
