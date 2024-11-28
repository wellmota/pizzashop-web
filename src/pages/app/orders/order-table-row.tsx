import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { TableRow, TableCell } from '@/components/ui/table';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Search, ArrowRight, X } from 'lucide-react';
import { OrderDetails } from './order-details';

// export interface OrderTableRowProps {}

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Details</span>
            </Button>
          </DialogTrigger>

          <OrderDetails />
          {/* Content for dialog within order details */}
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        39839837983
      </TableCell>
      <TableCell className="text-muted-foreground">15 min ago</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pending</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Austin McDonald</TableCell>
      <TableCell className="font-medium">$ 140.00</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          Aprove
          <ArrowRight className="mr h-3 w-3" />
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}
