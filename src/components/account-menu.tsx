import { Building, ChevronDown, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { getProfile } from '@/api/get-profile';
import { useQuery } from '@tanstack/react-query';
import { getManagedRestaurant } from '@/api/get-managed-restaurant';
import { Skeleton } from './ui/skeleton';
import { Dialog, DialogTrigger } from './ui/dialog';
import { StoreProfileDialog } from './store-profile-dialog';

export function AccountMenu() {
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  });

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
    });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex item-center gap-2 select-none"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-48" />
            ) : (
              managedRestaurant?.name
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-ts font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="h-4 w-4 mr-2" />
              <span>Store Profile</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <StoreProfileDialog />
    </Dialog>
  );
}
