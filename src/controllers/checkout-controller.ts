import { CheckoutBodyEntity, OrderWithProductInfo, PaymentBody } from '@/protocols';
import checkoutService from '@/services/checkout-service';
import { Payments, Tickets } from '@prisma/client';
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

export async function checkAndFinishPayment(req: Request, res: Response) {
  const ticketId = req.params.ticketId;
  const paymentData: PaymentBody = req.body;

  try {
    const payment: [Tickets, Payments] = await checkoutService.payAndUpdateTicket(paymentData, ticketId);
    return res.status(httpStatus.CREATED).send(payment[1]);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res
        .status(httpStatus.NOT_FOUND)
        .send('Não há pedidos entregues vinculados à sua mesa. Verifique ou, se preferir, chame o garçom.');
    } else if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send('');
    } else if (error.name === 'UnprocessableEntityError') {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .send('O ticket informado está inválido. Por gentileza, chame o garçom.');
    } else if (error.name === 'ConflictError') {
      return res
        .status(httpStatus.CONFLICT)
        .send(
          'Há pedidos pendentes de entrega ou ativos em "Meu Pedido". Para encerrar a conta, aguarde a entrega dos pedidos e/ou esvazie o carrinho.',
        );
    } else if (error.name === 'ForbiddenError') {
      return res
        .status(httpStatus.FORBIDDEN)
        .send('O valor da conta não é igual ao que está sendo pago. Por gentileza, chame o garçom.');
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send('Houve um erro inesperado. Por gentileza, tente novamente ou chame o garçom.');
    }
  }
}
