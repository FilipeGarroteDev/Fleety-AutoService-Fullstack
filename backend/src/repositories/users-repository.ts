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

async function deleteAllUsersEntities(userId: number) {
  await prismaPG.sessions.deleteMany({
    where: {
      userId,
    },
  });
  await prismaPG.payments.deleteMany({
    where: {
      Ticket: {
        userId,
      },
    },
  });
  await prismaPG.orders.deleteMany({
    where: {
      Ticket: {
        userId,
      },
    },
  });
  await prismaPG.tickets.deleteMany({
    where: {
      userId,
    },
  });
  await prismaPG.users.delete({
    where: {
      id: userId,
    },
  });
}

const usersRepository = {
  searchUser,
  insertNewUser,
  getUserById,
  searchAdminByEmail,
  getAllUsers,
  deleteAllUsersEntities,
};

export default usersRepository;
