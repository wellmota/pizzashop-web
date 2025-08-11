import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import colors from 'tailwindcss/colors';

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from 'recharts';
import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period';
import { useQuery } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';
import { Loader2 } from 'lucide-react'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: ()=> getDailyRevenueInPeriod({
      from: dateRange?.from,
      to: dateRange?.to,
    })
  });

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Revenue</CardTitle>
          <CardDescription>Revenue for the last 30 days</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Date</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {dailyRevenueInPeriod ? (
          <>
            <ResponsiveContainer width="100%" height={248}>
              <LineChart data={dailyRevenueInPeriod} style={{ fontSize: 12 }}>
                <CartesianGrid vertical={false} className="stroke-muted" />
                <XAxis
                  dataKey={'date'}
                  axisLine={false}
                  tickLine={false}
                  dy={16}
                />
                <YAxis
                  stroke="#888"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) =>
                    (value || 0).toLocaleString('en', {
                      style: 'currency',
                      currency: 'USD',
                    })
                  }
                  width={80}
                />
                <Line
                  type="linear"
                  strokeWidth={2}
                  dataKey="receipt"
                  stroke={colors.violet['500']}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
