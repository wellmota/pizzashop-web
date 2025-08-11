import { getPopularProductsMock } from './get-popular-products-mock';
import { env } from '@/env';
import { setupWorker } from 'msw/browser';
import { signInMock } from './sign-in-mock';
import { registerRestaurantMock } from './register-restaurant-mock';
import { getDayOrderAmountMock } from './get-day-orders-amount-mock';

import { getMonthOrderAmountMock } from './get-month-orders-amount-mock';
import { getMonthCanceledOrderAmountMock } from './get-month-canceled-orders-amount-mock';
import { getMonthRevenueMock } from './get-month-revenue-mock';
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock';
import { getManagedRestaurantMock } from './get-managed-restaurant-mock';
import { updateProfileMock } from './update-profile-mock';
import { getProfileMock } from './get-profile-mock';
import { getOrdersMock } from './get-order-mock';
import { getOrderDetailsMock } from './get-orders-details-mock';
import { approveOrderMock } from './approve-order-mock';
import { cancelOrderMock } from './cancel-order-mock';
import { deliverOrderMock } from './deliver-order-mock';
import { dispatchOrderMock } from './dispatch-order-mock';
import { signOutMock } from './sign-out-mock';
import { getOrdersByStatusMock } from './get-orders-by-status-mock';
import { getMonthAnniversariesMock } from './get-month-anniversaries-mock';

export const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrderAmountMock,
  getMonthOrderAmountMock,
  getMonthCanceledOrderAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
  signOutMock,
  getOrdersByStatusMock,
  getMonthAnniversariesMock,
);

export async function enableMSW() {
  // Enable MSW for demo purposes on all environments
  // In a real app, you'd only enable this in development/test

  if (typeof window === 'undefined') {
    // Skip MSW on server-side rendering
    return;
  }

  try {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
    console.log('🔥 MSW enabled for demo');
  } catch (error) {
    console.warn('Failed to start MSW:', error);
  }
}
