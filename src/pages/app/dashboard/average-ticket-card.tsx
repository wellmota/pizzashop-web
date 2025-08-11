import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getMonthRevenue } from '@/api/get-month-revenue';
import { getMonthOrdersAmount } from '@/api/get-month-orders-amount';
import { Loader2, Wallet } from 'lucide-react';

export function AverageTicketCard() {
  const { data: revenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
    staleTime: 1000 * 60, // 1 min
  });

  const { data: orders } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
    staleTime: 1000 * 60,
  });

  const average =
    revenue && orders && orders.amount > 0
      ? revenue.receipt / orders.amount
      : null;

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Average Order Value
          </CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {average === null ? (
          <div className="flex h-[72px] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-1">
            <span className="text-2xl font-bold">
              {average.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
            <p className="text-xs text-muted-foreground">
              Revenue / orders in the current month
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
