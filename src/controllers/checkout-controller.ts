import { CheckoutBodyEntity, OrderWithProductInfo } from '@/protocols';
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

export async function listAllFinishedOrders(req: Request, res: Response) {
  const { ticketId } = req.params as Record<string, string>;

  try {
    const finishedOrders: OrderWithProductInfo[] = await checkoutService.searchFinishedOrdersByTicketId(ticketId);
    return res.status(httpStatus.OK).send(finishedOrders);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === 'UnprocessableEntityError') {
      return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
    } else {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
