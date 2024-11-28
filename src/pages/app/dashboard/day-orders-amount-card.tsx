import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Utensils } from 'lucide-react';

export function DayOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex-row space-y-0 item-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Orders(day)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">12</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-rose-500 dark:text-rose-400">-4%</span> from
          yesterday
        </p>
      </CardContent>
    </Card>
  );
}
