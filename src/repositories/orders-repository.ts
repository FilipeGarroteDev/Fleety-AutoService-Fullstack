import { prisma } from '@/config';
import { OrderBodyEntity } from '@/protocols';
import { Orders, OrderStatus } from '@prisma/client';

async function saveNewOrder(body: OrderBodyEntity): Promise<Orders> {
  return prisma.orders.create({
    data: body,
  });
}

async function getAllOrders(ticketId: number): Promise<Orders[]> {
  return prisma.orders.findMany({
    where: {
      ticketId,
      status: OrderStatus.ORDERED,
    },
  });
}

const ordersRepository = { saveNewOrder, getAllOrders };

export default ordersRepository;
