import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getMonthAnniversaries } from '@/api/get-month-anniversaries';
import { Calendar, Mail } from 'lucide-react';

export function MonthAnniversaries() {
  const { data } = useQuery({
    queryKey: ['metrics', 'month-anniversaries'],
    queryFn: getMonthAnniversaries,
    staleTime: 1000 * 60,
  });

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Month anniversaries
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {Array.isArray(data) &&
            data.map((item) => (
              <li
                key={`${item.name}-${item.day}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">{`day ${item.day}`}</span>
                </div>
                {item.email && (
                  <a
                    href={`mailto:${item.email}`}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {item.email}
                  </a>
                )}
              </li>
            ))}
          {!data?.length && <div className="h-[120px]" />}
        </ul>
      </CardContent>
    </Card>
  );
}
