import { prisma } from '@/config';
import faker from '@faker-js/faker';
import { OrderStatus } from '@prisma/client';

async function sumOrdersValues(): Promise<number> {
  const orders = await prisma.orders.findMany({
    where: {
      status: OrderStatus.DELIVERED,
    },
  });

  const sum: number = orders.reduce((acc, curr) => {
    acc += curr.totalValue;
    return acc;
  }, 0);

  return sum;
}

async function createDeliveredOrders(ticketId: number, productId: number) {
  await prisma.orders.createMany({
    data: [
      {
        ticketId,
        productId,
        totalValue: faker.datatype.number({ max: 5000 }),
        amount: faker.datatype.number({ max: 10 }),
        optionals: faker.lorem.words(8),
        status: OrderStatus.DELIVERED,
      },
      {
        ticketId,
        productId,
        totalValue: faker.datatype.number({ max: 5000 }),
        amount: faker.datatype.number({ max: 10 }),
        optionals: faker.lorem.words(8),
        status: OrderStatus.DELIVERED,
      },
    ],
  });
}

async function createDeliveredAndSelectedOrders(ticketId: number, productId: number) {
  await prisma.orders.createMany({
    data: [
      {
        ticketId,
        productId,
        totalValue: faker.datatype.number({ max: 5000 }),
        amount: faker.datatype.number({ max: 10 }),
        optionals: faker.lorem.words(8),
        status: OrderStatus.SELECTED,
      },
      {
        ticketId,
        productId,
        totalValue: faker.datatype.number({ max: 5000 }),
        amount: faker.datatype.number({ max: 10 }),
        optionals: faker.lorem.words(8),
        status: OrderStatus.DELIVERED,
      },
    ],
  });
}

const checkoutFactory = {
  createDeliveredOrders,
  sumOrdersValues,
  createDeliveredAndSelectedOrders
};

export default checkoutFactory;
