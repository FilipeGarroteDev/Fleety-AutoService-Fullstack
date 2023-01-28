import { prisma } from '@/config';
import { Tickets, TicketStatus } from '@prisma/client';

async function createPaidTicket(userId: number): Promise<Tickets> {
  return prisma.tickets.create({
    data: {
      userId,
      status: TicketStatus.PAID,
    },
  });
}

async function createReservedTicket(userId: number): Promise<Tickets> {
  return prisma.tickets.create({
    data: {
      userId,
      status: TicketStatus.RESERVED,
    },
  });
}

const ticketsFactory = {
  createPaidTicket,
  createReservedTicket,
};

export default ticketsFactory;
