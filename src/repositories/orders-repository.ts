import { prisma } from '@/config';
import { OrderBodyEntity } from '@/protocols';
import { Orders } from '@prisma/client';

async function saveNewOrder(body: OrderBodyEntity): Promise<Orders> {
  return prisma.orders.create({
    data: body,
  });
}

const ordersRepository = { saveNewOrder };

export default ordersRepository;
