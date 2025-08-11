import { useEffect, useRef, useState } from 'react';
import { Clock, Truck } from 'lucide-react';
export type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered';

interface OrderStatusProps {
  status: OrderStatus;
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pending',
  canceled: 'Canceled',
  processing: 'Processing',
  delivering: 'Delivering',
  delivered: 'Delivered',
};

export function OrderStatus({ status }: OrderStatusProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const initialOffsetRef = useRef<number>(0);

  useEffect(() => {
    // Show a subtle timer only while processing or delivering
    if (status === 'processing' || status === 'delivering') {
      // Seed a realistic starting point so timers don't begin at 00:00
      if (initialOffsetRef.current === 0) {
        const min = status === 'processing' ? 60 * 1 : 60 * 3; // 1–3 min
        const max = status === 'processing' ? 60 * 8 : 60 * 20; // 8–20 min
        initialOffsetRef.current =
          Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const intervalId = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }

    // Reset timer for other statuses
    setElapsedSeconds(0);
    initialOffsetRef.current = 0;
  }, [status]);

  const totalSeconds = initialOffsetRef.current + elapsedSeconds;
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-slate-400"
        />
      )}
      {status === 'canceled' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-rose-500"
        />
      )}
      {status === 'processing' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-yellow-500"
        />
      )}
      {status === 'delivering' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-amber-500"
        />
      )}
      {status === 'delivered' && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-emerald-500"
        />
      )}
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
      {(status === 'processing' || status === 'delivering') && (
        <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
          {status === 'delivering' ? (
            <Truck className="h-3 w-3" aria-hidden="true" />
          ) : (
            <Clock className="h-3 w-3" aria-hidden="true" />
          )}
          {minutes}:{seconds}
        </span>
      )}
    </div>
  );
}
