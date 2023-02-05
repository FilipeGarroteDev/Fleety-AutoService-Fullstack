import { mongoDB, prismaPG } from '@/config';
import { CheckoutBodyEntity, OrderWithProductInfo, PaymentBody } from '@/protocols';
import { Orders, OrderStatus, Payments, Tickets, TicketStatus } from '@prisma/client';

async function updateManyOrders({ ticketId, status }: CheckoutBodyEntity): Promise<void> {
  await prismaPG.orders.updateMany({
    where: {
      ticketId,
      status: OrderStatus.SELECTED,
    },
    data: {
      status,
    },
  });
}

async function getAllFinishedOrders(ticketId: number): Promise<OrderWithProductInfo[]> {
  return await prismaPG.orders.findMany({
    where: {
      ticketId,
      OR: [{ status: OrderStatus.DELIVERED }, { status: OrderStatus.PREPARING }],
    },
    include: {
      Product: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

async function postPaymentAndUpdateTicketStatus(payment: PaymentBody, ticketId: number): Promise<[Tickets, Payments]> {
  const updateTicketStatus = prismaPG.tickets.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });

  const postPaymentData = prismaPG.payments.create({
    data: {
      ...payment,
      totalValue: Math.round(payment.totalValue),
      ticketId,
    },
  });

  return await prismaPG.$transaction([updateTicketStatus, postPaymentData]);
}

async function getAllDeliveredOrders(ticketId: number): Promise<Orders[]> {
  return await prismaPG.orders.findMany({
    where: {
      ticketId,
      status: OrderStatus.DELIVERED,
    },
  });
}

async function getAllActiveOrders(ticketId: number): Promise<Orders[]> {
  return await prismaPG.orders.findMany({
    where: {
      ticketId,
      OR: [{ status: OrderStatus.SELECTED }, { status: OrderStatus.PREPARING }],
    },
  });
}

async function saveFinishedTicket({ ticketId, totalValue, isSplitted, createdAt }: Payments) {
  return await mongoDB.collection('billing').insertOne({
    ticketId,
    totalValue,
    isSplitted,
    createdAt,
  });
}

async function getFinishedTicketsList() {
  return await mongoDB.collection('billing').find({}).toArray();
}

const checkoutRepository = {
  updateManyOrders,
  getAllFinishedOrders,
  getAllDeliveredOrders,
  postPaymentAndUpdateTicketStatus,
  getAllActiveOrders,
  saveFinishedTicket,
  getFinishedTicketsList,
};

export default checkoutRepository;
