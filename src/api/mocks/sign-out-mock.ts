import { http, HttpResponse } from 'msw';

export const signOutMock = http.post('/sign-out', () => {
  return new HttpResponse(null, {
    status: 200,
    headers: {
      'Set-Cookie': 'auth=; Max-Age=0',
    },
  });
});
