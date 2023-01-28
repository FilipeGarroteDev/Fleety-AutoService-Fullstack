import notFoundError from '@/errors/notFoundError';
import { OrderBodyEntity } from '@/protocols';
import ordersRepository from '@/repositories/orders-repository';
import productsRepository from '@/repositories/products-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { Orders } from '@prisma/client';

async function createAndValidateNewOrder(order: OrderBodyEntity): Promise<Orders> {
  const ticket = await ticketsRepository.getTicketById(order.ticketId);
  const product = await productsRepository.getProductById(order.productId);

  if (!ticket || !product) {
    throw notFoundError();
  }

  const createdOrder = await ordersRepository.saveNewOrder(order);
  return createdOrder;
}

const ordersService = {
  createAndValidateNewOrder,
};

export default ordersService;
