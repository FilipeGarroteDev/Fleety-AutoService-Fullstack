import { prisma } from '@/config';
import { OrderBodyEntity, OrderWithProductInfo } from '@/protocols';
import { Orders, OrderStatus } from '@prisma/client';

async function saveNewOrder(body: OrderBodyEntity): Promise<Orders> {
  return prisma.orders.create({
    data: body,
  });
}

async function getAllSelectedOrders(ticketId: number): Promise<OrderWithProductInfo[]> {
  return prisma.orders.findMany({
    where: {
      ticketId,
      status: OrderStatus.SELECTED,
    },
    include: {
      Product: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

const ordersRepository = { saveNewOrder, getAllSelectedOrders };

export default ordersRepository;
