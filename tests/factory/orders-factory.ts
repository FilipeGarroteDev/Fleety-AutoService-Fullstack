import { prisma } from '@/config';
import faker from '@faker-js/faker';
import { OrderStatus } from '@prisma/client';

async function createManyDeliveredOrders(ticketId: number, productId: number) {
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

async function createOrderInAnotherTicket(ticketId: number, productId: number) {
  await prisma.orders.create({
    data: {
      ticketId,
      productId,
      totalValue: faker.datatype.number({ max: 5000 }),
      amount: faker.datatype.number({ max: 10 }),
      optionals: faker.lorem.words(8),
      status: OrderStatus.SELECTED,
    },
  });
}

async function createManySelectedOrders(ticketId: number, productId: number) {
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
        status: OrderStatus.SELECTED,
      },
      {
        ticketId,
        productId,
        totalValue: faker.datatype.number({ max: 5000 }),
        amount: faker.datatype.number({ max: 10 }),
        optionals: faker.lorem.words(8),
        status: OrderStatus.SELECTED,
      },
    ],
  });
}

const ordersFactory = {
  createManyDeliveredOrders,
  createOrderInAnotherTicket,
  createManySelectedOrders
};

export default ordersFactory;
