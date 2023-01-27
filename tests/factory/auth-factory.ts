import { prisma } from '@/config';
import faker from '@faker-js/faker';

async function createUserByNome(name: string) {
  return await prisma.users.create({
    data: {
      name,
      password: faker.internet.password(),
      role: 'CLIENT',
    },
  });
}

const authFactory = {
  createUserByNome,
};

export default authFactory;
