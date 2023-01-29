import { OrderBodyEntity } from '@/protocols';
import ordersService from '@/services/orders-service';
import { Orders } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function finishAndSendProductOrder(req: Request, res: Response) {
  const body: OrderBodyEntity = req.body;

  try {
    const createdOrder: Orders = await ordersService.createAndValidateNewOrder(body);
    return res.status(httpStatus.CREATED).send(createdOrder);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function listAllTicketOrders(req: Request, res: Response) {
  const { ticketId } = req.params as Record<string, string>;

  try {
    const orders: Orders[] = await ordersService.searchOrdersByTicketId(ticketId);
    return res.status(httpStatus.OK).send(orders);
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
