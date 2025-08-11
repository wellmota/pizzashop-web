import { http, HttpResponse } from 'msw';
import { GetProfileResponse } from '../get-profile';

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  ({ request }) => {
    const cookieHeader = request.headers.get('cookie') ?? '';
    const isAuthenticated = /(?:^|;\s*)auth=/.test(cookieHeader);

    if (!isAuthenticated) {
      return new HttpResponse(null, { status: 401, statusText: 'UNAUTHORIZED' });
    }

    return HttpResponse.json({
      id: 'custom-user-id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    });
  },
);
