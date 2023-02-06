import { prismaPG } from '@/config';
import { Sessions } from '@prisma/client';

export async function createSession(userId: number, token: string): Promise<Sessions> {
  return prismaPG.sessions.create({
    data: {
      token: token,
      userId,
    },
  });
}
