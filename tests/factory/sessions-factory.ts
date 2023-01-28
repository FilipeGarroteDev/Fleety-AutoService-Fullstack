import { prisma } from '@/config';
import { Sessions } from '@prisma/client';

export async function createSession(userId: number, token: string): Promise<Sessions> {
  return prisma.sessions.create({
    data: {
      token: token,
      userId,
    },
  });
}
