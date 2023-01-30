import { deleteActiveOrder, finishAndSendProductOrder, listAllTicketOrders } from '@/controllers/orders-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import validateSchema from '@/middlewares/schemas-middleware';
import { OrdersBodySchema } from '@/schemas/orders-schema';
import express from 'express';

const ordersRouter = express.Router();

ordersRouter
  .all('/*', authTokenMiddleware)
  .get('/:ticketId', listAllTicketOrders)
  .delete('/:orderId', deleteActiveOrder)
  .all('/*', validateSchema(OrdersBodySchema))
  .post('/add', finishAndSendProductOrder);

export { ordersRouter };
