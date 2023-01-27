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

const authRepository = {
  searchUser,
  insertNewUser,
};

export default authRepository;
