import notFoundError from '@/errors/notFoundError';
import unauthorizedError from '@/errors/unauthorizedError';
import unprocessableEntityError from '@/errors/unprocessableEntityError';
import { CheckoutBodyEntity, OrderWithProductInfo } from '@/protocols';
import checkoutRepository from '@/repositories/checkout-repository';
import ordersRepository from '@/repositories/orders-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function updateFinishedOrders(order: CheckoutBodyEntity): Promise<void> {
  const ticket = await ticketsRepository.getTicketById(order.ticketId);

  if (!ticket) throw notFoundError();

  const orders = await ordersRepository.getAllSelectedOrders(ticket.id);

  if (orders.length === 0) throw unauthorizedError();

  return await checkoutRepository.updateManyOrders(order);
}

async function searchFinishedOrdersByTicketId(ticketId: string): Promise<OrderWithProductInfo[]> {
  const validTicketId = Number(ticketId);

  if (!validTicketId) throw unprocessableEntityError();

  const ticket = await ticketsRepository.getTicketById(validTicketId);

  if (!ticket) throw notFoundError();

  const finishedOrders: OrderWithProductInfo[] = await checkoutRepository.getAllFinishedOrders(validTicketId);
  return finishedOrders;
}

const checkoutService = {
  updateFinishedOrders,
  searchFinishedOrdersByTicketId,
};

export default checkoutService;
