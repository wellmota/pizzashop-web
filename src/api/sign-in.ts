import { api } from '@/lib/axios';

export interface SignInBody {
  email: string;
}

export async function signIn({ email }: SignInBody) {
  await api.post('/authenticate', { email });

  // In-browser Service Worker responses cannot reliably set cookies via
  // the Set-Cookie header. Since this is a demo, set the cookie here so
  // subsequent authenticated requests (e.g. /me) succeed.
  if (typeof document !== 'undefined') {
    const maxAgeSeconds = 60 * 60 * 8; // 8 hours
    document.cookie = `auth=sample-jwt; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
  }
}
