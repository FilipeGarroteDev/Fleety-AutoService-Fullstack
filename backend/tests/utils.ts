import { mongoDB, prismaPG } from '@/config';
import faker from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import authFactory from './factory/users-factory';
import { createSession } from './factory/sessions-factory';

export async function cleanDb() {
  await prismaPG.optionals_Category.deleteMany({});
  await prismaPG.payments.deleteMany({});
  await prismaPG.orders.deleteMany({});
  await prismaPG.products.deleteMany({});
  await prismaPG.productCategories.deleteMany({});
  await prismaPG.productTypes.deleteMany({});
  await prismaPG.optionals.deleteMany({});
  await prismaPG.sessions.deleteMany({});
  await prismaPG.tickets.deleteMany({});
  await prismaPG.users.deleteMany({});

  await mongoDB.collection('calls').deleteMany({});
  await mongoDB.collection('billing').deleteMany({});
  await mongoDB.collection('ratings').deleteMany({});
}

export function generateValidToken(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
}

export async function generateTokenAndSession(name: string) {
  const incomingUser = await authFactory.createUserByName(name, faker.internet.password());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(incomingUser.id, token);

  return { token, userId: incomingUser.id };
}

export async function generateAdminTokenAndSession(name: string) {
  const incomingUser = await authFactory.createNewAdmin(name, faker.internet.email());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(incomingUser.id, token);

  return { token, userId: incomingUser.id };
}
