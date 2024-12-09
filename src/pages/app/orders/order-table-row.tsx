import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { TableRow, TableCell } from '@/components/ui/table';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Search, ArrowRight, X, Variable } from 'lucide-react';
import { OrderDetails } from './order-details';
import { OrderStatus } from '@/components/order-status';

import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelOrder } from '@/api/cancel-order';
import { GetOrdersResponse } from '@/api/get-order';

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: Date;
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }) {
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      });

      ordersListCache.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return;
        }

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                status: 'canceled',
              };
            }
            return order;
          }),
        });
      });
    },
  });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Details</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
          {/* Content for dialog within order details */}
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, { addSuffix: true })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          Aprove
          <ArrowRight className="mr h-3 w-3" />
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={!['pending', 'processing'].includes(order.status)}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}
