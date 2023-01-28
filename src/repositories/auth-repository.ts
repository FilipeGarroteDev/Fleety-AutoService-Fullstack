import { prisma } from '@/config';
import { SignUpBody } from '@/protocols';

async function searchUser(name: string) {
  return prisma.users.findFirst({
    where: {
      name,
    },
  });
}

async function insertNewUser(body: SignUpBody) {
  return prisma.users.create({
    data: body,
  });
}

async function createNewSession(userId: number, token: string) {
  return prisma.sessions.create({
    data: {
      userId,
      token,
    },
  });
}

async function getUserById(userId: number) {
  return prisma.users.findFirst({
    where: {
      id: userId,
    },
  });
}

const authRepository = {
  searchUser,
  insertNewUser,
  createNewSession,
  getUserById,
};

export default authRepository;
