import { prismaPG } from '@/config';
import { SignUpBody } from '@/protocols';

async function searchUser(name: string) {
  return prismaPG.users.findFirst({
    where: {
      name,
    },
  });
}

async function insertNewUser(body: SignUpBody) {
  return prismaPG.users.create({
    data: body,
  });
}

async function createNewSession(userId: number, token: string) {
  return prismaPG.sessions.create({
    data: {
      userId,
      token,
    },
  });
}

async function getUserById(userId: number) {
  return prismaPG.users.findFirst({
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
