import { prisma } from '@/config';
import { CheckoutBodyEntity, OrderWithProductInfo } from '@/protocols';
import { OrderStatus } from '@prisma/client';

async function updateManyOrders({ ticketId, status }: CheckoutBodyEntity): Promise<void> {
  await prisma.orders.updateMany({
    where: {
      ticketId,
      status: OrderStatus.SELECTED,
    },
    data: {
      status,
    },
  });
}

async function getAllFinishedOrders(ticketId: number): Promise<OrderWithProductInfo[]> {
  return await prisma.orders.findMany({
    where: {
      ticketId,
      OR: [{ status: OrderStatus.DELIVERED }, { status: OrderStatus.PREPARING }],
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

const checkoutRepository = { updateManyOrders, getAllFinishedOrders };

export default checkoutRepository;
