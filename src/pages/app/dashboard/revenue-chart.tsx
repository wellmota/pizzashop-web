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

const data = [
  { date: '01/01', revenue: 420 },
  { date: '01/02', revenue: 3000 },
  { date: '01/03', revenue: 2000 },
  { date: '01/04', revenue: 2780 },
  { date: '01/05', revenue: 1890 },
  { date: '01/06', revenue: 2390 },
  { date: '01/07', revenue: 3490 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Revenue</CardTitle>
          <CardDescription>Revenue for the last 30 days</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={248}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <CartesianGrid vertical={false} className="stroke-muted" />
            <XAxis dataKey={'date'} axisLine={false} tickLine={false} dy={16} />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString('en', {
                  style: 'currency',
                  currency: 'USD',
                })
              }
              width={80}
            />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet['500']}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
