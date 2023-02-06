import {
  checkAndFinishPayment,
  listAllFinishedOrders,
  listPaidTickets,
  updateOrderStatusAndSendToCheckout,
} from '@/controllers/checkout-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import validateSchema from '@/middlewares/schemas-middleware';
import { CheckoutBodySchema, PaymentBodySchema } from '@/schemas/checkout-schema';
import express from 'express';

const checkoutRouter = express.Router();

checkoutRouter
  .all('/*', authTokenMiddleware)
  .get('/:ticketId', listAllFinishedOrders)
  .get('/payment/billing', listPaidTickets)
  .patch('/', validateSchema(CheckoutBodySchema), updateOrderStatusAndSendToCheckout)
  .post('/payment/:ticketId', validateSchema(PaymentBodySchema), checkAndFinishPayment);

export { checkoutRouter };
