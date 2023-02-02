import notFoundError from '@/errors/notFoundError';
import unauthorizedError from '@/errors/unauthorizedError';
import unprocessableEntityError from '@/errors/unprocessableEntityError';
import { OrderBodyEntity, OrderWithProductInfo } from '@/protocols';
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

  const createdOrder: Orders = await ordersRepository.saveNewOrder(order);
  return createdOrder;
}

async function searchOrdersByTicketId(ticketId: string): Promise<OrderWithProductInfo[]> {
  const validTicketId = Number(ticketId);

  if (!validTicketId) throw unprocessableEntityError();

  const ticket = await ticketsRepository.getTicketById(validTicketId);

  if (!ticket) throw notFoundError();

  const orders: OrderWithProductInfo[] = await ordersRepository.getAllSelectedOrders(validTicketId);
  return orders;
}

async function validateAndDeleteSelectedOrder(orderId: string, userId: number): Promise<void> {
  const validOrderId = Number(orderId);

  if (!validOrderId) throw unprocessableEntityError();

  const order: Orders = await ordersRepository.getOrderById(validOrderId);

  if (!order) throw notFoundError();

  const ticket = await ticketsRepository.getTicketById(order.ticketId);

  if (ticket.userId !== userId) throw unauthorizedError();

  await ordersRepository.deleteOrderById(validOrderId);
}

async function searchAllOrdersWithPreparingStatus(role: string): Promise<OrderWithProductInfo[]> {
  if (role !== 'ADMIN') throw unauthorizedError();

  const orders: OrderWithProductInfo[] = await ordersRepository.getAllPreparingOrders();
  console.log(orders);
  return orders;
}

const ordersService = {
  createAndValidateNewOrder,
  searchOrdersByTicketId,
  validateAndDeleteSelectedOrder,
  searchAllOrdersWithPreparingStatus,
};

export default ordersService;
