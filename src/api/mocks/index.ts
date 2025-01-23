import { env } from '@/env';
import { setupWorker } from 'msw/browser';
import { signInMock } from './sign-in-mock';
import { registerRestaurantMock } from './register-restaurant';
import { getDayOrderAmountMock } from './get-day-orders-amount';

import { getMonthOrderAmountMock } from './get-month-orders-amount';
import { getMonthCanceledOrderAmountMock } from './get-month-canceled-orders-amount';
import { getMonthRevenueMock } from './get-month-revenue';
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock'

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrderAmountMock,
  getMonthOrderAmountMock,
  getMonthCanceledOrderAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock
);

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return;
  }

  await worker.start();
}
