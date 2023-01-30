import { CheckoutBodyEntity } from '@/protocols';
import checkoutService from '@/services/checkout-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function updateOrderStatusAndSendToCheckout(req: Request, res: Response) {
  const body: CheckoutBodyEntity = req.body;

  try {
    await checkoutService.updateFinishedOrders(body);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}
