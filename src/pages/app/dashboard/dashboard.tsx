import { Helmet } from 'react-helmet-async';
import { MonthRevenueCard } from './month-revenue-card';
import { MonthOrdersAmountCard } from './month-orders-amount';
import { DayOrdersAmountCard } from './day-orders-amount-card';
import { MonthCanceledOrdersAmount } from './month-canceled-orders-amount';
import { RevenueChart } from './revenue-chart';
import { PopularProductsChart } from './popular-products-chart';
import { AverageTicketCard } from './average-ticket-card';
import { OrdersByStatusCard } from './orders-by-status-card';
import { RecentOrders } from './recent-orders';
import { MonthAnniversaries } from './month-anniversaries';

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmount />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <AverageTicketCard />
          <OrdersByStatusCard />
          <RecentOrders />
          <MonthAnniversaries />
        </div>
      </div>
    </>
  );
}
