import { prismaPG } from '@/config';

async function createNewSession(userId: number, token: string) {
  return prismaPG.sessions.create({
    data: {
      userId,
      token,
    },
  });
}

const authRepository = {
  createNewSession,
};

export default authRepository;
