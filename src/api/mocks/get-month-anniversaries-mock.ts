import { http, HttpResponse } from 'msw';
import type { GetMonthAnniversariesResponse } from '../get-month-anniversaries';

export const getMonthAnniversariesMock = http.get<
  never,
  never,
  GetMonthAnniversariesResponse
>('/metrics/month-anniversaries', () => {
  // Simple demo list for current month
  return HttpResponse.json([
    { name: 'Emma Johnson', day: 4, email: 'emma.johnson@example.com' },
    { name: 'Liam Smith', day: 9, email: 'liam.smith@example.com' },
    { name: 'Olivia Brown', day: 12, email: 'olivia.brown@example.com' },
    { name: 'Noah Davis', day: 20, email: 'noah.davis@example.com' },
    { name: 'Ava Wilson', day: 27, email: 'ava.wilson@example.com' },
  ]);
});
