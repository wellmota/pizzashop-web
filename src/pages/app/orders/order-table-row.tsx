import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { TableRow, TableCell } from '@/components/ui/table';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Search, ArrowRight, X, Smartphone } from 'lucide-react';
import { OrderDetails } from './order-details';
import { OrderStatus } from '@/components/order-status';

import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelOrder } from '@/api/cancel-order';
import { GetOrdersResponse } from '@/api/get-order';
import { approveOrder } from '@/api/approve-order';
import { deliverOrder } from '@/api/deliver-order';
import { dispatchOrder } from '@/api/dispatch-order';

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: Date;
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
    customerName: string;
    customerEmail: string;
    customerPhone?: string | null;
    customerAddress: string;
    customerZipCode: string;
    total: number;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  const whatsappNumber = order.customerPhone
    ? order.customerPhone.replace(/\D/g, '')
    : '';
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Hello, I am contacting you about order ${order.orderId}.`,
      )}`
    : null;

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    });

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: Array.isArray(cacheData.orders)
          ? cacheData.orders.map((order) => {
              if (order.orderId === orderId) {
                return {
                  ...order,
                  status,
                };
              }
              return order;
            })
          : [],
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled');
      },
    });
  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing');
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering');
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered');
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
        {order.createdAt ? formatDistanceToNow(order.createdAt, { addSuffix: true }) : 'Unknown'}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="text-muted-foreground">
        {order.customerEmail}
      </TableCell>
      <TableCell className="text-muted-foreground">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="whitespace-nowrap">
            {order.customerPhone ?? '—'}
          </span>
          {whatsappHref && (
            <Button
              asChild
              variant="success"
              size="xs"
              title="Contact on WhatsApp"
            >
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">Open chat</span>
              </a>
            </Button>
          )}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {order.customerAddress}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {order.customerZipCode}
      </TableCell>
      <TableCell className="font-medium">
        {(order.total ? order.total / 100 : 0).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
            variant="outline"
            size="xs"
          >
            Aprove
            <ArrowRight className="mr h-3 w-3" />
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
            variant="outline"
            size="xs"
          >
            In delivery
            <ArrowRight className="mr h-3 w-3" />
          </Button>
        )}
        {order.status === 'delivering' && (
          <Button
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
            variant="outline"
            size="xs"
          >
            Delivered
            <ArrowRight className="mr h-3 w-3" />
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
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
