import { prisma } from '@/config';
import { CheckoutBodyEntity } from '@/protocols';
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

const checkoutRepository = { updateManyOrders };

export default checkoutRepository;
