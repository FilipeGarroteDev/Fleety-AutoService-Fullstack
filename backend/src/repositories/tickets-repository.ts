import { prismaPG } from '@/config';
import { Tickets, TicketStatus } from '@prisma/client';

async function getActiveTicketByUserId(userId: number): Promise<Tickets> {
  return await prismaPG.tickets.findFirst({
    where: {
      userId,
      status: TicketStatus.RESERVED,
    },
  });
}

async function getTicketById(id: number): Promise<Tickets> {
  return await prismaPG.tickets.findFirst({
    where: {
      id,
      status: TicketStatus.RESERVED,
    },
  });
}

async function createNewTicket(userId: number): Promise<Tickets> {
  return prismaPG.tickets.create({
    data: {
      userId,
      status: TicketStatus.RESERVED,
    },
  });
}

const ticketsRepository = { getActiveTicketByUserId, createNewTicket, getTicketById };

export default ticketsRepository;
