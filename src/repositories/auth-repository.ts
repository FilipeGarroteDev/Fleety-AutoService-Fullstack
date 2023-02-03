import { prismaPG } from '@/config';
import { RegisterUserBody } from '@/protocols';
import { Users } from '@prisma/client';

async function searchUser(name: string) {
  return prismaPG.users.findFirst({
    where: {
      name,
    },
  });
}

async function insertNewUser(body: RegisterUserBody) {
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

async function searchAdminByEmail(email: string) {
  return prismaPG.users.findFirst({
    where: {
      email,
      role: 'ADMIN',
    },
  });
}

async function getAllUsers(): Promise<Users[]> {
  return prismaPG.users.findMany({});
}

const authRepository = {
  searchUser,
  insertNewUser,
  createNewSession,
  getUserById,
  searchAdminByEmail,
  getAllUsers,
};

export default authRepository;
