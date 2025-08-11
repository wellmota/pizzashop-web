import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/api/get-order';
import { formatDistanceToNow } from 'date-fns';
import { OrderStatus } from '@/components/order-status';

export function RecentOrders() {
  const { data } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: () =>
      getOrders({
        pageIndex: 0,
        orderId: null,
        customerName: null,
        status: null,
      }),
    staleTime: 1000 * 30,
  });

  const list = Array.isArray(data?.orders) ? data.orders.slice(0, 5) : [];

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Recent orders</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {list.map((o) => (
            <li
              key={o.orderId}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {o.orderId}
                </span>
                <span className="font-medium">{o.customerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  {o.createdAt ? formatDistanceToNow(new Date(o.createdAt), {
                    addSuffix: true,
                  }) : 'Unknown'}
                </span>
                <span className="font-medium">
                  {(o.total ? o.total / 100 : 0).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </span>
                <OrderStatus status={o.status} />
              </div>
            </li>
          ))}
          {!list.length && <div className="h-[120px]" />}
        </ul>
      </CardContent>
    </Card>
  );
}
