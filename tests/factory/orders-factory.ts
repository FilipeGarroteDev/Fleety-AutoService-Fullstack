import { prismaPG } from '@/config';
import faker from '@faker-js/faker';
import { OrderStatus } from '@prisma/client';

async function createDeliveredAndPreparingOrders(ticketId: number, productId: number) {
  await prismaPG.orders.createMany({
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
        status: OrderStatus.PREPARING,
      },
      {
        ticketId,
        productId,
        totalValue: faker.datatype.number({ max: 5000 }),
        amount: faker.datatype.number({ max: 10 }),
        optionals: faker.lorem.words(8),
        status: OrderStatus.PREPARING,
      },
    ],
  });
}

async function createOrderInAnotherTicket(ticketId: number, productId: number) {
  return await prismaPG.orders.create({
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
  await prismaPG.orders.createMany({
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

async function createSelectedAndPreparingOrders(ticketId: number, productId: number) {
  await prismaPG.orders.createMany({
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
        status: OrderStatus.PREPARING,
      },
      {
        ticketId,
        productId,
        totalValue: faker.datatype.number({ max: 5000 }),
        amount: faker.datatype.number({ max: 10 }),
        optionals: faker.lorem.words(8),
        status: OrderStatus.PREPARING,
      },
    ],
  });
}

const ordersFactory = {
  createDeliveredAndPreparingOrders,
  createOrderInAnotherTicket,
  createManySelectedOrders,
  createSelectedAndPreparingOrders,
};

export default ordersFactory;
