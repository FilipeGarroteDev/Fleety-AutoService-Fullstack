import notFoundError from '@/errors/notFoundError';
import unauthorizedError from '@/errors/unauthorizedError';
import { CheckoutBodyEntity } from '@/protocols';
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

const checkoutService = {
  updateFinishedOrders,
};

export default checkoutService;
