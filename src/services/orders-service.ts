import notFoundError from '@/errors/notFoundError';
import unprocessableEntityError from '@/errors/unprocessableEntityError';
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

async function searchOrdersByTicketId(ticketId: string): Promise<Orders[]> {
  const validTicketId = Number(ticketId);

  if (!validTicketId) throw unprocessableEntityError();

  const ticket = await ticketsRepository.getTicketById(validTicketId);

  if (!ticket) throw notFoundError();

  const orders: Orders[] = await ordersRepository.getAllOrders(validTicketId);
  return orders;
}

const ordersService = {
  createAndValidateNewOrder,
  searchOrdersByTicketId,
};

export default ordersService;
