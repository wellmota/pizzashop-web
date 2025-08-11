import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getOrdersByStatus } from '@/api/get-orders-by-status';
import { PackageCheck, PackageOpen, Timer, Truck, XCircle } from 'lucide-react';

export function OrdersByStatusCard() {
  const { data } = useQuery({
    queryKey: ['metrics', 'orders-by-status'],
    queryFn: getOrdersByStatus,
    staleTime: 1000 * 60,
  });

  const total = data
    ? data.pending +
      data.processing +
      data.delivering +
      data.delivered +
      data.canceled
    : 0;

  function percent(value: number) {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  }

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Orders by status
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!data ? (
          <div className="h-[120px]" />
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <StatusRow
                icon={<Timer className="h-4 w-4 text-slate-400" />}
                label="Pending"
                value={data.pending}
                pct={percent(data.pending)}
              />
              <StatusRow
                icon={<PackageOpen className="h-4 w-4 text-yellow-500" />}
                label="Processing"
                value={data.processing}
                pct={percent(data.processing)}
              />
              <StatusRow
                icon={<Truck className="h-4 w-4 text-amber-500" />}
                label="Delivering"
                value={data.delivering}
                pct={percent(data.delivering)}
              />
              <StatusRow
                icon={<PackageCheck className="h-4 w-4 text-emerald-500" />}
                label="Delivered"
                value={data.delivered}
                pct={percent(data.delivered)}
              />
              <StatusRow
                icon={<XCircle className="h-4 w-4 text-rose-500" />}
                label="Canceled"
                value={data.canceled}
                pct={percent(data.canceled)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatusRow({
  icon,
  label,
  value,
  pct,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  pct: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-28">
          <div className="h-2 w-full overflow-hidden rounded bg-muted">
            <div
              className="h-full bg-foreground/70"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <span className="tabular-nums text-xs text-muted-foreground">
          {value} ({pct}%)
        </span>
      </div>
    </div>
  );
}
