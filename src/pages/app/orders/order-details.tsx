import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// export interface OrderDetailsProps{}

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Order: 9832f98398jij</DialogTitle>
        <DialogDescription>Order details</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pending
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Client Name
              </TableCell>
              <TableCell className="flex justify-end">
                Wellington Mota
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Phone</TableCell>
              <TableCell className="flex justify-end">
                (737) 7373-93939
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell className="flex justify-end">well@email.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Ordered at
              </TableCell>
              <TableCell className="flex justify-end">15 min ago</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Qtd</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Sub total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Pepperoni Pizza Family Size</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">$ 30.00</TableCell>
              <TableCell className="text-right">$ 60.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pepperoni Mozzarela</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">$ 15.00</TableCell>
              <TableCell className="text-right">$ 30.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Order Total</TableCell>
              <TableCell className="text-right font-bold">$ 90.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
