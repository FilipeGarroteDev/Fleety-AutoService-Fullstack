import { updateOrderStatusAndSendToCheckout } from '@/controllers/checkout-controller';
import { authTokenMiddleware } from '@/middlewares/authToken-middleware';
import validateSchema from '@/middlewares/schemas-middleware';
import { CheckoutBodySchema } from '@/schemas/checkout-schema';
import express from 'express';

const checkoutRouter = express.Router();

checkoutRouter
  .all('/*', authTokenMiddleware)
  .all('/*', validateSchema(CheckoutBodySchema))
  .patch('/', updateOrderStatusAndSendToCheckout);

export { checkoutRouter };
