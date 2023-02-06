import { mongoDB, prismaPG } from '@/config';
import { Payments, Tickets, TicketStatus } from '@prisma/client';

async function createPaidTicket(userId: number): Promise<Tickets> {
  return prismaPG.tickets.create({
    data: {
      userId,
      status: TicketStatus.PAID,
    },
  });
}

async function createReservedTicket(userId: number): Promise<Tickets> {
  return prismaPG.tickets.create({
    data: {
      userId,
      status: TicketStatus.RESERVED,
    },
  });
}

async function createFinishedTicket(finishedTicket: Partial<Payments>) {
  return await mongoDB.collection('billing').insertOne(finishedTicket);
}

const ticketsFactory = {
  createPaidTicket,
  createReservedTicket,
  createFinishedTicket,
};

export default ticketsFactory;
