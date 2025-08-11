import { http, HttpResponse } from 'msw';
import { SignInBody } from '../sign-in';

export const signInMock = http.post<never, SignInBody>(
  '/authenticate',
  async ({ request }) => {
    const { email } = await request.json();

    if (email === 'johndoe@example.com') {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          // Ensure cookie is visible to the app on Vercel preview/prod
          'Set-Cookie': 'auth=sample-jwt; Path=/; HttpOnly; SameSite=Lax',
        },
      });
    }

    return new HttpResponse(null, { status: 401 });
  },
);
