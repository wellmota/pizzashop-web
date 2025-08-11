import { api } from '@/lib/axios';

export interface MonthAnniversaryItem {
  name: string;
  day: number; // day of current month
  email?: string;
}

export type GetMonthAnniversariesResponse = MonthAnniversaryItem[];

export async function getMonthAnniversaries() {
  const response = await api.get<GetMonthAnniversariesResponse>(
    '/metrics/month-anniversaries',
  );
  return response.data;
}
