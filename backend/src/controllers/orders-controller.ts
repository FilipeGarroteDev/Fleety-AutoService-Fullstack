import { OrderBodyEntity, OrderWithProductInfo } from '@/protocols';
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
    const orders: OrderWithProductInfo[] = await ordersService.searchOrdersByTicketId(ticketId);
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

export async function deleteActiveOrder(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const { orderId } = req.params as Record<string, string>;

  try {
    await ordersService.validateAndDeleteSelectedOrder(orderId, userId);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === 'UnprocessableEntityError') {
      return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
    } else if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function listAllPreparingOrders(req: Request, res: Response) {
  const { role } = res.locals.userData as Record<string, string>;

  try {
    const orders: OrderWithProductInfo[] = await ordersService.searchAllOrdersWithPreparingStatus(role);
    return res.status(httpStatus.OK).send(orders);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}

export async function deliverOrderUpdatingStatus(req: Request, res: Response) {
  const { role } = res.locals.userData as Record<string, string>;
  const { orderId } = req.params as Record<string, string>;

  try {
    await ordersService.verifyAndUpdateOrderStatus(orderId, role);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === 'UnprocessableEntityError') {
      return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
    } else {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}
