import { api } from '@/lib/axios';

export interface RegisterRestaurantBody {
  companyName: string;
  managerName: string;
  email: string;
  phone: string;
}

export async function registerRestaurant({
  companyName,
  managerName,
  email,
  phone,
}: RegisterRestaurantBody) {
  await api.post('/authenticate', {
    companyName,
    managerName,
    email,
    phone,
  });
}
