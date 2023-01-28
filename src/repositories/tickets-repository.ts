import { prisma } from '@/config';
import { Tickets, TicketStatus } from '@prisma/client';

async function getActiveTicketByUserId(userId: number): Promise<Tickets> {
  return await prisma.tickets.findFirst({
    where: {
      userId,
      status: TicketStatus.RESERVED,
    },
  });
}

async function getTicketById(id: number): Promise<Tickets> {
  return await prisma.tickets.findFirst({
    where: {
      id,
    },
  });
}

async function createNewTicket(userId: number): Promise<Tickets> {
  return prisma.tickets.create({
    data: {
      userId,
      status: TicketStatus.RESERVED,
    },
  });
}

const ticketsRepository = { getActiveTicketByUserId, createNewTicket, getTicketById };

export default ticketsRepository;
