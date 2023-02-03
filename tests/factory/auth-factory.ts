import { prismaPG } from '@/config';
import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';

async function createUserByName(name: string, password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);

  return await prismaPG.users.create({
    data: {
      name,
      password: hashedPassword,
      role: 'CLIENT',
    },
  });
}

async function createNewAdmin(name: string, email: string) {
  const password = faker.internet.password();
  const hashedPassword = bcrypt.hashSync(password, 10);

  return await prismaPG.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
}

const authFactory = {
  createUserByName,
  createNewAdmin,
};

export default authFactory;
