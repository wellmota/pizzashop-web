import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from './ui/button';

export interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;
  return (
    <div className="flex item-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total of {totalCount} items(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Page {pageIndex + 1} of {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-4 w-4 p-4">
            <ChevronsLeft className="h-2 w-2" />
            <span className="sr-only">First page</span>
          </Button>
          <Button variant="outline" className="h-4 w-4 p-4">
            <ChevronLeft className="h-2 w-2" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button variant="outline" className="h-4 w-4 p-4">
            <ChevronRight className="h-2 w-2" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button variant="outline" className="h-4 w-4 p-4">
            <ChevronsRight className="h-2 w-2" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
