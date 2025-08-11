import { http, HttpResponse } from 'msw';
import type { GetOrdersResponse } from '../get-order';

type Orders = GetOrdersResponse['orders'];

type OrderStatus = GetOrdersResponse['orders'][number]['status'];

const statuses: OrderStatus[] = [
  'pending',
  'processing',
  'delivered',
  'delivering',
];

const sampleCustomers = [
  {
    name: 'John Carter',
    email: 'john.carter@example.com',
    phone: '+1 (415) 555-0171',
  },
  {
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    phone: '+1 (415) 555-0134',
  },
  {
    name: 'Liam Smith',
    email: 'liam.smith@example.com',
    phone: '+1 (415) 555-0199',
  },
  {
    name: 'Olivia Brown',
    email: 'olivia.brown@example.com',
    phone: '+1 (415) 555-0102',
  },
  {
    name: 'Noah Davis',
    email: 'noah.davis@example.com',
    phone: '+1 (415) 555-0147',
  },
  {
    name: 'Ava Wilson',
    email: 'ava.wilson@example.com',
    phone: '+1 (415) 555-0183',
  },
  {
    name: 'Sophia Miller',
    email: 'sophia.miller@example.com',
    phone: '+1 (415) 555-0162',
  },
  {
    name: 'James Anderson',
    email: 'james.anderson@example.com',
    phone: '+1 (415) 555-0125',
  },
  {
    name: 'Mia Thomas',
    email: 'mia.thomas@example.com',
    phone: '+1 (415) 555-0158',
  },
  {
    name: 'Lucas Martinez',
    email: 'lucas.martinez@example.com',
    phone: '+1 (415) 555-0179',
  },
];

const sampleAddresses = [
  { address: '742 Evergreen Terrace, Springfield', zip: '62704' },
  { address: '31 Spooner Street, Quahog', zip: '02860' },
  { address: '124 Conch Street, Bikini Bottom', zip: '91911' },
  { address: '221B Baker Street, London', zip: 'NW1 6XE' },
  { address: '4 Privet Drive, Little Whinging', zip: 'CR3 0AA' },
  { address: '12 Grimmauld Place, London', zip: 'N1 9AL' },
  { address: '350 Fifth Avenue, New York', zip: '10118' },
  { address: '1600 Pennsylvania Ave NW, Washington', zip: '20500' },
  { address: '1 Infinite Loop, Cupertino', zip: '95014' },
  { address: '4059 Mt Lee Dr, Hollywood', zip: '90068' },
];

const orders: Orders = Array.from({ length: 60 }).map((_, i) => {
  const customer = sampleCustomers[i % sampleCustomers.length];
  const addr = sampleAddresses[i % sampleAddresses.length];
  const createdAt = new Date(Date.now() - i * 1000 * 60 * 60 * 6);
  return {
    orderId: `ORD-${String(1000 + i)}`,
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    customerAddress: addr.address,
    customerZipCode: addr.zip,
    createdAt,
    total: 1500 + (i % 5) * 350,
    status: statuses[i % statuses.length],
  };
});

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0;

    const customerName = searchParams.get('customerName');
    const orderId = searchParams.get('orderId');
    const status = searchParams.get('status');

    let filteredOrders = orders;
    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      );
    }
    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      );
    }
    if (status) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status,
      );
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    );

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    });
  },
);
