import { checkAndFinishPayment, listAllFinishedOrders, updateOrderStatusAndSendToCheckout } from '@/controllers/checkout-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import validateSchema from '@/middlewares/schemas-middleware';
import { CheckoutBodySchema, PaymentBodySchema } from '@/schemas/checkout-schema';
import express from 'express';

const checkoutRouter = express.Router();

checkoutRouter
  .all('/*', authTokenMiddleware)
  .get('/:ticketId', listAllFinishedOrders)
  .patch('/', validateSchema(CheckoutBodySchema), updateOrderStatusAndSendToCheckout)
  .post('/payment/:ticketId', validateSchema(PaymentBodySchema), checkAndFinishPayment);

export { checkoutRouter };
