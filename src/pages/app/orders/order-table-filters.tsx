import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFilterSchema = z.infer<typeof orderFilterSchema>;

export function OrderTableFilters() {
  const [searchParams, SetSearchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');
  const customerName = searchParams.get('customerName');
  const status = searchParams.get('status');

  const { register, handleSubmit, control, reset } = useForm<OrderFilterSchema>(
    {
      resolver: zodResolver(orderFilterSchema),
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? 'all',
      },
    },
  );

  function handleFilter({ orderId, customerName, status }: OrderFilterSchema) {
    SetSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId);
      } else {
        state.delete('orderId');
      }
      if (customerName) {
        state.set('customerName', customerName);
      } else {
        state.delete('orderId');
      }
      if (status) {
        state.set('status', status);
      } else {
        state.delete('status');
      }
      state.set('page', '1');
      return state;
    });
  }

  function handleClearFilters() {
    SetSearchParams((state) => {
      state.delete('orderId');
      state.delete('customerName');
      state.delete('status');
      state.set('page', '1');
      return state;
    });

    reset({
      orderId: '',
      customerName: '',
      status: 'all',
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filters</span>
      <Input
        placeholder="Order ID"
        className="h-8 w-auto"
        {...register('orderId')}
      />
      <Input
        placeholder="Client name"
        className="h-8 w-[320px]"
        {...register('customerName')}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      ></Controller>

      <Button type="submit" variant="secondary" size="xs">
        <Search className="h-4 mr-1 w-4" />
        Apply filters
      </Button>
      <Button
        onClick={handleClearFilters}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="h-4 mr-1 w-4" />
        Clear filters
      </Button>
    </form>
  );
}
