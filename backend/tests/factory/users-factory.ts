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

async function createManyUsers() {
  return await prismaPG.users.createMany({
    data: [
      {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        image: faker.internet.url(),
        role: 'CLIENT',
      },
      {
        name: faker.name.firstName(),
        password: faker.internet.password(),
        image: faker.internet.url(),
        role: 'CLIENT',
      },
      {
        name: faker.name.firstName(),
        password: faker.internet.password(),
        role: 'CLIENT',
      },
      {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        image: faker.internet.url(),
        role: 'ADMIN',
      },
    ],
  });
}

const usersFactory = {
  createUserByName,
  createNewAdmin,
  createManyUsers
};

export default usersFactory;
