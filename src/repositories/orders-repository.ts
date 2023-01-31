import { prismaPG } from '@/config';
import { OrderBodyEntity, OrderWithProductInfo } from '@/protocols';
import { Orders, OrderStatus } from '@prisma/client';

async function saveNewOrder(body: OrderBodyEntity): Promise<Orders> {
  return prismaPG.orders.create({
    data: body,
  });
}

async function getAllSelectedOrders(ticketId: number): Promise<OrderWithProductInfo[]> {
  return prismaPG.orders.findMany({
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

async function getOrderById(orderId: number): Promise<Orders> {
  return prismaPG.orders.findUnique({
    where: {
      id: orderId,
    }
  });
}

async function deleteOrderById(orderId: number): Promise<void> {
  await prismaPG.orders.delete({
    where: {
      id: orderId,
    }
  });
}

const ordersRepository = { saveNewOrder, getAllSelectedOrders, getOrderById, deleteOrderById };

export default ordersRepository;
